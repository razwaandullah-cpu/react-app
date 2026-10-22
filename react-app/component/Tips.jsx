import { useState } from "react";

function Tips() {
    const [show, setShow] = useState(false);


    return(
        <div className="">
            <button onClick={() => setShow(!show)}>Toggle</button>
            <p>{show && 'Study Reactjs Well'}</p>
            </div>
    )
}

export default Tips