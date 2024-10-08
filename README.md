# 🚀 Blog API Backend

## Overview

Welcome to **Blog API Backend**, a simple and scalable API for managing blog posts, users, and authentication. Built with **Express** and **Prisma**, this backend is designed to provide a solid foundation for any blog platform, with features like user registration, post creation, and JWT-based authentication.

## 🛠 Technologies Used

This project leverages a range of modern technologies to provide a secure, efficient, and feature-rich backend:

- **Express.js**: A fast and minimalist web framework for building robust APIs.
- **Prisma**: A powerful ORM for managing database interactions with ease.
- **Passport.js**: Middleware for managing user authentication with support for JWT and local strategies.
- **JWT (JSON Web Tokens)**: Used for secure, stateless authentication.
- **Express Validator**: Middleware for validating and sanitizing request data.
- **bcryptjs**: A library for hashing and comparing passwords.
- **CORS**: Middleware for handling Cross-Origin Resource Sharing.

## 🎯 Features

- **User Authentication**: Secure login and registration system using JWT for token-based authentication.
- **Blog Posts**: Create, read, update, and delete (CRUD) functionality for managing blog posts.
- **User Management**: Each user has their own account to manage their posts.
- **Input Validation**: Validate incoming requests with express-validator to ensure data integrity.
- **Security**: Passwords are securely hashed using bcryptjs, and sensitive routes are protected with JWT.
