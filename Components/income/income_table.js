import IncomeButton from "./income_Button";
import { useState ,useEffect } from "react"
import PrintReceipt from "../Expense/Print_Receipt";

export default function IncomeTable()
{

  const [income,setincome]=useState([])
  const [idtest,setId]=useState(0)

  const getdata=async()=>
	{
    const id=window.localStorage.getItem('id' )
    setId(id)
		const response=await fetch(`api/income`,{
			method:'GET'
		})
		const {data}=await response.json()
		setincome(data)
	}

	useEffect(()=>
	{
     getdata()
   }, [income]);
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
          {income.map(item => (
            <tr key={item._id}>
              <td>{ datefunc(item.date)}</td>
              <td>{item.username}</td>
              <td>{item.description}</td>
              <td>TL {item.amount.toFixed(2)}</td>
              <td className="width">
              <div className="RQ">
              {!item.approval && admin()?<IncomeButton text="Onaylama" clas="view" id={item._id}/>:"" }
              {!item.approval ?"": <PrintReceipt text="Fiş Yazdır" clas="view" id={item._id}/>}
              {!admin()?"": <IncomeButton text="Düzenle" clas="edit" id={item._id}/> }
              {!admin()?"": <IncomeButton text="Sil" clas="delete" id={item._id}/>}
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