import axios from "axios";
import { useNavigate} from "react-router-dom";
import"./ButtonLogout.css"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ButtonLogout = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        axios.get(`${API_BASE_URL}/api/logout`, {withCredentials: true})
        .then( res => navigate("/"))
        .catch(err => console.log (err));
    }

    return(
        <button className="btn-logout" onClick={cerrarSesion}>Cerrar Sesión</button>
    )
}

export default ButtonLogout;