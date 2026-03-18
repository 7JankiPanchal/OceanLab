import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image

model = load_model('model/waste_model.h5')

classes = ['biodegradable', 'plastic', 'recyclable']

def predict_image(image):

    image = image.resize((224, 224))
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array, verbose=0)
    confidence = float(np.max(prediction)) * 100
    confidence = round(confidence, 2)

    return classes[np.argmax(prediction)], confidence