import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye, faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function PrintReceipt({text,clas,id})
{
   


   



   return(
    <>
        <button className={`custom-btnt custom-btn-close ${clas}`}><FontAwesomeIcon icon={faDownload} className='mr'/> {text}</button>
    </>
   )
}