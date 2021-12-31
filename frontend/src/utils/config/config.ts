export default {
  inflearn: 'inflearn',
  fastcampus: 'fastcampus',
  easy: 'easy',
  normal: 'normal',
  hard: 'hard',
  expert: 'expert',
  defaultAvatar:
    'https://res.cloudinary.com/duw5jvlb4/image/upload/v1624169200/samples/avatar_default6_ctvu5b.png',
  noImage:
    'https://res.cloudinary.com/duw5jvlb4/image/upload/v1624383950/samples/no-image_dfpama.png',
  GOOGLE_LOGIN_CLIENT_ID:
    '757630812325-p3vs5s0g07ps5refbim2qqniu6hk19jg.apps.googleusercontent.com',
  FACEBOOK_LOGIN_APP_ID: '527439194971667',
  client_url:
    process.env.NODE_ENV === 'production'
      ? 'https://www.courseplanet.site'
      : 'http://localhost:4250',
};
