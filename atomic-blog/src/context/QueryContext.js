import { createContext, useContext, useMemo } from "react";
import { usePostState } from "../hooks/usePostState";

const QueryContext = createContext();

function QueryProvider({ children }) {
  const { posts, searchQuery, setSearchQuery } = usePostState();

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;
    
  const value = useMemo(
    () => ({
      posts: searchedPosts,
      searchQuery,
      setSearchQuery,
    }),
    [searchQuery, searchedPosts, setSearchQuery]
  );

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
}

function useQueryContext() {
  const context = useContext(QueryContext);

  if (context === undefined)
    throw new Error("useQueryContext can not be provoked out of provider scope");

  return context;
}

export { QueryProvider, useQueryContext };
