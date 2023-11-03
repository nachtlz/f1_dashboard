import express from 'express'
import { getDriverFromID, getDrivers, updateDriver } from '../controllers/DriverController.js'
import { getCircuitFormId, getCircuits, updateCircuit } from '../controllers/CircuitController.js';
import { getTeamFromID, getTeams, updateTeam } from '../controllers/TeamController.js';
import { getCircuitFromRace, getRaceFromId, getRaces } from '../controllers/RaceController.js';
import { getResultFromDriver, getStatusRace } from '../controllers/ResultController.js';
const router = express.Router()

// Routting Drivers
router.get('/driver/returnAll',getDrivers);
router.get('/driver/getDriverFromID/:idDriver',getDriverFromID);
router.post('/driver/update',updateDriver);

// Routting Circuit
router.get('/circuit/returnAll',getCircuits);
router.get('/circuit/getCircuitFromId/:idCircuit',getCircuitFormId)
router.post('/circuit/update',updateCircuit);

// Routting Team
router.get('/team/getTeams',getTeams);
router.get('/team/getTeamFromId/:idTeam',getTeamFromID);
router.post('/team/update',updateTeam)

// Routting Race
router.get('/race/getRaces',getRaces);
router.get('/race/getRaceFromId/:idRace',getRaceFromId);
router.get('/race/getCircuitFromRace/:idRace',getCircuitFromRace);

// Routting Result
router.get('/result/getResultFromDriver/:idDriver',getResultFromDriver);
router.get('/result/getStatusRace',getStatusRace);
export default router
