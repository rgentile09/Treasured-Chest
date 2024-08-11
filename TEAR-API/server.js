const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3300;

// Connect to MySQL using Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
});

// Define the User model
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true // Allow cookies to be sent
}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'default_secret_key'],
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'None',
    },
}));

// Route to serve the login HTML page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.jsx'));
});

// Route to handle account creation
app.post('/create-account', async (req, res) => {
    console.log('Request received at /create-account');
    const { firstName, lastName, username, email, password, verifyPassword } = req.body;

    if (password !== verifyPassword) {
        return res.status(400).send({ errors: { password: 'Passwords do not match' } });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ firstName, lastName, username, email, password: hashedPassword });
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send({ errors: { email: 'Email or Username already exists' } });
        } else {
            res.status(400).send({ errors: { general: 'Error registering user' } });
        }
    }
});

// Route to handle login
app.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { username: usernameOrEmail },
                    { email: usernameOrEmail }
                ]
            }
        });

        if (!user) {
            return res.status(400).send({ errors: { general: 'Invalid username/email or password' } });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ errors: { general: 'Invalid username/email or password' } });
        }

        // Set session or token here
        res.status(200).send({ message: 'Login successful' });
    } catch (error) {
        res.status(500).send({ errors: { general: 'Error logging in' } });
    }
});

// Protected route example
app.get('/protected', (req, res) => {
    res.send('Protected route');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.jsx'));
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server and connect to the database
app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');
        await sequelize.sync();
        console.log(`Server running at http://localhost:${port}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});