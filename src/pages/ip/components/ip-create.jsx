import { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { Col, Row, Dropdown, Button, Modal, Form, Spinner } from "react-bootstrap";
import { createAddresses, getAddresses, createPools, getPools, getDhcp, createDhcp } from "../../../store/ip/methods";

const CreateIP = ({ uuid }) => {
    const [showAddress, setShowAddress] = useState(false);
    const [showPool, setShowPool] = useState(false);
    const [showDhcp, setShowDhcp] = useState(false);

    const [addresses, setAddress] = useState({
        address: "",
        network: "",
        _interface: "",
    });
    const [pool, setPool] = useState({
        name: "",
        ranges: "",
    });
    const [dhcp, setDhcp] = useState({
        server: "",
        intface: "",
        lease_time: "",
        address_pool: "",
    });



    const { address, network, _interface } = addresses;
    const { name, ranges } = pool;
    const { server, intface, lease_time, address_pool } = dhcp;

    const handleAddressClose = () => setShowAddress(false);
    const handlePoolClose = () => setShowPool(false);


    const handleAddresShow = () => setShowAddress(true);
    const handlePoolShow = () => setShowPool(true);

    const handleDhcpShow = () => setShowDhcp(true);
    const handleDhcpClose = () => setShowDhcp(false);




    const dispatch = useDispatch();


    const { interfaces, } = useSelector(
        (state) => state.interfaces
    );
    const { pools, isLoading, isError, message } = useSelector(
        (state) => state.ip
    );


    const onChangeAddress = (e) => {
        setAddress((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onChangePool = (e) => {
        setPool((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onChangeDhcp = (e) => {
        setDhcp((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };



    const onAddressSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                address: address,
                network: network,
                interface: _interface
            }
        };

        dispatch(createAddresses(payload));
        dispatch(getAddresses(uuid));
        resetFields()

    }
    const onPoolSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                name: name,
                ranges: ranges,
            }
        };

        dispatch(createPools(payload));
        dispatch(getPools(uuid));
        resetFields()
    }
    const onDhcpSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                name: server,
                interface: intface,
                lease_time: lease_time,
                address_pool: address_pool,
            }
        };

        dispatch(createDhcp(payload));
        dispatch(getDhcp(uuid));
        resetFields()
    }

    const resetFields = () => {
        setAddress({
            address: "",
            network: "",
            _interface: "",
        })
        setPools({
            name: "",
            ranges: "",
        })
    }

    return (
        <div className="btn-group me-2">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add IP
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleAddresShow} >Addresses</Dropdown.Item>
                    <Dropdown.Item onClick={handlePoolShow} >Pool</Dropdown.Item>
                    <Dropdown.Item onClick={handleDhcpShow} >DHCP Server</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showAddress} onHide={handleAddressClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Address</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onAddressSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                onChange={onChangeAddress}
                                id="address"
                                name="address"
                                value={address}
                                type="text"
                                placeholder="ex. 192.168.1.1/24"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Network</Form.Label>
                            <Form.Control
                                onChange={onChangeAddress}
                                id="network"
                                name="network"
                                value={network}
                                type="text"
                                placeholder="ex. 192.168.1.0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Interface</Form.Label>
                            <Form.Select onChange={onChangeAddress}
                                id="interface"
                                name="_interface"
                                value={_interface}
                            >
                                {
                                    typeof interfaces === 'object' && interfaces !== null ?
                                        Object.keys(interfaces).map((iface, i) => (
                                            <option key={i}>{interfaces[iface]['name']}</option>
                                        )) : ''
                                }
                            </Form.Select>

                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAddressClose}>
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
                                "Save Address"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showPool} onHide={handlePoolClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Pool</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onPoolSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangePool}
                                id="name"
                                name="name"
                                value={name}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ranges</Form.Label>
                            <Form.Control
                                onChange={onChangePool}
                                id="ranges"
                                name="ranges"
                                value={ranges}
                                type="text"
                                placeholder="ex. 0.0.0.0,1.1.1.1"
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handlePoolClose}>
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
                                "Save Pool"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showDhcp} onHide={handleDhcpClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New DHCP Server</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onDhcpSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeDhcp}
                                id="server"
                                name="server"
                                value={server}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Interface</Form.Label>
                            <Form.Select onChange={onChangeDhcp}
                                id="intface"
                                name="intface"
                                value={intface}
                            >
                                {
                                    typeof interfaces === 'object' && interfaces !== null ?
                                        Object.keys(interfaces).map((iface, i) => (
                                            <option key={i}>{interfaces[iface]['name']}</option>
                                        )) : ''
                                }
                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Lease Time</Form.Label>
                            <Form.Control
                                onChange={onChangeDhcp}
                                id="lease_time"
                                name="lease_time"
                                value={lease_time}
                                type="text"
                                placeholder="ex. 1h"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address Pool</Form.Label>
                            <Form.Select onChange={onChangeDhcp}
                                id="address_pool"
                                name="address_pool"
                                value={address_pool}
                            >
                                {
                                    typeof pools === 'object' && pools !== null ?
                                        Object.keys(pools).map((pool, i) => (
                                            <option key={i}>{pools[pool]['name']}</option>
                                        )) : ''
                                }
                            </Form.Select>

                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleDhcpClose}>
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
                                "Save Pool"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );

}

export default CreateIP;