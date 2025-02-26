import axios from "axios";
import { API_URL_I } from "../../index.js";
import { Button } from "@consta/uikit/Button/index.js";
import { Row, Col, Container } from 'reactstrap';
import { Text } from "@consta/uikit/Text/index.js";

const Footer = (props) => {

    return (
        <Container fluid>
            <Row>
                <Col xs="5">
                    <img src={require("../../static/logo.png")} width={250} height={65.37} alt="logo"/>
                </Col>
                <Col xs="2">
                               
                </Col>
            </Row>
        </Container>

)}

export default Footer;