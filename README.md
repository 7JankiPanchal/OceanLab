---

## **EcoSort – Waste Classification & Smart Disposal System**

---

# **1. Introduction**

## **1.1 Purpose**

This document provides a detailed description of the **EcoSort system**, which classifies waste images into **biodegradable, recyclable, or plastic**, tracks user activity, and helps users dispose of waste responsibly.

---

## **1.2 Document Conventions**

* Headings are numbered for clarity
* Functional requirements use “shall”
* Non-functional requirements use measurable criteria

---

## **1.3 Intended Audience and Reading Suggestions**

* **Developers** → Implementation details
* **Testers** → Validation criteria
* **Project Managers** → Planning
* **End Users** → System overview

---

## **1.4 Project Scope**

The system allows users to:

* Upload images of waste
* Detect waste type using AI model
* Store history of classifications
* Earn badges (gamification)
* Find nearest disposal locations on map

---

## **1.5 References**

* Software Engineering textbooks
* AI/ML model documentation
* Mapping APIs documentation

---

# **2. Overall Description**

## **2.1 Product Perspective**

* Web-based application
* Uses AI model for classification
* Integrated with map services

---

## **2.2 Product Features**

* Image upload & classification
* Waste category detection
* History tracking
* Gamification (badges/rewards)
* Location-based disposal suggestions

---

## **2.3 User Classes and Characteristics**

| User Type              | Description                   |
| ---------------------- | ----------------------------- |
| General User           | Uploads images, views results |
| Admin                  | Manages system data           |
| Environment Enthusiast | Frequent user, tracks impact  |

---

## **2.4 Operating Environment**

* Web browser (Chrome, Edge)
* Mobile & Desktop devices
* Backend server (Node/Python)

---

## **2.5 Design and Implementation Constraints**

* Requires trained ML model
* Internet connectivity required
* API dependency (maps)

---

## **2.6 User Documentation**

* User guide
* Help section
* FAQs

---

## **2.7 Assumptions and Dependencies**

* Users have internet access
* Image quality is sufficient
* Map API is available

---

# **3. System Features**

---

## **3.1 Image Classification**

### Description:

User uploads image → system classifies waste

### Functional Requirements:

* System shall accept image input
* System shall classify into:

  * Biodegradable
  * Recyclable
  * Plastic
* System shall display result

---

## **3.2 History Management**

### Description:

Store and display previous entries

### Functional Requirements:

* System shall save classification history
* User shall view past records
* User shall delete history (optional)

---

## **3.3 Gamification System**

### Description:

Reward users with badges

### Functional Requirements:

* System shall assign badges
* System shall track tasks completed
* System shall display achievements

---

## **3.4 Location Services**

### Description:

Show nearest disposal points

### Functional Requirements:

* System shall access location
* System shall display nearby disposal areas
* System shall show map view

---

# **4. External Interface Requirements**

---

## **4.1 User Interfaces**

* Simple UI for image upload
* Dashboard for history
* Badge display system
* Map interface

---

## **4.2 Hardware Interfaces**

* Camera (for image capture)
* GPS (for location detection)

---

## **4.3 Software Interfaces**

* AI/ML model
* Database system
* Map API (e.g., Google Maps)

---

## **4.4 Communication Interfaces**

* Internet (HTTP/HTTPS)
* API communication

---

# **5. Other Nonfunctional Requirements**

---

## **5.1 Performance Requirements**

* Image classification within 2–3 seconds
* Fast loading UI

---

## **5.2 Safety Requirements**

* Backup of user data
* Error handling

---

## **5.3 Security Requirements**

* User authentication
* Data encryption
* Secure API calls

---

## **5.4 Software Quality Attributes**

* **Usability** → Easy interface
* **Reliability** → Accurate results
* **Scalability** → Handle multiple users
* **Maintainability** → Easy updates

---

# **6. Other Requirements**

* Support for multiple devices
* Future scope:

  * Voice input
  * Advanced analytics
  * Community leaderboard

---
<img width="197" height="568" alt="image" src="https://github.com/user-attachments/assets/2bb06225-2ee2-47b8-888f-9ba348dab24b" />

