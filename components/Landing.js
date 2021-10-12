import { signIn } from "next-auth/react";
import Image from "next/image";
import BTN from "@styles/assets/BTN.png";
import Flex from "@utils/Flex";

const Landing = () => {
    return (
        <Flex width="100vw" height="100vh" gap={1.5} center middle column>
        <h1>Piano roadmap notifier</h1> 
        <h4>Sign in with your Piano email.</h4>
        <button onClick={() => signIn("google", { callbackUrl: process.env.NEXTAUTH_URL })}>
          <Image 
            src={BTN} 
            height={50}
            width={215}
            alt="Sign in with Google button"/>
        </button>
      </Flex>
    );
};

export default Landing;