import axios from "axios";

const url = "http://localhost:8000/api/system/";

const addresses = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/ip/addresses`, config)
    if (response.data) {
        localStorage.setItem("addresses", JSON.stringify(response.data));
    }
    return response.data
}
const create_addresses = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/ip/addresses`, data, config)

    return response.data
}
const remove_address = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/ip/addresses/${id}`, config)
    return response.data
}

const dhcp = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/ip/dhcp-server`, config)
    if (response.data) {
        localStorage.setItem("dhcp", JSON.stringify(response.data));
    }
    return response.data
}
const create_dhcp = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/ip/dhcp-server`, data, config)

    return response.data
}
const remove_dhcp = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/ip/dhcp-server/${id}`, config)
    return response.data
}


const pool = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/ip/pool`, config)
    if (response.data) {
        localStorage.setItem("pools", JSON.stringify(response.data));
    }
    return response.data
}
const create_pools = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/ip/pool`, data, config)

    return response.data
}
const remove_pools = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/ip/pool/${id}`, config)
    return response.data
}



const dns = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/ip/dns`, config)
    if (response.data) {
        localStorage.setItem("dns", JSON.stringify(response.data));
    }
    return response.data
}
const update_dns = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/ip/dns`, data, config)

    return response.data
}

const IPService = {
    addresses, pool, dns, create_addresses, create_pools, update_dns, remove_address, remove_pools,
    dhcp, create_dhcp, remove_dhcp
}
export default IPService