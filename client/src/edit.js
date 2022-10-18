import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = ({ pass }) => {
  let navigate = useNavigate();

  const [state, setState] = useState({
    title: pass.title,
    body: pass.body,
    author: pass.author,
    category: pass.category,
  });
  const { title, body, author, category } = state;

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/editblog/${pass.id}`, {
        title: title,
        body: body,
        author: author,
        category: category,
      })
      .then((response) => {
        alert(response.data);
        navigate("/");
      });
  };
  return (
    <div>
      <h2>Blogger App</h2>
      <div>
        <h3 id="spl">Edit Blog</h3>
      </div>

      <div id="left">
        <form id="main" onSubmit={updateHandler}>
          <div>
            <label htmlFor="title" id="title">
              Title
            </label>
            <br />
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={changeHandler}
              name="title"
            />
          </div>

          <br />
          <div>
            <label htmlFor="body" id="body">
              Body
            </label>
            <br />
            <textarea
              type="text"
              placeholder="Enter body"
              id="body"
              rows="4"
              name="body"
              value={body}
              onChange={changeHandler}
            />
          </div>
          <br />
          <div>
            <label htmlFor="author" id="author">
              Author
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter author"
              id="author"
              name="author"
              value={author}
              onChange={changeHandler}
            />
          </div>
          <br />
          <div>
            <label htmlFor="category" id="category">
              Category
            </label>
            <br />
            <input
              list="list"
              name="category"
              id="category"
              value={category}
              onChange={changeHandler}
              placeholder="Select Category"
            />

            <datalist id="list">
              <option value="Sci-fi" />
              <option value="Business" />
              <option value="Comics" />
              <option value="Education" />
              <option value="History" />
              <option value="Others" />
            </datalist>
          </div>
          <br />
          <button type="submit" name="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
