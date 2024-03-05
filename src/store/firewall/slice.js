import { createSlice } from '@reduxjs/toolkit'
import { initialState, getFilters, getAddressList, createFilter, createAddressList, removeFilter, removeAddressList } from './methods'
export const firewall = createSlice({
    name: 'firewall',
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
            .addCase(getFilters.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getFilters.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.filter_rules = action.payload
            })
            .addCase(getFilters.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createFilter.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createFilter.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createFilter.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeFilter.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeFilter.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeFilter.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getAddressList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAddressList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.address_list = action.payload
            })
            .addCase(getAddressList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createAddressList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAddressList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createAddressList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeAddressList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeAddressList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeAddressList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    },
})

export const { reset } = firewall.actions
export default firewall.reducer