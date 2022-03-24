import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import { postAdded } from "../../store/slices/postsSlice";

export const AddPostForm = () => {
  const [inputValue, setInputValue] = useState<{
    postTitle: string;
    postContent: string;
  }>({
    postContent: "",
    postTitle: "",
  });
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.user.users);

  const onSavePost = () => {
    if (inputValue.postContent && inputValue.postTitle) {
      dispatch(
        postAdded({
          id: nanoid(),
          date: new Date().toISOString(),
          title: inputValue.postTitle,
          content: inputValue.postContent,
          user: userId,
          reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          },
        })
      );
      setInputValue({
        ...inputValue,
        postTitle: "",
        postContent: "",
      });
      setUserId("");
    }
  };

  const canSave =
    Boolean(inputValue.postContent) && Boolean(inputValue.postTitle) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onHandleChanged = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

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
            onChange={onHandleChanged}
          />
        </div>
        <div className="form-control">
          <label htmlFor="postAuthor">Author:</label>
          <select name="postAuthor" id="postAuthor" value={userId} onChange={onAuthorChanged}>
            <option value=""></option>
            {usersOptions}
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={inputValue.postContent}
            onChange={onHandleChanged}
          />
        </div>
        <div className="form-control">
          <button
            type="button"
            className="button button__main"
            onClick={onSavePost}
            disabled={!canSave}
          >
            <div className="inner">Save Post</div>
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
