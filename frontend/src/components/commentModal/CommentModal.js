import React, { useRef, useState } from "react";

import { useContext } from "react";
import { ThemeContext } from "../../context/context";
function CommentModal({ ref1, commentPostId }) {
  const refClose = useRef(null);
  const [comment, setComment] = useState("");
  const { setComments } = useContext(ThemeContext);

  const handleChange = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };

  const handleClose = async (e) => {
    const length = 1;
    // try {
    //   const response = await fetch("http://localhost:5000/comment", {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ comment , commentPostId}),
    //   });

    //   const json = await response.json();
    //   console.log(json);
    //   length = json.length;
    //   setComment("")
    // } catch (error) {
    //   console.log(error);
    // }

    refClose.current.click();
    setComment("");
    setComments((old) => old + 1);
    return true;
  };
  return (
    <>
      <div className="container">
        {" "}
        <button
          ref={ref1}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>{" "}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"></h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                {/* <span aria-hidden="true">&times;</span> */}
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Your comment here
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="comment"
                  value={comment}
                  aria-describedby="emailHelp"
                  onChange={handleChange}
                  style={{ boxShadow: "3px 3px 2px " }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ boxShadow: "3px 3px 2px " }}
              >
                Close
              </button>
              <button
                onClick={handleClose}
                type="button"
                className="btn btn-primary"
                style={{ boxShadow: "3px 3px 2px " }}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentModal;
