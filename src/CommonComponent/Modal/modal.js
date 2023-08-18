import React from "react";
import "./modal.scss";

function Modal({
  show,
  title = "Modal title",
  leftbuttonTitle = "Close",
  rightbuttonTitle = "  Save changes",
  renderBody,
  close,
  actionButton,
  isEdit,
  disableAction = false,
}) {
  return (
    <div>
      <div
        className={`modal fade ${show ? "show" : ""}`}
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{renderBody()}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={close}
              >
                {leftbuttonTitle}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={actionButton}
                disabled={disableAction}
              >
                {rightbuttonTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
