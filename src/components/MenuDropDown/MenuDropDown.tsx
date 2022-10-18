import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ActionLinkButton from '../ActionLinkButton/ActionLinkButton';
import styles from './MenuDropDown.module.css'

type MenuDropDownProps = {
    userName?: string | null,
    group?: boolean,
};
const MenuDropDown = ({ userName, group }: MenuDropDownProps) => {
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
            <h2><span style={{color: 'white'}}>Signed in as</span> <span >{userName}</span></h2>
            
            <hr style={{color: 'white'}} className={styles.horizontalLine}/>

            <ActionLinkButton>
                <p style={{color: 'white'}}>Page Theme</p>
            </ActionLinkButton>

            <hr className={styles.horizontalLine}/>

            {status === 'authenticated' ? (
                <div className={styles.authenticated}>
                    <Link
                        onClick={onClickProfileSettings}
                        href="/afterLogin/profileSettings"
                    >
                        <p style={{color: 'white'}}>Profile Settings</p>
                    </Link>
                    
                    <hr className={styles.horizontalLine}/>

                    <ActionLinkButton
                        onClick={handleSignOut}
                    >
                        <p style={{color: 'white'}}>Log Out</p>
                    </ActionLinkButton>
                </div>
            ) : (
                <ActionLinkButton
                    onClick={handleSignIn}
                >
                    <p style={{color: 'white'}}>Sign in</p>
                </ActionLinkButton>
            )}
        </div>
    );
}

export default MenuDropDown;