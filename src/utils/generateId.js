export function generateId(prefix = '') {
  return prefix + Math.floor(Date.now() + Math.random()*1000);
}
