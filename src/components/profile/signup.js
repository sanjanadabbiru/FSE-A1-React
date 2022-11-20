import {useState} from "react";
import * as service
         from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

export const Signup = () => {
  const [newUser, setNewUser] = useState({});
  const navigate = useNavigate();
  const signup = () =>
    service.signup(newUser)
      .then(() => navigate('/profile'))
      .catch(e => alert(e));
  return (
    <div>
      <h1>Signup</h1>
      <div className="mt-2 ">
      <input placeholder="username" onChange={(e) =>
        setNewUser({...newUser,
          username: e.target.value})}/>
      </div>
      <div className="mt-2">
        <input placeholder="password" onChange={(e) =>
        setNewUser({...newUser,
          password: e.target.value})}/>
      </div>
      <div className="mt-2">
        <input placeholder="email" onChange={(e) =>
          setNewUser({...newUser,
            email: e.target.value})}/>
      </div>
        <button onClick={signup} className="mt-2 float-start btn rounded-pill">
          Signup</button>
    </div>
  );
}
export default Signup;