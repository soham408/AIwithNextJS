"use client"

import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [loadingStream, setLoadingStream] = useState(false);
  const [streamResponse, setStreamResponse] = useState("");

  const clearTextArea = () => {
  setMessage("");
  setResponse("");
  setStreamResponse("");
};


  const handleChat = async () => {
    setLoadingChat(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      setResponse(data.response);

    } catch (error) {
      setResponse("Error: " + error.message);
    }

    setLoadingChat(false);
  };

  const handleStreamChat = async () => {
    setLoadingStream(true);
    setStreaming(true);
    setStreamResponse("");

    try {
      const res = await fetch("/api/chat-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6));
            setStreamResponse((prev) => prev + data.content);
          }
        }
      }

    } catch (error) {
      setStreamResponse("Error: " + error.message);
    }

    setStreaming(false);
    setLoadingStream(false);
  };

  return (
    <div className={styles.page}>

      <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "32px",
        fontWeight: "bold",
        color: "#ccc7c7ff",
        textAlign: "left",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        position: "absolute",
        top: "0",
        left: "0",
        margin: "20px"
      }}
      >
        <h1>Gemini</h1>
        <div
        style={{
        fontSize: "15px",
        padding: "6px 24px",
            backgroundColor: "#FE7743",
            color: "#070202ff",
            border: "none",
            borderRadius: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            margin: "15px",
      }}
        >2.5-flash</div>
      </div>

      <div
      style={{
        fontSize: "32px",
        fontWeight: "bold",
        color: "#9c8b8bff",
        textAlign: "center",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
      }}
      >
        NextJS With GEMINI
      </div>
      <div>
        <div
          style={{
            width: "900px",
            height: "200px",
            overflowY: "auto",
            padding: "12px 16px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#0f0606",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            color: "#f7ebebff",
            lineHeight: "2.5",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            transition: "box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out",
          }}

          onFocus={(e) => e.target.style.borderColor = "#007BFF"}
          onBlur={(e) => e.target.style.borderColor = "#ccc"}
        >
          {streamResponse}
          {response}
       
        </div>

        <textarea
          id="textArea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your prompt"
          rows={4}
          style={{
            color: "#eee6deff",
            width: "900px",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
            resize: "vertical",
            transition: "border-color 0.3s, box-shadow 0.3s",
            outline: "none"
          }}
          onFocus={(e) => e.target.style.borderColor = "#007BFF"}
          onBlur={(e) => e.target.style.borderColor = "#ccc"}
        />
      </div>

      <div>
        <button
          onClick={handleChat}
          style={{
            padding: "12px 24px",
            backgroundColor: "#FE7743",
            color: "#070202ff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            margin: "15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          {loadingChat ? "Loading..." : "Chat"}
        </button>

        <button
          onClick={handleStreamChat}
          style={{
            padding: "12px 24px",
            backgroundColor: "#FE7743",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          {loadingStream ? "Loading..." : "Stream Chat"}
        </button>

          <button
          style={{
            padding: "12px 24px",
            backgroundColor: "#FE7743",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            margin: "15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, transform 0.2s",
          }}

          onClick={clearTextArea}
          onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
           
          }}

           
          > Clear
         
        </button>

      </div>
    </div>
  );
}
