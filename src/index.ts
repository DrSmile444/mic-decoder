import { decodeMic } from './decode-mic';
import { DecodeHelper } from './utils/decode-helper';

const form = document.querySelector('[form]');
const formInput = form.querySelector('[form-input]');
const formResult = form.querySelector('[form-result]') as any;

formInput.addEventListener('input', calculateValue);

function calculateValue(event: any) {
    const inputValue = event.target.value;
    const result = decodeMic(inputValue);
    formResult.innerText = DecodeHelper.prettify(result);
}


