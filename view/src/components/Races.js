import axios from "axios";
import { useEffect, useState } from "react";


const URI = 'http://localhost:8000/f1Dashboard/';

const Races = () => {
    const [loading, setLoading] = useState(false);
    const [circuits, setCircuits] = useState([]);

    const handleCardClick=(circuitID)=>{
        window.location.href = `/raceResult/${circuitID}`;
    };

    const getCircuits = async () => {
        try {
            setLoading(true);
            const resp = await axios.get(URI + 'race/getRaceAndCircuit');
            setCircuits(resp.data);
        } catch (error) {
            console.log("Error during the loading of circuits", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCircuits();
    }, []);

    return (
        <div className="card-container">
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className="container text-center">
                <div className="row g-2" style={{ marginLeft: '5rem' }}>
                    {circuits.map(circuit => (
                        <div className="col-md-4" key={circuit.idCircuit} style={{ marginTop: '2rem' }} onClick={()=>handleCardClick(circuit.idCircuit)}>
                            <div className="card" id="card">
                                <img src={require(`../../../node/public/imagesCircuit/real/${circuit.imagenReal}`)} className="card-img-top" alt={circuit.name} />
                                <div className="card-body">
                                    <h5 className="card-title" id="card-title">{circuit.nameCircuit}</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{circuit.nameRace}</li>
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

export default Races;
