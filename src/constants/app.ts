import * as Application from 'expo-application'
import Constants from 'expo-constants'

export const country = 'tw'
export const version = Application.nativeApplicationVersion || '0.0.0'
export const buildId = Constants.expoConfig?.extra?.gitInfo?.buildId || '-'

export const store = {
  ios: {
    storeUrl: `https://apps.apple.com/app/apple-store/${process.env.EXPO_PUBLIC_APP_STORE_ID!}`,
    redirectUrl: `itms-apps://apps.apple.com/app/apple-store/${process.env.EXPO_PUBLIC_APP_STORE_ID!}`
  },
  android: {
    storeUrl: `https://play.google.com/store/apps/details?id=${process.env.EXPO_PUBLIC_APP_ID!}`,
    redirectUrl: `market://details?id=${process.env.EXPO_PUBLIC_APP_ID!}`
  }
}
