import { useCallback, useState } from 'react'
import { Platform } from 'react-native'
import * as Linking from 'expo-linking'
import checkVersionAsync from 'react-native-store-version'

import { country, store, version } from '@/constants/app'

const TIMEOUT = 15000
const TIMEOUT_REASON = 'timeout'

export enum VersionStatus {
  CheckingVersion,
  CheckFailed,
  UpdateAvailable,
  NoUpdateAvailable
}

export function useVersionChecker() {
  const [status, setStatus] = useState<VersionStatus>(VersionStatus.CheckingVersion)

  const checkVersion = useCallback(async () => {
    try {
      // init status
      setStatus(VersionStatus.CheckingVersion)

      if (__DEV__) {
        setStatus(VersionStatus.NoUpdateAvailable)
      } else {
        // set 15s timeout
        const timeout = new Promise((_, reject) => setTimeout(reject, TIMEOUT, TIMEOUT_REASON))
        // check version
        const promise = checkVersionAsync({
          version,
          iosStoreURL: store.ios.storeUrl,
          androidStoreURL: store.android.storeUrl,
          country
        })

        // should only return `CheckVersionResponse`
        const { result } = (await Promise.race([timeout, promise])) as Awaited<typeof promise>

        if (result === 'new') {
          setStatus(VersionStatus.UpdateAvailable)
        } else {
          setStatus(VersionStatus.NoUpdateAvailable)
        }
      }
    } catch (e) {
      setStatus(VersionStatus.CheckFailed)
      throw e
    }
  }, [])

  /** @see https://stackoverflow.com/questions/35612383/how-to-make-a-rate-this-app-link-in-react-native-app */
  const redirectToStore = useCallback(async () => {
    await Linking.openURL(Platform.OS === 'ios' ? store.ios.redirectUrl : store.android.redirectUrl)
  }, [])

  return { status, checkVersion, redirectToStore }
}
