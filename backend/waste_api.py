from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import io
import numpy as np
import tensorflow as tf

# ✅ Create ONE app only
app = FastAPI()

# ✅ Enable CORS (for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load trained model
model = tf.keras.models.load_model("model/waste_model.h5")

# ✅ Classes
classes = ["plastic", "biodegradable", "recyclable"]

# ✅ Temporary storage (in-memory)
history_db = []


# =========================
# ROOT
# =========================
@app.get("/")
def root():
    return {"message": "Waste classifier API running"}


# =========================
# CLASSIFY IMAGE
# =========================
@app.post("/classify")
async def classify(file: UploadFile = File(...)):
    contents = await file.read()

    image = Image.open(io.BytesIO(contents)).convert("RGB").resize((224, 224))
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)

    label = classes[np.argmax(prediction)]
    confidence = float(np.max(prediction))

    return {
        "prediction": label,
        "confidence": round(confidence * 100, 2)
    }


# =========================
# SAVE HISTORY
# =========================
class Item(BaseModel):
    type: str
    confidence: str
    time: str
    image: str


@app.post("/save")
def save(item: Item):
    history_db.append(item)
    print("Saved:", item)
    return {"message": "saved successfully"}


# =========================
# GET HISTORY (optional)
# =========================
@app.get("/history")
def get_history():
    return history_db