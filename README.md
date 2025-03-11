# Ticketing System

A comprehensive ticketing system with customer support features, built with React, Socket.io, and Supabase.

## Features

- Customer ticket submission and tracking
- Agent dashboard for ticket management
- Real-time chat functionality
- Email integration
- Knowledge base
- Reporting and analytics

## Technologies Used

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, Socket.io
- Database: Supabase
- Authentication: Supabase Auth
- Styling: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/StuntmanDaver/ticketing-system.git
   cd ticketing-system
   ```

2. Install dependencies for the frontend
   ```
   cd project
   npm install
   ```

3. Install dependencies for the Socket.io server
   ```
   cd ../my-socket-server
   npm install
   ```

4. Set up environment variables
   - Create `.env` files in both the `project` and `my-socket-server` directories
   - Add the necessary environment variables (see `.env.example` files)

### Running the Application

1. Start the Socket.io server
   ```
   cd my-socket-server
   node index.js
   ```

2. Start the frontend development server
   ```
   cd project
   npm run dev
   ```

3. Open your browser and navigate to http://localhost:5173

## Deployment

- Frontend: Netlify or Vercel
- Socket.io Server: Heroku or similar service
- Database: Supabase cloud

## License

This project is licensed under the MIT License - see the LICENSE file for details. 