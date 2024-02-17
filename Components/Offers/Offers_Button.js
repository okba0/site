import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye, faPlus, faDownload, faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import ShowDrop from '../Products/ProductsShow';
import Link from 'next/link';

export default function OffersButton({text,clas,id})
{
    const router=useRouter()
    const [file, setFile] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      date: '',
      insured: '',
      identity: '',
      licenseserial: '',
      plate: '',
      description: '',
      product:'',
      url:''
    });
    const [Text, setText] = useState("");
    const [Offers,setOffers]=useState([])
    const [Products,setProducts]=useState([])

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    const getdata=async()=>
    {
      const response=await fetch(`api/Offers/${id}`,{
        method:'GET'
      })
      const {data}=await response.json()
      setOffers(data)
    }
    const getdataP=async()=>
    {
      const response=await fetch(`api/Products`,{
        method:'GET'
      })
      const {data}=await response.json()
      setProducts(data)
    }
    
    const AddOffers=async () =>
	{
    handleSub()
			const response=await fetch('api/Offers',{
			method:'POST',
			body:JSON.stringify(formData),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
      setText("Teklif Ekledi.")
      setIsOpen(false)

    }

	}
  const updateOffers=async () =>
	{
		const response=await fetch(`api/Offers/${id}`,{
			method:'PUT',
			body:JSON.stringify(Offers),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
      setText("Teklif Düzenlendi.")
      setIsOpen(false)

    }
  }
    const delOffers=async () =>
    {
        const response=await fetch(`api/Offers/${id}`,{
        method:'DELETE'
        })
        if(response.ok)
    {
      setText("Teklif Sildi.")
      setIsOpen(false)

    }
    }
	useEffect(()=>
	 {
        getdata()
        getdataP()

        const handleKeyDown = (event) => {
          if (event.keyCode === 27) {
            setIsOpen(false)

          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
	}, []);
  const handleInputChangeD = (e) => {
    const { name, value } = e.target;
    setOffers({
      ...Offers,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (clas) {
      case 'delete':
        delOffers()
        break;
      case 'edit':
        updateOffers()
        break;
      case 'view':
        break;
      case 'add':
        AddOffers()
        break;
      default:
       
      }
    
  };





  const today = new Date();
  const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;
  formData.date=formattedDate
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
        Offers.product=selectedIte
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
          {Offers.url && (
          <Link href={`/uploads/${Offers.url}`}>
            <button  className={`custom-btnt custom-btn-close ${clas}`}>

          {icon} Dosya
          </button>

          </Link>
          )
          }
             {!Offers.url && (
            <button  className={`custom-btnt custom-btn-close ${clas}`}>

          {icon} Dosya
          </button>
          )
          }
          
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
                    <label>Sigortalı:</label>
                    <input
                      type="text"
                      name="insured"
                      value={Offers.insured}
                      onChange={handleInputChangeD}
                      required
                      className="custom-input"
                    />
                  </div>
                  <div className="custom-form-group">
                    <label>TC Kimlik:</label>
                    <input
                      type="text"
                      name="identity"
                      value={Offers.identity}
                      onChange={handleInputChangeD}
                      required
                      className="custom-input"
                    />
                  </div>
                  <div className="custom-form-group">
                    <label>Ruhsat Seri:</label>
                    <input
                      type="text"
                      name="licenseserial"
                      value={Offers.licenseserial}
                      onChange={handleInputChangeD}
                      required
                      className="custom-input"
                    />
                  </div>
                  <div className="custom-form-group">
                    <label>Plaka:</label>
                    <input
                      type="text"
                      name="plate"
                      value={Offers.plate}
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
                  <label>Açıklama:</label>
                  <textarea
                    name="description"
                    value={Offers.description}
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
                  <label>Sigortalı:</label>
                  <input
                    type="text"
                    name="insured"
                    value={formData.insured}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group">
                  <label>TC Kimlik:</label>
                  <input
                    type="text"
                    name="identity"
                    value={formData.identity}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group">
                  <label>Ruhsat Seri:</label>
                  <input
                    type="text"
                    name="licenseserial"
                    value={formData.licenseserial}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
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
                  <label>Ürün:</label>
                  <ShowDrop data={Products} onChange={handleChange}/>
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