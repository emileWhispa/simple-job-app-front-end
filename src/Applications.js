import {Component} from "react";
import NavigationBar from "./NavigationBar";
import {Container, Spinner} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class Applications extends Component{
    constructor(props) {
        super(props);
        this.state = {
            applications:[],
            loggedIn: localStorage.getItem("user")
        }
    }

    componentDidMount() {
        if(this.state.loggedIn) {
            this.fetchApplications();
        }else{
            this.props.history.push('/login');
        }
    }

    async fetchApplications() {
        let data = JSON.parse(localStorage.getItem("user")).data;
        let resp = await fetch("http://157.245.91.123:8080/api/applications/list", {
            headers: {
                Authorization: "Bearer " + data.token
            }
        });
        if(resp.status === 200){
            let list = (await resp.json()).data;
            this.setState({
                applications:list
            })
        }else if(resp.status === 401){
            localStorage.removeItem("user");
            this.props.history.push('/login');
        }
        console.log();
    }

    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    render() {
        return <div className="App">
            <NavigationBar/>
            { this.state.loggedIn ? <Container style={{textAlign:'left'}} className={'p-3'}>
                <h3>Submitted Applications</h3>
                <p className={'text-muted'}>View submitted applications</p>
                <table className={'table table-striped mt-2'}>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.applications.map((e)=>(<tr>
                        <td>{e.id}</td>
                        <td>{e.firstName}</td>
                        <td>{e.lastName}</td>
                        <td>{e.phoneNumber}</td>
                        <td><a onClick={(ev)=>{
                            ev.preventDefault();
                            this.props.history.push('app/details',{data: e});
                        }} href="#" className={'btn btn-info btn-sm'}>Application Details</a></td>
                    </tr>))}
                    </tbody>
                </table>
            </Container> : <div style={{padding:'50px'}}><Spinner animation="border" /></div>}
        </div>;
    }
}

export default withRouter(Applications);