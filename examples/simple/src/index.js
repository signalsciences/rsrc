import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Cache, Resource } from "rsrc";
import "./index.css";

const User = ({ id, children }) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  return <Resource url={url}>{children}</Resource>;
};

const PostsList = ({ activePostId, onItemClick }) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  return (
    <Resource url={url}>
      {({ state }) => {
        const { value } = state;
        const maxPosts = 5;
        const posts = value ? value.slice(0, maxPosts) : [];
        return (
          <>
            <button
              type="button"
              disabled={activePostId === 1}
              onClick={() => onItemClick(activePostId - 1)}
            >
              Prev
            </button>
            <button
              type="button"
              disabled={activePostId === maxPosts}
              onClick={() => onItemClick(activePostId + 1)}
            >
              Next
            </button>
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <button
                    type="button"
                    className="link"
                    disabled={post.id === activePostId}
                    onClick={() => onItemClick(post.id)}
                  >
                    {post.title}
                  </button>
                </li>
              ))}
            </ul>
          </>
        );
      }}
    </Resource>
  );
};

const Post = ({ id, children }) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  const maxAge = 60 * 60; // 1 hour
  const update = (data) => ({
    // url: "/foo",
    options: {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    },
    invalidates: [url, "https://jsonplaceholder.typicode.com/posts"],
  });
  return (
    <Resource url={url} options={options} maxAge={maxAge} actions={{ update }}>
      {children}
    </Resource>
  );
};

const PostForm = ({ initialState, onSubmit }) => {
  const [title, setTitle] = useState(initialState.title);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />
      <button type="submit">Update title</button>
    </form>
  );
};

const PostDetail = ({ resource }) => {
  const [message, setMessage] = useState("");
  const { state, actions } = resource;
  if (state.pending) return "Loading...";
  if (state.rejected) return "Error";
  const handleSubmit = (data) => {
    actions
      .update(data)
      .then((value) => {
        setMessage(`Success!\n\n${value.title}`);
      })
      .catch((error) => {
        setMessage(`Failed to update.\n\n${error.message}`);
      });
  };
  const post = state.value;
  return (
    <>
      <h1>{post.title}</h1>
      <User id={post.userId}>
        {(userResource) => (
          <b>
            By:{" "}
            {userResource.state.value ? userResource.state.value.name : "..."}
          </b>
        )}
      </User>
      <p>{post.body}</p>
      <hr />
      <PostForm initialState={post} onSubmit={handleSubmit} />
      <div>{message}</div>
    </>
  );
};

const Root = () => {
  const [postId, setPostId] = useState(1);
  return (
    <Cache>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "300px", padding: "24px" }}>
          <PostsList
            activePostId={postId}
            onItemClick={(id) => setPostId(id)}
          />
        </div>
        <div style={{ flex: 1, padding: "24px" }}>
          <Post id={postId}>
            {(resource) => <PostDetail resource={resource} />}
          </Post>
        </div>
      </div>
    </Cache>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
