import Header from "../../parts/Header";
import Footer from "../../parts/Footer";

export default function WishList () {
    return (
        <>
        <Header />
        <div class="container">
        <div class="padmb">
            <h1 style={{marginTop:"20px",fontWeight:"600",fontSize:"28px",color:"#373737",marginBottom:"20px"}}>Danh Sach Yeu Thich</h1> 
            <ul class="listsp">
                    <li>
                        <div class="images">
                            <a href="/wishlist/${product.getId()}/remove">
                                <div class="product-favorite onwishlist_btn_add">
                                    <div class="icon-remove-wishtlist"></div>
                                </div>
                            </a>
                            <a href="/products/${product.getId()}/info-product">
                                <img width="234" height="234" class=" lazyloaded" src=""/>
                            </a>
                        </div>
                        <div class="info">
                            <h3>
                                <a href="/products/${product.getId()}/info-product">name</a>
                            </h3>
                            <p>price<sup>đ</sup><span>rate</span></p>
                        </div>
                    </li>
             
                <div class="clear10"></div>
            </ul>
            <ul class="listPage">
            <li class="active">1</li>
            <li>2</li>
            <li>3</li>
        </ul>
        </div>
    </div>
    <Footer/>
        </>
    )
}