import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteUser,
    getUsers
} from "../../../store/accounts/methods";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Col, Row, Button, Modal, Form, Spinner } from "react-bootstrap";

const DeleteDevice = ({ id }) => {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { isLoading, isError, message } = useSelector(
        (state) => state.users
    );

    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(deleteUser(id))
        dispatch(getUsers())

        handleClose()
    }
    return (
        <div className="btn-group me-2">
            <Button onClick={handleShow} variant="danger" size="sm">
                <FaTrash /> Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>

                <Modal.Body>{isLoading ? (
                    "Deleting User . . ."
                ) : (
                    "Are you sure, You want to delete this item?"
                )}</Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={onClick} disabled={isLoading} variant="primary">
                        {isLoading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            "Delete User"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default DeleteDevice;