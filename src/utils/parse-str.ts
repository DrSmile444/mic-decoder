export function parseStr(string: string, count?: number): string {
    if (count) {
        return string.slice(0, count);
    }

    count = 0;
    for (let i = 0, n = string.length; i < n; i++) {
        if ( !+string[i] ) count++;
        else break;
    }
    return string.slice(0, count);
}
