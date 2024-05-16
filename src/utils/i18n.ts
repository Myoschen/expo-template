import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const supportedLngs = ['en']
export const defaultLng = supportedLngs[0]

// ref: https://gist.github.com/0x5424/4d47e1cd44b95af224d2fb9990568943
const resolveLocales = (ctx: __MetroModuleApi.RequireContext) => {
  const resolved: { resources: Record<string, any>; ns: string[] } = {
    resources: {},
    ns: []
  }
  const regex = /(?<context>\w*)\/(?<locale>[\w-]+)\/(?<namespace>\w+)\.json$/

  ctx.keys().forEach((file) => {
    const matched = file.match(regex)
    if (matched && matched.groups) {
      const { locale, namespace } = matched.groups
      resolved.ns.push(namespace)
      resolved.resources[locale] = resolved.resources[locale] ? resolved.resources[locale] : {}
      resolved.resources[locale][namespace] = ctx(file)
    }
  })

  resolved.ns = [...new Set(resolved.ns)]

  return resolved
}

const locales = resolveLocales(require.context('../../assets/locales', true, /\w+\.json$/))

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  ns: locales.ns,
  resources: locales.resources,
  defaultNS: ['common'],
  supportedLngs,
  lng: defaultLng,
  fallbackLng: defaultLng,
  load: 'currentOnly',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
