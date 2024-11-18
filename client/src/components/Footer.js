import React from 'react'
import { IoMailOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";


const Footer = () => {
  return (
    <>
  <footer className="pt-5 pb-5  footer">
  <div className="container">
    <div className="row">
      <div className="col-md-3">
        <h5 className="my-head-border">Contact Us</h5>
        <p> Yes It Labs<br />Software company in noida&nbsp;Noida </p>
        <p> <a className='d-flex' style={{textDecoration: 'none', color: 'black'}} href="https://wa.me/+919996040506"><IoCallOutline />
        +91 9996-9999-99</a> </p>
        <p className='d-flex'><IoMailOutline/>info@herbalshades.com    </p>
        <h5 className="mobile-mt">Social Connect</h5>
       
     
      </div>
      <div className="col-md-3">
        <h5 className="mobile-mt my-head-border">Useful Links</h5> <br />
        <a href="./about-us">About Us</a>  <br />
        <a href="./about-founders">About the Founder</a>  <br />
        <a href="./become-a-distributor">Become a Distributor</a> <br />
        <a href="./blogs">Blogs</a> <br />
        <a href="./contact-us">Contact Us</a> <br />
      </div>
      <div className="col-md-3">
        <h5 className="mobile-mt my-head-border">Help</h5> <br />
        <a href="./delivery-and-return-policy">Delivery and Return Policy</a>  <br />
        <a href="./refund-policy">Refund Policy</a>  <br />
        <a href="./privacy-policy">Privacy Policy</a>  <br />
        <a href="./terms-and-conditions">Terms &amp; Conditions</a>  <br />
      </div>
      <div className="col-md-3">
        <h5 className="mobile-mt my-head-border">Products</h5> <br />
        <a href="./haircare">Hair Care</a> <br />
        <a href="./facecare">Face Care</a> <br />
        <a href="./body-care">Body Care</a> <br />
        <a href="./essentialcare">Essential Oil</a> <br />
        <a className="d-none" href="./foot-care">Foot Care</a> <br />
      </div>
    </div>
  </div>
</footer>

        </>
  )
}

export default Footer