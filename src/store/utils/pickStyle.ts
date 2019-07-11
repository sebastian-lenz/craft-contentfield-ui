import { ResponsiveState } from '../../contexts/ResponsiveStateProvider';

export type StyleGroup = {
  small: React.CSSProperties;
  medium: React.CSSProperties;
  large: React.CSSProperties;
};

export default function pickStyle(
  responsiveState: ResponsiveState,
  style?: StyleGroup | null
): React.CSSProperties | undefined {
  if (!style) {
    return undefined;
  }

  switch (responsiveState) {
    case ResponsiveState.Small:
      return style.small;
    case ResponsiveState.Large:
      return style.large;
    default:
      return style.medium;
  }
}
