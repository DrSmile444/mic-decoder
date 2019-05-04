declare type Series = number | string;
export declare class MicSeries {
    static get(series: Series): string;
    static isHybrid(series: Series): boolean;
    static isSemiconductor(series: Series): boolean;
    static isSpecific(series: Series): boolean;
    static isCMON(series: Series): boolean;
    static isBipolar(series: Series): boolean;
    static is(series: Series): number;
    private static _sliceFirstLetter;
    private static _sliceNextLetters;
}
export {};
