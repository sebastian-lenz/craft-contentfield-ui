import isModel from './isModel';

function model(value: any) {
  return isModel(value) ? `[${value.__type}, ${value.__uuid}]` : '[no model]';
}

export interface LoggerOptions {
  verbose?: boolean;
}

export interface Logger {
  group(...label: any[]): void;
  groupEnd(): void;
  info(message?: any, ...optionalParams: any[]): void;
  model(value: any): string;
}

const consoleLogger: Logger = {
  group: console.groupCollapsed,
  groupEnd: console.groupEnd,
  info: console.info,
  model,
};

const nullLogger: Logger = {
  group() {},
  groupEnd() {},
  info() {},
  model,
};

export default function createLogger(options?: LoggerOptions) {
  return options && options.verbose ? consoleLogger : nullLogger;
}
