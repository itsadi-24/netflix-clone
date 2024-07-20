import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars';

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '1h' });
};
