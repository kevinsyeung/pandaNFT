import react, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useEthers, useEtherBalance} from "@usedapp/core";
import React from "react";
import "./Login.css";



const Login = () => {
    let navigate = useNavigate();

    const {activateBrowserWallet, account} = useEthers();
    const goLogin = () => {
        debugger
        // 获取input的username和password
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (username === "admin" && password === "admin") {
            navigate("/");
        } else {
            // 弹框提示账户or密码错误
            alert("username or password is wrong!")
        }
    };

    return (
        <div class="center">
            <h1>Sign in/ Sign up</h1>
            <div class="logon">
                <div class="overlaylong">
                    <div class="overlaylong-Signin" v-if="disfiex == 0">
                        <h2 class="overlaylongH2">Sign in</h2>
                        <input id ="username" type="text" placeholder="username"/>
                        <input id ="password" type="text" placeholder="password"/>
                        {/*<h3>Forgot your password?</h3>*/}
                        <button class="inupbutton" id="login" onClick={goLogin}>Login</button>
                    </div>

                </div>
                <div class="overlaytitle">
                    <div class="overlaytitle-Signin" v-if="disfiex == 0">
                        <h2 class="overlaytitleH2">Hello,Friend!</h2>
                        <p class="overlaytitleP">
                            Enter your personal details and start journey with us
                        </p>
                    </div>
                    <div class="overlaytitle-Signup" v-if="disfiex == 1">
                        <h2 class="overlaytitleH2">Welcome Back!</h2>
                        <p class="overlaytitleP">To keep connected with us please login with your personal info</p>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Login;
