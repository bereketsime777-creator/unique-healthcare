import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f1f5f9", overflow: "hidden" }}>
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? "is-visible" : ""}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <AdminSidebar open={sidebarOpen} onNavigate={closeSidebar} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <AdminTopbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />
        <main className="admin-main" style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
