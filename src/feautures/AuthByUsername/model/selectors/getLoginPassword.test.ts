import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginPassword } from 'feautures/AuthByUsername/model/selectors/getLoginPassword';

describe('getLoginPassword.test', () => {
    test('should return password', () => {
        const state: DeepPartial<StateSchema> = {
            login: {
                password: '1234',
            },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual('1234');
    });

    test('should return false', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginPassword(state as StateSchema)).toEqual('');
    });
});
