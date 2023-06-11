import { Link, history } from 'react-router-dom';
import { Button} from "react-bootstrap";
import Header from "../../parts/Header";
export default function Success(){
    return(
        <>
        {/* {(customer === null || chosenItems === null) && <Navigate to="/" exact />} */}
        <Header />
        
        {/* start container */}
        <div className="container-fluid bg-gray" style={{marginTop:"3%"}}>
            <div className="container bg-gray p-5">
                <div className="row w-100 gy-2 bx__shadow bg-white text-center p-5 justify-content-center">
                    <i className='bx bxs-check-circle fw-bold cl-green fs-500'></i>
                    <h4>Order successfully !</h4>
                    <h5>Please check your email for more information !</h5>

                    {/* <Link to={"/"} className="btn btn__reserve w-25 rounded-pill">Explore more</Link> */}
                    <Button variant="outline-secondary" style={{width:"30%",marginTop:"20px"}}>Explore more</Button>
                </div>
            </div>

        </div>
    </>
    )
}