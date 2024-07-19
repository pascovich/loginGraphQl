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
