import { request } from './base';

interface RegisterPrams {
  username: string;
  password: string;
  birthDt: string;
  email: string;
}

interface RegisterResponse {
  userId: number;
}

export const fetchRegister = (body: RegisterPrams) =>
  request<RegisterResponse>({
    method: 'POST',
    url: 'join',
    body,
  });

interface LoginPrams {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const fetchLogin = (body: LoginPrams) =>
  request<LoginResponse>({
    method: 'POST',
    url: 'login',
    body,
  });

interface LoginUserInfoResponse {
  userId: number;
  birthDt: string;
  number: string;
  profileImage: string;
  username: string;
}

export const getLoginUserInfo = (token: string) =>
  request<LoginUserInfoResponse>({
    method: 'GET',
    url: 'getLoginUserInfo',
    headers: {
      'X-AUTH-TOKEN': token,
    },
  });
