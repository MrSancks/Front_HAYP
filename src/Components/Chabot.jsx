import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MDEditor from "@uiw/react-md-editor";
import InputChat from "./InputChat.jsx";
import Header from "./Header.jsx";

const API_KEY = 'AIzaSyBEyV1Ii93NL-3nod3yG4ax8_9gifgrZgs';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const HeaderBot = () => {
    return (
        <div className="header flex flex-col h-16  justify-center items-center">
            <div className="flex justify-center items-center">
                <b>HAYP BOT</b>
            </div>
            <p className="text-gray-400 ml-4 mt-2">Pregúntenos acerca de todo lo relacionado con computadoras</p>
        </div>
    );
};

const ChatBot = () => {
    const chatContainerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    const sendMessage = async (inputText) => {
        if (!inputText) {
            return;
        }
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputText, sender: "user", timestamp: new Date() },
        ]);

        setLoading(true);

        try {
            const result = await model.generateContent(inputText);
            const text = result.response.text();
            const isCode = text.includes("```");
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text,
                    sender: "ai",
                    timestamp: new Date(),
                    isCode,
                },
            ]);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("generateContent error: ", error);
        }
    };

    const convertMarkdownToReact = (text) => {
        const boldRegex = /\*\*(.+?)\*\*/g;
        text = text.replace(boldRegex, "<b>$1</b>");
        text = text.replace(/\\n/g, "<br />");
        const linkRegex = /\[([^\]]+)]\(([^)]+)\)/g;
        text = text.replace(linkRegex, "<a href='$2'>$1</a>");
        const imageRegex = /!\[([^\]]+)]\(([^)]+)\)/g;
        text = text.replace(imageRegex, "<img src='$2' alt='$1' />");

        return <div dangerouslySetInnerHTML={{ __html: text }} />;
    };


    return (
        <div className="flex flex-col h-screen items-center">
            <Header />
            <div className="flex-grow overflow-auto p-4">
                <HeaderBot/>
                <div className="flex flex-col space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-start justify-${message.sender === "user" ? "start" : "end"} mb-4`}
                        >
                            <div className="flex flex-col items-start">
                                {message.sender === "user" && (
                                    <div className="user-avatar mr-4">
                                        {/* Aquí va tu componente de avatar de usuario */}
                                    </div>
                                )}
                                <div
                                    className={`message-bubble px-4 py-2 rounded-lg shadow-sm ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {message.isCode ? (
                                        <MDEditor.Markdown source={message.text} style={{ whiteSpace: "pre-wrap" }} />
                                    ) : (
                                        <p className="message-text">{convertMarkdownToReact(message.text)}</p>
                                    )}
                                    <span className="time text-xs mt-1 text-gray-600">
                                        {message.timestamp ? dayjs(message.timestamp).format("DD.MM.YYYY HH:mm:ss") : ""}
                                    </span>
                                </div>
                            </div>
                            {message.sender === "ai" && (
                                <div className="ai-avatar ml-4">
                                    {/* Aquí va tu componente de avatar de AI */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div ref={chatContainerRef}></div>
            </div>
            <InputChat sendMessage={sendMessage} loading={loading} />
        </div>
    );
};

export default ChatBot;
