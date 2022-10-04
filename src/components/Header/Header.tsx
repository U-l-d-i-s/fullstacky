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
        backgroundColor: "red",
    }

    const getInitials = useMemo(() => {
        return session?.user?.name?.charAt(0);
    }, [session?.user?.name]);

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>

                <Link href="">
                    <p>WorkOut Plan</p>
                </Link>

                <Link href="/afterLogin/NewWorkout">
                    <p>New Workout</p>
                </Link>

                {group && (
                    <Link href="">
                        <p>Group Results</p>
                    </Link>
                )}

                <Link href="">
                    <p>WhiteBoard</p>
                </Link>

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
                        <MenuDropDown userName={session?.user?.name} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Header;