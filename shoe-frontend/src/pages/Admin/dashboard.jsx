import "./page.css";
import "./core.css"
import "./theme-default.css"
import AdminHeader from "../../parts/AdminHeader";
import AdminLeftMenu from "../../parts/AdminLeftMenu";
export default Dashboard (){
    return(
        <>
        <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
            <AdminLeftMenu />
            <div className="layout-page">
                <AdminHeader />
            <div/>
        </div>
        </div>
        </>
    )
}