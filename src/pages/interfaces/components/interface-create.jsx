import { useState, useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import Select from 'react-select';
import { Alert, Col, Toast, Row, Dropdown, Button, Modal, Form, Spinner } from "react-bootstrap";
import { createBridges, getBridges, createVlans, getVlans, createPorts, getPorts } from "../../../store/interfaces/methods";


const CreateInterface = ({ uuid }) => {
    const [showBridge, setShowBridge] = useState(false);
    const [showVlan, setShowVlan] = useState(false);
    const [showPort, setShowPort] = useState(false);
    const [interfaceOption, setInterfaceOption] = useState([])
    const [_tagged, setTagged] = useState(null)
    const [_untagged, setUnTagged] = useState(null)


    const [bridge, setBridge] = useState({
        bridge_name: "",
    });

    const [vlan, setVlan] = useState({
        vlan_bridge: "",
        vlan_ids: "",
        tagged: "",
        untagged: "",
    });

    const [port, setPort] = useState({
        port_interface: "",
        port_bridge: "",
        pvid: '',
    });


    const { bridge_name } = bridge;
    const { vlan_bridge, vlan_ids, tagged, untagged } = vlan;
    const { port_interface, port_bridge, pvid } = port;


    const handleBridgeClose = () => setShowBridge(false);
    const handlePortClose = () => setShowPort(false);
    const handleVlanClose = () => setShowVlan(false);

    const handleBridgeShow = () => setShowBridge(true);
    const handlePortShow = () => setShowPort(true);
    const handleVlanShow = () => setShowVlan(true);

    const dispatch = useDispatch();


    const { interfaces, bridges, isLoading, isError, message } = useSelector(
        (state) => state.interfaces
    );
    const mapObject = () => {
        if (typeof interfaces === 'object' && interfaces !== null) {
            Object.keys(interfaces).map((iface, i) => (
                setInterfaceOption((prevState) => [...prevState, { value: interfaces[iface].name, label: interfaces[iface].name }])
            ))
        } else {
            setInterfaceOption([])
        }
    }


    useEffect(() => {
        mapObject()
    }, [message])

    const onChangeBridge = (e) => {
        setBridge((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onChangeVlan = (e) => {
        setVlan((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onChangePort = (e) => {
        setPort((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };



    const onBridgeSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                name: bridge_name
            }
        };
        dispatch(createBridges(payload));
        dispatch(getBridges(uuid));

    }
    const onVlanSubmit = (e) => {
        e.preventDefault();
        let tagged = typeof _tagged === 'object' ? Object.keys(_tagged).map((iface, index) => _tagged[iface].value) : null
        let untagged = typeof _untagged === 'object' ? Object.keys(_untagged).map((iface, index) => _untagged[iface].value) : null
        const payload = {
            uuid: uuid,
            data: {
                bridge: vlan_bridge,
                vlan_ids: vlan_ids,
                tagged: tagged.join(),
                untagged: untagged.join(),
            }
        };
        dispatch(createVlans(payload));
        dispatch(getVlans(uuid));

    }

    const onPortSubmit = (e) => {
        e.preventDefault();
        const payload = {
            uuid: uuid,
            data: {
                interface: port_interface,
                bridge: port_bridge,
                pvid: pvid
            }
        };

        dispatch(createPorts(payload));
        dispatch(getPorts(uuid));
    }

    return (
        <div className="btn-group me-2">

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Interface
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleBridgeShow} >Bridge</Dropdown.Item>
                    <Dropdown.Item onClick={handleVlanShow} >VLAN</Dropdown.Item>
                    <Dropdown.Item onClick={handlePortShow}>Port</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showBridge} onHide={handleBridgeClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Bridge</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onBridgeSubmit}>
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeBridge}
                                id="bridge_name"
                                name="bridge_name"
                                value={bridge_name}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleBridgeClose}>
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
                                "Save Bridge"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showVlan} onHide={handleVlanClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New VLAN</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onVlanSubmit}>
                    <Modal.Body>
                        {
                            message ?
                                <Alert variant='danger'>
                                    {message}
                                </Alert> : ''
                        }
                        <Form.Group className="mb-3">
                            <Form.Label>Bridge</Form.Label>
                            <Form.Select onChange={onChangeVlan}
                                id="vlan_bridge"
                                name="vlan_bridge"
                                value={vlan_bridge}
                            >
                                {typeof bridges === 'object' && bridges !== null ?
                                    Object.keys(bridges).map((bridge, i) => (
                                        <option key={i}>{bridges[bridge]['name']}</option>
                                    )) : ''
                                }
                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>PVID</Form.Label>

                            <Form.Control
                                onChange={onChangeVlan}
                                id="vlan_ids"
                                name="vlan_ids"
                                value={vlan_ids}
                                type="text"
                                placeholder="1"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tagged</Form.Label>
                            <Select
                                defaultValue={_tagged}
                                isMulti
                                onChange={setTagged}
                                options={interfaceOption}
                            />

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Untagged</Form.Label>
                            <Select
                                defaultValue={_untagged}
                                isMulti
                                onChange={setUnTagged}
                                options={interfaceOption}
                            />

                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleVlanClose}>
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
                                "Save VLAN"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showPort} onHide={handlePortClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Port</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onPortSubmit}>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Interface</Form.Label>
                                    <Form.Select onChange={onChangePort}
                                        id="port_interface"
                                        name="port_interface"
                                        value={port_interface}
                                    >
                                        {
                                            typeof interfaces === 'object' && interfaces !== null ?
                                                Object.keys(interfaces).map((iface, i) => (
                                                    <option key={i}>{interfaces[iface]['name']}</option>
                                                )) : ''
                                        }
                                    </Form.Select>

                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>bridge_name</Form.Label>
                                    <Form.Select onChange={onChangePort}
                                        id="port_bridge"
                                        name="port_bridge"
                                        value={port_bridge}
                                    >
                                        {
                                            typeof bridges === 'object' && bridges !== null ?
                                                Object.keys(bridges).map((bridge, i) => (
                                                    <option key={i}>{bridges[bridge]['name']}</option>
                                                )) : ''
                                        }
                                    </Form.Select>

                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>PVID</Form.Label>

                            <Form.Control
                                onChange={onChangePort}
                                id="pvid"
                                name="pvid"
                                value={pvid}
                                type="text"
                                placeholder="1"
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handlePortClose}>
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
                                "Save Port"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div >
    );

}

export default CreateInterface;