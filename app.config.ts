declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JSONRPC_URL: string,
      KAP_ADDRESS: string,
      NICKNAMES_ADDRESS: string
    }
  }
}

export type Config = {
  jsonRPC: string
  contracts: Record<string, string>
}

export const config: Config = {
  jsonRPC: process.env.JSONRPC_URL || 'http://localhost:8080/',
  contracts: {
    kap: process.env.KAP_ADDRESS || '13tmzDmfqCsbYT26C4CmKxq86d33senqH3',
    nicknames: process.env.NICKNAMES_ADDRESS || '1KD9Es7LBBjA1FY3ViCgQJ7e6WH1ipKbhz'
  }
}
