import { useState,useEffect } from "react";

export default function Templates()
{
    const [formData, setFormData] = useState({
        adress: "",
        image: "",
        number: "",
        name: "",
        site:""
         });
    const [Text, setText] = useState("");
    const [file, setFile] = useState(null);

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

    const handleSub = async () => {
        if (!file) {
          setMessage('Please select a file');
          return;
        }
    
        const formFile = new FormData();
        formFile.append('file', file);
    
        try {
          const response = await fetch('/api/Upload_images', {
            method: 'POST',
            body: formFile,
          });
          const data = await response.json();
          if (response.ok) {
            formData.image=data.filename
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSub()

       // AddPapers()
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
      };

    return(
        <>
        <div className="content-wrapper">
            <section className="content-header">
            <div className="custom-popup-overlay4">
            <div className="custom-form-group4">
                  <label>Dosya:</label>
                  <div className='Upload1'>
                      <input type="file" onChange={handleFileChange} accept="image/*" />
                  </div>
                </div>
            <div className="custom-popup-inner4">
              <form onSubmit={handleSubmit}>
                <div className="custom-form-group">
                  <label>Şirket:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group">
                  <label>Adres:</label>
                  <input
                    type="text"
                    name="adress"
                    value={formData.adress}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group">
                  <label>Numara:</label>
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                    className="custom-input"
                  />
                </div>
                <div className="custom-form-group">
                  <label>Site:</label>
                  <textarea
                    name="site"
                    value={formData.site}
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
            </section>
        </div>
        </>
    )
}