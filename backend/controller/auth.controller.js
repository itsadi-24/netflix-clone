import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export async function signup(req, res) {
  try {
    const { username, password, email } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }

    // Use a regex to check if the user actually sends a valid email
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid Email' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 6 characters long' });
    }

    // Check for already existing email
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Check for already existing username
    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PICS = [
      'https://randomuser.me/api/portraits/men/1.jpg',
      'https://randomuser.me/api/portraits/women/1.jpg',
      'https://randomuser.me/api/portraits/men/2.jpg',
      'https://randomuser.me/api/portraits/women/2.jpg',
      'https://randomuser.me/api/portraits/men/3.jpg',
    ];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      image: image,
    });
    // Save the signed up user to the db
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log('Error in signup Controller', error.message);
  }
}

export async function login(req, res) {
  res.send('Login');
}

export async function logout(req, res) {
  res.send('Logout');
}

// Some JWT concepts: -
// 	-JWT is created everytime a user logs in or signs up
// 	- it has a expiration time period after that the user will need to login again and same process is repeated
// 	- Some systems use refresh tokens alongside JWTs.When the JWT expires, the refresh token can be used to obtain a new JWT without requiring the user to log in again.
// - with every request from user the JWT is sent along for validation
