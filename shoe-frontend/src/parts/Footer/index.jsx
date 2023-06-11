
import { Link } from 'react-router-dom';
export default function Footer(props) {
    return (
        <>        
                <footer className="footer bg-light">
                  <div
                    className="container-fluid d-flex flex-md-row flex-column justify-content-between align-items-md-center gap-1 container-p-x py-3"
                  >
                    <div>
                      <Link
                        target="_blank"
                        className="footer-text fw-bolder"
                        >Shoes Shop</Link>
                      ©
                      
                    </div>
                    <div>
                     
                      <Link to="" className="footer-link me-4">Help</Link >
                      <Link to="" className="footer-link me-4">Contact</Link >
                      <Link to="" className="footer-link">Terms &amp; Conditions</Link >
                    </div>
                  </div>
                </footer>
        </>
    )
}