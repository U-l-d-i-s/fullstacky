import { useSession } from "next-auth/react";
import { memo, useMemo, useState } from "react";
import MenuDropDown from "../MenuDropDown/MenuDropDown";
import styles from "./Header.module.css"

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const { data: session } = useSession()

    const circleStyle = {
        backgroundColor: "red",
    }

    const getInitials = useMemo(() => {
        return session?.user?.name?.charAt(0);
    }, [session?.user?.name]);

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <p>Main</p>
                <p>MoTivation</p>
                <p>MADNESS</p>
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
                        <MenuDropDown userName={session?.user?.name}/>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Header;