import {UserRole} from "@/entities/user/model/types/user";

export const checkRoles = (require: UserRole[], userRole: UserRole[]): Boolean => {
    for (let i = 0; i < userRole.length; i++) {
        if (require.includes(userRole[i])) {
            return true
        }
    }
    return false;
}
