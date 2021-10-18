import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './backend/config/db.js';
import vehicleRouter from './backend/routes/vehicleRoutes'
import violationTypeRouter from './backend/routes/violationTypeRoutes.js'
import violationRouter from './backend/routes/violationRoutes.js'
import { errorHandler } from './backend/middleware/errorMiddleware.js'
import cors from 'cors';


dotenv.config({ path: './.env' })

connectDB(process.env.MONGO_URI)

const app = express();



if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors())
app.use(express.json())

app.use('/api/vehicles', vehicleRouter)
app.use('/api/violationtypes', violationTypeRouter)
app.use('/api/violations',violationRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.underline);
})