import React, {Component} from "react";
import RecipeStorage from "./RecipeStorage"
import "../styles/RecipeList.css"
import RecipeMain from "./RecipeMain";

class RecipeList extends Component{
    constructor(props){
        super(props);
        this.state = {recipes: [], sorting: ""};
    }

    async componentDidMount() {
        if (localStorage.getItem("datesort") != null){
            let vidsort = document.getElementById("vidsort");
            if (localStorage.getItem("datesort") === '1'){
                this.setState({sorting : "Спочатку новіші"});
            } else {
                this.setState({sorting : "Спочатку старіші"});
            }
            vidsort.style.display = 'block';
        }
        this.setState({recipes: await RecipeStorage.getRecipes()});

    }

    render() {
        function showRecipe(recipe, liked){
            let flag = false;
            for (let i = 0; i < liked.length; i++) {
                if (recipe._id === liked[i]){
                    flag = true;
                }
            }
            if (flag){
                return <RecipeMain id={recipe._id} name={recipe.name} description={recipe.shortDesc}
                                   date={recipe.createDate} category={recipe.category} author={recipe.author} classN={'heart-shape-active'}/>
            } else {
                return <RecipeMain id={recipe._id} name={recipe.name} description={recipe.shortDesc}
                                   date={recipe.createDate} category={recipe.category} author={recipe.author} classN={'heart-shape'}/>
            }
        }

        let ttl = <div>
            <p className={'sort-mess'}><span id={'vidsort'}>Відсортовано:</span>
                <span className={'mess'} id={'mess'}> {this.state.sorting}</span>
                <span className={'categ'} id={'cat'}>Категорія:
                                    <span className={'mess'} id={'cat-mess'}></span>
                                </span>
            </p>
            <p className={'sort-mess search-mess'} id={'search-show'}>Результати пошуку по:
                <span className={'mess'} id={'search-mess'}></span>
            </p>
        </div>;

        let liked = [];
        if (localStorage.getItem("user") != null){
            liked = JSON.parse(JSON.parse(localStorage.getItem("user")).liked);
        }

        if (localStorage.getItem("datesort") == null) {
            if (localStorage.getItem("search") == null) {
                if (localStorage.getItem("category") == null) {
                    console.log(1);
                    return (
                        <div>
                            {ttl}
                            <div className={'recipelist'}>
                                {this.state.recipes.map((recipe, index) => {
                                    return showRecipe(recipe, liked);
                                })}
                            </div>
                        </div>
                    );
                } else {
                    console.log(2);
                    return (
                        <div>
                            {ttl}
                            <div className={'recipelist'}>
                                {RecipeStorage.getRecipesOfCategory(localStorage.getItem("category"), this.state.recipes).map((recipe, index) => {
                                    return showRecipe(recipe, liked);
                                })}
                            </div>
                        </div>
                    );
                }
            } else {
                if (localStorage.getItem("category") == null) {
                    console.log(3);
                    return (
                        <div>
                            {ttl}
                            <div className={'recipelist'}>
                                {RecipeStorage.getRecipesByName(localStorage.getItem("search"), this.state.recipes).map((recipe, index) => {
                                    return showRecipe(recipe, liked);
                                })}
                            </div>
                        </div>
                    );
                } else {
                    console.log(4);
                    return (
                        <div>
                            {ttl}
                            <div className={'recipelist'}>
                                {RecipeStorage.getRecipesOfCategory(localStorage.getItem("category"), RecipeStorage.getRecipesByName(localStorage.getItem("search"), this.state.recipes)).map((recipe, index) => {
                                    return showRecipe(recipe, liked);
                                })}
                            </div>
                        </div>

                    );
                }
            }
        } else {
            if (localStorage.getItem("search") == null) {
                if (localStorage.getItem("category") == null) {
                    console.log(5);
                    return (
                        <div>
                            {ttl}
                            <div className={'recipelist'}>
                                {RecipeStorage.sortBy(localStorage.getItem("datesort"), this.state.recipes).map((recipe, index) => {
                                    return showRecipe(recipe, liked);
                                })}
                            </div>
                        </div>
                    );
                } else {
                    console.log(6);
                    return (
                        <div>
                            {ttl}
                            <div className={'recipelist'}>
                                {RecipeStorage.sortBy(localStorage.getItem("datesort"), RecipeStorage.getRecipesOfCategory(localStorage.getItem("category"), this.state.recipes)).map((recipe, index) => {
                                    return showRecipe(recipe, liked);
                                })}
                            </div>
                        </div>
                    );
                }
            } else {
                if (localStorage.getItem("category") == null) {
                    console.log(7);
                    return (
                        <div>
                            {ttl}
                            <div className={'recipelist'}>
                                {RecipeStorage.sortBy(localStorage.getItem("datesort"), RecipeStorage.getRecipesByName(localStorage.getItem("search"), this.state.recipes)).map((recipe, index) => {
                                    return showRecipe(recipe, liked);
                                })}
                            </div>
                        </div>
                    );
                } else {
                    console.log(8);
                    return (
                        <div>
                            {ttl}
                            <div className={'recipelist'}>
                                {RecipeStorage.sortBy(localStorage.getItem("datesort"), RecipeStorage.getRecipesOfCategory(localStorage.getItem("category"), RecipeStorage.getRecipesByName(localStorage.getItem("search"), this.state.recipes))).map((recipe, index) => {
                                    return showRecipe(recipe, liked);
                                })}
                            </div>
                        </div>
                    );
                }
            }
        }
     }
}

export default RecipeList;
