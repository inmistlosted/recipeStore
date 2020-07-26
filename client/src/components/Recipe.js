import React, {Component} from "react";

import "../styles/Recipe.css";
import RecipeStorage from "./RecipeStorage";
import {Link, Redirect} from "react-router-dom";


class Recipe extends Component {
    constructor(props){
        super(props);
        this.state = {isDone: false};
    }

    deleteRecipe(id) {
        RecipeStorage.deleteRecipe(id).then(() => {
            this.setState({isDone: true})
        });
    }

    render() {
        if (this.state.isDone === true) {
            return <Redirect to='/cabinet' />
        }

        let info = <div className={'card-body'}>
            <p className={'date align-top'}>Додано: {(new Date(this.props.date)).toLocaleDateString()}</p>
            <Link to={'recipes/' + this.props.id}>
                <h5 className={'card-title ttl'}>{this.props.name}</h5>
            </Link>
            <p className={'option-block'}><span className={'option'}>Категорія: </span>{this.props.category}</p>
            <p className={'option-block'}><span className={'option'}>Автор: </span>{this.props.author}</p>
            <div className={'option-block'}>
                <p className={'card-text'}>{this.props.description}</p>
            </div>
        </div>;

        return (
            <div className={'card recipe'} style={{width: this.props.width+'%'}}>
                <Link to={'recipes/' + this.props.id}>
                    <img src={'http://placehold.it/500x400'} className={'card-img-top image'} alt={'...'}/>
                </Link>
                {info}
                <div className={'card-footer btns'}>
                    <div>
                        <Link to={'edit/' + this.props.id}>
                            <button className={'btn btn-warning btn2'}>Редагувати</button>
                        </Link>
                    </div>
                    <div>
                        <button className={'btn btn-danger btn2'}  onClick={(e) => {this.deleteRecipe(this.props.id, e)}}>Видалити</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipe;
