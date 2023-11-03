import axios from 'axios';
import { useEffect, useState } from 'react';

const URI = 'http://localhost:8000/f1Dashboard/';

const AddImage = () => {
    const [imageDriver, setImageDriver] = useState(null);
    const [imageCircuit, setImageCircuit] = useState(null);
    const [imageTeam, setImageTeam] = useState(null);
    const [drivers, setDrivers] = useState([]);
    const [circuits, setCircuits] = useState([]);
    const [teams, setTeams] = useState([]);

    const [idDriver, setIdDriver] = useState(null);
    const [idCircuit, setidCircuit] = useState(null);
    const [idTeam, setIdTeam] = useState(null);


    const getDrivers = async () => {
        try {
            const resp = (await axios.get(URI + 'driver/returnAll'));
            setDrivers(resp.data)
        } catch (error) {
            console.log('Error al cargar los datos', error);
        }
    };
    const getCircuits = async () => {
        try {
            const resp = (await axios.get(URI + 'circuit/returnAll'));
            setCircuits(resp.data);
        } catch (error) {
            console.log('Error al cargar los datos', error);
        }
    }
    const getTeams = async () => {
        try {
            const resp = (await axios.get(URI + 'team/getTeams'));
            setTeams(resp.data);
        } catch (error) {
            console.log('Error al cargar los datos', error);
        }
    }

    useEffect(() => {
        getDrivers();
        getCircuits();
        getTeams();
    }, []);

    const storeDriver = async (e) => {
        e.preventDefault();
        if (imageDriver) {
            const formData = new FormData();
            formData.append('image', imageDriver);
            formData.append('idDriver', idDriver);


            try {
                const res = await axios.post(URI + 'driver/update', formData);
                console.log(res);
            } catch (error) {
                console.error('Error al subir la imagen:', error);
            }
        }
    };
    const storeCircuit = async (e) => {
        e.preventDefault();
        if (imageCircuit) {
            const formData = new FormData();
            formData.append('image', imageCircuit);
            formData.append('idCircuit', idCircuit);


            try {
                const res = await axios.post(URI + 'circuit/update', formData);
                console.log(res);
            } catch (error) {
                console.error('Error al subir la imagen:', error);
            }
        }
    };

    const storeTeam = async (e) => {
        e.preventDefault();
        if (imageTeam) {
            const formData = new FormData();
            formData.append('image', imageTeam);
            formData.append('idTeam', idTeam);


            try {
                const res = await axios.post(URI + 'team/update', formData);
                console.log(res);
            } catch (error) {
                console.error('Error al subir la imagen:', error);
            }
        }
    };

    return (
        <div className="container text-center">
            <div className="row" style={{ justifyContent: 'space-around' }}>
                <div className="col-6 col-sm-4">
                    <h3>Add Image Driver</h3>
                    <form onSubmit={storeDriver}>
                        {drivers ? (
                            <div className="form-group">
                                <label className="form-label">Driver</label>
                                <select
                                    className="form-control"
                                    onChange={(e) => setIdDriver(e.target.value)}
                                >
                                    <option value="">Select Driver</option>
                                    {drivers.map((driver) => (
                                        <option key={driver.idDriver} value={driver.idDriver}>
                                            {driver.name + ' ' + driver.lastname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <p>Loading drivers...</p>
                        )}
                        <div className="form-group">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setImageDriver(e.target.files[0])}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{marginTop : '0.5rem',width : '90%'}}>
                            Store
                        </button>
                    </form>
                </div>
                <div className="col-6 col-sm-4">
                    <h3>Add Image circuit</h3>
                    <form onSubmit={storeCircuit}>
                        {circuits ? (
                            <div className="form-group" >
                                <label className="form-label">Circuits</label>
                                <select
                                    className="form-control"
                                    onChange={(e) => setidCircuit(e.target.value)}
                                >
                                    <option value="">Select Circuit</option>
                                    {circuits.map((circuit) => (
                                        <option key={circuit.idCircuit} value={circuit.idCircuit}>
                                            {circuit.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <p>Loading Circuit...</p>
                        )}
                        <div className="form-group">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setImageCircuit(e.target.files[0])}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{marginTop : '0.5rem',width : '90%'}}>
                            Store
                        </button>
                    </form>

                </div>

                <div className="w-100 d-none d-md-block"></div>

                <div className="col-6 col-sm-4" style={{marginTop : '1rem'}}>
                    <h3>Add Image Team</h3>
                    <form onSubmit={storeTeam}>
                        {teams ? (
                            <div className="form-group" >
                                <label className="form-label">Teams</label>
                                <select
                                    className="form-control"
                                    onChange={(e) => setIdTeam(e.target.value)}
                                >
                                    <option value="">Select Team</option>
                                    {teams.map((team) => (
                                        <option key={team.idTeam} value={team.idTeam}>
                                            {team.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <p>Loading Teams...</p>
                        )}
                        <div className="form-group">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setImageTeam(e.target.files[0])}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{marginTop : '0.5rem',width : '90%'}}>
                            Store
                        </button>
                    </form>

                </div>
                <div className="col-6 col-sm-4"></div>
            </div>
        </div>
    )
};

export default AddImage;
