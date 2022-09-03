declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN_DISCORD: string
      GUID_ID: string
    }
  }
}
export {}
