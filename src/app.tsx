import React from 'react'
import { render } from 'react-dom'

import { AppLayout } from './layout'

const root = document.getElementById('app')

if (!root) {
  throw new Error('The container element is null')
}

render(
  <AppLayout />,
  root,
)