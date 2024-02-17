
import PapersTa from "../Components/Papers/PapersTable"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faUser } from "@fortawesome/free-solid-svg-icons"
import PapersButton from "../Components/Papers/Papers_Button"
import { useState ,useEffect } from "react"
import PapersSearch from "../Components/Papers/Papers_search"

export default function Papers(){
  const [Papers,setPapers]=useState([])
  
  const getdata=async()=>
	{
		const response=await fetch(`api/Papers`,{
			method:'GET'
		})
		const {data}=await response.json()
		setPapers(data)
	}
	useEffect(()=>
	{
     getdata()
   }, []);
   const arrayLength = Papers.length;

    return(
        <>
          <div class="content-wrapper">
         <section className="content">
         <h1>
            Evraklar
          </h1>
          <PapersButton text="Evrak Ekle" clas="add" />
          <PapersSearch/>
          <div className="tex">
            <FontAwesomeIcon icon={faUser}/>
            <p>Evrakların Sayısı : {arrayLength}</p>
          </div>
        <PapersTa/>
        </section>
        </div>
        </>
    )
}