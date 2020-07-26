import React, {Component} from "react";
import axios from 'axios';
import '../styles/Cabinet.css';
import Recipe from "./Recipe";
import RecipeStorage from "./RecipeStorage";
import {Redirect} from "react-router";
import RecipeLiked from "./RecipeLiked";
import {Link} from "react-router-dom";

const url = 'http://localhost:9000/api/user';

class Cabinet extends Component{
    constructor(props){
        super(props);
        this.state = {myrecipes: [], likedrecipes: [], isLogged: true};
    }

    async componentDidMount() {
        if (localStorage.getItem("user") == null){
            this.setState({isLogged: false})
        } else {
            let user = JSON.parse(localStorage.getItem("user"));
            let res = await axios.get(url+'/'+user.login);
            let logged = res.data;
            localStorage.setItem("user", JSON.stringify(logged));
            user = JSON.parse(localStorage.getItem("user"));
            let liked = JSON.parse(user.liked);

            let likedpromises = [];
            for (let i = 0; i < liked.length; i++) {
                likedpromises.push(RecipeStorage.getRecipeById(liked[i]));
            }

            Promise.all(likedpromises).then(value => {
                let likedrecipes = [];
                for (let i = 0; i < value.length; i++) {
                    if (value[i] !== ""){
                        likedrecipes.push(value[i]);
                    }
                }
                this.setState({
                    likedrecipes: likedrecipes
                });
            });

            this.setState({
                myrecipes: await RecipeStorage.getRecipesOfAuthor(user.login)
            });
        }
    }

    exit(){
        delete localStorage.user;
    }


    render() {
        let name;

        if (localStorage.getItem("user") == null){
            return <Redirect to={'/login'}  />
        } else {
            name = JSON.parse(localStorage.getItem("user")).login;
        }

        return(
            <div className={'cabinet'}>
                <Link to={'/recipes'}>
                    <button className={'btn btn-danger exit'} onClick={this.exit}>Вихід</button>
                </Link>
                <p className={'mycab'}>
                    Кабінет <span className={'user'}>{name}</span>
                </p>
                <div className={'bl'}>
                    <div className={'my'}>
                        <p className={'title'}>Мої рецепти</p>
                        <div className={'recipes'}>
                            {this.state.myrecipes.map((recipe, index) => {
                                return <Recipe id={recipe._id} name={recipe.name} description={recipe.shortDesc}
                                               date={recipe.createDate} category={recipe.category} author={recipe.author} width={60}/>
                            })}
                        </div>
                    </div>
                    <div className={'lk'}>
                        <p className={'title'}>Мої вподобання</p>
                        <div className={'recipes'}>
                            {this.state.likedrecipes.map((recipe, index) => {
                                return <RecipeLiked id={recipe._id} name={recipe.name} description={recipe.shortDesc}
                                               date={recipe.createDate} category={recipe.category} author={recipe.author} width={60}/>
                            })}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Cabinet;
