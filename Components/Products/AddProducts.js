import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
export default function AddProducts({text,clas,id})
{
  let icon = null;

    const router=useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        Product: '',
        date:''
    });
    const [Products,setProducts]=useState([])

    const [Text, setText] = useState("");
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    const AddProducts=async () =>
	{
			const response=await fetch('api/Products',{
			method:'POST',
			body:JSON.stringify(formData),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
      setText("Ürün ekledi.")
    }

	}

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
    const getdata=async()=>
    {
      const response=await fetch(`api/Products/${id}`,{
        method:'GET'
      })
      const {data}=await response.json()
      setProducts(data)
    }
    useEffect(()=>
	 {
        getdata()

	}, []);
  const updateProducts=async () =>
	{
		const response=await fetch(`api/Products/${id}`,{
			method:'PUT',
			body:JSON.stringify(Products),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
      setText("Ürün  Düzenlendi.")
    }
  }
  const delProducts=async () =>
  {
      const response=await fetch(`api/Products/${id}`,{
      method:'DELETE'
      })
      router.reload()
  }
    const handleInputChangeD = (e) => {
      const { name, value } = e.target;
      setProducts({
        ...Products,
        [name]: value
      });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      switch (clas) {
        case 'delete':
          delProducts()
          break;
        case 'edit':
          updateProducts()
          break;
        case 'view':
          break;
        case 'add':
          AddProducts()
          break;
        default:
         
        }
      
    };
  const today = new Date();
  const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;
  formData.date=formattedDate
  
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
  }else if(clas=='edit')
  {
    return( 
      <>
       <button onClick={() => setIsOpen(true)} className={`custom-btnt custom-btn-close ${clas}`}><FontAwesomeIcon icon={faPlus} className='mr'/> {text}</button>
        {isOpen && (
          <div className="custom-popup-overlay">
            <div className="custom-popup-inner">
            <button onClick={() => setIsOpen(false)} className="custom-close-icon"><FontAwesomeIcon icon={faClose} className='iconclose'/> </button>

              <form onSubmit={handleSubmit}>
                <div className="custom-form-group">
                  <label>Ürün:</label>
                  <input
                    type="text"
                    name="Product"
                    defaultValue={Products.Product}
                    onChange={handleInputChangeD}
                    required
                    className="custom-input"
                  />
                </div>
                <button type="submit" className="custom-btn">Düzenle</button>
              </form>
              {Text}
            </div>
          </div>
        )}
      </> 
    )
  }
  else
    return(
        <>
        <button onClick={() => setIsOpen(true)} className={`custom-btnt custom-btn-close ${clas}`}><FontAwesomeIcon icon={faPlus} className='mr'/> {text}</button>
        {isOpen && (
          <div className="custom-popup-overlay">
            <div className="custom-popup-inner">
            <button onClick={() => setIsOpen(false)} className="custom-close-icon"><FontAwesomeIcon icon={faClose} className='iconclose'/> </button>

              <form onSubmit={handleSubmit}>
                <div className="custom-form-group">
                  <label>Ürün:</label>
                  <input
                    type="text"
                    name="Product"
                    value={formData.Product}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <button type="submit" className="custom-btn">Ekle</button>
              </form>
              {Text}
            </div>
          </div>
        )}
        </>
    )
}