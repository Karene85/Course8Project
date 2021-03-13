import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './Login.css';
import Header from '../../common/header/Header.js';
import { FormHelperText } from '@material-ui/core';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            incorrectCredentialsMsg: 'dispNone',
            usernameRequiredMsg: 'dispNone',
            passwordRequiredMsg: 'dispNone',
        }
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({username: e.target.value});
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value});
    }

    loginClickHandler = () => {
        let username = "test.user";
        let password = "password";
        let accessToken = "IGQVJXQlg4U204MTlUR2NGenpKU0VqZAkpMbGY5ZAHlidnhITWVjWm84SmJuR1lhcV9UaVBwWmtCNEM5SWRGTWV0dWdjVEhUekFjRmJhSDZAJYjhuSnRyWWpUbURVSE5RdkZAaYVd3am9HMFJzZAEdJaVdpTjVGdzFaRVpQSnFn";

        this.state.username === "" ? this.setState({usernameRequiredMsg: 'dispBlock'}) : this.setState({usernameRequiredMsg: 'dispNone'});
        this.state.password === "" ? this.setState({passwordRequiredMsg: 'dispBlock'}) : this.setState({passwordRequiredMsg: 'dispNone'}); 
 

        if(username === this.state.username && password === this.state.password) {
            this.setState({incorrectCredentialsMsg: 'dispNone'});
            this.setState({usernameRequiredMsg: 'dispNone'});
            this.setState({passwordRequiredMsg: 'dispNone'});

            sessionStorage.setItem("access-token", accessToken);
            this.props.history.push("/home");
        }
        else {
            this.setState({incorrectCredentialsMsg: 'dispBlock'})
        }

    }

    render() {
        
        return (
            <div>
                <Header />
                <div className='login-card-container'>
                    <Card className='login-card'>
                        <CardContent>
                            <Typography>LOGIN</Typography>
                            <FormControl>
                                <InputLabel htmlFor='username'>Username</InputLabel>
                                <Input id='username' type='text' required username={this.state.username} onChange={this.inputUsernameChangeHandler}></Input>
                                <FormHelperText className={this.state.usernameRequiredMsg}><span className='red'>required</span></FormHelperText>
                            </FormControl><br/>
                            <FormControl>
                                <InputLabel htmlFor='password'>Password</InputLabel>
                                <Input id='password' type='password' required password={this.state.password} onChange={this.inputPasswordChangeHandler}></Input>
                                <FormHelperText className={this.state.passwordRequiredMsg}><span className='red'>required</span></FormHelperText>
                            </FormControl><br/><br/>
                            <FormHelperText className={this.state.incorrectCredentialsMsg}>
                                <span className='red'>Incorrect username and/or password</span>
                            </FormHelperText><br/><br/>
                            <Button variant='contained' color='primary' className='login-btn' onClick={this.loginClickHandler}>LOGIN</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
        
    ;
}

export default Login;