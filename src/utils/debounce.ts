/**
 * Returns a function, that, as long as it continues to be invoked,
 * will not be triggered.
 *
 * The function will be called after it stops being called for N
 * milliseconds. If immediate is passed, trigger the function on the
 * leading edge, instead of the trailing.
 */
export default function debounce<T extends Function>(
  func: T,
  wait: number,
  immediate?: boolean
): T {
  let timeout: number | null = null;
  let args: IArguments | null = null;
  let context: any | null = null;
  let timestamp: number;
  let result: any;

  function later() {
    const last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = window.setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);

        if (!timeout) {
          context = args = null;
        }
      }
    }
  }

  return <any>function(this: any) {
    context = this;
    args = arguments;
    timestamp = Date.now();
    const callNow = immediate && !timeout;

    if (!timeout) {
      timeout = window.setTimeout(later, wait);
    }

    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
