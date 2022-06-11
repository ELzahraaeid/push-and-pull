
import { useState } from 'react';


function ChatRoom(props) {

    const [message, setMessage] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault();
        props.sendingMessage(message)
        setMessage('')  
    };

    const setTypingMode = (flag)=>{
            props.TypingUser(props.client.id,flag)
    }
    return ( 
        <>
        {props.client.username?
        <div className="chatDiv">
            
            <div className="clientImage">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png"  width='100%' />    
            </div>
            <div className="clientName" >
                 {props.client.username}
            </div>  
            <hr/>

            <div className="MassagesDiv">
            <ul className='onlineUsersList'>
                {
                    props.currentMessages.map((m, i) => <li key={i}><div className = {(m[1] ? "reciver":"sender")} style={{fontFamily: 'Snell Roundhand, cursive'}}>{m[0]}</div></li>)
                }
            </ul>
            </div>
            <div style={{marginRight:'3%'}}>
                <form onSubmit={handleSubmit} >
                            <input type='text'
                              name = 'type-message'
                              required
                              value={message}
                              onChange= {e => setMessage(e.target.value)}
                              onFocus={()=> setTypingMode(1)}
                              onBlur = {()=>setTypingMode(0)}
                              placeholder="Type a Message"
                              className="typeMsg"
                            />
                            <input type='image' src='https://toppng.com/public/uploads/thumbnail/close-button-camera-button-send-butto-11568894434sickyjwnmf.png' width='5%' style={{float:"right"}} />
                    </form>
            </div>
        </div>:<div className="chatDiv welcome">Welcome</div>}
        </>
     );
}

export default ChatRoom;