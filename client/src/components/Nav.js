import React, {Component} from "react";
import {Link} from "react-router-dom";

import "../styles/Nav.css";

class Nav extends Component{
    constructor(props){
        super(props);
        this.state = {category: ""};
    }

    componentDidMount() {
        if (localStorage.getItem("category") != null){
            delete localStorage.category;
        }

        if (localStorage.getItem("search") != null){
            delete localStorage.search;
        }

        let link1 = document.getElementById("ds1");
        let link2 = document.getElementById("ds2");
        if (localStorage.getItem("datesort") === '1'){
            link1.className = "dropdown-item active";
            link2.className = "dropdown-item";
        } else {
            link2.className = "dropdown-item active";
            link1.className = "dropdown-item";
        }
    }

    render() {

        function getCategory(id) {
            let category = document.getElementById(id);
            localStorage.setItem("category", category.innerHTML);
        }

        function getDateSorting(type) {
            if (type === '1'){
                localStorage.setItem("datesort", 1);
            } else if (type === '2'){
                localStorage.setItem("datesort", 2);
            }
        }

        function showSorting() {
            let mess = document.getElementById('mess');
            let vidsort = document.getElementById("vidsort");
            let link1 = document.getElementById("ds1");
            let link2 = document.getElementById("ds2");
            if (localStorage.getItem("datesort") === '1'){
                mess.innerHTML = "Спочатку новіші";
                link1.className = "dropdown-item active";
                link2.className = "dropdown-item";
            } else {
                mess.innerHTML = "Спочатку старіші";
                link2.className = "dropdown-item active";
                link1.className = "dropdown-item";
            }
            vidsort.style.display = 'block';
        }

        function showCategory() {
            let links = document.getElementById('cts');
            let allLinks = links.getElementsByTagName("a");
            for (let i = 1; i < allLinks.length; i+=2) {
                allLinks[i].className = "dropdown-item";
                if (allLinks[i].innerHTML === localStorage.getItem("category")){
                    allLinks[i].className = "dropdown-item active";
                }
            }
            let mess = document.getElementById("cat-mess");
            mess.innerHTML = " " + localStorage.getItem("category");
            document.getElementById("cat").style.display = 'block';
        }

        return(
            <div className={'nav'}>
                <nav className={"nav-pills flex-column flex-sm-column wdth100"}>
                    <Link to={'/add'}>
                        <button className={'btn btn-success btn2 add'}>Додати рецепт</button>
                    </Link>
                    <div className={'line'}></div>
                    <div className={'nav-item dropdown sorts'}>
                        <a className="nav-link dropdown-toggle text-sm-center text-white bg-secondary" data-toggle="dropdown" href="#" role="button"
                           aria-haspopup="true" aria-expanded="false">Сортувати за датою</a>
                        <div className="dropdown-menu">
                            <Link to={'recipes'} onClick={showSorting}>
                                <a className="dropdown-item" id={'ds1'} href="#" onClick={(e) => {getDateSorting('1', e)}}>Спочатку новіші</a>
                            </Link>
                            <Link to={'recipes'} onClick={showSorting}>
                                <a className="dropdown-item" href="#" id={'ds2'} onClick={(e) => {getDateSorting('2', e)}}>Спочатку старіші</a>
                            </Link>
                        </div>
                    </div>
                    <div className={'nav-item dropdown sorts'}>
                        <a className="nav-link dropdown-toggle text-sm-center text-white bg-secondary" data-toggle="dropdown" href="#" role="button"
                           aria-haspopup="true" aria-expanded="false">Фільтр по категоріям</a>
                        <div className="dropdown-menu" id={'cts'}>
                            <Link to={'/recipes'} onClick={showCategory}>
                                <a className="dropdown-item" href="" id={'ct1'} onClick={(e) => {getCategory('ct1', e)}}>Випічка</a>
                            </Link>
                            <Link to={'/recipes'} onClick={showCategory}>
                                <a className="dropdown-item" href="" id={'ct2'} onClick={(e) => {getCategory('ct2', e)}}>Супи</a>
                            </Link>
                            <Link to={'/recipes'} onClick={showCategory}>
                                <a className="dropdown-item" href="#" id={'ct3'} onClick={(e) => {getCategory('ct3', e)}}>Пироги</a>
                            </Link>
                            <Link to={'/recipes'} onClick={showCategory}>
                                <a className="dropdown-item" href="#" id={'ct4'} onClick={(e) => {getCategory('ct4', e)}}>Соуси</a>
                            </Link>
                            <Link to={'/recipes'} onClick={showCategory}>
                                <a className="dropdown-item" href="#" id={'ct5'} onClick={(e) => {getCategory('ct5', e)}}>Десерти</a>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}


export default Nav;
