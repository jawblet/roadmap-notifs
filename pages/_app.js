import { useState, useEffect } from 'react';
import { UserContext } from "@utils/UserContext";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import Header from "../components/Header";  
import '../styles/globals.scss'
import { checkUser } from '../utils/api';
import Loading from "@components/Loading";
import { ReactQueryDevtools } from 'react-query/devtools'
import Landing from '@components/Landing';

/* Global auth wrapper */
const Auth = ({ children }) => {
  const [user, setUser] = useState(null);

  const { status } = useSession();

  // set user to context
  useQuery('getUser', () => checkUser(), {
    enabled: !!(status==="authenticated"),
    onSuccess: (res) => {
      setUser(res);
    }
  });
  
  if(status==="loading") return <Loading/>
  if(status==="unauthenticated") return <Landing/>

  return (
  <UserContext.Provider value={{user, setUser}}>
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
