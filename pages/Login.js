import { useState ,useEffect } from "react"
import { useRouter } from "next/router"

export default function Login() {
	
	const router=useRouter()
	const [Data,setData]=useState([])
	const [Text,setText]=useState('')
	// const [sign,setsign]=useState([{ username:'',mail: '',password:'' }])
	const [login,setlogin]=useState([{mail: '',password:'' }])
	const fetchloginfo=async (event) =>
	{
		event.preventDefault();
		if(Data.find( ( {mail} ) => mail === login.mail ))
		{
			const t=Data.find( ({ mail }) => mail === login.mail )
			if(t.password===login.password)
			{
				router.push({ pathname: '/'});
				window.localStorage.setItem('id', t._id );
			}
		}
		else{
			setText('invalid username or password')
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
						Log in
					</span>
					<div className="wrap-input100 validate-input">
						<input className="input100" type="text" name="mail" placeholder="E-mail" onChange={handleChange1}/>
						<span className="focus-input100"><img src="email.png"></img></span>
					</div>
					<div className="wrap-input100 validate-input">
						<input className="input100" type="password" name="password" placeholder="Password "onChange={handleChange1}/>
						<span className="focus-input100" ><img  src="padlock.png"></img></span>
					</div>
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={fetchloginfo}>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
    )
  }
