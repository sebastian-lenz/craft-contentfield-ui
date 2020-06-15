const allowedProtoMethods: { [name: string]: boolean } = {};
const allowedProtoProperties: { [name: string]: boolean } = {};

export const hbsMethod: MethodDecorator = (
  target: Object,
  name: string | symbol
) => {
  allowedProtoMethods[String(name)] = true;
};

export const hbsProperty: PropertyDecorator = (
  target: Object,
  name: string | symbol
) => {
  allowedProtoProperties[String(name)] = true;
};

export default function hbsOptions(): Handlebars.RuntimeOptions {
  return {
    allowedProtoMethods,
    allowedProtoProperties,
  };
}
