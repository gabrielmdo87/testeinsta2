import { useState } from "react";
import Post from "./Post";
import VIPModal from "./VIPModal";
import { useAppContext } from "@/contexts/AppContext";
import { Crown } from "lucide-react";

interface FeedProps {
  onVIPClick?: () => void;
}

const Feed = ({ onVIPClick }: FeedProps) => {
  const { posts } = useAppContext();
  const [showVIPModal, setShowVIPModal] = useState(false);
  const [vipFeature, setVipFeature] = useState("");

  // Show only first 10 posts
  const visiblePosts = posts.slice(0, 10);

  const handleVIPAction = (feature: string) => {
    setVipFeature(feature);
    setShowVIPModal(true);
  };

  const handleCommentClick = () => handleVIPAction("aos comentários desta publicação");
  const handleLikeClick = () => handleVIPAction("a curtir publicações");
  const handleShareClick = () => handleVIPAction("a compartilhar publicações");
  const handleSaveClick = () => handleVIPAction("a salvar publicações");
  const handleViewMoreClick = () => handleVIPAction("a mais publicações");

  return (
    <div className="pb-4">
      {visiblePosts.map((post) => (
        <Post
          key={post.id}
          avatar={post.avatar}
          username={post.censoredName}
          image={post.imageUrl}
          likes={post.likes}
          caption={post.caption}
          onCommentClick={handleCommentClick}
          onLikeClick={handleLikeClick}
          onShareClick={handleShareClick}
          onSaveClick={handleSaveClick}
        />
      ))}

      {/* Banner "Você visualizou tudo" */}
      {posts.length >= 10 && (
        <div className="mx-4 mt-6 mb-4 p-4 rounded-2xl bg-secondary border border-border/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Crown className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Você visualizou tudo!</h3>
              <p className="text-xs text-muted-foreground">Estas são as últimas publicações</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Para visualizar mais publicações e ter acesso completo ao perfil, seja um membro VIP.
          </p>
          <button
            onClick={handleViewMoreClick}
            className="w-full bg-accent hover:bg-accent/90 py-2.5 rounded-xl text-sm font-semibold text-accent-foreground transition-colors"
          >
            Ver mais publicações
          </button>
        </div>
      )}

      <VIPModal
        isOpen={showVIPModal}
        onClose={() => setShowVIPModal(false)}
        feature={vipFeature}
        onViewPlans={onVIPClick}
      />
    </div>
  );
};

export default Feed;
