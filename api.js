import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/database.js";
import { Course, Package, User, UserProgress } from "./models/index.js";

const app = express();
const port = process.env.API_PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Connect to database
connectDB();


// Get a single course by ID
app.get("/videolib/:id", async (req, res) => {
    try {
        const course = await Course.findOne({ id: req.params.id });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        
        // Increment views
        await course.incrementViews();
        
        console.log(`Course ${req.params.id} requested:`, course.title);
        res.json(course);
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ 
            message: "Error fetching course", 
            error: error.message 
        });
    }
});



// Course categories configuration (static data for UI)
const courseCategories = {
    "1-4": {
        title: "Early Learners (Ages 1-4)",
        description: "Foundational sign language through play and basic gestures",
        color: "#FF9F4A"
    },
    "5-10": {
        title: "Young Explorers (Ages 5-10)", 
        description: "Building vocabulary and simple conversations",
        color: "#4A6FFF"
    },
    "15+": {
        title: "Advanced Learners (Ages 15+)",
        description: "Complex communication and everyday conversations",
        color: "#36B37E"
    }
};

// ========== COURSE ENDPOINTS ==========

// Get courses by age group
app.get("/courses/:ageGroup", async (req, res) => {
    try {
        const ageGroup = req.params.ageGroup;
        
        if (!courseCategories[ageGroup]) {
            return res.status(404).json({ message: "Invalid age group" });
        }
        
        const courses = await Course.findByAgeGroup(ageGroup);
        
        res.json({
            category: courseCategories[ageGroup],
            courses: courses
        });
    } catch (error) {
        console.error("Error fetching courses by age group:", error);
        res.status(500).json({ 
            message: "Error fetching courses", 
            error: error.message 
        });
    }
});

// Get all course categories with course counts
app.get("/categories", async (req, res) => {
    try {
        const categoriesWithCounts = await Promise.all(
            Object.keys(courseCategories).map(async (key) => {
                const courseCount = await Course.countDocuments({ 
                    ageGroup: key, 
                    isPublished: true 
                });
                
                return {
                    id: key,
                    ...courseCategories[key],
                    courseCount
                };
            })
        );
        
        res.json(categoriesWithCounts);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ 
            message: "Error fetching categories", 
            error: error.message 
        });
    }
});

// Get all courses
app.get("/courses", async (req, res) => {
    try {
        const { 
            ageGroup, 
            category, 
            difficulty, 
            limit = 50, 
            page = 1,
            search 
        } = req.query;
        
        let query = { isPublished: true };
        
        // Add filters
        if (ageGroup) query.ageGroup = ageGroup;
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }
        
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const courses = await Course.find(query)
            .sort({ 'analytics.enrollments': -1, createdAt: -1 })
            .limit(parseInt(limit))
            .skip(skip);
            
        const total = await Course.countDocuments(query);
        
        res.json({
            courses,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ 
            message: "Error fetching courses", 
            error: error.message 
        });
    }
});

// Get popular courses
app.get("/courses/popular", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const courses = await Course.getPopular(limit);
        res.json(courses);
    } catch (error) {
        console.error("Error fetching popular courses:", error);
        res.status(500).json({ 
            message: "Error fetching popular courses", 
            error: error.message 
        });
    }
});

// ========== PACKAGE ENDPOINTS ==========

// Get all packages
app.get("/packages", async (req, res) => {
    try {
        const { 
            ageGroup, 
            targetAudience, 
            popular,
            limit,
            search 
        } = req.query;
        
        let query = { isActive: true };
        
        // Add filters
        if (ageGroup) query.ageGroups = ageGroup;
        if (targetAudience) query.targetAudience = targetAudience;
        if (popular === 'true') query.popular = true;
        if (search) query = { ...query, ...Package.searchPackages(search) };
        
        let packagesQuery = Package.find(query).sort({ popular: -1, 'analytics.enrollments': -1 });
        
        if (limit) packagesQuery = packagesQuery.limit(parseInt(limit));
        
        const packages = await packagesQuery;
        
        // Increment views for each package
        await Promise.all(packages.map(pkg => pkg.incrementViews()));
        
        res.json(packages);
    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(500).json({ 
            message: "Error fetching packages", 
            error: error.message 
        });
    }
});

// Get a specific package by ID
app.get("/packages/:id", async (req, res) => {
    try {
        const packageData = await Package.findOne({ 
            id: req.params.id, 
            isActive: true 
        });
        
        if (!packageData) {
            return res.status(404).json({ message: "Package not found" });
        }
        
        // Increment views
        await packageData.incrementViews();
        
        res.json(packageData);
    } catch (error) {
        console.error("Error fetching package:", error);
        res.status(500).json({ 
            message: "Error fetching package", 
            error: error.message 
        });
    }
});

// Get popular packages
app.get("/packages/popular", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const packages = await Package.getPopular(limit);
        res.json(packages);
    } catch (error) {
        console.error("Error fetching popular packages:", error);
        res.status(500).json({ 
            message: "Error fetching popular packages", 
            error: error.message 
        });
    }
});

// ========== AUTHENTICATION ENDPOINTS ==========

