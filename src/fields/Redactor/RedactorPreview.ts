import { hbsMethod, hbsProperty } from '../../utils/hbsOptions';
import { SafeString } from 'handlebars';

export default class RedactorPreview {
  @hbsProperty
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  @hbsProperty
  get summary() {
    return new SafeString(`<div class="snippet">${this.value}</div>`);
  }

  @hbsMethod
  toHTML() {
    return new SafeString(this.value);
  }
}
