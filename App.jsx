import React, { useState } from "react";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const addNotification = () => {
    if (!type || !message) {
      alert("Please fill all fields");
      return;
    }

    const notification = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toISOString(),
    };

    console.info("Notification Created", notification);

    setNotifications([notification, ...notifications]);

    setType("");
    setMessage("");
  };

  const deleteNotification = (id) => {
    console.info("Notification Deleted", id);

    setNotifications(
      notifications.filter((item) => item.id !== id)
    );
  };

  const filteredNotifications = notifications.filter(
    (item) =>
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>Campus Notification </h1>

      <h3>Total Notifications: {notifications.length}</h3>

      <hr />

      <h2>Create Notification</h2>

      <input
        type="text"
        placeholder="Type (Academic/Event/Placement)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <textarea
        placeholder="Enter Notification Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          height: "80px",
        }}
      />

      <br />
      <br />

      <button
        onClick={addNotification}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Send Notification
      </button>

      <hr />

      <h2>Search Notifications</h2>

      <input
        type="text"
        placeholder="Search by Type or Message"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
        }}
      />

      <hr />

      <h2>Notifications</h2>

      {filteredNotifications.length === 0 ? (
        <p>No Notifications Available</p>
      ) : (
        filteredNotifications.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{item.type}</h3>

            <p>
              <strong>Message:</strong> {item.message}
            </p>

            <p>
              <strong>ID:</strong> {item.id}
            </p>

            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(item.timestamp).toLocaleString()}
            </p>

            <button
              onClick={() => deleteNotification(item.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 15px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;