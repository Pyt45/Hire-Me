import { useEffect, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from "../../actions/auth";
import { io } from "socket.io-client";


const Login = ({ login, isLogged }) => {
  // const [socket, setSocket] = useState(null);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const { email, password } = form;
    let history = useHistory();
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email, password });
        // socket.emit('connection', socket);
        // history.push('/')
    }
  
    // useEffect(() => {
    //   const newSocket = io('http://localhost:4000');
    //   newSocket.emit('connection');
    //   // setSocket(newSocket);
    //   return () => newSocket.close();
    // }, [isLogged])
  
    if (isLogged)
      return <Redirect to='/profile' />

    return (
        <div className="register">
          <div className="register--img">
            <Link to='/register' className="register--img-singup">SIGN UP</Link>
            <p className="register--img-tag">Sign UP and beniefts from the best experince
            ever that you will have :)</p>
          </div>
          <div className="register--form">
            {/* <div className="register--form-btnswitch">
              <a className="register--form--signup">sign up</a>
              <a className="register--form--signin">sign in</a>
            </div> */}
            <div className="register--form-form">
              <form className="register--form-formsignup" onSubmit={e => handleSubmit(e)}>
                {/* <label className="label--username" htmlFor="username">Username</label>
                <input className="register--input" type="text" name="username" id="username" onChange={handleChange} required/> */}
    
                <label className="label--email-login" htmlFor="email">Email</label>
                <input className="register--input" type="email" name="email" id="email" onChange={handleChange} required/>
    
                <label className="label--password-login" htmlFor="password">Password</label>
                <input className="register--input" type="password" name="password" id="password" onChange={handleChange} required/>
                <div>
                  <button type="submit" className="signup-btn">Sign in</button>
                  <Link to='/register' className="account-btn">don't have an account</Link>
                </div>
              </form>
            </div>
          </div> 
        </div>
    )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLogged: PropTypes.bool
}

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged
});

export default connect(
  mapStateToProps,
  { login}
)(Login);