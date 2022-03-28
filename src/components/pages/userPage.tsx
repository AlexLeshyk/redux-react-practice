import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectAllPosts } from "../../store/slices/postsSlice";
import { selectUserNameById } from "../../store/slices/usersSlice";

const UserPage = () => {
  const match = useParams();
  const { userId } = match;

  const user = useTypedSelector((state) => selectUserNameById(state, userId));

  const postsForUser = useTypedSelector((state) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter((post) => post.user === userId);
  });

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
