import React, {useState, useEffect} from 'react'
import {
    Modal, 
    ModalHeader, 
    ModalBody,
    Button
} from 'reactstrap'
import FormAdd from './FormAdd';
import {HOST, USER_ROUTES} from '../../../constants';
import axios from 'axios';



const ModalCreated = props => {
    const [modalOpen, setModalOpen] = useState(props.modalOpen || false)
    const [buttonColor] = useState(props.buttonColor || "primary")
    let [initialUserValues, setInitialUserValues] = useState(props.initialValues || null)

   

    useEffect(()=> {
        setInitialUserValues(props.initialValues || null)
        setModalOpen(props.modalOpen)

        // eslint-disable-next-line
    }, [props.modalOpen])
    

    const onOpenButtonPress = ()=> {
        if (typeof(props.beforeOpenModal) !== "undefined" && !modalOpen) {
            props.beforeOpenModal()
        }
        if( typeof(props.beforeClose) !== "undefined" && modalOpen ) {
            props.beforeClose()
        }
        setInitialUserValues(null)
        setModalOpen(!modalOpen)

    }

    const onError = (setErrors, initialValues, response) => {
        if (response.status === 422) {
            let fieldsError = {};
            for(let errorResonse in response.data.errors) {
                fieldsError[errorResonse] = response.data.errors[errorResonse][0]
            }
            setErrors(fieldsError)
        } else {
            console.error('AXIOS ERROR', response)
        }
    }

    const onSubmit = ({values, setErrors, resetForm, initialValues, setSubmitingForm}) => {
       /**
        * Si detecta un "ID" en los valores iniciales del formulario
        * entonces indica que la acción es una actualización y no una creación
        * 
        */
        const isUpdate = typeof(initialValues.id) !== "undefined"

        const createUser = async () => {
            const resourcePath = !isUpdate ? USER_ROUTES.CREATE : USER_ROUTES.UPDATE(initialValues.id)
            const url = new URL(resourcePath, HOST)

            /**
             * La referencia de la funcion de axios dependera 
             * si la acción a realizar es una actualizacion (put) o una insersión
             * (post) entonces dependiendo de eso se le asigna la referencia correspondiente
             */
            const axiosAction = isUpdate ? axios.put : axios.post;

            const results = await axiosAction(url, values).catch(({response}) => {
                onError(setErrors, initialValues, response)
                return {status: response.status}
            })

            if (results.status >= 200 && results.status < 300) {
                
                if (typeof(props.onNewUserRegistered) !== "undefined" && !isUpdate) {
                    props.onNewUserRegistered(results.data.data)
                } else if ( typeof(props.onUpdateUser) !== "undefined" && isUpdate) {
                    props.onUpdateUser(results.data.data)
                }

                resetForm({values: initialValues})
                setModalOpen(!modalOpen)
            }
            setSubmitingForm(false)
        }
        createUser()

        return false
    }

    return (
        <div>
            <Button onClick={onOpenButtonPress} color={buttonColor}>Crear usuario</Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader>Nuevo usuario</ModalHeader>
                <ModalBody>
                    <FormAdd 
                        initialValues={initialUserValues}
                        onSubmit={onSubmit} 
                        onCloseModalPress={onOpenButtonPress} 
                    />
                </ModalBody>
            </Modal>
        </div>
    )

}

export default ModalCreated