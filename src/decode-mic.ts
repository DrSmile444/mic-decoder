import { MicAreas, MicBodyMaterials, MicGroup, MicGroupLetter, MicSeries } from './library';
import { parseStr } from './utils';
import { DecodeHelper } from './utils/decode-helper';
import { MicYear } from './library/mic-year';

export interface ParsedResult {
    key: string;
    result: string;
}

export interface ParsedValue {
    raw: string;
    parsed: string;
    result: ParsedResult[];
}

export interface DecodedMicResult {
    area?: ParsedValue;
    bodyMaterial?: ParsedValue;
    series?: ParsedValue;
    groups?: ParsedValue;
    year?: ParsedValue;
    modification?: ParsedValue;
}

export function decodeMic(scheme: string): DecodedMicResult {
    const result: DecodedMicResult = {};
    let tempScheme = scheme.toUpperCase();

    if (scheme.length > 5) {
        const area = getArea(tempScheme);
        if (area) {
            result.area = area;
            const sliceCount = area.parsed === 'Пусто' ?
                0 : 1;
            tempScheme = tempScheme.slice(sliceCount);
        }
    }

    const bodyMaterial = getBodyMaterial(tempScheme);
    if (bodyMaterial) {
        result.bodyMaterial = bodyMaterial;
        tempScheme = tempScheme.slice(bodyMaterial.parsed.length);
    }

    const series = getSeries(tempScheme);
    if (series) {
        result.series = series;
        tempScheme = tempScheme.slice(series.parsed.length);
    }

    const groups = getGroup(tempScheme);
    if (groups) {
        result.groups = groups;
        tempScheme = tempScheme.slice(2);
    }

    const year = getYear(tempScheme);
    if (year) {
        result.year = year;
        tempScheme = tempScheme.slice(year.parsed.length);
    }

    const modification = getModification(tempScheme);
    if (modification) {
        result.modification = modification;
    }

    return result;
}

function getArea(scheme: string): ParsedValue | null {
    let parsed = DecodeHelper.getValues(scheme, parseStr, 1);
    if (!MicAreas[parsed.parsed]) parsed.parsed = 'Пусто';
    DecodeHelper.parse(parsed, MicAreas);
    return DecodeHelper.getResult(parsed);
}

function getBodyMaterial(scheme: string): ParsedValue | null {
    let parsed = DecodeHelper.getValues(scheme, parseStr, 1);
    DecodeHelper.parse(parsed, MicBodyMaterials);
    return DecodeHelper.getResult(parsed);
}

function getSeries(scheme: string): ParsedValue | null {
    let parsed = DecodeHelper.getValues(scheme, parseStr, 3);
    DecodeHelper.parse(parsed, (val: any) => MicSeries.get(val));
    return DecodeHelper.getResult(parsed);
}

function getGroup(scheme: string): ParsedValue | null {
    let parsedGroupName = DecodeHelper.getValues(scheme, parseStr, 1);
    let parsed = DecodeHelper.getValues(scheme, parseStr, 2);
    DecodeHelper.parse(parsedGroupName, MicGroupLetter);
    DecodeHelper.parse(parsed, MicGroup);
    DecodeHelper.mergeParsed(parsedGroupName, parsed);
    return DecodeHelper.getResult(parsedGroupName);
}

function getYear(scheme: string): ParsedValue | null {
    let parsed = DecodeHelper.getValues(scheme, parseInt);
    parsed.parsed = String(parsed.parsed || '');
    DecodeHelper.parse(parsed, MicYear.get);
    return DecodeHelper.getResult(parsed);
}

function getModification(scheme: string): ParsedValue | null {
    let parsed = DecodeHelper.getValues(scheme, parseStr);
    DecodeHelper.parse(parsed, (val: string) => val + ' модифікація');
    return DecodeHelper.getResult(parsed);
}
