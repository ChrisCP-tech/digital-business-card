import { Globe, ExternalLink, AtSign, Hash, Mail, Link } from 'lucide-react'
import type { SocialLink } from '../types'

type IconComp = React.ComponentType<{ size?: number; className?: string }>

const ICONS: Record<string, IconComp> = {
  github: Hash,
  linkedin: AtSign,
  twitter: AtSign,
  instagram: AtSign,
  tiktok: AtSign,
  youtube: Globe,
  website: Globe,
  email: Mail,
  link: Link,
}

interface Props {
  links: SocialLink[]
}

export default function SocialLinks({ links }: Props) {
  if (!links.length) return null

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-2">
      {links.map((link) => {
        const Icon = ICONS[link.platform] ?? ExternalLink
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
              bg-[--surface] text-[--fg] hover:bg-[--primary] hover:text-[--primary-fg] border border-[--border]"
          >
            <Icon size={14} />
            <span>{link.label}</span>
          </a>
        )
      })}
    </div>
  )
}
