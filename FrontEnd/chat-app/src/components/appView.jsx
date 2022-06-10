import React from "react";
import ChatRoom from "./ChatRoom";
import OnlineUsers from "./OnlineUsers";

function AppView(props) {
    return ( 
        <div className="login chatContainer">
            <OnlineUsers userName={props.userName} onlineUsers={props.onlineUsers} handleClient={props.handleClient}/>
            <ChatRoom client={props.currentClient} sendingMessage={props.sendingMessage} currentMessages={props.currentMessages}
            />
        </div>
     );
}

export default AppView;