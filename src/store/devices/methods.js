import { createAsyncThunk } from '@reduxjs/toolkit'
import DeviceService from '../../services/DeviceService'

export const initialState = {
    devices: [],
    device: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new goal
export const createDevice = createAsyncThunk(
    'devices/create',
    async (device, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await DeviceService.create(device, token)
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

// Get user devices
export const getDevices = createAsyncThunk(
    'devices/get_all',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await DeviceService.get_all(token)
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
// Get user devices
export const getDevice = createAsyncThunk(
    'devices/get_one',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await DeviceService.get_one(token, id)
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
export const updateDevice = createAsyncThunk(
    'devices/update',
    async (device, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await DeviceService.update({
                name: device.name,
                host: device.host,
                user: device.user,
                pass: device.pass,
                port: device.port
            }, device.uuid, token)
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

// Delete user goal
export const deleteDevice = createAsyncThunk(
    'devices/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await DeviceService.remove(id, token)
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