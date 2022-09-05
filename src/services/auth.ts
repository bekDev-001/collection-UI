import  { service } from ".";

export default {
  // register
  userRegistration: ( username:string, password: string, email: string ) =>
    service.post("/api/user/signUp", { username,email, password }),
  // login
  userLogin: ( username:string, password: string ) =>
    service.post("/api/user/signIn", { username, password }),
};
