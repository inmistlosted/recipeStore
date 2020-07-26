import React, {Component} from "react";
import axios from 'axios'

import "../styles/Recipe.css";
import {Link} from "react-router-dom";


const url = 'http://localhost:9000/api/user';

class RecipeLiked extends Component {
    constructor(props){
        super(props);
        this.state = {isDone: false, islogged: true};
        delete localStorage.currentLikes;
    }

    async componentDidMount() {
        if (localStorage.getItem("user") != null) {
            let user = JSON.parse(localStorage.getItem("user"));
            let res = await axios.get(url + '/' + user.login);
            let logged = res.data;
            localStorage.setItem("user", JSON.stringify(logged));
        }
    }

    render() {
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

                </div>
            </div>
        );
    }
}

export default RecipeLiked;
