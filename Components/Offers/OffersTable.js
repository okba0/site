import ChatButton from "../Chat/Chat_Button"
import OffersButton from "./Offers_Button"
import { useState ,useEffect } from "react"

export default function OffersTable()
{
      
  const [Offers,setOffers]=useState([])
  
  const getdata=async()=>
	{
		const response=await fetch(`api/Offers`,{
			method:'GET'
		})
		const {data}=await response.json()
		setOffers(data)
	}

	useEffect(()=>
	{
     getdata()
   }, [Offers]);

   function datefunc(date)
{
  const dateObject = new Date(date);
  const formattedDatee = `${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}/${dateObject.getFullYear()}`;

return formattedDatee
}
    return(
        <>
        <table className="table">
      <thead>
        <tr>
          <th>Tarih</th>
          <th>Sigortalı</th>
          <th>TC Kimlik</th>
          <th>Ruhsat Seri</th>
          <th>Plaka</th>
          <th>Ürün</th>
          <th>Açıklama</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Offers.map(item => (
          <tr key={item._id}>
            <td>{datefunc(item.date)}</td>
            <td>{item.insured}</td>
            <td>{item.identity}</td>
            <td>{item.licenseserial}</td>
            <td>{item.plate}</td>
            <td>{item.product}</td>
            <td>{item.description}</td>
            <td className="lasttd">
            <div className="RQ">
                <OffersButton text="Göster" clas="view" id={item._id}/>
                <OffersButton text="Düzenle" clas="edit" id={item._id}/> 
                <OffersButton text="Sil" clas="delete" id={item._id}/>
                <ChatButton text="chat" clas="chat" id={item._id}/>
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </>
    )
}