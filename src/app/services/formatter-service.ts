export class FormatterService {
    truncate(str: string | null | undefined, len: number = 50): string {
        if (str === null || str === undefined || str === '') {
            return ''
        }
        if (str.length <= 3)
            return str
        return str.slice(0, len - 3) + '...';
    }
}
