import { useState ,useEffect } from "react"

export default function PapersSearch()
{

  const [search,setSearch]=useState([])
  const [search1,setSearch1]=useState([])
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
function handlechange(event)
{
  event.preventDefault();
  var x=0
  const value = event.target.value;
  const newfilt=Papers.filter((val)=>{
    if(val.company.toLowerCase().includes(value.toLowerCase()))
    {
      x=1
      setSearch1([])
      return val.company.toLowerCase().includes(value.toLowerCase())
    }else if(val.papername.toLowerCase().includes(value.toLowerCase()))
    {
      x=0
      setSearch([])
      return val.papername.toLowerCase().includes(value.toLowerCase())
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
                            search.map(Papers=>
                            <div className="inside">
                            <p key={Papers._id}><a id="coloc"  name={Papers._id} href='' onClick={handler}>Şirket: {Papers.company} </a></p>
                            </div>))
                            }
                            {search1.length !=0 &&(
                            search1.map(Papers=>
                            <div className="inside">
                            <p key={Papers._id}><a id="coloc"  name={Papers._id} href='' onClick={handler}>Evrak Adı: {Papers.papername} </a></p>
                            </div>))
                            }
                        </div>
    </>
)
}