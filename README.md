# 🤟 LearnSign: Interactive AI-Powered Sign Language Learning Platform

<div align="center">

![LearnSign Logo](public/assets/images/logo.png)

**Empowering Communication Through Interactive Sign Language Learning**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)

[Features](#-key-features) • [Screenshots](#-screenshots) • [Installation](#-installation) • [Tech Stack](#-technology-stack) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [About LearnSign](#-about-learnsign)
- [The Problem We Solve](#-the-problem-we-solve)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About LearnSign

LearnSign is a groundbreaking, **AI-powered sign language learning platform** specifically designed for children aged 1-15 and their families. We combine cutting-edge artificial intelligence with engaging educational content to create an interactive, personalized learning experience that makes sign language accessible, fun, and effective.

### Our Mission

To bridge communication gaps and foster inclusivity by providing a free, interactive way for children and families to learn sign language together, building a foundation for a more understanding and connected society.

### Why LearnSign?

- **🎮 Gamified Learning**: Transform education into an engaging adventure
- **🤖 AI-Powered Recognition**: Real-time feedback on sign language gestures using TensorFlow and OpenCV
- **👨‍👩‍👧‍👦 Family-Focused**: Learn together with specially designed combo packages
- **💯 100% Free**: Core courses and features are completely free
- **📱 Mobile-Friendly**: Learn anywhere, anytime on any device
- **🎓 Age-Appropriate**: Tailored content for different age groups

---

## 🚨 The Problem We Solve

Traditional sign language learning methods often face several challenges:

1. **Lack of Engagement**: Traditional methods fail to capture and retain children's attention
2. **No Real-Time Feedback**: Students don't receive immediate corrections on their gestures
3. **Limited Accessibility**: Quality sign language education is often expensive or unavailable
4. **One-Size-Fits-All**: Content doesn't adapt to different age groups and skill levels
5. **Isolated Learning**: No family involvement or community support

LearnSign addresses all these challenges through innovative technology and thoughtful design.

---

## ✨ Key Features

### 🤖 AI-Powered Real-Time Recognition
- Advanced machine learning models built with **TensorFlow/Keras** and **OpenCV**
- Instant feedback on sign language gestures
- Adaptive technology that personalizes the learning pace
- Real-time video processing for gesture capture

### 📚 Age-Grouped Learning Paths

#### 👶 Early Learners (Ages 1-4)
- Foundational sign language through play
- Basic gestures and signs
- Simple words and expressions
- Numbers 1-10
- Common objects and actions

#### 🎒 Young Explorers (Ages 5-10)
- Building vocabulary and simple conversations
- Complete alphabet signs
- Family and relationship terms
- School and educational vocabulary
- Basic conversation skills

#### 🎓 Advanced Learners (Ages 15+)
- Complex communication and everyday conversations
- Advanced conversation techniques
- Complex grammatical structures
- Professional and academic terms
- Cultural aspects of ASL

### 🎯 Interactive Features

- **Video Tutorials**: High-quality instructional videos with professional instructors
- **Quiz Sessions**: Interactive camera-based quizzes that test your signing skills
- **Real-Time Translation**: Convert text to sign language animations
- **Progress Tracking**: Detailed analytics on your learning journey
- **Community Features**: Connect with other learners and share experiences

### 🎮 Gamification Elements

- Achievement badges and milestones
- Progress bars and completion percentages
- Interactive challenges
- Storytelling elements
- Reward systems

---

## 📸 Screenshots

### Home Page
![LearnSign Home Page](screenshots/home.png)
*Welcome to LearnSign - Your journey to mastering sign language begins here*

### Course Catalog
![Course Catalog](screenshots/courses.png)
*Comprehensive sign language courses organized by age groups - All courses are completely FREE!*

### Video Learning Interface
![Video Tutorial](screenshots/video-tutorial.png)
*Interactive video lessons with progress tracking and learning objectives*

### AI-Powered Quiz Session
![Quiz Interface](screenshots/quiz.png)
*Practice with our AI-powered recognition system - Get real-time feedback on your signs*

### Translation Feature
![Translation Tool](screenshots/translate.png)
*Convert text to sign language animations instantly*

---

## 🛠️ Technology Stack

### Frontend
- **Template Engine**: EJS (Embedded JavaScript)
- **Styling**: HTML5, CSS3, Tailwind CSS
- **JavaScript**: Vanilla JS for interactivity
- **Responsive Design**: Mobile-first approach

### Backend
- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **API Server**: RESTful API architecture
- **Session Management**: express-session
- **CORS**: Cross-Origin Resource Sharing enabled

### Database
- **Database**: MongoDB (NoSQL)
- **ODM**: Mongoose
- **Cloud**: MongoDB Atlas (recommended)

### AI/Machine Learning (Python Integration)
- **Framework**: TensorFlow/Keras
- **Computer Vision**: OpenCV
- **API Bridge**: Python Flask APIs
- **Model Types**: 
  - Sign language gesture recognition
  - Text-to-sign translation
  - Numbers and letters recognition

### Development Tools
- **Package Manager**: npm
- **Process Manager**: PM2 (production)
- **Development**: nodemon, concurrently
- **Version Control**: Git

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Python** (v3.8 or higher) - For AI features - [Download](https://www.python.org/downloads/)
- **Git** - [Download](https://git-scm.com/downloads)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/learnsign.git
cd learnsign
```

### Step 2: Install Node.js Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
API_PORT=4000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/learnsign
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learnsign

# Python API URLs (AI Services)
PYTHON_API_URL=http://localhost:8000
TRANSLATE_API_URL=http://localhost:8001
NUMBERS_LETTERS_API_URL=http://localhost:8002

# Session Configuration
SESSION_SECRET=your_super_secret_key_change_in_production

# Node Environment
NODE_ENV=development
```

### Step 4: Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
# Windows: Run MongoDB as a service from Services
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### Step 5: Seed the Database

```bash
npm run seed
```

This will populate your database with:
- Sample courses and video tutorials
- Learning packages
- Course categories
- Demo user data

### Step 6: Set Up Python AI Services (Optional but Recommended)

```bash
# Navigate to Python services directory
cd python-services

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate  # Windows

# Install Python dependencies
pip install -r requirements.txt

# Run Python services (in separate terminals)
python quiz_api.py  # Port 8000
python translate_api.py  # Port 8001
python recognition_api.py  # Port 8002
```

### Step 7: Start the Application

**Development Mode (with auto-reload):**
```bash
# Run both frontend and API servers concurrently
npm run dev:full
```

**Or run servers separately:**
```bash
# Terminal 1: Frontend server
npm run dev

# Terminal 2: API server
npm run api:dev
```

**Production Mode:**
```bash
# Start frontend server
npm start

# Start API server (in another terminal)
npm run api
```

### Step 8: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000

---

## 📖 Usage

### For Students

1. **Create an Account**: Sign up for free on the login page
2. **Choose Your Path**: Select your age group (Early Learners, Young Explorers, or Advanced)
3. **Start Learning**: Begin with introductory videos and progress through courses
4. **Practice with AI**: Use the interactive quiz feature to practice signs
5. **Track Progress**: Monitor your learning journey on the dashboard

### For Parents/Educators

1. **Family Learning**: Use combo packages to learn together with your children
2. **Monitor Progress**: Track your child's learning achievements
3. **Community Support**: Connect with other learning families
4. **Custom Pace**: Let children learn at their own comfortable pace

### Key Pages

- **`/`** - Home page with platform overview
- **`/dashboard`** - Main learning dashboard
- **`/courses`** - Browse all course categories
- **`/courses/:ageGroup`** - Courses filtered by age group
- **`/tutorials/basics`** - Basic sign language tutorials
- **`/quiz`** - Interactive AI-powered quiz session
- **`/translate`** - Text-to-sign language translation
- **`/packages`** - View learning packages
- **`/community`** - Connect with other learners
- **`/about`** - Learn more about LearnSign

---

## 📁 Project Structure

```
learnsign/
├── config/
│   └── database.js           # MongoDB connection configuration
├── models/
│   ├── Course.js            # Course schema and methods
│   ├── Package.js           # Package schema
│   ├── User.js              # User schema
│   ├── UserProgress.js      # Progress tracking schema
│   └── index.js             # Model exports
├── seeds/
│   └── seedData.js          # Database seeding script
├── public/
│   ├── assets/
│   │   ├── videos/          # Tutorial videos
│   │   ├── images/          # Images and icons
│   │   └── css/             # Stylesheets
│   └── js/                  # Client-side JavaScript
├── views/
│   ├── home.ejs             # Landing page
│   ├── dashboard.ejs        # User dashboard
│   ├── courses.ejs          # Course catalog
│   ├── quiz.ejs             # Quiz interface
│   ├── translate.ejs        # Translation tool
│   └── ...                  # Other view templates
├── python-services/
│   ├── quiz_api.py          # AI quiz recognition
│   ├── translate_api.py     # Translation service
│   ├── recognition_api.py   # Numbers/letters recognition
│   └── requirements.txt     # Python dependencies
├── index.js                 # Main Express server
├── api.js                   # API server
├── package.json             # Node.js dependencies
├── .env                     # Environment variables (create this)
└── README.md               # This file
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:4000
```

### Courses API

#### Get All Courses
```http
GET /courses?ageGroup=1-4&limit=50&page=1
```

#### Get Course by ID
```http
GET /videolib/:id
```

#### Get Courses by Age Group
```http
GET /courses/:ageGroup
```

### Packages API

#### Get All Packages
```http
GET /packages
```

#### Get Package by ID
```http
GET /packages/:id
```

### Authentication API

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "ageGroup": "5-10"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### User Progress API

#### Get User Progress
```http
GET /users/:userId/progress/:courseId
```

#### Update Progress
```http
POST /users/:userId/progress/:courseId
Content-Type: application/json

{
  "progressPercentage": 75,
  "timeSpent": 30
}
```

### AI Recognition API

#### Sign Language Quiz
```http
POST /api/quiz
Content-Type: application/json

{
  "image": "base64_encoded_image",
  "expectedSign": "hello"
}
```

---

## 🎥 Adding New Video Content

### Quick Guide

Use the provided script to add new videos easily:

```bash
node add-new-video.js
```

Edit the `add-new-video.js` file with your video details:

```javascript
const newVideo = {
    id: "010",  // Unique ID
    title: "Greetings and Introductions",
    description: "Learn how to greet people in sign language",
    video: "/assets/videos/greetings.mp4",
    category: "basics",
    ageGroup: "5-10",
    difficulty: "beginner",
    duration: 8,
    // ... more details
};
```

### Video Categories
- `basics` - Fundamental signs
- `family` - Family-related signs
- `numbers` - Number signs
- `letters` - Alphabet
- `emotions` - Emotion expressions
- `daily` - Daily activities
- `conversation` - Conversational signs

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**: Submit issues for bugs you find
2. **Suggest Features**: Share ideas for new features
3. **Improve Documentation**: Help us improve our docs
4. **Submit Pull Requests**: Contribute code improvements
5. **Create Content**: Add new video tutorials or lessons

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- Follow existing code formatting
- Write clear commit messages
- Add comments for complex logic
- Test your changes before submitting
- Update documentation as needed

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod
```

**Port Already in Use**
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Python API Not Working**
```bash
# Ensure Python dependencies are installed
pip install -r python-services/requirements.txt

# Check if Python APIs are running
curl http://localhost:8000/health
```

**Module Not Found Errors**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 🔒 Security

- Never commit `.env` files to version control
- Use strong session secrets in production
- Implement rate limiting for API endpoints
- Validate and sanitize all user inputs
- Use HTTPS in production
- Keep dependencies updated

---

## 📊 Performance Optimization

- Implement caching for frequently accessed data
- Optimize video files for web delivery
- Use CDN for static assets in production
- Implement lazy loading for images and videos
- Minify CSS and JavaScript files
- Enable Gzip compression

---

## 🌐 Deployment

### Deployment Options

1. **Heroku**
2. **Vercel**
3. **AWS (EC2, ECS)**
4. **DigitalOcean**
5. **Google Cloud Platform**

### Environment Setup

Ensure all production environment variables are set:
- Database connection strings
- Session secrets
- API URLs
- Node environment (`NODE_ENV=production`)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**LearnSign Development Team**

- Project Lead: [Your Name]
- AI/ML Engineers: [Team Members]
- Frontend Developers: [Team Members]
- Backend Developers: [Team Members]
- UX/UI Designers: [Team Members]

---

## 📞 Contact & Support

- **Email**: support@learnsign.com
- **Website**: https://learnsign.com
- **GitHub Issues**: [Report a Bug](https://github.com/yourusername/learnsign/issues)
- **Community Forum**: [Join Discussion](https://community.learnsign.com)

---

## 🙏 Acknowledgments

- Thanks to all contributors who have helped build LearnSign
- Sign language instructors who provided expert guidance
- The deaf community for valuable feedback
- Open-source projects that made this possible:
  - TensorFlow
  - OpenCV
  - Express.js
  - MongoDB

---

## 🎉 Success Stories

> "LearnSign transformed how our family communicates. My daughter can now sign basic phrases!" - *Parent User*

> "The AI recognition feature is amazing. It's like having a personal tutor!" - *Student, Age 12*

> "Perfect for classroom use. My students love the interactive quizzes." - *Educator*

---

## 🗺️ Roadmap

### Version 2.0 (Coming Soon)
- [ ] Mobile apps (iOS and Android)
- [ ] More sign languages (BSL, LSF, etc.)
- [ ] Multiplayer learning games
- [ ] Virtual reality integration
- [ ] Advanced analytics dashboard
- [ ] Certification programs
- [ ] Live video tutoring

### Version 3.0 (Future)
- [ ] AI-powered conversation practice
- [ ] Augmented reality features
- [ ] Integration with schools and institutions
- [ ] Advanced progress analytics
- [ ] Social learning features

---

<div align="center">

**⭐ Star us on GitHub — it helps!**

Made with ❤️ by the LearnSign Team

**LearnSign: Making sign language learning accessible for families everywhere. 🤟**

[⬆ Back to Top](#-learnsign-interactive-ai-powered-sign-language-learning-platform)

</div>
