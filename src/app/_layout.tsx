import '@/utils/i18n'
import '@/utils/svg'
import '@/constants/global.css'

import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name={'index'} />
    </Stack>
  )
}
