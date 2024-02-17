import PersonSelector from '../Components/Extracts/Personselector';
import DatePicker from '../Components/Extracts/DatePicker';
import { useState ,useEffect,useRef } from "react"

import dynamic from "next/dynamic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPrint } from '@fortawesome/free-solid-svg-icons';


const IndexPage = () => {
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [showData, setShowData] = useState(false); // State to control data display
  const [Expense,setExpense]=useState([])
  const [Income,setIncome]=useState([])
  const [login, setlogin] = useState([]);

  const handlePersonChange = (e) => {
    setSelectedPerson(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setSelectedEndDate(e.target.value);
  };

  const handleShowData = () => {
    setShowData(true); // Set the flag to show data
  };


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
		setIncome(data)

	}

  
  const getdatal=async()=>
  {
    const response=await fetch('api/Login')
    const {data}=await response.json()
    setlogin(data)
     
  }
  const usernames = login.map(user => user.username);


    useEffect(()=>
	{
    
     getdataE()
     getdataI()
     getdatal()
   }, []);

  // Filter data based on selected criter
  const filterDataByDateAndPerson = (data, startDate, endDate, selectedPerson) => {
    return data.filter((entry) => {
      const entryDate = new Date(entry.date);
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      return (
        entryDate >= startDateObj &&
        entryDate <= endDateObj &&
        entry.username === selectedPerson
      );
    });
  };

  // Filter data based on selected criteria
  const filteredDataE = filterDataByDateAndPerson(Expense, selectedStartDate, selectedEndDate, selectedPerson);
  const filteredDataI = filterDataByDateAndPerson(Income, selectedStartDate, selectedEndDate, selectedPerson);

   function datefunc(date)
   {
     const dateObject = new Date(date);
     const formattedDatee = `${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}/${dateObject.getFullYear()}`;

   return formattedDatee
   }

   const sumAmounts = (data) => {
    return data.reduce((total, item) => total + item.amount, 0);
  };
   const TotalExpense = sumAmounts(filteredDataE);
   const TotalIncome = sumAmounts(filteredDataI);

   const ReportGenerator = dynamic(() => import("../Components/Test"), {
    ssr: false,
  });
  return (
    <>
    <div className="content-wrapper">
         <section className="content">
         <h1>Extreler</h1>
         <div className="containerExt">
      <PersonSelector
        people={usernames} 
        selectedPerson={selectedPerson}
        onChange={handlePersonChange}
      />
      <DatePicker
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
      <div className='cont2b'>
      <button className="show-data-button" onClick={handleShowData}><FontAwesomeIcon icon={faPrint} className="mr" />  Extreler</button>
      <div className="show-data-button" onClick={()=>''}>
        <FontAwesomeIcon icon={faDownload}/>
        <ReportGenerator 
        expense={filteredDataE}
        income={filteredDataI} 
        devir={TotalIncome-TotalExpense} 
        startdate={selectedStartDate}
        enddate={selectedEndDate}
        name={selectedPerson}
        />
      </div>
        </div>
      </div>
      {showData && (
          <div className="container">
            <div  className="ttq">
              <h2>Devir={TotalIncome-TotalExpense} </h2>
            </div>
          <table className="table">
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Açıklama</th>
                <th>Alacak</th>
                <th>Borç</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataE.map(item => (
                <tr key={item._id}>
                  <td>{ datefunc(item.date)}</td>
                  <td>{item.description}</td>
                  <td>0</td>
                  <td>TL {item.amount.toFixed(2)}</td>
                </tr>
              ))}
               {filteredDataI.map(item => (
                <tr key={item._id}>
                  <td>{ datefunc(item.date)}</td>
                  <td>{item.description}</td>
                  <td>TL {item.amount.toFixed(2)}</td>
                  <td>0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
  

    
    </section>
    </div>
    </>
  );
};

export default IndexPage;
