import { useRouter } from 'next/router'
import { useState ,useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine,faCog,faHandHoldingDollar,faListCheck,faMessage, faScroll, faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';

export default function Nav({ setActiveComponent })
{


    
  const [text,setText]=useState('')
  const [idtest,setId]=useState(0)
  const router=useRouter()
  const [loading, setLoading] = useState(true);
  const [login, setlogin] = useState(true);

  const getdata=async()=>
  {
    const response=await fetch('api/Login')
    const {data}=await response.json()
    const id=window.localStorage.getItem('id' )
    setId(id)
    if(id)
    {
       const t=data?.find( ({ _id}) => _id === id )
      if(t._id===id)
      {
         setText(t.username)
         setlogin(t)
       }
     }
     else{
      router.replace("Login")
    }
  }

  function handleclick()
  {
    window.localStorage.removeItem('id');
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  function check(){

    if(idtest)
    {
      return(
<li className={`dropdown user user-menu ${isOpen ? 'open' : ''}`}>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={toggleDropdown}>
                  <img src={login.image} className="user-image" alt="User Image"/>
                  <span className="hidden-xs">{text}</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="user-header">
                    <img src={login.image} className="img-circle" alt="User Image" />
                    <p>
                    {text}
                    </p>
                  </li>
                  <li className="user-footer">
                    <div className="pull-left" onClick={() => setActiveComponent('Profile')}>
                      <a href="#" className="btn btn-default btn-flat">Profile</a>
                    </div>
                    <div className="pull-right">
                      <a href="" className="btn btn-default btn-flat" onClick={handleclick}>Sign out</a>
                    </div>
                  </li>
                </ul>
              </li>       )
    }
  }
  function admin(){

    if(idtest=="65c36292df5a60f5e4731b8c")
    {
      return(
        <li onClick={() => setActiveComponent('Users')}>
        <a href="#" >
        <FontAwesomeIcon icon={faUser}/> <span>Kullancıalr</span>
        </a>
      </li>
      )
    }
  }
  
  useEffect(()=>
  {    
    const id=window.localStorage.getItem('id' )
    if(!id)
    {
      router.replace("Login")
    }else {
      setLoading(false);
    }

    
    getdata()
  }, []);
  
   function test(e) {
    e.preventDefault();
  
  const $this = e.currentTarget;
  const checkElement = $this.nextElementSibling;

  if (checkElement.classList.contains('treeview-menu') && checkElement.classList.contains('show')) {
    checkElement.classList.remove('show');
    $this.parentElement.classList.remove('active');
  } else if (checkElement.classList.contains('treeview-menu') && !checkElement.classList.contains('show')) {
    const parent = $this.closest('ul');
    const openMenus = parent.querySelectorAll('.treeview-menu.show');
    openMenus.forEach(menu => menu.classList.remove('show'));
    
    const parentLi = $this.parentElement;
    const parentUl = parentLi.closest('ul');
    const activeLi = parentUl.querySelector('.active');
    if (activeLi) activeLi.classList.remove('active');
    
    checkElement.classList.add('show');
    parentLi.classList.add('active');
  }
  };

  function testt(e) {
    e.preventDefault();

  const $this = e.currentTarget.parentElement;
  const activeLi = $this.classList.contains('active');

  if (activeLi) {
    $this.classList.remove('active');
  } else {
    $this.classList.add('active');
  }
  };
  if (loading) {
    return null; // or loading indicator if desired
  }
  
    return(
        <>
        <header className="main-header">

<a href="" className="logo"><b>Admin</b>LTE</a>
<nav className="navbar navbar-static-top" role="navigation">
  <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
    <span className="sr-only">Toggle navigation</span>
  </a>
  <div className="navbar-custom-menu">
    <ul className="nav navbar-nav">
      <li className="dropdown messages-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-envelope-o"></i>
          <span className="label label-success">4</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">You have 4 messages</li>
          <li>
            <ul className="menu">
              <li>
                <a href="#">
                  <div className="pull-left">
                    <img src="ser2-160x160.jpg" className="img-circle" alt="User Image"/>
                  </div>
                  <h4>
                    Support Team
                    <small><i className="fa fa-clock-o"></i> 5 mins</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="pull-left">
                    <img src="user3-128x128.jpg" className="img-circle" alt="user image"/>
                  </div>
                  <h4>
                    AdminLTE Design Team
                    <small><i className="fa fa-clock-o"></i> 2 hours</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="pull-left">
                    <img src="user4-128x128.jpg" className="img-circle" alt="user image"/>
                  </div>
                  <h4>
                    Developers
                    <small><i className="fa fa-clock-o"></i> Today</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="pull-left">
                    <img src="user3-128x128.jpg" className="img-circle" alt="user image"/>
                  </div>
                  <h4>
                    Sales Department
                    <small><i className="fa fa-clock-o"></i> Yesterday</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="pull-left">
                    <img src="user4-128x128.jpg" className="img-circle" alt="user image"/>
                  </div>
                  <h4>
                    Reviewers
                    <small><i className="fa fa-clock-o"></i> 2 days</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="footer"><a href="#">See All Messages</a></li>
        </ul>
      </li>
      <li className="dropdown notifications-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-bell-o"></i>
          <span className="label label-warning">10</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">You have 10 notifications</li>
          <li>
            <ul className="menu">
              <li>
                <a href="#">
                  <i className="fa fa-users text-aqua"></i> 5 new members joined today
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-warning text-yellow"></i> Very long description here that may not fit into the page and may cause design problems
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-users text-red"></i> 5 new members joined
                </a>
              </li>

              <li>
                <a href="#">
                  <i className="fa fa-shopping-cart text-green"></i> 25 sales made
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-user text-red"></i> You changed your username
                </a>
              </li>
            </ul>
          </li>
          <li className="footer"><a href="#">View all</a></li>
        </ul>
      </li>
      <li className="dropdown tasks-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-flag-o"></i>
          <span className="label label-danger">9</span>
        </a>
        <ul className="dropdown-menu">
          <li className="header">You have 9 tasks</li>
          <li>
            <ul className="menu">
              <li>
                <a href="#">
                  <h3>
                    Design some buttons
                    <small className="pull-right">20%</small>
                  </h3>
                  <div className="progress xs">
                    <div className="progress-bar progress-bar-aqua" style={{width: '20%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                      <span className="sr-only">20% Complete</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <h3>
                    Create a nice theme
                    <small className="pull-right">40%</small>
                  </h3>
                  <div className="progress xs">
                    <div className="progress-bar progress-bar-green" style={{width: '40%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                      <span className="sr-only">40% Complete</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <h3>
                    Some task I need to do
                    <small className="pull-right">60%</small>
                  </h3>
                  <div className="progress xs">
                    <div className="progress-bar progress-bar-red" style={{width: '60%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                      <span className="sr-only">60% Complete</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <h3>
                    Make beautiful transitions
                    <small className="pull-right">80%</small>
                  </h3>
                  <div className="progress xs">
                    <div className="progress-bar progress-bar-yellow" style={{width: '80%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                      <span className="sr-only">80% Complete</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
          <li className="footer">
            <a href="#">View all tasks</a>
          </li>
        </ul>
      </li>
      {check()
      }
    </ul>
  </div>
</nav>
</header>
<aside className="main-sidebar">
<section className="sidebar">
  <div className="user-panel">
    <div className="pull-left image">
      <img src={login.image} className="img-circle" alt="User Image" />
    </div>
    <div className="pull-left info">
      <p>{text}</p>
      <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
    </div>
  </div>
  <ul className="sidebar-menu">
    <li className="header">MAIN NAVIGATION</li>
    <li className="active treeview">
      <a href="">
        <i className="fa fa-dashboard"></i> <span>Ana Sayfa</span>
      </a>
    </li>
    <li className="treeview">
      <a href="#" onClick={test}>
      <FontAwesomeIcon icon={faChartLine}/>
        <span>  Nakit işlemleri</span>
        <i className="fa fa-angle-left pull-right"></i>
      </a>
      <ul className="treeview-menu">
        <li  onClick={() => setActiveComponent('Expense')}><a href="#"><i className="fa fa-circle-o"></i> Gider</a></li>
        <li  onClick={() => setActiveComponent('Income')}><a href="#"><i className="fa fa-circle-o"></i> Gelir</a></li>
        <li  onClick={() => setActiveComponent('Extreler')}><a href="#"><i className="fa fa-circle-o"></i> Extreler</a></li>
      </ul>
    </li>
    <li className="treeview">
      <a href="#" onClick={test}>
      <FontAwesomeIcon icon={faListCheck}/>
        <span>  Poliçe İşlemleri</span>
        <i className="fa fa-angle-left pull-right"></i>
      </a>
      <ul className="treeview-menu">
        <li><a href="http://oms.openacentem.com/"><i className="fa fa-circle-o"></i> Poliçe Atama</a></li>
        <li onClick={() => setActiveComponent('Policy')}><a href="#"><i className="fa fa-circle-o"></i> Poliçe Ekle</a></li>
      </ul>
    </li>

    <li>
      <a href="#" onClick={testt}>
      <FontAwesomeIcon icon={faMessage}/> <span>Sohbet</span>
      <small className="label pull-right bg-yellow">12</small>

      </a>
    </li>
    <li onClick={() => setActiveComponent('Offers')}>
      <a href="#"  onClick={testt}>
      <FontAwesomeIcon icon={faHandHoldingDollar}/>  <span>Teklifler</span>
      </a>
    </li>
    <li onClick={() => setActiveComponent('Papers')}>
      <a href="#" onClick={testt}>
      <FontAwesomeIcon icon={faScroll}/> <span>Evrakları</span>
      </a>
    </li>
    <li className="treeview">
      <a href="#" onClick={test}>
      <FontAwesomeIcon icon={faCog}/>
        <span>  Ayarlar</span>
        <i className="fa fa-angle-left pull-right"></i>
      </a>
      <ul className="treeview-menu">
        {admin()}
        <li onClick={() => setActiveComponent('Defintions')}><a href="#"><i className="fa fa-circle-o"></i> Tanımlamalar</a></li>
        <li onClick={() => setActiveComponent('Templates')}><a href="#"><i className="fa fa-circle-o"></i> Şablonları</a></li>

      </ul>
    </li>
  </ul>
</section>

</aside>
        </>
    )
}