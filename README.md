# Evently [![wakatime](https://wakatime.com/badge/github/theRedeemer997/evently.svg)](https://wakatime.com/badge/github/theRedeemer997/evently)

**Evently** is the final capstone project for the Computer Application Development (CAD) program (Level 2, 2024). This application streamlines event management, providing a user-friendly platform for event creation, planning, and management.

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution Guidelines](#contribution-guidelines)
- [Contributors](#contributors)
- [License](#license)

## About the Project

Evently is designed to simplify the process of organizing events, making it easier for users to manage and track their events. This project is part of the final capstone for CAD students and is developed as a collaborative effort among multiple contributors. It showcases the application of modern web technologies and best practices in software development.

## Key Features

- Event creation and management.
- User authentication and roles (admin, event organizer, attendee).
- Email remainder is sent to user once the event is booked.
- Dashboard for tracking event metrics and attendees.
- Real-time notifications.
- Responsive design for mobile and web.

## Technologies Used

This project utilizes the following technologies:

- **Front-end**: HTML5, CSS3, Bootstrap 5
- **Back-end**: Node.js, Express.js, Firebase
- **Database**: MongoDB
- **Version Control**: Git, GitHub
- **Deployment**: Vercel, GitHub Actions

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/theRedeemer997/evently.git
   ```

2. Navigate to the project directory:

   ```bash
   cd evently
   ```

3. Install dependencies for both front-end and back-end:

   ```bash
   npm install
   ```

4. Set up the environment variables by creating a `.env` file in the root directory. Add your configurations as shown below:

   ```bash
   mongoUri =
   PORT =
   SECRET =
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`.

## Usage

After installation, you can:

- Register and log in as a user.
- Register and log in as a organizer.
- Create new events and manage existing ones.
- Admin dashboard where the events are approved or deleted.
- Receive real-time updates through email once the event is booked.

<!--For full documentation on the API and platform features, refer to the [Wiki](https://github.com/theRedeemer997/evently/wiki).-->

## Contribution Guidelines

To maintain code quality and streamline collaboration, please adhere to the following guidelines before committing any code:

1. **Do not push directly to the `main` branch.**
2. **Do not commit your `.env` file.**
3. For each development iteration, a new branch will be created, named `feature-iteration-x`, where `x` represents the iteration number. All code changes for that iteration should be merged into this branch after proper testing.
4. When working on a specific feature (e.g., login functionality), create a dedicated branch named `feature-login`. Commit your changes to this branch.
5. Once the feature is complete and tested, submit a Pull Request (PR) to the relevant iteration branch (`feature-iteration-x`).
6. After successful testing of the iteration branch, a final PR will be raised to merge it into `main`.
7. Once merged, the code will be deployed to a live environment.

## Contributors

A list of contributors to this project can be found [here](contributors.md).

## License

This project is licensed under the [MIT License](LICENSE).
