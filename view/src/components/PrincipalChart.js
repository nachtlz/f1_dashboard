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
            const racesName = resp.data.map((race) => {
                return race.name
            })
            return racesName
            
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
        const racesData = await getRaces();
        await Promise.all(promises);

        results = results.filter((result) => result.data.length === 22)
        createChart(results, racesData)
    }

    function calculateRacePoints(points) {
        let sum = 0;
        const data = points.map((p) => {
          sum += (p.points === null ? 0 : p.points);
          return sum;
        });
        return data;
    }
    const getTeamWiners = async () => {
        try {
          const resp = await axios.get(URI + 'team/getWinTeam');
          console.log(resp.data);
          calculatePercentTeam(Object.values(resp.data));
      
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      function calculatePercentTeam(resp) {
        console.log(resp);
        const _data = resp[0].map((result) => {
            console.log(result);
            const teamName = result.teamName;
            const percent = ((result.count / 22) * 100);
            return { team: teamName, percent };
          
        });
          console.log(_data);
          createPie(_data);
        
      };
      const getNationality = async () => {
        try {
          const resp = await axios.get(URI + 'driver/getCountry');
          console.log(resp.data);
          createColumnChart(resp.data);
      
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      

    function createChart(resultsData, racesData) {
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
                categories: racesData
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
                        maxWidth: 600
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

    function createPie(_data){
        Highcharts.chart('container-pie', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Races won by team'
            },
            tooltip: {
                valueSuffix: '%'
            },
            
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: [{
                        enabled: true,
                        distance: 20
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }]
                }
            },
            series: [
                {
                    name: 'Percentage',
                    colorByPoint: true,
                    data: _data.map((info) => {
                        return {
                            name: info.team,
                            y: info.percent
                        };
                    })                    
                }
            ]
        });
        
    }
    function createColumnChart(infoData) {
        Highcharts.chart('container-country', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Drivers Nationality',
                align: 'center'
            },
          
            xAxis: {
                categories: infoData.map(result => result.nationality),
                crosshair: true,
                accessibility: {
                    description: 'Drivers'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Num Drivers'
                }
            },

            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Num Drivers',
                data: infoData.map(resp => resp.count)
            }]
        });

    }

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([getDrivers(), getRaces(),getTeamWiners(),getNationality()]);
        };
        fetchData()

        console.log(results)
        
    }, []);

    return (
        <div className="container-fluid">

            <div className="container" style={{marginTop : '5rem'}}>
                <h1 className="title-dashboard">Formula 1 Dashboard Season 2020-2021</h1>
            </div>

            <div className="container" style={{marginTop : '4rem'}}>
                <div id="container" style={{margin: '20px'}}></div>
            </div>
            <div className="container text-center" style={{marginTop : '3rem'}}>
                <div className="row">
                    <div className="col" id="container-pie">
                    </div>
                    <div className="col" id="container-country">
                    </div>
                </div>
            </div>
            




        </div>
    )
}

export default PrincipalChart;