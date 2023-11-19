import Highcharts from "highcharts";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const URI = 'http://localhost:8000/f1Dashboard/';
const imgURL = '../../../node/public/imagesDriver/'

const DriverPoints = () => {
    let { idDriver } = useParams()
    const [driver, setDriver] = useState();
    const [team, setTeam] = useState();
    const [loading, setLoading] = useState(true);
    const [totalPoints, setTotalPoints] = useState();
    const [totalLaps, setTotalLaps] = useState();
    const [totalFinished, setTotalFinished] = useState();
    const [maxPos, setMaxPos] = useState();

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
        } catch (error) {
            console.log("Error al cargar los datos", error)
        }
    }

    const getAllResultsFromDriver = async () => {
        try {
            const resp = await axios.get(URI + '/result/getAllResultFromDriver/' + idDriver)
            return resp.data;
        } catch (error) {
            console.log("Error al cargar los datos", error)
        }
    }

    const calculateDashboardValues = async (results) => {
        console.log(results)
        let sum = 0;
        let finishes = 0;
        let laps = 0;
        let maxPosition = 20;
        results.map((result) => {
            sum += (result.points === null ? 0 : result.points);
            laps += (result.laps === null ? 0 : result.laps);

            if (result.status == "Finished") {
                finishes++;
            }

            if (result.position < maxPosition) {
                maxPosition = result.position;
            }
        })
        setTotalPoints(sum)
        setTotalFinished(finishes)
        setTotalLaps(laps)
        setMaxPos(maxPosition)
    }

    useEffect(() => {
        if (idDriver > 21 || idDriver < 1) {
            idDriver = 1;
            window.location.href = `/drivers/1`;
        }
    }, [])

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const driverData = await getDriverFromId();
            const circuitData = await getResultsFromDriver();
            const resultData = await getResultsFromDriver();
            const allResultData = await getAllResultsFromDriver();
            const teamData = await getTeamFromId(driverData);

            await calculateDashboardValues(allResultData)

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
    }, [idDriver]);

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
                <div className="gridContainer">
                    <div className="dashboardDataContainer">
                        <div className="dashboardDataBox">
                            <p className="dataTitle">Total Points</p>
                            <p className="dataNumber">{totalPoints}</p>
                        </div>
                        <div className="dashboardDataBox">
                            <p className="dataTitle">Total Laps</p>
                            <p className="dataNumber">{totalLaps}</p>
                        </div>
                        <div className="dashboardDataBox">
                            <p className="dataTitle">Total Finished</p>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <p className="dataNumber">{totalFinished}/22</p>
                            </div>
                        </div>
                        <div className="dashboardDataBox">
                            <p className="dataTitle">Best Position</p>
                            <p className="dataNumber">{maxPos}º</p>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', gap: '40px'}}>
                    <div className="card" style={{width: '18rem', marginLeft: '300px', marginTop: '20px'}}>
                        <img src={require(`../../../node/public/imagesDriver/${driver.imagen}`)} className="card-img-top" alt="Driver photo"></img>
                        <div className="card-body">
                            <h5 className="card-title">{driver.name} {driver.lastname}</h5>
                            <p className="card-text">{team.name} <img src={require(`../../../node/public/imagesTeam/${team.imagen}`)} style={{width: '30px'}} alt="Driver photo"></img></p>
                        </div>
                        <ul className="driverData">
                            <li className="list-group-item">
                                <div className="driverNumber">
                                    {driver.number}
                                </div>
                            </li>
                            <li className="list-group-item">{driver.code}</li>
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
