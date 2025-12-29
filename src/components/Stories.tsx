import { useState } from "react";
import StoryAvatar from "./StoryAvatar";
import { useAppContext } from "@/contexts/AppContext";
import VIPModal from "./VIPModal";
import avatarMain from "@/assets/avatar-main.jpg";

interface StoriesProps {
  onVIPClick?: () => void;
}

const Stories = ({ onVIPClick }: StoriesProps) => {
  const { profileData, similarAccounts } = useAppContext();
  const [showVIPModal, setShowVIPModal] = useState(false);

  // Build stories from context data
  // 14 reais + 5 bloqueados (3 close friends bloqueados)
  const realStories = similarAccounts.slice(0, 14).map((account, index) => ({
    id: account.id,
    image: account.avatar,
    name: account.censoredName,
    isOwn: false,
    hasStory: account.hasStory,
    isCloseFriend: index < 2,
    isBlocked: false,
  }));

  // 5 blocked stories (últimos 3 são close friends)
  const blockedStories = [
    { id: "blocked1", image: similarAccounts[0]?.avatar || avatarMain, name: "***", isOwn: false, hasStory: true, isCloseFriend: false, isBlocked: true },
    { id: "blocked2", image: similarAccounts[1]?.avatar || avatarMain, name: "***", isOwn: false, hasStory: true, isCloseFriend: false, isBlocked: true },
    { id: "blocked3", image: similarAccounts[2]?.avatar || avatarMain, name: "***", isOwn: false, hasStory: true, isCloseFriend: true, isBlocked: true },
    { id: "blocked4", image: similarAccounts[3]?.avatar || avatarMain, name: "***", isOwn: false, hasStory: true, isCloseFriend: true, isBlocked: true },
    { id: "blocked5", image: similarAccounts[4]?.avatar || avatarMain, name: "***", isOwn: false, hasStory: true, isCloseFriend: true, isBlocked: true },
  ];

  const stories = [
    { 
      id: "own", 
      image: profileData?.avatar || avatarMain, 
      name: "Seu story", 
      isOwn: true, 
      hasStory: false,
      isCloseFriend: false,
      isBlocked: false,
    },
    ...realStories,
    ...blockedStories,
  ];

  const handleStoryClick = (story: typeof stories[0]) => {
    // Todos os stories (exceto o próprio) devem abrir o modal VIP
    if (!story.isOwn) {
      setShowVIPModal(true);
    }
  };

  // If no similar accounts, show a message
  const hasAccounts = similarAccounts.length > 0;

  return (
    <>
      <div
        className="px-3 py-3 overflow-x-auto scrollbar-hide"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorX: 'contain'
        }}
      >
        <div className="flex gap-2" style={{ width: 'max-content' }}>
          {stories.map((story) => (
            <div 
              key={story.id} 
              onClick={() => handleStoryClick(story)}
              className={!story.isOwn ? 'cursor-pointer' : ''}
            >
              <StoryAvatar
                image={story.image}
                name={story.name}
                isOwn={story.isOwn}
                hasStory={story.hasStory}
                isCloseFriend={story.isCloseFriend}
                isBlocked={story.isBlocked}
              />
            </div>
          ))}
          {!hasAccounts && (
            <div className="flex items-center justify-center px-4 text-muted-foreground text-sm">
              Nenhuma conta relacionada encontrada
            </div>
          )}
        </div>
      </div>

      <VIPModal
        isOpen={showVIPModal}
        onClose={() => setShowVIPModal(false)}
        feature="aos stories"
        onViewPlans={onVIPClick}
      />
    </>
  );
};

export default Stories;
