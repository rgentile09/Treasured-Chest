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
const port = process.env.PORT || 3306;

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
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
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
    const { firstName, lastName, email, password, verifyPassword } = req.body;

    if (password !== verifyPassword) {
        return res.status(400).send({ errors: { password: 'Passwords do not match' } });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send({ errors: { email: 'Email already exists' } });
        } else {
            res.status(400).send({ errors: { general: 'Error registering user' } });
        }
    }
});

// Protected route example
app.get('/protected', (req, res) => {
    res.send('Protected route');
});

app.get('*', (req, res) => {
    res.status(path.join(__dirname, 'public', 'home.jsx'));
}); 

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