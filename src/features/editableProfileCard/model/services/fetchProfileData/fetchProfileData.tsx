import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {Profile} from "@/entities/Profile";

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (profileId, ThunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = ThunkAPI;

        try {
            const response = await extra.api.get<Profile>(`/profile/${profileId}`);

            if (!response.data) {
                throw Error('error');
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
