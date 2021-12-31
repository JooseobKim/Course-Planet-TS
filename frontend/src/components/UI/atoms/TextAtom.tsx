import { TextProps } from './interfaces';
// eslint-disable-next-line prettier/prettier
import { StyledSpanText, StyledParagraphText, StyledHeading1Text, StyledHeading2Text, StyledHeading4Text } from './style';
import { withStyledComponent } from '../../../utils/HOC';

const TextAtom = (props: TextProps) => {
  const { tag, text, innerHtml, cssStyle } = props;

  const componentData = withStyledComponent({ innerHtml, text, cssStyle });

  const Heading1Text = componentData(StyledHeading1Text);
  const Heading2Text = componentData(StyledHeading2Text);
  const Heading4Text = componentData(StyledHeading4Text);
  const SpanText = componentData(StyledSpanText);
  const ParagraphText = componentData(StyledParagraphText);

  if (tag === 'h1') return <Heading1Text />;
  if (tag === 'h2') return <Heading2Text />;
  if (tag === 'h4') return <Heading4Text />;
  if (tag === 'p') return <ParagraphText />;
  return <SpanText />;
};

export default TextAtom;
