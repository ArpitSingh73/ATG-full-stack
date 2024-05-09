import React, { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../context/context";
function Post({
  post,
  user,
  handelComment,
  handleEditPost,
  postId,
  // setModal1,
  // setModal2,
}) {
  const { myPosts, setMyPosts, comments } = useContext(ThemeContext);

  const [likes, setLikes] = useState(post.likes ? NaN : 0);

  const handleDeletePost = async () => {
    const _id = post._id;
    try {
      //  console.log(finalPost);
      const response = await fetch("http://localhost:5000/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      const json = await response.json();
      setMyPosts(myPosts.filter((post) => post._id !== _id));

      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLikePost = async () => {
    const _id = post._id;
    try {
      //  console.log(finalPost);
      const response = await fetch("http://localhost:5000/like", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      const json = await response.json();
      setLikes((old) => old + 1);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <>
        <div className="card" style={{ width: "350px", margin: "5px" }}>
          <div className="card-body">
            <h5 className="card-title">Post</h5>
            <p className="card-text">{post.post}</p>

            {user === post.user ? (
              <>
                <button
                  style={{ marginRight: "6px" }}
                  className="btn btn-primary"
                  onClick={() => {
                    // setModal2(true);
                    handleEditPost(post);
                  }}
                >
                  Edit
                </button>
                <button className="btn btn-primary" onClick={handleDeletePost}>
                  Delete
                </button>{" "}
              </>
            ) : (
              <>
                <button
                  style={{ marginRight: "6px" }}
                  className="btn btn-primary"
                  onClick={handleLikePost}
                >
                  {likes} Like
                </button>
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    // setModal1(true);
                   handelComment(postId);
                      
                  }}
                >
                  {comments} Comment
                </button>
              </>
            )}
          </div>
        </div>
      </>
    </div>
  );
}

export default Post;
