import { useCallback, useState } from 'react'
import * as Updates from 'expo-updates'

export enum UpdateStatus {
  CheckingUpdates,
  CheckFailed,
  Updating,
  NoUpdateAvailable
}

export function useUpdateChecker() {
  const [status, setStatus] = useState<UpdateStatus>(UpdateStatus.CheckingUpdates)

  const checkUpdates = useCallback(async () => {
    try {
      // init status
      setStatus(UpdateStatus.CheckingUpdates)

      if (__DEV__) {
        setStatus(UpdateStatus.NoUpdateAvailable)
      } else {
        // check updates
        const update = await Updates.checkForUpdateAsync()

        if (update.isAvailable) {
          setStatus(UpdateStatus.Updating)
          await Updates.fetchUpdateAsync()
          await Updates.reloadAsync()
        } else {
          setStatus(UpdateStatus.NoUpdateAvailable)
        }
      }
    } catch (e) {
      setStatus(UpdateStatus.CheckFailed)
      throw e
    }
  }, [])

  return { status, checkUpdates }
}
