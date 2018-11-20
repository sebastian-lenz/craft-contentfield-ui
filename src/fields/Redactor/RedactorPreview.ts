import { SafeString } from 'handlebars';

export default class RedactorPreview {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  get summary() {
    return new SafeString(`<div class="snippet">${this.value}</div>`);
  }

  toHTML() {
    return new SafeString(this.value);
  }
}
