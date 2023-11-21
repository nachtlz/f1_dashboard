import CircuitModel from '../models/CircuitModel.js'
import multer from 'multer';
import path from 'path';
export const getCircuits = async (req, res) => {
    try {
        const result = await CircuitModel.findAll();
        res.json(result)
    } catch (error) {
        res.json({ message: error.message });
    }
}
export const getCircuitFormId = async (req, res) => {
    try {
        const result = await CircuitModel.findOne({
            where: { idCircuit: req.params.idCircuit }
        });
        res.json(result);

    } catch (error) {
        res.json({ meesage: error.message })
    }
}

export const updateCircuitReal = async (req, res) => {
    try {
  
      const storage = multer.diskStorage({
        destination: 'public/imagesCircuit/real',
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
        const circuitID = req.body.idCircuit; 
        console.log(circuitID);
  
        try {
          await CircuitModel.update(
            { imagenReal: newImageFilename },
            { where: { idCircuit: circuitID } }
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
  export const updateCircuit = async (req, res) => {
    try {
  
      const storage = multer.diskStorage({
        destination: 'public/imagesCircuit/circuit',
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
        const circuitID = req.body.idCircuit; 
        console.log(circuitID);
  
        try {
          await CircuitModel.update(
            { imagenCircuit: newImageFilename },
            { where: { idCircuit: circuitID } }
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