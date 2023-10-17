import axios from 'axios';


const Logout = () => {
    axios.post('/logout/')
        .then(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/';
        })
        .catch((err) => {
            console.log(err);
        });
}


export default Logout;