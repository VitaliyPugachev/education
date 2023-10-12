import axios from 'axios';
import { loginByUsername } from 'feautures/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { StateSchema } from 'app/providers/StoreProvider';
import { Dispatch } from '@reduxjs/toolkit';
import { userActions } from 'entities/user';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername.test', () => {
    let dispatch: Dispatch;
    let getState: () => StateSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });
    test('success log in', async () => {
        const userData = { username: 'admin', id: '1' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userData }));
        // @ts-ignore
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData));
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('fail log in', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        // @ts-ignore
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
