import {Profile} from "@/entities/Profile";
import {ValidateProfileError} from "@/features/editableProfileCard/model/consts/consts";

export const validateProfile = (profile?: Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }
    const {
        age,
        name,
        username,
        lastname,
        country,
    } = profile;

    const errors: ValidateProfileError[] = [];

    if (!name || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_USER_AGE);
    }

    if (!username) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!country) {
        errors.push(ValidateProfileError.INCORRECT_USER_COUNTRY);
    }

    return errors;
};
