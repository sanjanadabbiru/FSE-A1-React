import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as service from "../../services/auth-service";

export const Login = () => {
  const [loginUser, setLoginUser] = useState({});
  const navigate = useNavigate()
  const login = () =>
    service.login(loginUser)
      .then((user) => navigate('/profile/mytuits'))
      .catch(e => alert(e));
  return (
    <div>
      <h1>Login</h1>
      <div className="mt-2">
        <input placeholder="username" onChange={(e) =>
          setLoginUser({...loginUser,
            username: e.target.value})}/>
      </div>

      <div className="mt-2">
        <input  placeholder="password"  onChange={(e) =>
          setLoginUser({...loginUser,
            password: e.target.value})}/>
      </div>

      <div className="mt-2">
        <button className="mt-2 float-start btn btn-warning rounded-pill" onClick={login}>
          Login</button>
      </div>
    </div>
  );
};