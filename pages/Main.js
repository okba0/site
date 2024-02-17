import { faBasketShopping, faCancel, faCheckCircle, faDownLeftAndUpRightToCenter, faHandHoldingDollar, faMoneyBillTransfer, faPerson, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect,useState } from "react";
import dynamic from "next/dynamic";
import ButtonExp from "@/Components/Expense/Expense_Button";
import IncomeButton from "@/Components/income/income_Button";
export default function Main(){

    
  const [Expense,setExpense]=useState([])
  const [income,setincome]=useState([])
  const [isOpen, setIsOpen] = useState(false);

  const getdataE=async()=>
	{
		const response=await fetch(`api/Expense`,{
			method:'GET'
		})
		const {data}=await response.json()
		setExpense(data)
	}
  const getdataI=async()=>
	{
		const response=await fetch(`api/income`,{
			method:'GET'
		})
		const {data}=await response.json()
		setincome(data)
	}

  const [login, setlogin] = useState([]);

  const getdata=async()=>
  {
    const response=await fetch('api/Login')
    const {data}=await response.json()
    setlogin(data)
  }
	useEffect(()=>
	{
     getdataE()
     getdataI()
     getdata()

   }, []);
   const sumAmounts = (data) => {
    return data.reduce((total, item) => total + item.amount, 0);
  };
  const countEntriesNeedingApproval = (data) => {
    let count = 0;
    for (const entry of data) {
      if (!entry.approval) {
        count++;
      }
    }
    return count;
  };
  
  const totalApproval=countEntriesNeedingApproval(Expense)+countEntriesNeedingApproval(income)
  const TotalExpense = sumAmounts(Expense);
  const TotalIncome = sumAmounts(income);
  const approvalExpense=async (id) =>
	{
   const tempExp= Expense.find(expense => expense._id === id);
   tempExp.approval=true
		const response=await fetch(`api/Expense/${id}`,{
			method:'PUT',
			body:JSON.stringify(tempExp),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
    }
  }
  const approvalIncome=async (id) =>
	{
   const tempINC= income.find(income => income._id === id);
   tempINC.approval=true
		const response=await fetch(`api/income/${id}`,{
			method:'PUT',
			body:JSON.stringify(tempINC),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
    }
  }
  
 
  function datefunc(date)
  {
    const dateObject = new Date(date);
    const formattedDatee = `${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}/${dateObject.getFullYear()}`;

  return formattedDatee
  }
    return(
      <div className="content-wrapper">
        <section className="content-header">

         <h4 className="page-header"> Şubat Ayı Kasa Raporu</h4>
                  <div className="row">
                <div className="col-lg-3 col-xs-6">
                          <div className="small-box bg-red qew" onClick={() => setIsOpen(true)}>
                            <div className="inner"  >
                              <h3>
                              {totalApproval}
                              </h3>
                              <p>
                                Onaylama
                              </p>
                            </div>
                            <div className="icon">
                              <FontAwesomeIcon icon={faCheckCircle}/>
                            </div>
                      
                          </div>
                        </div>
                      <div className="col-lg-3 col-xs-6">
                          <div className="small-box bg-yellow">
                            <div className="inner">
                              <h3>
                              {TotalIncome}
                              </h3>
                              <p>
                                Gelir
                              </p>
                            </div>
                            <div className="icon">
                            <FontAwesomeIcon icon={faHandHoldingDollar}/>

                            </div>
                            
                          </div>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            
                          <div className="small-box bg-aqua">
                            <div className="inner">
                              <h3>
                              {TotalExpense}
                              </h3>
                              <p>
                                Gider
                              </p>
                            </div>
                            <div className="icon">
                            <FontAwesomeIcon icon={faBasketShopping}/>
                            </div>
                            
                          </div>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                          <div className="small-box bg-green">
                            <div className="inner">
                              <h3>
                              {TotalIncome - TotalExpense}
                              </h3>
                              <p>
                              Kasa Bakiye 
                              </p>
                            </div>
                            <div className="icon">
                            <FontAwesomeIcon icon={faMoneyBillTransfer}/>
                            </div> 
                          </div>
                        </div>
                        </div>
                        
                        {isOpen && (
                                <div className="custom-popup-overlay1">
                                  <div className="custom-popup-inner1">
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
                                        {income.filter(item => !item.approval).map(item => (
                                          <tr key={item._id}>
                                            <td>{ datefunc(item.date)}</td>
                                            <td>{item.username}</td>
                                            <td>{item.description}</td>
                                            <td>TL {item.amount.toFixed(2)}</td>
                                            <td className="width">
                                            <div className="RQ">
                                            <button onClick={() => approvalIncome(item._id)} className="Onaybtni">Onayla</button>
                                            <IncomeButton text="Düzenle" clas="edit" id={item._id}/>

                                              </div>
                                            </td>
                                          </tr>
                                        ))}
                                        {Expense.filter(item => !item.approval).map(item => (
                                          <tr key={item._id}>
                                            <td>{ datefunc(item.date)}</td>
                                            <td>{item.username}</td>
                                            <td>{item.description}</td>
                                            <td>TL {item.amount.toFixed(2)}</td>
                                            <td className="width">
                                            <div className="RQ">
                                            <button onClick={() => approvalExpense(item._id)} className="Onaybtni">Onayla</button>
                                            <ButtonExp text="Düzenle" clas="edit" id={item._id}/>
                                              </div>
                                            </td>
                                          </tr>
                                        ))}
                                        
                                      </tbody>
                                    </table>
                                    <button onClick={() => setIsOpen(false)} className="custom-btn custom-btn-close">Kapat</button>
                                  </div>
                                </div>
                                )}
        <h1 className="page-header"> Kullanıcılar</h1>
        <div className="cardcontainer">  
        <div className="card12">
        <div className="image-content">
                            <span className="overlay"></span>
                            <div className="card-image">
                                <img src="avatar.png" alt="" className="card-img"/>
                            </div>
                        </div>
                          <div className="card-content">
                              <h2 className="name">David Dell</h2>
                              <p className="description">The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.</p>
                              <button className="button">View More</button>
                          </div>
                        </div>
    
          <div className="Users_card">
              <header>Online Kullanıcılar</header>
              <ul className="List_card">
                {
                  login.map(item => (
                    <li key={item._id}>
                      <img src="avatar.png" className="img-circle bordergreen" alt="User Image"/>
                      <p> {item.username}</p>
                      <p> {item.Phone}</p>
                  </li>

                  ))
                }

              </ul>
          </div>
          
        </div>
                                
        </section>
      </div>

    )
}