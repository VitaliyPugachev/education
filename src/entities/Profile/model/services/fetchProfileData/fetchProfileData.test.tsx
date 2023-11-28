import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { fetchProfileData } from 'entities/Profile';

const data = {
    name: 'Evgeniy',
    lastname: 'Petrov',
    age: '33',
    currency: 'RUB',
    country: 'Russia',
    city: 'Moscow',
    username: 'admin',
    avatar: 'https://cojo.ru/wp-content/uploads/2022/12/pepe-retroveiv-3.webp',
};

describe('fetchProfileData.test', () => {
    test('success get data', async () => {
        // @ts-ignore
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toEqual('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error fetch', async () => {
        // @ts-ignore
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
