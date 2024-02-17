import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Adduser from "../Components/Users/AddUser";
import ShowType from "../Components/Users/UsersType";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserSearch from "../Components/Users/User_Search";
import { useState,useEffect } from "react";
export default function Users(){
  const [Data,setData]=useState([])

  const getdata=async()=>
	{
		const response=await fetch('api/Login')
		const {data}=await response.json()
		setData(data)
		console.log(data)
	}
	useEffect(()=>
	{
		getdata()
	}, []);
      const userst=[
        {
            type: 'Select'
        },
        {
            type: 'admin'
        },
        {
            type: 'user'
        }
      ]
      const arrayLength = Data.length;

    return(<>
            <div class="content-wrapper">
            <section className="content">
            <h3>
                Kullanıcı Listesi
            </h3>
<div className="tex">
    
            <FontAwesomeIcon icon={faUser}/>
            <p>Kullanıcıların sayısı : {arrayLength}</p>
          </div>

<Adduser text="Yeni bir Kullanıcı Ekle" />
<UserSearch/>
<ShowType data={userst}/>
<br/>
<div className="container">
<table className="table">
        <thead>
          <tr>
            <th>Adı</th>
            <th>Email</th>
            <th>Birim</th>
            <th>Cinsiyet</th>
            <th>Telefon</th>
          </tr>
        </thead>
        <tbody>

      {Data.map((user) => (
       <tr key={user._id}>
        <td>{user.username}</td>
        <td>{user.mail}</td>
        <td>{user.type}</td>
        <td>{user.Gender}</td>
        <td>{user.Phone}</td>
       </tr>
      ))}
              </tbody>
      </table>
    </div>
    </section>
    </div>
    </>)
}