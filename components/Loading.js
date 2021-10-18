import Flex from "@utils/Flex";
import styles from "@styles/Loading.module.scss";

const Loading = () => {
    return (
        <Flex height="100vw" width="100vh" center middle>
            <code className={styles.loading}>Loading</code>
            <code className={styles.loading_cursor}>...</code>
        </Flex>
    );
};

export default Loading;