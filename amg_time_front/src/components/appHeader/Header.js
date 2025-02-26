import { Row, Col, Container } from 'reactstrap';

const Header = (props) => {

    return (
        <Container fluid>
            <Row>
                <Col xs="5">
                    <img src={require("../../static/logo.png")} width={250} height={65.37} alt="logo" />
                </Col>
                <Col xs="2">

                </Col>
            </Row>
        </Container>

    )
}

export default Header;