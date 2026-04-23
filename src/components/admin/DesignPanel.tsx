import { applyPrimaryColor, applyFont } from '../../lib/theme'
import type { DesignConfig } from '../../types'

const PRESET_COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#14b8a6']

const FONTS = [
  { value: 'inter', label: 'Inter (Clean sans-serif)' },
  { value: 'merriweather', label: 'Merriweather (Classic serif)' },
  { value: 'playfair', label: 'Playfair Display (Elegant serif)' },
  { value: 'mono', label: 'JetBrains Mono (Developer)' },
]

const AVATAR_SHAPES = [
  { value: 'circle', label: 'Circle' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
]

interface Props {
  design: DesignConfig
  onChange: (design: DesignConfig) => void
}

export default function DesignPanel({ design, onChange }: Props) {
  function updateColor(color: string) {
    applyPrimaryColor(color)
    onChange({ ...design, primaryColor: color })
  }

  function updateFont(fontFamily: string) {
    applyFont(fontFamily)
    onChange({ ...design, fontFamily })
  }

  function updateShape(avatarShape: string) {
    onChange({ ...design, avatarShape })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Primary color */}
      <div>
        <label className="block text-xs font-medium text-[--muted] mb-2">Accent Color</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => updateColor(color)}
              className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: color,
                borderColor: design.primaryColor === color ? color : 'transparent',
                outline: design.primaryColor === color ? `2px solid ${color}` : 'none',
                outlineOffset: '2px',
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={design.primaryColor}
            onChange={(e) => updateColor(e.target.value)}
            className="w-9 h-9 rounded-lg border border-[--border] bg-[--bg] cursor-pointer p-0.5"
          />
          <span className="text-xs font-mono text-[--muted]">{design.primaryColor}</span>
        </div>
      </div>

      {/* Font */}
      <div>
        <label className="block text-xs font-medium text-[--muted] mb-2">Font Family</label>
        <select
          value={design.fontFamily}
          onChange={(e) => updateFont(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-lg bg-[--bg] border border-[--border] text-[--fg] focus:outline-none focus:border-[--primary]"
        >
          {FONTS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Avatar shape */}
      <div>
        <label className="block text-xs font-medium text-[--muted] mb-2">Avatar Shape</label>
        <div className="flex gap-2">
          {AVATAR_SHAPES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateShape(value)}
              className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${
                design.avatarShape === value
                  ? 'border-[--primary] bg-[--primary] text-[--primary-fg]'
                  : 'border-[--border] bg-[--bg] text-[--fg] hover:border-[--primary]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
