import TeamModel from '../models/TeamModel.js';
import multer from 'multer';
import path from 'path';
export const getTeams = async (req, res) => {
    try {
        const result=await TeamModel.findAll();
        res.json(result)
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getTeamFromID = async (req, res) => {
    try {
        const result = await TeamModel.findOne({
            where: { idTeam: req.params.idTeam }
        });
        res.json(result);

    } catch (error) {
        res.json({ meesage: error.message })
    }
}

export const updateTeam = async (req, res) => {
    try {
  
      const storage = multer.diskStorage({
        destination: 'public/imagesTeam',
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
        const teamID = req.body.idTeam;   
        try {
          await TeamModel.update(
            { imagen: newImageFilename },
            { where: { idTeam: teamID } }
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