import app from './app.js';
import dotenv from 'dotenv';

// IMPORTING ENV DATA
dotenv.config();

// ASSIGNING PORT
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
