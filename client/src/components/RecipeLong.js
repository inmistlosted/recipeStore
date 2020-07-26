import React, {Component} from "react";

import "../styles/RecipeLong.css";
import RecipeStorage from "./RecipeStorage";
import {Link, Redirect} from "react-router-dom";

class RecipeLong extends Component {
    constructor(props){
        super(props);
        this.state = {isDone: false, author: ""}
    }

    deleteRecipe(id) {
        RecipeStorage.deleteRecipe(id).then(() => {
            this.setState({isDone: true})
        });
    }

    async componentDidMount() {
        let name = document.getElementById("name");
        let cooking = document.getElementById("cooking");

        let recipe = await RecipeStorage.getRecipeById(this.props.match.params.id);

        name.innerHTML = recipe.name;
        cooking.innerHTML = recipe.longDesc;
        this.setState({author: recipe.author});
    }

    render() {
        if (this.state.isDone === true) {
            return <Redirect to='/recipes' />
        }

        let btns;

        if (localStorage.getItem("user") != null){
            let user = JSON.parse(localStorage.getItem("user"));
            if (this.state.author === user.login){
                btns = <div className={'btns'}>
                    <div>
                        <Link to={'/edit/' + this.props.match.params.id}>
                            <button className={'btn btn-warning btn2'}>Редагувати</button>
                        </Link>
                    </div>
                    <div>
                        <button className={'btn btn-danger btn2'} onClick={(e) => {this.deleteRecipe(this.props.match.params.id, e)}}>Видалити</button>
                    </div>
                </div>;
            }
        }

        return (
            <div className={'card long'}>
                <img src={'http://placehold.it/1200x300'} className={'card-img-top image'} alt={'...'}/>
                <div className={'card-body'}>
                    <h5 className={'card-title ttl'} id={'name'}></h5>
                    <div className={'option-block'}>
                        <p className={'option'}>Приготування:</p>
                        <p className={'card-text text'} id={'cooking'}></p>
                    </div>
                </div>
                {btns}
            </div>
        );
    }
}

export default RecipeLong;
