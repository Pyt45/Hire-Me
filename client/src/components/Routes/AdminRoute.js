import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, auth: { isLogged, loading, user }, ...rest }) => (
    <Route {...rest} render={props => !isLogged && loading
        ? (<Redirect to='/login' />) :
        ((isLogged && !loading) && (user.role === 'owner' || user.role === 'admin'))
        ? (<Component {...props} />) : (<Redirect to='/' />)}
    />
)


const mapStateToProps = state => ({
    auth: state.auth
})

AdminRoute.propTypes= {
    auth: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps
)(AdminRoute);