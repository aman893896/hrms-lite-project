🚀 HRMS Lite – Full-Stack Employee & Attendance Management System

A lightweight full-stack Human Resource Management System (HRMS Lite) built to manage employee records and track daily attendance through a clean, professional web interface.

This project demonstrates practical full-stack development including REST API design, database modeling, frontend-backend integration, validation handling, and production deployment.

🌐 Live Application

🔗 Live Frontend:
https://hrms-lite-project-jew9q0v1a-aman893896s-projects.vercel.app/

🔗 Hosted Backend API:
https://hrms-lite-project-t6ix.onrender.com

📂 GitHub Repository:
https://github.com/aman893896/hrms-lite-project


📌 Project Overview

HRMS Lite simulates a basic internal HR tool for managing:

Employee records

Daily attendance tracking

The application focuses on clean implementation, usability, validation, and stable deployment rather than over-engineering.

👥 Core Features
Employee Management

Add new employees

View list of employees

Delete employees

Unique Employee ID validation

Unique Email validation

Required field validation

Meaningful error messages

Attendance Management

Mark employee attendance (Present / Absent)

Select date while marking attendance

View attendance history per employee

Daily attendance tracker overview

Auto-refresh every 5 minutes

🧠 System Highlights

RESTful API architecture

Persistent database storage

Proper HTTP status codes (200, 201, 400, 404, 500)

Backend validation with safe database rollback

Environment-based API configuration

Clean component-based frontend structure

Loading, error, and empty UI states

Production deployment on cloud platforms

🛠️ Tech Stack
Frontend

React.js

Fetch API

Component-based architecture

Environment variables for API configuration

Hosted on Vercel

Backend

Python

Flask

Flask-CORS

SQLAlchemy ORM

Gunicorn (Production WSGI Server)

Hosted on Render

Database

SQLite (Persistent storage)

⚙️ Running the Project Locally
1️⃣ Clone the Repository
git clone https://github.com/aman893896/hrms-lite-project.git
cd hrms-lite-project

2️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # On Windows
pip install -r requirements.txt
python app.py


Backend runs at:

http://localhost:5000

3️⃣ Frontend Setup

Open a new terminal:

cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

🔐 Validations Implemented

The system enforces:

Required field validation

Valid email format validation

Unique Employee ID constraint

Unique Email constraint

Graceful error handling

Proper HTTP response codes

Safe database rollback on failure

Errors are returned from the backend API and displayed in the UI clearly.

🌍 Deployment Notes

Backend is deployed on Render (Free Tier)

Render services may go to sleep after inactivity (~15 minutes)

First request may take 30–60 seconds to wake up

Frontend is deployed on Vercel and connected via environment variable

🎯 Design Philosophy

This solution focuses on:

✔ Clean architecture
✔ Practical implementation
✔ Clear validation handling
✔ Production deployment readiness
✔ Stable full-stack integration

The goal was to deliver a complete, functional, and professionally structured application within the assignment scope.

👨‍💻 Author

Aman Verma
Python Full Stack Developer
