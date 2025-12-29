import NoteAvatar from "./NoteAvatar";
import avatarMain from "@/assets/avatar-main.jpg";
import avatarStory4 from "@/assets/avatar-story4.jpg";
import avatarStory5 from "@/assets/avatar-story5.jpg";
import avatarStory6 from "@/assets/avatar-story6.jpg";

const notes = [
  { id: 1, image: avatarMain, name: "Sua nota", isOwn: true, note: "Conte as novidades" },
  { id: 2, image: avatarStory4, name: "Ana*******", note: "Preguiça Hoje 😭😭" },
  { id: 3, image: avatarStory5, name: "Val*******", note: "🎵 (Ao Vivo)" },
  { id: 4, image: avatarStory6, name: "Swi*******", note: "O vontade fudê a 3 🔥" },
];

const Notes = () => {
  return (
    <div className="px-3 py-3 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2">
        {notes.map((note) => (
          <NoteAvatar
            key={note.id}
            image={note.image}
            name={note.name}
            note={note.note}
            isOwn={note.isOwn}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
