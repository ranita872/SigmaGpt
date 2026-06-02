import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import {
    useContext,
    useState,
    useEffect,
    useRef
} from "react";

import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function ChatWindow() {

    const {
        prompt,
        setPrompt,
        reply,
        setReply,
        currThreadId,
        setPrevChats,
        setNewChat,
        setUser,
        theme,
        setTheme
    } = useContext(MyContext);

    const [loading, setLoading] = useState(false);

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

    // GET AI REPLY
    const getReply = async () => {

          const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    if (!prompt.trim()) return;

        setLoading(true);

        setNewChat(false);

        console.log(
            "message ",
            prompt,
            " threadId ",
            currThreadId
        );

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {

            const response = await fetch(
                "https://sigmagpt-backend-hn7q.onrender.com/api/chat",
                options
            );

            const res = await response.json();

            console.log(res);

            setReply(res.reply);

        } catch (err) {

            console.log(err);

        }

        setLoading(false);
    };

    // APPEND CHAT
    useEffect(() => {

        if (prompt && reply) {

            setPrevChats(prevChats => (
                [
                    ...prevChats,
                    {
                        role: "user",
                        content: prompt
                    },
                    {
                        role: "assistant",
                        content: reply
                    }
                ]
            ));
        }

        setPrompt("");

    }, [reply]);

    // OPEN / CLOSE DROPDOWN
    const handleProfileClick = () => {

        setIsOpen(prev => !prev);
    };

    // CLOSE DROPDOWN ON OUTSIDE CLICK
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

    // LOGOUT
    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

        navigate("/Home");
    };

    return (

        <div className="chatWindow">

            {/* NAVBAR */}
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

            {/* DROPDOWN */}
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

                    <div className="dropDownItem">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        Upgrade plan
                    </div>

                    <div
                        className="dropDownItem"
                        onClick={handleLogout}
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        Log out
                    </div>

                </div>
            }

            {/* CHAT */}
            <Chat />

            {/* LOADER */}
            <ScaleLoader
                color="#fff"
                loading={loading}
            />

            {/* INPUT */}
            <div className="chatInput">

    <div className="inputBox">

        <input
            placeholder="Ask anything"
            
            value={prompt}
            onChange={(e) =>
                setPrompt(e.target.value)
            }
            onKeyDown={(e) =>
                e.key === "Enter"
                    ? getReply()
                    : ""
            }
        />

        <div className="inputActions">

            <div className="micIcon">
                <i className="fa-solid fa-microphone"></i>
            </div>

            <div
                id="submit"
                onClick={getReply}
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
    );
}

export default ChatWindow;
