import DriverModel from '../models/DriverModel.js';

export const getDrivers=async(req,res)=>{
    try{
        const result = await DriverModel.findAll();
        res.json(result)
    }catch(error){
        res.json({message : error.message});
    }
}