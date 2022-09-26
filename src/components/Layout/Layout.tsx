import Header from "../Header/Header";
import styles from "./Layout.module.css";

type LayoutProps = {
    children: JSX.Element | JSX.Element[],
}
const Layout = ({children}: LayoutProps) => {

    return(
        <div className={styles.container}>
            <Header />
            {children}
        </div>
    );
};

export default Layout;