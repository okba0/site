import { useState ,useEffect } from "react"
import PapersButton from "./Papers_Button";
import ChatButton from "../Chat/Chat_Button";

export default function PapersTa()
{
  const [Papers,setPapers]=useState([])
  
  const getdata=async()=>
	{
		const response=await fetch(`api/Papers`,{
			method:'GET'
		})
		const {data}=await response.json()
		setPapers(data)
	}

	useEffect(()=>
	{
     getdata()
   }, [Papers]);    
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
          <th>Şirket</th>
          <th>Evrak Adı</th>
          <th>Açıklama</th>
          <th>Ekleyen</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Papers.map(item => (
          <tr key={item._id}>
            <td>{datefunc(item.date)}</td>
            <td>{item.company}</td>
            <td>{item.papername}</td>
            <td>{item.description}</td>
            <td>{item.adder}</td>
            <td className="lasttd">
            <div className="RQ">
                <PapersButton text="Göster" clas="view" id={item._id}/>
                <PapersButton text="Düzenle" clas="edit" id={item._id}/> 
                <PapersButton text="Sil" clas="delete" id={item._id}/>
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </>
    )
}