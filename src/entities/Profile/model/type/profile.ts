import { Country, Currency } from 'shared/const/common';

export interface Profile {
    name: string,
    lastname: string,
    age: number,
    currency: Currency,
    country: Country,
    city: string,
    username: string,
    avatar: 'https://cojo.ru/wp-content/uploads/2022/12/pepe-retroveiv-3.webp'
}

export interface ProfileSchema {
    data?: Profile,
    isLoading: boolean,
    error?: string,
    readonly: boolean
}
