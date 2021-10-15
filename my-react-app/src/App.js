import Login from "./login.js"
import Details from "./screen2.js"
import './App.css';
import {Route,Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
       <Route path='/' exact>
        <Login/> </Route>
        <Route path='/details' exact> 
        <Details/></Route>
    </Switch>
    </div>
  );
}

export default App;
