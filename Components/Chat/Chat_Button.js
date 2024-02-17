import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMessage } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
export default function ChatButton({text,clas,id})
{
  
    return(
        <>
        <button className={`custom-btnt custom-btn-close ${clas}`}><FontAwesomeIcon icon={faMessage} className='mr'/> {text}</button>
         
        </>
    )
}