import { tech } from "@/content/tech";

export function plainText(text: string) {
  return text.replace(/\{([a-z0-9-]+)\}/g, (match, id: string) =>
    id in tech ? tech[id as keyof typeof tech].name : match,
  );
}

export function firstSentence(text: string) {
  const plain = plainText(text).trim();
  const end = plain.search(/[.!?](\s|$)/);
  return end === -1 ? plain : plain.slice(0, end + 1);
}
