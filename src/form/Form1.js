import React from 'react'

export default function Form1() {
  function handleform(e) {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    // you cam send formData to API also
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }
  return (
    <div>
      <form onSubmit={handleform}>
        <label htmlFor="">
          <input type="text" name="fname" id="" />
        </label>
        <button>OK</button>
      </form>

    </div>
  )
}
