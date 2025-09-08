"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {

const [message, setMessage] = useState("");
const [response, setResponse] = useState("");
const [streaming, setStreaming] = useState("");
const [loading, setLoading] = useState("");
const [streamResponse, setStreamResponse] = useState("");

const handleChat = async () => {
  setLoading(true)
  setResponse("")

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({message})
    })

    const data = await res.json()
    setResponse(data.response)

  } catch (error) {
    setResponse("Error: " + error.message)
  }

  setResponse(false)

};

const handleStreamChat = async () => {
  setStreaming(true)
  setStreamResponse("")

  try {
    const res = await fetch("/api/chat-stream", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message})
    })

    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    while(true){
    const {done, value} = await reader.read()
      if(done){
        break;
      }
      const chunk = decoder.decode(value)
      const lines = chunk.split("\n")

      for(const line of lines){
        if(line.startsWith("data: ")){
          const data = JSON.parse(line.slice(6))
          setStreamResponse((prev) => prev + data.content)
        }
      }

    }
  } catch (error) {
    setStreamResponse("Error: " + error.message);
  }
  setLoading(false)
}

  return (
    <div className={styles.page}>
      <h1>NextJS With GEMINI </h1>
      <div>

         <div
      style={{
         width: "900px",
         height: "200px",
         overflowY: "auto",
         padding: "10px",
         marginBottom: "20px",
         border: "1px solid #ccc",
        //  borderRadius: "8px",
         backgroundColor: "#f9f9f9",
         whiteSpace: "pre-wrap",
         fontSize: "14px",
         
      }}
      >
      {streamResponse}
      {response}


      </div>

       {/* <div
      style={{
         width: "900px",
         height: "200px",
         overflowY: "auto",
         padding: "10px",
         margin: "20px 0",
         border: "1px solid #ccc",
         borderRadius: "8px",
         backgroundColor: "#f9f9f9",
         whiteSpace: "pre-wrap",
         fontSize: "14px",
      }}
      >
      {streamResponse}
      </div> */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          rows={4}
          style={{
          color: "#020100ff",
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
            // e.target.style.backgroundColor = "#665842ff";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            // e.target.style.backgroundColor = "#665842ff";
            e.target.style.transform = "scale(1)";
          }}        
>
          {loading ? "Loading..." : "Chat"}
        </button>


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
            margin: "20px",
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
          {loading ? "Loading..." : "Stream Chat"}
        </button>


      </div>
     


    </div>
  );
}
