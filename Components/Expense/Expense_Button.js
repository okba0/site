import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import ShowUser from '../Users/ShowUser';
export default function ButtonExp({text,clas,id})
{
    const router=useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      date: '',
      username: '',
      amount: '',
      description: '',
      approval:false
    });
    const [Text, setText] = useState("");
    const [Expense,setExpense]=useState([])
    const [login, setlogin] = useState([]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    const getdata=async()=>
    {
      const response=await fetch(`api/Expense/${id}`,{
        method:'GET'
      })
      const {data}=await response.json()
      setExpense(data)
    }
    const AddExpense=async () =>
	{
			const response=await fetch('api/Expense',{
			method:'POST',
			body:JSON.stringify(formData),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
      setText("Gider Fişi ekledi.")
      setIsOpen(false)

    }

	}
  const updateExpense=async () =>
	{
		const response=await fetch(`api/Expense/${id}`,{
			method:'PUT',
			body:JSON.stringify(Expense),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
      setText("Gider Fişi düzenledi.")
      setIsOpen(false)
    }
  }
    const delExpense=async () =>
    {
        const response=await fetch(`api/Expense/${id}`,{
        method:'DELETE'
        })
        if(response.ok)
    {
      setText("Fiş silindi.")
      setIsOpen(false)
    }
    }

    const getdatal=async()=>
    {
      const response=await fetch('api/Login')
      const {data}=await response.json()
      setlogin(data)
       
    }
	useEffect(()=>
	 {
        getdata()
        getdatal()

        const handleKeyDown = (event) => {
          if (event.keyCode === 27) {
            setIsOpen(false)

          }
        };
    
        document.addEventListener('keydown', handleKeyDown);

	}, []);
  const handleInputChangeD = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...Expense,
      [name]: value
    });
  };

  const handleuser = (selectedIte) => {
      formData.username=selectedIte
  };
  const handleuserE = (selectedIte) => {
    Expense.username=selectedIte
  };
  const approvalExpense=async () =>
	{

    Expense.approval=true
		const response=await fetch(`api/Expense/${id}`,{
			method:'PUT',
			body:JSON.stringify(Expense),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
      setText("Onaylandı.")
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    switch (clas) {
      case 'delete':
        delExpense()
        break;
      case 'edit':
        updateExpense()
        break;
      case 'view':
        approvalExpense()
        break;
      case 'add':
        AddExpense()
        break;
      default:
       
      }
    
  };




    let icon = null;

    switch (clas) {
      case 'delete':
        icon = <FontAwesomeIcon icon={faTrash} className='mr' />;
        break;
      case 'edit':
        icon = <FontAwesomeIcon icon={faEdit} className='mr'/>;
        break;
      case 'view':
        icon = <FontAwesomeIcon icon={faEye} className='mr'/>;
        break;
      case 'add':
        icon = <FontAwesomeIcon icon={faPlus} className='mr'/>;
        break;
      default:
        icon = null;
      }



      if(clas=='delete')
      {
        return(
          <>
                  <button onClick={() => setIsOpen(true)} className={`custom-btnt custom-btn-close ${clas}`}>      {icon}  {text}</button>
                  {isOpen && (
          <div className="custom-popup-overlay">
            <div className="custom-popup-inner">
            <button onClick={() => setIsOpen(false)} className="custom-close-icon"><FontAwesomeIcon icon={faClose} className='iconclose'/> </button>
            Silmek için Emin misin?
              <form onSubmit={handleSubmit}>
                <button type="submit" className="custom-btn">Sil</button>
              </form>
              {Text}
            </div>
          </div>
        )}
          </>
        )
      }else if(clas=='view')
      {
        return(
          <>
                  <button onClick={() => setIsOpen(true)} className={`custom-btnt custom-btn-close ${clas}`}>      {icon}  {text}</button>
                  {isOpen && (
          <div className="custom-popup-overlay">
            <div className="custom-popup-inner">
            <button onClick={() => setIsOpen(false)} className="custom-close-icon"><FontAwesomeIcon icon={faClose} className='iconclose'/> </button>

            Onaylıyor musun?
              <form onSubmit={handleSubmit}>
                <button type="submit" className="custom-btn">Onayla</button>
              </form>
              {Text}
            </div>
          </div>
        )}
          </>
        )
      }
      else if(clas=='edit')
      {
        return( 
          <>
        <button onClick={() => setIsOpen(true)} className={`custom-btnt custom-btn-close ${clas}`}>{icon} {text}</button>
        {isOpen && (
          <div className="custom-popup-overlay">
            <div className="custom-popup-inner">
              <form onSubmit={handleSubmit}>
              <button onClick={() => setIsOpen(false)} className="custom-close-icon"><FontAwesomeIcon icon={faClose} className='iconclose'/> </button>
              <div className="custom-form-group">
                  <label>Tarih:</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={Expense.date}
                    onChange={handleInputChangeD}
                    required
                    className="custom-input"
                  />
                </div>
              <div className="custom-form-group">
                  <label>Kullanıcı:</label>
                  <ShowUser data={login} onChange={handleuserE}/>
                </div>
                <div className="custom-form-group">
                  <label>Tutar:</label>
                  <input
                    type="number"
                    name="amount"
                    value={Expense.amount}
                    onChange={handleInputChangeD}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group">
                  <label>Açıklama:</label>
                  <textarea
                    name="description"
                    value={Expense.description}
                    onChange={handleInputChangeD}
                    required
                    className="custom-input"
                  />
                </div>
                <button type="submit" className="custom-btn">Kaydet</button>
              </form>
              {Text}
            </div>
          </div>
        )}</>   
        )
      }
      else
    return(
        <>
        <button onClick={() => setIsOpen(true)} className={`custom-btnt custom-btn-close ${clas}`}>{icon} {text}</button>
        {isOpen && (
          <div className="custom-popup-overlay">
            <div className="custom-popup-inner">
              <form onSubmit={handleSubmit}>
              <button onClick={() => setIsOpen(false)} className="custom-close-icon"><FontAwesomeIcon icon={faClose} className='iconclose'/> </button>

              <div className="custom-form-group">
                  <label>Tarih:</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={formData.date}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
              <div className="custom-form-group">
                  <label>Kullanıcı:</label>
                  <ShowUser data={login} onChange={handleuser}/>
                </div>
                <div className="custom-form-group">
                  <label>Tutar:</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group">
                  <label>Açıklama:</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <button type="submit" className="custom-btn">Kaydet</button>
              </form>
              {Text}
            </div>
          </div>
        )}
        </>
    )
}