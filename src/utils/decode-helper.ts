import { DecodedMicResult, ParsedResult, ParsedValue } from '../decode-mic';
import { LibraryType } from '../library';

interface DecodeValue {
    parsed: string;
    result: ParsedResult[];
    raw: string[];
}

export class DecodeHelper {
    static getValues(scheme: string, parser: Function, parserCount?: number): DecodeValue {
        return {
            parsed: parser(scheme, parserCount),
            raw: [],
            result: []
        }
    }

    static getResult(decoded: DecodeValue): ParsedValue | null {
        return decoded.result.length ?
            {
                result: decoded.result,
                raw: decoded.raw.join(', '),
                parsed: decoded.parsed
            } :
            null;
    }

    static parse(parsed: DecodeValue, library: LibraryType | Function): DecodeValue {
        if (parsed.parsed) {
            let decodedValue;
            if (typeof library === 'function') {
                decodedValue = library(parsed.parsed);
            } else {
                decodedValue = library[parsed.parsed];
            }

            if (decodedValue) {
                parsed.result.push({ key: parsed.parsed, result: decodedValue });
                parsed.raw.push(decodedValue);
            }
        }

        return parsed;
    }

    static mergeParsed(parsedOne: DecodeValue, parsedTwo: DecodeValue): DecodeValue {
        parsedOne.raw.push(...parsedTwo.raw);
        parsedOne.result.push(...parsedTwo.result);
        parsedOne.parsed += ', ' + parsedTwo.parsed;

        return parsedOne;
    }

    static prettify(decoded: DecodedMicResult): string {
        let result = '';
        Object.keys(decoded)
            .forEach(key => {
                result += this._prettifyPattern(decoded[key].raw, decoded[key].parsed)
            });

        return result;
    }

    private static _prettifyPattern(raw: string, parsed: string): string {
        return `${parsed}: ${raw}\n`
    }
}
