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
export declare function decodeMic(scheme: string): DecodedMicResult;
