import { useState } from 'react';
import { DisplayFlexAtom } from '../atoms';
import { RatingProps } from './interfaces';
import { StyledRating } from './styles';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Rating = (props: RatingProps) => {
  const { myRating, readOnly, data, setData } = props;
  const [rating, setRating] = useState(3);
  const [hoverRating, setHoverRating] = useState(0);

  const onMouseEnter = (index: number) => {
    if (readOnly) return;
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  const onSaveRating = (index: number) => {
    if (readOnly) return;
    setRating(index);

    if (!setData || !data) return;
    setData({ ...data, rating: index });
  };

  const ratingNum = Array.from({ length: 5 }, (_, i) => {
    return (
      <>
        {i + 1 <= (myRating ? myRating : rating) ? (
          <AiFillStar fontSize="22px" color="#ffb400" />
        ) : (
          <AiOutlineStar fontSize="22px" color="#bdbdbd" />
        )}
      </>
    );
  });

  const hoverRatingNum = Array.from({ length: 5 }, (_, i) => {
    if (i + 1 <= hoverRating)
      return <AiFillStar fontSize="22px" color="#ffb400" />;
    return <AiOutlineStar fontSize="22px" color="#bdbdbd" />;
  });

  return (
    <StyledRating>
      <DisplayFlexAtom>
        {hoverRating > 0
          ? hoverRatingNum.map((item, i) => (
              <DisplayFlexAtom
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => onMouseEnter(i + 1)}
                onMouseLeave={() => onMouseLeave()}
                onClick={() => onSaveRating(i + 1)}
                cssStyle={{ cursor: readOnly ? 'default' : 'pointer' }}
              >
                {item}
              </DisplayFlexAtom>
            ))
          : ratingNum.map((item, i) => (
              <DisplayFlexAtom
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => onMouseEnter(i + 1)}
                onMouseLeave={() => onMouseLeave()}
                onClick={() => onSaveRating(i + 1)}
                cssStyle={{ cursor: readOnly ? 'default' : 'pointer' }}
              >
                {item}
              </DisplayFlexAtom>
            ))}
      </DisplayFlexAtom>
    </StyledRating>
  );
};

export default Rating;
