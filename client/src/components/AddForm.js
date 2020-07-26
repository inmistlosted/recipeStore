import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import "../styles/AddForm.css";
import RecipeStorage from "../components/RecipeStorage";

class AddForm extends Component{
    constructor(props){
        super(props);
        this.state = {id : ""};
    }

    addRecipe = () => {
        let name = document.getElementById("add_name");
        let desc = document.getElementById("add_descr");
        let category = document.getElementById("add_category");
        let cooking = document.getElementById("add_cook");

        if (name.value === "" || desc.value === "" || cooking.value === "") {
            this.nameBlur();
            this.descrBlur();
            this.cookBlur();
        } else {
            let author = JSON.parse(localStorage.getItem("user"));
            let createDate = new Date().toString();
            let recipe = {
                "name": name.value,
                "category": category.value,
                "shortDesc": desc.value,
                "longDesc": cooking.value,
                "createDate": createDate,
                "updateDate": createDate,
                "author": author.login
            };

            RecipeStorage.addRecipe(recipe).then((idOfAdded) => {
                this.setState({id: idOfAdded})
            });
        }
    }

    nameBlur() {
        let name = document.getElementById("add_name");
        if (name.value === "") {
            let mess = document.getElementById("add_name_wrong");
            mess.style.display = 'block';
            name.style.borderColor = 'red';
        } else {
            let mess = document.getElementById("add_name_wrong");
            mess.style.display = 'none';
            name.style.borderColor = '#ced4da';
        }
    }

    descrBlur() {
        let name = document.getElementById("add_descr");
        if (name.value === "") {
            let mess = document.getElementById("add_descr_wrong");
            mess.style.display = 'block';
            name.style.borderColor = 'red';
        } else {
            let mess = document.getElementById("add_descr_wrong");
            mess.style.display = 'none';
            name.style.borderColor = '#ced4da';
        }
    }

    cookBlur() {
        let name = document.getElementById("add_cook");
        if (name.value === "") {
            let mess = document.getElementById("add_cook_wrong");
            mess.style.display = 'block';
            name.style.borderColor = 'red';
        } else {
            let mess = document.getElementById("add_cook_wrong");
            mess.style.display = 'none';
            name.style.borderColor = '#ced4da';
        }
    }


    render() {
        if (this.state.id !== "") {
            return <Redirect to={'/recipes/' + this.state.id}  />
        } else if (localStorage.getItem("user") == null){
            return <Redirect to={'/login'}  />
        }

        return (
            <div className={'addform border border-success rounded'}>
                <h2 className={'ttl'}>Новий рецепт</h2>
                <div>
                    <div className={'form-group'}>
                        <label htmlFor={'add_name'}>Назва</label>
                        <input type={'text'} className={'form-control'} id={'add_name'} onBlur={this.nameBlur}
                               required={true}/>
                        <div className={'invalid-feedback wrong'} id={'add_name_wrong'}>
                            Введіть назву будь-ласка
                        </div>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'add_category'}>Кате9горiя</label>
                        <select className={'form-control'} id={'add_category'}>
                            <option>Випічка</option>
                            <option>Супи</option>
                            <option>Пироги</option>
                            <option>Соуси</option>
                            <option>Десерти</option>
                        </select>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'add_descr'}>Короткий опис</label>
                        <textarea className={'form-control'} id={'add_descr'} rows={'4'} onBlur={this.descrBlur}
                                  required={true}/>
                        <div className={'invalid-feedback'} id={'add_descr_wrong'}>
                            Введіть опис будь-ласка
                        </div>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'add_cook'}>Спосіб приготування:</label>
                        <textarea className={'form-control'} id={'add_cook'} rows={'7'} onBlur={this.cookBlur}
                                  required={true}/>
                        <div className={'invalid-feedback'} id={'add_cook_wrong'}>
                            Введіть спосіб приготування будь-ласка
                        </div>
                    </div>
                    <button className={'btn btn-primary wdth20'} onClick={this.addRecipe}>Додати</button>
                </div>
            </div>
        );
    }
}

export default AddForm;
