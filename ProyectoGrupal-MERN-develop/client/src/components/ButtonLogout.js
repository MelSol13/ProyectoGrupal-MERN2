import axios from "axios";
import { useNavigate} from "react-router-dom";
import"./ButtonLogout.css"

const ButtonLogout = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials: true})
        .then( res => navigate("/"))
        .catch(err => console.log (err));
    }

    return(
        <button className="btn-logout" onClick={cerrarSesion}>Cerrar Sesión</button>
    )
}

export default ButtonLogout;