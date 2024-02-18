import {componentRender} from "@/shared/lib/tests/componentRender/componentRender";
import {EditableProfileCard} from "features/editableProfileCard/ui/EditableProfileCard/EditableProfileCard";
import {Country} from "@/entities/Country";
import {Currency} from "@/entities/Currency";
import {profileReducer} from "features/editableProfileCard/model/slice/profileSlice";
import React, {useEffect} from "react";
import {userEvent} from "@testing-library/user-event";
import {screen} from "@testing-library/react";


const data = {
    id: '1',
    username: 'admin',
    name: 'Name',
    lastname: 'LastName',
    country: Country.Russia,
    city: 'Moscow',
    age: 22,
    currency: Currency.RUB,
    avatar: ''
}

const options = {
    initialState: {
        profile: {
            data: data,
            readonly: true,
            form: data,
            isLoading: false,
            error: '',
        },
        user: {
            authData: {
                id: '1',
                username: 'admin'
            }
        }
    },
    asyncReducers: {
        profile: profileReducer
    }
}

describe('EditableProfileCard', () => {

    test('on Edit button click Cancel button must be in the document', async () => {
        componentRender(<EditableProfileCard id={'1'} />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCard.EditButton'));
        expect(screen.getByTestId('EditableProfileCard.CancelButton')).toBeInTheDocument();
    });
})
