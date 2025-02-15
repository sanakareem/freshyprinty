FreshPrints Assessment

A full-stack web application that combines GitHub user search functionality and apparel inventory management. Built with Angular and Node.js.

## Overview

The application consists of two main components:
- A frontend service for GitHub user searching with history tracking
- A backend service for managing apparel inventory and order fulfillment

## Prerequisites

- Node.js (v18.x or higher)
- npm (v9.x or higher)
- Angular CLI (v19.1.0)

## Installation & Setup

Clone the repository:

git clone https://github.com/sanakareem/freshyprinty.git
cd freshyprinty
Backend Setup
Navigate to backend directory
cd apparel-inventory-api

# Install dependencies
npm install

# Start development server
npm run dev

Frontend Setup

Navigate to frontend directory
cd github-search-frontend

# Install dependencies
npm install

# Start development server
ng serve

With Docker
bashCopydocker-compose up --build

Usage:

Frontend Application (http://localhost:4200)
The frontend application provides:

GitHub user search functionality
Search history tracking
Responsive design with clean UI
Navigation between search and history views

Backend API (http://localhost:3000)
The backend service supports:

Single Item Update

httpCopyPUT /api/apparel/:code/:size
{
  "quality": number,
  "price": number
}

Order Fulfillment Check

httpCopyPOST /api/apparel/check-fulfillment
{
  "items": [
    {
      "code": string,
      "size": string,
      "quantity": number
    }
  ]
}
Application Structure
Copyfreshyprinty/
├── github-search-frontend/    # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── models/
│   │   └── assets/
│   └── package.json
│
└── apparel-inventory-api/     # Node.js backend application
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── services/
    │   └── models/
    └── package.json


Deployment Instructions:

Method 1: Traditional Deployment

Backend:

Install Node.js
Run npm install
Run npm run build
Run npm start


Frontend:

Install Node.js and Angular CLI
Run npm install
Run ng build
Deploy dist folder to web server



Method 2: Docker Deployment
docker-compose up --build -d

Features

GitHub User Search

Real-time GitHub user search
Persistent search history using local storage
Clean and intuitive user interface
Response caching for improved performance

Apparel Inventory Management

Inventory tracking with quality and price management
Order fulfillment verification
Cost calculation functionality
JSON-based data persistence

Local Development
Running Tests
bashCopy# Backend tests
cd apparel-inventory-api
npm test

# Frontend tests
cd github-search-frontend
ng test

Environment Variables

The application uses the following environment variables:

PORT: Backend server port (default: 3000)
NODE_ENV: Environment mode (development/production)

API Documentation
GitHub Search API

Frontend runs on port 4200 (development) or 80 (production)
Endpoints:

Search: /search
History: /history



Apparel Inventory API

Backend runs on port 3000
Endpoints:

Update Stock: PUT /api/apparel/:code/:size
Bulk Update: PUT /api/apparel/bulk
Check Fulfillment: POST /api/apparel/check-fulfillment
Calculate Cost: POST /api/apparel/calculate-cost

Acknowledgments

Special thanks to FreshPrints for the opportunity
Built using Angular and Node.js
Implements GitHub API integration

 