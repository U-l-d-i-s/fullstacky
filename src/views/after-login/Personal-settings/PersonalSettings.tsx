import SingleInputField from '@/components/InputComponents/SingleInputField/SingleInputField';
import { trpc } from '@/utils/trpc';
import { useSession } from 'next-auth/react';
import {useForm, SubmitHandler} from 'react-hook-form'

type PersonalSettingsInputValues = {
    address?: string,
    city?: string,
    country?: string,
    postal?: string,
    email?: string,
    name?: string,
};

const PersonalSettings = () => {
    const { data: session, status } = useSession();
    const addUser = trpc.useQuery(["user.getUser", {name: session?.user?.name!}]);
    console.log(addUser.data);

const {
    formState,
    control,
    handleSubmit
} = useForm<PersonalSettingsInputValues>({
    mode: 'onChange',
    defaultValues:{
        address: addUser.data?.responseData?.personal?.address || '',
        city: addUser.data?.responseData?.personal?.city || '',
        country: addUser.data?.responseData?.personal?.country || '',
        postal: addUser.data?.responseData?.personal?.postal || '',
        email: addUser.data?.responseData?.email || '',
    }
});

    const onSubmit: SubmitHandler<PersonalSettingsInputValues> = async (data, event) => {
        event?.preventDefault();
    };
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SingleInputField<PersonalSettingsInputValues> 
                    name="email"
                    control={control}
                />
            </form>
        </div>
    );
};

export default PersonalSettings;