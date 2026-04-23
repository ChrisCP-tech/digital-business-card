import type { CardData } from '../../types'

interface Props {
  data: CardData
  onChange: (data: CardData) => void
}

export default function ContactForm({ data, onChange }: Props) {
  function update(field: keyof CardData, value: string) {
    onChange({ ...data, [field]: value })
  }

  const fields: { key: keyof CardData; label: string; placeholder: string; type?: string; multiline?: boolean }[] = [
    { key: 'name', label: 'Full Name', placeholder: 'Chris P.' },
    { key: 'title', label: 'Title / Role', placeholder: 'Software Developer' },
    { key: 'email', label: 'Email', placeholder: 'chris@example.com', type: 'email' },
    { key: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000', type: 'tel' },
    { key: 'photoUrl', label: 'Photo URL', placeholder: 'https://…' },
    { key: 'bio', label: 'Bio', placeholder: 'A brief description…', multiline: true },
  ]

  return (
    <div className="flex flex-col gap-4">
      {fields.map(({ key, label, placeholder, type, multiline }) => (
        <div key={key}>
          <label className="block text-xs font-medium text-[--muted] mb-1.5">{label}</label>
          {multiline ? (
            <textarea
              value={(data[key] as string) ?? ''}
              onChange={(e) => update(key, e.target.value)}
              placeholder={placeholder}
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-lg bg-[--bg] border border-[--border] text-[--fg] focus:outline-none focus:border-[--primary] transition-colors resize-none"
            />
          ) : (
            <input
              type={type ?? 'text'}
              value={(data[key] as string) ?? ''}
              onChange={(e) => update(key, e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 text-sm rounded-lg bg-[--bg] border border-[--border] text-[--fg] focus:outline-none focus:border-[--primary] transition-colors"
            />
          )}
        </div>
      ))}
    </div>
  )
}
