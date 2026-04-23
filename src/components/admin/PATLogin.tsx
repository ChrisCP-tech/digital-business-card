import { useState } from 'react'
import { Key, ExternalLink, Loader2 } from 'lucide-react'
import { validatePAT } from '../../lib/github'

interface Props {
  onAuthenticated: (pat: string) => void
}

export default function PATLogin({ onAuthenticated }: Props) {
  const [pat, setPat] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!pat.trim()) return
    setLoading(true)
    setError('')
    const valid = await validatePAT(pat.trim())
    setLoading(false)
    if (valid) {
      localStorage.setItem('gh_pat', pat.trim())
      onAuthenticated(pat.trim())
    } else {
      setError('Invalid token. Make sure the PAT has "public_repo" or "repo" scope.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[--bg] px-4">
      <div className="w-full max-w-sm">
        <div className="bg-[--surface] border border-[--border] rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[--primary] text-[--primary-fg]">
              <Key size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[--fg]">Admin Access</h1>
              <p className="text-xs text-[--muted]">Enter your GitHub Personal Access Token</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-[--muted] mb-1.5">
                GitHub PAT
              </label>
              <input
                type="password"
                value={pat}
                onChange={(e) => setPat(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
                className="w-full px-3 py-2 text-sm rounded-lg bg-[--bg] border border-[--border] text-[--fg] focus:outline-none focus:border-[--primary] transition-colors"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !pat.trim()}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[--primary] text-[--primary-fg] text-sm font-medium transition-opacity disabled:opacity-50"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {loading ? 'Verifying…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[--border]">
            <p className="text-xs text-[--muted] mb-2">Need a PAT? Create one with:</p>
            <a
              href="https://github.com/settings/tokens/new?scopes=public_repo&description=Digital+Card+Admin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[--primary] hover:underline"
            >
              <ExternalLink size={11} />
              github.com/settings/tokens (public_repo scope)
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
