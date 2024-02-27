import { useNavigate } from "react-router-dom";

function Logout() {
    // Clear the JWT token from localStorage
    localStorage.removeItem("jwtToken");

    // Use the navigate hook to redirect to the signin page
    const navigate = useNavigate();
    navigate("/signin"); // navigate to signin page
}

export default Logout;
