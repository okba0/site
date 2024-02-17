import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PolicyTa from "../Components/Policy/PolicyTable"
import { faPerson, faUser } from "@fortawesome/free-solid-svg-icons"
import PolicyButton from "../Components/Policy/Policy_Button"
import { useState ,useEffect } from "react"
import PolicySearch from "../Components/Policy/Policy_Search"

export default function Policy(){
  const [Policy,setPolicy]=useState([])
  
  const getdata=async()=>
	{
		const response=await fetch(`api/Policy`,{
			method:'GET'
		})
		const {data}=await response.json()
		setPolicy(data)
	}
  
	useEffect(()=>
	{
     getdata()

   }, []);

   const arrayLength = Policy.length;

    return(
        <>
          <div class="content-wrapper">
         <section className="content">
         <h1>
            Policeler
          </h1>
          <PolicyButton text="Police Ekle" clas="add"/>

          <PolicySearch/>

          <div className="tex">
            <FontAwesomeIcon icon={faUser}/>
            <p>Police Sayısı : {arrayLength}</p>
          </div>
        <PolicyTa/>
        </section>

        </div>
        
        </>
    )
}