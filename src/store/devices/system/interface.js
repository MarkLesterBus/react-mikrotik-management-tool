import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SystemService from '../../../services/SystemService'

const interfaces = localStorage.getItem("interfaces");
const bridges = localStorage.getItem("bridges");

const initialState = {

    interfaces: interfaces ? JSON.parse(interfaces) : null,
    intface: {},
    bridges: bridges ? JSON.parse(bridges) : null,
    bridge: {},


    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Interfaces
export const getInterfaces = createAsyncThunk(
    'interface/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.interfaces(token, uuid)
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
export const changeDisabledInterfaces = createAsyncThunk(
    'interface/disabled/update',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.change_disable_interfaces(token, payload.uuid, payload.id, payload.data)
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

export const changeRunningInterfaces = createAsyncThunk(
    'interface/running/update',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.change_running_interfaces(token, payload.uuid, payload.id, payload.data)
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
//Bridges
export const getBridges = createAsyncThunk(
    'bridge/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.bridges(token, uuid)
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
export const createBridges = createAsyncThunk(
    'bridge/create',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.create_bridges(payload.uuid, payload.data, token)
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
export const removeBridges = createAsyncThunk(
    'bridge/remove',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.remove_bridges(token, payload.uuid, payload.id)
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


export const _interface = createSlice({
    name: 'interface',
    initialState,
    reducers: {
        reset: (state) => {

            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''

        }
    },
    extraReducers: (builder) => {
        builder
            //Interfaces
            .addCase(getInterfaces.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getInterfaces.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.interfaces = action.payload
            })
            .addCase(getInterfaces.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //Interfaces - END

            //Bridges
            .addCase(getBridges.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBridges.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bridges = action.payload
            })
            .addCase(getBridges.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createBridges.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBridges.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bridge = action.payload

            })
            .addCase(createBridges.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeBridges.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeBridges.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

            })
            .addCase(removeBridges.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        //Bridges - END




    },
})

export const { reset } = _interface.actions
export default _interface.reducer