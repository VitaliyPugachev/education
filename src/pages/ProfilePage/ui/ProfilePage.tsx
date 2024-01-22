import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { ProfilePageHeader } from '../../ProfilePage/ui/ProfilePageHeader/ProfilePageHeader';
import {EditableProfileCard} from "feautures/editableProfileCard/ui/EditableProfileCard/EditableProfileCard";
import {profileReducer} from "feautures/editableProfileCard/model/slice/profileSlice";
import {VStack} from "shared/ui/Stack";
import {useParams} from "react-router-dom";

interface ProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{id: string}>();
    return (
        <Page className={classNames('', {}, [className])}>
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <VStack gap={'8'}>
                    <ProfilePageHeader />
                    <EditableProfileCard id={id}/>
                </VStack>
            </DynamicModuleLoader>
        </Page>

    );
};

export default ProfilePage;
