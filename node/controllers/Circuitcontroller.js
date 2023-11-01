import CircuitModel from '../models/CircuitModel.js'
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