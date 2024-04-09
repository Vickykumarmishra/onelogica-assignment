import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-04">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-md-0 mb-4">
            <h2 className="footer-heading"><a href="#" className="logo">StaffTrack360</a></h2>
            <p>This website is used for Employees presence tracking</p>
           
          </div>
          <div className="col-md-6 col-lg-3 mb-md-0 mb-4">
            <h2 className="footer-heading">Categories</h2>
            <ul className="list-unstyled">
              <li><a href="#" className="py-1 d-block">Buy &amp; Sell</a></li>
              <li><a href="#" className="py-1 d-block">Merchant</a></li>
              <li><a href="#" className="py-1 d-block">Giving back</a></li>
              <li><a href="#" className="py-1 d-block">Help &amp; Support</a></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 mb-md-0 mb-4">
            <h2 className="footer-heading">Tag cloud</h2>
            <div className="tagcloud">
              <a href="#" className="tag-cloud-link">dish</a>
              <a href="#" className="tag-cloud-link">menu</a>
              <a href="#" className="tag-cloud-link">food</a>
              <a href="#" className="tag-cloud-link">sweet</a>
              <a href="#" className="tag-cloud-link">tasty</a>
              <a href="#" className="tag-cloud-link">delicious</a>
              <a href="#" className="tag-cloud-link">desserts</a>
              <a href="#" className="tag-cloud-link">drinks</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-md-0 mb-4">
            <h2 className="footer-heading">Subscribe</h2>
            <form action="#" className="subscribe-form">
              <div className="form-group d-flex">
                <input type="text" className="form-control rounded-left" placeholder="Enter email address" />
                <button type="submit" className="form-control submit rounded-right"><span className="sr-only">Submit</span><ion-icon name="send-outline"></ion-icon></button>
              </div>
            </form>
            <h2 className="footer-heading mt-5">Follow us</h2>
            <ul className="ftco-footer-social p-0">
              <li className="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Twitter"><span><ion-icon name="logo-twitter"></ion-icon></span></a></li>
              <li className="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Facebook"><span><ion-icon name="logo-facebook"></ion-icon></span></a></li>
              <li className="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Instagram"><span><ion-icon name="logo-instagram"></ion-icon></span></a></li>
            </ul>
          </div>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;
