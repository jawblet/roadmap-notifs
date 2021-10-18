import { useState } from 'react';
import { UserContext } from "@utils/UserContext";
import { SessionProvider, useSession } from "next-auth/react";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import Header from "../components/Header";  
import { checkUser } from '../utils/api';
import Loading from "@components/Loading";
import Landing from '@components/Landing';
import '../styles/globals.scss'

/* Global auth wrapper */
const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(false);

  const { status } = useSession();

  // set user to context
  useQuery('getUser', () => checkUser(), {
    enabled: !!(status==="authenticated"),
    onSuccess: (res) => {
      console.log(res);
      setUser(res.user);
    }
  });
  
  if(status==="loading") return <Loading/>
  if(status==="unauthenticated") return <Landing/>

  return (
  <UserContext.Provider value={{ user }}>
        {user && <>
        <Header/>
        {children} 
        </> }
    </UserContext.Provider>
    )
}

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps } }) {

  let queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <div className="container">
          <Auth>
            <Component {...pageProps}/>
          </Auth>
        </div>
        </SessionProvider>
    </QueryClientProvider>
  )
}

export default MyApp;

/*

        <ReactQueryDevtools initialIsOpen={false} />

 return 

   useEffect(() => {
    if(Session) {
      return setUser(Session?.user);
    }
  }, [Session]);
*/
