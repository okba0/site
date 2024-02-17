import Nav from "../Components/Nav";
import Offers from "./Offers";
import Papers from "./Papers";
import Policy from "./Policy";
import Main from "./Main";
import ExpensePage from "./Expense";
import Profile from "./Profile";
import IncomePage from "./Income";
import { useState } from "react";
import Defintions from "./Defintions";
import Users from "./Users";
import Extracts from "./Extracts";
import Templates from "./Templates";


export default function Home() {
  const [activeComponent, setActiveComponent] = useState('Main');

  return (
    <>

    <div className="skin-blue">
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
      <link href="http://code.ionicframework.com/ionicons/2.0.0/css/ionicons.min.css" rel="stylesheet" type="text/css" />
      
      <Nav  setActiveComponent={setActiveComponent} />
      </div>
      <div className="wrapper"> 
      
      {activeComponent === 'Main' && <Main />}
      {activeComponent === 'Expense' && <ExpensePage/> }
      {activeComponent === 'Policy' && <Policy/> }
      {activeComponent === 'Papers' && <Papers/> }
      {activeComponent === 'Offers' && <Offers/> }
      {activeComponent === 'Profile' && <Profile/> }
      {activeComponent === 'Income' && <IncomePage/> }
      {activeComponent === 'Defintions' && <Defintions/> }
      {activeComponent === 'Users' && <Users/> }
      {activeComponent === 'Extreler' && <Extracts/> }
      {activeComponent === 'Templates' && <Templates/> }
    </div>
    </>
  );
}
