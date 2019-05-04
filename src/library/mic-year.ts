export class MicYear {
    static get(string: string) {
        if (string.length > 2) {
            return '84-';
        } else {
            return '84+';
        }
    }
}
