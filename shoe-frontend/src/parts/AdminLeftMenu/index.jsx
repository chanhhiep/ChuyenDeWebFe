export default function AdminLeftMenu(props) {
    return (
        <>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                <div className="app-brand demo">
                    <a href="index.html" className="app-brand-link">
                        <span className="app-brand-logo demo">
                            
                        </span>
                        <span className="app-brand-text demo menu-text fw-bolder ms-2">Admin</span>
                    </a>

                    <a /*href="javascript:void(0);"*/ className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                        <i className="bx bx-chevron-left bx-sm align-middle"></i>
                    </a>
                </div>

                <div className="menu-inner-shadow"></div>

                <ul className="menu-inner py-1">
                    <li className="menu-item">
                        <a href="index.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-home-circle"></i>
                            <div data-i18n="Analytics">Dashboard</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons bx bx-layout"></i>
                            <div data-i18n="Layouts">Layouts</div>
                        </a>

                    </li>
                    <li className="menu-item">
                        <a href="/admin/category" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-hive"></i>
                            <div data-i18n="Category">Category</div>
                        </a>
                    </li>
                    <li className="menu-item active">
                        <a href="/product" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-atom"></i>
                            <div data-i18n="Product">Product</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="blog.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bxl-blogger"></i>
                            <div data-i18n="Blog">Blog</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="banner.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-fullscreen"></i>
                            <div data-i18n="Banner">Banner</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="review.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-message-square-dots"></i>
                            <div data-i18n="Review">Review</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="customer.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-shield-alt"></i>
                            <div data-i18n="Customer">Customer</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="receipt.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-receipt"></i>
                            <div data-i18n="Receipt">Receipt</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="promotion.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bxs-discount"></i>
                            <div data-i18n="Receipt">Promotion</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="payment.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-credit-card-alt"></i>
                            <div data-i18n="Payment">Payment</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="tax.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-dollar-circle"></i>
                            <div data-i18n="Tax">Tax</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="email.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-envelope"></i>
                            <div data-i18n="Email">Email</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="size.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-outline"></i>
                            <div data-i18n="Size">Size</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="color.html" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-color-fill"></i>
                            <div data-i18n="Color">Color</div>
                        </a>
                    </li>
                </ul>
            </aside>
        </>
    )
}