import axios from "axios";

const url = "http://localhost:8000/api/system/";


// Get user goals

const system = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}`, config)
    if (response.data) {
        localStorage.setItem("system", JSON.stringify(response.data));
    } else {
        localStorage.setItem("system", {});

    }
    return response.data
}
const resources = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/resources`, config)
    if (response.data) {
        localStorage.setItem("resources", JSON.stringify(response.data));
    } else {
        localStorage.setItem("resources", []);
    }
    return response.data
}
const traffic = async (token, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${data['uuid']}/traffic/${data['intface']}`, config)
    if (response.data) {
        localStorage.setItem("traffic", JSON.stringify(response.data));
    } else {
        localStorage.setItem("resources", {});
    }
    return response.data
}

const logs = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/logs`, config)
    if (response.data) {
        localStorage.setItem("logs", JSON.stringify(response.data));
    }
    else {
        localStorage.setItem("resources", []);
    }
    return response.data
}


const interfaces = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/interfaces`, config)
    if (response.data) {
        localStorage.setItem("interfaces", JSON.stringify(response.data));
    }
    return response.data
}




const vlans = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/vlans`, config)
    if (response.data) {
        localStorage.setItem("vlans", JSON.stringify(response.data));
    }
    return response.data
}
const create_vlans = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/vlans`, data, config)
    return response.data
}
const remove_vlans = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/vlans/${id}`, config)
    return response.data
}







const bridges = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/bridges`, config)
    if (response.data) {
        localStorage.setItem("bridges", JSON.stringify(response.data));
    }
    return response.data
}
const create_bridges = async (uuid, bridge, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/bridges`, bridge, config)
    return response.data
}
const remove_bridges = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/bridges/${id}`, config)
    return response.data
}





const ports = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/ports`, config)
    if (response.data) {
        localStorage.setItem("ports", JSON.stringify(response.data));
    }
    return response.data
}
const create_ports = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/ports`, data, config)

    return response.data
}
const remove_ports = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/ports/${id}`, config)
    return response.data
}







const hotspots = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/hotspot`, config)
    if (response.data) {
        localStorage.setItem("hotspots", JSON.stringify(response.data));
    }
    return response.data
}

const create_hotspot = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/hotspot`, data, config)

    return response.data
}
const remove_hotspot = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/hotspot/${id}`, config)

    return response.data
}



const hotspot_profiles = async (token, uuid) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/hotspot/profiles`, config)
    if (response.data) {
        localStorage.setItem("hotspot_profiles", JSON.stringify(response.data));
    }
    return response.data
}
const create_profile = async (token, uuid, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/hotspot/profiles`, data, config)

    return response.data
}
const remove_profile = async (token, uuid, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/hotspot/profiles/${id}`, config)

    return response.data
}



const SystemService = {
    system, resources, traffic, logs, interfaces,
    bridges, ports, vlans, create_vlans, create_bridges, create_ports, remove_bridges,


    create_hotspot, create_profile, remove_profile, remove_hotspot,

    remove_bridges, remove_ports, remove_vlans, hotspots, hotspot_profiles,

}

export default SystemService