from typing import Union
from fastapi import FastAPI, Query # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import json

app = FastAPI()

houses = []

# with open("../dataset/USAddressData.csv", mode="r", newline="") as file:
#     reader = csv.reader(file)
#     header = next(reader)
#     mak_index = header.index("MAK")
#     address_index = header.index("Address")
#     for row in reader:
#         houses[row[mak_index]] = row[address_index]

with open('../dataset/irvineHomes.json', 'r') as file:
    data = json.load(file)
    houses = data

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

# @app.get("/")
# def read_root():
#     return {"house_ids": houses}



@app.post("/saved/{house_id}")
def save_post(house_id : int):
    houses.append(house_id)
    return {"result" : "success"}


