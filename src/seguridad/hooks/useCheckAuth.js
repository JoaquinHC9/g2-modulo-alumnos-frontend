import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../slices';

export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const uid = 'xyz12345'
    const email = 'hcorderos@unmsm.edu.pe'
    const displayName = 'Hugo R. Cordero'
    const photoURL = ''
    
    //useEffect(() => {
        
        // TO DO
        dispatch( login({ uid, email, displayName, photoURL }) );

    //}, []);
    return status;
}
