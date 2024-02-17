import { useState ,useEffect } from "react"

export default function OffersSearch()
{

  const [search,setSearch]=useState([])
  const [search1,setSearch1]=useState([])
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
function handlechange(event)
{
  event.preventDefault();
  var x=0
  const value = event.target.value;
  const newfilt=Offers.filter((val)=>{
    if(val.plate.toLowerCase().includes(value.toLowerCase()))
    {
      x=1
      setSearch1([])
      return val.plate.toLowerCase().includes(value.toLowerCase())
    }else if(val.insured.toLowerCase().includes(value.toLowerCase()))
    {
      x=0
      setSearch([])
      return val.insured.toLowerCase().includes(value.toLowerCase())
    }
  }) 
  console.log(x)
  if(value==="")
    {
      setSearch([])
      setSearch1([])
    }
  else if(x==1)
		setSearch(newfilt);
  else if(x==0)
    setSearch1(newfilt);
}
function handler(event)
{
  event.preventDefault();
  console.log(event.target.name)
}
return(
    <>
                        <div className="Search">
                            <input  type="search" 
                            name="search" placeholder='Arama' onChange={handlechange}/>
                            {search.length !=0 &&(
                            search.map(Offers=>
                            <div className="inside">
                            <p key={Offers._id}><a id="coloc"  name={Offers._id} href='' onClick={handler}>Plaka: {Offers.plate} </a></p>
                            </div>))
                            }
                            {search1.length !=0 &&(
                            search1.map(Offers=>
                            <div className="inside">
                            <p key={Offers._id}><a id="coloc"  name={Offers._id} href='' onClick={handler}>Sigortalı: {Offers.insured} </a></p>
                            </div>))
                            }
                        </div>
    </>
)
}