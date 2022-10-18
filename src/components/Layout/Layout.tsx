import Header from "../Header/Header";
import LowerNavBar from "../LoweNavBar/LowerNavBar";
import styles from "./Layout.module.css";

type LayoutProps = {
    children: JSX.Element | JSX.Element[],
}
const Layout = ({children}: LayoutProps) => {

    return(
        <div className={styles.container}>
            <div className={styles.backgroundElement}></div>
            <div className={styles.backgroundElement}></div>
            <div className={styles.backgroundElement}></div>
            <div className={styles.backgroundElement}></div>
            <Header />
            {children}
            <LowerNavBar />
            <div className={styles.dummyViewExtend} />
        </div>
    );
};

export default Layout;