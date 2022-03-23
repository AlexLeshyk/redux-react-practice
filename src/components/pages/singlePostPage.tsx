import { FC } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../store";

const SinglePostPage: FC = () => {
  const match = useParams();
  const { postId } = match;

  const post = useSelector((state: RootState) => state.posts.find((post) => post.id === postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button button__main">
          <div className="inner">Edit Post</div>
        </Link>
      </article>
    </section>
  );
};

export default SinglePostPage;
