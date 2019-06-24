export interface TranslateParams {
  [name: string]: string;
}

export default function translate(
  message: string,
  params?: TranslateParams
): string {
  return Craft.t('contentfield', message, params);
}
