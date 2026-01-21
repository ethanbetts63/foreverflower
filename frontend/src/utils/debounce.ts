// foreverflower/frontend/src/utils/debounce.ts

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have passed since the last time the debounced function was invoked.
 *
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @returns A new debounced function.
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function(this: any, ...args: any[]) {
        const context = this;
        const later = () => {
            timeout = null;
            func.apply(context, args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    } as T;
}
