import { ModalFormProps } from './interfaces';
import { ButtonAtom, LabelAtom, TextAtom } from '../atoms';
import { StyledModalForm } from './styles';

const ModalForm = (props: ModalFormProps) => {
  // eslint-disable-next-line prettier/prettier
  const { togglerId, modalWidth, modalHeight, btnStyle, btnLabelStyle, btnText, disabledBtn, children, cssStyle } = props;

  return (
    <StyledModalForm
      modalWidth={modalWidth}
      modalHeight={modalHeight}
      cssStyle={cssStyle}
    >
      <input
        id={togglerId}
        className="modal-toggler"
        type="checkbox"
        aria-hidden="true"
      />
      <section className="modal-container">
        <div className="modal">
          {children}
          <ButtonAtom
            cssStyle={{
              position: 'absolute',
              top: '3px',
              right: '3px',
              padding: 0,
            }}
          >
            <LabelAtom
              htmlFor={togglerId}
              cssStyle={{
                display: 'inline-block',
                cursor: 'pointer',
                padding: '4px 15px',
                backgroundColor: 'transparent',
              }}
            >
              <TextAtom
                tag="span"
                text="&times;"
                cssStyle={{ fontSize: '25px' }}
              />
            </LabelAtom>
          </ButtonAtom>
        </div>
      </section>
      <ButtonAtom disabled={disabledBtn} cssStyle={{ padding: 0, ...btnStyle }}>
        <LabelAtom
          htmlFor={disabledBtn ? '#' : togglerId}
          cssStyle={{
            display: 'inline-block',
            cursor: disabledBtn ? 'not-allowed' : 'pointer',
            padding: '10px 16px',
            ...btnLabelStyle,
          }}
        >
          {typeof btnText === 'string' ? (
            <TextAtom tag="span" text={btnText} />
          ) : (
            btnText
          )}
        </LabelAtom>
      </ButtonAtom>
    </StyledModalForm>
  );
};

export default ModalForm;
