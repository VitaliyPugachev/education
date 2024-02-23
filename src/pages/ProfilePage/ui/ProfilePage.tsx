import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page/Page';
import { ProfilePageHeader } from '../../ProfilePage/ui/ProfilePageHeader/ProfilePageHeader';
import {EditableProfileCard} from "@/features/editableProfileCard/ui/EditableProfileCard/EditableProfileCard";
import {profileReducer} from "@/features/editableProfileCard/model/slice/profileSlice";
import {VStack} from "@/shared/ui/Stack";
import {useParams} from "react-router-dom";
import cls from "@/entities/Profile/ui/ProfileCard/ProfileCard.module.scss";
import {Loader} from "@/shared/ui/Loader/Loader";
import {useSelector} from "react-redux";
import {getProfileLoading} from "@/features/editableProfileCard/model/selector/getProfileLoading/getProfileLoading";

interface ProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{id: string}>();
    const isLoading = useSelector(getProfileLoading);

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }

    return (
        <Page className={classNames('', {}, [className])}>
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <EditableProfileCard id={id}/>
            </DynamicModuleLoader>
        </Page>

    );
};

export default ProfilePage;
