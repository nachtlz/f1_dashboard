import Highcharts from "highcharts"
import { useEffect, useState } from "react";
import axios from 'axios';

const URI = 'http://localhost:8000/f1Dashboard/'

const PrincipalChart = () => {

    const [drivers, setDrivers] = useState([]);
    const [races, setRaces] = useState([]);

    const getDrivers = async () => {
        try {
            const resp = (await axios.get(URI + 'driver/returnAll'))
            setDrivers(resp.data)
        } catch (error) {
            console.log("Error al cargar los datos", error)
        }
    }

    useEffect(() => {
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
                categories: ['2010', '2011']
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
                    pointStart: 2010
                }
            },
        
            series: [{
                name: 'Installation & Developers',
                data: [43934, 48656, 65165, 81827, 112143, 142383,
                    171533, 165174, 155157, 161454, 154610]
            }, {
                name: 'Manufacturing',
                data: [24916, 37941, 29742, 29851, 32490, 30282,
                    38121, 36885, 33726, 34243, 31050]
            }, {
                name: 'Sales & Distribution',
                data: [11744, 30000, 16005, 19771, 20185, 24377,
                    32147, 30912, 29243, 29213, 25663]
            }, {
                name: 'Operations & Maintenance',
                data: [null, null, null, null, null, null, null,
                    null, 11164, 11218, 10077]
            }, {
                name: 'Other',
                data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
                    17300, 13053, 11906, 10073]
            }],
        
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
                    credits: {
                        enabled: false
                    },
                }]
            }
            
        })
    }, []);

    return (
        <div id="container" style={{margin: '50px'}}></div>
    )
}

export default PrincipalChart;