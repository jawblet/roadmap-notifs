import { useContext } from 'react';
import { signOut } from "next-auth/react";
import { UserContext } from '@utils/UserContext';
import Flex from "@utils/Flex";
import styles from "@styles/Home.module.scss";

const Header = () => {
    const { user } = useContext(UserContext);
    
    return (
        <Flex between className={styles.header}>
            <h4>{user.email}</h4>
            <button onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })}>
                Sign out
            </button>
        </Flex>
    );
};

export default Header;

//          
