import './App.css';
import {Button, Container, Form, Nav, Navbar, Spinner} from "react-bootstrap";
import CustomLink from "./CustomLink";
import {Component} from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import NavigationBar from "./NavigationBar";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            alert: false,
            alertType: "success",
            alertTitle: "Success",
            alertContent: "Application submitted successfully, wait for approval"
        }
    }


    async submitForm(target) {
        this.setState({
            loading: true
        });
        let res = await fetch('http://127.0.0.1:8083/api/apply/submit', {
            method: "POST",
            body: new FormData(target)
        });
        console.log(res);
        let json = await res.json();
        if (res.status === 200) {
            target.reset();
            this.setState({
                loading: false,
                alert: true,
                alertType: "success",
                alertTitle: "Success",
                alertContent: json.message
            });
        } else {
            this.setState({
                loading: false,
                alert: true,
                alertType: "error",
                alertTitle: "Error",
                alertContent: json.message
            });

        }
    }

    render() {
        return (
            <div className="App">

                <NavigationBar/>

                <Container>
                    <div className={'p-5'}>
                        <h1>Bk Tech house Job Application</h1>
                        <p className={'lead text-muted'}>Simple Job Application used to collect person's details of BK
                            Tech house
                            Job Application</p>
                    </div>
                    {
                        this.state.alert && <SweetAlert
                            title={this.state.alertTitle}
                            type={this.state.alertType}
                            onConfirm={() => this.setState({
                                alert: false
                            })}
                            onCancel={() => this.setState({
                                alert: false
                            })}
                            // showCancel={true}
                            btnSize={'sm'}

                            confirmBtnText={'Close'}
                            confirmBtnCssClass={'btn btn-' + this.state.alertType + ' btn-sm'}
                            focusCancelBtn={true}
                        >{this.state.alertContent}</SweetAlert>
                    }
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        this.submitForm(e.currentTarget);

                    }}>
                        <div className={'row justify-content-center'} style={{textAlign: "left"}}>
                            <div className={'col-md-8'}>
                                <div className={'row'}>
                                    <div className={'col-md-6'}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter first name" name={'firstName'}
                                                          required={'required'}/>
                                        </Form.Group>
                                    </div>
                                    <div className={'col-md-6'}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter last name" name={'lastName'}
                                                          required={'required'}/>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-md-6'}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Email Address"
                                                          name={'emailAddress'}
                                                          required={'required'}/>
                                        </Form.Group>
                                    </div>
                                    <div className={'col-md-6'}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="number" minLength={'10'}
                                                          placeholder="Enter phone number" name={'phoneNumber'}
                                                          required={'required'}/>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-md-6'}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Birth Date</Form.Label>
                                            <Form.Control type="date" placeholder="Enter your Birth Date"
                                                          name={'birthDate'}
                                                          required={'required'}/>
                                        </Form.Group>
                                    </div>
                                    <div className={'col-md-6'}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Physical Address</Form.Label>
                                            <Form.Control type="text" placeholder="Enter your Physical Address"
                                                          name={'address'}
                                                          required={'required'}/>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-md-6'}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>C.V(Curriculum Vitae) Attachment</Form.Label>
                                            <Form.Control type="file" placeholder="Enter your C.V" name={'attachment'}
                                                          required={'required'}/>
                                        </Form.Group>
                                    </div>
                                    <div className={'col-md-6'}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Cover Letter(optional)</Form.Label>
                                            <textarea className={'form-control'} placeholder="Enter your Cover Letter"
                                                      name={'coverLetter'}/>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className={'clearfix'}>
                                    <div className={'float-end'}>{this.state.loading ? <Spinner animation="border"/> :
                                        <Button variant="success" type="submit" className={'mt-2'}>
                                            Submit Application
                                        </Button>}</div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default App;
