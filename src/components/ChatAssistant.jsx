import React, { useState } from "react";
import { getAIResponse } from "../utils/geminiAPI";

// --- Component Definition ---

export default function ChatAssistant() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { text: input.trim(), user: true, timestamp: new Date().toLocaleTimeString() };

        // 1. Add user message
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // 2. Fetch the AI response using Gemini API
            const aiText = await getAIResponse(userMessage.text);
            const aiMessage = { text: aiText, user: false, timestamp: new Date().toLocaleTimeString() };

            // 3. Add AI response
            setMessages(prevMessages => [...prevMessages, aiMessage]);
        } catch (error) {
            const errorMessage = { text: "Error: Could not fetch AI response. Try again.", user: false, timestamp: new Date().toLocaleTimeString(), error: true };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
            console.error("AI API Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Allows sending message by pressing 'Enter'
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            <h2 className="chat-header">💬 AI Farm Assistant</h2>

            <div className="messages-container">
                {messages.length === 0 && (
                    <div className="welcome-message">
                        Welcome! Ask me anything about agriculture, soil, or fertilization.
                    </div>
                )}
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`message-bubble ${m.user ? 'user-bubble' : 'ai-bubble'} ${isLoading && i === messages.length - 1 && !m.user ? 'loading-bubble' : ''}`}
                    >
                        <div className="message-text">{m.text}</div>
                        <div className="message-timestamp">{m.timestamp}</div>
                    </div>
                ))}

                {isLoading && (
                    <div className="message-bubble ai-bubble loading-bubble">
                        <div className="message-text">AI is typing...</div>
                    </div>
                )}
            </div>

            <div className="input-area">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about crops, soil, or fertilizers..."
                    className="chat-input"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    className="send-button"
                    disabled={isLoading || !input.trim()}
                >
                    {isLoading ? "Wait" : "Send"}
                </button>
            </div>
        </div>
    );
}


