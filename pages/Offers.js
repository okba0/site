
import OffersButton from "../Components/Offers/Offers_Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faUser } from "@fortawesome/free-solid-svg-icons"
import OffersTable from "../Components/Offers/OffersTable"
import { useState ,useEffect } from "react"
import OffersSearch from "../Components/Offers/Offers_search"

export default function Offers(){
  const [Offers,setOffers]=useState([])
  
  const getdata=async()=>
	{
		const response=await fetch(`api/Offers`,{
			method:'GET'
		})
		const {data}=await response.json()
		setOffers(data)
	}

	useEffect(()=>
	{
     getdata()
   }, []);
   const arrayLength = Offers.length;

    return(
        <>
          <div class="content-wrapper">
         <section className="content">
         <h1>
            Teklifler
          </h1>
          <OffersButton text="Teklif Ekle" clas="add"/>
          <OffersSearch/>
          <div className="tex">
            <FontAwesomeIcon icon={faUser}/>
            <p>Teklifler sayısı : {arrayLength}</p>
          </div>
        <OffersTable/>
        </section>
        </div>
        </>
    )
}