Mentorship Matching Platform
A full-stack backend project that connects mentees with experienced mentors. Built with TypeScript, Node.js, Express, and MongoDB Atlas.



 Features
Authentication with JWT (Register & Login)

Role-based access: Mentees, Mentors, Admin

Mentor profile discovery: filter by name or skill

User profile management

Book mentorship sessions

Approve session requests

MongoDB Atlas for cloud-based data storage



 Folder Structure
bash
Copy
Edit
src/
├── config/         # DB connection
├── controllers/    # Logic for users, sessions, auth
├── interfaces/     # TypeScript interfaces (optional)
├── middlewares/    # Auth middleware
├── models/         # Mongoose schemas
├── routes/         # API routes
├── utils/          # Helper functions
├── validators/     # Input validation (if any)
├── app.ts          # Express app setup
└── server.ts       # App entry point (optional)


 Tech Stack
Backend: Node.js, Express

Language: TypeScript

Database: MongoDB Atlas

Authentication: JWT

Dev Tools: ts-node-dev, dotenv



 Environment Variables (.env)
env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key


 Installation & Run
bash
Copy
Edit
# Clone the repo
git clone https://github.com/your-username/mentorship-backend

# Navigate
cd mentorship-backend

# Install dependencies
npm install

# Start the server
npm run dev


 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/user/profile	Get logged-in user profile
PUT	/api/user/profile	Update profile
GET	/api/mentors	Discover mentors
POST	/api/sessions	Book session
GET	/api/sessions	Get user sessions
PUT	/api/sessions/:id	Update session status

✅ Status
✅ All core features implemented
✅ MongoDB connection working
✅ API tested via Thunder Client/Postman