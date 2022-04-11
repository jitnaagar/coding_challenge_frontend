import React from 'react';  
import './Popup.css';  
function Popup(props){
return (  
<div className='popup'>  
<div className='popup_open'>  
<div><img src={props.image} alt=""></img></div> 
<button onClick={props.closePopup}>X</button>  
</div>  
</div> 
);  
}  
export default Popup;