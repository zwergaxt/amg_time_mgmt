import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import { Card } from "@consta/uikit/Card";
import { Loader } from '@consta/uikit/Loader';
import AppListInvoicesDesc from "../appList/ListInvoicesDesc";
import AppModalInvoicesDesc from "../appModal/ModalInvoicesDesc";
import { API_URL_I } from "../../index";
import axios from "axios";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";

const HomeInvoicesDesc = (props) => {
    const API_URL = API_URL_I + "invoices_desc/"
    const [desc, setDesc] = useState([])

    const getDesc = () => {
        axios.get(API_URL_I + "invoices_desc/").then(desc => {
            setDesc(desc.data)
        })
    }

    const [{ data, loading, error }, refetch, filerData] = useAxios(
        API_URL
    );

    // setDesc(data.filter(d => d.invoice_id == props.inv_pk))

    useEffect(() => {
        getDesc()
        // eslint-disable-next-line
    }, [props.inv_pk])

    // const data = () => {
    //     return fetchData.filter(d => d.invoice_id == props.inv_pk)
    // }



    const refetchData = () => {
        getDesc()
    }

    if (loading) return <Loader size="m" />

    return (
        <Container fluid>
            <Row xs="1">
                <Col>
                    <AppModalInvoicesDesc create={true} resetState={refetchData} newItem={true} inv_pk={props.inv_pk} />
                </Col>
            </Row>
            <Row xs="2">
                <Col xs="12" className="list-content">
                    <Card shadow={false} >
                        <div>
                            <AppListInvoicesDesc data={desc.sort((a, b) => a.row_num - b.row_num)} resetState={refetchData} newItem={false} inv_pk={props.inv_pk} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeInvoicesDesc;