import ReadOnlyTextInput from '@/components/InputComponents/ReadOnlyTextInput/ReadOnlyTextInput';
import SingleInputField from '@/components/InputComponents/SingleInputField/SingleInputField';

import { useUserAccount } from '@/utils/hooks/useUserAccount/useUserAcciunt';
import { trpc } from '@/utils/trpc';
import { personal, user } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './PersonalSettings.module.css';

type PersonalSettingsInputValues = {
    address?: string,
    city?: string,
    country?: string,
    postal?: string,
};

const PersonalSettings = () => {
    const { refreshUserAccount, userData } = useUserAccount();

    const { data: session, status } = useSession();
    const addUser = trpc.useQuery(["user.getUser", { name: session?.user?.name! }]);

    // const {
    //     formState,
    //     control,
    //     reset,
    //     handleSubmit
    // } = useForm<PersonalSettingsInputValues>({
    //     mode: 'onChange',
    //     defaultValues: {
    //         address: addUser.data?.responseData?.personal?.address || '',
    //         city: addUser.data?.responseData?.personal?.city || '',
    //         country: addUser.data?.responseData?.personal?.country || '',
    //         postal: addUser.data?.responseData?.personal?.postal || '',
    //     }
    // });

    // useEffect(() => {
    //     console.log(addUser.isSuccess);
    //     reset({
    //         address: addUser.data?.responseData?.personal?.address || '',
    //         city: addUser.data?.responseData?.personal?.city || '',
    //         country: addUser.data?.responseData?.personal?.country || '',
    //         postal: addUser.data?.responseData?.personal?.postal || '',
    //     });
    // }, [addUser.isSuccess]);

    // const onSubmit: SubmitHandler<PersonalSettingsInputValues> = async (data, event) => {
    //     event?.preventDefault();
    // };

    if (addUser.isFetching) {
        return <h1>Spinning loader</h1>
    }
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <ReadOnlyTextInput
                    defaultValue={session?.user?.name || ''}
                    title="User Name"
                />
                <form
                    // onSubmit={handleSubmit(onSubmit)}
                    className={styles.formContainer}
                >

                    <div className={styles.formContainer}>
                        <SingleInputField<PersonalSettingsInputValues>
                            name="address"
                            // control={control}
                            title="Address"
                        />
                        <SingleInputField<PersonalSettingsInputValues>
                            name="city"
                            // control={control}
                            title="City"
                        />
                    </div>
                    <div className={styles.formContainer}>
                        <SingleInputField<PersonalSettingsInputValues>
                            name="country"
                            // control={control}
                            title="Country"
                        />
                        <SingleInputField<PersonalSettingsInputValues>
                            name="postal"
                            // control={control}
                            title="E-Mail"
                        />
                    </div>

                </form>
                <ReadOnlyTextInput
                    defaultValue={addUser.data?.responseData?.email || ''}
                    title="E-Mail"
                />
            </div>
        </div>
    );
};

export default PersonalSettings;