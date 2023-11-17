import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa6'
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Navbar.css'

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='my-navbar'>
      <a href='#advocate'>候選人主張</a>
      <a href='#latest'>最新活動</a>
      <a href='#issues'>政策議題</a>
      <a href='#donate'>小額捐款</a>
      <a href='#comment'>民眾服務信箱</a>
      <button className='mobile-burger' onClick={handleShow}>
        <FaBars />
      </button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='candidate-number'>2</div>
          <a href='#advocate' onClick={handleClose}>候選人主張</a>
          <a href='#latest' onClick={handleClose}>最新活動</a>
          <a href='#issues' onClick={handleClose}>政策議題</a>
          <a href='#donate' onClick={handleClose}>小額捐款</a>
          <a href='#comment' onClick={handleClose}>民眾服務信箱</a>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default Navbar