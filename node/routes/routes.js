import express from 'express'
import { getDriverFromID, getDrivers, updateDriver } from '../controllers/DriverController.js'
import { getCircuitFormId, getCircuits, updateCircuitReal, updateCircuit } from '../controllers/Circuitcontroller.js';
import { getTeamFromID, getTeams, updateTeam } from '../controllers/TeamController.js';
import { getCircuitFromRace, getRaceAndCircuit, getRaceAndCircuitFromCircuit, getRaceFromId, getRaces } from '../controllers/RaceController.js';
import { getResultFromDriver, getResultFromRace, getStatusFromRace, getStatusRace } from '../controllers/ResultController.js';
const router = express.Router()

// Routting Drivers
router.get('/driver/returnAll',getDrivers);
router.get('/driver/getDriverFromID/:idDriver',getDriverFromID);
router.post('/driver/update',updateDriver);

// Routting Circuit
router.get('/circuit/returnAll',getCircuits);
router.get('/circuit/getCircuitFromId/:idCircuit',getCircuitFormId)
router.post('/circuit/update/real',updateCircuitReal);
router.post('/circuit/update/circuit',updateCircuit);


// Routting Team
router.get('/team/returnAll',getTeams);
router.get('/team/getTeamFromId/:idTeam',getTeamFromID);
router.post('/team/update',updateTeam)

// Routting Race
router.get('/race/returnAll',getRaces);
router.get('/race/getRaceFromId/:idRace',getRaceFromId);
router.get('/race/getCircuitFromRace/:idRace',getCircuitFromRace);
router.get('/race/getRaceAndCircuit',getRaceAndCircuit)
router.get('/race/getRaceAndCircuitFromCircuit/:idCircuit',getRaceAndCircuitFromCircuit);

// Routting Result
router.get('/result/getResultFromDriver/:idDriver',getResultFromDriver);
router.get('/result/getResultFromRace/:idRace',getResultFromRace);
router.get('/result/getStatusRace',getStatusRace);
router.get('/result/getStatusFromRace/:idRace',getStatusFromRace);
export default router
