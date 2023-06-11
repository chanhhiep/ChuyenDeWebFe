import { Container,Col,Image,Table,Button,Row} from "react-bootstrap";
import { toastError, toastSuccess } from '../../services/ToastService';
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../constants";
import Header from "../../parts/Header";
export default function Profile(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem('token');
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null) {
          setIsLoggedIn(true);
        }
      }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        window.location.href = "/";
        toastSuccess("Logout successful!");
      };
    return(
        <>  
        <Header />
        <Container style={{marginTop:"20px",background:"#B4B4B4",borderRadius:"20px"}}>
      <Row  style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"flex-start",width:"95%",padding:"5%"}}>
        <Col xs={4} style={{padding:"20px",border:"1px solid #B4B4B4",borderRadius:"10px",background:"white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Image height="100px" width="100px" src="https://tse4.mm.bing.net/th?id=OIP.fMemMGJNIPd5fLTI6TwJwQHaHa&pid=Api&P=0&h=180" roundedCircle />
        <h5 style={{marginTop:"20px"}}>{user.email}</h5>
        </Col>
        <Col xs={6} style={{padding:"20px",border:"1px solid #B4B4B4",borderRadius:"10px" ,background:"white",marginLeft:"10%"}}>
        <Table>
        
        <tbody>
            <tr>
              <td>Họ Và Tên:</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>Email :</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{user.phone}</td>
            </tr>
         
        </tbody>
        <Button variant="danger" style={{marginTop:"20%"}} onClick={()=>handleLogout()}>Logout</Button>
      </Table>
        </Col>
      </Row>
    </Container>
    </>
    )
}