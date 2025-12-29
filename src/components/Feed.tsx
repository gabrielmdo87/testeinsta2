import Post from "./Post";
import avatarPost from "@/assets/avatar-post.jpg";
import avatarUser2 from "@/assets/avatar-user2.jpg";
import avatarUser3 from "@/assets/avatar-user3.jpg";
import postImage from "@/assets/post-image.jpg";
import post2 from "@/assets/post2.jpg";
import post3 from "@/assets/post3.jpg";
import post4 from "@/assets/post4.jpg";

const posts = [
  {
    id: 1,
    avatar: avatarPost,
    username: "bel*****",
    image: postImage,
    likes: 1243,
    caption: "Perigo 🔥",
  },
  {
    id: 2,
    avatar: avatarUser2,
    username: "car*****",
    image: post2,
    likes: 856,
    caption: "Pôr do sol perfeito 🌅",
  },
  {
    id: 3,
    avatar: avatarUser3,
    username: "luc*****",
    image: post3,
    likes: 2104,
    caption: "Night vibes 🌃",
  },
  {
    id: 4,
    avatar: avatarPost,
    username: "gou*****",
    image: post4,
    likes: 543,
    caption: "Jantar especial ✨",
  },
];

const Feed = () => {
  return (
    <div className="pb-4">
      {posts.map((post) => (
        <Post
          key={post.id}
          avatar={post.avatar}
          username={post.username}
          image={post.image}
          likes={post.likes}
          caption={post.caption}
        />
      ))}
    </div>
  );
};

export default Feed;
