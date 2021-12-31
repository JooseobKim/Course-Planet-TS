import { CourseSkeletonProps } from './interfaces';
import { StyledCourseSkeleton } from './styles';

export const CourseSkeleton = (props: CourseSkeletonProps) => {
  const { loading, gridResponsive, cssStyle } = props;

  return (
    <StyledCourseSkeleton
      loading={Boolean(loading)}
      gridResponsive={gridResponsive}
      cssStyle={cssStyle}
    >
      <div className="image">
        <div></div>
      </div>
      <div className="title">
        <div></div>
      </div>
      <div className="description">
        <div></div>
      </div>
      <div className="content">
        <div className="content__instructor">
          <div></div>
        </div>
        <div className="content__price-review">
          <div className="content__price-review__price">
            <div></div>
          </div>
          <div className="content__price-review__review">
            <div></div>
          </div>
        </div>
      </div>
    </StyledCourseSkeleton>
  );
};

export default CourseSkeleton;
