declare namespace Garnish {
  export type AnyJQuerySource = string | Element | Array<Element> | JQuery;
  export type EventNames = string | Array<string | Array<string>>;

  export const $win: JQuery;
  export const $doc: JQuery;
  export const $bod: JQuery;
  export const $scrollContainer: JQuery;

  export const rtl: boolean;
  export const ltr: boolean;

  // Key code constants
  export const DELETE_KEY: 8;
  export const SHIFT_KEY: 16;
  export const CTRL_KEY: 17;
  export const ALT_KEY: 18;
  export const RETURN_KEY: 13;
  export const ESC_KEY: 27;
  export const SPACE_KEY: 32;
  export const LEFT_KEY: 37;
  export const UP_KEY: 38;
  export const RIGHT_KEY: 39;
  export const DOWN_KEY: 40;
  export const A_KEY: 65;
  export const S_KEY: 83;
  export const CMD_KEY: 91;

  // Mouse button constants
  export const PRIMARY_CLICK: 1;
  export const SECONDARY_CLICK: 3;

  // Axis constants
  export const X_AXIS: 'x';
  export const Y_AXIS: 'y';

  export const FX_DURATION: 100;

  // Node types
  export const TEXT_NODE: 3;

  /**
   * Logs a message to the browser's console, if the browser has one.
   * @param {string} msg
   */
  export function log(msg: string): void;

  /**
   * Returns whether this is a mobile browser.
   * Detection script courtesy of http://detectmobilebrowsers.com
   *
   * Last updated: 2014-11-24
   *
   * @param {boolean} detectTablets
   * @return {boolean}
   */
  export function isMobileBrowser(detectTablets?: boolean): boolean;

  /**
   * Returns whether a variable is an array.
   *
   * @param {object} val
   * @return {boolean}
   */
  export function isArray(val: any): val is any[];

  /**
   * Returns whether a variable is a jQuery collection.
   *
   * @param {object} val
   * @return {boolean}
   */
  export function isJquery(val: any): val is JQuery;

  /**
   * Returns whether a variable is a string.
   *
   * @param {object} val
   * @return {boolean}
   */
  export function isString(val: any): val is string;

  /**
   * Returns whether an element has an attribute.
   *
   * @see http://stackoverflow.com/questions/1318076/jquery-hasattr-checking-to-see-if-there-is-an-attribute-on-an-element/1318091#1318091
   */
  export function hasAttr(elem: Element, attr: string): boolean;

  /**
   * Returns whether something is a text node.
   *
   * @param {object} elem
   * @return {boolean}
   */
  export function isTextNode(elem: Element): boolean;

  /**
   * Returns the offset of an element within the scroll container, whether that's the window or something else
   */
  export function getOffset(elem: Element): { top: number; left: number };

