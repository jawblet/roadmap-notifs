import { forwardRef } from 'react';
import styles from "@styles/Badge.module.scss";

const Badge = (props, ref) => (
        <div className={!props.value ? `${styles.badge} ${styles.badge_none}` : styles.badge} 
            onClick={props.handleClick} 
            ref={ref}>
                <h4 className={styles.badge_number}> 
                    {props.value}
                </h4>            
        </div> );

export default forwardRef(Badge); 