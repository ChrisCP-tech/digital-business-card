import { useState } from 'react'
import { LogOut, Save, Loader2, CheckCircle, AlertCircle, User, Palette, Eye } from 'lucide-react'
import type { CardData } from '../../types'
import ContactForm from './ContactForm'
import SocialLinksEditor from './SocialLinksEditor'
import DesignPanel from './DesignPanel'
import PublicCard from '../PublicCard'
import { writeCardData } from '../../lib/github'

interface Props {
  initialData: CardData
  sha: string
  pat: string
  onLogout: () => void
}

type Tab = 'info' | 'design' | 'preview'

export default function Dashboard({ initialData, sha, pat, onLogout }: Props) {
  const [data, setData] = useState<CardData>(initialData)
  const [currentSha, setCurrentSha] = useState(sha)
  const [tab, setTab] = useState<Tab>('info')
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSave() {
    setSaving(true)
    setSaveStatus('idle')
    try {
      await writeCardData(pat, data, currentSha)
      setSaveStatus('success')
      setCurrentSha(currentSha) // SHA updates server-side; on next save we need the new one
    } catch (err) {
      console.error(err)
      setSaveStatus('error')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveStatus('idle'), 5000)
    }
  }

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'info', label: 'Info', icon: <User size={14} /> },
    { id: 'design', label: 'Design', icon: <Palette size={14} /> },
    { id: 'preview', label: 'Preview', icon: <Eye size={14} /> },
  ]

  return (
    <div className="min-h-screen bg-[--bg] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[--surface] border-b border-[--border] px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-[--fg]">Card Admin</span>
        <div className="flex items-center gap-2">
          {saveStatus === 'success' && (
            <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
              <CheckCircle size={13} />
              Saved! Deploying (~2 min)
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="flex items-center gap-1.5 text-xs text-red-500">
              <AlertCircle size={13} />
              Save failed — check console
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[--primary] text-[--primary-fg] text-xs font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
            Save
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[--border] text-xs text-[--muted] hover:text-[--fg] transition-colors"
          >
            <LogOut size={12} />
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-[--border] bg-[--surface]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 flex-1 justify-center py-2.5 text-xs font-medium transition-colors ${
              tab === t.id
                ? 'text-[--primary] border-b-2 border-[--primary]'
                : 'text-[--muted] hover:text-[--fg]'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 max-w-lg mx-auto w-full">
        {tab === 'info' && (
          <div className="flex flex-col gap-6 py-2">
            <ContactForm data={data} onChange={setData} />
            <div className="border-t border-[--border] pt-4">
              <SocialLinksEditor
                links={data.socialLinks}
                onChange={(links) => setData({ ...data, socialLinks: links })}
              />
            </div>
          </div>
        )}
        {tab === 'design' && (
          <div className="py-2">
            <DesignPanel
              design={data.design}
              onChange={(design) => setData({ ...data, design })}
            />
          </div>
        )}
        {tab === 'preview' && (
          <div className="py-2 -mx-4 pointer-events-none">
            <PublicCard data={data} />
          </div>
        )}
      </div>
    </div>
  )
}
