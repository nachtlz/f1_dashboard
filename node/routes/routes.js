import express from 'express'
import { getDrivers } from '../controllers/DriverController.js'
const router = express.Router()

router.get('/drivers/returnAll',getDrivers);
export default router
