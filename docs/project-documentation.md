# Project Documentation

## Project Name

StayFinder - Student Accommodation Website

## Project Overview

StayFinder is a responsive web application built for students to find suitable PG accommodation. The platform allows students to browse properties, filter listings, view property details, shortlist interested properties, and send enquiries to property owners.

## Objective

The objective of this project is to build a real-world student accommodation platform using React, PHP, AJAX/API calls, and a SQL database.

## Modules

### 1. Authentication

Users can create an account and login. Passwords are securely hashed in the backend before being stored in the database.

### 2. Property Listing

Users can view PG properties with details such as name, location, price, gender type, rating, image, and amenities.

### 3. Filters

Users can filter properties by:

- City
- Budget
- Gender

The filtering works dynamically using API calls without page reload.

### 4. Property Details

Each property has a detailed page with:

- Image gallery
- Description
- Amenities
- Rating
- Monthly price
- Interested button
- Enquiry form

### 5. Shortlist

Logged-in users can mark properties as interested. These properties are saved in the database and displayed on the shortlist page.

### 6. Enquiry

Logged-in users can submit an enquiry for a property. The enquiry is stored in the database.

### 7. Admin Enquiries

Admin can view all submitted enquiries with student details and property information.

## Database Tables

- users
- properties
- property_images
- amenities
- property_amenities
- interested_users
- enquiries

## Project Flow

```txt
React Frontend
      ↓
Axios API Request
      ↓
PHP Backend
      ↓
Supabase PostgreSQL Database