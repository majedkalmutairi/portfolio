// Joins class names, skipping anything false/empty. Lets a component add a caller's
// `className` without leaving stray "undefined" in the markup.
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
