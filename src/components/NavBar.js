import React, {useState, useEffect } from 'react';
import styled from 'styled-components'

function NavBar() {
   
    const [show, handleShow] = useState(false);

    useEffect(()=> {
      window.addEventListener("scroll", () => {
          if(window.scrollY > 100) {
              handleShow(true);
          } else handleShow(false);
      });
        return () => {
            window.removeEventListener("scroll");
        };
    },[]);

    return (
        <NAV show={show}>
            <NAV_LOGO 
             src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
             alt="Netflix logo"
             />
             <NAV_AVATAR 
             src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
             alt="Netflix avatar"
             />
        </NAV>
    )
}

export default NavBar;

const NAV = styled.div`
position: fixed;
top:0;
width: 100%;
height: 30px;
padding: 20px;
z-index: 1;
display: flex;
justify-content: space-between;
${props => props.show ? 'background-color: #111' : null};
transition-timing-function: ease in;
transition: all 0.5s;`

const NAV_LOGO = styled.img`
position: fixed;
left: 20px;
width: 80px;
object-fit: contain;`

const NAV_AVATAR = styled.img`
position: fixed;
right: 20px;
width: 30px;
object-fit: contain;`
