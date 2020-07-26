import React, {Component} from "react";

import '../styles/App.css';
import Search from "./Search";
import Nav from "./Nav";
import RecipeList from "./RecipeList";

class Content extends Component{
    render() {
        return(
            <div>
                <Search />
                <div className={'content'}>
                    <Nav />
                    <RecipeList />
                </div>
            </div>
        );
    }
}

export default Content;
