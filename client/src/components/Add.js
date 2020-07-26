import React, {Component} from "react";
import AddForm from "../components/AddForm";
import {Link} from "react-router-dom";

import "../styles/Add.css";

class Add extends Component{
    render() {
        return(
            <div>
                <Link to={'/recipes'}>
                    <button className={'btn btn-danger add-deny'}>Відхилити</button>
                </Link>
                <AddForm/>
            </div>
        );
    }
}

export default Add;
