import { nanoid } from 'nanoid'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import type { SocialLink } from '../../types'

const PLATFORMS = ['github', 'linkedin', 'twitter', 'instagram', 'youtube', 'tiktok', 'website']

interface Props {
  links: SocialLink[]
  onChange: (links: SocialLink[]) => void
}

export default function SocialLinksEditor({ links, onChange }: Props) {
  function addLink() {
    onChange([...links, { id: nanoid(), platform: 'github', url: '', label: '' }])
  }

  function removeLink(id: string) {
    onChange(links.filter((l) => l.id !== id))
  }

  function updateLink(id: string, field: keyof SocialLink, value: string) {
    onChange(links.map((l) => (l.id === id ? { ...l, [field]: value } : l)))
  }

  function moveLink(index: number, dir: -1 | 1) {
    const next = [...links]
    const swap = index + dir
    if (swap < 0 || swap >= next.length) return
    ;[next[index], next[swap]] = [next[swap], next[index]]
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[--muted]">Social Links</span>
        <button
          onClick={addLink}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-[--primary] text-[--primary-fg] hover:opacity-90 transition-opacity"
        >
          <Plus size={12} />
          Add link
        </button>
      </div>

      {links.length === 0 && (
        <p className="text-xs text-[--muted] text-center py-4 border border-dashed border-[--border] rounded-lg">
          No links yet. Add one above.
        </p>
      )}

      {links.map((link, i) => (
        <div key={link.id} className="flex gap-2 p-3 bg-[--bg] border border-[--border] rounded-lg">
          <div className="flex flex-col gap-1 justify-center">
            <button onClick={() => moveLink(i, -1)} disabled={i === 0} className="p-0.5 text-[--muted] disabled:opacity-30 hover:text-[--fg]">
              <ChevronUp size={14} />
            </button>
            <button onClick={() => moveLink(i, 1)} disabled={i === links.length - 1} className="p-0.5 text-[--muted] disabled:opacity-30 hover:text-[--fg]">
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="flex gap-2">
              <select
                value={link.platform}
                onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                className="text-xs px-2 py-1.5 rounded-md bg-[--surface] border border-[--border] text-[--fg] focus:outline-none focus:border-[--primary]"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <input
                value={link.label}
                onChange={(e) => updateLink(link.id, 'label', e.target.value)}
                placeholder="@username"
                className="flex-1 text-xs px-2 py-1.5 rounded-md bg-[--surface] border border-[--border] text-[--fg] focus:outline-none focus:border-[--primary] min-w-0"
              />
            </div>
            <input
              value={link.url}
              onChange={(e) => updateLink(link.id, 'url', e.target.value)}
              placeholder="https://…"
              className="text-xs px-2 py-1.5 rounded-md bg-[--surface] border border-[--border] text-[--fg] focus:outline-none focus:border-[--primary]"
            />
          </div>

          <button onClick={() => removeLink(link.id)} className="flex-shrink-0 p-1 text-[--muted] hover:text-red-500 transition-colors self-start mt-0.5">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
