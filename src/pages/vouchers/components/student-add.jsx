import { useState, useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Alert, Modal, Form, Spinner } from "react-bootstrap";
import { createStudent, getStudents, } from "../../../store/students/methods";
import { getUsers } from "../../../store/voucher/methods";
const AssignStudent = ({ item, onUpdate }) => {
    const [showStudent, setShowStudent] = useState(false);
    const { uuid } = useParams();


    const [student, setStudent] = useState({
        student_id: '',
        receipt_no: '',
        name: '',
        voucher_code: '',
    })

    const { students, isLoading, message } = useSelector(
        (state) => state.students
    );

    function bytesForHuman(bytes) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

        let i = 0

        for (i; bytes > 1024; i++) {
            bytes /= 1024;
        }
        return parseInt(bytes) + ' ' + units[i]
    }

    useEffect(() => {

    }, [item])
    const { student_id, receipt_no, name, voucher_code } = student
    const handleShow = () => setShowStudent(true);
    const handleClose = () => setShowStudent(false);
    const dispatch = useDispatch();

    const onChange = async (e) => {
        setStudent((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const reset = () => {
        setStudent({
            student_id: '',
            receipt_no: '',
            name: '',
            voucher_code: '',
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            const payload = {
                uuid: uuid,
                data: {
                    student_id: student_id,
                    receipt_no: receipt_no,
                    name: name,
                    voucher_code: item['name'],
                    limit_uptime: item['limit-uptime'],
                    limit_bytes_total: item['limit-bytes-total'] ? item['limit-bytes-total'] : '0K',
                }
            };

            dispatch(createStudent(payload));
            dispatch(onUpdate({
                uuid: uuid,
                id: item['.id']
            }))
            dispatch(getUsers(uuid));
            dispatch(getStudents(uuid));
            reset();
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="btn-group me-2">

            <Button onClick={handleShow} size="sm" variant="success">Assign Student</Button>

            <Modal show={showStudent} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Student</Modal.Title>
                </Modal.Header>
                {
                    message ? <Alert style={{ margin: 15 }} variant='danger'>
                        {message}
                    </Alert> : ''
                }
                <Form onSubmit={onSubmit} >
                    <Form.Group>
                        <Card style={{ width: '18em', margin: 15 }}>
                            <Card.Body>
                                <Card.Title style={{ fontSize: '25px' }}>{item['name']}</Card.Title>

                                {
                                    item['limit-uptime'] ? <Card.Subtitle className="mb-2 text-muted">Duration: {item['limit-uptime']}</Card.Subtitle> : ''
                                }
                                {
                                    item['limit-bytes-total'] ? <Card.Subtitle className="mb-2 text-muted">Duration: {bytesForHuman(item['limit-bytes-total'])}</Card.Subtitle> : ''
                                }

                            </Card.Body>
                        </Card>
                    </Form.Group>
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                id="student_id"
                                name="student_id"
                                value={student_id}
                                type="text"
                                placeholder="ID"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Receipt No.</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                id="receipt_no"
                                name="receipt_no"
                                value={receipt_no}
                                type="text"
                                placeholder="#"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                id="name"
                                name="name"
                                value={name}
                                type="text"
                                placeholder="Student Name"
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
                                "Save Student"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );

}

export default AssignStudent;