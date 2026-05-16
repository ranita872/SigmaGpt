import "./Auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {

        try {

            const res = await axios.post(
                "http://localhost:8080/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert(res.data.message);

            // redirect to login
            navigate("/login");

        } catch(err){

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Signup failed"
            );
        }
    };

    return (
        <div className="authPage">

            <div className="authBox">

                <h1>Signup</h1>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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

                <button onClick={handleSignup}>
                    Signup
                </button>

                <p>
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </p>

            </div>

        </div>
    );
}

export default Signup;