import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm, Profile } from 'entities/Profile';
import { validateProfile } from 'entities/Profile/model/services/validateProfile/validateProfile';
import { ValidateProfileError } from 'entities/Profile/model/type/profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
    'profile/updateProfileData',
    async (_, ThunkAPI) => {
        const {
            extra,
            rejectWithValue,
            getState,
        } = ThunkAPI;

        const formData = getProfileForm(getState());

        const errors = validateProfile(formData);

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put<Profile>('/profile', formData);

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
