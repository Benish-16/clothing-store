import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "../App.css";
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

const StatCard = ({ title, value, color, icon, subtitle }) => (
  <div className="col-12 col-sm-6 col-md-3">
    <div
      className="card bg-white shadow-sm"
      style={{ borderLeft: `5px solid ${color}`, minHeight: "120px" }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="text-dark mb-1">{title}</h6>
          <h4 className="text-dark mb-0">{value}</h4>
          {subtitle && <small className="text-muted">{subtitle}</small>}
        </div>
        {icon}
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    closeSidebar();
    navigate("/login");
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "https://clothing-store-backc-p6nl.onrender.com/api/order/all"
      );
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const today = dayjs().startOf("day");
  const deliveredOrders = orders.filter(o => o.orderStatus === "Delivered");
  const pendingOrders = orders.filter(o => o.orderStatus === "Pending").length;

  const totalRevenue = deliveredOrders.reduce(
    (sum, o) => sum + Number(o.total || 0),
    0
  );

  const todaysSales = orders
    .filter(
      o =>
        o.orderStatus !== "Cancelled" &&
        dayjs(o.createdAt).startOf("day").isSame(today)
    )
    .reduce((sum, o) => sum + Number(o.total || 0), 0);

  const ordersByDay = Array(7).fill(0);
  const labels = [];

  for (let i = 6; i >= 0; i--) {
    labels.push(dayjs().subtract(i, "day").format("ddd"));
  }

  orders.forEach(o => {
    const diff = today.diff(dayjs(o.createdAt).startOf("day"), "day");
    if (diff >= 0 && diff < 7) ordersByDay[6 - diff]++;
  });

  const ordersLineChart = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: ordersByDay,
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.15)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const statusChart = {
    labels: ["Pending", "Delivered", "Cancelled"],
    datasets: [
      {
        data: [
          pendingOrders,
          deliveredOrders.length,
          orders.filter(o => o.orderStatus === "Cancelled").length,
        ],
        backgroundColor: ["#ffc107", "#198754", "#dc3545"],
      },
    ],
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
      </div>
    );

  return (
    <div className="dashboard-wrapper">

  
      {sidebarOpen && (
        <div className="sidebar-backdrop d-md-none" onClick={closeSidebar} />
      )}


      <nav className={`sidebar bg-light text-dark ${sidebarOpen ? "open" : ""}`}>
    
        <div className="d-flex justify-content-between align-items-center mb-3 d-md-none">
          <h5 className="mb-0 text-dark">Menu</h5>
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={closeSidebar}
          >
            ✕
          </button>
        </div>

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" onClick={closeSidebar} className="nav-link text-dark">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/men" onClick={closeSidebar} className="nav-link text-dark">
              Men Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/women" onClick={closeSidebar} className="nav-link text-dark">
              Women Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Customerview" onClick={closeSidebar} className="nav-link text-dark">
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Contactview" onClick={closeSidebar} className="nav-link text-dark">
              Contact
            </Link>
          </li>
        </ul>

     
        <div className="d-md-none mt-4">
          {!token ? (
            <>
              <Link
                to="/login"
                onClick={closeSidebar}
                className="btn btn-outline-dark w-100 mb-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeSidebar}
                className="btn btn-dark w-100"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              className="btn btn-outline-dark w-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

  
      <div className="d-md-none p-2 bg-light border-bottom">
        <button
          className="btn btn-outline-dark"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>
      </div>

 
      <main className="content">
        <h3 className="mb-4">Dashboard</h3>

        <div className="row g-3">
          <StatCard title="Today's Sales" value={`₹${todaysSales}`} color="#0d6efd"
            icon={<i className="bi bi-currency-rupee fs-2 text-primary" />} />
          <StatCard title="Total Orders" value={orders.length} color="#6f42c1"
            icon={<i className="bi bi-card-checklist fs-2" />} />
          <StatCard title="Pending Orders" value={pendingOrders} color="#ffc107"
            icon={<i className="bi bi-hourglass fs-2 text-warning" />} />
          <StatCard title="Revenue" value={`₹${totalRevenue}`} color="#198754"
            icon={<i className="bi bi-cash-stack fs-2 text-success" />} />
        </div>

        <div className="row mt-4 g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <Line data={ordersLineChart} />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <Doughnut data={statusChart} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
      .sidebar {
  width: min(80vw, 260px);
  height: 100dvh;
  position: fixed;
  left: 0;
  top: 0;
  padding: 1rem;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1050;
  overflow-y: auto;
}

.sidebar.open {
  transform: translateX(0);
}

@media (max-width: 767px) {
  .content {
    margin-left: 0;
  }
}

      `}</style>
    </div>
  );
}
