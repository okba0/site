import { useState ,useEffect } from "react"



export default function Profile()
{
    const [login,setlogin]=useState([])

    const getdata=async()=>
	{
		const response=await fetch('api/Login')
		const {data}=await response.json()
        const id=window.localStorage.getItem('id' )
        selectObjectById(data,id)
	}
	useEffect(()=>
	{
		getdata()
	}, []);


    const selectObjectById = (data, idToSelect) => {
        if (!Array.isArray(data) || data.length === 0) {
          return null; 
        }
      
        if (idToSelect === null || idToSelect === undefined) {
          return null; 
        }
        const selectedObject = data.find(obj => obj._id === idToSelect);
        setlogin(selectedObject)
      };
    return(
        <>
       <div className="content-wrapper pad">
    <section className="content">
        <div className="row">
            <div className="col-md-6">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img className="rounded-circle mt-5" width="150px" src={login.image}/>
                </div>
            </div>
            <div className="col-md-5">
                <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Profile Settings</h4>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group TQT prof">
                                <label >Adı ve Soyadı</label>
                                <input type="text"  defaultValue={login.username}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group prof ">
                                <label >Email</label>
                                <input type="text"  defaultValue={login.mail}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group prof">
                                    <label >Şifre</label>
                                    <input type="text"  defaultValue={login.password}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group prof">
                                    <label >Cep No</label>
                                    <input type="text"  defaultValue={login.Phone}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group prof">
                                    <label >Adres</label>
                                    <input type="text"  defaultValue={login.adres}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group prof">
                                    <label >Ünvanı</label>
                                    <input type="text"  defaultValue={login.type}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group prof">
                                    <label >Cinsiyet</label>
                                    <select >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary submit-button" type="button">Save Profile</button>
                    </div>
                </div>
            </div>
        </div>


            </section>
        </div>
        </>
    )
}