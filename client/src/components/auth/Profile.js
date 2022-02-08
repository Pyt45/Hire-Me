import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { connect } from 'react-redux';
import { getLoggedProfile } from "../../actions/auth";
import PropTypes from 'prop-types';
import { io } from "socket.io-client";

const Profile = ({ auth }) => {
    // const variants = {
    //     visible: { opacity: 1 },
    //     hidden: { opacity: 0 },
    // }
    // useEffect(() => {
    //     const socket = new io('http://localhost:4000');
    //     socket.emit('connection', socket);
    // }, []);
    return (
        // <motion.div
        //     animate={{ x: [0, 100, 0], rotate: 360 }}
        //     transition={{ duration: 2, ease: 'easeInOut' }}
        //     style={{
        //         width: '200px',
        //         height: '200px',
        //         backgroundColor: '#fff',
        //         margin: '50px auto',
        //         borderRadius: '5px'
        //     }}
        // >
        //     <motion.div>
        //         {'username'}
        //     </motion.div>
        //     <motion.div>
        //         {'email'}
        //     </motion.div>
        //     <motion.div>
        //         {'avatar'}
        //     </motion.div>
        // </motion.div>
        <h1>PROFILE</h1>
    )
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(Profile);