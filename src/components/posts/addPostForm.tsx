import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { postAdded } from "../../store/slices/postsSlice";

export const AddPostForm = () => {
  const [inputValue, setInputValue] = useState<{
    postTitle: string;
    postContent: string;
  }>({
    postContent: "",
    postTitle: "",
  });
  const dispatch = useDispatch();

  const onSavePost = () => {
    if (inputValue.postContent && inputValue.postTitle) {
      dispatch(postAdded({ title: inputValue.postContent, content: inputValue.postContent }));
      setInputValue({
        ...inputValue,
        postTitle: "",
        postContent: "",
      });
    }
  };

  const onInputChanged = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <div className="form-control">
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
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
        <div className="form-control">
          <button type="button" className="button button__main" onClick={onSavePost}>
            <div className="inner">Save Post</div>
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
