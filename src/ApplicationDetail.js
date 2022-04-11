import {Component} from "react";
import NavigationBar from "./NavigationBar";
import {withRouter} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";

class ApplicationDetail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            status:props.history.location.state.data.status,
            loading:false,
            loggedIn: localStorage.getItem("user")
        }
    }

    componentDidMount() {
        if(this.state.loggedIn) {
            // this.fetchApplications();
        }else{
            this.props.history.push('/login');
        }
    }

    async changeStatus(status){
        this.setState({
            loading: true
        });

        let data = JSON.parse(localStorage.getItem("user")).data;
        let id = this.props.history.location.state.data.id;
        let res = await fetch('http://157.245.91.123:8080/api/applications/update/status/'+id+'/'+status, {
            // method: "POST",
            headers: {
                Authorization: "Bearer " + data.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let json = await res.json();
        if(res.status === 200){

            this.setState({
                loading: false,
                alert:true,
                status:json.data.status,
                alertType:"success",
                alertTitle:"Success",
                alertContent:json.message
            });
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
        return <div className={'App'}>
            <NavigationBar/>
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
            <Container className={'mt-5'} style={{textAlign:'left'}}>
                <div className={'row justify-content-center'}>
                    <div className={'col-md-8'}>
                        <div className={'row'}>
                            <div className={'col-md-4'}>
                                <div className={'fw-bold'}>First Name</div>
                                <div>{this.props.history.location.state.data.firstName}</div>
                            </div>
                            <div className={'col-md-4'}>
                                <div className={'fw-bold'}>Last Name</div>
                                <div>{this.props.history.location.state.data.lastName}</div>
                            </div>
                            <div className={'col-md-4'}>
                                <div className={'fw-bold'}>Email Address</div>
                                <div>{this.props.history.location.state.data.emailAddress}</div>
                            </div>
                        </div>
                        <div className={'row mt-3'}>
                            <div className={'col-md-4'}>
                                <div className={'fw-bold'}>Phone Number</div>
                                <div>{this.props.history.location.state.data.phoneNumber}</div>
                            </div>
                            <div className={'col-md-4'}>
                                <div className={'fw-bold'}>Address</div>
                                <div>{this.props.history.location.state.data.address}</div>
                            </div>
                            <div className={'col-md-4'}>
                                <div className={'fw-bold'}>Birth Date</div>
                                <div>{this.props.history.location.state.data.birthDate}</div>
                            </div>
                        </div>
                        <div className={'row mt-3'}>
                            <div className={'col-md-4'}>
                                <div className={'fw-bold'}>Cover Letter(Optional)</div>
                                <div>{this.props.history.location.state.data.coverLetter}</div>
                            </div>
                            <div className={'col-md-4'}>
                                <div className={'fw-bold'}>C.V Attachment</div>
                                <div><a onClick={(e)=>{
                                    e.preventDefault();
                                    window.location.href = e.currentTarget.href;
                                }} href={"http://157.245.91.123:8080/api/apply/download/cv/attachment/"+this.props.history.location.state.data.id} className={'btn btn-success btn-sm'}>Download C.V Attachment</a></div>
                            </div>
                            <div className={'col-md-4'}>
                                <div className={'fw-bold'}>Status</div>
                                <div className={'fw-bold '+(this.state.status  === 'PENDING' ? 'text-primary' : this.state.status  === 'PASSED' ? 'text-success' : 'text-danger')}>{this.state.status}</div>
                            </div>
                        </div>
                        <div className={'row mt-3'}>
                            <div className={'col-md-4'}>
                                <div className={'fw-bold'}>Submission Date</div>
                                <div>{this.props.history.location.state.data.createdAt}</div>
                            </div>
                        </div>
                        <div className={'row mt-5 justify-content-center'}>
                            <div className={'col-md-4'}>
                                { this.state.loading ? <Spinner animation="border" />  : this.state.status === 'PENDING' ? <div className={'btn-group btn-group-sm'}>
                                    <button onClick={(e)=>{
                                        e.preventDefault();
                                        this.changeStatus(1);
                                    }} className={'btn btn-success'}>Mark as Passed</button>
                                    <button onClick={(e)=>{
                                        e.preventDefault();
                                        this.changeStatus(0);
                                    }} className={'btn btn-danger'}>Mark as Dropped</button>
                                </div> : <span/>}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>;
    }
}


export default withRouter(ApplicationDetail);