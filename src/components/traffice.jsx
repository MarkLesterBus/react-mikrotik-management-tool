
import { useEffect } from "react";
import Chart from 'react-apexcharts'
import { useNavigate, useParams } from "react-router-dom";
import { getTraffic, reset } from "../store/devices/system/system";
import { useSelector, useDispatch } from "react-redux";

import { Card, Row, Form, Col } from 'react-bootstrap'
import { useState } from 'react';

const SystemTraffic = () => {
    const dispatch = useDispatch();
    const { uuid } = useParams();

    const [iface, setIfaces] = useState('ether1')
    const { interfaces, } = useSelector(
        (state) => state.interfaces
    );
    const { token } = useSelector(
        (state) => state.auth
    );

    const { rx, tx, timeline, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.system
    );
    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!token) {
            navigate("/login");
        }


    }, []);
    useEffect(() => {
        const timer2 = setTimeout(() => {

            const data = {
                uuid: uuid,
                intface: iface
            }
            dispatch(getTraffic(data));
        }, 5000);
        return () => clearTimeout(timer2);
    }, [rx, tx, timeline, iface, dispatch]);

    function bytesForHuman(bytes) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

        let i = 0

        for (i; bytes > 1024; i++) {
            bytes /= 1024;
        }
        return parseInt(bytes) + ' ' + units[i]
    }
    const series = [{
        name: 'Upload',
        data: Object.keys(tx).length > 10 ? tx.slice(Object.keys(tx).length - 10, Object.keys(tx).length) : tx
    }, {
        name: 'Download',
        data: Object.keys(rx).length > 10 ? rx.slice(Object.keys(rx).length - 10, Object.keys(rx).length) : rx
    }];


    const options = {
        chart: {
            id: "realtime",
            height: 350,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 5000
                }
            },
        },

        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return bytesForHuman(value);
                }
            },
        },
        xaxis: {
            type: 'time',
            categories: Object.keys(timeline).length > 10 ? timeline.slice(Object.keys(timeline).length - 10, Object.keys(timeline).length) : timeline
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };


    return (
        <Card>
            <Card.Header>
                <Row justify='space-between'>
                    <Col md={4}>
                        <h5 className="card-title">Traffic</h5>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form.Group>
                            <Form.Select value={iface} onChange={(e) => setIfaces(e.target.value)}>
                                {
                                    typeof interfaces === 'object' && interfaces !== null ?
                                        Object.keys(interfaces).map((iface, index) => {
                                            return (
                                                <option key={index}>{interfaces[iface].name}</option>
                                            )
                                        })
                                        : ''
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Chart id="chart" className="text-dark" options={options} series={series} height={350} />
            </Card.Body>
        </Card>


    );
}

export default SystemTraffic;