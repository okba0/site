import ButtonExp from "./Expense_Button";
import { useState ,useEffect } from "react"
import { useRouter } from 'next/router'
import PrintReceipt from "./Print_Receipt";

export default function ExpTable()
{

  const [Expense,setExpense]=useState([])
  const [idtest,setId]=useState(0)

  const getdata=async()=>
	{
    const id=window.localStorage.getItem('id' )
    setId(id)
		const response=await fetch(`api/Expense`,{
			method:'GET'
		})
		const {data}=await response.json()
		setExpense(data)
	}

	useEffect(()=>
	{
     getdata()

   }, [Expense]);
   function datefunc(date)
   {
     const dateObject = new Date(date);
     const formattedDatee = `${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}/${dateObject.getFullYear()}`;

   return formattedDatee
   }
   function admin(){

    if(idtest=="65c36292df5a60f5e4731b8c")
    {
      return true
    }
  }
    return(
        <>
        <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Adı</th>
            <th>Açıklama</th>
            <th>Tutar</th>
            <th>İşlemelr</th>
          </tr>
        </thead>
        <tbody>
          {Expense.map(item => (
            <tr key={item._id}>
              <td>{ datefunc(item.date)}</td>
              <td>{item.username}</td>
              <td>{item.description}</td>
              <td>TL {item.amount.toFixed(2)}</td>
              <td className="width">
              <div className="RQ">
              {!item.approval && admin()?<ButtonExp text="Onaylama" clas="view" id={item._id}/>:""}
              {!item.approval ?"": <PrintReceipt text="Fiş Yazdır" clas="view" id={item._id}/>}
              {!admin()?"": <ButtonExp text="Düzenle" clas="edit" id={item._id}/>}
              {!admin()?"": <ButtonExp text="Sil" clas="delete" id={item._id}/>}
                </div>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
    
        </>
    )
}