const backendDomain = "http://localhost:8080";
const summaryApi = {
  signUp: {
    url: `${backendDomain}/api/register`,
    method: "post",
  },

  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },

  userDetail: {
    url: `${backendDomain}/api/user-detail`,
    method: "get",
  },

  logOut: {
    url: `${backendDomain}/api/logout`,
    method: "get",
  },
};

export default summaryApi;
