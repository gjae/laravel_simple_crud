import React from 'react'
import {Container, Row, Col} from 'reactstrap'


const Layout = props => {

    return(
        <Container fluid className="pt-4">
            <Col sm={12} md={12} lg={12} className="text-center">
                <h4>Crud de Usuarios</h4>
                <hr/>
            </Col>
            <section id="mainSection">
                <Row>
                    <Col sm="12">
                        <Container>
                            {props.children}
                        </Container>
                    </Col>
                </Row>
            </section>
        </Container>
    )

}


export default Layout;