import {useEffect, useState} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const reqIntercetor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const respIntercetor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqIntercetor);
            httpClient.interceptors.response.eject(respIntercetor);
        }
    }, [reqIntercetor, respIntercetor]);


    const errorConfirmHandler = () => {
        setError(null)
    };
    return [ error, errorConfirmHandler];
}
