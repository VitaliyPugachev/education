import {Profile} from "entities/Profile";
import {ValidateProfileError} from "entities/Profile/model/type/profile";

export interface ProfileSchema {
    data?: Profile,
    form?: Profile,
    isLoading: boolean,
    error?: string,
    readonly: boolean,
    validateError?: ValidateProfileError[]
}
