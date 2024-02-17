import { createContext, useCallback, useContext, useMemo } from "react";
import { usePostState } from "../hooks/usePostState";

const PostContext = createContext();

function PostProvider({ children }) {
  const { posts, setPosts } = usePostState();

  const handleAddPost = useCallback(function(post) {
    setPosts((posts) => [post, ...posts]);
  }, [setPosts]);

  const handleClearPosts = useCallback(function () {
    setPosts([]);
  }, [setPosts])

  const value = useMemo(
    () => ({
      posts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
    }),
    [handleAddPost, handleClearPosts, posts]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

function usePostContext() {
  const context = useContext(PostContext);

  if (context === undefined)
    throw new Error("usePostContext can not be provoked out of provider scope");

  return context;
}

export { PostProvider, usePostContext };
