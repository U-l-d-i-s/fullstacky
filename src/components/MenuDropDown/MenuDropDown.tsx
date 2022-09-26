import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ActionLinkButton from '../ActionLinkButton/ActionLinkButton';
import styles from './MenuDropDown.module.css'

type MenuDropDownProps = {
    userName?: string | null,
};
const MenuDropDown = ({ userName }: MenuDropDownProps) => {
    const { status } = useSession()
    const router = useRouter();

    const onClickProfileSettings = () => {
        (async () => {
            await router.push('/afterLogin/profileSettings');
        })().catch(() => {
            throw new Error('couldn`t redirect to Profile Settings');
        })
    };

    const handleSignOut = () => {
        signOut();
        (async () => {
            await router.push('/beforeLogin');
        })().catch(() => {
            throw new Error('couldn`t redirect to beforeLogin');
        })
    };

    const handleSignIn = () => {
        signIn();
        (async () => {
            await router.push('/afterLogin');
        })().catch(() => {
            throw new Error('couldn`t redirect to beforeLogin');
        })
    };

    return (
        <div
            className={styles.menuDropDown}
        >
            <h3>Signed in as <span >{userName}</span></h3>

            <hr className={styles.horizontalLine}/>

            <ActionLinkButton>
                <p>ToC</p>
            </ActionLinkButton>
            <ActionLinkButton>
                <p>Page Theme</p>
            </ActionLinkButton>

            <hr className={styles.horizontalLine}/>

            {status === 'authenticated' ? (
                <div className={styles.authenticated}>
                    <Link
                        onClick={onClickProfileSettings}
                        href="/afterLogin/profileSettings"
                    >
                        <p>Profile Settings</p>
                    </Link>
                    <ActionLinkButton
                        onClick={handleSignOut}
                    >
                        <p>Log Out</p>
                    </ActionLinkButton>
                </div>
            ) : (
                <ActionLinkButton
                    onClick={handleSignIn}
                >
                    <p>Sign in</p>
                </ActionLinkButton>
            )}
        </div>
    );
}

export default MenuDropDown;