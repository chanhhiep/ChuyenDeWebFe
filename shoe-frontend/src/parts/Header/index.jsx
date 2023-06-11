import "./header.css";
import { FaShoppingCart,FaHeart,FaList } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from "react";
import { toastError, toastSuccess } from '../../services/ToastService';
import { API_ENDPOINT } from "../../constants";
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { Navbar,Container, Nav,Dropdown,Col,Image } from "react-bootstrap";
import axios from "axios";
export default function Header(props) {
    const [listProduct, setListProduct] = useState([]);
    const [listCategory,setListCategory] = useState([]);
    //JSON.stringify(user)
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem('token');
    const[keyword,setKeyWord] = useState("");
    const[listResult,setListResult] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        window.location.href = "/";
        toastSuccess("Logout successful!");
      };
    useEffect(() => {
        const refetch = (async () => {
            axios.get(`${API_ENDPOINT}/api/category/getAll`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {       
                const { data } = res;
                console.log(data);
                setListCategory(data);
            });
           
        });
        handleSearch();
        //cleanup function
        return () => {
            refetch();
        };
    }, []);
    function handleSearch() {
        if(keyword === ""){
            return;
        }
        else{
            const data = {
                keyword : keyword
            }
            axios.post(`${API_ENDPOINT}/api/product/search`,data, { headers: {"Authorization" : `Bearer ${token}`} })
                .then((res)=>{
                const {data} = res;
                console.log(res)
                setListResult(data);
            })
        }
    }
    return (
        <>
        
        <header>
    <div className="head">
        <div className="container">
            <h1>Shop Giày Thể Thao - Sneaker Nam, Nữ Replica Đẹp Giá Rẻ</h1>
            <div className="texttop">
                <ul className="text">
                    <li><p>Free ship</p> <span>Toàn quốc</span></li>
                    <li><Link to={`/OrderHistory`}><p>Lich Su Don Hang</p> <span>Mới thanh toán</span></Link></li>
                    <li><p>Bảo hành</p> <span>Trong 6 tháng</span></li>
                </ul>
                <ul className="top" style={{padding:"0px",marginBottom:"0px",height:"58px"}}>
                    <li>
                        <Link to={`/WishList`} title="Danh sách yêu thích" style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:"10px"}}>
                            <FaList color="white" />                              
                            <p style={{marginBottom:"0px",marginLeft:"5px"}}>Wish List</p>
                        </Link>
                    </li>

                </ul>
                <Link to={`/Cart`} id="cart" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <FaShoppingCart width="30px" height="30px"/>
                    <span>( 0 sản phẩm )</span>
                </Link>
            </div>
            <div className="clear"></div>
            <div className="header" style={{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center",marginBottom:"10px"}}>
                <div className="logo">
                    <Link to={`/home`} title="Trang chủ | Shop Giày Thể Thao ">
                        <img src="./images/logo.png" alt="shoes"
                             width="120"
                             height="40"/></Link></div>              
                <div className="search">
                    
                    {/* <form action="tim-kiem" method="get" target="_top">
                        <input type="text" name="key" onChange={(e)=>setKeyWord(e.target.value)} onKeyUp={()=>handleSearch()} placeholder="Nhập gợi ý từ khóa..."/>
                        <input type="submit" value="Tìm kiếm"/>
                        <ul className="search_result">
                            {listResult.map((result) => (
                                <li key={result.id}>
                                    <Link>{result.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </form> */}
                    
<div className="input-group">
  <input type="text" className="form-control" onChange={(e)=>setKeyWord(e.target.value)} onKeyUp={()=>handleSearch()} placeholder="Search..." id="search-input"/>
</div>



{keyword === "" ?
    <>
    <div></div>
    </>
    :
    <>
    <div id="search-results">
                        <div className="list-group list-group-flush" style={{borderColor:"blue"}}>
                        {listResult.map((result) => (
                            <>
                           <Link key={result.id} to={`/DetailsPage/${result.id}`} className="list-group-item list-group-item-action">
                                <Image height="20" width="20" style={{marginRight:"2%"}} src="https://s.yimg.com/fz/api/res/1.2/_5dmtTdXQzStB8e.53m2EQ--~C/YXBwaWQ9c3JjaGRkO2g9NzI7cT04MDt3PTcy/https://s.yimg.com/zb/imgv1/e9d6381f-6a16-39d9-b6f9-1467838c022c/t_500x300" rounded />
                                <p>{result.name}</p>
                            </Link>
                            </>
                          ))}
                        </div>
                        </div>
                        </>
                            }              
                    
                </div>
                {user ?
                             <>
                             <div className="account" style={{marginLeft:"30px", display:"flex",flexDirection:"row",justifyContent:"space-around",alignItem:"center"}}>
                                {/* <Link to="/Login">
                                <img src="https://tse2.mm.bing.net/th?id=OIP.rVggrpUvs-YAUExsD7c-EAHaHa&pid=Api&P=0&h=180" alt="Tài khoản thành viên" height="36" width="36"
                                 className="default"/>
                                 </Link> */}
                                 <span>
                                {/* <Link to="/Login"><p style={{margin:"0px",color:"#11118f"}}>Xin chào,{user.email}</p></Link>
                                <Link to="/Login"><span style={{color:"#830909"}} onClick={(e)=>handleLogout()}>Đăng xuất</span></Link> */}
                                {/* <button onClick={(e)=>handleLogout()}>Đăng xuất</button> */}
                                <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        <Image height="30" width="30" style={{marginRight:"2%"}} src="https://s.yimg.com/fz/api/res/1.2/_5dmtTdXQzStB8e.53m2EQ--~C/YXBwaWQ9c3JjaGRkO2g9NzI7cT04MDt3PTcy/https://s.yimg.com/zb/imgv1/e9d6381f-6a16-39d9-b6f9-1467838c022c/t_500x300" roundedCircle />
        <span>{user.email}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/">Profile</Dropdown.Item>
        <Dropdown.Item onClick={()=>handleLogout()}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
                                </span>
                             </div>
                                </>
                                :
                                <>
                                <div className="account" style={{marginRight:"40px"}}>                
                        
                            <img src="https://tse2.mm.bing.net/th?id=OIP.rVggrpUvs-YAUExsD7c-EAHaHa&pid=Api&P=0&h=180" alt="Tài khoản thành viên" height="36" width="36"
                                 className="default"/>
                                 <span><Link to="/Login" role="button">Đăng ký</Link>/ <Link to="/Register" role="button" >đăng nhập</Link></span>
                            <p className="capdo"><i>Nhận ngay ưu đãi</i></p>
                          
                </div>
                                </>
                            }
                
                
                {/* <Link className="togglemenu">Menu</Link>
                <nav className="subnav">
                    <ul className="navigation">
                    {listCategory.map((category) => (
                        <>
                        <Link>
                        <li className="category" href="/"
                        title="">Trang Chủ</li>
                         <li className="category" href="product.html"
                         title={category.name}>Adidas</li>
                         </Link>
                         </>
                    ))}
                    </ul>
                </nav> */}
            </div>
        </div>
    </div>
    <div className="menufix no-scroll">
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
            {/* <img
              alt=""
              src="https://react-bootstrap.github.io/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '} */}
            Trang Chủ
          </Navbar.Brand>
          <Nav className="me-auto">
            
            {listCategory.map((category,index) => (
                <>
                <Nav.Link key={index} to={`/ProductPage/${category.category_id}`} style={{display: "flex",justifyContent: "center",alignItems: "center",flexDirection:"row"}}>
                    {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/800px-Logo_NIKE.svg.png?20220908234918" alt="nikke" width="33" height="24"/> */}
                    <p style={{margin:"0px"}}>{category.name}</p>
                </Nav.Link>
                </>
            ))}
          </Nav>
        </Container>
      </Navbar>
        {/* <nav id="menu" className="menu">
            <div className="container">
                <ul>
                    <li><Link to="/" title="Giới thiệu"><span className="brand"><img
                            src="images/gioi-thieu.png" alt="Giới thiệu" width="33" height="24"/></span>Trang chủ</Link>
                    </li>
                    <li>
                    {listCategory.map((category) => (
                        <Link to={`/ProductPage/${category.category_id}`} key={category.id}><span className="brand">
                        <img
                        src={category.images} alt="Adidas" width="40" height="24"/>
                        </span>{category.name}</Link>         
                    ))}
                    </li>
                </ul>
            </div>
        </nav> */}
    </div>
</header>
        </>
    )
}