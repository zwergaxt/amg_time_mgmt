import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import { Card } from "@consta/uikit/Card";
import { Informer } from '@consta/uikit/Informer';
import { Loader } from '@consta/uikit/Loader';
import AppListCustomers from "../appList/ListCustomers";
import AppModalCustomers from "../appModal/ModalCustomers";
import { API_URL_I } from "../../index";
import useAxios from "axios-hooks";
import axios from "axios";

const HomeCustomers = (props) => {
    const API_URL = API_URL_I + "customers/"


    axios.interceptors.request.use(
        async (config) => {
            const token = localStorage.getItem('accessToken');

            if (token) {
                config.headers = {
                    authorization: `Bearer ${token}`
                };
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // response interceptor intercepting 401 responses, refreshing token and retrying the request
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const config = error.config;

            if (error.response.status === 401 && !config._retry) {
                // we use this flag to avoid retrying indefinitely if
                // getting a refresh token fails for any reason
                window.location.reload()

                return axios(config);
            }

            return Promise.reject(error);
        }
    );

    const [{ data, loading, error }, refetch] = useAxios(
        API_URL,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }

    );

    const refetchData = () => {
        refetch()
    }

    if (error) return (
        error.status == 403 ?
            <Informer
                status="alert"
                view="outline"
                title="Ошибка!"
                label="Доступ ограничен" />
            :
            <Informer
                status="alert"
                view="outline"
                title="Ошибка!"
                label={error.message} />
    )
    if (loading) return <Loader size="m" />

    return (
        <Container fluid>
            <Row xs="1">
                <Col>
                    <AppModalCustomers create={true} resetState={refetchData} newItem={true} />
                </Col>
            </Row>
            <Row xs="2">
                <Col xs="12" className="list-content">
                    <Card shadow={false} >
                        <div>
                            <AppListCustomers data={data} resetState={refetchData} newItem={false} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeCustomers;