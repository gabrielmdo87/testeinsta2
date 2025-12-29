import Post from "./Post";
import { useAppContext } from "@/contexts/AppContext";

const Feed = () => {
  const { posts } = useAppContext();

  return (
    <div className="pb-4">
      {posts.map((post) => (
        <Post
          key={post.id}
          avatar={post.avatar}
          username={post.censoredName}
          image={post.imageUrl}
          likes={post.likes}
          caption={post.caption}
        />
      ))}
    </div>
  );
};

export default Feed;
