
import React, { Fragment, useState, useEffect } from "react";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./Actions/userActions";
import { useHistory } from 'react-router-dom'
import { useAlert } from "react-alert";


    
const Login = () => {


  
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const {error,isAuthenticated} = useSelector(
    (state) => state.user
    );
    
  const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    


  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    
    if (isAuthenticated) {
      console.log("hey u are authenticated");
      history.push("/details");
    }
  }, [isAuthenticated,error,alert]);
    
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

 return (
            <Fragment>
                <form className="loginForm"  onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        {/* <MailOutlineIcon /> */}
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className="loginPassword">
                        {/* <LockOpenIcon /> */}
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>
                    {/* <Link to="/password/forgot">Forget Password ?</Link> */}
                    <input type="submit" value="Login" className="loginBtn" />
                </form>
            </Fragment>
        );
        
}
    
export default Login;
    
 