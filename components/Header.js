import { useContext } from 'react';
import { signOut } from "next-auth/react";
import { UserContext } from '@utils/UserContext';
import Flex from "@utils/Flex";
import styles from "@styles/Home.module.scss";
import Link from "next/link";
import { VscCircleLargeFilled } from "react-icons/vsc";

const Header = () => {
    const { user } = useContext(UserContext);
    
    return (
        <Flex between className={styles.header}>
            <Flex gap={1}>
                <Link href="/">
                    <VscCircleLargeFilled className="link"/>
                </Link>
                <Link href="/profile">
                    <h4 className="link">
                        {user.email}
                    </h4>
                </Link>
            </Flex>
         
            <button onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })}>
                Sign out
            </button>
        </Flex>
    );
};

export default Header;

//          
