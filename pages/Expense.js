import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonExp from "../Components/Expense/Expense_Button";
import ExpTable from "../Components/Expense/Expense_table";
import { useEffect,useState } from "react";
import { faBasketShopping, faHandHoldingDollar, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";

export default function ExpensePage() {
    
  const [Expense,setExpense]=useState([])
  const [income,setincome]=useState([])
  const [idtest,setId]=useState(0)

  const getdataE=async()=>
	{
    const id=window.localStorage.getItem('id' )
    setId(id)
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
	useEffect(()=>
	{
     getdataE()
     getdataI()
   }, []);
   const sumAmounts = (data) => {
    return data.reduce((total, item) => total + item.amount, 0);
  };
  
  // Call the function and store the result in a variable
  const TotalExpense = sumAmounts(Expense);
  const TotalIncome = sumAmounts(income);
  
  function admin(){

    if(idtest=="65c36292df5a60f5e4731b8c")
    {
      return true
    }
  }
    return (
        <>
        <div class="content-wrapper">
         <section className="content">
          <h4 className="page-header">
            
Şubat Ayı Kasa Raporu
          </h4>
          <div className="row">
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
                <div className="Tes">
                {!admin()?"": <ButtonExp text="Gider Fişi işlemi" clas="add"/> }                            
                </div>
            </div>
            <ExpTable/>

        </section>
         
      </div>
      </>

  );
}
