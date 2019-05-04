import { DecodedMicResult, ParsedResult, ParsedValue } from '../decode-mic';
import { LibraryType } from '../library';
interface DecodeValue {
    parsed: string;
    result: ParsedResult[];
    raw: string[];
}
export declare class DecodeHelper {
    static getValues(scheme: string, parser: Function, parserCount?: number): DecodeValue;
    static getResult(decoded: DecodeValue): ParsedValue | null;
    static parse(parsed: DecodeValue, library: LibraryType | Function): DecodeValue;
    static mergeParsed(parsedOne: DecodeValue, parsedTwo: DecodeValue): DecodeValue;
    static prettify(decoded: DecodedMicResult): string;
    private static _prettifyPattern;
}
export {};
