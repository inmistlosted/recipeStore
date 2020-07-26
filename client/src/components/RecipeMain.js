import React, {Component} from "react";
import axios from 'axios'

import "../styles/Recipe.css";
import {Link, Redirect} from "react-router-dom";


const url = 'http://localhost:9000/api/user';

class RecipeMain extends Component {
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


    likeRecipe(id) {
        if (localStorage.getItem("user") == null){
            this.setState({islogged: false});
        } else {
            let like = document.getElementById(id);

            like.className = 'heart-shape-active';

            let user = JSON.parse(localStorage.getItem("user"));
            let liked = JSON.parse(user.liked);
            let isLiked = false;

            for (let i = 0; i < liked.length; i++) {
             if (liked[i] === id){
                 isLiked = true;
             }
            }

            if (!isLiked){
                liked.push(id);
                user.liked = JSON.stringify(liked);
                localStorage.setItem("user", JSON.stringify(user));
                let newliked = JSON.stringify(liked);
                axios.put(url+'/liked/'+user.login, {liked: newliked}).then((res) => {
                    let logged = res.data;
                });
            }


        }
    }

    onLike(id){
        let like = document.getElementById(id);
        like.className = 'heart-shape-active';
    }

    outLike(id){
        let like = document.getElementById(id);
        if (localStorage.getItem("user") != null){
            let liked = JSON.parse(JSON.parse(localStorage.getItem("user")).liked);
            let isLiked = false;
            for (let i = 0; i < liked.length; i++) {
                if (id === liked[i]){
                    isLiked = true;
                }
            }

            if (!isLiked){
                let isCurrLiked = false;
                if (localStorage.getItem("currentLikes") != null){
                    let currentLikes = JSON.parse(localStorage.getItem("currentLikes"));
                    for (let i = 0; i < currentLikes.length; i++) {
                        if (id === currentLikes[i]){
                            isCurrLiked = true;
                        }
                    }
                }

                if (!isCurrLiked){
                    like.className = 'heart-shape';
                }
            }
        } else {
            like.className = 'heart-shape';
        }
    }

    render() {
        if (this.state.islogged === false) {
            return <Redirect to='/login' />
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
                    <div className={'like'}>
                        <Link to={'/recipes'}>
                            <div className={this.props.classN} id={this.props.id} onMouseOver={(e) => {this.onLike(this.props.id), e}} onMouseOut={(e) => {this.outLike(this.props.id), e}} onClick={(e) => {this.likeRecipe(this.props.id, e)}}>

                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeMain;
