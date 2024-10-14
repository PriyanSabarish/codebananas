"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useSession, signOut } from "next-auth/react";
import CustomButton from "@/app/components/button";
import "./home.css";
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

function HomePage() {
  const { data: session, status } = useSession();
  const ws = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const editorRef = useRef(null);  // Ref to access the Monaco Editor instance

  // Function to handle sign out
  const handleButtonClick = () => {
    signOut({ callbackUrl: "/" });
  };

  // Connect to WebSocket and broadcast changes
  useEffect(() => {
    if (status === 'authenticated' && session.user) {
      // Connect to WebSocket server when the user logs in
      ws.current = new WebSocket('ws://localhost:8080');

      ws.current.onopen = () => {
        console.log('Connected to WebSocket server');
        ws.current.send(JSON.stringify({
          action: 'login',
          userId: session.user.email,
        }));
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.action === 'updateUsers') {
          setOnlineUsers(data.onlineUsers);  // Update the online users list
        }

        if (data.action === 'codeUpdate') {
          // Apply the character delta received to the editor content
          const editor = editorRef.current;
          const range = new window.monaco.Range(
            data.range.startLineNumber,
            data.range.startColumn,
            data.range.endLineNumber,
            data.range.endColumn
          );
          const id = { major: 1, minor: 1 };  // Give a change ID
          const op = {
            identifier: id,
            range: range,
            text: data.text,  // The text received from the other user
            forceMoveMarkers: true,
          };

          // Apply the delta (insert/delete)
          editor.executeEdits("my-source", [op]);
        }
      };

      // Clean up the WebSocket connection when component unmounts
      return () => {
        ws.current.close();
      };
    }
  }, [session, status]);

  // Handle editor content changes and broadcast the delta (single character change)
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    console.log("hello")
    editor.onDidChangeModelContent((event) => {
      // Get the last change (delta) made
      const changes = event.changes[0];  // Assuming one change at a time
      const { text, range } = changes;

      if (ws.current && status === 'authenticated') {
        // Broadcast the character delta (text and position) to the WebSocket server
        ws.current.send(JSON.stringify({
          action: 'codeUpdate',
          userId: session.user.email,
          text: text,  // The single character added/removed/modified
          range: {
            startLineNumber: range.startLineNumber,
            startColumn: range.startColumn,
            endLineNumber: range.endLineNumber,
            endColumn: range.endColumn,
          }
        }));
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
          {session ? (
            <span>{session.user.name}</span>
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
            editorDidMount={handleEditorDidMount}  // Attach the editor mount handler
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
