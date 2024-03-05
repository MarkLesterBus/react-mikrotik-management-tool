import axios from "axios";

const url = "http://localhost:8000/api/system/";


// Create new goal
const createFilter = async (data, uuid, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/ip/filter-rules`, data, config)

    return response.data
}

// Get user goals

const getFilters = async (uuid, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/ip/filter-rules`, config)
    if (response) {
        localStorage.setItem("filter_rules", JSON.stringify(response.data));
    }
    return response.data
}



// Delete user goal
const removeFilter = async (uuid, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/ip/filter-rules/${id}`, config)
    return response.data
}


const createAddressList = async (data, uuid, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(url + `${uuid}/ip/address-list`, data, config)
    return response.data
}

// Get user goals

const getAddressList = async (uuid, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(url + `${uuid}/ip/address-list`, config)
    if (response) {
        localStorage.setItem("address_list", JSON.stringify(response.data));
    }
    return response.data
}



// Delete user goal
const removeAddressList = async (uuid, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(url + `${uuid}/ip/address-list/${id}`, config)
    return response.data
}




const FilterService = {
    createFilter, createAddressList, getFilters, getAddressList, removeFilter, removeAddressList
}

export default FilterService