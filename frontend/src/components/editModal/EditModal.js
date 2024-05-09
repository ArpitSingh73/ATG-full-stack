import React, { useRef, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../context/context";
function EditModal({ ref2, singlePost }) {
    const { myPosts, setMyPosts } = useContext(ThemeContext);

  const refClose = useRef(null);
const [finalPost, setFinalPost] = useState(singlePost.post);

  const handleChange = (e) => {
    console.log(e.target.value);
    setFinalPost(e.target.value)
}


  const handelEditPost = async () => {
    const _id = singlePost._id;
    const post = singlePost.post;
    try {
      // console.log(singlePost)
      // console.log(myPosts)
      const response = await fetch("http://localhost:5000/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, finalPost }),
      });

      const json = await response.json();
      setMyPosts(...myPosts, myPosts.map((post) => {
        
        if (post._id === _id) { 
         return  post.post = finalPost
        }
      }))
      console.log(myPosts)
      // console.log(json);
          // return finalPost;

    } catch (error) {
      console.log(error);
    }

    refClose.current.click();
    return finalPost
  };

  return (
    <>
      <div className="container">
        {" "}
        <button
          ref={ref2}
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
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Post
              </h5>
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
                  Edit post
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="post"
                  value={finalPost || singlePost.post}
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
                onClick={handelEditPost}
                type="button"
                className="btn btn-primary"
                style={{ boxShadow: "3px 3px 2px " }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditModal;
