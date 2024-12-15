# Event Management Platform - Backend

## Overview
This backend service is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and provides a comprehensive solution for managing events, ticket sales, and user registrations. It includes features for event organizers, attendees, and administrators.

## Features
- **User Authentication**: Secure login and registration using JWT.
- **Event Management**: Create, update, and manage events with various details including media uploads and ticket pricing.
- **Ticket Sales**: A secure ticketing system with multiple ticket types and integration with Razorpay for payments.
- **Attendee Registration**: Users can register for events, manage their tickets, and receive notifications.
- **Event Analytics**: Organizers can track ticket sales, revenue, and attendee demographics through a dashboard.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing event and user data.
- **Mongoose**: ODM for MongoDB to manage data schemas.
- **Razorpay**: Payment gateway for processing transactions.
- **Nodemailer**: For sending email notifications.
- **Twilio**: For sending SMS notifications.
- **bcrypt.js**: For password hashing.
- **jsonwebtoken**: For secure authentication.

## API Endpoints
- **Authentication**: `/api/auth`
- **Events**: `/api/events`
- **Tickets**: `/api/tickets`
- **Users**: `/api/users`

## Contribution
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.
