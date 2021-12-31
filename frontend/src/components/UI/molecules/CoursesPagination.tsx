import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CourseType } from '../../../redux/action-types';
import { ButtonAtom } from '../atoms';
import { CoursesPaginationProps } from './interfaces';
import { StyledCoursesPagination } from './styles';
import configStyle from '../../../utils/config/config.style';

const CoursesPagination = (props: CoursesPaginationProps) => {
  const { page, pageNum, cssStyle } = props;

  const dispatch = useDispatch();

  return (
    <StyledCoursesPagination cssStyle={cssStyle}>
      {pageNum.map((pageIndex: number) => {
        if (pageIndex + 1 === page)
          return (
            <ButtonAtom
              key={pageIndex}
              activeBtn={true}
              onClick={() => {
                window.scrollTo({ top: 0 });
              }}
              cssStyle={{
                width: '30px',
                padding: '3px 0',
                margin: '2px',
                borderRadius: '2px',
              }}
            >
              {pageIndex + 1}
            </ButtonAtom>
          );

        return (
          <Link key={pageIndex} to={`/courses?page=${pageIndex + 1}`}>
            <ButtonAtom
              onClick={() => {
                dispatch({ type: CourseType.PAGE, payload: pageIndex + 1 });
                window.scrollTo({ top: 0 });
              }}
              cssStyle={{
                width: '30px',
                padding: '3px 0',
                margin: '2px',
                borderRadius: '2px',
                backgroundColor: '#efefef',
                ':hover': {
                  backgroundColor: configStyle.mainDarkColor,
                  color: configStyle.white,
                },
              }}
            >
              {pageIndex + 1}
            </ButtonAtom>
          </Link>
        );
      })}
    </StyledCoursesPagination>
  );
};

export default CoursesPagination;
