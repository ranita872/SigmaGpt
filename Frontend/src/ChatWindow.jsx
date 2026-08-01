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
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const dropdownRef = useRef();
    const navigate = useNavigate();
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const [isImageReply, setIsImageReply] =
    useState(false);
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

    if (!prompt.trim() && !image) return;

        setLoading(true);

        setNewChat(false);

        console.log(
            "message ",
            prompt,
            " threadId ",
            currThreadId
        );

        // const options = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         message: prompt,
        //         threadId: currThreadId
        //     })
        // };
        if (image) {

    const formData = new FormData();

    formData.append(
        "image",
        image
    );

    formData.append(
        "question",
        prompt || "Describe this image."
    );

    try {

        const response = await fetch(
            "http://localhost:8080/api/image-analyze",
            {
                method: "POST",
                body: formData
            }
        );
        //console.log(response);
        const data =
            await response.json();
        //console.log(data);
        setIsImageReply(true);
        setReply(data.reply);

        setImage(null);

    } catch (err) {

        console.log(err);
    }

    setLoading(false);

    return;
}
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
                "http://localhost:8080/api/chat",
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

    if (!reply) return;

    setPrevChats((prevChats) => [

        ...prevChats,

        {
            role: "user",
            content:
                prompt ||
                "📷 Uploaded an image",

            image: imagePreview
        },

        {
            role: "assistant",
            content: reply
        }
    ]);

    setPrompt("");
    setImage(null);

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
    const startVoiceChat = () => {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice recognition not supported");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognitionRef.current = recognition;

    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {

        const transcript =
            event.results[0][0].transcript;

        setPrompt(transcript);

        sendVoiceMessage(transcript);
    };

    recognition.onend = () => {
        setIsListening(false);
    };
};
const sendVoiceMessage = async (message) => {

    setLoading(true);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message,
            threadId: currThreadId
        })
    };

    try {

        const response = await fetch(
            "http://localhost:8080/api/chat",
            options
        );

        // const res = await response.json();

        // setReply(res.reply);
        const res = await response.json();

setIsImageReply(false);
setReply(res.reply);

    } catch(err) {

        console.log(err);

    }

    setLoading(false);
};
useEffect(() => {

    if (!reply || isImageReply) {
        return;
    }

    const speech =
        new SpeechSynthesisUtterance(reply);

    speech.lang = "en-US";

    speech.rate = 1;

    speech.onend = () => {
        startVoiceChat();
    };

    window.speechSynthesis.speak(speech);

}, [reply, isImageReply]);

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
        <div
    className="plusIcon"
    onClick={() =>
        document
            .getElementById("imageUpload")
            .click()
    }
>
    <i className="fa-solid fa-plus"></i>
</div>

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
            <input
            type="file"
            id="imageUpload"
            accept="image/*"
            hidden
            onChange={(e) => {

    const file = e.target.files[0];

    setImage(file);

    setImagePreview(
        URL.createObjectURL(file)
    );
}}
/>
{
    image && (
        <img
            src={URL.createObjectURL(image)}
            alt="preview"
            width="80"
        />
    )
}
{/* <div
    className="plusIcon"
    onClick={() =>
        document
            .getElementById("imageUpload")
            .click()
    }
>
    <i className="fa-solid fa-plus"></i>
</div> */}
            <div className="micIcon" onClick={startVoiceChat}>
                <i className={
        isListening
            ? "fa-solid fa-microphone-lines"
            : "fa-solid fa-microphone"
    }></i>
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
