export function validateLogin (login: string | undefined): boolean {
  if(login) {
    if(login.length < 100) {
      return true
    } 
  } 
  return false 
}

export function validatePassword (password: string | undefined): boolean {
  if(password) {
    if(password.length < 100) {
      return true
    } 
  } 
  return false 
}

export function validateTags (tags: string | undefined): boolean {
  if(tags) {
    if(tags.length < 50) {
      return true
    } 
  } 
  return false 
}