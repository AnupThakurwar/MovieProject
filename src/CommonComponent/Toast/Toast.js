import React from "react";
import { FaHeart } from "react-icons/fa";
import "./Toast.scss";

function Toast({ toastData }) {
  return (
    <div>
      <div className="position-fixed top-50 end-0 translate-middle-y p-3 toast-container">
        <div
          id="liveToast"
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <span className="me-2 text-danger">
              <FaHeart />
            </span>
            <strong className="me-auto">Favorite List Notification</strong>
            <small>11 mins ago</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            {toastData.title} is added to Favorite List
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toast;
