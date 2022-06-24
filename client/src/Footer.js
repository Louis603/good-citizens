import React from 'react'
import { AiFillGithub, AiOutlineLinkedin } from "react-icons/ai";

function Footer() {
  return (
    <div style={{ backgroundColor: "#004643", height: "71px", marginTop:"37px"}}>
    <a href="https://github.com/Louis603"><AiFillGithub style={{color: 'white', fontSize: '30px'}} /></a>
    <a href="https://github.com/Louis603" style={{color: 'white', fontSize: '22px', textDecoration: "none"}}>GitHub</a>
    <div style={{marginBottom: "3px"}}>
    <a href="https://github.com/Louis603" style={{marginBottom:"20px"}}><AiOutlineLinkedin style={{color: 'white', fontSize: '28px'}}/></a>
    <a href="https://github.com/Louis603" style={{color: 'white', fontSize: '22px', textDecoration: "none"}}>LinkedIn</a>
    </div>
    </div>
  )
}

export default Footer