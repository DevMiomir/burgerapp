import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Fragment from "../Fragment";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }


        // OVDE TREBA DA SE UPOTREBI KONSTRUKTOR
        componentDidMount () {
            this.reqIntreceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.reqIntreceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqIntreceptor);
            axios.interceptors.response.eject(this.reqIntreceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render () {
            return (
                <Fragment>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}    
                    >
                       {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;