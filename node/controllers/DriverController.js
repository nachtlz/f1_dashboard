import DriverModel from '../models/DriverModel.js';
import multer from 'multer';
import path from 'path';
import { Sequelize as sequelize } from 'sequelize';

export const getDrivers=async(req,res)=>{
    try{
        const result = await DriverModel.findAll();
        res.json(result)
    }catch(error){
        res.json({message : error.message});
    }
}


export const updateDriver = async (req, res) => {
  try {

    const storage = multer.diskStorage({
      destination: 'public/imagesDriver',
      filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const uniqueFileName = `${Date.now()}${fileExtension}`;
        cb(null, uniqueFileName);
      },
    });

    const upload = multer({ storage: storage });

    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.json({ message: err.message });
      }

      if (!req.file) {
        return res.json({ message: 'El fichero no se ha guardado' });
      }

      const newImageFilename = req.file.filename;
      const driverId = req.body.idDriver; 
      console.log(driverId);

      try {
        await DriverModel.update(
          { imagen: newImageFilename },
          { where: { idDriver: driverId } }
        );
          res.json("Imagen Guardada correctamente")
        
      } catch (error) {
        res.json({ message: error.message });
      }
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getDriverFromID = async (req, res) => {
    try {
        const result = await DriverModel.findOne({
            where: { idDriver: req.params.idDriver }
        });
        res.json(result);

    } catch (error) {
        res.json({ meesage: error.message })
    }
}
export const getCountryDriver = async (req, res) => {
  try {
    const result = await DriverModel.findAll({
      attributes: ['nationality', [sequelize.fn('COUNT', sequelize.col('*')), 'count']],
      group: ['nationality'],
    });

    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
};
