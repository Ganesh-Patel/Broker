# ProHomes - Real Estate Web App

Welcome to **ProHomes**, your trusted partner in the real estate market, helping you find your dream home. We specialize in residential and commercial properties, offering a wide range of options to suit every need.

![ProHomes - About Us]
![Home Page]()

## Live Demo
[ProHomes Live Demo](https://broker-alpha.vercel.app/)

---

## About ProHomes

ProHomes aims to make the home buying and selling process as seamless as possible. With a focus on user experience and efficient service, we provide expert guidance throughout the real estate journey.

### Our Mission
To provide exceptional service and unmatched expertise, ensuring clients find the perfect property that fits their needs and budget.

### Our Vision
To create a platform where everyone has access to the best real estate solutions, making property transactions simple, transparent, and enjoyable.

---

## Features

- **User Authentication**: Secure login and signup functionality.
- **Profile Management**: Create and edit user profiles.
- **Property Listings**: Browse a wide range of residential and commercial properties.
- **Pay Rent Option**: Easily manage your rental payments through our platform.
- **Search Functionality**: Search for properties using an external API for better data retrieval.
- **Rental Agreements**: Generate and manage rental agreements securely.
- **Real-time Notifications**: Get notifications for new connections or messages.
- **Posts and Comments**: Create, view, and interact with posts and comments.
- **Additional Services**: Access services like packing, moving, painting, and cleaning.

---

## Technologies Used

ProHomes is built using the **MERN** stack, which includes:

- **MongoDB**: A NoSQL database for storing property and user data.
- **Express.js**: A web application framework for Node.js, used for building the backend APIs.
- **React.js**: A front-end library for building the user interface, offering a smooth and responsive experience.
- **Node.js**: The server-side environment for running JavaScript on the server.

### Additional Technologies

- **Axios**: Used for making HTTP requests from the frontend to the backend APIs.
- **Multer**: Middleware for handling multipart/form-data, primarily used for uploading images.
- **JSON Web Tokens (JWT)**: Used for secure user authentication.
- **Tailwind CSS**: For styling the frontend and ensuring a modern and responsive design.

---

## API Integration

The backend is a **MERN stack-based** clone of a professional networking platform, designed for users to connect, collaborate, and grow their network. It includes features like user authentication, profile management, and search functionality using external APIs.

### Base URL
The base URL for the API is: `https://broker-6dgs.onrender.com`

### API Endpoints

| Methods     | Urls                                | Description                                           |
| ----------- | ----------------------------------- | -----------------------------------------------------|
| POST        | `/api/user/register`                | Register a new user                                 |
| POST        | `/api/user/login`                   | Login a user                                        |
| PUT         | `/api/user/updateuser`              | Update an existing user                             |
| DELETE      | `/api/user/deleteuser/{id}`         | Delete an existing user                             |
| POST        | `/api/user/logoutuser`              | Logout the user                                     |
| POST        | `/api/user/forgotpassword/verifyemail` | Verify if the email is registered                   |
| POST        | `/api/user/forgotpassword/sendotp`  | Send OTP to the user's email                        |
| POST        | `/api/user/forgotpassword/validateotp` | Validate the OTP sent to the user's email           |
| POST        | `/api/user/forgotpassword/changepassword` | Change the user's password                          |
| GET         | `/api/user/loggedIn`                | Check if a user is logged in                        |
| GET         | `/api/user/fetchusers`              | Fetch a list of users, optionally filtered by search term |
| POST        | `/api/listing/create`               | Create a new property listing                        |
| GET         | `/api/listing/get/{id}`             | Fetch a single listing by ID                         |
| GET         | `/api/listing/get`                  | Fetch all property listings, optionally filtered by search criteria |
| POST        | `/api/listing/addtowishlist`        | Add a property to the user's wishlist                |
| GET         | `/api/listing/getwishlist/{userId}` | Fetch the wishlist for a specific user              |

---

## Screenshots

### 1. About Us
![ProHomes - About Us]
(./images/ssaboutus.png)
*Discover what makes ProHomes the ideal partner in your real estate journey.*

### 2. Home Page
![ProHomes - Home Page]

![Home Page]()

*Explore a wide variety of properties tailored to your needs.*

### 3. Account Page
![ProHomes - Account Page]

![Account Page]()

*Manage your personal information and preferences easily.*

### 4. Property Listings
![ProHomes - Properties]

![Properties]()

*Find your dream home among our extensive property listings.*

### 5. Sign Up Page
![ProHomes - Sign Up]

![Sign Up]()


*Join our community and start your journey with ProHomes today!*

### 6. Login Page
![ProHomes - Login]

![Sign Up]() 

*Access your account quickly and securely.*

### 7. Home Page Variant 1
![ProHomes - Home Variant 1]

![Sign Up]()

*Explore properties in different styles and designs.*

### 8. Home Page Variant 2
![ProHomes - Home Variant 2]

![Sign Up]()

*More options to find the perfect home for you!*

---

## Deployment

- **Backend Deployment**: The backend is deployed on **Render**, providing a reliable hosting environment for our APIs.
- **Frontend Deployment**: The frontend is deployed on **Vercel**, enabling fast and easy access to our application.

---

## Author

**Ganesh Patel**  
[GitHub Profile](https://github.com/Ganesh-Patel)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

© 2024 ProHomes. All rights reserved.
