import React, { useEffect, useState } from "react";

export default function AdminMessage() {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
    const token = localStorage.getItem("token");
  const fetchMessages = async () => {
  try {
    const res = await fetch(
      "https://clothing-store-backc.onrender.com/api/contact/admin/messages",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch messages");

    const data = await res.json();
    setMessages(data.messages);
  } catch (err) {
    console.error(err);
  }
};
useEffect(() => {
  fetchMessages();
}, [token]);


  const sendReply = async (id) => {
      console.log(replyText[id]);
    await fetch(`https://clothing-store-backc.onrender.com/api/contact/admin/messages/reply/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "auth-token": token
        
      },
    
      body: JSON.stringify({ reply: replyText[id]}),
    });

    setReplyText(prev => ({ ...prev, [id]: "" }));
     fetchMessages();

    
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Contact Messages</h2>

      {messages.map((msg) => (
        <div key={msg._id} className="card mb-3">
          <div className="card-body">
            <h5>{msg.fullname} ({msg.email})</h5>
            <p>{msg.message}</p>
            <small>Status: {msg.status}</small>

            {/* If replies exist */}
            {msg.replies && msg.replies.length > 0 ? (
              msg.replies.map((r, i) => (
                <div key={i} className="alert alert-secondary mt-2">
                  <strong>Admin:</strong> {r.message}
                </div>
              ))
            ) : (
              <>
                <p className="text-muted mt-3">
                  <strong>Reply to them</strong>
                </p>

                <textarea
                  className="form-control"
                  placeholder="Type your reply..."
                  value={replyText[msg._id] || ""}
                  onChange={(e) =>
                    setReplyText({
                      ...replyText,
                      [msg._id]: e.target.value,
                  
                      
                    })
                  }
                />

                <button
                  className="btn btn-dark mt-2"
                  onClick={() => sendReply(msg._id)}
                  disabled={!replyText[msg._id]}
                >
                  Reply
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
