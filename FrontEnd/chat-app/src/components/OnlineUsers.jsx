import { useEffect, useState, useContext } from 'react';




function OnlineUsers(props) {
    
    const handleNewClient = (user)=>{
        props.handleClient(user)
    }
    return ( 
        
        <div className="usersDiv">
            <div className="userImage">
                <img src="https://static.thenounproject.com/png/363639-200.png"  width='100%' />    
            </div>
            <div className="userName">
                {props.userName}
            </div>  
            
            <hr/>
            <ul className='onlineUsersList'>
                {
                    props.onlineUsers.map(user => <li key={user.id} className="UserItem" onClick={ ()=> handleNewClient(user)}>
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png"  width='15%' style={{float:"left"}} />
                                                    <div style={{fontSize:'25px',fontFamily: 'Snell Roundhand, cursive'}}>{user.username}</div>
                                                    </li>)
                    
                }
            </ul>
            </div>
            
            
       
     );
}

export default OnlineUsers;