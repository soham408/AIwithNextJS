// "use client"

// import styles from "./page.module.css";
// import { useState } from "react";

// export default function Home() {

//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");
//   const [streaming, setStreaming] = useState(false);
//   const [loadingChat, setLoadingChat] = useState(false);
//   const [loadingStream, setLoadingStream] = useState(false);
//   const [streamResponse, setStreamResponse] = useState("");

//   const clearTextArea = () => {
//   setMessage("");
//   setResponse("");
//   setStreamResponse("");
// };


//   const handleChat = async () => {
//     setLoadingChat(true);
//     setResponse("");

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ message })
//       });

//       const data = await res.json();
//       setResponse(data.response);

//     } catch (error) {
//       setResponse("Error: " + error.message);
//     }

//     setLoadingChat(false);
//   };

//   const handleStreamChat = async () => {
//     setLoadingStream(true);
//     setStreaming(true);
//     setStreamResponse("");

//     try {
//       const res = await fetch("/api/chat-stream", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message })
//       });

//       const reader = res.body.getReader();
//       const decoder = new TextDecoder();

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) {
//           break;
//         }
//         const chunk = decoder.decode(value);
//         const lines = chunk.split("\n");

//         for (const line of lines) {
//           if (line.startsWith("data: ")) {
//             const data = JSON.parse(line.slice(6));
//             setStreamResponse((prev) => prev + data.content);
//           }
//         }
//       }

//     } catch (error) {
//       setStreamResponse("Error: " + error.message);
//     }

//     setStreaming(false);
//     setLoadingStream(false);
//   };

//   return (
//     <div className={styles.page}>

//       <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         fontSize: "32px",
//         fontWeight: "bold",
//         color: "#ccc7c7ff",
//         textAlign: "left",
//         textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
//         position: "absolute",
//         top: "0",
//         left: "0",
//         margin: "20px"
//       }}
//       >
//         <h1>Gemini</h1>
//         <div
//         style={{
//         fontSize: "15px",
//         padding: "6px 24px",
//             backgroundColor: "#FE7743",
//             color: "#070202ff",
//             border: "none",
//             borderRadius: "18px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             margin: "15px",
//       }}
//         >2.5-flash</div>
//       </div>

//       <div
//       style={{
//         fontSize: "32px",
//         fontWeight: "bold",
//         color: "#9c8b8bff",
//         textAlign: "center",
//         textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
//       }}
//       >
//         NextJS With GEMINI
//       </div>
//       <div>
//         <div
//           style={{
//             width: "900px",
//             height: "200px",
//             overflowY: "auto",
//             padding: "12px 16px",
//             marginBottom: "20px",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             backgroundColor: "#0f0606",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//             whiteSpace: "pre-wrap",
//             fontSize: "14px",
//             color: "#f7ebebff",
//             lineHeight: "2.5",
//             fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//             transition: "box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out",
//           }}

//           onFocus={(e) => e.target.style.borderColor = "#007BFF"}
//           onBlur={(e) => e.target.style.borderColor = "#ccc"}
//         >
//           {streamResponse}
//           {response}
       
//         </div>

//         <textarea
//           id="textArea"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Enter your prompt"
//           rows={4}
//           style={{
//             color: "#eee6deff",
//             width: "900px",
//             padding: "12px 16px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//             boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//             fontSize: "16px",
//             resize: "vertical",
//             transition: "border-color 0.3s, box-shadow 0.3s",
//             outline: "none"
//           }}
//           onFocus={(e) => e.target.style.borderColor = "#007BFF"}
//           onBlur={(e) => e.target.style.borderColor = "#ccc"}
//         />
//       </div>

//       <div>
//         <button
//           onClick={handleChat}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: "#FE7743",
//             color: "#070202ff",
//             border: "none",
//             borderRadius: "8px",
//             fontSize: "16px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             margin: "15px",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//             transition: "background-color 0.3s, transform 0.2s",
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.transform = "scale(1.05)";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.transform = "scale(1)";
//           }}
//         >
//           {loadingChat ? "Loading..." : "Chat"}
//         </button>

//         <button
//           onClick={handleStreamChat}
//           style={{
//             padding: "12px 24px",
//             backgroundColor: "#FE7743",
//             color: "#000",
//             border: "none",
//             borderRadius: "8px",
//             fontSize: "16px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//             transition: "background-color 0.3s, transform 0.2s",
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.transform = "scale(1.05)";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.transform = "scale(1)";
//           }}
//         >
//           {loadingStream ? "Loading..." : "Stream Chat"}
//         </button>

//           <button
//           style={{
//             padding: "12px 24px",
//             backgroundColor: "#FE7743",
//             color: "#000",
//             border: "none",
//             borderRadius: "8px",
//             fontSize: "16px",
//             fontWeight: "bold",
//             cursor: "pointer",
//             margin: "15px",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//             transition: "background-color 0.3s, transform 0.2s",
//           }}

//           onClick={clearTextArea}
//           onMouseEnter={(e) => {
//           e.target.style.transform = "scale(1.05)";
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.transform = "scale(1)";
           
//           }}

           
//           > Clear
         
//         </button>

//       </div>
//     </div>
//   );
// }

"use client"

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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center relative">

      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 lg:top-6 lg:left-6 flex items-center">
        <h1 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold"
          style={{ 
            color: "#ccc7c7ff",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" 
          }}
        >
          Gemini
        </h1>
        <div 
          className="mx-auto px-5 sm:px-6 py-2 sm:py-2.5 
             rounded-full text-sm sm:text-base font-bold 
             bg-orange-500 text-black text-center 
             shadow-md cursor-pointer transition-all duration-300 
             hover:scale-105 active:scale-95 w-fit
             
             px-8 py-4 border-none rounded-2xl text-base sm:text-lg font-bold cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 min-w-[140px]
             
             "
          style={{
            backgroundColor: "#FE7743",
            color: "#070202ff"
          }}
        >
          2.5-flash
        </div>
      </div>

      <div className="mb-8 sm:mb-10 lg:mb-12 pt-6">
        <h2 
          className="text-xl sm:text-2xl lg:text-3xl font-bold text-center"
          style={{ 
            color: "#9c8b8bff",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" 
          }}
        >
          NextJS With GEMINI
        </h2>
      </div>

      <div className="w-full max-w-4xl space-y-6 sm:space-y-8">
        <div 
          className="w-full h-48 sm:h-52 lg:h-56 overflow-y-auto p-4 sm:p-5 lg:p-6 border rounded-2xl shadow-lg whitespace-pre-wrap text-sm sm:text-base leading-relaxed"
          style={{
            backgroundColor: "#0f0606",
            borderColor: "#ccc",
            color: "#f7ebebff",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }}
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
          className="w-full p-4 sm:p-5 lg:p-6 rounded-2xl border shadow-sm text-base sm:text-lg resize-vertical outline-none transition-all duration-300"
          style={{
            color: "#eee6deff",
            borderColor: "#ccc"
          }}
          onFocus={(e) => e.target.style.borderColor = "#007BFF"}
          onBlur={(e) => e.target.style.borderColor = "#ccc"}
        />

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <button
            onClick={handleChat}
            className="px-8 py-4 border-none rounded-2xl text-base sm:text-lg font-bold cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 min-w-[140px]"
            style={{
              backgroundColor: "#FE7743",
              color: "#070202ff"
            }}
          >
            {loadingChat ? "Loading..." : "Chat"}
          </button>

          <button
            onClick={handleStreamChat}
            className="px-8 py-4 border-none rounded-2xl text-base sm:text-lg font-bold cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 min-w-[140px]"
            style={{
              backgroundColor: "#FE7743",
              color: "#000"
            }}
          >
            {loadingStream ? "Loading..." : "Stream Chat"}
          </button>

          <button
            onClick={clearTextArea}
            className="px-8 py-4 border-none rounded-2xl text-base sm:text-lg font-bold cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 min-w-[140px]"
            style={{
              backgroundColor: "#FE7743",
              color: "#000"
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}