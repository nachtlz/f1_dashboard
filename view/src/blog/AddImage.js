// In your React component
import axios from 'axios';
import { useEffect, useState } from 'react';

const URI = 'http://localhost:8000/f1Dashboard/';

const AddImage = () => {
    const [image, setImage] = useState(null);
    const [drivers, setDrivers] = useState([]);
    const [idDriver,setIdDriver]=useState(null);

    useEffect(() => {
        const getDrivers = async () => {
            try {
                const resp=(await axios.get(URI + 'driver/returnAll'));
                setDrivers(resp.data)
            } catch (error) {
                console.log('Error al cargar los datos', error);
            }
        };
        getDrivers();
    }, []);

    const storeDriver = async (e) => {
        e.preventDefault();
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('idDriver', idDriver);


            try {
                const res = await axios.post(URI + 'driver/update', formData);
                console.log(res);
                // Navega a donde sea necesario después de guardar la imagen
            } catch (error) {
                console.error('Error al subir la imagen:', error);
            }
        }
    };

    return (
        <div>
            <h3>Add Image</h3>
            <form onSubmit={storeDriver}>
                {drivers ? (
                    <div className="form-group" style={{marginLeft : '5rem',marginRight : '5rem'}}>
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
                <div className="form-group"  style={{marginLeft : '5rem',marginRight : '5rem'}}>
                    <label className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control" 
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Store
                </button>
            </form>
        </div>
    );
    
};

export default AddImage;
