export interface JwtPayload {
  userId: number
}

export interface Token {
  access_token: string
  expires_in: number
}
