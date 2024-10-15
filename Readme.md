# Broker Clone

A MERN stack-based clone of a professional networking platform, designed for users to connect, collaborate, and grow their network. It includes features like user authentication, profile management, and search functionality using external APIs. The project leverages MongoDB, Express.js, React, and Node.js to deliver a seamless user experience.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- **User Authentication**: Secure login and signup functionality.
- **Profile Management**: Create and edit user profiles.
- **Search Functionality**: Search for users using an external API for better data retrieval.
- **Real-time Notifications**: Get notifications for new connections or messages.
- **Posts and Comments**: Create, view, and interact with posts and comments.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API Integration**: Uses APIs from RapidAPI for search functionality and data retrieval.

## Getting Started

### Prerequisites
- Node.js (version 18.x or later)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/broker-clone.git
   cd broker-clone

# API Documentation

## Base URL
The base URL for the API is:https://broker-6dgs.onrender.com

A simple REST API in Node.js

## API Endpoints

| Methods     | Urls                                | Description                                           |
| ----------- | ----------------------------------- | -----------------------------------------------------|
| POST        | api/user/register                   | Register a new user                                 |
| POST        | api/user/login                      | Login a user                                        |
| PUT         | api/user/updateuser                 | Update an existing user                             |
| DELETE      | api/user/deleteuser/{id}            | Delete an existing user                             |
| POST        | api/user/logoutuser                 | Logout the user                                     |
| POST        | api/user/forgotpassword/verifyemail | Verify if the email is registered                   |
| POST        | api/user/forgotpassword/sendotp     | Send OTP to the user's email                        |
| POST        | api/user/forgotpassword/validateotp | Validate the OTP sent to the user's email           |
| POST        | api/user/forgotpassword/changepassword | Change the user's password                          |
| GET         | api/user/loggedIn                  | Check if a user is logged in                        |
| GET         | api/user/fetchusers                 | Fetch a list of users, optionally filtered by search term |

| Methods     | Urls                                | Description                                           |
| ----------- | ----------------------------------- | -----------------------------------------------------|
| POST        | api/listing/create                  | Create a new property listing                        |
| GET         | api/listing/get/{id}                | Fetch a single listing by ID                         |
| GET         | api/listing/get                     | Fetch all property listings, optionally filtered by search criteria |
| POST        | api/listing/addtowishlist           | Add a property to the user's wishlist                |
| GET         | api/listing/getwishlist/{userId}    | Fetch the wishlist for a specific user              |