// Login endpoint
app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        // Find user by email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        // For demo purposes, we'll do a simple password check
        // In production, you should hash passwords and compare hashes
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        // Return user data (excluding password)
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            ageGroup: user.ageGroup,
            userType: user.userType
        };
        
        res.json({ 
            message: "Login successful", 
            user: userData 
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            message: "Login failed", 
            error: error.message 
        });
    }
});

// Register endpoint
app.post("/auth/register", async (req, res) => {
    try {
        const userData = req.body;
        
        // Check if user already exists
        const existingUser = await User.findByEmail(userData.email);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this email" });
        }
        
        // Create new user
        const user = new User(userData);
        await user.save();
        
        // Return user data (excluding password)
        const responseData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            ageGroup: user.ageGroup,
            userType: user.userType
        };
        
        res.status(201).json({ 
            message: "Registration successful", 
            user: responseData 
        });
    } catch (error) {
        console.error("Registration error:", error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Validation error", 
                errors: error.errors 
            });
        }
        
        res.status(500).json({ 
            message: "Registration failed", 
            error: error.message 
        });
    }
});

// ========== USER MANAGEMENT ENDPOINTS ==========

// Create/Update user profile
app.post("/users", async (req, res) => {
    try {
        const userData = req.body;
        
        // Check if user exists by email or firebaseUid
        let user;
        if (userData.firebaseUid) {
            user = await User.findByFirebaseUid(userData.firebaseUid);
        } else if (userData.email) {
            user = await User.findByEmail(userData.email);
        }
        
        if (user) {
            // Update existing user
            Object.assign(user, userData);
            await user.save();
            res.json({ user, message: "User updated successfully" });
        } else {
            // Create new user
            user = new User(userData);
            await user.save();
            res.status(201).json({ user, message: "User created successfully" });
        }
    } catch (error) {
        console.error("Error creating/updating user:", error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Validation error", 
                errors: error.errors 
            });
        }
        
        if (error.code === 11000) {
            return res.status(409).json({ 
                message: "User already exists with this email" 
            });
        }
        
        res.status(500).json({ 
            message: "Error creating/updating user", 
            error: error.message 
        });
    }
});

// Get user profile
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ 
            message: "Error fetching user", 
            error: error.message 
        });
    }
});

// Enroll user in package
app.post("/users/:userId/enroll/:packageId", async (req, res) => {
    try {
        const { userId, packageId } = req.params;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const packageData = await Package.findOne({ id: packageId });
        if (!packageData) {
            return res.status(404).json({ message: "Package not found" });
        }
        
        // Enroll user in package
        await user.enrollInPackage(packageId);
        await packageData.addEnrollment();
        
        res.json({ 
            message: "Successfully enrolled in package",
            package: packageData
        });
    } catch (error) {
        console.error("Error enrolling user:", error);
        res.status(500).json({ 
            message: "Error enrolling user", 
            error: error.message 
        });
    }
});

// ========== USER PROGRESS ENDPOINTS ==========

// Get user progress for a course
app.get("/users/:userId/progress/:courseId", async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        
        const progress = await UserProgress.findUserProgress(userId, courseId);
        if (!progress) {
            return res.status(404).json({ message: "Progress not found" });
        }
        
        res.json(progress);
    } catch (error) {
        console.error("Error fetching user progress:", error);
        res.status(500).json({ 
            message: "Error fetching progress", 
            error: error.message 
        });
    }
});

// Update user progress
app.post("/users/:userId/progress/:courseId", async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        const { progressPercentage, timeSpent } = req.body;
        
        let progress = await UserProgress.findUserProgress(userId, courseId);
        
        if (!progress) {
            // Create new progress record
            progress = new UserProgress({
                userId,
                courseId,
                progressPercentage: 0,
                timeSpent: 0
            });
        }
        
        // Update progress
        await progress.updateProgress(progressPercentage, timeSpent);
        
        // Update user and course analytics
        const user = await User.findById(userId);
        const course = await Course.findOne({ id: courseId });
        
        if (user && progress.status === 'completed' && progress.progressPercentage === 100) {
            user.progress.totalCoursesCompleted += 1;
            await user.save();
            
            if (course) {
                await course.addCompletion();
            }
        }
        
        res.json({
            progress,
            message: "Progress updated successfully"
        });
    } catch (error) {
        console.error("Error updating progress:", error);
        res.status(500).json({ 
            message: "Error updating progress", 
            error: error.message 
        });
    }
});

// ========== ANALYTICS ENDPOINTS ==========

// Get dashboard stats
app.get("/analytics/dashboard", async (req, res) => {
    try {
        const [
            totalCourses,
            totalPackages,
            totalUsers,
            popularCourses,
            popularPackages
        ] = await Promise.all([
            Course.countDocuments({ isPublished: true }),
            Package.countDocuments({ isActive: true }),
            User.countDocuments({ isActive: true }),
            Course.getPopular(5),
            Package.getPopular(3)
        ]);
        
        res.json({
            stats: {
                totalCourses,
                totalPackages,
                totalUsers
            },
            popularCourses,
            popularPackages
        });
    } catch (error) {
        console.error("Error fetching dashboard analytics:", error);
        res.status(500).json({ 
            message: "Error fetching analytics", 
            error: error.message 
        });
    }
});
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });