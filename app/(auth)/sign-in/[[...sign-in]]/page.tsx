import {SignIn} from '@clerk/nextjs';

const SignInPage = () => {
  return <SignIn path={'/sign-in'} fallbackRedirectUrl={'/journal'}/>;
};

export default SignInPage;
