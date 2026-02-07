import type { Error } from "@/types/types";

export function validateTags(stringOfTags: string): Error {
  if (stringOfTags.length > 50) {
    return { message: 'Поле метка может иметь максимум 50 символов', flag: true }
  }
  return { message: '', flag: false }
}

export function validateLogin(login: string | null): Error {
  if (!login) {
    return { message: 'Поле login обязательно для заполнения', flag: true }
  } else if (login.length > 100){
    return { message: 'Поле login может иметь максимум 100 символов', flag: true }
  } else return { message: '', flag: false }
}

export function validatePassword(password: string | null): Error {
  if (!password) {
    return { message: 'Поле password обязательно для заполнения', flag: true }
  } else if (password.length > 100){
    return { message: 'Поле password может иметь максимум 100 символов', flag: true }
  } else return { message: '', flag: false }
}
