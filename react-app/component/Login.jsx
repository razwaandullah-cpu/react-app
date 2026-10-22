import { useState } from 'react'


function Login() {
const [loggedin, setLoggedin] = useState(false);


  return (
    <div className="">
        <button onClick={() => setLoggedin(!loggedin)}>{loggedin ? 'Logout' : 'Login'}</button>
        <p>{loggedin ? 'Welcome to my page' : 'please login'}</p>
    </div>
  )

}

export default Login;