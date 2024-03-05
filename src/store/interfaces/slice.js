import { createSlice } from '@reduxjs/toolkit'
import { getInterfaces, getBridges, createBridges, removeBridges, initialState, getVlans, createVlans, removeVlans, getPorts, createPorts, removePorts } from './methods'

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
            //VLAN
            .addCase(getVlans.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getVlans.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.vlans = action.payload
            })
            .addCase(getVlans.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createVlans.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createVlans.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.vlan = action.payload
            })
            .addCase(createVlans.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeVlans.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeVlans.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeVlans.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //VLAN - END
            //PORTS 
            .addCase(getPorts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPorts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ports = action.payload
            })
            .addCase(getPorts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createPorts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPorts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.port = action.payload
            })
            .addCase(createPorts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removePorts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removePorts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.port = action.payload
            })
            .addCase(removePorts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        //PORTS - END


    },
})

export const { reset } = _interface.actions
export default _interface.reducer