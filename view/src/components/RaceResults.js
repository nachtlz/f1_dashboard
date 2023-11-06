import axios from "axios";
import Highcharts from "highcharts"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/RaceResults.css';

const URI = 'http://localhost:8000/f1Dashboard/';

const RaceResults = () => {
    const [loading, setLoading] = useState(true);
    const { idCircuit } = useParams();
    const [info, setInfo] = useState({});
    const [result, setResult] = useState([]);
    const [data,setData] = useState([]);

    const formatDate = (dateRace) => {
        const dateParts = dateRace.split('-'); // Divide la fecha en partes: [2021, 04, 18]
        const monthNames = [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun",
            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ];
        const formattedDate = `${dateParts[2]} ${monthNames[parseInt(dateParts[1], 10) - 1]} ${dateParts[0]}`;
        return formattedDate;
    }

    function createChart(_data){
        console.log("INSIDE",_data);
        Highcharts.chart('container-chart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Results Race',
                align: 'left'
            },
            subtitle: {
                text: 'By Juan Ignacio and Mateu.',
                align: 'left'
            },
            xAxis: {
                categories: _data.map(result => result.driver), 
                crosshair: true,
                accessibility: {
                    description: 'Drivers'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Points'
                }
            },
          
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Points',
                data: _data.map(resp => resp.points)
            }]
        });
        
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (idCircuit) {
                    console.log(parseInt(idCircuit));
                    const response = await axios.get(URI + `race/getRaceAndCircuitFromCircuit/${parseInt(idCircuit)}`);
                    setInfo(response.data[0]);
                    console.log(response.data[0].idRace);

                    if (response.data[0].idRace) {
                        const resultResponse = await axios.get(URI + `result/getResultFromRace/${response.data[0].idRace}`);
                        setResult(resultResponse.data);
                        console.log(resultResponse.data)
                        
                        const _data = resultResponse.data.map((result) => {
                            const driverName = result.DRIVER.name + ' ' + result.DRIVER.lastName;
                            const points = result.points === null ? 0 : result.points;
                            return { driver: driverName, points };
                          });
                          
                        if(_data){
                            console.log('HOLA')
                            setData(_data);
                        }
                    }
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    // Corrected conditional rendering
    if (loading) {
        return <p>Loading....</p>;

    } else {
        return (
            <div className="container-fluid">
                <div className="container-fluid" id="TitleRace">
                    <h1><strong>{info.nameRace}</strong> Season 2020-2021</h1>
                </div>
                <div className="container text-center" style={{ marginTop: '6rem' }}>
                    <div className="row align-items-start">
                        <div className="col">
                            <div className="container text-center">
                                <div className="row align-items-start" id="imageCircuit">
                                    <h3>The Circuit</h3>
                                    <div className="col" style={{ marginTop: '2rem' }}>
                                        <img src={require(`../../../node/public/imagesCircuit/circuit/${info.imagenCircuit}`)} />
                                    </div>
                                    <div className="col" id="infoCircuit" style={{ marginTop: '2rem' }}>
                                        <div className="textInfo">
                                            <ul>
                                                <li>
                                                    <p>
                                                        <i className="fas fa-map-marker-alt"></i> {info.country}, {info.location}
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <i className="fas fa-calendar-alt"></i> {formatDate(info.dateRace)}
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <i className="fa-solid fa-clock-rotate-left"></i>
                                                        {info.laps} Laps
                                                    </p>
                                                </li>
                                            </ul>




                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="continer" style={{ marginTop: '1.5rem' }}>
                            </div>
                        </div>
                        <div className="col">
                            <div id="container-chart">
                                <h4 id="viewResult" onClick={()=>createChart(data)}>View Results</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default RaceResults;
