import User from '../models/user.model.js';
import { registerSchema } from '../schemas/user.schema.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import sendEmail from '../services/nodemailer.services.js';
import generateOtp from '../services/otp.services.js';

const signUpController = async (req, res) => {
  try {
    const hashToken = (token) => {
      return crypto.createHash('sha256').update(token).digest('hex');
    };

    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      const error = result.error.issues.map((err) => err.message);
      return res.status(400).json({ success: false, message: error });
    }

    const { email, username, password } = result.data;
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists)
      return res.status(409).json({
        success: false,
        message: 'user already exists',
      });

    const saltRounds = Number(process.env.SALT_ROUNDS);
    if (isNaN(saltRounds))
      return res.status(500).json({ success: false, message: 'server broke' });
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const otp = generateOtp();
    const emailSent = await sendEmail(otp, email);
    if (!emailSent.success)
      return res
        .status(500)
        .json({ success: false, message: emailSent.message });

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = hashToken(refreshToken);
    await user.save();

    const details = {
      username: user.username,
      email: user.email,
      accessToken,
    };

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie('market_rfs_tkn', refreshToken, options);
    res.status(201).json({
      success: true,
      message: 'user created successfully',
      userData: details,
    });
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(409)
        .json({ success: false, message: 'user already exists' });
    console.error(err);
    res.status(500).json({ success: false, message: 'internal server error' });
  }
};

export default signUpController;
