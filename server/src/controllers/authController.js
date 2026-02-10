import bcrypt from 'bcryptjs';
import { userModel } from '../models/userModel.js';
import { generateToken } from '../utils/jwt.js';
import { validateEmail, validatePassword } from '../utils/validation.js';

export const authController = {
  /**
   * Sign up a new user
   */
  signup: async (req, res, next) => {
    try {
      const { email, password, full_name } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return res.status(400).json({ error: passwordValidation.error });
      }

      // Check if user already exists
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Hash password
      const password_hash = await bcrypt.hash(password, 10);

      // Create user
      const user = await userModel.create({
        email,
        password_hash,
        full_name: full_name || null,
      });

      // Generate token
      const token = generateToken(user.id);

      // Return user without password
      const { password_hash: _, ...userWithoutPassword } = user;

      res.status(201).json({
        message: 'User created successfully',
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Login user
   */
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Find user
      const user = await userModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Update last login
      await userModel.updateLastLogin(user.id);

      // Generate token
      const token = generateToken(user.id);

      // Return user without password
      const { password_hash: _, ...userWithoutPassword } = user;

      res.json({
        message: 'Login successful',
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get current user
   */
  getMe: async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user.id);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  },
};