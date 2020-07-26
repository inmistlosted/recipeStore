import React from "react";
import axios from 'axios'

const url = 'http://localhost:9000/api/recipes';

class RecipeStorage {

    static getRecipes() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(data.map(recipe => ({
                    ...recipe
                })));
            } catch (e) {
                reject(e);
            }
        });
    }

    static getRecipeById(id){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url + '/' + id);
                const data = res.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    static addRecipe(recipe){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url, recipe);
                const data = res.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    static deleteRecipe(id){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.delete(url + '/' + id);
                const data = res.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    static updateRecipe(id, newRecipe){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.put(url + '/' + id, newRecipe);
                const data = res.data;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    static getRecipesOfAuthor(author){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url + '/author/' + author);
                const data = res.data;
                resolve(data.map(recipe => ({
                    ...recipe
                })));
            } catch (e) {
                reject(e);
            }
        });
    }


    static getRecipesOfCategory(category, recipes){
        let recipesOfCategory = [];
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].category === category){
                recipesOfCategory.push(recipes[i]);
            }
        }
        return recipesOfCategory;
    }

    static getRecipesByName(name, recipes){
        let recipesByName = [];
        for (let i = 0; i < recipes.length; i++) {
            let recName = recipes[i].name;
            let recNameArr = recName.split("");
            let nameArr = name.split("");
            let match = false;
            for (let j = 0; j < recNameArr.length; j++) {
                for (let k = 0; k < nameArr.length; k++) {
                    if (recNameArr[j + k].toLowerCase() !== nameArr[k].toLowerCase()){
                        break;
                    } else {
                        if (k === nameArr.length-1){
                            match = true;
                        }
                    }
                }
                if (match) break;
            }

            if (match){
                recipesByName.push(recipes[i]);
            }
        }

        return recipesByName;
    }

    static sortBy(type, recipes){
        if (type === '2'){
            return recipes.sort((recipe1, recipe2) => {
                return Date.parse(recipe1.createDate) - Date.parse(recipe2.createDate);
            });
        } else {
            return recipes.sort((recipe1, recipe2) => {
                return Date.parse(recipe2.createDate) - Date.parse(recipe1.createDate);
            });
        }
    }
}

export default RecipeStorage;
