import Highcharts from "highcharts";
import { useEffect, useState } from "react";
import axios from 'axios';

const URI = 'http://localhost:8000/f1Dashboard/';
const imgURL = '../../../node/public/imagesDriver/'

const DriverPoints = ({ idDriver = 1 }) => {
    const [driver, setDriver] = useState();
    const [team, setTeam] = useState();
    const [loading, setLoading] = useState(true);

    const getDriverFromId = async () => {
        try {
            const resp = await axios.get(URI + 'driver/getDriverFromId/' + idDriver);
            setDriver(resp.data);
            return resp.data;
        } catch (error) {
            console.log("Error al cargar los datos", error);
        }
    };

    const getResultsFromDriver = async () => {
        try {
            const resp = await axios.get(URI + 'result/getResultFromDriver/' + idDriver)
            return resp.data;
        } catch (error) {
            console.log("Error al cargar los datos", error)
        }
    }

    const getTeamFromId = async (d) => {
        try {
            const resp = await axios.get(URI + 'team/getTeamFromId/' + d.idTeam)
            setTeam(resp.data)
            console.log(resp.data)
        } catch (error) {
            console.log("Error al cargar los datos", error)
        }
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const driverData = await getDriverFromId();
            const circuitData = await getResultsFromDriver();
            const resultData = await getResultsFromDriver();
            const teamData = await getTeamFromId(driverData);

            const circuitList = circuitData.map((circuit) => {
                return circuit.name
            })

            const resultList = resultData.map((circuit) => {
                return (circuit.points === null ? 0 : circuit.points)
            })

            setLoading(false);

            createChart(driverData, circuitList, resultList);
        }
        fetchData();
    }, []);

    function createChart(driverData, circuitData, resultData) {
        Highcharts.chart('container', {
            chart: {
                type: 'bar',
                reflow: true
            },
            title: {
                text: 'Points per Race',
                align: 'left'
            },
            xAxis: {
                categories: circuitData,
                crosshair: true,
                accessibility: {
                    description: 'Countries'
                }
            },
            yAxis: {
                min: 0,
                max: 26
            },
            plotOptions: {
                column: {
                    pointPadding: 0,
                    borderWidth: 3
                }
            },
            series: [
                {
                    name: 'Points',
                    data: resultData
                }
            ],
            credits: {
                enabled: false
            }
        });
    }

    if(loading) {
        return <p>Loading....</p>;
    } else {
        return (
            <div>
                <h1 style={{marginTop: '10px'}}>{driver.name} {driver.lastname}</h1>
                <div style={{display: 'flex', gap: '40px'}}>
                    <div className="card" style={{width: '18rem', marginLeft: '300px', marginTop: '20px'}}>
                        <img src={require(`../../../node/public/imagesDriver/${driver.imagen}`)} className="card-img-top" alt="Driver photo"></img>
                        <div className="card-body">
                            <h5 className="card-title">{driver.name} {driver.lastname}</h5>
                            <p className="card-text">{team.name} <img src={require(`../../../node/public/imagesTeam/${team.imagen}`)} style={{width: '30px'}} alt="Driver photo"></img></p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{driver.number} {driver.code}</li>
                            <li className="list-group-item">{driver.nationality}</li>
                        </ul>
                    </div>
                    <div id="container" style={{ margin: '20px', width: '700px' }}></div>
                </div>
            </div>
        );
    }
};

export default DriverPoints;
