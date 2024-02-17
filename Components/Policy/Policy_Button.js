import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye, faPlus, faDownload, faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import ShowDrop from '../Products/ProductsShow';
import Link from 'next/link';
import ShowUser from '../Users/ShowUser';

export default function PolicyButton({text,clas,id})
{
  const [file, setFile] = useState(null);

    const router=useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      date: '',
      username: '',
      product: '',
      plate: '',
      adder: '',
      url:''
    });
    const [login, setlogin] = useState(true);
    const [Text, setText] = useState("");
    const [Policy,setPolicy]=useState([])

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    const getdata=async()=>
    {
      const response=await fetch(`api/Policy/${id}`,{
        method:'GET'
      })
      const {data}=await response.json()
      setPolicy(data)
    }
    const AddPolicy=async () =>
	{
      handleSub()
			const response=await fetch('api/Policy',{
			method:'POST',
			body:JSON.stringify(formData),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
      setText("Police Ekledi.")
      setIsOpen(false)

    }

	}
  const updatePolicy=async () =>
	{
		const response=await fetch(`api/Policy/${id}`,{
			method:'PUT',
			body:JSON.stringify(Policy),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
      setText("Police Düzenlendi.")
      setIsOpen(false)

    }
  }
    const delPolicy=async () =>
    {
        const response=await fetch(`api/Policy/${id}`,{
        method:'DELETE'
        })
        if(response.ok)
        {
          setText("Police silindi.")
        }    
      }

    const [Products,setProducts]=useState([])
  
  const getdataP=async()=>
	{
		const response=await fetch(`api/Products`,{
			method:'GET'
		})
		const {data}=await response.json()
		setProducts(data)
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
        getdataP()
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
    setPolicy({
      ...Policy,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (clas) {
      case 'delete':
        delPolicy()
        break;
      case 'edit':
        updatePolicy()
        break;
      case 'view':
        break;
      case 'add':
        AddPolicy()
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
        icon = <FontAwesomeIcon icon={faDownload} className='mr'/>;
        break;
      case 'add':
        icon = <FontAwesomeIcon icon={faPlus} className='mr'/>;
        break;
      default:
        icon = null;
      }
      const today = new Date();
      const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;
      formData.date=formattedDate

      function datefunc(date)
      {
        const dateObject = new Date(date);
        const formattedDatee = `${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}/${dateObject.getFullYear()}`;
      return formattedDatee
      }
      
      
      const handleChange = (selectedIte) => {
        formData.product=selectedIte
      };
      const handleChanged = (selectedIte) => {
        Policy.product=selectedIte
      };
      
      const handleuser = (selectedIte) => {
        formData.adder=selectedIte
    };
    const handleuserE = (selectedIte) => {
      Policy.adder=selectedIte
    };

      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
      };

      
   const handleSub = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formFile = new FormData();
    formFile.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formFile,
      });
      const data = await response.json();
      if (response.ok) {
        formData.url=data.filename
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

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
          <Link href={`/uploads/${Policy.url}`}>
          <button  className={`custom-btnt custom-btn-close ${clas}`}>

          {icon} Dosya
          </button>

          </Link>
          
          </> 
        )
      }else if(clas=='edit')
      {
        return( 
          <>
          <button onClick={() => setIsOpen(true)} className={`custom-btnt custom-btn-close ${clas}`}>{icon} {text}</button>
          {isOpen && (
            <div className="custom-popup-overlay">
              <div className="custom-popup-inner">
              <button onClick={() => setIsOpen(false)} className="custom-close-icon"><FontAwesomeIcon icon={faClose} className='iconclose'/> </button>

                <form onSubmit={handleSubmit}>
                <div className="custom-form-group">
                  <label>Kullanıcı:</label>
                  <ShowUser data={login} onChange={handleuserE}/>
                </div>
                  <div className="custom-form-group">
                    <label>Ünvan:</label>
                    <input
                      type="text"
                      name="username"
                      value={Policy.username}
                      onChange={handleInputChangeD}
                      required
                      className="custom-input"
                    />
                  </div>
                  <div className="custom-form-group">
                    <label>Ürün:</label>
                    <ShowDrop data={Products} onChange={handleChanged}/>
                  </div>
                  <div className="custom-form-group">
                    <label>Plaka:</label>
                    <input
                      type="text"
                      name="plate"
                      value={Policy.plate}
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
          )}
          </> 
        )
      }
      else
    return(
        <>
        <button onClick={() => setIsOpen(true)} className={`custom-btnt custom-btn-close ${clas}`}>{icon} {text}</button>
        {isOpen && (
          <div className="custom-popup-overlay">
            <div className="custom-popup-inner">
            <button onClick={() => setIsOpen(false)} className="custom-close-icon"><FontAwesomeIcon icon={faClose} className='iconclose'/> </button>

              <form onSubmit={handleSubmit}>
              <div className="custom-form-group">
                  <label>Kullanıcı:</label>
                  <ShowUser data={login} onChange={handleuser}/>
                </div>
                <div className="custom-form-group">
                  <label>Ünvan:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group">
                  <label>Ürün:</label>
                  <ShowDrop data={Products} onChange={handleChange}/>

                </div>
                <div className="custom-form-group">
                  <label>Plaka:</label>
                  <input
                    type="text"
                    name="plate"
                    value={formData.plate}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group">
                  <label>Dosya:</label>
                  <div className='Upload'>
                      <input type="file" onChange={handleFileChange} accept=".pdf" />
                  </div>

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