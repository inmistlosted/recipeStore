import React, {Component} from "react";

import "../styles/EditForm.css";
import RecipeStorage from "../components/RecipeStorage";
import {Link, Redirect} from "react-router-dom";

class EditForm extends Component{
    constructor(props){
        super(props);
        this.state = {isDone: false}
    }

    async componentDidMount() {
        let name = document.getElementById("edit_name");
        let desc = document.getElementById("edit_descr");
        let category = document.getElementById("edit_category");
        let cooking = document.getElementById("edit_cook");

        let recipe = await RecipeStorage.getRecipeById(this.props.match.params.id);

        name.value = recipe.name;
        desc.value = recipe.shortDesc;
        category.value = recipe.category;
        cooking.value = recipe.longDesc;
    }

    saveRecipe(id) {
        let name = document.getElementById("edit_name");
        let desc = document.getElementById("edit_descr");
        let category = document.getElementById("edit_category");
        let cooking = document.getElementById("edit_cook");

        if (name.value === "" || desc.value === "" || cooking.value === "") {
            this.nameBlur();
            this.descrBlur();
            this.cookBlur();
        } else {
            let updateDate = new Date().toString();
            let recipe = {
                "name": name.value,
                "category": category.value,
                "shortDesc": desc.value,
                "longDesc": cooking.value,
                "updateDate": updateDate
            };

            RecipeStorage.updateRecipe(id, recipe).then(() => {
                this.setState({isDone: true})
            });
        }
    }

    nameBlur() {
        let name = document.getElementById("edit_name");
        if (name.value === ""){
            let mess = document.getElementById("edit_name_wrong");
            mess.style.display = 'block';
            name.style.borderColor = 'red';
        } else {
            let mess = document.getElementById("edit_name_wrong");
            mess.style.display = 'none';
            name.style.borderColor = '#ced4da';
        }
    }

    descrBlur() {
        let name = document.getElementById("edit_descr");
        if (name.value === ""){
            let mess = document.getElementById("edit_descr_wrong");
            mess.style.display = 'block';
            name.style.borderColor = 'red';
        } else {
            let mess = document.getElementById("edit_descr_wrong");
            mess.style.display = 'none';
            name.style.borderColor = '#ced4da';
        }
    }

    cookBlur() {
        let name = document.getElementById("edit_cook");
        if (name.value === ""){
            let mess = document.getElementById("edit_cook_wrong");
            mess.style.display = 'block';
            name.style.borderColor = 'red';
        } else {
            let mess = document.getElementById("edit_cook_wrong");
            mess.style.display = 'none';
            name.style.borderColor = '#ced4da';
        }
    }

    render() {

        if (this.state.isDone === true) {
            return <Redirect to='/recipes' />
        }

        return (

            <div className={'editform border border-warning rounded'}>

                <h2 className={'ttl'}>Редагування рецепту</h2>
                <div>
                    <div className={'form-group'}>
                        <label htmlFor={'add_name'}>Назва</label>
                        <input type={'text'} className={'form-control'} id={'edit_name'} onBlur={this.nameBlur} required={true} />
                        <div className={'invalid-feedback wrong'} id={'edit_name_wrong'}>
                            Введіть назву будь-ласка
                        </div>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'add_category'}>Категорiя</label>
                        <select className={'form-control'} id={'edit_category'}>
                            <option>Випічка</option>
                            <option>Супи</option>
                            <option>Пироги</option>
                            <option>Соуси</option>
                            <option>Десерти</option>
                        </select>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'add_descr'}>Короткий опис</label>
                        <textarea className={'form-control'} id={'edit_descr'} rows={'4'} onBlur={this.descrBlur} required={true}/>
                        <div className={'invalid-feedback'} id={'edit_descr_wrong'}>
                            Введіть опис будь-ласка
                        </div>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor={'add_cook'}>Спосіб приготування:</label>
                        <textarea className={'form-control'} id={'edit_cook'} rows={'7'} onBlur={this.cookBlur} required={true}/>
                        <div className={'invalid-feedback'} id={'edit_cook_wrong'}>
                            Введіть спосіб приготування будь-ласка
                        </div>
                    </div>
                    <div className={'btns'}>
                        <div>
                            {/*<Link to={'/recipes'}>*/}
                                <button className={'btn btn-success wdth20'} onClick={(e) => {this.saveRecipe(this.props.match.params.id, e)}}>Зберегти</button>
                            {/*</Link>*/}
                        </div>
                        <div>
                            <Link to={'/recipes'}>
                                <button className={'btn btn-danger wdth20'}>Відхилити зміни</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default EditForm;
