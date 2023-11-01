import express from 'express'
import { getDriverFromID, getDrivers } from '../controllers/DriverController.js'
import { getCircuitFormId, getCircuits } from '../controllers/Circuitcontroller.js';
import { getTeamFromID, getTeams } from '../controllers/TeamController.js';
import { getCircuitFromRace, getRaceFromId, getRaces } from '../controllers/RaceController.js';
import { getResultFromDriver, getStatusRace } from '../controllers/Resultcontroller.js';
const router = express.Router()

// Routting Drivers
router.get('/driver/returnAll',getDrivers);
router.get('/driver/getDriverFromID/:idDriver',getDriverFromID);

// Routting Circuit
router.get('/circuit/returnAll',getCircuits);
router.get('/circuit/getCircuitFromId/:idCircuit',getCircuitFormId)

// Routting Team
router.get('/team/getTeams',getTeams);
router.get('/team/getTeamFromId/:idTeam',getTeamFromID);

// Routting Race
router.get('/race/getRaces',getRaces);
router.get('/race/getRaceFromId/:idRace',getRaceFromId);
router.get('/race/getCircuitFromRace/:idRace',getCircuitFromRace);

// Routting Result
router.get('/result/getResultFromDriver/:idDriver',getResultFromDriver);
router.get('/result/getStatusRace',getStatusRace);
export default router
