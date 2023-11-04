import Highcharts from "highcharts"
import { useEffect, useState } from "react";
import axios from 'axios';

const URI = 'http://localhost:8000/f1Dashboard/'

const PrincipalChart = () => {

    const [drivers, setDrivers] = useState([]);
    const [races, setRaces] = useState([]);
    const [driverResults, setDriverResults] = useState([]);
    let results = [];

    const getDrivers = async () => {
        try {
            const resp = await axios.get(URI + 'driver/returnAll')
            setDrivers(resp.data)
            createSeries(resp.data)
        } catch (error) {
            console.log("Error al cargar los datos", error)
        }
    }

    const getRaces = async () => {
        try {
            const resp = await axios.get(URI + 'race/returnAll')
            setRaces(resp.data.map((race) => {
                return race.name
            }))
        } catch (error) {
            console.log("Error al cargar los datos", error)
        }
    }

    const getResultsFromDriver = async (idDriver) => {
        try {
            const resp = await axios.get(URI + 'result/getResultFromDriver/' + idDriver)
            setDriverResults(resp.data)
            return resp.data
        } catch (error) {
            console.log("Error al cargar los datos", error)
        }
    }

    const createSeries = async (driverList) => {
        const promises = driverList.map(async (driver) => {
            let data = calculateRacePoints(await getResultsFromDriver(driver.idDriver))
            results.push({ name: driver.name + ' ' + driver.lastname, data: data });
        })

        await Promise.all(promises);

        results = results.filter((result) => result.data.length === 22)
        createChart(results)
        console.log(results)
    }

    function calculateRacePoints(points) {
        let sum = 0;
        const data = points.map((p) => {
          sum += (p.points === null ? 0 : p.points);
          return sum;
        });
        return data;
    }

    function createChart(resultsData) {
        Highcharts.chart('container', {

            title: {
                text: 'Formula One Drivers\' World Championship 2021',
                align: 'left'
            },
        
            subtitle: {
                text: 'By Juan Ignacio and Mateu.',
                align: 'left'
            },
        
            yAxis: {
                title: {
                    text: 'Points'
                }
            },
        
            xAxis: {
                title: {
                    text: 'Races'
                },
                categories: races
                //categories: ['Race ', 'Race 2', 'Race 3', 'Race 4', 'Race 5', 'Race 6', 'Race 7', 'Race 8', 'Race 9', 'Race 10', 'Race 11']
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                }
            },
        
            series: resultsData.map(result => ({
                name: result.name,
                data: result.data
            })),
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    },
                }]
            },

            credits: {
                enabled: false
            } 
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([getDrivers(), getRaces()]);
        };
        fetchData()

        console.log(results)
        
    }, []);

    return (
        <div id="container" style={{margin: '20px'}}></div>
    )
}

export default PrincipalChart;