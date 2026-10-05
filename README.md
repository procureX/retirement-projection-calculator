Retirement Projection Calculator
A full‑stack application that allows users to create, view, edit, and delete retirement projections based on contribution, expected return rate, and retirement age. Built with ASP.NET Core Web API, Entity Framework Core, SQLite, React + TypeScript, and Vite.

📌 Features
👤 User Management
Create new users

View user details

Edit user information

Delete users

View all projections for a specific user

📈 Retirement Projections
Create new retirement projections

View all projections for a user

Edit existing projections

Delete projections

Visualize projections using charts

Automatic calculation of yearly balances based on:

Annual contribution

Expected return rate

Current age → retirement age

🔗 Full API Integration
RESTful API built with ASP.NET Core

EF Core for database access

SQLite for local storage

Swagger UI for API documentation

🏗 Tech Stack
Frontend
React (TypeScript)

Vite

React Router

Custom API layer

Chart rendering component

Backend
ASP.NET Core Web API

Entity Framework Core

SQLite database

Swagger UI

📂 Project Structure
Code
retirement-projection-calculator/
│
├── Api/
│   ├── Controllers/
│   │   ├── UsersController.cs
│   │   └── RetirementProjectionsController.cs
│   ├── Data/
│   ├── Models/
│   ├── DTOs/
│   └── Program.cs
│
├── ui/
│   ├── src/
│   │   ├── apis/
│   │   │   ├── userApi.ts
│   │   │   └── projectionApi.ts
│   │   ├── components/
│   │   │   └── ProjectionChart.tsx
│   │   ├── pages/
│   │   │   ├── UserDashboard.tsx
│   │   │   ├── UserDetails.tsx
│   │   │   ├── CreateProjection.tsx
│   │   │   ├── EditProjection.tsx
│   │   │   └── UserProjections.tsx
│   │   └── main.tsx
│   └── index.html
🚀 Getting Started
Backend Setup
bash
cd Api
dotnet restore
dotnet ef database update
dotnet run
Backend runs at:

Code
http://localhost:5116
Swagger UI:

Code
http://localhost:5116/swagger
Frontend Setup
bash
cd ui
npm install
npm run dev
Frontend runs at:

Code
http://localhost:5173
🔌 API Endpoints
Users
Method	Endpoint	Description
GET	/api/Users	Get all users
GET	/api/Users/{id}	Get user by ID
POST	/api/Users	Create user
PUT	/api/Users/{id}	Update user
DELETE	/api/Users/{id}	Delete user
GET	/api/Users/{id}/projections	Get projections for user


Retirement Projections
Method	Endpoint	Description
GET	/api/RetirementProjections/{id}	Get projection by ID
GET	/api/RetirementProjections/user/{userId}	Get projections for user
POST	/api/RetirementProjections	Create projection
PUT	/api/RetirementProjections/{id}	Update projection
DELETE	/api/RetirementProjections/{id}	Delete projection


📊 Projection Calculation Logic
Each projection calculates yearly balances from the user’s current age to retirement age:

Code
balance = (balance + annualContribution) * (1 + expectedReturnRate)
The backend returns:

years[] → list of ages

balances[] → list of projected balances

These are rendered in the frontend chart.

🖼 Screenshots
Add screenshots here once you’re ready:

User dashboard

Projection list

Projection chart

Edit projection page

🧪 Future Enhancements
Add validation to forms

Add toast notifications

Add authentication

Add export to CSV/PDF

Add projection comparison view

📜 License
MIT License (or whatever you choose)

🎉 Status
All core CRUD functionality is complete.
The project is fully operational and ready for deployment or portfolio use.
