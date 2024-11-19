//import express, { json } from 'express';
import express from 'express';
import cors from 'cors';
import routes from './app/routes/index.js';

// INITIATE APP FOR EXPRESS
const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//GROUPING ALL ROUTES AND MAKE LINK /API/.....
app.use('/api', routes);

export default app;
