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
                                <div className="card fondoImagen" id="card" style={{paddingBottom: '0px'}}>
                                    <div className="card-body driverNameCard" style={{margin: 0, padding: 0}}>
                                        <h5 className="card-title" id="card-title">{driver.name} {driver.lastname}</h5>
                                    </div>
                                    <div className="driverCardNumberImg">
                                        <div className="cardNumber">
                                            {driver.number}
                                        </div>
                                        <div>
                                            <img src={require(`../../../node/public/imagesDriver/${driver.imagen}`)} className="card-img-top" alt={driver.name} />
                                        </div>
                                    </div>
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