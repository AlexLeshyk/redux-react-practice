import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectUserNameById } from "../../store/slices/usersSlice";
// import styles from "./styles.module.scss";

interface PostAuthorProps {
  userId: string;
}
export const PostAuthor: FC<PostAuthorProps> = ({ userId }) => {
  const author = useSelector((state: RootState) => selectUserNameById(state, userId));

  return <span className="author">by {author ? author.name : "Unknown author"}</span>;
};
