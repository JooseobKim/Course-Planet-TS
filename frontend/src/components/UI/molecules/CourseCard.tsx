import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { TextAtom, ImgAtom, DisplayFlexAtom, LinkAtom } from '../atoms';
import { CourseCardProps } from './interfaces';
import { defaultFontStyle, StyledCourseCard, StyledHoverLink } from './styles';
import configStyle from '../../../utils/config/config.style';

const CourseCard = (props: CourseCardProps) => {
  // eslint-disable-next-line prettier/prettier
  const { removeHoverLink, cancelSlice, imgHeight, titleHeight, descriptionHeight, course, gridResponsive, cssStyle, children } = props;
  // eslint-disable-next-line prettier/prettier
  const { image, title, description, instructor, price, review, url, _id } = course;

  let sliceDescription;
  let sliceTitle;

  if (description?.length > 115)
    sliceDescription = `${description.slice(0, 115)} ...`;

  if (title?.length > 68) sliceTitle = +`${title.slice(0, 68)} ...`;

  return (
    <StyledCourseCard gridResponsive={gridResponsive} cssStyle={cssStyle}>
      <div>
        <LazyLoad>
          <ImgAtom
            src={image}
            alt={title}
            cssStyle={{
              width: '100%',
              height: imgHeight || '189px',
              padding: '5px 0',
              objectFit: 'contain',
              '@media (max-width: 1024px)': {
                maxWidth: '450px',
                maxHeight: '300px',
              },
            }}
          />
        </LazyLoad>
      </div>
      <DisplayFlexAtom
        displayColumn={true}
        displayCenter={true}
        cssStyle={{
          '@media (max-width: 1024px)': {
            paddingLeft: '5px',
          },
        }}
      >
        <div>
          <TextAtom
            tag="span"
            text={cancelSlice ? title : sliceTitle || title}
            cssStyle={{
              display: 'inline-block',
              height: titleHeight || '30px',
              margin: '5px 0 10px',
              textAlign: 'center',
              ...defaultFontStyle,
            }}
          />
        </div>
        <div>
          <TextAtom
            tag="p"
            text={cancelSlice ? description : sliceDescription || description}
            cssStyle={{
              height: descriptionHeight || '72px',
              marginBottom: '10px',
              ...defaultFontStyle,
            }}
          />
        </div>
        <DisplayFlexAtom
          cssStyle={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...defaultFontStyle,
          }}
        >
          <TextAtom
            tag="span"
            text={`강사 ${instructor || '자료 없음'}`}
            cssStyle={{ ...defaultFontStyle }}
          />
          <DisplayFlexAtom displayColumn={true}>
            <TextAtom
              tag="span"
              text={`가격 ${price || '자료 없음'}`}
              cssStyle={{ ...defaultFontStyle }}
            />
            <TextAtom
              tag="span"
              text={`강의 리뷰 ${review ? review.length : '0'}`}
              cssStyle={{
                textAlign: 'end',
                marginTop: '5px',
                ...defaultFontStyle,
              }}
            />
          </DisplayFlexAtom>
        </DisplayFlexAtom>
        {children}
      </DisplayFlexAtom>
      {!removeHoverLink && (
        <StyledHoverLink>
          <LinkAtom
            src={url}
            cssStyle={{
              '@media (max-width: 640px)': {
                borderRight: `1px solid ${configStyle.mainLightColor}`,
              },
            }}
          >
            <TextAtom
              tag="span"
              text="강의 홈페이지로 이동"
              cssStyle={{ color: '#e5e5e5', fontWeight: 400, fontSize: '14px' }}
            />
          </LinkAtom>
          <Link
            to={`/course/${_id}`}
            style={{ color: '#111' }}
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <TextAtom
              tag="span"
              text="리뷰 작성하기"
              cssStyle={{ color: '#e5e5e5', fontWeight: 400, fontSize: '14px' }}
            />
          </Link>
        </StyledHoverLink>
      )}
    </StyledCourseCard>
  );
};

export default CourseCard;
