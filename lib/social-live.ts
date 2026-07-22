import type { GitHubSnapshot, SocialSnapshot } from '~/components/social-cards'
import bakedGithub from '~/content/github.json'
import bakedSocial from '~/content/social.json'

export interface SocialData {
  x: SocialSnapshot
  telegram: SocialSnapshot
  youtube: SocialSnapshot
}

// Social integrations are deliberately offline until HooMee Coffee provides
// public account handles. The stable snapshots keep dormant components typed.
export async function getGitHub(): Promise<GitHubSnapshot> {
  return bakedGithub as GitHubSnapshot
}

export async function getSocial(): Promise<SocialData> {
  return bakedSocial as SocialData
}

