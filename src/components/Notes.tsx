import NoteAvatar from "./NoteAvatar";
import { useAppContext } from "@/contexts/AppContext";
import avatarMain from "@/assets/avatar-main.jpg";

const noteTexts = [
  "Preguiça Hoje 😭😭",
  "🎵 (Ao Vivo)",
  "O vontade... 🔥",
  "Saudades 💕",
  "Festinha hj 🎉",
  "Tô on 😏",
  "Entediada...",
  "🥱🥱🥱",
];

const Notes = () => {
  const { profileData, similarAccounts } = useAppContext();

  // Build notes from real data
  const notes = [
    { 
      id: "own", 
      image: profileData?.avatar || avatarMain, 
      name: "Sua nota", 
      isOwn: true, 
      note: "Conte as n..." 
    },
    ...similarAccounts.slice(0, 7).map((account, index) => ({
      id: account.id,
      image: account.avatar,
      name: account.censoredName,
      note: noteTexts[index % noteTexts.length],
      isOwn: false,
    }))
  ];

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
