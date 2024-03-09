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
        <div className="input-box">
            {loading && <progress style={{ width: "100%" }} />}
            <input
                disabled={loading}
                type="text"
                className="form-control"
                placeholder="Escribe tu mensaje..."
                value={loading ? "Cargando..." : input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default InputChat;