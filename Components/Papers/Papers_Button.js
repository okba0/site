import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye, faPlus, faDownload, faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function PapersButton({text,clas,id})
{

    const router=useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      date: '',
      company: '',
      papername: '',
      description: '',
      adder: '' ,
      url:''
       });
    const [Text, setText] = useState("");
    const [Papers,setPapers]=useState([])
    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    
    const getdata=async()=>
    {
      const response=await fetch(`api/Papers/${id}`,{
        method:'GET'
      })
      const {data}=await response.json()
      setPapers(data)
    }
    const AddPapers=async () =>
	{
      handleSub()
			const response=await fetch('api/Papers',{
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
    }

	}
  const updatePapers=async () =>
	{
		const response=await fetch(`api/Papers/${id}`,{
			method:'PUT',
			body:JSON.stringify(Papers),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
      setText("Police Düzenlendi.")
    }
  }
    const delPapers=async () =>
    {
        const response=await fetch(`api/Papers/${id}`,{
        method:'DELETE'
        })
        if(response.ok)
        {
          setText("Evrak Sildi.")
        }
    }
	useEffect(()=>
	 {
        getdata()
        const handleKeyDown = (event) => {
          if (event.keyCode === 27) {
            setIsOpen(false)

          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
	}, []);
  const handleInputChangeD = (e) => {
    const { name, value } = e.target;
    setPapers({
      ...Papers,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (clas) {
      case 'delete':
        delPapers()
        break;
      case 'edit':
        updatePapers()
        break;
      case 'view':
        break;
      case 'add':
        AddPapers()
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
          {Papers.url && (
          <Link href={`/uploads/${Papers.url}`}>
            <button  className={`custom-btnt custom-btn-close ${clas}`}>

          {icon} Dosya
          </button>

          </Link>
          )
          }
          {!Papers.url && (
            <button  className={`custom-btnt custom-btn-close ${clas}`}>

          {icon} Dosya
          </button>
          )
          }
          
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
              <button onClick={() => setIsOpen(false)} className="custom-close-icon"><FontAwesomeIcon icon={faClose} className='iconclose'/> </button>

                <form onSubmit={handleSubmit}>
                  <div className="custom-form-group">
                    <label>Şirket:</label>
                    <input
                      type="text"
                      name="company"
                      value={Papers.company}
                      onChange={handleInputChangeD}
                      required
                      className="custom-input"
                    />
                  </div>
                  <div className="custom-form-group">
                    <label>Evrak Adı:</label>
                    <input
                      type="text"
                      name="papername"
                      value={Papers.papername}
                      onChange={handleInputChangeD}
                      required
                      className="custom-input"
                    />
                  </div>
                  <div className="custom-form-group">
                    <label>Ekleyen:</label>
                    <input
                      type="text"
                      name="adder"
                      value={Papers.adder}
                      onChange={handleInputChangeD}
                      required
                      className="custom-input"
                    />
                  </div>
                  <div className="custom-form-group">
                    <label>Açıklama:</label>
                    <input
                      type="text"
                      name="description"
                      value={Papers.description}
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
                  <label>Şirket:</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group">
                  <label>Evrak Adı:</label>
                  <input
                    type="text"
                    name="papername"
                    value={formData.papername}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group">
                  <label>Ekleyen:</label>
                  <input
                    type="text"
                    name="adder"
                    value={formData.adder}
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