export interface User {
  userId: number;
  username: string;
  profileImage: string;
  birthDt: string;
  number: string;
  email: string;
}

export interface UserDetail {
  id: number;
  email: string;
  createdAt: string;
  enabled: boolean;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}
