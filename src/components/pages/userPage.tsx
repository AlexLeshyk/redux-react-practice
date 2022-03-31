import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectPostsByUser } from "../../store/slices/postsSlice";
import { selectUserNameById } from "../../store/slices/usersSlice";

const UserPage = () => {
  const match = useParams();
  const { userId = "" } = match;

  const user = useSelector((state: RootState) => selectUserNameById(state, userId));
  const postsForUser = useSelector((state: RootState) => selectPostsByUser(state, userId));

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      {user ? <h2>{user.name}</h2> : null}
      <hr />
      {postTitles && <ul>{postTitles}</ul>}
      <hr />
    </section>
  );
};

export default UserPage;
