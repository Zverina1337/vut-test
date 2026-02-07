export type AccountTag = { text: string }
export type type = 'LDAP' | 'Локальная'

export interface Account {
  id: string;
  login: string;
  password: string | null;
  tags?: AccountTag[]
  type: type;
}