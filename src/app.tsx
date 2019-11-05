import React from 'react'
import { render } from 'react-dom'

const root = document.getElementById('app')

if (root) {
  render(
    <div>hello world</div>,
    root,
  )
}