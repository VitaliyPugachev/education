import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selector/getProfileForm/getProfileForm';
import { Profile } from '../../type/profile';
import { validateProfile } from '../../../model/services/validateProfile/validateProfile';
import { ValidateProfileError } from '../../../model/type/profile';

export const updateProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<ValidateProfileError[]>
    >(
        'profile/updateProfileData',
        async (profileId, ThunkAPI) => {
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
                const response = await extra.api.put<Profile>(`/profile/${profileId}`, formData);

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
            }
        },
    );
