import { useState } from "react";
import Paginate from "../../../components/pagination";
import { Table, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import VoucherPrint from "./voucher-print";



const Datatable = ({ items, headers, items_per_page, removeItem, getItems }) => {

    const { uuid } = useParams();
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch();

    let indexOfLastPost = currentPage * items_per_page;
    let indexOfFirstPost = indexOfLastPost - items_per_page;
    let currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {

    }, [items, headers, items_per_page])

    return (
        <>

            <Table className="mt-2" striped bordered hover>
                <thead>
                    <tr>
                        {Object.keys(headers).map((header, index) => {
                            return (
                                <th key={index}>{headers[header]['title']}</th>
                            )
                        })}

                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(currentPosts).map((item, index) => (

                            <tr key={index}>
                                {Object.keys(headers).map((header, i) => {

                                    var value = headers[header]['value'];
                                    if (value == 'actions') {
                                        return (
                                            <td key={value}>
                                                <div>
                                                    <VoucherPrint item={currentPosts[item]} />
                                                    <Button onClick={() => {
                                                        const payload = {
                                                            uuid: uuid,
                                                            id: currentPosts[item]['id']
                                                        }
                                                        dispatch(removeItem(payload))
                                                        dispatch(getItems(uuid))

                                                        indexOfLastPost = currentPage * items_per_page;
                                                        indexOfFirstPost = indexOfLastPost - items_per_page;
                                                        currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
                                                    }} variant="danger" size="sm">
                                                        <FaTrash /> Delete
                                                    </Button>

                                                </div>
                                            </td>
                                        )
                                    } else {
                                        return (
                                            <td key={value}>{currentPosts[item][value]}</td>
                                        )
                                    }
                                })}
                            </tr>
                        ))
                    }
                </tbody>

            </Table>
            <div>
                <Paginate postsPerPage={items_per_page} totalPosts={items.length} paginate={paginate} />
            </div>
        </>
    )
}

export default Datatable