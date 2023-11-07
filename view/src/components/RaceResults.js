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
    const [data, setData] = useState([]);

    const formatDate = (dateRace) => {
        const dateParts = dateRace.split('-'); // Divide la fecha en partes: [2021, 04, 18]
        const monthNames = [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun",
            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ];
        const formattedDate = `${dateParts[2]} ${monthNames[parseInt(dateParts[1], 10) - 1]} ${dateParts[0]}`;
        return formattedDate;
    }

    function createChart(infoData) {
        console.log("INSIDE", infoData);
        Highcharts.chart('container-results', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Results Race',
                align: 'center'
            },
          
            xAxis: {
                categories: infoData.map(result => result.driver),
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
                data: infoData.map(resp => resp.points)
            }]
        });

    }

    function createPie(_data){
        Highcharts.chart('container-pie', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Status Race'
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
                            name: info.name,
                            y: info.percent
                        };
                    })                    
                }
            ]
        });
        
    }

    const getRaceAndCircuit = async () => {
        try {
            const response = await axios.get(URI + `race/getRaceAndCircuitFromCircuit/${parseInt(idCircuit)}`);
            setInfo(response.data[0]);
            console.log(response.data[0]);
            return response.data[0];
        } catch (error) {
            console.log('Error al Cargar Resultados de la carrera', error);
        }
    }
    const getResultFromRace = async (_result) => {
        try {
            const resultResponse = await axios.get(URI + `result/getResultFromRace/${_result.idRace}`);
            setResult(resultResponse.data);
            return resultResponse;
        } catch (error) {
            console.log('Error al Cargar Resultados de la carrera', error);
        }
    }
    const getStatusFromRace=async (_idRace)=>{
        try{
            const statusRace=await axios.get(URI+`result/getStatusFromRace/${_idRace}`);

            return statusRace.data;

        }catch(error){

        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const resultRace = await getRaceAndCircuit();
                const resultResponse = await getResultFromRace(resultRace);
                const statusRace=await getStatusFromRace(resultRace.idRace);
                const _data = resultResponse.data.map((result) => {
                    const driverName = result.DRIVER.name + ' ' + result.DRIVER.lastName;
                    const points = result.points === null ? 0 : result.points;
                    return { driver: driverName, points };
                });
                const _status=statusRace.map((stat)=>{
                    const name=stat.status;
                    const percent = Math.round((stat.count / 20) * 100);
                    return {name,percent};
                })
                setData(_data);
                createChart(_data);
                createPie(_status)


            } catch (error) {

            } finally {
                setLoading(false)
            }
        }
        fetchData();

    }, [idCircuit]);




    return (
        <div className="container-fluid">
            <div className="container-fluid" id="TitleRace">
                <h1><strong>{info.nameRace}</strong> Season 2020-2021</h1>
            </div>
            <div className="container" style={{ marginTop: '6rem' }}>
                <div className="container">
                    <div className="container text-center">
                        <div className="row align-items-start" id="imageCircuit">
                            <h3>The Circuit</h3>
                            {!loading && (
                                <div className="col" style={{ marginTop: '2rem' }}>
                                    <img style={{width : '75%'}} src={require(`../../../node/public/imagesCircuit/circuit/${info.imagenCircuit}`)} />
                                </div>
                            )}
                            {!loading && (
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
                            )}
                        </div>
                    </div>
                </div>

                <div className="container text-center" style={{marginTop : '6rem'}}>
                    <div className="row align-items-start">
                        <div className="col">
                            <div id="container-results"></div>
                        </div>
                        <div className="col">
                            <div id="container-pie"></div>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    );



}

export default RaceResults;
