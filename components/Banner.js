import { useState, useEffect } from "react";
import { useNotifStore } from '../stores/useStore';
import styles from "@styles/Banner.module.scss";
import Flex from "@utils/Flex";
import useTimeout from '@hooks/useTimeout';

const Banner = () => {
    const [hasTimeElapsed, setHasTimeElapsed] = useState(false);
    const { notif } = useNotifStore();

    useTimeout(() => {
        setHasTimeElapsed(true);
      }, 1500);

    useEffect(() => {
       hasTimeElapsed && useNotifStore.setState({notif: null});
    }, [hasTimeElapsed]);

    return ( <>
       {notif && <Flex className={styles.banner} center middle>
            <p>{notif.text}</p>
        </Flex>}
        </>
    );
}

export default Banner;

// banner should automatically fade out 1.5 seconds after it renders each time 