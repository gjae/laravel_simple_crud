import logo from './logo.svg';
import CreateModal from "./components/Modals/CreateModal"
import {Row, Col, Button, ButtonGroup} from 'reactstrap'
import './App.css';
import Layout from './components/layout';
import MainTable from './components/UserTable';

const headerTables = [
  {label: "#", key: "id"},
  {label: "Nombre", key: "name"},
  {label: "Cedula", key: "id_card"},
  {label: "Télefono", key: "phone_number"},
  {label: "Email", key: "email"}
]

const fakeRows = [
  {id_card: "123456", name: "Giovanny", phone_number: "04124723883", email: "test@gmail.com", id: 1},
  {id_card: "123456", name: "Giovanny", phone_number: "04124723883", email: "test@gmail.com", id: 2},
  {id_card: "123456", name: "Giovanny", phone_number: "04124723883", email: "test@gmail.com", id: 3},
]

function App() {
  return (
    <Layout>
      <Row className="text-right">
        <Col xs="12" md="6" className="offset-md-10 mb-2">
          <ButtonGroup>
            <CreateModal />
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <MainTable 
            headers={headerTables} 
            rows={fakeRows}
          />
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
