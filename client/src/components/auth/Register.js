import React, { useState } from "react"
import { Link, useHistory, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ register, isLogged }) => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
      });
      let history = useHistory();
      const { username, email, password } = form;
      
      const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
      }
      
      const handleSubmit = async e => {
        e.preventDefault();
        await register({
          username, email, password
        })
        // history.push('/login');
      }

      if (isLogged)
        return <Redirect to='/login' />
    
      return (
        <div className="register">
          <div className="register--img">
            <Link to='/login' className="register--img-singup">SIGN IN</Link>
            <p className="register--img-tag">Sign in and beniefts from the best experince
            ever that you will have :)</p>
          </div>
          <div className="register--form">
            {/* <div className="register--form-btnswitch">
              <a className="register--form--signin">sign in</a>
              <a className="register--form--signup">sign up</a>
            </div> */}
            <div className="register--form-form">
              <form className="register--form-formsignup" onSubmit={e => handleSubmit(e)}>
                <label className="label--username" htmlFor="username">Username</label>
                <input className="register--input" type="text" name="username" id="username" onChange={handleChange} required/>
    
                <label className="label--email" htmlFor="email">Email</label>
                <input className="register--input" type="email" name="email" id="email" onChange={handleChange} required/>
    
                <label className="label--password" htmlFor="password">Password</label>
                <input className="register--input" type="password" name="password" id="password" onChange={handleChange} required/>
                <div>
                  <button type="submit" className="signup-btn">Sign up</button>
                  <Link to='/login' className="account-btn">Already have an account</Link>
                </div>
              </form>
            </div>
          </div> 
        </div>
      );
}

Register.propTypes = {
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged
})

export default connect(
  mapStateToProps,
  { register }
)(Register);