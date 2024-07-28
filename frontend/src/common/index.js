const backendDomain = "https://techyrr-project-ecom.onrender.com";
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

  addProduct: {
    url: `${backendDomain}/api/add-product`,
    method: "post",
  },

  getProductPagination: {
    url: `${backendDomain}/api/admin-pagination`,
    method: "get",
  },

  deleteProduct: {
    url: `${backendDomain}/api/delete-product`,
    method: "post",
  },

  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },

  getProductById: {
    url: `${backendDomain}/api/product/`,
    method: "get",
  },

  getProducts: {
    url: `${backendDomain}/api/products`,
    method: "get",
  },

  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },

  categoryList: {
    url: `${backendDomain}/api/category-list`,
    method: "get",
  },

  allCategoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "get",
  },
};

export default summaryApi;
