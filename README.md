# RecipByte AI-Enhanced Recipe Generator 🍽️

- An intelligent web app that helps users discover recipes based on ingredients they have at home. It uses AI-powered image detection, custom filters like dietary preferences on top of the existing manual ingredients input to suggest smart and personalized meals.


## 🚀 Live Demo

[Visit the App](https://recipbyte.vercel.app/)


## 🔑 Key Features

- Upload or snap a photo to detect ingredients using AI
- Manual input of ingredients
- Smart recipe suggestions based on ingredients
- Secure authentication and a concise user dashboard
- Dietary preference filters (e.g., vegan, gluten-free)
- Save favorite recipes and track recipe history
- Clean, mobile-responsive user dashboard


## 🧠 Tech Stack

### Frontend:
- Next.js
- Axios
- TensorFlow.js (Image Detection)

### Backend:
- Django + Django REST Framework
- PostgreSQL
- JWT Authentication
- Recipe Data from Kaggle


## ⚙️ Getting Started

### Frontend Setup (Next.js)
```bash
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

### Backend Setup (Django)
```bash
cd backend-recipbyte
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


