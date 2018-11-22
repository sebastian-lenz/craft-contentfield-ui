export default function clone<T>(item: T): T {
  if (!item) {
    return item;
  }

  if (Array.isArray(item)) {
    return item.map(child => clone(child)) as any;
  }

  if (typeof item === 'object') {
    const result: any = {};
    for (const key in item) {
      result[key] = clone(item[key]);
    }

    return result;
  }

  return item;
}
