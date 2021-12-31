import React, { useEffect, useState } from 'react';
import { DisplayFlexAtom, LinkAtom, TextAtom } from '../atoms';
import { CourseCard } from '../molecules';
import { CourseDetailLeftContainerProps } from './interfaces';
import { CourseData } from '../../../utils/interfaces';
import { translateToKorean } from '../../../utils/utils';
import config from '../../../utils/config/config';
import configStyle from '../../../utils/config/config.style';

const CourseDetailLeftContainer = (props: CourseDetailLeftContainerProps) => {
  const { id, get_course, cssStyle } = props;

  const initState: CourseData = {
    _id: '',
    title: '자료 없음',
    description: '자료 없음',
    instructor: '자료 없음',
    price: '자료 없음',
    image: config.noImage,
    review: [],
    url: '자료 없음',
    platform: '자료 없음',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [detailCourse, setDetailCourse] = useState(initState);

  useEffect(() => {
    get_course.forEach((course: CourseData) => {
      if (course._id === id) return setDetailCourse(course);
    });
  }, [get_course, id]);

  return (
    <CourseCard
      removeHoverLink={true}
      cancelSlice={true}
      course={detailCourse}
      imgHeight="365px"
      titleHeight="100%"
      descriptionHeight="100%"
      cssStyle={{ flex: 1.2, ...cssStyle }}
    >
      <DisplayFlexAtom displayColumn={true}>
        <DisplayFlexAtom cssStyle={{ display: 'inline', margin: '10px 0' }}>
          <TextAtom
            tag="span"
            text="강의 링크"
            cssStyle={{ marginRight: '5px', fontWeight: 300 }}
          />
          <LinkAtom src={detailCourse.url}>
            <TextAtom
              tag="span"
              text={detailCourse.url}
              cssStyle={{
                fontWeight: 300,
                opacity: 0.9,
                ':hover': { opacity: 1 },
              }}
            />
          </LinkAtom>
        </DisplayFlexAtom>
        <DisplayFlexAtom
          displayCenter={true}
          cssStyle={{ paddingBottom: '5px' }}
        >
          <TextAtom
            tag="span"
            text="강의 플랫폼"
            cssStyle={{ marginRight: '5px', fontWeight: 300 }}
          />
          <TextAtom
            tag="span"
            text={`${translateToKorean(detailCourse.platform)}`}
            cssStyle={{
              color: configStyle.white,
              backgroundColor:
                detailCourse.platform === 'inflearn' ? '#00c471' : '#ed234b',
              fontWeight: 300,
              padding: '7px',
              borderRadius: '3px',
            }}
          />
        </DisplayFlexAtom>
      </DisplayFlexAtom>
    </CourseCard>
  );
};

export default CourseDetailLeftContainer;
