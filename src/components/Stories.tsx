import StoryAvatar from "./StoryAvatar";
import { useAppContext } from "@/contexts/AppContext";
import avatarMain from "@/assets/avatar-main.jpg";

const Stories = () => {
  const { profileData, similarAccounts } = useAppContext();

  // Build stories from context data
  const stories = [
    { 
      id: "own", 
      image: profileData?.avatar || avatarMain, 
      name: "Seu story", 
      isOwn: true, 
      hasStory: false 
    },
    ...similarAccounts.map((account) => ({
      id: account.id,
      image: account.avatar,
      name: account.censoredName,
      isOwn: false,
      hasStory: account.hasStory,
    }))
  ];

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
          />
        ))}
      </div>
    </div>
  );
};

export default Stories;
