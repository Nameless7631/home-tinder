from typing import Union, List, Dict, Any
from fastapi import FastAPI, Query, Body # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import json
from pydantic import BaseModel

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
    return {"house_ids": houses}


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
