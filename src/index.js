import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/todo-app'

const container = document.getElementById('root')

const root = createRoot(container)

root.render(<App />)
