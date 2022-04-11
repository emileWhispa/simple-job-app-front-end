import { withRouter } from 'react-router-dom';
import {Component} from "react";
import {Button, Card, Form, Spinner} from "react-bootstrap";
import CustomLink from "./CustomLink";
import SweetAlert from "react-bootstrap-sweetalert";

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            alert:false,
            alertType:"success",
            alertTitle:"Success",
            alertContent:"Application submitted successfully, wait for approval",
            props:props,
            loggedIn: localStorage.getItem("user")
        }
        this.someText = this.someText.bind(this);

    }

    someText(){
        this.props.history.push(`/applications`);
    }

    componentDidMount() {
        if(this.state.loggedIn){
            this.someText();
        }
    }

    async submitForm(target) {
        this.setState({
            loading: true
        });

        let data = new FormData(target);
        let res = await fetch('http://157.245.91.123:8080/api/auth/sign-in', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username:data.get("username"),
                password:data.get("password")
            })
        });

        let json = await res.json();
        if(res.status === 200){
            target.reset();
            localStorage.setItem("user",JSON.stringify(json))
            this.someText();
        }else{
            this.setState({
                loading: false,
                alert:true,
                alertType:"error",
                alertTitle:"Error",
                alertContent:json.message
            });

        }
    }

    render() {

        return <div className="App">
            {
                this.state.alert && <SweetAlert
                    title={this.state.alertTitle}
                    type={this.state.alertType}
                    onConfirm={()=>this.setState({
                        alert:false
                    })}
                    onCancel={()=>this.setState({
                        alert:false
                    })}
                    // showCancel={true}
                    btnSize={'sm'}

                    confirmBtnText={'Close'}
                    confirmBtnCssClass={'btn btn-'+this.state.alertType+' btn-sm'}
                    focusCancelBtn={true}
                >{this.state.alertContent}</SweetAlert>
            }
            <div className={'row align-items-center justify-content-center'}>
                <div className={'col-md-4'}>
                    <Card className={'p-3 mt-5 shadow-sm'}>
                        <Form style={{textAlign:"left"}} onSubmit={(e)=>{
                            e.preventDefault();
                            this.submitForm(e.currentTarget);
                        }}>
                            <h1>Staff Login</h1>
                            <h6>Enter your sign in credentials</h6>
                            <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" name={'username'} required={'required'}/>
                                <Form.Text className="text-muted">
                                    Username is required.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name={'password'} required={'required'}/>
                                <Form.Text className="text-muted">
                                    Password is required.
                                </Form.Text>
                            </Form.Group>
                            <div className={'clearfix'}>
                                <div className={'float-end'}>{this.state.loading ? <Spinner animation="border" /> : <Button variant="success" type="submit" className={'mt-2'}>
                                    Staff Sign in
                                </Button>}</div>
                            </div>

                            <div className={'mt-3'}>
                                <CustomLink to={'/'} className={'btn btn-link text-success'}>&lt;&lt; Back to Home !!</CustomLink>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>;
    }
}

export default withRouter(Login);