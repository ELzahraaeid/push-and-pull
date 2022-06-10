import React from "react";
import AppView from './appView';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';


const URL = 'http://localhost:5000';
const socket = io(URL)

// export const UserContext = React.createContext;
function WhatsAppApp() {

    const [userName, setUserName] = useState('');
    const [islogin, setlogin] = useState(0)
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [client, setClient]= useState({})
    const [messages, setMessages] = useState([])
    const [currentMessages, setCurrentMessages] = useState([])
    
    

    const handleClient = (new_client) =>{
        setClient(new_client)
        setCurrentMessages((messages[messages.findIndex(ele => ele.id === new_client.id)]).messages)
    }

    
    const sendingMessage = (msg)=>{

        const payload = {message: msg, id: client.id, name:client.username}
        socket.emit('new-message', payload)
        const Update_idx = messages.findIndex(ele => ele.id === client.id)
        let data = messages[Update_idx].messages
        data.push([msg, 0])   //0 to know who is sender
        setMessages([...messages.slice(0,Update_idx),{id:client.id, messages:data}, ...messages.slice(Update_idx+1)])
        setCurrentMessages(messages[Update_idx].messages)
        
    }
        
    const handleSubmit = (e) =>{
        e.preventDefault();
        socket.emit('newUser', userName)
        setlogin(1)
        
        
    };

    useEffect(() => {
      
       
        socket.on('new-user', (user) =>{
            setOnlineUsers(users =>([...users,user]))
            setMessages(msg => [...msg, {id:user.id, messages:[]}])
            
        })
        
        socket.on('online-users', (allonlineUsers) =>{
            setOnlineUsers(allonlineUsers)
            const data = allonlineUsers.map(ele =>({id:ele.id,messages:[]}))
            setMessages(data)
          
            
            
        })  
        socket.on('new-message', (payload) =>{
                // const Update_idx = messages.findIndex(ele => ele.id === payload.id)
            
                //     let data = messages[Update_idx].messages
                
                // data.push([payload.message, 1])   //1 to know who is sender
                // setMessages((mesg => [...mesg.slice(0,Update_idx),{id:client.id, mesg:data}, ...mesg.slice(Update_idx+1)]))
            
                setMessages(mesg => ([...mesg.slice(0,mesg.findIndex(ele => ele.id === payload.id)),{id:payload.id, messages:[...(mesg[mesg.findIndex(ele => ele.id === payload.id)].messages),[payload.message, 1]]}, ...mesg.slice(mesg.findIndex(ele => ele.id === payload.id)+1)]))

        })
        
        socket.on('delete-user', (UserId) =>{
            setOnlineUsers(online => (online.filter(user => user.id !== UserId)))
            setMessages(mes => (mes.filter(obj => obj.id !== UserId)))
            setClient(c => (c.id === UserId ? {} :c))  
        })
    
        
        
    }, []);

    
    return ( 
        
            
        <div className="container">
            {!islogin?
            <div className="login">
                <form onSubmit={handleSubmit} className='form'>
                        
                            <label style={{ fontFamily: 'Snell Roundhand, cursive' }}>User Name </label>
                            <input type='text'
                              name = 'message'
                              required
                              value={userName}
                              onChange= {e => setUserName(e.target.value)}
                              className='nameInput'
                            />
                            
                            <input type='image' src='https://cdn-icons-png.flaticon.com/512/938/938925.png' width='5%'  />
                    </form>
            </div>:
            // <UserContext.Provider value={'zzzzzz'}>
                <AppView userName={userName} onlineUsers={onlineUsers} 
                handleClient={handleClient} currentClient={client}
                sendingMessage = {sendingMessage} currentMessages={currentMessages}
                />
               
            // </UserContext.Provider>
            }
            
        </div>
     );
        }

export default WhatsAppApp;
