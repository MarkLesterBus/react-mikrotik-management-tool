import { useState } from "react";
import Paginate from "../../../components/pagination";
import { Table, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getUsers, removeUser, validateUser } from "../../../store/voucher/methods";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AssignStudent from "./student-add";



const Datatable = ({ items, headers, items_per_page }) => {

    const { uuid } = useParams();
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch();



    let indexOfLastPost = currentPage * items_per_page;
    let indexOfFirstPost = indexOfLastPost - items_per_page;
    let currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    function bytesForHuman(bytes) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

        let i = 0

        for (i; bytes > 1024; i++) {
            bytes /= 1024;
        }
        return parseInt(bytes) + ' ' + units[i]
    }

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
                                    if (value == 'limit-bytes-total') {
                                        return (
                                            <td key={value}>{currentPosts[item][value] ? bytesForHuman(currentPosts[item][value]) : '0 bytes'}</td>
                                        )
                                    }
                                    if (value == 'actions') {
                                        return (
                                            <td key={value}>
                                                <div>
                                                    {
                                                        !currentPosts[item]['comment'] ?
                                                            <AssignStudent item={currentPosts[item]} onUpdate={validateUser} /> : <></>
                                                    }
                                                    {
                                                        currentPosts[item]['comment'] ?
                                                            <Button onClick={() => {
                                                                const payload = {
                                                                    uuid: uuid,
                                                                    id: currentPosts[item]['.id']
                                                                }
                                                                dispatch(removeUser(payload))
                                                                dispatch(getUsers(uuid))
                                                                indexOfLastPost = currentPage * items_per_page;
                                                                indexOfFirstPost = indexOfLastPost - items_per_page;
                                                                currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
                                                            }} variant="danger" size="sm">
                                                                <FaTrash /> Delete
                                                            </Button> : <></>
                                                    }

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
            <Paginate postsPerPage={items_per_page} totalPosts={items.length} paginate={paginate} />

        </>
    )
}

export default Datatable