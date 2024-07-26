import { execSync } from 'child_process'
import type { ConfigContext, ExpoConfig } from 'expo/config'

function getGitInfo() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim() || ''
    const commitHash = execSync('git rev-parse --short HEAD').toString().trim() || ''
    const buildId = [branch, commitHash].join('_')
    return { branch, commitHash, buildId }
  } catch {
    return {}
  }
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const gitInfo = getGitInfo()

  return {
    ...config,
    name: config.name!,
    slug: config.slug!,
    extra: { ...config.extra, gitInfo }
  }
}
