import { LoginSchema } from 'feautures/AuthByUsername';
import { loginActions, loginReducer } from 'feautures/AuthByUsername/model/slice/loginSlice';

describe('loginSlice.test', () => {
    test('set username', () => {
        const state: DeepPartial<LoginSchema> = { username: '123' };
        expect(loginReducer(state as LoginSchema, loginActions.setUsername('213'))).toEqual({ username: '213' });
    });
    test('set password', () => {
        const state: DeepPartial<LoginSchema> = { password: '123' };
        expect(loginReducer(state as LoginSchema, loginActions.setPassword('213'))).toEqual({ password: '213' });
    });
});
