import { CSSObject, StyledComponent } from 'styled-components';
import { StyledTextProps } from '../../components/UI/atoms/interfaces';

export const withStyledComponent = (data: {
  innerHtml?: boolean;
  text: string | number | JSX.Element;
  cssStyle?: CSSObject;
}) => {
  const { text, innerHtml, cssStyle } = data;

  return (
    StyledComponent: StyledComponent<
      keyof JSX.IntrinsicElements,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      StyledTextProps,
      never
    >
  ) => {
    return () => {
      if (innerHtml)
        return (
          <StyledComponent
            dangerouslySetInnerHTML={{ __html: text.toString() }}
            cssStyle={cssStyle}
          ></StyledComponent>
        );

      return <StyledComponent cssStyle={cssStyle}>{text}</StyledComponent>;
    };
  };
};
