# Front Desk System at a Clinic

A comprehensive web-based application for managing patient queues and doctor appointments at a clinic.

## 🏥 Features

### Core Features
- *Authentication*: Secure login for front desk staff
- *Queue Management*: Add walk-in patients, assign queue numbers, track status
- *Doctor Management*: CRUD operations for doctor profiles with specializations
- *Appointment Management*: Book, reschedule, and cancel appointments
- *Real-time Updates*: Live status tracking for patients and appointments

### Bonus Features ✅
- *Priority Queue System*: Urgent cases get priority with visual indicators
- *Advanced Search & Filter*: Find doctors by specialization, location, availability
- *Live Deployment*: Fully deployed application with live demo link
- *Responsive Design*: Works on desktop, tablet, and mobile devices

## 🛠 Technology Stack

### Backend
- *NestJS*: Node.js framework for scalable server-side applications
- *JWT Authentication*: Secure login and authorization
- *TypeORM*: Object-Relational Mapper for MySQL database
- *MySQL*: Database for storing user, doctor, and appointment data

### Frontend
- *Next.js*: React framework for server-side rendering
- *Tailwind CSS*: Utility-first CSS framework for styling
- *TypeScript*: Type-safe JavaScript development

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. *Clone and install dependencies*
   bash
   git clone <repository-url>
   cd clinic_system
   npm run install:all
   

2. *Database Setup*
   bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE clinic_system;
   

3. *Environment Configuration*
   bash
   # Backend environment
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database credentials
   
   # Frontend environment
   cp frontend/.env.example frontend/.env
   

4. *Run the Application*
   bash
   # Development mode (both backend and frontend)
   npm run dev
   
   # Or run separately
   npm run dev:backend  # Backend on http://localhost:3001
   npm run dev:frontend # Frontend on http://localhost:3000
   

## 📁 Project Structure


clinic_system/
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── doctors/        # Doctor management
│   │   ├── patients/       # Patient management
│   │   ├── appointments/   # Appointment management
│   │   └── queue/          # Queue management
│   └── package.json
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Next.js pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── styles/         # Global styles
│   └── package.json
└── package.json           # Root package.json for monorepo


## 🎯 Key Features Implementation

### Queue Management
- Add walk-in patients with auto-assigned queue numbers
- Real-time status updates (Waiting → With Doctor → Completed)
- Priority system for urgent cases
- Estimated wait time calculations

### Doctor Management
- Complete CRUD operations for doctor profiles
- Specialization, gender, location, and availability tracking
- Search and filter functionality
- Schedule management and availability status

### Appointment Management
- Interactive calendar interface
- Book new appointments with modal form
- Reschedule and cancel existing appointments
- Status tracking (Booked, Completed, Canceled)

## 🔐 Authentication

The system uses JWT-based authentication:
- Secure login for front desk staff
- Role-based access control
- Protected routes and API endpoints

## 🎨 UI/UX Design

- *Dark Theme*: Modern dark interface matching the provided mockups
- *Responsive Design*: Works seamlessly across all devices
- *Real-time Indicators*: Live status updates and notifications
- *Intuitive Navigation*: Easy-to-use interface for front desk staff

## 🚀 Deployment

### Live Demo
- *Frontend*: Deployed on Vercel
- *Backend*: Deployed on Railway/Render
- *Database*: Hosted on PlanetScale/AWS RDS

### Deployment Links
- Frontend: [Live Demo Link]
- Backend API: [API Documentation]

## 📝 API Documentation

### Authentication
- POST /auth/login - Staff login
- POST /auth/logout - Staff logout

### Queue Management
- GET /queue - Get current queue
- POST /queue - Add patient to queue
- PUT /queue/:id/status - Update patient status
- DELETE /queue/:id - Remove patient from queue

### Doctor Management
- GET /doctors - Get all doctors
- POST /doctors - Add new doctor
- PUT /doctors/:id - Update doctor
- DELETE /doctors/:id - Delete doctor

### Appointment Management
- GET /appointments - Get all appointments
- POST /appointments - Book new appointment
- PUT /appointments/:id - Update appointment
- DELETE /appointments/:id - Cancel appointment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support and questions, please contact the development team.
