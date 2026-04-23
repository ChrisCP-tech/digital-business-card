import { Octokit } from '@octokit/rest'
import type { CardData } from '../types'

const OWNER = 'ChrisCP-tech'
const REPO = 'digital-business-card'
const FILE_PATH = 'public/card-data.json'

export async function validatePAT(pat: string): Promise<boolean> {
  try {
    const octokit = new Octokit({ auth: pat })
    await octokit.users.getAuthenticated()
    return true
  } catch {
    return false
  }
}

export async function readCardData(pat: string): Promise<{ data: CardData; sha: string }> {
  const octokit = new Octokit({ auth: pat })
  const response = await octokit.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: FILE_PATH,
  })
  const file = response.data as { content: string; sha: string }
  const data: CardData = JSON.parse(atob(file.content.replace(/\n/g, '')))
  return { data, sha: file.sha }
}

export async function writeCardData(pat: string, data: CardData, sha: string): Promise<void> {
  const octokit = new Octokit({ auth: pat })
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path: FILE_PATH,
    message: 'Update card data via admin panel',
    content: btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2)))),
    sha,
  })
}
