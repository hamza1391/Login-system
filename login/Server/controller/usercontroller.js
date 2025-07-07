import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../model/userModel.js';

dotenv.config(); // Load env vars

// 🟢 POST /api/signup
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all input fields' });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new userModel({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🟢 POST /api/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all input fields' });
    }

    const user = await userModel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Access token (optional for now if you're using refresh token only)
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Refresh token
    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      email: user.email,
      accessToken,
      refreshToken
    });
  } catch (err) {
    console.error('❌ Unexpected login error:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    });

    return res.status(500).json({ message: 'Internal server error' });
  }
};

// 🟢 GET /api/protected (requires JWT middleware)
export const protectedData = (req, res) => {
  try {
    res.status(200).json({
      message: 'You have accessed protected data ✅',
      userId: req.userId
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

