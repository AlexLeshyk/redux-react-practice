import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectUserById } from "../../store/slices/usersSlice";
// import styles from "./styles.module.scss";

interface PostAuthorProps {
  userId: string;
}
const PostAuthor: FC<PostAuthorProps> = ({ userId }) => {
  const author = useSelector((state: RootState) => selectUserById(state, userId));

  return <span className="author">by {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
