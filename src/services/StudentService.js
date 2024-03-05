import axios from "axios";

const url = "http://localhost:8000/api/system/";

const students = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/students`, config)
    if (response.data) {
        localStorage.setItem("students", JSON.stringify(response.data));
    }
    return response.data
}
const filter_students = async (token, uuid, filter) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/students/filter/${filter}`, config)
    return response.data
}

const add_students = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/students`, data, config)
    return response.data
}
const remove_student = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/students/${id}`, config)
    return response.data
}

const StudentService = {
    students, filter_students, add_students, remove_student
}

export default StudentService