import { MaterialSymbol } from "react-material-symbols";

type BookmarkButtonProps = {
  onClick: () => void;
  bookmarkedByMe: boolean;
};

const BookmarkButton = ({ onClick, bookmarkedByMe }: BookmarkButtonProps) => {
  return (
    <button onClick={onClick}>
      <MaterialSymbol
        icon="bookmark"
        fill={bookmarkedByMe}
        weight={200}
        grade={0}
        size={32}
      />
    </button>
  );
};

export default BookmarkButton;
