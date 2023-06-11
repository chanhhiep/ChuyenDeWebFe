import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import "./order.css";
import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart,FaHeart } from 'react-icons/fa';
import { toastError, toastSuccess } from '../../services/ToastService';
import { getAllProduct,getProductByCategory } from "../../api/general-api";
import { Link } from 'react-router-dom';
import { API_ENDPOINT } from "../../constants";
import { Tabs,Tab,Modal,Button,Table} from "react-bootstrap";
import { Math } from "react";
import axios from "axios";
export default function OrderHistory (){
    const user = JSON.parse(localStorage.getItem("user"));
    const accesstoken = localStorage.getItem('token');
    const [listOrder,setListOrder] = useState([]);
    useEffect(() => {
        const refetch = (async () => {
            // await axios.get(`${API_ENDPOINT}/api/checkout/${user.id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            // .then(res => {       
            //     const { data } = res;
            //     console.log(data);
            //     setListOrder(data);
            // });
            await axios.get(`${API_ENDPOINT}/api/order/user/${user.id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListOrder(data);
            });
        });
        //cleanup function
        return () => {
            refetch();
        };
    }, []);
    const [listDetails,setListDetails] = useState([]);
    function getOrderDetail(orderId){
        setLgShow(true)
        axios.get(`${API_ENDPOINT}/api/checkout/order/${orderId}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListDetails(data);
        });
    }
    function cancelOrder(orderId){

    }
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    return (
        <>
        <Header />
        <Tabs
      defaultActiveKey="confirm"
      id="fill-tab-example"
      className="mb-3"
      fill
      style={{margin:"3% 5% 0% 5%",color:"black",border:"1px solid #A39696"}}
    >
      <Tab eventKey="confirm" title="Chờ Xác Nhận" style={{margin:"0% 5%",color:"black"}}>
      {listOrder.map((order,index) => (
        <>
      <div className="card card-stepper" style={{marginBottom:"1%"}} key={index}>
            <div className="card-header p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p className="text-muted mb-2"> ID đơn đặt hàng : <span className="fw-bold text-body">{order.id}</span></p>
                        <p className="text-muted mb-0"> Diễn ra vào : <span className="fw-bold text-body">{order.createdAt}</span> </p>
                    </div>
                    <div>
                     
      <Button onClick={() => getOrderDetail(order.id)}>Xem chi tiết</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Chi Tiết đơn hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><Table bordered striped hover>
        <thead>
          <tr>
            <th>mã đơn hàng</th>
            <th>hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Cỡ Giày</th>
            <th>Số lượng</th>
            <th>Giá Tiền</th>
          </tr>
        </thead>
        <tbody>
        {listDetails.map((item,index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.product.name}</td>
              <td>{item.product.name}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>{item.total}</td>
            </tr>
          ))}
          
        </tbody>
      </Table></Modal.Body>
      </Modal>
                    </div>
                </div>
            </div>
            {/* <div className="card-body p-4" style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center"}}>
                <div>
                    <img className="align-self-center img-fluid" src="" height="50" width="50"/>
                </div>
                        <h5 className="bold" style={{ marginBottom:"0px"}}>{order.product.name}</h5>
                        <h5 style={{ marginBottom:"0px"}}> order.quantity</h5>
                        <h5 className="mb-3" style={{ marginBottom:"0px"}}>order.price</h5>
            </div> */}
            <div className="card-body p-4" style={{display: "flex",flexDirection: "column",justifyContent: "left",alignItems: "flex-start"}}>
                 <h5 style={{marginBottom:"5px"}}>Họ Và Tên:{order.shipDto.sName}</h5>
                 <h5 style={{marginBottom:"5px"}}>Địa Chỉ Giao Hàng: {order.shipDto.sAddress+ "," + order.shipDto.xa+","+ order.shipDto.huyen+ "," + order.shipDto.tinh}</h5>
                 <h5 style={{marginBottom:"5px"}}>email:{order.shipDto.sEmail} </h5>
                 <h5 style={{marginBottom:"5px"}}>số Điện Thoại: {order.shipDto.sPhone}</h5>
                 <h5 style={{marginBottom:"5px"}}>Ghi Chú: {order.note}</h5>
            </div>
            <div className="card-footer p-4" style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center"}}>
                <div>
                    
                    <h5 style={{marginBottom:"5px"}}>Fee: {(order.totalOrder/1+0.1)*0.1} </h5>
                    <h5>Total: {order.totalOrder}</h5>
                </div>
                <div className="d-flex">
                    <h5 className="fw-normal mb-0"><a href="#!">Hủy Đơn</a></h5>
                    <div className="border-start h-100"></div>                  
                </div>
            </div>
        </div>
        </>
        ))}
      </Tab>
      
      <Tab eventKey="transfer" title="Đang Vận Chuyển" style={{margin:"0% 5%",color:"black"}}>
      <div className="card card-stepper" style={{marginBottom:"1%"}}>
            <div className="card-header p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p className="text-muted mb-2"> ID đơn đặt hàng : <span className="fw-bold text-body"> 1222528743</span></p>
                        <p className="text-muted mb-0"> Diễn ra vào : <span className="fw-bold text-body"> 12,March 2019</span> </p>
                    </div>
                    <div>
                        <h6 className="mb-0"> <a href="#">Xem chi tiết</a> </h6>
                    </div>
                </div>
            </div>
            <div className="card-body p-4" style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center"}}>
                <div>
                    <img className="align-self-center img-fluid" src="" height="50" width="50"/>
                </div>
                        <h5 className="bold" style={{ marginBottom:"0px"}}>order.product.name</h5>
                        <h5 style={{ marginBottom:"0px"}}> order.quantity</h5>
                        <h5 className="mb-3" style={{ marginBottom:"0px"}}>order.price</h5>
            </div>
            <div className="card-footer p-4" style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center"}}>
                <div>
                    <h5 style={{marginBottom:"5px"}}>fee: </h5>
                    <h5>order.total</h5>
                </div>
                <div className="d-flex">
                    <h5 className="fw-normal mb-0"><a href="#!">Hủy Đơn</a></h5>
                    <div className="border-start h-100"></div>                  
                </div>
            </div>
        </div>
      </Tab>
      <Tab eventKey="longer-tab" style={{margin:"0% 5%",color:"black"}} title="Đã Nhận">
      <div className="card card-stepper" style={{marginBottom:"1%"}}>
            <div className="card-header p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p className="text-muted mb-2"> ID đơn đặt hàng : <span className="fw-bold text-body"> 1222528743</span></p>
                        <p className="text-muted mb-0"> Diễn ra vào : <span className="fw-bold text-body"> 12,March 2019</span> </p>
                    </div>
                    <div>
                        <h6 className="mb-0"> <a href="#">Xem chi tiết</a> </h6>
                    </div>
                </div>
            </div>
            <div className="card-body p-4" style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center"}}>
                <div>
                    <img className="align-self-center img-fluid" src="" height="50" width="50"/>
                </div>
                        <h5 className="bold" style={{ marginBottom:"0px"}}>order.product.name</h5>
                        <h5 style={{ marginBottom:"0px"}}> order.quantity</h5>
                        <h5 className="mb-3" style={{ marginBottom:"0px"}}>order.price</h5>
            </div>
            <div className="card-footer p-4" style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center"}}>
                <div>
                    <h5 style={{marginBottom:"5px"}}>fee: </h5>
                    <h5>order.total</h5>
                </div>
                <div className="d-flex" >
                    <h5 className="fw-normal mb-0"><a href="#!">Hủy Đơn</a></h5>
                    <div className="border-start h-100"></div>                  
                </div>
            </div>
        </div>
      </Tab>
     
    </Tabs>
               <div className="row d-flex justify-content-center">
    {/* <div className="col-md-10 col-lg-8 col-xl-7">
    {listOrder.map((order) => (
        <div className="card card-stepper" style={{borderRadius: "16px"}}>
            <div className="card-header p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p className="text-muted mb-2"> ID đơn đặt hàng : <span className="fw-bold text-body"> 1222528743</span></p>
                        <p className="text-muted mb-0"> Diễn ra vào : <span className="fw-bold text-body"> 12,March 2019</span> </p>
                    </div>
                    <div>
                        <h6 className="mb-0"> <a href="#">Xem chi tiết</a> </h6>
                    </div>
                </div>
            </div>
            <div className="card-body p-4">
                <div className="d-flex flex-row mb-4 pb-2">
                    <div className="flex-fill">
                        <h5 className="bold">{order.product.name}</h5>
                        <p style={{ marginBottom:"5px"}} className="text-muted"> {order.quantity}</p>
                        <h4 className="mb-3"> Giá: <span className="small text-muted"> {order.price} </span></h4>
                    </div>
                    <div>
                        <img className="align-self-center img-fluid" src={order.product.images} width="250"/>
                    </div>
                </div>
                <div>
                    <h1 style={{fontSize:"20px",fontWeight:"600", marginBottom:"5px",marginTop:"-35px"}}>Order Details</h1>
                    <p style={{marginBottom:"5px"}} className="text-muted">value:{order.total}</p>
                    <p style={{marginBottom:"5px"}} className="text-muted">discount: </p>
                    <p style={{marginBottom:"5px"}} className="text-muted">delivery charge:</p>
                    <h4>{order.total}</h4>
                </div>
            </div>
            <div className="card-footer p-4">
                <div className="d-flex">
                    
                    <h5 className="fw-normal mb-0"><a href="#!">Hủy bỏ</a></h5>
                    <div className="border-start h-100"></div>
                  
                </div>
            </div>
        </div>
         ))}
    </div>  */}
   
</div>
        </>
    )
}