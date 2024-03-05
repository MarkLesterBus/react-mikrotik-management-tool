import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { Col, Row, Dropdown, Button, Modal, Form, Spinner } from "react-bootstrap";
import { createAddressList, createFilter, getAddressList, getFilters } from "../../../store/firewall/methods";


const CreateFirewall = ({ uuid }) => {
    const [showFilter, setFilter] = useState(false);
    const [showAddress, setAddress] = useState(false);


    const [addressList, setAddressList] = useState({
        list: '',
        address: '',
    });

    const [filterRule, setFilterRule] = useState({
        action: 'accept',
        chain: 'forward',
        src_address_list: '',
        dst_address_list: '',
    })

    const { list, address } = addressList
    const { action, chain, src_address_list, dst_address_list } = filterRule

    const actions = [
        'accept',
        'add dst to address list',
        'add src to address list',
        'drop',
        'fasttrack connection',
        'jump',
        'log',
        'passthrough',
        'reject',
        'return',
        'tarpit'
    ]
    const chains = [
        'forward',
        'hs-input',
        'hs-unauth',
        'hs-unauth-to',
        'input',
        'pre-hs-input',
        'unused-hs-chanied'
    ]


    const handleFilterClose = () => setFilter(false);
    const handleFilterShow = () => setFilter(true);

    const handleAddressClose = () => setAddress(false);
    const handleAddressShow = () => setAddress(true);


    const dispatch = useDispatch();


    const { address_list, isLoading, message } = useSelector(
        (state) => state.firewall
    );

    const onChangefilter = (e) => {
        setFilterRule((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onChangeAddress = (e) => {
        setAddressList((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onFilterSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                action: action,
                chain: chain,
                src_address_list: src_address_list,
                dst_address_list: dst_address_list,
            }
        };
        dispatch(createFilter(payload));
        dispatch(getFilters(uuid));
    }
    const onAddressSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                list: list,
                address: address,
            }
        };
        dispatch(createAddressList(payload));
        dispatch(getAddressList(uuid));

    }


    return (
        <div className="btn-group me-2">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Firwall Rules
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleFilterShow} >Filter Rules</Dropdown.Item>
                    <Dropdown.Item onClick={handleAddressShow} >Address List</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showFilter} onHide={handleFilterClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Filter Rule </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onFilterSubmit} >
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Action</Form.Label>
                            <Form.Select
                                onChange={onChangefilter}
                                id="action"
                                name="action"
                                value={action}
                                type="text"
                                placeholder="ex. accept, drop, reject, etc."
                            >
                                {
                                    actions.map(action => {
                                        return <option key={action}>{action}</option>
                                    })

                                }

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Chain</Form.Label>
                            <Form.Select
                                onChange={onChangefilter}
                                id="chain"
                                name="chain"
                                value={chain}
                                type="text"
                                placeholder="ex. forward, hs-input, etc."
                            >
                                {
                                    chains.map(chain => {
                                        return <option key={chain}>{chain}</option>
                                    })

                                }

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Src. Address List</Form.Label>
                            <Form.Select
                                onChange={onChangefilter}
                                id="src_address_list"
                                name="src_address_list"
                                value={src_address_list}
                                type="text"
                                placeholder=""
                            >
                                {

                                    typeof address_list === 'object' && address_list !== null ? Object.keys(address_list).map((addrs, i) => (
                                        <option key={i}>{address_list[addrs]['list']}</option>
                                    )) : ''
                                }

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dst. Address List</Form.Label>
                            <Form.Select
                                onChange={onChangefilter}
                                id="dst_address_list"
                                name="dst_address_list"
                                value={dst_address_list}
                                type="text"
                                placeholder=""
                            >
                                {
                                    typeof address_list === 'object' && address_list !== null ? Object.keys(address_list).map((addrs, i) => (
                                        <option key={i}>{address_list[addrs]['list']}</option>
                                    )) : ''
                                }
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleFilterClose}>
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
                                "Save Filter"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showAddress} onHide={handleAddressClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Address</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onAddressSubmit} >
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeAddress}
                                id="list"
                                name="list"
                                value={list}
                                type="text"
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                onChange={onChangeAddress}
                                id="address"
                                name="address"
                                value={address}
                                type="text"
                                placeholder="ex. 192.168.88.0/24"
                            />
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
                                "Save Profile"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );

}

export default CreateFirewall;