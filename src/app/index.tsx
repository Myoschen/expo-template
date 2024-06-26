import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

import { React } from '@/components/icon'

export default function HomeScreen() {
  const { t } = useTranslation()
  const degree = useSharedValue(0)
  const style = useAnimatedStyle(() => {
    return { transform: [{ rotate: `${degree.value}deg` }] }
  }, [degree.value])

  useEffect(() => {
    degree.value = withRepeat(withTiming(360, { duration: 10000, easing: Easing.linear }), -1)
    return () => cancelAnimation(degree)
  }, [])

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className={'flex-1 items-center justify-center bg-zinc-900'}>
        <View className={'items-center gap-y-4'}>
          <Animated.View style={style}>
            <React className={'size-40'} />
          </Animated.View>
          <Text className={'text-2xl font-medium text-zinc-100'}>{t('HelloExpo')}</Text>
          <View className={'rounded-full bg-[#00D8FF] px-3 py-1.5'}>
            <Text className={'capitalize text-zinc-900'}>{process.env.EXPO_PUBLIC_ENV}</Text>
          </View>
        </View>
      </View>
    </>
  )
}
