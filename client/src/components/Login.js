import React, {Component} from "react";
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

import "../styles/Login.css";

const url = 'http://localhost:9000/api/user';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {logged: false};
    }

    enter = () => {
        let login = document.getElementById('login');
        let password = document.getElementById('password');
        if (login.value !== "" && password.value !== ""){
            let user = {
                login: login.value,
                password: password.value
            };
            let flag = false;
            axios.post(url, user).then((res) => {
                let logged = res.data;
                if (logged === ""){
                    alert("Не вірний логін або пароль");
                } else {
                    localStorage.setItem("user", JSON.stringify(logged));
                    flag = true;
                }
            });
            this.setState({logged: flag});
        } else {
            this.loginBlur();
            this.passBlur();
        }
    };

    loginBlur() {
        let login = document.getElementById("login");
        if (login.value === "") {
            let mess = document.getElementById("login_wrong");
            mess.style.display = 'block';
            login.style.borderColor = 'red';
        } else {
            let mess = document.getElementById("login_wrong");
            mess.style.display = 'none';
            login.style.borderColor = '#ced4da';
        }
    }

    passBlur() {
        let password = document.getElementById("password");
        if (password.value === "") {
            let mess = document.getElementById("password_wrong");
            mess.style.display = 'block';
            password.style.borderColor = 'red';
        } else {
            let mess = document.getElementById("password_wrong");
            mess.style.display = 'none';
            password.style.borderColor = '#ced4da';
        }
    }

    render() {
        if (this.state.logged || localStorage.getItem("user") != null){
            return <Redirect to={'/cabinet'}/>
        }


        return (
            <div>
                <Link to={'/register'}>
                    <button className={'btn btn-warning goback'}>Реєстрація</button>
                </Link>
                <Link to={'/recipes'}>
                    <button className={'btn btn-danger register'}>Назад</button>
                </Link>
                <div className={'login border border-success rounded'}>
                    <h2 className={'ttl'}>Вхід</h2>
                    <div>
                        <div className={'form-group'}>
                            <label htmlFor={'add_name'}>Логін</label>
                            <input type={'text'} className={'form-control'} id={'login'} onBlur={this.loginBlur}
                                   required={true}/>
                            <div className={'invalid-feedback wrong'} id={'login_wrong'}>
                                Введіть логін будь-ласка
                            </div>
                        </div>
                        <div className={'form-group mrg'}>
                            <label htmlFor={'add_name'}>Пароль</label>
                            <input type={'password'} className={'form-control'} id={'password'} onBlur={this.passBlur}
                                   required={true}/>
                            <div className={'invalid-feedback wrong'} id={'password_wrong'}>
                                Введіть пароль будь-ласка
                            </div>
                        </div>
                        <div className={'btns'}>
                            <button className={'btn btn-success wdth20'} onClick={this.enter}>Увійти</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;
