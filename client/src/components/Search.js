import React, {Component} from "react";
import {Link} from "react-router-dom";

import "../styles/Search.css";

class Search extends Component{
    render() {
        function find() {
            let search = document.getElementById('search');
            let mess = document.getElementById("search-mess");
            let show = document.getElementById("search-show");
            localStorage.setItem("search", search.value);
            mess.innerHTML = search.value;
            show.style.display = 'block';
            document.getElementById("cat").style.display = 'none';
            delete localStorage.category;
        }

        return(
            <div className={"input-group mb-3 search"}>
                <input type={"text"} className={"form-control inp"} placeholder={"Введіть назву рецепту"}
                aria-label={"Введіть назву рецепту"} aria-describedby={"button-addon2"} id={'search'}/>
                <Link to={'/recipes'} onClick={find}>
                    <button className={"btn btn-dark btn2"} type={"button"} id={"button-addon2"}>Знайти</button>
                </Link>
            </div>
        )
    }
}

export default Search;
