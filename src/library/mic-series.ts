type Series = number | string;

export class MicSeries {
    static get(series: Series) {
        let result = '';

        if (this.isHybrid(series)) result += 'гібридна';
        if (this.isSemiconductor(series)) result += 'напівпровідникова';
        if (this.isSpecific(series)) result += 'специфічна';

        if (this.isBipolar(series)) result += 'ТТЛ, біполярні';
        else if (this.isCMON(series)) result += 'ТТЛ/КМОН';

        return result;
    }

    static isHybrid(series: Series) {
        return this._sliceFirstLetter(series) === 0;
    }

    static isSemiconductor(series: Series) {
        const semiconductor = this._sliceFirstLetter(series);
        return semiconductor === 1 ||
            semiconductor === 3 ||
            semiconductor === 7;
    }

    static isSpecific(series: Series) {
        return this._sliceFirstLetter(series) === 3;
    }

    static isCMON(series: Series) {
        return this._sliceFirstLetter(series) === 5;

    }

    static isBipolar(series: Series) {
        const letters = this._sliceNextLetters(series);
        return letters === 59 || letters === 33;

    }

    static is(series: Series) {
        return Number(series);
    }

    private static _sliceFirstLetter(series: Series): number {
        return +String(series).slice(0, 1);
    }


    private static _sliceNextLetters(series: Series): number {
        return +String(series).slice(1);
    }

}
