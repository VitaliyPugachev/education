import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData, Profile, ProfileSchema } from 'entities/Profile';

const initialState: ProfileSchema = {
    data: undefined,
    isLoading: false,
    readonly: false,
    error: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileData.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(
            fetchProfileData.fulfilled,
            (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
            },
        );
        builder.addCase(fetchProfileData.rejected, (state, action) => {
            state.isLoading = false;
            // @ts-ignore
            state.error = action.payload;
        });
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
