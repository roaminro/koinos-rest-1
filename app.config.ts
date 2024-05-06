declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JSONRPC_URL: string,
      KOIN_ADDRESS: string,
      VHP_ADDRESS: string,
      POB_ADDRESS: string,
      CLAIM_ADDRESS: string,
      GOVERNANCE_ADDRESS: string,
      NAMESERVICE_ADDRESS: string,
      RESOURCES_ADDRESS: string,
      KAP_ADDRESS: string,
      NICKNAMES_ADDRESS: string
    }
  }
}

export type Config = {
  jsonRPC: string
  systemContracts: Record<string, string>
  contracts: Record<string, string>
}

export const config: Config = {
  jsonRPC: process.env.JSONRPC_URL || 'http://localhost:8080/',
  systemContracts: {
    koin: process.env.KOIN_ADDRESS || '15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL',
    vhp: process.env.VHP_ADDRESS || '18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr',
    pob: process.env.POB_ADDRESS || '159myq5YUhhoVWu3wsHKHiJYKPKGUrGiyv',
    claim: process.env.CLAIM_ADDRESS || '18zw3ZokdfHtudzaWAUnU4tUvKzKiJeN76',
    governance: process.env.GOVERNANCE_ADDRESS || '19qj51eTbSFJYU7ZagudkpxPgNSzPMfdPX',
    nameservice: process.env.NAMESERVICE_ADDRESS || '19WxDJ9Kcvx4VqQFkpwVmwVEy1hMuwXtQE',
    resources: process.env.RESOURCES_ADDRESS || '1HGN9h47CzoFwU2bQZwe6BYoX4TM6pXc4b'
  },
  contracts: {
    kap: process.env.KAP_ADDRESS || '13tmzDmfqCsbYT26C4CmKxq86d33senqH3',
    nicknames: process.env.NICKNAMES_ADDRESS || '1KD9Es7LBBjA1FY3ViCgQJ7e6WH1ipKbhz'
  }
}
