import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectUserNameById } from "../../store/slices/usersSlice";

interface PostAuthorProps {
  userId: string;
}
export const PostAuthor: FC<PostAuthorProps> = ({ userId }) => {
  const author = useSelector((state: RootState) => selectUserNameById(state, userId));

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
