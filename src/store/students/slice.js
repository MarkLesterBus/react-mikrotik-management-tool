import { createSlice } from '@reduxjs/toolkit'
import { initialState, getStudents, filterStudents, createStudent, removeStudent } from './methods'
export const students = createSlice({
    name: 'students',
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
            .addCase(getStudents.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.students = action.payload
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(filterStudents.pending, (state) => {
                state.isLoading = true
            })
            .addCase(filterStudents.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.filter = action.payload
            })
            .addCase(filterStudents.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createStudent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createStudent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeStudent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeStudent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = students.actions
export default students.reducer