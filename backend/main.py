from typing import Union, List, Dict, Any
from fastapi import FastAPI, Query, Body # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import json
from pydantic import BaseModel
import random



class Preferences(BaseModel):
    houseType: List[str]
    numberOfBeds: List[float]  # Changed to float since slider values might be decimals
    numberOfBathrooms: List[float]
    priceRange: List[float]
    city: List[str]

class HouseHistory(BaseModel):
    address: str
    bedrooms: float
    bathrooms: float
    price: Union[float, str]
    property_type: str
    like: bool

app = FastAPI()
history = []
houses = []
preferences = []
algo = {
    "Apartment": 0,
    "Condo": 0,
    "Single Family": 0,
    "Multi-Family": 0,
    "moreThan3Beds": 0,
    "threeOrLessBeds": 0,
    "moreThan2Baths": 0,
    "lessThan2Baths": 0
}

with open('../dataset/irvineHomes.json', 'r') as file:
    data = json.load(file)
    for house in data:
        newHouse = {"formattedAddress": house["formattedAddress"], "city":house["city"], "state": house["state"]}
        newHouse["propertyType"] = house["propertyType"] if "propertyType" in house else None
        newHouse["squareFootage"] = house["squareFootage"] if "squareFootage" in house else None
        newHouse["bedrooms"] = house["bedrooms"] if "bedrooms" in house else None
        newHouse["bathrooms"] = house["bathrooms"] if "bathrooms" in house else None
        if "taxAssessments" in house:
            max = 0
            years = house["taxAssessments"].keys()
            for year in years:
                if int(year) > max:
                    max = int(year)
            newHouse["price"] = house["taxAssessments"][str(max)]["value"]
        else:
            newHouse["price"] = None
        houses.append(newHouse)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins if necessary
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    num = random.randint(0, len(houses)-1)
    
    # Keep generating new numbers until we find a house that matches our criteria
    while True:
        house = houses[num]
        property_type = house['propertyType']
        
        # Check if all property types are negative
        if (algo['Apartment'] < 0 and
            algo['Condo'] < 0 and
            algo['Single Family'] < 0 and
            algo['Multi-Family'] < 0):
            # Reset all property type values to 0
            algo['Multi-Family'] = 0
            algo['Apartment'] = 0
            algo['Condo'] = 0
            algo['Single Family'] = 0
            reset_algo = {
                'Multi-Family': 0,
                'Apartment': 0,
                'Condo': 0,
                'Single Family': 0,
                'moreThan3Beds': algo['moreThan3Beds'],
                'threeOrLessBeds': algo['threeOrLessBeds'],
                'moreThan2Baths': algo['moreThan2Baths'],
                'lessThan2Baths': algo['lessThan2Baths']
            }
            algo.update(reset_algo)
            print(reset_algo)
            break
        
        # Check if this property type should be skipped (algo value < 0)
        if (property_type == 'Apartment' and algo['Apartment'] < 0 or
            property_type == 'Condo' and algo['Condo'] < 0 or
            property_type == 'Single Family' and algo['Single Family'] < 0 or
            property_type == 'Multi-Family' and algo['Multi-Family'] < 0):
            num = random.randint(0, len(houses)-1)
            continue
            
        # If we reach here, the house is acceptable
        break
    
    return houses[num]

@app.post("/saved/{house_id}")
def save_post(house_id : int):
    houses.append(house_id)
    return {"result" : "success"}

@app.get("/history")
def get_history():
    return {"history": history}

@app.post("/history")
def save_history(house_data: HouseHistory):
    history.append(house_data.dict())
    return {"result": "success"}

@app.post("/preferences")
def save_preferences(prefs: Preferences):
    preferences.append(prefs.dict()) 
    return {"result": "success", "preferences": prefs}

@app.get("/preferences")
def get_preferences():
    return {"preferences": preferences}

@app.get("/algo")
def algo_get():
    return {"result": algo}


@app.post("/algo")
def algo_post(algo_front: dict):
    global algo
    algo.update(algo_front)
    # print(algo)
    return {"result": algo}