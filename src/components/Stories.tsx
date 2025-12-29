import StoryAvatar from "./StoryAvatar";
import { useAppContext } from "@/contexts/AppContext";
import avatarMain from "@/assets/avatar-main.jpg";

const Stories = () => {
  const { profileData, similarAccounts } = useAppContext();

  // Build stories from context data with mixed ring colors
  const stories = [
    { 
      id: "own", 
      image: profileData?.avatar || avatarMain, 
      name: "Seu story", 
      isOwn: true, 
      hasStory: false,
      isCloseFriend: false,
    },
    ...similarAccounts.map((account, index) => ({
      id: account.id,
      image: account.avatar,
      name: account.censoredName,
      isOwn: false,
      hasStory: account.hasStory,
      // First two stories are close friends (green), rest are regular (instagram gradient)
      isCloseFriend: index < 2,
    }))
  ];

  // If no similar accounts, show a message
  const hasAccounts = similarAccounts.length > 0;

  return (
    <div
      className="px-3 py-3 overflow-x-auto scrollbar-hide"
      style={{
        WebkitOverflowScrolling: 'touch',
        overscrollBehaviorX: 'contain'
      }}
    >
      <div className="flex gap-2" style={{ width: 'max-content' }}>
        {stories.map((story) => (
          <StoryAvatar
            key={story.id}
            image={story.image}
            name={story.name}
            isOwn={story.isOwn}
            hasStory={story.hasStory}
            isCloseFriend={story.isCloseFriend}
          />
        ))}
        {!hasAccounts && (
          <div className="flex items-center justify-center px-4 text-muted-foreground text-sm">
            Nenhuma conta relacionada encontrada
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
