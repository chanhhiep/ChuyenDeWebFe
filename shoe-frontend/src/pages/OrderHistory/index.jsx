import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import "./order.css";
import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart,FaHeart } from 'react-icons/fa';
import { toastError, toastSuccess } from '../../services/ToastService';
import { getAllProduct,getProductByCategory } from "../../api/general-api";
import { API_ENDPOINT } from "../../constants";
import axios from "axios";
export default function OrderHistory (){
    const user = JSON.parse(localStorage.getItem("user"));
    const accesstoken = localStorage.getItem('accesstoken');
    const [listOrder,setListOrder] = useState([]);
    useEffect(() => {
        const refetch = (async () => {
            await axios.get(`${API_ENDPOINT}/api/checkout/${user.id}`, { headers: {"Authorization" : `Bearer ${accesstoken}`} })
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
    return (
        <>
        <Header />

               <div className="row d-flex justify-content-center">
    <div className="col-md-10 col-lg-8 col-xl-7">
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
    </div>
   
</div>
        </>
    )
}