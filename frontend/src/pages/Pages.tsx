import { lazy } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { RootState } from '../redux/reducers';
// eslint-disable-next-line prettier/prettier
import { CourseDetail, Home, Login, ProfileUser, Register, NotFound } from '../components/templates';

const About = lazy(() => import('../components/templates/AboutTemplate'));
const Admin = lazy(() => import('../components/templates/AdminTemplate'));
const EditProfile = lazy(
  () => import('../components/templates/EditProfileTemplate')
);
const Courses = lazy(() => import('../components/templates/CoursesTemplate'));
const ResignedUser = lazy(
  () => import('../components/templates/ResignedUserTemplate')
);
const ActivateEmail = lazy(
  () => import('../components/templates/ActivateEmailTemplate')
);
const SendMailResetPassword = lazy(
  () => import('../components/templates/SendMailResetPasswordTemplate')
);
const ResetPassword = lazy(
  () => import('../components/templates/ResetPasswordTemplate')
);

const Pages = () => {
  const { token, user } = useSelector(
    (state: RootState) => ({
      token: state.auth.token,
      user: state.auth.user,
    }),
    shallowEqual
  );

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/courses" exact component={Courses} />
      <Route path="/course/:id" exact component={CourseDetail} />
      <Route path="/about" exact component={About} />
      <Route
        path="/admin"
        exact
        component={token && user?.role === 1 ? Admin : NotFound}
      />
      <Route path="/user/resigned_user" exact component={ResignedUser} />
      <Route path="/user/:username" exact component={ProfileUser} />
      <Route
        path="/user/:username/edit"
        exact
        component={token ? EditProfile : NotFound}
      />
      <Route
        path="/auth/activate/:activation_token"
        exact
        component={ActivateEmail}
      />
      <Route path="/forgot_pw" exact component={SendMailResetPassword} />
      <Route path="/reset_pw/:token" exact component={ResetPassword} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
};

export default Pages;
