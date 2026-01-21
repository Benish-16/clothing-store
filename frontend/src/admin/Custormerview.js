import React, { useEffect, useState } from "react";

const STATUS_CLASSES = {
  Pending: "badge bg-warning text-dark",
  Delivered: "badge bg-success",
  Cancelled: "badge bg-danger",
};

export default function Customerview() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://clothing-store-backc-p6nl.onrender.com/api/order/all");
      const data = await res.json();
      if (data.success) setOrders(data.orders);
      else setOrders([]);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
   
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

   
    try {
      await fetch(`https://clothing-store-backc-p6nl.onrender.com/api/order/updatestatus/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || order.orderStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Admin Orders Dashboard</h2>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="col-md-3 mb-2 text-end">
          <button className="btn btn-primary" onClick={fetchOrders}>
            Refresh
          </button>
        </div>
      </div>

  
      {loading ? (
        <div className="text-center fs-5">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center fs-5 text-muted">No orders present.</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center fs-5 text-muted">
          No orders match your search or filter.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Items</th>
                <th>Total (₹)</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>
                    {order.customer.firstName} {order.customer.lastName}
                  </td>
                  <td>{order.customer.email}</td>
                  <td>{order.customer.phone}</td>
                  <td>
                    {order.cartItems.map((item, idx) => (
                      <div key={idx}>
                        {item.name} ({item.variant.color}, {item.size}) x{" "}
                        {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>{order.total}</td>
                  <td className="text-center">
                    <span className={STATUS_CLASSES[order.orderStatus]}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
