export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: TelegramUser
    query_id?: string
    auth_date?: string
    hash?: string
  }
  version: string
  platform: string
  colorScheme: 'light' | 'dark'
  themeParams: {
    bg_color: string
    text_color: string
    hint_color: string
    link_color: string
    button_color: string
    button_text_color: string
  }
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  expand: () => void
  close: () => void
  ready: () => void
  sendData: (data: string) => void
  onEvent: (eventType: string, callback: Function) => void
  offEvent: (eventType: string, callback: Function) => void
}
