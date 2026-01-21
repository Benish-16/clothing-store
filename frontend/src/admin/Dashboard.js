import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);


const StatCard = ({ title, value, icon, gradient }) => (
  <div className="col-xl-3 col-lg-3 col-md-6 col-6">
    <div className="stat-card" style={{ background: gradient }}>
      <div className="stat-content">
        <div>
          <p className="stat-title">{title}</p>
          <h3 className="stat-value">{value}</h3>
        </div>
        <div className="stat-icon">{icon}</div>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetch("https://clothing-store-backc-p6nl.onrender.com/api/order/all")
      .then(res => res.json())
      .then(data => {
        if (data.success) setOrders(data.orders);
      })
      .finally(() => setLoading(false));
  }, []);

  const today = dayjs().startOf("day");

  const delivered = orders.filter(o => o.orderStatus === "Delivered");
  const pending = orders.filter(o => o.orderStatus === "Pending").length;

  const revenue = delivered.reduce((s, o) => s + Number(o.total || 0), 0);
  const todaySales = orders
    .filter(o => dayjs(o.createdAt).startOf("day").isSame(today))
    .reduce((s, o) => s + Number(o.total || 0), 0);


  const labels = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(6 - i, "day").format("ddd")
  );

  const ordersByDay = Array(7).fill(0);
  orders.forEach(o => {
    const diff = today.diff(dayjs(o.createdAt).startOf("day"), "day");
    if (diff >= 0 && diff < 7) ordersByDay[6 - diff]++;
  });

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <>
    
      <nav className="mobile-navbar d-md-none">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <i className="bi bi-list"></i>
        </button>
        <span className="navbar-title">Dashboard</span>
      </nav>

     
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
  
        <div className="sidebar-header d-md-none">
          <h5>Admin Panel</h5>
          <button onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <nav className="sidebar-links">
          <Link to="/" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
          <Link to="/men" onClick={() => setSidebarOpen(false)}>Men</Link>
          <Link to="/women" onClick={() => setSidebarOpen(false)}>Women</Link>
          <Link to="/Customerview" onClick={() => setSidebarOpen(false)}>Customers</Link>
          <Link to="/Contactview" onClick={() => setSidebarOpen(false)}>Contact</Link>
        </nav>

      
        {isLoggedIn && (
          <div className="mobile-logout d-md-none">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </aside>

     
      {sidebarOpen && (
        <div
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

  
      <main className="main mt-5">
        <h2 className="page-title">Dashboard</h2>

      
        <div className="row g-3">
          <StatCard
            title="Today's Sales"
            value={`₹${todaySales}`}
            gradient="linear-gradient(135deg,#667eea,#764ba2)"
            icon={<i className="bi bi-currency-rupee"></i>}
          />
          <StatCard
            title="Total Orders"
            value={orders.length}
            gradient="linear-gradient(135deg,#43cea2,#185a9d)"
            icon={<i className="bi bi-cart-check"></i>}
          />
          <StatCard
            title="Pending Orders"
            value={pending}
            gradient="linear-gradient(135deg,#f7971e,#ffd200)"
            icon={<i className="bi bi-hourglass"></i>}
          />
          <StatCard
            title="Revenue"
            value={`₹${revenue}`}
            gradient="linear-gradient(135deg,#ff758c,#ff7eb3)"
            icon={<i className="bi bi-cash-stack"></i>}
          />
        </div>

    
        <div className="row mt-4 g-4">
          <div className="col-lg-8 col-12">
            <div className="card chart-card">
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Orders",
                      data: ordersByDay,
                      borderColor: "#0d6efd",
                      backgroundColor: "rgba(13,110,253,0.2)",
                      fill: true,
                      tension: 0.4,
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <div className="card chart-card">
              <Doughnut
                data={{
                  labels: ["Pending", "Delivered", "Cancelled"],
                  datasets: [
                    {
                      data: [
                        pending,
                        delivered.length,
                        orders.length - delivered.length - pending,
                      ],
                      backgroundColor: ["#ffc107", "#198754", "#dc3545"],
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
