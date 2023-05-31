import AdminHeader from "../AdminHeader";
import AdminLeftMenu from "../AdminLeftMenu";

export default function AdminLayout(props) {
    return (
        <>
            <div class="layout-wrapper layout-content-navbar">
                <div class="layout-container">
                    <AdminLeftMenu />
                    <div class="layout-page">
                        <AdminHeader />
                        <div>
                            {props}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}