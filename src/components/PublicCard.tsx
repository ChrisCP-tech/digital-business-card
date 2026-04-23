import { useEffect } from 'react'
import { Mail, Phone } from 'lucide-react'
import type { CardData } from '../types'
import SocialLinks from './SocialLinks'
import ThemeToggle from './ThemeToggle'
import { applyPrimaryColor, applyFont } from '../lib/theme'

interface Props {
  data: CardData
}

const AVATAR_SHAPE: Record<string, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
  square: 'rounded-none',
}

export default function PublicCard({ data }: Props) {
  const { design } = data

  useEffect(() => {
    applyPrimaryColor(design.primaryColor)
    applyFont(design.fontFamily)
  }, [design.primaryColor, design.fontFamily])

  const avatarClass = AVATAR_SHAPE[design.avatarShape] ?? 'rounded-full'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[--bg] px-4 py-8">
      {/* Theme toggle top-right */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-[--surface] border border-[--border] rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col items-center px-8 py-10 gap-5">
          {/* Avatar */}
          {data.photoUrl && (
            <img
              src={data.photoUrl}
              alt={data.name}
              className={`w-28 h-28 object-cover border-4 border-[--primary] shadow ${avatarClass}`}
            />
          )}

          {/* Name + Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[--fg] leading-tight">{data.name}</h1>
            {data.title && (
              <p className="text-sm font-medium text-[--primary] mt-1">{data.title}</p>
            )}
          </div>

          {/* Bio */}
          {data.bio && (
            <p className="text-sm text-center text-[--muted] leading-relaxed">{data.bio}</p>
          )}

          {/* Divider */}
          <div className="w-full border-t border-[--border]" />

          {/* Contact rows */}
          <div className="w-full flex flex-col gap-3">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-3 text-sm text-[--fg] hover:text-[--primary] transition-colors group"
              >
                <span className="flex-shrink-0 p-2 rounded-lg bg-[--bg] group-hover:bg-[--primary] group-hover:text-[--primary-fg] transition-colors border border-[--border]">
                  <Mail size={14} />
                </span>
                <span>{data.email}</span>
              </a>
            )}
            {data.phone && (
              <a
                href={`tel:${data.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-sm text-[--fg] hover:text-[--primary] transition-colors group"
              >
                <span className="flex-shrink-0 p-2 rounded-lg bg-[--bg] group-hover:bg-[--primary] group-hover:text-[--primary-fg] transition-colors border border-[--border]">
                  <Phone size={14} />
                </span>
                <span>{data.phone}</span>
              </a>
            )}
          </div>

          {/* Divider */}
          {data.socialLinks.length > 0 && (
            <div className="w-full border-t border-[--border]" />
          )}

          {/* Social links */}
          <SocialLinks links={data.socialLinks} />
        </div>
      </div>

      <p className="mt-6 text-xs text-[--muted]">Scan to save contact</p>
    </div>
  )
}
