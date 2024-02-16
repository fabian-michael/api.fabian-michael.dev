export function trimEnd(str: string, char: string): string {
    return str.replace(new RegExp(char + '+$'), '');
}

export function trimStart(str: string, char: string): string {
    return str.replace(new RegExp('^' + char + '+'), '');
}

export function trim(str: string, char: string): string {
    return trimStart(trimEnd(str, char), char);
}

export const trimEndCurried = (char: string) => (str: string) => trimEnd(str, char);
export const trimStartCurried = (char: string) => (str: string) => trimStart(str, char);
export const trimCurried = (char: string) => (str: string) => trim(str, char);

export function buildUrl(parts: string[], trailingSlash?: boolean): string {
    const url = parts
        .filter(Boolean)
        .map(trimCurried('/'))
        .join('/');

    return url + (trailingSlash ? '/' : '');
}