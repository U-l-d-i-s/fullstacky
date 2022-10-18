import { useSession } from "next-auth/react";
import Link from "next/link";
import { memo, useMemo, useState } from "react";
import MenuDropDown from "../MenuDropDown/MenuDropDown";
import styles from "./Header.module.css"

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const { data: session } = useSession()
    const [group, setGroup] = useState();

    const circleStyle = {
        backgroundColor: '#66FCF1',
    }

    const getInitials = useMemo(() => {
        return session?.user?.name?.charAt(0);
    }, [session?.user?.name]);

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
            <Link href="">
                    <h1>WorkOut Plan</h1>
                </Link>

                <Link href="/afterLogin/NewWorkout">
                    <h1>New Workout</h1>
                </Link>

                {group && (
                    <Link href="">
                        <h1>Group Results</h1>
                    </Link>
                )}

                <button
                    onClick={() => setMenuOpen(!isMenuOpen)}
                    className={styles.circle}
                    style={getInitials ? circleStyle : {}}
                >
                    {getInitials ? (
                        <p>{getInitials}</p>
                    ) : (
                        <p style={{ fontSize: '15px' }}>Uk</p>
                    )}
                    {!isMenuOpen ? null : (
                        <MenuDropDown 
                        userName={session?.user?.name} 
                        group={group}
                        />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Header;