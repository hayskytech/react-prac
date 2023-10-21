import React, { createContext, useState } from 'react'
import Child1 from './Child1'

export const ThemeContext = createContext('defaultValue')
export default function Context() {
  const [theme, settheme] = useState(null)
  const [data, setdata] = useState(null)
  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <Child1 />
        <input type="text" defaultValue={`hai hello`} value={data?.name} />
        <button onClick={() => { setdata({ name: 'jjj' }) }}> JJJ </button>
      </ThemeContext.Provider>
    </div>
  )
}
