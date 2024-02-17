import ChatButton from "../Chat/Chat_Button";
import PolicyButton from "./Policy_Button";
import { useState ,useEffect } from "react"

export default function PolicyTa()
{
   
  const [Policy,setPolicy]=useState([])
  
  const getdata=async()=>
	{
		const response=await fetch(`api/Policy`,{
			method:'GET'
		})
		const {data}=await response.json()
		setPolicy(data)
	}

	useEffect(()=>
	{
     getdata()
   }, [Policy]);
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
          <th>Ünvan</th>
          <th>Plaka</th>
          <th>Ürün</th>
          <th>Ekleyen</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Policy.map(item => (
          <tr key={item._id}>
            <td>{datefunc(item.date)}</td>
            <td>{item.username}</td>
            <td>{item.plate}</td>
            <td>{item.product}</td>
            <td>{item.adder}</td>
            <td className="lasttd">
            <div className="RQ">
                <PolicyButton text="Göster" clas="view" id={item._id}/>
                <PolicyButton text="Düzenle" clas="edit" id={item._id}/> 
                <PolicyButton text="Sil" clas="delete" id={item._id}/>
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </>
    )
}