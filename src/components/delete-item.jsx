import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaTrash } from "react-icons/fa";
import { Button, Modal, Spinner } from "react-bootstrap";

const DeleteItem = ({ message, payload, onDelete, onGet, isLoading }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(onDelete(payload))
        dispatch(onGet(payload.uuid))

        handleClose()
    }
    return (
        <div className="btn-group me-2">
            <Button onClick={handleShow} variant="danger" size="sm">
                <FaTrash /> Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>{isLoading ? (
                    "Deleting Item . . ."
                ) : (
                    { message }
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
                            "Delete Item"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default DeleteItem;