import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../../store";

import { postUpdated } from "../../store/slices/postsSlice";

const EditPostForm = () => {
  const match = useParams();
  const { postId } = match;

  const post = useSelector((state: RootState) => state.posts.find((post) => post.id === postId));
  const [inputValue, setInputValue] = useState<{
    postTitle: string | undefined;
    postContent: string | undefined;
  }>({
    postContent: post?.content,
    postTitle: post?.title,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goPostSinglePage = () => navigate(`/posts/${postId}`);

  const onInputChanged = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const onSavePost = () => {
    if (inputValue.postContent && inputValue.postTitle) {
      dispatch(
        postUpdated({ id: postId, title: inputValue.postTitle, content: inputValue.postContent })
      );
      goPostSinglePage();
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <div className="form-control">
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder="What's on your mind?"
            value={inputValue.postTitle}
            onChange={onInputChanged}
          />
        </div>
        <div className="form-control">
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={inputValue.postContent}
            onChange={onInputChanged}
          />
        </div>
      </form>
      <div className="form-control">
        <button type="button" className="button button__main" onClick={onSavePost}>
          <div className="inner">Save Post</div>
        </button>
      </div>
    </section>
  );
};

export default EditPostForm;
