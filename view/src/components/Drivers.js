import axios from "axios";
import { useEffect, useState } from "react";


const URI = 'http://localhost:8000/f1Dashboard/';
const imgURL = '../../../node/public/imagesDriver/'

const Drivers = () => {

    const [loading, setLoading] = useState(false);
    const [drivers, setDrivers] = useState([]);


    const handleCardClick = (driverId) => {
        window.location.href = `/drivers/${driverId}`;
    }

    const getDrivers = async () => {
        try {
            setLoading(true);
            const resp = await axios.get(URI + 'driver/returnAll');
            setDrivers(resp.data);
        } catch (error) {
            console.log("Error during the loading of drivers", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDrivers();
    }, []);

    return (
        <div className="card-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container text-center">
                    <div className="row g-2" style={{ marginLeft: '5rem' }}>
                        {drivers.map(driver => (
                            <div className="col-md-4" key={driver.idDriver} style={{ marginTop: '2rem' }} onClick={()=>handleCardClick(driver.idDriver)}>
                                <div className="card" id="card">
                                    <img src={require(`../../../node/public/imagesDriver/${driver.imagen}`)} className="card-img-top" alt={driver.name} />
                                    <div className="card-body">
                                        <h5 className="card-title" id="card-title">{driver.name} {driver.lastname}</h5>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">{driver.name}</li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    
    );
}

export default Drivers;