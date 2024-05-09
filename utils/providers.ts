import { config } from '@/app.config'
import { Provider } from 'koilib'

export function getProvider() {
  return new Provider(config.jsonRPC)
}
