import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ConfirmationSentPage.css";

function ConfirmationSentPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const status = queryParams.get("status");

  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (status === "success") {
      setStatusMessage(
        `The confirmation link was sent to: ${email}.Check your mailbox.`
      );
    } else {
      setStatusMessage(
        "There was a problem sending the confirmation e-mail. Please try again later."
      );
    }
  }, [email, status]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{status === "success" ? "Success!" : "Error"}</h2>
      <p style={{ color: status === "success" ? "green" : "red" }}>
        {statusMessage}
      </p>
    </div>
  );
}

export default ConfirmationSentPage;
