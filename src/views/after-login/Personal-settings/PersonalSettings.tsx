import HorizontalBreakLine from '@/components/HorizontalBreakLine/HorizontalBreakLine';
import ReadOnlyTextInput from '@/components/InputComponents/ReadOnlyTextInput/ReadOnlyTextInput';
import SingleInputField from '@/components/InputComponents/SingleInputField/SingleInputField';
import SubmitButton from '@/components/InputComponents/SubmitButton/SubmitButton';

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
    const addUser = trpc.useQuery(["user.getUser", { name: session?.user?.name! }], { refetchOnWindowFocus: false });
    const updatePersonalDetails = trpc.useMutation(["personal.updatePersonalDetails"]);

    const {
        formState,
        control,
        reset,
        handleSubmit
    } = useForm<PersonalSettingsInputValues>({
        mode: 'onChange',
        defaultValues: {
            address: addUser.data?.responseData?.personal?.address || '',
            city: addUser.data?.responseData?.personal?.city || '',
            country: addUser.data?.responseData?.personal?.country || '',
            postal: addUser.data?.responseData?.personal?.postal || '',
        }
    });

    useEffect(() => {
        console.log(addUser.isSuccess);
        reset({
            address: addUser.data?.responseData?.personal?.address || '',
            city: addUser.data?.responseData?.personal?.city || '',
            country: addUser.data?.responseData?.personal?.country || '',
            postal: addUser.data?.responseData?.personal?.postal || '',
        });
    }, [addUser.isSuccess]);

    const onSubmit: SubmitHandler<PersonalSettingsInputValues> = async (data, event) => {
        event?.preventDefault();
        console.log('submit fired');

        const {
            address,
            city,
            country,
            postal,
        } = data;

        updatePersonalDetails.mutate({
            name: session?.user?.name!,
            address: address || '',
            city: city || '',
            country: country || '',
            postal: postal || '',
        });
    };

    if (addUser.isFetching) {
        return <h1>Spinning loader</h1>
    }
    return (    
        <div className={styles.container}>
            {/* align left */}
            <div className={styles.titles}>
            <h1>Personal Settings</h1>
            <h1>Bank Details</h1>
            <h1>Account Settings</h1>
            </div>
            <div className={styles.innerContainer}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.formContainer}
                >
                    <div className={styles.row}>
                        <ReadOnlyTextInput
                            defaultValue={addUser.data?.responseData?.email || ''}
                            title="E-Mail"
                        />
                        <ReadOnlyTextInput
                            defaultValue={session?.user?.name || ''}
                            title="User Name"
                        />
                    </div>

                    <div className={styles.row}>
                        <SingleInputField<PersonalSettingsInputValues>
                            name="address"
                            control={control}
                            title="Address"
                        />
                        <SingleInputField<PersonalSettingsInputValues>
                            name="city"
                            control={control}
                            title="City"
                        />
                    </div>

                    <div className={styles.row}>
                        <SingleInputField<PersonalSettingsInputValues>
                            name="country"
                            control={control}
                            title="Country"
                        />
                    </div>

                    <SubmitButton />
                </form>
            </div>
        </div>
    );
};

export default PersonalSettings;