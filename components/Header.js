import { useContext } from 'react';
import { signOut } from "next-auth/react";
import { useQuery } from 'react-query';
import { UserContext } from '@utils/UserContext';

const Header = () => {
    const { user } = useContext(UserContext);
    
    // console.log(user);

    return (
        <div style={{display:"flex", justifyContent:"space-between", padding:"1rem"}}>
            <h4>{user.email}</h4>
            <button onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })}>Sign out</button>
        </div>
    );
};

export default Header;

//          
