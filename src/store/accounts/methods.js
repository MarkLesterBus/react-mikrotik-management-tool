import { createAsyncThunk } from '@reduxjs/toolkit'
import AccountService from '../../services/AccountService'


export const initialState = {
    users: [],
    user: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new goal
export const createUser = createAsyncThunk(
    'users/create',
    async (account, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await AccountService.create(account, token)
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

// Get user accounts
export const getUsers = createAsyncThunk(
    'users/get_all',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await AccountService.get_all(token)
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
// Get user accounts
export const getUser = createAsyncThunk(
    'users/get_one',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await AccountService.get_one(token, id)
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
export const updateUser = createAsyncThunk(
    'users/update',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await AccountService.update({
                name: payload.name,
                email: payload.email,
                password: payload.password
            }, payload.id, token)
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
export const deleteUser = createAsyncThunk(
    'users/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await AccountService.remove(id, token)
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