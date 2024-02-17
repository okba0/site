import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProducts from "../Components/Products/AddProducts";;
import { useState ,useEffect } from "react"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProductsTa from "../Components/Products/ProductsTable";

export default function Defintions()
{
    const [Products,setProducts]=useState([])
  
    const getdata=async()=>
      {
          const response=await fetch(`api/Products`,{
              method:'GET'
          })
          const {data}=await response.json()
          setProducts(data)
      }
    
      useEffect(()=>
      {
       getdata()
  
     }, []);
  
     const arrayLength = Products.length;
    return(
        <>
           <>
          <div className="content-wrapper">
         <section className="content">
         <h1>
         Tanımlamalar
          </h1>
          <AddProducts text="Ürün Ekle" clas="add"/>

          <div className="tex">
            <FontAwesomeIcon icon={faUser}/>
            <p>Ürün Sayısı : {arrayLength}</p>
          </div>
          <ProductsTa/>
        </section>

        </div>
        
        </>
        </>

    )
}