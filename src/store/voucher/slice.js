import { createSlice } from '@reduxjs/toolkit'
import { initialState, validateUser, getUsers, getUser, createUser, generateUser, removeUser, getUserProfile, createUserProfile, removeUserProfile, getActive } from './methods'
export const voucher = createSlice({
    name: 'voucher',
    initialState,
    reducers: {
        filter: (state, action) => {
            const filteredUsers = state.users.filter((user) => user.comment !== "Voucher Unavailable")
            return {
                ...state,
                filteredUsers: action.payload.length > 0 ? filteredUsers : [...state.users]
            };
        },
        reset: (state) => {

            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(validateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(validateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(validateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getActive.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getActive.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.active = action.payload
            })
            .addCase(getActive.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(generateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(generateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(generateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(removeUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user_profile = action.payload
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createUserProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createUserProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(removeUserProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeUserProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    },
})

export const { reset } = voucher.actions
export default voucher.reducer