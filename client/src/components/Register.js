import React, {Component} from "react";
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

import "../styles/Register.css";

const url = 'http://localhost:9000/api/user';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {logged: false};
    }

    register = () => {
        let login = document.getElementById('reg_login');
        let password = document.getElementById('reg_password');
        let confirm = document.getElementById('reg_confirm');
        if (login.value !== "" && password.value !== "" && password.value === confirm.value){
            let user = {
                login: login.value,
                password: password.value,
                liked: "[]"
            };

            axios.get(url + '/' + login.value).then((res) => {
               let isUser = res.data;
               if (isUser === ""){
                   let flag = false;
                   axios.post(url+'/register', user).then((res) => {
                       let logged = res.data;
                       localStorage.setItem("user", JSON.stringify(logged));
                       flag = true;
                   });
                   this.setState({logged: flag});
               } else {
                   alert("Користувач з таким логіном вже існує");
               }
            });


        } else {
            this.loginBlur();
            this.passBlur();
            this.confirmBlur();
        }
    };

    loginBlur() {
        let login = document.getElementById("reg_login");
        if (login.value === "") {
            let mess = document.getElementById("reg_login_wrong");
            mess.style.display = 'block';
            login.style.borderColor = 'red';
        } else {
            let mess = document.getElementById("reg_login_wrong");
            mess.style.display = 'none';
            login.style.borderColor = '#ced4da';
        }
    }

    passBlur() {
        let password = document.getElementById("reg_password");
        if (password.value === "") {
            let mess = document.getElementById("reg_password_wrong");
            mess.style.display = 'block';
            password.style.borderColor = 'red';
        } else {
            let mess = document.getElementById("reg_password_wrong");
            mess.style.display = 'none';
            password.style.borderColor = '#ced4da';
        }
    }

    confirmBlur() {
        let password = document.getElementById("reg_password");
        let confirm = document.getElementById("reg_confirm");
        if (password.value !== confirm.value) {
            let mess = document.getElementById("reg_confirm_wrong");
            mess.style.display = 'block';
            password.style.borderColor = 'red';
            confirm.style.borderColor = 'red';
        } else {
            let mess = document.getElementById("reg_confirm_wrong");
            mess.style.display = 'none';
            password.style.borderColor = '#ced4da';
            confirm.style.borderColor = '#ced4da';
        }
    }

    render() {
        if (this.state.logged || localStorage.getItem("user") != null){
            return <Redirect to={'/cabinet'}/>
        }


        return (
            <div>
                <Link to={'/recipes'}>
                    <button className={'btn btn-danger register'}>Назад</button>
                </Link>
                <div className={'rgstr border border-success rounded'}>
                    <h2 className={'ttl'}>Реєстрація</h2>
                    <div>
                        <div className={'form-group mrg'}>
                            <label htmlFor={'add_name'}>Введіть логін</label>
                            <input type={'text'} className={'form-control'} id={'reg_login'} onBlur={this.loginBlur}
                                   required={true}/>
                            <div className={'invalid-feedback wrong'} id={'reg_login_wrong'}>
                                Введіть логін будь-ласка
                            </div>
                        </div>
                        <div className={'form-group mrg'}>
                            <label htmlFor={'add_name'}>Введіть пароль</label>
                            <input type={'password'} className={'form-control'} id={'reg_password'} onBlur={this.passBlur}
                                   required={true}/>
                            <div className={'invalid-feedback wrong'} id={'reg_password_wrong'}>
                                Введіть пароль будь-ласка
                            </div>
                        </div>
                        <div className={'form-group mrg'}>
                            <label htmlFor={'add_name'}>Підтвердіть пароль</label>
                            <input type={'password'} className={'form-control'} id={'reg_confirm'} onBlur={this.confirmBlur}
                                   required={true}/>
                            <div className={'invalid-feedback wrong'} id={'reg_confirm_wrong'}>
                                Пароль не співпадає
                            </div>
                        </div>
                        <div className={'btns'}>
                            <Link to={'/recipes'}>
                                <button className={'btn btn-success wdth20'} onClick={this.register}>Зараеєструватися</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Register;
