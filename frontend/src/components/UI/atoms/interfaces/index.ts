/* eslint-disable prettier/prettier */
import { DefaultProps } from '../../../../utils/interfaces';

// ButtonAtom.tsx Interface
export interface ButtonProps extends DefaultProps {
  type?: 'button' | 'submit' | 'reset';
  activeBtn?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// TextAtom.tsx Interface
export interface TextProps extends DefaultProps {
  tag: 'span' | 'p' | 'h1' | 'h2' | 'h4';
  text: string | number | JSX.Element;
  innerHtml?: boolean;
}
export type StyledTextProps = Pick<TextProps, 'innerHtml' | 'cssStyle'>;

// InputAtom.tsx Interface
export interface LabelProps extends DefaultProps {
  htmlFor: string;
}
export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, DefaultProps {
  labelText?: string | JSX.Element;
  column?: boolean;
  hoverOpacity?: number | 'none';
  ref?: React.Ref<HTMLInputElement>;
}
export type StyledInputProps = Omit<InputProps, 'labelText'>;
export type StyledLabelProps = Pick<LabelProps, 'children'>;

// LabelAtom.tsx Interface
export interface LabelAtomProps extends DefaultProps {
  htmlFor: string;
  className?: string;
  center?: boolean;
  column?: boolean;
}
export type StyledLabelAtomProps = Omit<LabelAtomProps, 'htmlFor' | 'children'>;

// ListAtom.tsx Interface
export type StyledListProps = Pick<DefaultProps, 'cssStyle'>;

// LinkAtom.tsx Interface
export interface LinkProps extends DefaultProps {
  src: string;
}
export type StyledLinkProps = Omit<LinkProps, 'src'>;

// ImgAtom.tsx Interface
export interface ImgProps extends DefaultProps, React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}
export type StyledImgProps = Pick<ImgProps, 'cssStyle'>;

// DisplayFlexAtom.tsx Interface
export interface DisplayFlexAtomProps extends DefaultProps, React.HTMLAttributes<HTMLDivElement> {
  displayColumn?: boolean;
  displayCenter?: boolean;
  displayGridOn?: boolean;
}
export type StyledDisplayFlexAtomProps = Omit<DisplayFlexAtomProps, 'children'>;

// FormAtom.tsx Interface
export interface FormAtomProps extends DefaultProps {
  displayColumn?: boolean;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}
export type StyledFormAtomProps = Omit<FormAtomProps, 'children' | 'onSubmit'>;

// SelectAtom.tsx Interface
export interface OptionProps {
  value: string;
  text?: string;
}
export interface SelectAtomProps extends DefaultProps, React.SelectHTMLAttributes<HTMLSelectElement> {
  optionValue?: OptionProps[];
  optionProps?: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}
export type StyledSelectAtomProps = Pick<SelectAtomProps, 'cssStyle'>;

// UListAtom.tsx Interface
export type StyledUListProps = Omit<DefaultProps, 'children'>;

// TextareaAtom.tsx Interface
export type TextareaAtomProps = DefaultProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export type StyledTextareaAtomProps = Pick<TextareaAtomProps, 'cssStyle'>;
