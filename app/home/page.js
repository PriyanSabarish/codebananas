"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSession, signOut } from "next-auth/react";
import CustomButton from "@/app/components/button";
import "./home.css";
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

function HomePage() {
  const { data: session, status } = useSession();
  const ws = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const editorRef = useRef(null); // Ref to access the Monaco Editor instance
  const [userMailID, setUserMailID] = useState("");
  const [changeUser, setChangeUser] = useState("");
  const isRemote = useRef(false);
  const currentuser = useRef("false");
  // Function to handle sign out
  const handleButtonClick = () => {
    signOut({ callbackUrl: "/" });
  };

  // Connect to WebSocket and broadcast changes
  useEffect(() => {
    if (status === "authenticated" && session?.user && !ws.current) {
      console.log("User is authenticated, connecting to WebSocket...");
      console.log("Session:", session); // Log session info when WebSocket is connected
      
      setUserMailID(session.user.email);
      currentuser.current=session.user.email;
      ws.current = new WebSocket("ws://localhost:8080");
      ws.current.onopen = () => {
        console.log("Connected to WebSocket server");
        ws.current.send(
          JSON.stringify({
            action: "login",
            userId: session.user.email,
          })
        );
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.action === "updateUsers") {
          setOnlineUsers(data.onlineUsers);
        }

        if (data.action === "codeUpdate") {
          const editor = editorRef.current;
          const range = new window.monaco.Range(
            data.range.startLineNumber,
            data.range.startColumn,
            data.range.endLineNumber,
            data.range.endColumn
          );
          const id = { major: 1, minor: 1 };
          const op = {
            identifier: id,
            range: range,
            text: data.text,
            forceMoveMarkers: false,
          };
          //console.log("broadcast user id:",data.userId);
          //console.log(" user id:",currentuser.current);
          if (data.userId !== currentuser.current) {
            isRemote.current = true;
            editor.executeEdits("remote-source", [op]);
            isRemote.current = false;
          }
          
        }
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.current.onclose = () => {
        console.log("WebSocket connection closed");
        ws.current = null;
      };

      return () => {
        if (ws.current) {
          ws.current.close();
        }
      };
    } else {
      console.log("User not authenticated or WebSocket already connected");
    }
  }, [status, session]); // Add session and status to dependency array

  // Handle editor content changes and broadcast the delta (single character change)

  const handleEditorDidMount = (editor) => {
    //console.log("Current Status:", status);
    //console.log("Current Session:", session);
    editorRef.current = editor;

    editor.onDidChangeModelContent((event) => {
      if (!isRemote.current) {
        const changes = event.changes[0]; // Assuming one change at a time
        const { text, range } = changes;

        // Log the current session status and object during every content change

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          //console.log("Sending update to WebSocket...");
          const wssent = ws.current.send(
            JSON.stringify({
              action: "codeUpdate",
              userId: userMailID,
              text: text,
              range: {
                startLineNumber: range.startLineNumber,
                startColumn: range.startColumn,
                endLineNumber: range.endLineNumber,
                endColumn: range.endColumn,
              },
            })
          );
        } else {
          console.log(
            "Cannot send update, user is not authenticated or WebSocket not connected"
          );
        }
      }
    });
  };

  return (
    <>
      <div className="nav">
        <div className="codebananas-main">
          Code<span id="bananas">bananas</span>
        </div>
        <div className="username">
          {status === "authenticated" ? (
            <span>{userMailID}</span>
          ) : (
            <span> Not signed in!</span>
          )}
        </div>

        <CustomButton
          backgroundColor="#CFB111"
          textColor="#323232"
          borderRadius="6px"
          height="2.8rem"
          fontSize="1.2rem"
          width="10rem"
          handleClick={handleButtonClick}
        >
          <div className="buttonfont">Sign out</div>
        </CustomButton>
      </div>

      <div>
        <div>
          <h3>Online Users:</h3>
          <ul>
            {onlineUsers.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        </div>

        <div className="editor">
          <MonacoEditor
            height="100%"
            language="javascript"
            theme="vs-dark"
            defaultValue="// Start coding here..."
            onMount={handleEditorDidMount} // Attach the editor mount handler
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
