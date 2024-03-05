import { createAsyncThunk } from '@reduxjs/toolkit'
import FilterService from '../../services/FilterService'

const filter_rules = localStorage.getItem("filter_rules");
const address_list = localStorage.getItem("address_list");
export const initialState = {

    filter_rules: filter_rules ? JSON.parse(filter_rules) : null,
    address_list: address_list ? JSON.parse(address_list) : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getFilters = createAsyncThunk(
    'Firwall/filters/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await FilterService.getFilters(uuid, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const createFilter = createAsyncThunk(
    'Firewall/filters/create',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await FilterService.createFilter(payload.data, payload.uuid, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const removeFilter = createAsyncThunk(
    'Firewall/filters/remove',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await FilterService.removeFilter(payload.uuid, payload.id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAddressList = createAsyncThunk(
    'Firewall/address-list/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await FilterService.getAddressList(uuid, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const createAddressList = createAsyncThunk(
    'Firewall/address-list/create',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await FilterService.createAddressList(payload.data, payload.uuid, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const removeAddressList = createAsyncThunk(
    'Firewall/address-list/remove',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await FilterService.removeAddressList(payload.uuid, payload.id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)