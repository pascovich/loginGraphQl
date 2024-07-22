export const LoginQuery = (phone, password) => {
  const query = `
    mutation {
      loginOperator(loginOperatorData: {
        phone: "${phone}",
        password: "${password}"
      }) {
        id
      }
    }
  `;
  return query;
};

export const ForgotPasswordQuery = (phone) => {
  const query = `
    mutation {
      forgetPasswordOperator(forgetPasswordOperatorData: {
        phone: "${phone}"
      }) {
        id
      }
    }
  `;
  return query;
};

export const ForgotPasswordVerifyCodeQuery = (phone, token) => {
  const query = `
    mutation {
      forgetPasswordOperatorVerifyCode(forgetPasswordOperatorVerifyCodeData: {
        phone: "${phone}",
        verificationToken:"${token}"
      }) {
        id
      }
    }
  `;
  return query;
};
