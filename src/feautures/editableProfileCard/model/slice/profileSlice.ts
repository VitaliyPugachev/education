import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import {Profile} from "entities/Profile";
import {ProfileSchema} from "feautures/editableProfileCard/model/type/editableProfileCardTypes";
import {ValidateProfileError} from "feautures/editableProfileCard/model/consts/consts";

const initialState: ProfileSchema = {
    data: undefined,
    isLoading: false,
    readonly: true,
    error: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.form = state.data;
            state.validateError = undefined;
        },
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
                state.form = action.payload;
            },
        );
        builder.addCase(fetchProfileData.rejected, (state, action) => {
            state.isLoading = false;
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(updateProfileData.pending, (state, action) => {
            state.validateError = undefined;
            state.isLoading = true;
        });
        builder.addCase(
            updateProfileData.fulfilled,
            (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
            },
        );
        builder.addCase(updateProfileData.rejected, (state, action) => {
            state.isLoading = false;
            // @ts-ignore
            state.validateError = action.payload;
        });
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
