const SearchBar = () => {
  return (
    <div className="px-4 py-2">
      <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-2.5">
        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <span className="text-muted-foreground text-sm">
          Interaja com a Meta AI ou pesquise
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
