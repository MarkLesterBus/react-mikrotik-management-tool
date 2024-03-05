import { createSlice } from '@reduxjs/toolkit'
import { createAddresses, createPools, getAddresses, getPools, getDNS, removeAddresses, removePools, initialState, getDhcp, createDhcp, removeDhcp } from './methods'
export const ip = createSlice({
    name: 'ip',
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
            .addCase(getAddresses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.addresses = action.payload
            })
            .addCase(getAddresses.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDhcp.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDhcp.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dhcp = action.payload
            })
            .addCase(getDhcp.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getPools.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPools.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.pools = action.payload
            })
            .addCase(getPools.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getDNS.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDNS.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dns = action.payload
            })
            .addCase(getDNS.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createPools.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPools.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createPools.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createDhcp.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDhcp.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createDhcp.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createAddresses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAddresses.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

            })
            .addCase(createAddresses.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(removeAddresses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeAddresses.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

            })
            .addCase(removeAddresses.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(removeDhcp.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeDhcp.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeDhcp.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(removePools.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removePools.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

            })
            .addCase(removePools.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    },
})

export const { reset } = ip.actions
export default ip.reducer