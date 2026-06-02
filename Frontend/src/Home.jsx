import "./ChatWindow.css";
import "./Sidebar.css";
import blacklogo from "./assets/blacklogo.png";
import "./App.css";
import "./Home.css";
import { useContext, useState, useRef, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { useNavigate } from "react-router-dom";

function Home() {

    const { theme, setTheme } = useContext(MyContext);

    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef();

    const navigate = useNavigate();

    const toggleTheme = () => {

        setTheme(
            theme === "dark"
                ? "light"
                : "dark"
        );
    };

    const handleProfileClick = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    return (

        <div className="app">

            {/* SIDEBAR */}

            <section className="sidebar">

                <button>
                    <img
                        src={blacklogo}
                        alt="logo"
                        className="logo"
                    />
                    <span>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </span>
                </button>

                <div className="sign">
                    <p>By Ranita ♥</p>
                </div>

            </section>

            {/* MAIN */}

            <div className="chatWindow">

                <div className="navbar">

                    <span>
                        SigmaGPT
                        <i className="fa-solid fa-chevron-down"></i>
                    </span>

                    <div
                        className="userIconDiv"
                        onClick={handleProfileClick}
                    >
                        <span className="userIcon">
                            <i className="fa-solid fa-user"></i>
                        </span>
                    </div>

                </div>

                {
                    isOpen &&

                    <div
                        className="dropDown"
                        ref={dropdownRef}
                    >

                        <div
                            className="dropDownItem"
                            onClick={toggleTheme}
                        >
                            <i className="fa-solid fa-circle-half-stroke"></i>

                            {
                                theme === "dark"
                                    ? "Light Mode"
                                    : "Dark Mode"
                            }
                        </div>

                    </div>
                }

                <div className="homeCenter">
    <h1>Start a New Chat!</h1>
</div>

                <div className="chatInput">

                    <div className="inputBox">

                        <input
                            placeholder="Ask anything"
                            onClick={() => navigate("/login")}
                            readOnly
                        />

                        <div className="inputActions">

                            <div className="micIcon">
                                <i className="fa-solid fa-microphone"></i>
                            </div>

                            <div
                                id="submit"
                                onClick={() => navigate("/login")}
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                            </div>

                        </div>

                    </div>

                    <p className="info">
                        SigmaGPT can make mistakes.
                        Check important info.
                        See Cookie Preferences.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Home;