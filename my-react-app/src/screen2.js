import React, { Fragment,useState ,useEffect} from "react";
import "./login.css";
// import { Link } from "react-router-dom";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
// import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import {connect} from 'react-redux';
import { createUser, deleteUser, getAllUsers } from "./Actions/userActions";
import { DELETE_USER_RESET } from "./Constants/userConstant"
import {useHistory} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useAlert } from "react-alert";

const UserDetails = ({deleteUser}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // const { error, loading} = useSelector(
  //   (state) => state.user
  // );

  const {error,users} = useSelector(state => state.allusers);
  
  const {error:deleteError,isDeleted,message} = useSelector((state) => state.deleteUser);
  const history = useHistory();
  


  useEffect(() => {
    if (error)
      alert.error(error);
    
    if (deleteError)
      alert.error(deleteError)

    if (isDeleted) {
      alert.success(message);
      history.push("/details");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());

  }, [dispatch,isDeleted,history,error,users])


  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address:""
  });

  const { name, email,mobile,address} = user;

  const registerSubmit = (e) => {
    dispatch(createUser({ name, email, mobile, address }));
  };

  const registerDataChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    
  };


  
   
  return (
    <Fragment>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"/>
      <Tabs defaultActiveKey="first">
        <Tab eventKey="first" title="Create User">
          <form
                className="signUpForm"
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  {/* <FaceIcon /> */}
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    required pattern="[a-zA-Z0-9]+"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  {/* <LockOpenIcon /> */}
                  <input
                    type="tel"
                    placeholder="Mobile number"
                    required
                    name="mobile"
                    value={mobile}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="signUpAddress">
                  <input
                type="address"
                placeholder="Address"
                    required name="address"
                    value={address}
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Create User" className="signUpBtn"/>
            </form>
        </Tab>

        <Tab eventKey="second" title="All Users">
                   <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-4">
                    <div className="table-responsive">
                        <table class="table">
                         <thead>
                        <tr>
                        <th scope="col" class="border-0 bg-light">
                            <div class="p-2 px-3 text-uppercase">UserName</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                            <div class="py-2 text-uppercase">Email</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                            <div class="py-2 text-uppercase">Mobile</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                            <div class="py-2 text-uppercase">Address</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                            <div class="py-2 text-uppercase">Delete</div>
                        </th>
                        </tr>
                    </thead>
                    {
                        users.map((singleUser) => {
                        return <>
                        <tbody>
                                <tr>
                                  <th scope="row" className="border-0">
                                    <div class="ml-3 d-inline-block align-middle">
                                       <h5 class="mb-0">{singleUser.name}</h5>
                                   </div>
                                  </th>
                                    <td class="border-0 align-middle">
                                    <h4>{ singleUser.email}</h4></td>
                                    <td class="border-0 align-middle" >
                                              <h4>{singleUser.mobile}</h4>
                                    </td>
                                    <td class="border-0 align-middle">
                                                <h4>Rs.{singleUser.address}</h4>
                                    </td>
                                    <td class="border-0 align-middle" >
                                        <a href="#"  className="iconn"><i className="fa fa-trash" onClick={() => deleteUser(singleUser._id)}></i></a>
                                    </td>
                                       
                          </tr>
                          </tbody>
                                </>
                            })
                        }
                        </table>
                        </div> 
                        </div>
          
        </Tab>

      </Tabs>
    </Fragment>
  );

 
};


const mapDispatchToProps=dispatch=>{
    return{
        deleteUser:(id)=>dispatch(deleteUser(id)),
    }
}

export default connect(null,mapDispatchToProps)(UserDetails);

