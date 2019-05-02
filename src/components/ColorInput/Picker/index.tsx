import * as React from 'react';

import Input from '../Input';
import Saturation from '../Saturation';
import Slider from '../Slider';
import Swatch from '../Swatch';

import './index.styl';

export type Props = {
  disableAlpha?: boolean;
  presetColors?: Array<string> | null;
};

export default function Picker({ disableAlpha, presetColors }: Props) {
  const values: Array<React.ReactNode> = [
    <div className="tcfColorInputPicker--value wide" key="hex">
      <Input type="hex" />
      <div className="tcfColorInputPicker--valueCaption">Hex</div>
    </div>,
    <div className="tcfColorInputPicker--value" key="red">
      <Input type="red" />
      <div className="tcfColorInputPicker--valueCaption">R</div>
    </div>,
    <div className="tcfColorInputPicker--value" key="green">
      <Input type="green" />
      <div className="tcfColorInputPicker--valueCaption">G</div>
    </div>,
    <div className="tcfColorInputPicker--value" key="blue">
      <Input type="blue" />
      <div className="tcfColorInputPicker--valueCaption">B</div>
    </div>,
  ];

  if (!disableAlpha) {
    values.push(
      <div className="tcfColorInputPicker--value" key="alpha">
        <Input type="alpha" />
        <div className="tcfColorInputPicker--valueCaption">A</div>
      </div>
    );
  }

  let presets = null;
  if (presetColors && presetColors.length) {
    presets = (
      <div className="tcfColorInputPicker--presets">
        {presetColors.map(color => (
          <Swatch
            className="tcfColorInputPicker--presetsSwatch"
            color={color}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="tcfColorInputPicker">
      <Saturation />
      <div className="tcfColorInputPicker--controls">
        <div className="tcfColorInputPicker--sliders">
          <Slider type="hue" />
          {!disableAlpha ? <Slider type="alpha" /> : null}
        </div>
        <Swatch className="tcfColorInputPicker--swatch" />
      </div>
      <div className="tcfColorInputPicker--values">{values}</div>
      {presets}
    </div>
  );
}
