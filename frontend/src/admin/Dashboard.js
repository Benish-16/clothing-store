import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import dayjs from "dayjs";
import '../App.css';
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
      className="card bg-white shadow-sm mb-3"
      style={{ borderLeft: `5px solid ${color}`, minHeight: "120px" }}
    >
      <div className="card-body d-flex align-items-center justify-content-between">
        <div>
          <h6 className="mb-1 text-dark">{title}</h6>
          <h4 className="mb-1 text-dark">{value}</h4>
          {subtitle && <small className="text-muted">{subtitle}</small>}
        </div>
        {icon && <div>{icon}</div>}
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "https://clothing-store-backc-p6nl.onrender.com/api/order/all"
      );
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 60000);
    return () => clearInterval(interval);
  }, []);

  const today = dayjs().startOf("day");
  const deliveredOrders = orders.filter((o) => o.orderStatus === "Delivered");
  const totalRevenue = deliveredOrders.reduce(
    (sum, o) => sum + Number(o.total || 0),
    0
  );
  const todaysSales = orders
    .filter(
      (o) =>
        o.orderStatus !== "Cancelled" &&
        dayjs(o.createdAt).startOf("day").isSame(today)
    )
    .reduce((sum, o) => sum + Number(o.total || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === "Pending")
    .length;

  const ordersByDay = Array(7).fill(0);
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    labels.push(dayjs().subtract(i, "day").format("ddd"));
  }
  orders.forEach((o) => {
    const orderDate = dayjs(o.createdAt).startOf("day");
    const diff = today.diff(orderDate, "day");
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
        tension: 0.4,
        fill: true,
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
          orders.filter((o) => o.orderStatus === "Cancelled").length,
        ],
        backgroundColor: ["#ffc107", "#198754", "#dc3545"],
      },
    ],
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading dashboard...</p>
      </div>
    );

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
 
      <nav
        className={`bg-dark text-white p-3 flex-shrink-0 sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="d-flex justify-content-between align-items-center mb-3 d-md-none">
          <h4>Menu</h4>
          <button
            className="btn btn-light btn-sm"
            onClick={() => setSidebarOpen(false)}
          >
            &times;
          </button>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/" className="nav-link text-white">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </Link>
          </li>
          <li className="nav-item dropdown mb-2">
            <a
              className="nav-link dropdown-toggle text-white"
              href="#"
              id="productsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-bag-fill me-2"></i>Products
            </a>
            <ul className="dropdown-menu" aria-labelledby="productsDropdown">
              <li>
                <Link className="dropdown-item" to="/men">
                  Men
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/women">
                  Women
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item mb-2">
            <Link to="/Customerview" className="nav-link text-white">
              <i className="bi bi-people-fill me-2"></i>Customers
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/Contactview" className="nav-link text-white">
              <i className="bi bi-envelope-fill me-2"></i>Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Hamburger */}
      <div className="d-md-none bg-dark p-2">
        <button
          className="btn btn-outline-light"
          onClick={() => setSidebarOpen(true)}
        >
          &#9776; Menu
        </button>
      </div>

   
      <div className="flex-grow-1 p-3" style={{ marginLeft: "0" }}>
        <h2 className="mb-4 d-none d-md-block">Dashboard</h2>

    
        <div className="row g-3">
          <StatCard
            icon={
              <i
                className="bi bi-currency-rupee"
                style={{ fontSize: "2.5rem", color: "#0d6efd" }}
              />
            }
            title="Today's Sales"
            value={`₹${todaysSales}`}
            color="#0d6efd"
            subtitle="Compared to yesterday"
          />
          <StatCard
            icon={
              <i
                className="bi bi-card-checklist"
                style={{ fontSize: "2.5rem", color: "#6f42c1" }}
              />
            }
            title="Total Orders"
            value={totalOrders}
            color="#6f42c1"
            subtitle="All time"
          />
          <StatCard
            icon={
              <i
                className="bi bi-hourglass-split"
                style={{ fontSize: "2.5rem", color: "#ffc107" }}
              />
            }
            title="Pending Orders"
            value={pendingOrders}
            color="#ffc107"
          />
          <StatCard
            icon={
              <i
                className="bi bi-cash-stack"
                style={{ fontSize: "2.5rem", color: "#198754" }}
              />
            }
            title="Total Revenue"
            value={`₹${totalRevenue}`}
            color="#198754"
            subtitle="Delivered orders only"
          />
        </div>

        {/* Charts */}
        <div className="row g-4 mt-4">
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <h5>Orders (Last 7 Days)</h5>
                </div>
                <Line data={ordersLineChart} />
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <h5>Order Status</h5>
                </div>
                <Doughnut data={statusChart} />
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 250px;
          z-index: 1000;
          overflow-y: auto;
          transition: transform 0.3s ease-in-out;
        }
        .sidebar.open {
          transform: translateX(0);
        }
        @media (max-width: 767px) {
          .sidebar {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
