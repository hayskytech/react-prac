import React, { useContext } from 'react'
import { ThemeContext } from './Context';


export default function Child1() {
  const theme = useContext(ThemeContext);

  return (
    <div>
      this is {theme}
    </div>
  )
}
