import { config } from '@/app.config'
import { Provider } from 'koilib'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JSONRPC_URL: string;
    }
  }
}

export function getProvider() {
  const xJsonRpc = process.env.JSONRPC_URL || config.jsonRPC

  return new Provider(xJsonRpc)
}
