import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth: { isLogged, loading }, ...rest }) => (
    <Route {...rest} render={props => !isLogged && loading
        ? (<Redirect to='/login' /> ): (<Component  {...props}/>)
    } />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(PrivateRoute);