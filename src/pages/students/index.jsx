import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tab, Tabs, Spinner, Badge, Button } from "react-bootstrap";
import { getStudents, filterStudents, removeStudent } from "../../store/students/methods";
import { reset } from "../../store/students/slice";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import Datatable from "./components/datatable";
// import CreateFirewall from "./components/firewall-create";


const Students = () => {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useSelector(
        (state) => state.auth
    );
    const { students, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.students
    );

    const headers = [
        { title: 'Student ID', value: 'student_id' },
        { title: 'Receipt No.', value: 'receipt_no' },
        { title: 'Name', value: 'name' },
        { title: 'Voucher Code', value: 'voucher_code' },
        { title: 'Date Created', value: 'created_at' },
        { title: 'Actions', value: 'actions' },
    ]

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!token) {
            navigate("/login");
        }

        dispatch(getStudents(uuid))
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    return (
        <>
            <section className="container">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                    <h1 className="h2">Students {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : ""}</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        {/* <CreateFirewall uuid={uuid} /> */}
                    </div>
                </div>
                <Tabs
                    defaultActiveKey="students-log"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="students-log" title="Students Log">
                        {
                            typeof students === 'object' && students !== null ?
                                <Datatable items={students} headers={headers} items_per_page={10} removeItem={removeStudent} getItems={getStudents} /> : ''
                        }
                    </Tab>

                </Tabs>
            </section>
        </>
    )

}

export default Students;