import { Link } from "react-router-dom"
import React from "react";
import { connect } from 'react-redux';
import { logout } from "../../actions/auth";
import PropTypes from 'prop-types';

const Navbar = ({ logout, auth: { isLogged, loading, user } }) => {
    const clearToken = async () => {
        await logout();
    }
    return (
        // <div className="navbar">
        //     <Link className="navbar--btn" to="/">Home</Link>
        //     {!isLogged ? <Link className="navbar--btn" to="/register">register</Link> : null}
        //     {!isLogged ? <Link className="navbar--btn" to="/login">login</Link> : <Link className="navbar--btn" to='/profile'>profile</Link>}
        //     {isLogged ? <Link onClick={clearToken} className="navbar--btn" to='/login'>logout</Link> : null}
        // </div>
        <nav>
            <ul>
                {((isLogged && !loading && user) && (user.role === 'owner' || user.role === 'admin'))
                    ? <Link className="link--btn" to='/dashboard'>Dashboard</Link>
                    : null
                }
                <Link className="link--btn" to='/'>Home</Link>
                {isLogged ? <Link className="link--btn" to='/profile'>Profile</Link> : null}
            </ul>
            <ul>
                {!isLogged ? <Link className="link--btn" to='/login'>Login</Link>
                : <Link onClick={clearToken} className="navbar--btn" to='/login'>logout</Link>}
                {/* {!isLogged ? <Link className="link--btn" to='/register'>Sign up</Link> */}
                {/* : <Link onClick={clearToken} className="navbar--btn" to='/login'>logout</Link>} */}
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    // isLogged: state.auth.isLogged,
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logout }
)(Navbar);