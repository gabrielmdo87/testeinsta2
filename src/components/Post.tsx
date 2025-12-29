import { MoreHorizontal, Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import avatarMain from "@/assets/avatar-main.jpg";
import postImage from "@/assets/post-image.jpg";

interface PostProps {
  avatar: string;
  username: string;
  image: string;
  likes?: number;
  caption?: string;
  onCommentClick?: () => void;
}

const Post = ({ avatar, username, image, likes = 0, caption, onCommentClick }: PostProps) => {
  return (
    <article className="border-b border-border/20">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={username}
            className="w-9 h-9 rounded-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = avatarMain;
            }}
          />
          <span className="text-sm font-medium text-foreground">{username}</span>
        </div>
        <button className="text-foreground p-1">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative w-full">
        <img
          src={image}
          alt="Post content"
          className="w-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = postImage;
          }}
        />
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button className="text-foreground">
              <Heart className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button className="text-foreground" onClick={onCommentClick}>
              <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button className="text-foreground">
              <Send className="w-6 h-6 -rotate-12" strokeWidth={1.5} />
            </button>
          </div>
          <button className="text-foreground">
            <Bookmark className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
        {likes > 0 && (
          <p className="text-sm font-semibold text-foreground mb-1">
            {likes.toLocaleString()} curtidas
          </p>
        )}
        {caption && (
          <p className="text-sm text-foreground">
            <span className="font-semibold">{username}</span> {caption}
          </p>
        )}
        {/* Ver comentários link */}
        <button 
          onClick={onCommentClick}
          className="text-sm text-muted-foreground mt-1"
        >
          Ver todos os comentários
        </button>
      </div>
    </article>
  );
};

export default Post;
