import { createSlice } from '@reduxjs/toolkit'
import { initialState, getHotspot, getHotspotProfiles, createHotspot, createHotspotProrile, removeHotspot, removeHotspotProfile } from './methods'
export const _hotspot = createSlice({
    name: 'hotspot',
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
            .addCase(getHotspot.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getHotspot.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspots = action.payload
            })
            .addCase(getHotspot.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getHotspotProfiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getHotspotProfiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspot_profiles = action.payload
            })
            .addCase(getHotspotProfiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createHotspot.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createHotspot.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspot_profiles = action.payload
            })
            .addCase(createHotspot.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(removeHotspot.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeHotspot.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspot_profiles = action.payload
            })
            .addCase(removeHotspot.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createHotspotProrile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createHotspotProrile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspot_profiles = action.payload
            })
            .addCase(createHotspotProrile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeHotspotProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeHotspotProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspot_profiles = action.payload
            })
            .addCase(removeHotspotProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


    },
})

export const { reset } = _hotspot.actions
export default _hotspot.reducer