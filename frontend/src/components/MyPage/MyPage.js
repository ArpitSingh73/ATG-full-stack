import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import EditModal from "../editModal/EditModal";

import Post from "../Post/Post";
import { useContext } from "react";
import { ThemeContext } from "../../context/context";
function MyPage() {
  const navigate = useNavigate();
  const ref2 = useRef(null);
  const [singlePost, setSinglePost] = useState("");

  const { myPosts, setMyPosts } = useContext(ThemeContext);
  const [allErrors, setAllErrors] = useState({});
  // const [myPosts, setMyPosts] = useState([]);
  const [credentials, setCredentials] = useState({
    post: "",
  });

  const handleEditPost = (post) => {
    console.log(post);
    setSinglePost(post);
    // console.log("56789");
    ref2.current.click();
  };

  let handlePost;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getMyPosts = async () => {
      try {
        const _id = user.user._id;

        const response = await fetch("http://localhost:5000/myPosts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            _id: _id,
          },
        });

        const json = await response.json();
        // console.log(json.myPosts);
        setMyPosts([...myPosts, ...json.myPosts]);
        // console.log(myPosts);
      } catch (error) {}
    };

    getMyPosts();
  }, [handlePost]);

  // function for capturing the input values ------------------------
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // creating a schema for form validation by Yup library --->
  const userSchema = Yup.object({
    post: Yup.string().required("post is required"),
  });

  // function for user data validation --->
  const check = async () => {
    let result = false;
    setAllErrors({});
    try {
      await userSchema.validate(credentials, { abortEarly: false });
      result = true;
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setAllErrors(errors);
      console.log(allErrors);
    }
    return result;
  };

  handlePost = async (e) => {
    e.preventDefault();
    let result = await check();
    if (result) {
      const { post } = credentials;

      try {
        const token = JSON.parse(localStorage.getItem("user"));
        const email = token.user.email;
        const _id = token.user._id;
        document.getElementById("qwerty").reset();

        setCredentials({});
        const response = await fetch("http://localhost:5000/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post, email, _id }),
        });

        const json = await response.json();
        console.log(json);
        setMyPosts([...myPosts, json.postNew]);
        // localStorage.setItem("user", JSON.stringify(json));

        if (json.success) {
          // navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log(myPosts);
  return (
    <>
      {" "}
      <EditModal ref2={ref2} singlePost={singlePost}></EditModal>
      <div
        className=" container  "
        style={{ marginTop: "10px", padding: "10%" }}
      >
        <form id="qwerty">
          <div className="mb-3">
            <label htmlFor="exampleInputText" className="form-label">
              Create a post{" "}
            </label>
            <input
              type="text"
              name="post"
              onChange={handleChange}
              className="form-control"
              id="exampleInputText1"
              aria-describedby="emailHelp"
            />
            {allErrors.post && <div>{allErrors.post}</div>}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handlePost}
          >
            Post
          </button>
        </form>
      </div>
      <div
        className="container d-flex flex-wrap  justify-content-evenly"
        style={{
          // backgroundColor: "red",
          minHeight: "400px",
          marginBottom: "30px",
        }}
      >
        {user ? (
          myPosts.length > 0 ? (
            myPosts.map((post, i) => {
              {
                 console.log(post); 
              }
              return (
                <Post
                  post={post}
                  postId={post._id}
                  key={i}
                  user={user.user._id}
                  handleEditPost={handleEditPost}
                ></Post>
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

export default MyPage;
