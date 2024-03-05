import axios from "axios";

const url = "http://localhost:8000/api/system/";

const users = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/hotspot/users`, config)
    if (response.data) {
        localStorage.setItem("users", JSON.stringify(response.data));
    }
    return response.data
}
const active = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/hotspot/users/active`, config)
    if (response.data) {
        localStorage.setItem("active", JSON.stringify(response.data));
    }
    return response.data
}
const user = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/hotspot/users/${id}`, config)

    return response.data
}
const add_user = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/hotspot/users`, data, config)

    return response.data
}
const generate_user = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/hotspot/users/generate`, data, config)

    return response.data
}
const update_user = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(url + `${uuid}/hotspot/users/${id}`, config)

    return response.data
}
const remove_user = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/hotspot/users/${id}`, config)

    return response.data
}
const user_profile = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/users/profile`, config)
    if (response.data) {
        localStorage.setItem("user_profile", JSON.stringify(response.data));
    }
    return response.data
}
const add_user_profile = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/users/profile`, data, config)

    return response.data
}
const remove_user_profile = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/users/profile/${id}`, config)

    return response.data
}

const VoucherService = {
    users, active, user, add_user, generate_user, remove_user, user_profile, add_user_profile, remove_user_profile, update_user
}
export default VoucherService
