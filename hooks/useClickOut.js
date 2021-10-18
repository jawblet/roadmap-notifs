import { useEffect, useRef } from 'react';
import { useFeatureStore } from 'stores/useStore';
 
export default function useClickOut() { 
    const nodeRef = useRef(null); 

    const handleClickOutside = event => {
        console.log(event.target);
      //if modal is open and click is outside modal, close it 
        if(nodeRef.current && !nodeRef.current.contains(event.target)) {
          return useFeatureStore.setState({showFeature: null});
        }
      };
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
          document.removeEventListener("click", handleClickOutside, true);
        };
      });
    
    return {
        nodeRef
    }
}