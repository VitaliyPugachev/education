import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from '@/entities/user';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';
import { ThunkConfig, ThunkExtraArg } from '@/app/providers/StoreProvider';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, ThunkAPI) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
        } = ThunkAPI;
        try {
            // @ts-ignore
            const response = await extra.api.post<User>('/login', authData);
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            // @ts-ignore
            extra.navigate('/about');
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
