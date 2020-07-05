import React, { useState, useContext } from "react";
import AuthServices from '../../Services/AuthServices';
import AuthContext from '../../Context/AuthContext';
import Message from '../../components/Message/index';
import signin_img from "../../assets/images/img1.png";
import { Link } from "react-router-dom";

function Signin(props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = e => {
    setUser({...user,[e.target.name] : e.target.value});
    console.log(user)
  }

  // OnSubmit, pulls authentication data from user
  const onSubmit = e =>{
    e.preventDefault();
    console.log(e)
    console.log(user)
    // Middleware takes action
    AuthServices.signin(user)
    .then(data=>{
        const { isAuthenticated, user, message } = data;
        if (isAuthenticated) {
          authContext.setUser(user);
          authContext.setIsAuthenicated(isAuthenticated);
          props.history.push('/search');
        }
        else {
          setMessage(message)
        }
      });
  };

  return (
    <div className="log">
      <header className="log-header">
        <a className="log-brand" href="/">CURBSIDE  </a>
      </header>

      <div className="container-fluid">
        <div className="row">
          <div className="col-6 img-holder">
          </div>
          <div className="col-6">
            <h2 className="log-title">SIGN IN</h2>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input type="email" name="email"
                        className="form-control"
                        value={user.email} 
                        onChange={onChange}
                        id="email" 
                        placeholder="Email..." />
              </div>
              <div className="form-group">
                <input type="password" name="password"
                        className="form-control"
                        value={user.password} 
                        onChange={onChange}
                        id="password"  
                        placeholder="Password..." />
              </div>
              <button type="submit" className="btn">LOG IN</button>
              <br></br>
              <Link id="signin-link" to="/signup">SIGN UP</Link>
            </form>
            {message ? <Message message={message} /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Signin;