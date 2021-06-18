import React, {useEffect, useState} from 'react'
import {Row, Col, ButtonGroup} from 'reactstrap'
import axios from 'axios'
import swal from '@sweetalert/with-react'

import CreateModal from "./components/Modals/CreateModal"
import Layout from './components/layout';
import MainTable from './components/UserTable';
import {HOST, USER_ROUTES} from './constants';

const headerTables = [
  {label: "#", key: "id"},
  {label: "Nombre", key: "name"},
  {label: "Cedula", key: "id_card"},
  {label: "Télefono", key: "phone_number"},
  {label: "Email", key: "email"}
]


function App() {

  let [users, setUsers] = useState([])
  let [userValues, setUserValues] = useState(null)
  let [openModal, setOpenModal] = useState(false)


  useEffect(()=> {
    const findUsers = async() => {
      const url = new URL(USER_ROUTES.LIST, HOST)
      const results = await axios.get(url.href);
      
      if (results.status === 200) {
        setUsers(results.data.data)
      }
    }
    findUsers();

  }, [])

  const onNewUserAdded = (newUserData) => {
    let currentUsers = users;
    setUsers([...currentUsers, newUserData]);
    setOpenModal(false)
  }

  const onUpdate = (userData) => {
    let newUsers = users.map(user => {
      if (user.id === userData.id) {
        user = userData
      }
      return user;
    })
    setOpenModal(false)
    setUsers(newUsers)
  }

  const onDeletePress = userToDelete => {
    const deleteUser = async() => {
      const url = new URL(USER_ROUTES.DELETE(userToDelete.id), HOST)
      const result = await axios.delete(url).catch( err => {
        console.error("Response error", err)
      })

      if (result.status >= 200 && result.status < 300) {
        let currentUsers = users.filter(user => user.id !== userToDelete.id)
        setUsers(currentUsers)
      }
    }

    swal({
      buttons: {
        cancel: "Cancelar",
        confirm: "Aceptar"
      },
      content: (
        <div>
          <h4>¿Esta seguro de eliminar este usuario?</h4>
          <p>
            Esta acción no puede ser revertida
          </p>
        </div>
      )
    }).then( value => {
      if (value){
        deleteUser()
      }
    } )

  }

  return (
    <Layout>
      <Row className="text-right">
        <Col xs="12" md="6" className="offset-md-10 mb-2">
          <ButtonGroup>
            <CreateModal 
              initialValues={userValues} 
              modalOpen={openModal} 
              onUpdateUser={onUpdate}
              beforeClose={()=> {
                setUserValues(null)
                setOpenModal(false)
              }}
              onNewUserRegistered={onNewUserAdded} />
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <MainTable 
            headers={headerTables} 
            rows={users}
            onDeletePress={onDeletePress}
            onEditPress={ row => {
              setUserValues(row)
              setOpenModal(true)
            }}
          />
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
