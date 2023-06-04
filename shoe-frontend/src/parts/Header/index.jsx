import "./header.css";
import { FaShoppingCart,FaHeart,FaList } from 'react-icons/fa';
export default function Header(props) {
    return (
        <>
        
        <header>
    <div className="head">
        <div className="container">
            <h1>Shop Giày Thể Thao - Sneaker Nam, Nữ Replica Đẹp Giá Rẻ</h1>
            <div className="texttop">
                <ul className="text">
                    <li><p>Free ship</p> <span>Toàn quốc</span></li>
                    <li><p>Check hàng</p> <span>Mới thanh toán</span></li>
                    <li><p>Bảo hành</p> <span>Trong 6 tháng</span></li>
                </ul>
                <ul className="top">
                    <li>
                        <a href="" title="Danh sách yêu thích">
                            <div className="img">
                                <img src="https://cdn3.iconfinder.com/data/icons/e-commerce-3-2/380/8-1024.png" alt="Cập nhật danh sách yêu thích" width="24"
                                     height="24"/></div>
                            <p>Wish List</p>
                        </a>
                    </li>

                </ul>
                <a href="gio-hang.html" id="cart" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItem:"center"}}>
                    <FaShoppingCart width="30px" height="30px"/>
                    <span>( 0 sản phẩm )</span>
                </a>
            </div>
            <div classNameName="clear"></div>
            <div className="header">
                <div className="logo">
                    <a href="index.html" title="Trang chủ | Shop Giày Thể Thao - Sneaker Nam, Nữ Replica Đẹp Giá Rẻ">
                        <img src="http://www.bestfreewebresources.com/wp-content/uploads/2013/03/logo-shoes-3.jpg" alt="Shop Giày Thể Thao - Sneaker Nam, Nữ Replica Đẹp Giá Rẻ"
                             width="261"
                             height="50"/></a></div>              
            
            
                <div className="search">
                    <form action="tim-kiem" method="get" target="_top">
                        <input type="text" name="key" placeholder="Nhập gợi ý từ khóa..."/>
                        {/*<input type="submit" value="Tìm kiếm"/>*/}
                        <ul className="search_result"></ul>
                    </form>
                </div>
                <div class="account" style={{marginRight:"40px"}}>                
                        <a href="/login" title="Đăng ký &amp; tạo tài khoản">
                            <img src="https://tse2.mm.bing.net/th?id=OIP.rVggrpUvs-YAUExsD7c-EAHaHa&pid=Api&P=0&h=180" alt="Tài khoản thành viên" height="36" width="36"
                                 class="default"/><span>Đăng ký / đăng nhập</span>
                            <p class="capdo"><i>Nhận ngay ưu đãi</i></p>
                        </a>   
                </div>
                
                <a className="togglemenu">Menu</a>
                <nav className="subnav">
                    <ul className="navigation">
                        <li className="category" href="product.html"
                            title="Shop giày thể thao Adidas nam nữ mới nhất 2022"><a>Adidas</a></li>

                        <li className="category" href="product.html"
                            title="Giày Thể Thao Nike Chính Hãng Nam Nữ Đẹp Giá Giảm 25%"><a>Nike</a></li>

                        <li className="category" href="product.html"
                            title="Giày Sneaker MLB Korea Nam Nữ Mới Giá Rẻ Giảm 25%"><a>MLB Korea</a></li>

                        <li className="category" href="product.html"
                            title="Giày New Balance Chất Lượng Siêu Cấp Giá Rẻ Giảm 20%"><a>New Balance</a></li>

                        <li className="category" href="product.html"
                            title="Giày Sneaker McQueen Mới Nhất | Chuẩn Đẹp Giảm 25%"><a>McQueen</a></li>

                        <li className="category" href="product.html"
                            title="Giày Converse Vietnam: Chuck Taylor 1970s Nam Nữ Giá Rẻ"><a>Converse</a></li>

                        <li className="category" href="product.html"
                            title="Store Giày Vans Việt Nam: Old Skool, Slip On, Vault, classNameic, Marvel"><a>VANS</a>
                        </li>

                        <ul className="linknews">
                            <li><a href="#" title="Thông tin giới thiệu">Giới thiệu</a></li>
                            <li><a href="#" title="Chia sẻ kinh nghiệm hay về giày thể thao">
                                Chia sẻ kinh nghiệm hay <label>Mới</label></a></li>
                            <li><a href="#" title="Tin tức - tư vấn giày thể thao">Tin tức - tư
                                vấn </a></li>
                            <li><a href="#" title="Thông tin liên hệ">Liên hệ</a></li>
                        </ul>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
    <div className="menufix no-scroll">
        <nav id="menu" className="menu">
            <div className="container">
                <ul>
                    <li><a href="index.html" title="Giới thiệu"><span className="brand"><img
                            src="images/gioi-thieu.png" alt="Giới thiệu" width="33" height="24"/></span>Trang chủ</a>
                    </li>
                    <li><a href="product.html" title="Adidas"><span className="brand"><img
                            src="images/adidas.png" alt="Adidas" width="40" height="24"/></span>Adidas</a>
                        <ul>
                            <li><a href="product.html" title="Ultra Boost">Ultra Boost</a></li>
                            <li><a href="product.html" title="Yeezy">Yeezy</a></li>
                            <li><a href="product.html" title="ZX 5K Boost">ZX 5K Boost</a></li>
                            <li><a href="product.html" title="Alpha Magma">Alpha Magma</a></li>
                            <li><a href="product.html" title="EQT+">EQT+</a></li>
                            <li><a href="product.html" title="ZX 2K Boost">ZX 2K Boost</a></li>
                            <li><a href="product.html" title="Alphabounce">Alphabounce</a></li>
                            <li><a href="product.html" title="X9000L4">X9000L4</a></li>
                            <li><a href="product.html" title="Stan Smith">Stan Smith</a></li>
                            <li><a href="product.html" title="Prophere">Prophere</a></li>
                            <li><a href="product.html" title="Superstar">Superstar</a></li>
                            <li><a href="product.html" title="NMD Humanrace">NMD Humanrace</a></li>
                            <li><a href="product.html" title="Ozweego">Ozweego</a></li>
                            <li><a href="product.html" title="Adidas Yung">Adidas Yung</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="product.html" title="Nike"><span className="brand">
                        <img src="images/nike.png" alt="Nike" width="40" height="24"/></span>Nike</a>
                        <ul>
                            <li><a href="product.html" title="SB Dunk">SB Dunk</a></li>
                            <li><a href="product.html" title="Jordan">Jordan</a></li>
                            <li><a href="product.html" title="Air Force 1">Air Force 1</a></li>
                            <li><a href="product.html" title="Blazer">Blazer</a></li>
                            <li><a href="product.html" title="Pegasus">Pegasus</a></li>
                            <li><a href="product.html" title="Air Max">Air Max</a></li>
                            <li><a href="product.html" title="Joyride">Joyride</a></li>
                            <li><a href="product.html" title="M2K">M2K</a></li>
                            <li><a href="product.html" title="Uptempo">Uptempo</a></li>
                        </ul>
                    </li>
                    <li><a href="product.html" title="MLB Korea"><span className="brand">
                        <img src="images/mlb.png" alt="MLB Korea" width="40" height="24"/></span>MLB Korea</a>
                    </li>
                    <li><a href="product.html" title="New Balance"><span className="brand"><img
                            src="images/new-balance.png" alt="New Balance" width="40" height="24"/></span>New
                        Balance</a>
                        <ul>
                            <li><a href="product.html" title="New Balance 300">New Balance 300</a></li>
                            <li><a href="product.html" title="New Balance 550">New Balance 550</a></li>
                            <li><a href="product.html" title="New Balance 574">New Balance 574</a></li>
                        </ul>
                    </li>
                    <li><a href="product.html" title="McQueen"><span className="brand"><img
                            src="images/mcqueen.png" alt="McQueen" width="40" height="24"/></span>McQueen</a>
                    </li>
                    <li><a href="product.html" title="Converse"><span className="brand"><img
                            src="images/converse.png" alt="Converse" width="40" height="24"/></span>Converse</a>
                    </li>
                    <li><a href="product.html" title="VANS"><span className="brand">
                        <img src="images/vans.png" alt="VANS" width="40" height="24"/></span>VANS</a>
                    </li>
                    <li><a href="product.html" title="Sale Off" className="sale"><span className="brand"><img
                            src="images/sale-off.png" alt="Sale Off" width="40" height="24"/></span>Sale Off</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</header>
        </>
    )
}