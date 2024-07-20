import express from 'express'; //esmodules

import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();
const PORT = ENV_VARS.PORT;
app.use(express.json()); // to parse the req.body

//it means any req to 'api/v1/auth' will be handeled by authRoutes
// start with forward slash
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, (req, res) => {
  console.log('Server is running on port' + PORT);
  connectDB();
});
