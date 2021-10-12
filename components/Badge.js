import { forwardRef } from 'react';
import styles from "@styles/Badge.module.scss";

const Badge = forwardRef(({ value, handleClick }, ref) => {
    return (
        <div className={!value ? `${styles.badge} ${styles.badge_none}` : styles.badge} 
            onClick={handleClick} 
            ref={ref}>
                <h4 className={styles.badge_number}> 
                    {value}
                </h4>            
        </div>
    )
});

export default Badge;