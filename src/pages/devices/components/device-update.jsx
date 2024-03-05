import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDevices, updateDevice,

} from "../../../store/devices/methods";
import { FaPen } from "react-icons/fa";
import { Col, Row, Button, Modal, Form, Spinner } from "react-bootstrap";

const UpdateDevice = ({ item }) => {
    const [show, setShow] = useState(false);
    const [device, setDevice] = useState({
        name: "",
        host: "",
        user: "",
        pass: "",
        port: "",
    });

    const { name, host, user, pass, port } = device;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const { isLoading, } = useSelector(
        (state) => state.devices
    );

    const onChange = (e) => {
        setDevice((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();

        const deviceData = {
            uuid: item.uuid,
            name: name,
            host: host,
            user: user,
            pass: pass,
            port: port,
        };

        dispatch(updateDevice(deviceData));
        dispatch(getDevices());
        resetFields()
    };
    const resetFields = () => {
        setDevice({
            name: '',
            host: '',
            user: '',
            pass: '',
            port: ''
        })
    }
    useEffect(() => {
        setDevice({
            name: item.name,
            host: item.host,
            user: item.user,
            pass: item.pass,
            port: item.port
        })
    }, []);
    return (
        <div className="btn-group me-2">
            <button
                type="button"
                onClick={handleShow}
                className="btn btn-sm btn-warning"
            >
                <FaPen className="mr-2" />
                Edit
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Device</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Device Name</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                id="name"
                                name="name"
                                value={name}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>

                        <Row>
                            <Col sm={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Host Address</Form.Label>

                                    <Form.Control
                                        onChange={onChange}
                                        id="host"
                                        name="host"
                                        value={host}
                                        type="text"
                                        placeholder="IP address"
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Port</Form.Label>

                                    <Form.Control
                                        onChange={onChange}
                                        id="port"
                                        name="port"
                                        value={port}
                                        type="text"
                                        placeholder="Port"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>User</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                id="user"
                                name="user"
                                value={user}
                                type="text"
                                placeholder="Username"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                id="pass"
                                name="pass"
                                value={pass}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" disabled={isLoading} variant="primary">
                            {isLoading ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                "Save Device"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );

}

export default UpdateDevice;