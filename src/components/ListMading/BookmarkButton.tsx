import { useCallback, useEffect, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { api } from "~/utils/api";

type BookmarkButtonProps = {
  madingId: string;
  bookmarkedByMe: boolean;
  size?: number;
};

const BookmarkButton = ({
  size = 32,
  madingId,
  bookmarkedByMe = false,
}: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarkedByMe);
  const { mutate: toggleBookmark, isPending } =
    api.mading.toggleBookmark.useMutation({
      onSuccess: (res) => {
        setIsBookmarked(res.addedToBookmark);
      },
    });

  useEffect(() => {
    setIsBookmarked(bookmarkedByMe);
  }, [bookmarkedByMe]);

  const handleBookmark = useCallback(() => {
    if (!isPending && madingId) {
      toggleBookmark({ madingId });
    }
  }, [isPending, madingId, toggleBookmark]);

  return (
    <button onClick={handleBookmark} className="grid">
      <MaterialSymbol
        icon="bookmark"
        fill={isBookmarked}
        weight={200}
        grade={0}
        size={size}
      />
    </button>
  );
};

export default BookmarkButton;
