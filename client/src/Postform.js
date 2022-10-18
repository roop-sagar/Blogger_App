import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";

const PostForm = ({ setPass }) => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => setData(response.data));
  }, [data]);

  const [state, setState] = useState({
    title: "",
    body: "",
    author: "",
    category: "",
  });
  const { title, body, author, category } = state;

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/addblog", {
        title: title,
        body: body,
        author: author,
        category: category,
      })
      .then((response) => alert(response.data));
    setState({
      title: "",
      body: "",
      author: "",
      category: "",
    });
  };

  const editHandler = (id) => {
    const editdata = data.filter((elem) => elem._id === id);
    setPass({
      id: id,
      title: editdata[0].title,
      body: editdata[0].body,
      author: editdata[0].author,
      category: editdata[0].category,
    });
    navigate(`/edit/${id}`);
  };

  const delHandler = (id) => {
    axios
      .delete(`http://localhost:5000/deleteblog/${id}`)
      .then((response) => alert(response.data));
  };

  return (
    <div>
      <h2>Blogger App</h2>
      <div>
        <h3 id="spl">New Blog</h3>
        <h3 id="spl2">Blogs</h3>
      </div>

      <div id="left">
        <form id="main" onSubmit={submitHandler}>
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
              required
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
              required
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
              required
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
              required
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
            save
          </button>
        </form>
      </div>

      <div id="right">
        {data.map((get, index) => {
          return (
            <div key={index} id="posts">
              <div id="row">
                <b>{get.title}</b>
              </div>
              <div id="row2">
                {get.body} <br />
                Author: {get.author} <br />
                Category: {get.category}
              </div>

              <div id="row">
                <button id="edit" onClick={() => editHandler(get._id)}>
                  Edit
                </button>
                <button id="del" onClick={() => delHandler(get._id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostForm;
