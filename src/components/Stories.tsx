import StoryAvatar from "./StoryAvatar";
import avatarMain from "@/assets/avatar-main.jpg";
import avatarStory1 from "@/assets/avatar-story1.jpg";
import avatarStory2 from "@/assets/avatar-story2.jpg";
import avatarStory3 from "@/assets/avatar-story3.jpg";
import avatarStory4 from "@/assets/avatar-story4.jpg";
import avatarStory5 from "@/assets/avatar-story5.jpg";
import avatarStory6 from "@/assets/avatar-story6.jpg";

const stories = [
  { id: 1, image: avatarMain, name: "Seu story", isOwn: true, hasStory: false },
  { id: 2, image: avatarStory1, name: "Cai*****", hasStory: true },
  { id: 3, image: avatarStory2, name: "Eri*****", hasStory: true },
  { id: 4, image: avatarStory3, name: "ANT*****", hasStory: true },
  { id: 5, image: avatarStory4, name: "Mar*****", hasStory: true },
  { id: 6, image: avatarStory5, name: "Jul*****", hasStory: true },
  { id: 7, image: avatarStory6, name: "Gru*****", hasStory: true },
];

const Stories = () => {
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
