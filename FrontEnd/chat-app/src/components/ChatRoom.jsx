
import { useState } from 'react';


function ChatRoom(props) {

    const [message, setMessage] = useState('')
    const handleSubmit = (e) =>{
        e.preventDefault();
        props.sendingMessage(message)
        setMessage('')
        
        
    };
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
            <ul>
                {
                    props.currentMessages.map((m, i) => <li key={i}>{m[0]}</li>)
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
                            placeholder="Type a Message"
                            className="typeMsg"
                            />
                            <input type='image' src='https://toppng.com/public/uploads/thumbnail/close-button-camera-button-send-butto-11568894434sickyjwnmf.png' width='5%' style={{float:"right"}} />
                    </form>
            </div>
        </div>:<h4 className="chatDiv">Welcome</h4>}
        </>
     );
}

export default ChatRoom;