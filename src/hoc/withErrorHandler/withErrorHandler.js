import React from 'react';

import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-error-handler'


const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        // constructor () {
        //     super(props) ;
        //     axios.interceptors.request.use(req => {
        //         this.setState({error:null});
        //         return req;
        //     });
        //     axios.interceptors.response.use(res => res, error => {
        //         this.setState({error: error});
        //     })
        // }


        // const [error, setError] = useState(null);
        //
        // const reqIntercetor = axios.interceptors.request.use(req => {
        //         setError(null);
        //         return req;
        //     });
        //     const respIntercetor = axios.interceptors.response.use(res => res, err => {
        //         setError(err);
        //     });
        //
        // useEffect(() => {
        //     return () => {
        //         axios.interceptors.request.eject(reqIntercetor);
        //         axios.interceptors.response.eject(respIntercetor);
        //     }
        // }, [reqIntercetor, respIntercetor]);
        //
        //
        // const errorConfirmHandler = () => {
        //     setError(null)
        // };
       const [error,  clearError] = useHttpErrorHandler(axios);

       return (
           <Aux>
                <Modal
                    show={error}
                    modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
           </Aux>
       )
    }
};

export default withErrorHandler;
