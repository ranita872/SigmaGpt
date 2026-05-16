import "./Auth.css";
import { useState, useContext } from "react";
import axios from "axios";
import { MyContext } from "./MyContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const { setUser } = useContext(MyContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const res = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            setUser(res.data.user);

            // redirect to home
            navigate("/");

        } catch(err){

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Login failed"
            );
        }
    }

    return (
        <div className="authPage">

            <div className="authBox">

                <h1>Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>
                    Login
                </button>

                <p>
                    Don't have an account?
                    <Link to="/register"> Signup</Link>
                </p>

            </div>

        </div>
    )
}

export default Login;