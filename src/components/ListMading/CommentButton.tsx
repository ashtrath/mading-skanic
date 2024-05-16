import { MaterialSymbol } from "react-material-symbols";

const CommentButton = () => {
  return (
    <button>
      <MaterialSymbol
        icon="comment"
        fill={false}
        weight={200}
        grade={0}
        size={32}
      />
    </button>
  );
};

export default CommentButton;
