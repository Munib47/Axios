import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const post = async () => {
    const resp = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const data = resp.data;
    setData(data)
    // console.log(data)
  };

  useEffect(() => {
    post()
  }, [])
  console.log(data) //Use state

  const handleDelete = (id, e) => {
    e.preventDefault();
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => console.log('Deleted', res))
    .catch(err => console.log(err))
    localStorage.removeItem("title")
    localStorage.removeItem("body")
  }

  const postData = () => {
    // e.preventDefault();
    // axios.post('https://jsonplaceholder.typicode.com/posts', {
    //   title,
    //   body
    // }).then (res => console.log('Posting data', res)).catch(err => console.log(err))
    // localStorage.setItem("title", JSON.stringify(title))
    // localStorage.setItem("body", JSON.stringify(body))
    let tBody = document.getElementById('tbody')
    let row = document.createElement('tr')
    row.innerHTML = `
      <td>${title}</td>
      <td>${body}</td>
      <td><button className="del">Delete</button></td>
    `
    tBody.appendChild(row)
  }

  return (
    <div>
      <div className="container">
        <div className="div">
          <form onSubmit={postData}>
            <lablel htmlFor="title">Title</lablel>
            <input type="text" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label htmlFor="body">Body</label>
            <input type="text" id="body" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} />
          </form>
          <button className="btn" onClick={postData}>Add</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {/* <tr onChange={postData}>
            <td> {localStorage.getItem("title")} </td>
            <td> {localStorage.getItem("body")} </td>
            <td><button className="del" onClick={(e) => handleDelete(data.id, e)}>Delete</button></td>
          </tr> */}
          {
            data.map((p) => {
              return (
                <tr>
                  <td>{p.title}</td>
                  <td>{p.body}</td>
                  <td><button className="del" onClick={(e) => handleDelete(data.id, e)}>Delete</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
