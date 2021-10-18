import { useEffect } from 'react';
import Flex from '@utils/Flex';
import { VscClose } from 'react-icons/vsc'; 
import styles from "@styles/Modal.module.scss";
import useClickOut from '@hooks/useClickOut';

export const ModalComponent = (props) => { 
    const { nodeRef } = useClickOut();


    return (
    <div className={styles.modal} ref={nodeRef}> 
        <Flex column gap={1.5} width="100%"> 
            <VscClose className="icon" style={{alignSelf:"flex-end"}}/>
            <Flex column gap={1}>
                <h3>Piano roadmap notifier</h3>
                <p>
                    Piano employees may subscribe to features from the Airtable roadmap and get on-site and email notifications when
                    <ul>
                        <li>delivery dates change</li>
                        <li>today is the listed delivery date</li>
                    </ul>
                </p>
                <h6>
                    For questions or issues, please reach out to julia.bell@piano.io.
                </h6>
            </Flex>
        </Flex>
    </div>
    )};

export const About = (props) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, []);

    return (  
    <div className={styles.modal_background}>
        <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
            <ModalComponent {...props}/>
        </div>
    </div>
  )
}