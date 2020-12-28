import Axios from "axios";

const options = {
  baseURL: "https://online-election.herokuapp.com//api/v1/",
  timeout: 5 * 1000,
  maxAge: 15 * 60 * 1000,
  limit: false,
  exclude: {
    paths: [],
    query: true,
    filter: null,
  },
  invalidate: async (cfg, req) => {
    const method = req.method.toLowerCase();
    if (method !== "get") {
      await cfg.store.removeItem(cfg.uuid);
    }
  },
  clearOnStale: true,
  clearOnError: true,
  readOnError: false,
  readHeaders: false,
  ignoreCache: false,
  debug: false,
};



const api = Axios.create(options);

api.interceptors.response.use(response => new Promise((resolve, reject) => resolve(response)),
  error => {
    if(!error.response){
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if(error.response.status === 401){
      localStorage.removeItem("authData");
      window.location = "/login";
    } else {
      return Promise((resolve, reject) => {
        reject(error)
      });
    };
  });

export default api;

export const setAuthHeaderToken = (token) => {
  if (token) {
    //applying token
    api.defaults.headers.common["Authorization"] = token.token_type + " " + token.token;
  } else {
    //deleting the token from header
    delete api.defaults.headers.common["Authorization"];
  }
};