import { createHashRouter, RouterProvider } from 'react-router-dom'
import PublicCard from './components/PublicCard'
import AdminApp from './components/admin/AdminApp'
import cardData from './card-data.json'
import type { CardData } from './types'

const data = cardData as CardData

const router = createHashRouter([
  {
    path: '/',
    element: <PublicCard data={data} />,
  },
  {
    path: '/admin',
    element: <AdminApp />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
