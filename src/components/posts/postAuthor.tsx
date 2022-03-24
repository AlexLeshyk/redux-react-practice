import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface PostAuthorProps {
  userId: string;
}
export const PostAuthor: FC<PostAuthorProps> = ({ userId }) => {
  const author = useSelector((state: RootState) =>
    state.user.users.find((user) => user.id === Number(userId))
  );

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
