import { BrowserRouter } from 'react-router-dom'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './gallery-design.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = <BrowserRouter><App /></BrowserRouter>
if (root.hasAttribute('data-prerendered')) hydrateRoot(root, app)
else createRoot(root).render(app)
