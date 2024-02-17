import { useState ,useEffect } from "react"

export default function PolicySearch()
{

  const [search,setSearch]=useState([])
  const [search1,setSearch1]=useState([])
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
function handlechange(event)
{
  event.preventDefault();
  var x=0
  const value = event.target.value;
  const newfilt=Policy.filter((val)=>{
    if(val.username.toLowerCase().includes(value.toLowerCase()))
    {
      x=1
      setSearch1([])
      return val.username.toLowerCase().includes(value.toLowerCase())
    }else if(val.product.toLowerCase().includes(value.toLowerCase()))
    {
      x=0
      setSearch([])
      return val.product.toLowerCase().includes(value.toLowerCase())
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
                            search.map(Policy=>
                            <div className="inside">
                            <p key={Policy._id}><a id="coloc"  name={Policy._id} href='' onClick={handler}>Ünvan: {Policy.username} </a></p>
                            </div>))
                            }
                            {search1.length !=0 &&(
                            search1.map(Policy=>
                            <div className="inside">
                            <p key={Policy._id}><a id="coloc"  name={Policy._id} href='' onClick={handler}>Ürün: {Policy.product} </a></p>
                            </div>))
                            }
                        </div>
    </>
)
}