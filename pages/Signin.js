import { useState ,useEffect } from "react"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

export default function Signin() {
	
	const router=useRouter()
	const [Data,setData]=useState([])
	const [Text,setText]=useState('')
	// const [sign,setsign]=useState([{ username:'',mail: '',password:'' }])
	const [login,setlogin]=useState([])
	const fetchloginfo=async (event) =>
	{
		event.preventDefault();
		if(Data.find( ( {mail} ) => mail === login.mail ))
		{
			setText("The email has been used before")
		}
		else{
			const response=await fetch('api/Login',{
			method:'POST',
			body:JSON.stringify(login),
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			}
		})
		if(response.ok)
		{
			router.replace("")
			setText("User Has been created")
		}
		
		}

	}
	const getdata=async()=>
	{
		const response=await fetch('api/Login')
		const {data}=await response.json()
		setData(data)
	}
	useEffect(()=>
	{
		getdata()
	}, []);

	function handleChange1(e) {

		const value = e.target.value;
	  
		setlogin({
		  ...login,
		  [e.target.name]: value
		});
	  
	  }
    return (
		<div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form">
					<span className="login100-form-logo">
					</span>
					<span className="login100-form-title p-b-34 p-t-27">
						Kullancı Ekle
					</span>
                    <div className="wrap-input100 validate-input">
						<input className="input100" type="text" name="username" placeholder="Adı" onChange={handleChange1}/>
						<span className="focus-input100"><FontAwesomeIcon icon={faUser} className="WWWW"/> </span>
					</div>
					<div className="wrap-input100 validate-input">
						<input className="input100" type="text" name="mail" placeholder="E-mail" onChange={handleChange1}/>
						<span className="focus-input100"><img src="email.png"></img></span>
					</div>
					<div className="wrap-input100 validate-input">
						<input className="input100" type="password" name="password" placeholder="Şifre "onChange={handleChange1}/>
						<span className="focus-input100" ><img  src="padlock.png"></img></span>
					</div>
					<div className="error">
					{Text}
					</div>
					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={fetchloginfo}>
							Ekle
						</button>
						
					</div>
				</form>
			</div>
		</div>
	</div>
    )
  }
