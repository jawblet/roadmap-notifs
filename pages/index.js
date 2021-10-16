import { useState } from 'react';
import Head from 'next/head'
import styles from '@styles/Home.module.scss'
import { useQuery } from 'react-query';
import { getFeatures, getInitFeatures } from '../utils/api';
import Loading from '@components/Loading';
import Dashboard from '@components/dashboard/Dashboard';
import Notifications from '@components/dashboard/Notifications';
import Tabs from '@components/Tabs';
import useNotifications from '@hooks/useNotifications';
import Banner from "@components/Banner";
import { useNotifStore } from 'stores/useStore';


export default function Home(pageProps) {
  const { notifs } = useNotifications();

  const { notif } = useNotifStore();

  const {isLoading, error, data } = useQuery('getFeatures', () => getFeatures());
  const [view, setView] = useState("upcoming");

  if(isLoading || error) return <Loading/>

  return (
    <>
    {notif && <Banner/>}
    <div className={styles.container}>
      <Head>
        <title>Roadmap notifier</title>
        <meta name="Notifications when roadmap items change" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Piano roadmap notifier</h1>
       <Tabs view={view} setView={setView} notifs={notifs}/>
       <hr/>
        {(function() {
        switch (view) {
          case 'upcoming':
            return  <Dashboard data={data.features}/>;
          case 'notifications':
            return  <Notifications notifs={notifs}/>;
          default:
            return null;
        }
      })()}
    </div>
    </>
  )
}

/*
export async function getStaticProps(context) {
 const data = await getInitFeatures();
 console.log(data);

  return {
    props: { data }, // will be passed to the page component as props
  }
}

  case 'other':
            return  <Dashboard data={data.features}/>;
*/