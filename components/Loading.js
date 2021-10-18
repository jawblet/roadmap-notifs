import Flex from "@utils/Flex";
import styles from "@styles/Loading.module.scss";

const Loading = () => {
    return (
        <Flex height="100vw" width="100vh" center middle className={styles.loading}>
            <code style={{fontSize:"1.5rem"}}>Loading</code>
            <code style={{fontSize:"1.5rem"}} className={styles.loading_cursor}>...</code>
        </Flex>
    );
};

export default Loading;