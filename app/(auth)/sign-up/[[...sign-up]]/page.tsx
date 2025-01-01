import {SignUp} from '@clerk/nextjs';

const SignUpPage = () => {
  return <SignUp path={'/sign-up'} fallbackRedirectUrl={'/new-user'} />;
};

export default SignUpPage;
