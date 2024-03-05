import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tab, Tabs, Spinner, Badge, Button } from "react-bootstrap";
import { getFilters, getAddressList, createFilter, createAddressList, removeFilter, removeAddressList } from "../../store/firewall/methods";
import { reset } from "../../store/firewall/slice";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import Datatable from "./components/datatable";
import CreateFirewall from "./components/firewall-create";


const Firewall = () => {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useSelector(
        (state) => state.auth
    );
    const { filter_rules, address_list, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.firewall
    );

    const headers = [
        { title: 'Action', value: 'action' },
        { title: 'Chain', value: 'chain' },
        { title: 'Src. Address List', value: 'src-address-list' },
        { title: 'Dst. Address List', value: 'dst-address-list' },
        { title: 'Dynamic', value: 'dynamic' },
        { title: 'Disabled', value: 'disabled' },
        { title: 'Actions', value: 'actions' },
    ]

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!token) {
            navigate("/login");
        }

        dispatch(getFilters(uuid))
        dispatch(getAddressList(uuid))
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    return (
        <>
            <section className="container">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                    <h1 className="h2">Firewall {isLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : ""}</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <CreateFirewall uuid={uuid} />
                    </div>
                </div>
                <Tabs
                    defaultActiveKey="filter-rules"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="filter-rules" title="Filter Rules">
                        {
                            typeof filter_rules === 'object' && filter_rules !== null ?
                                <Datatable items={filter_rules} headers={headers} items_per_page={10} removeItem={removeFilter} getItems={getFilters} /> : ''
                        }
                    </Tab>
                    <Tab eventKey="address-list" title="Address List">
                        {
                            typeof address_list === 'object' && address_list !== null ?
                                <Datatable items={address_list} headers={[
                                    { title: 'List', value: 'list' },
                                    { title: 'Address', value: 'address' },
                                    { title: 'Dynamic', value: 'dynamic' },
                                    { title: 'Disabled', value: 'disabled' },
                                    { title: 'Creation Time', value: 'creation-time' },
                                    { title: 'Actions', value: 'actions' },
                                ]}
                                    items_per_page={10}
                                    removeItem={removeAddressList}
                                    getItems={getAddressList} /> : 'No records available'
                        }
                    </Tab>
                </Tabs>
            </section>
        </>
    )

}

export default Firewall;