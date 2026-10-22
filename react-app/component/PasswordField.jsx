import { useState } from "react";

function PasswordField() {

    const [visible, setVisible] = useState(false);

    return(
        <div className="">
            <label htmlFor="password">Password</label>
            <input type="{visible ? 'text' : 'password'}" placeholder="Input your Password"  />
            <button type="button" onClick={() => setVisible(!visible)} > {visible ? 'Hide' : 'Show'}</button>
        </div>
    )
    
}

export default PasswordField;