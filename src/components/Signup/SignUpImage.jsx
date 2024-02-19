import React from 'react';
import signUpImage from '../../assets/img/logos/signUp.png';

export const SignUpImage = () => (
  <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
    <img src={signUpImage} className="img-fluid mx-auto" alt="Responsive image" />
  </div>
);

export default SignUpImage;