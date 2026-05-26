import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Otp from '../models/otp.model.js';
import { otpSchema } from '../schemas/otp.schema.js';
import { registerSchema } from '../schemas/user.schema.js';
import sendEmail from '../services/nodemailer.services.js';
import generateOtp from '../services/otp.services.js';

import {
  findUserByEmailOrUsername,
  hashPassword,
  saveOrUpdateOtp,
  createUserFromOtp,
  saveHashedRefreshToken,
  hashToken,
  refreshCookieOptions,
} from '../services/auth.services.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

export const signUpController = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: errors,
      });
    }

    const { email, username, password, companyName } = result.data;

    const userExists = await findUserByEmailOrUsername(email, username);

    if (userExists) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await hashPassword(password);

    const otp = generateOtp();
    const emailSent = await sendEmail(otp, email);

    if (!emailSent.success) {
      return res.status(500).json({
        success: false,
        message: emailSent.message,
      });
    }

    const otpData = await saveOrUpdateOtp({
      email,
      username,
      password: hashedPassword,
      companyName,
      otp,
    });

    return res.status(201).json({
      success: true,
      message: 'OTP sent successfully',
      otpId: otpData._id,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    console.error(err);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const result = otpSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: errors,
      });
    }

    const { stringOtp, id } = result.data;

    const otpUser = await Otp.findById(id);

    if (!otpUser) {
      return res.status(404).json({
        success: false,
        message: 'OTP user not found',
      });
    }

    const isOtpValid = await bcrypt.compare(stringOtp, otpUser.otp);

    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid OTP',
      });
    }

    await Otp.findByIdAndDelete(id);

    const user = await createUserFromOtp(otpUser);

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    await saveHashedRefreshToken(user, refreshToken);

    res.cookie('salesNova_rfs_tkn', refreshToken, refreshCookieOptions);

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      userData: {
        username: user.username,
        companyName: user.companyName,
        email: user.email,
        role: user.role,
        accessToken,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'otpId required from localStorage',
      });
    }

    const otpUser = await Otp.findById(id);

    if (!otpUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found, signup again',
      });
    }

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(String(otp), 10);

    otpUser.otp = hashedOtp;
    await otpUser.save();

    const emailSent = await sendEmail(otp, otpUser.email);

    if (!emailSent.success) {
      return res.status(500).json({
        success: false,
        message: emailSent.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later',
    });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.salesNova_rfs_tkn;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not found',
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.refreshToken !== hashToken(refreshToken)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }

    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id, user.role);

    await saveHashedRefreshToken(user, newRefreshToken);

    res.cookie('salesNova_rfs_tkn', newRefreshToken, refreshCookieOptions);

    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.error(err);

    return res.status(401).json({
      success: false,
      message: 'Refresh token expired or invalid',
    });
  }
};
