import type { AccountTag } from "@/types/account";

export function stringToTags(stringOfTags: string): AccountTag[] {
  return stringOfTags
    .split(';')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .map((tag) => ({ text: tag.toUpperCase()}))
}

export function tagsToString(tags: AccountTag[]): string {
  return tags.map((tag) => tag.text).join('; ')
}