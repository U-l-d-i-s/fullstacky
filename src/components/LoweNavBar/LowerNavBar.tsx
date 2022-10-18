import Image from 'next/future/image'
import styles from './LowerNavBar.module.css';
import cart from '../../../public/images/shopping-cart-svgrepo-com.svg'
import dumbell from '../../../public/images/dumbell-gym-healthy-life-svgrepo-com.svg'
import cup from '../../../public/images/trophy-svgrepo-com.svg'

const LowerNavBar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.smallCalendar}>
                <div className={styles.hr} />
                <div className={styles.circle}>
                    <p>3</p>
                </div>
            </div>
            <Image
                src={cup}
                height={32}
                width={32}
            />
            <Image
                src={dumbell}
                height={32}
                width={32}
            />
            <Image
                src={cart}
                height={32}
                width={32}
            />
        </div>
    );
};

export default LowerNavBar;