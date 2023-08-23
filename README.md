# Hotel Reservation Management System

This project is a hotel reservation management system challenge for PUSHTech that allows users to create, edit, delete, and list reservations for a hotel. The system consists of two main components: a RESTful API (`hotel-reservation-api`) for backend operations and a web application (`hotel-reservation-frontend`) for user interaction.

## Project Structure

- `hotel-reservation-api`: Backend API built with Ruby on Rails.
- `hotel-reservation-frontend`: Frontend web application built with React.

## Requirements

To run this project, you need the following tools:

- Docker v24.0.2
- Node.js v20.5.0
- pnpm v8.6.12

## How to Run the Project

1. Clone the repository:

```bash
Clone the repository
cd hotel-reservation-project
```

2. Start the Docker containers for the API and the database:

```bash
docker-compose up --build
```

3. In another terminal, seed the database with sample data:

```bash
docker-compose run api rake db:seed
```

4. Navigate to the frontend directory:

```bash
cd ../hotel-reservation-frontend
```

5. Install frontend dependencies:

```bash
pnpm install
```

6. Start the frontend development server:

```bash
pnpm dev
```

7. Open your web browser and go to <http://localhost:5173>. You can log in using the following credentials:

- Email: <pushtech@challenge.com>
- Password: pushtech

Now you're ready to start working with the app!

### TODO

- Implement table sorting, filtering, and pagination
- Expand testing on both the frontend and backend
- Add more validations for data input
- Include more sample seed data
- Properly set up environment variables
- Enhance user experience and user interface
- Add additional features

#### Original Challenge Description

Technical Ruby on Rails Challenge: Hotel Reservation System

Create a web application for managing hotel reservations. The application should support the following operations:

- Create a reservation
- Edit a reservation
- Delete a reservation
- List reservations
- The project should include both a web interface and a JSON-based API.

The reservation model should have the following attributes:

- Reservation ID (unique)
- Hotel name
- Price
- Currency
- Check-in date
- Check-out date
- Guest name
- Guest email

You are free to use any technology for the web interface and choose your preferred database technology, though MongoDB is preferred.

For the web interface, you can use https://getbootstrap.com/.

Good luck with the challenge!

License
This project is licensed under the MIT License.
