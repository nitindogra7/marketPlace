import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Otp from '../models/otp.model.js';

export const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const findUserByEmailOrUsername = async (email, username) => {
  return await User.findOne({
    $or: [{ email }, { username }],
  });
};

export const hashPassword = async (password) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);

  if (!saltRounds) {
    throw new Error('Invalid SALT_ROUNDS');
  }

  return await bcrypt.hash(password, saltRounds);
};

export const saveOrUpdateOtp = async ({
  email,
  username,
  password,
  companyName,
  otp,
}) => {
  const hashedOtp = await bcrypt.hash(String(otp), 10);

  return await Otp.findOneAndUpdate(
    { email },
    {
      email,
      username,
      password,
      companyName,
      otp: hashedOtp,
    },
    {
      upsert: true,
      new: true,
    }
  );
};

export const createUserFromOtp = async (otpUser) => {
  return await User.create({
    email: otpUser.email,
    username: otpUser.username,
    password: otpUser.password,
    companyName: otpUser.companyName,
    role: 'owner',
  });
};

export const saveHashedRefreshToken = async (user, refreshToken) => {
  user.refreshToken = hashToken(refreshToken);
  await user.save();
};
