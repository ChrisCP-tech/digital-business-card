import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import PATLogin from './PATLogin'
import Dashboard from './Dashboard'
import { readCardData } from '../../lib/github'
import type { CardData } from '../../types'

export default function AdminApp() {
  const [pat, setPat] = useState<string | null>(null)
  const [cardData, setCardData] = useState<CardData | null>(null)
  const [sha, setSha] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('gh_pat')
    if (stored) loadDashboard(stored)
  }, [])

  async function loadDashboard(token: string) {
    setLoading(true)
    setLoadError('')
    try {
      const { data, sha: fileSha } = await readCardData(token)
      setPat(token)
      setCardData(data)
      setSha(fileSha)
    } catch (err) {
      console.error(err)
      setLoadError('Failed to load card data. Check your PAT has "public_repo" scope and the repo name is correct.')
      localStorage.removeItem('gh_pat')
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('gh_pat')
    setPat(null)
    setCardData(null)
    setSha('')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--bg]">
        <div className="flex items-center gap-2 text-sm text-[--muted]">
          <Loader2 size={16} className="animate-spin" />
          Loading card data…
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--bg] px-4">
        <div className="text-center max-w-sm">
          <p className="text-sm text-red-500 mb-3">{loadError}</p>
          <button
            onClick={() => setLoadError('')}
            className="text-xs text-[--primary] hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!pat || !cardData) {
    return <PATLogin onAuthenticated={loadDashboard} />
  }

  return (
    <Dashboard
      initialData={cardData}
      sha={sha}
      pat={pat}
      onLogout={handleLogout}
    />
  )
}
