import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createUser, getUsers

} from "../../../store/accounts/methods";
import { FaPlus } from "react-icons/fa";
import { Col, Row, Button, Modal, Form, Spinner } from "react-bootstrap";

const CreateUser = () => {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",

    });

    const { name, email, password } = user;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const { users, isLoading, isError, message } = useSelector(
        (state) => state.users
    );

    const onChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,

        };

        dispatch(createUser(userData));
        dispatch(getUsers());
    };
    return (
        <div className="btn-group me-2">
            <button
                type="button"
                onClick={handleShow}
                className="btn btn-sm btn-outline-secondary"
            >
                <FaPlus className="mr-2" />
                New Account
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Account</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                id="name"
                                name="name"
                                value={name}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                id="email"
                                name="email"
                                value={email}
                                type="text"
                                placeholder="Email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                id="password"
                                name="password"
                                value={password}
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
                                "Save Account"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );

}

export default CreateUser;