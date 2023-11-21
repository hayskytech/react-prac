import React, { useState } from 'react'

export default function TodoListMultiField() {
  const [list, setlist] = useState([])

  function additem(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formJson = Object.fromEntries(formData.entries());
    if (list.length) {
      formJson.id = list[list.length - 1].id + 1
    } else {
      formJson.id = 1
    }
    const newList = [...list]
    newList.push(formJson)
    setlist(newList)
  }
  return (
    <div>
      <form onSubmit={additem}>
        <label htmlFor="title">Title:</label>
        <br />
        <input type="text" id="title" name="title" required defaultValue={`hai`} />
        <br />

        <label htmlFor="description">Description:</label>
        <br />
        <textarea id="description" name="description" rows="4" required defaultValue={`hello`}></textarea>
        <br />

        <input type="submit" value="Submit" />
      </form>
      <h2>TodoList Multi Field</h2>
      <table className='ui blue collapsing unstackable table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Description</th>
          </tr>
        </thead>
        {
          list.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <td>{item?.id}</td>
                  <td>{item?.title}</td>
                  <td>{item?.description}</td>
                </tr>
              </React.Fragment>
            )
          })
        }
      </table>
    </div>
  )
}
