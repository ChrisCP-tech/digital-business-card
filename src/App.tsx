import { useState, useEffect } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import PublicCard from './components/PublicCard'
import AdminApp from './components/admin/AdminApp'
import type { CardData } from './types'
import seedData from './card-data.json'

function PublicCardLoader() {
  const [data, setData] = useState<CardData>(seedData as CardData)

  useEffect(() => {
    fetch('./card-data.json?t=' + Date.now())
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
  }, [])

  return <PublicCard data={data} />
}

const router = createHashRouter([
  {
    path: '/',
    element: <PublicCardLoader />,
  },
  {
    path: '/admin',
    element: <AdminApp />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
