import React, { useEffect, useState, useRef } from "react";

import Post from "../Post/Post";
import CommentModal from "../commentModal/CommentModal";
function Home() {
  const [allPosts, setAllPosts] = useState([]);

  const [commentPostId, setCommentPostId] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  // const[modal1 ,setModal1] = useState(false)
  // const[modal2 ,setModal2] = useState(false)
  const ref1 = useRef(null);

  useEffect(() => {
    const myPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/allPost", {
          method: "GET",
          headers: {  
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();
        console.log(json.allPosts);
        setAllPosts(json.allPosts);
      } catch (error) {}
    };

    myPosts();
  }, []);

  const handelComment =  (postId) => {
    setCommentPostId(postId);
    // console.log("1234")
    ref1.current.click();
 
    
   
  };

  return (
    <>
      <CommentModal ref1={ref1} commentPostId={commentPostId}></CommentModal>

      <div
        className=" container  "
        // style={{ padding: "10%" }}
      ></div>

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>All posts</h2>
      <div
        className="container d-flex flex-wrap  justify-content-evenly"
        style={{
          // backgroundColor: "red",
          minHeight: "400px",
          marginTop: "30px",
        }}
      >
        {user ? (
          allPosts.length > 0 ? (
            allPosts.map((post, i) => {
              {
                /* console.log(post); */
              }
              return (
                post.user !== user.user._id && (
                  <Post
                    post={post}
                    postId={post._id}
                    key={i}
                    user={user.user._id}
                    handelComment={handelComment}
                    // handleEditPost={handleEditPost}
                    // setModal1={setModal1}
                    // setModal2={setModal2}
                  ></Post>
                )
              );
            })
          ) : (
            <div>Why don't you post.....?</div>
          )
        ) : (
          <div>unauthentictaaed......</div>
        )}
      </div>
    </>
  );
}

export default Home;
