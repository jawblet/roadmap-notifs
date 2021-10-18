import { useEffect } from 'react';
import Flex from '@utils/Flex';
import { VscClose } from 'react-icons/vsc'; 
import styles from "@styles/Modal.module.scss";
import useClickOut from '@hooks/useClickOut';
import { useFeatureStore } from "@stores/useStore";
import LinkToAirtable from './dashboard/LinkToAirtable';
import { colors } from "@utils/colors";

export const ModalComponent = (props) => { 
    const { nodeRef } = useClickOut();
    const { showFeature } = useFeatureStore();

    return (
    <div className={styles.modal} ref={nodeRef}> 
        <Flex column gap={1.5} width="100%"> 
            <VscClose className="icon" style={{alignSelf:"flex-end"}}/>
            <Flex column>
                <h6 className="lightest">{showFeature.id}</h6>
                <Flex gap={0.5} middle>
                    <h2>{showFeature.name}</h2>
                    <LinkToAirtable id={showFeature.id}/>
                </Flex>
            </Flex>
                <Flex column gap={0.5} left>
                    <Flex gap={1} middle>
                        <h4> Product: owned by {showFeature.owner},</h4>
                        <h4 className="inlinetag" style={{background:colors[showFeature.product_domain]}}>
                            {showFeature.product_domain}
                        </h4>
                    </Flex>
                    <h4 style={{fontWeight:"bold"}}>ETA: {new Date(showFeature.date).toLocaleDateString()}</h4>
                    <h4>Status: {showFeature.phase}</h4>
                    <h4 className>Dev team: {showFeature.dev_team}</h4>
                </Flex>
                <Flex gap={1.5}>
                </Flex>
                <p>
                    {showFeature.description}
                </p>
        </Flex>
    </div>
    )};

// <LinkToAirtable id={showFeature.id}/>


export const Modal = (props) => {
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