import styles from "./ActionLinkButton.module.css"

type ActionLinkButtonType = {
    children?: JSX.Element,
    onClick?: () => void,
    text?: string,
};

const ActionLinkButton = ({text, onClick, children}:ActionLinkButtonType) => {

    return(
        <div 
            className={styles.container}
        >
            <button 
                className={styles.buttonContainer} 
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    );
};

export default ActionLinkButton;