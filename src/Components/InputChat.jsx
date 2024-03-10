import { useState } from "react";

const InputChat = ({ sendMessage, loading }) => {
    const [input, setInput] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
            sendMessage(input);
            setInput("");
        }
    };

    return (
        <div className="input-box flex items-center justify-between">
            {loading && <progress className="w-full" />}
            <input
                disabled={loading}
                type="text"
                className="w-[64rem] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe tu mensaje..."
                value={loading ? "Cargando..." : input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default InputChat;