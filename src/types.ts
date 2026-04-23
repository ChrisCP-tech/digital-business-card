export interface SocialLink {
  id: string
  platform: string
  url: string
  label: string
}

export interface DesignConfig {
  primaryColor: string
  fontFamily: string
  avatarShape: string
}

export interface CardData {
  name: string
  title: string
  phone: string
  email: string
  bio: string
  photoUrl: string
  socialLinks: SocialLink[]
  design: DesignConfig
}
