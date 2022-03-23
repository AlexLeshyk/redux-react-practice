import { AddPostForm } from "../posts/addPostForm";
import PostsList from "../posts/postLists";

const PostsPage = () => {
  return (
    <div>
      <PostsList />
      <AddPostForm />
    </div>
  );
};

export default PostsPage;
