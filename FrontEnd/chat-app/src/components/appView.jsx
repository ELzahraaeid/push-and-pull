import React from "react";
import ChatRoom from "./ChatRoom";
import OnlineUsers from "./OnlineUsers";

function AppView(props) {
    return ( 
        <div className="login chatContainer">
            <OnlineUsers userName={props.userName} onlineUsers={props.onlineUsers} handleClient={props.handleClient} typingState={props.typingState}/>
            <ChatRoom client={props.currentClient} sendingMessage={props.sendingMessage} currentMessages={props.currentMessages}
            TypingUser ={props.TypingUser} 
            />
        </div>
     );
}

export default AppView;