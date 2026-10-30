export function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID().slice(0, 8);
  return Math.random().toString(36).slice(2, 10);
}

export const clone = (value) => (value === undefined ? value : JSON.parse(JSON.stringify(value)));

export function moveItem(list, index, direction) {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export const replaceAt = (list, index, value) => list.map((entry, position) => (position === index ? value : entry));

export const removeAt = (list, index) => list.filter((_, position) => position !== index);

export function patchAt(list, index, changes) {
  return list.map((entry, position) => (position === index ? { ...entry, ...changes } : entry));
}
