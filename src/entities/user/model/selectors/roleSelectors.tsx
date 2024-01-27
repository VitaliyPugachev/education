import {StateSchema} from "app/providers/StoreProvider";
import {createSelector} from "@reduxjs/toolkit";
import {UserRole} from "entities/user/model/types/user";


export const getUserRoles = (state: StateSchema) => state.user.authData?.role || [UserRole.USER];

export const isUserAdmin = createSelector(getUserRoles, (role) => Boolean(role?.includes(UserRole.ADMIN)));
export const isUserManager = createSelector(getUserRoles, (role) => Boolean(role?.includes(UserRole.MANAGER)));
