interface NoteAvatarProps {
  image: string;
  name: string;
  note?: string;
  isOwn?: boolean;
}

const NoteAvatar = ({ image, name, note, isOwn = false }: NoteAvatarProps) => {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[80px]">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-[72px] h-[72px] rounded-full object-cover"
        />
        {note && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-muted rounded-full px-2.5 py-1.5 max-w-[90px]">
            <p className="text-xs text-foreground text-center leading-tight truncate">
              {note}
            </p>
          </div>
        )}
      </div>
      <span className="text-xs text-foreground truncate max-w-[80px]">{name}</span>
    </div>
  );
};

export default NoteAvatar;
