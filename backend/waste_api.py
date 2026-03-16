from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import random

app = FastAPI()

# allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# simple dummy classes
classes = ["plastic", "metal", "paper", "biodegradable"]


@app.get("/")
def root():
    return {"message": "Waste classifier API running"}


@app.post("/classify")
async def classify(file: UploadFile = File(...)):

    contents = await file.read()

    image = Image.open(io.BytesIO(contents))

    # dummy prediction (replace with ML model later)
    prediction = random.choice(classes)
    confidence = random.uniform(0.7, 0.98)

    return {
        "prediction": prediction,
        "confidence": confidence
    }