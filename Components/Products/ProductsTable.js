import { useState ,useEffect } from "react"
import ChatButton from "../Chat/Chat_Button";
import AddProducts from "./AddProducts";

export default function ProductsTa()
{
  const [Products,setProducts]=useState([])
  
  const getdata=async()=>
	{
		const response=await fetch(`api/Products`,{
			method:'GET'
		})
		const {data}=await response.json()
		setProducts(data)
	}

	useEffect(()=>
	{
     getdata()
   }, []);    
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
          <th>Ürün Adı</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Products.map(item => (
          <tr key={item._id}>
            <td>{datefunc(item.date)}</td>
            <td>{item.Product}</td>

            <td className="lasttd">
            <div className="RQ">
            <AddProducts text="Düzenle" clas="edit" id={item._id}/> 
            <AddProducts text="Sil" clas="delete" id={item._id}/>
            </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </>
    )
}