  /**
   * Returns the distance between two coordinates.
   *
   * @param {number} x1 The first coordinate's X position.
   * @param {number} y1 The first coordinate's Y position.
   * @param {number} x2 The second coordinate's X position.
   * @param {number} y2 The second coordinate's Y position.
   * @return {number}
   */
  export function getDist(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number;

  /**
   * Returns whether an element is touching an x/y coordinate.
   *
   * @param {number}    x    The coordinate's X position.
   * @param {number}    y    The coordinate's Y position.
   * @param {object} elem Either an actual element or a jQuery collection.
   * @return {boolean}
   */
  export function hitTest(x: number, y: number, elem: Element): boolean;

  /**
   * Returns whether the cursor is touching an element.
   *
   * @param {object} ev   The mouse event object containing pageX and pageY properties.
   * @param {object} elem Either an actual element or a jQuery collection.
   * @return {boolean}
   */
  export function isCursorOver(ev: MouseEvent, elem: Element): boolean;

  /**
   * Copies text styles from one element to another.
   *
   * @param {object} source The source element. Can be either an actual element or a jQuery collection.
   * @param {object} target The target element. Can be either an actual element or a jQuery collection.
   */
  export function copyTextStyles(source: Element, target: Element): void;

  /**
   * Returns the body's real scrollTop, discarding any window banding in Safari.
   *
   * @return {number}
   */
  export function getBodyScrollTop(): number;

  export function requestAnimationFrame(callback: Function): number;

  export function cancelAnimationFrame(frame: number): void;

  /**
   * Scrolls a container element to an element within it.
   *
   * @param {object} container Either an actual element or a jQuery collection.
   * @param {object} elem      Either an actual element or a jQuery collection.
   */
  export function scrollContainerToElement(
    container: Element,
    elem: Element
  ): void;

  export const SHAKE_STEPS: number;
  export const SHAKE_STEP_DURATION: number;

  /**
   * Shakes an element.
   *
   * @param {object}  elem Either an actual element or a jQuery collection.
   * @param {string} prop The property that should be adjusted (default is 'margin-left').
   */
  export function shake(elem: Element, prop: string): void;

  /**
   * Returns the first element in an array or jQuery collection.
   *
   * @param {object} elem
   * @return mixed
   */
  export function getElement(elem: any): Element | undefined;

  /**
   * Returns the beginning of an input's name= attribute value with any [bracktes] stripped out.
   *
   * @param {object} elem
   * @return string|null
   */
  export function getInputBasename(elem: Element): string | null;

  /**
   * Returns an input's value as it would be POSTed.
   * So unchecked checkboxes and radio buttons return null,
   * and multi-selects whose name don't end in "[]" only return the last selection
   *
   * @param {object} $input
   * @return {(string|string[])}
   */
  export function getInputPostVal(
    $input: JQuery
  ): string | Array<string> | null;

  /**
   * Returns the inputs within a container
   *
   * @param {object} container The container element. Can be either an actual element or a jQuery collection.
   * @return {object}
   */
  export function findInputs(container: AnyJQuerySource): JQuery;

  /**
   * Returns the post data within a container.
   *
   * @param {object} container
   * @return {array}
   */
  export function getPostData(container: AnyJQuerySource): any;

  export function copyInputValues(
    source: AnyJQuerySource,
    target: AnyJQuerySource
  ): void;

  /**
   * Returns whether the "Ctrl" key is pressed (or ⌘ if this is a Mac) for a given keyboard event
   *
   * @param ev The keyboard event
   *
   * @return {boolean} Whether the "Ctrl" key is pressed
   */
  export function isCtrlKeyPressed(ev: Event): boolean;

  export function on(target: any, events: EventNames, handler: Function): void;

  export function on(
    target: any,
    events: EventNames,
    data: any,
    handler: Function
  ): void;

  export function off(target: any, events: EventNames, handler: Function): void;

  export class Base {
    settings: any | null;
    private _eventHandlers: any[];
    private _namespace: string;
    private _listeners: any[];
    private _disabled: boolean;

    init(): void;
    setSettings(settings: any, defaults: any): void;
    on(events: EventNames, handler: Function): void;
    on(events: EventNames, data: any, handler: Function): void;
    off(events: EventNames, handler: Function): void;
    trigger(type: string, data: any): void;
    _splitEvents(events: string | Array<string>): Array<string>;
    _formatEvents(events: string | Array<string>): string;
    addListener(
      elem: Element,
      events: string | Array<string>,
      func: Function | string
    ): void;
    addListener(
      elem: Element,
      events: string | Array<string>,
      data: any,
      func: Function | string
    ): void;
    removeListener(elem: Element, events: string | Array<string>): void;
    removeAllListeners(elem: Element): void;
    disable(): void;
    enable(): void;
    destroy(): void;
  }

  export class BaseDrag {}
}

declare namespace Craft {
  export function t(
    category: string,
    message: string,
    params?: { [name: string]: string }
  ): string;

  export interface BaseElementSelectCriteria {
    [key: string]: any;
  }

  export interface BaseElementSelectInputOptions {
    id: string;
    name: string;
    elementType: string;
    sources: string[] | null;
    criteria?: BaseElementSelectCriteria | null;
    sourceElementId: number | null;
    viewMode: 'small' | 'large';
    limit: number | null;
    modalStorageKey: string | null;
  }

  export class BaseElementSelectInput extends Garnish.Base {
    elementSort?: Garnish.Base;
    $elementsContainer: JQuery;

    constructor(options: BaseElementSelectInputOptions);

    getElements(): JQuery;
    getSelectedElementIds(): Array<number>;
    createNewElement(element: any): any;
    appendElement(element: any): void;
    addElements(element: any): void;
    resetElements(): void;
  }

  export interface RedactorInputOptions {
    id: string;
    linkOptions?: any;
    volumes?: any;
    transforms?: any;
    elementSiteId?: any;
    redactorConfig?: any;
    redactorLang?: any;
    direction?: any;
  }

  export class RedactorInput extends Garnish.Base {
    redactor: {
      on: (event: string, callback: Function) => void;
      off: (event: string, callback: Function) => void;
      source: {
        getCode: () => string;
        setCode: (value: string) => void;
      };
    };

    constructor(options: RedactorInputOptions);
  }

  export interface LightSwitchOptions {
    value: boolean | string;
    onChange: Function;
  }

  export class LightSwitch extends Garnish.Base {
    settings: LightSwitchOptions;
    $outerContainer: JQuery;
    $innerContainer: JQuery;
    $input: JQuery;
    // @ts-ignore
    on: boolean;
    small: boolean;
    dragger: Garnish.BaseDrag;
    dragStartMargin: number | null;
    constructor(container: HTMLElement, settings: Partial<LightSwitchOptions>);
    turnOn(): void;
    turnOff(): void;
    toggle(): void;
    onChange(): void;
    _onMouseDown(): void;
    _onMouseUp(): void;
    _onKeyDown(event: KeyboardEvent): void;
    _getMargin(): number;
    _onDragStart(): void;
    _onDrag(): void;
    _onDragStop(): void;
    _onSettle(): void;
    _getOffMargin(): number;
  }
}
