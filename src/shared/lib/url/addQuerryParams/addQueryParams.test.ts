import { getQueryParams } from '../../url/addQuerryParams/addQueryParams';

describe('addQueryParams.test', () => {
    test('test with one parameter', () => {
        const params = getQueryParams({
            test: 'value',
        });
        expect(params).toBe('?test=value');
    });
    test('test with multiple parameters', () => {
        const params = getQueryParams({
            test: 'value',
            query: 'success',
        });
        expect(params).toBe('?test=value&query=success');
    });
    test('test with undefined', () => {
        const params = getQueryParams({
            test: 'value',
            query: undefined,
        });
        expect(params).toBe('?test=value');
    });
});
