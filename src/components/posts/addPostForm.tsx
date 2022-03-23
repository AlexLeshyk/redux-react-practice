import React, { useState } from "react";

export const AddPostForm = () => {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const [inputValue, setInputValue] = useState<{
    postTitle: string;
    postContent: string;
  }>({
    postContent: "",
    postTitle: "",
  });

  const onInputChanged = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  // const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setInputValue(e.target.value);
  // };

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
          <button type="button">Save Post</button>
        </div>
      </form>
    </section>
  );
};
