import react, {useState, useCallback} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Container, Button} from 'reactstrap'


const ModalCreated = props => {

    const [modalOpen, setModalOpen] = useState(false)
    const [buttonColor, setButtonColor] = useState(props.buttonColor || "primary")

    const onOpenButtonPress = useCallback(()=> {
        if (typeof(props.beforeOpenModal) != "undefined" && !modalOpen) {
            props.beforeOpenModal()
        }
        
        if( typeof(props.beforeClose) != "undefined" && modalOpen ) {
            props.beforeClose()
        }
        setModalOpen(!modalOpen)

    })

    return (
        <div>
            <Button onClick={onOpenButtonPress} color={buttonColor}>Crear usuario</Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader>Nuevo usuario</ModalHeader>
                <ModalBody>
                    <Container>
                        <strong>Complete el formulario</strong>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onOpenButtonPress}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={onOpenButtonPress}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

}

export default ModalCreated