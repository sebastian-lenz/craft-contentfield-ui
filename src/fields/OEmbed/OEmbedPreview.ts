import { SafeString } from 'handlebars';
import { OEmbed } from './OEmbed';
import toHTML from '../../utils/toHTML';

export default class OEmbedPreview {
  value: OEmbed;

  constructor(value: OEmbed) {
    this.value = value;
  }

  get author() {
    return this.value.info ? this.value.info.author_name : '';
  }

  get thumbnail() {
    const { info } = this.value;
    if (!info || !info.thumbnail_url) return '';
    return new SafeString(`<img width="100" src=${info.thumbnail_url} />`);
  }

  get title() {
    return this.value.info ? this.value.info.title : '';
  }

  toHTML() {
    const { info } = this.value;
    if (!info) {
      return new SafeString('');
    }

    let thumbnail = '';
    if (info.thumbnail_url) {
      thumbnail = `<img class="tcfOEmbedWidget--infoImage" src="${
        info.thumbnail_url
      }" />`;
    }

    return new SafeString(`
      <div class="tcfOEmbedWidget--info">
        ${thumbnail}
        <div class="tcfOEmbedWidget--infoContent">
          <div class="tcfOEmbedWidget--infoTitle">${info.title}</div>
          <div class="tcfOEmbedWidget--infoAuthor">${info.author_name}</div>
        </div>
      </div>
    `);
  }
}
