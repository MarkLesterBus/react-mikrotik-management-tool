import axios from "axios";

const url = "http://localhost:8000/api/users";


// Create new goal
const create = async (user, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url, user, config)
    return response.data
}

// Get user goals

const get_all = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url, config)
    return response.data
}

const get_one = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `/${id}`, config)
    return response.data
}

const update = async (user, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(url + `/${id}`, user, config)
    return response.data
}

// Delete user goal
const remove = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `/${id}`, config)
    return response.data
}

const AccountService = {
    create, get_all, get_one, update, remove
}

export default AccountService