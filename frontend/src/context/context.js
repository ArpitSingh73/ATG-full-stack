import React, { createContext, useState } from "react";

export const ThemeContext = createContext();
 export const ThemeProvider = ({ children }) => {

     const [allOtherPosts, setAllOtherPosts] = useState([])
     const [myPosts, setMyPosts] = useState([])
   const [postsContext, setPostsContext] = useState([])
   
  const [comments, setComments] = useState(0);

   return (
     <ThemeContext.Provider
       value={{
         postsContext,
         setPostsContext,
         myPosts,
         setMyPosts,
         allOtherPosts,
         setAllOtherPosts,
         comments,
         setComments,
       }}
     >
       {children}
     </ThemeContext.Provider>
   );
 };