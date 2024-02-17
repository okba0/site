import { useState ,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
export default function Adduser({text,clas,id})
{
    const router=useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        mail: '',
        password: '',
        type: '',
        Gender: '',
        Phone: '',
    });
    const [Text, setText] = useState("");
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    const AddUser=async () =>
	{
			const response=await fetch('api/Login',{
			method:'POST',
			body:JSON.stringify(formData),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
    if(response.ok)
    {
      setText("Kullancı ekledi.")
    }

	}

  const handleSubmit = (e) => {
    e.preventDefault();
    AddUser()
  };
    return(
        <>
        <button onClick={() => setIsOpen(true)} className={`custom-btnt custom-btn-close ${clas}`}><FontAwesomeIcon icon={faPlus} className='mr'/> {text}</button>
        {isOpen && (
          <div className="custom-popup-overlay2">
            <div className="custom-popup-inner2">
            <button onClick={() => setIsOpen(false)} className="custom-close-icon"><FontAwesomeIcon icon={faClose} className='iconclose'/> </button>
              <form onSubmit={handleSubmit}>
                <div className='bes2'>
                <div className="custom-form-group1">
                  <label>Kullancı adı ve soyadı:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group1">
                  <label>Mail:</label>
                  <input
                    type="email"
                    name="mail"
                    value={formData.mail}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                </div>
                <div className='bes2'>
                <div className="custom-form-group1">
                  <label>Şifre:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group1">
                  <label>Birim:</label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                </div>
                <div className='bes2'>
                <div className="custom-form-group1">
                  <label>Cinsiyet:</label>
                  <input
                    type="text"
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group1">
                  <label>Cep telefon:</label>
                  <input
                    type="number"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
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