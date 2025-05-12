import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import { useState } from "react";
import { Card } from "@consta/uikit/Card";
import { Loader } from '@consta/uikit/Loader';
import { Informer } from '@consta/uikit/Informer';
import AppListInvoices from "../appList/ListInvoices";
import AppModalInvoices from "../appModal/ModalInvoices";
import Selector from "./LenSelector";
import { API_URL_I } from "../../index";
import useAxios from "axios-hooks";
import axios from "axios";

const HomeInvoices = (props) => {
    const [len, setLen] = useState("?len=10")

    const API_URL = API_URL_I + "invoices/" + len


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

    const dataSorted = () => {
        return data ? data.sort((a, b) => a.pk - b.pk) : data
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
            <Row xs="12">
                <Col xs={{
                    size: 'auto'
                }}>
                    <AppModalInvoices create={true} resetState={refetchData} newItem={true} />
                </Col>
                <Col xs={{
                    size: 'auto',
                    order: 2,
                    offset: 0
                }}>
                    <Selector len={len} setLen={setLen} />
                </Col>
            </Row>
            <Row xs="2">
                <Col xs="12" className="list-content">
                    <Card shadow={false} >
                        <div>
                            <AppListInvoices data={dataSorted()} resetState={refetchData} newItem={false} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeInvoices;