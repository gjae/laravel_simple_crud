import React, {useState} from 'react'
import {Formik, Field, ErrorMessage, Form} from 'formik'
import * as Yup from 'yup'
import {
    FormGroup,
    ModalFooter,
    Button,
    Container,
    Col
} from 'reactstrap'

const FormAdd = props => {
    const [submitingForm, setSubmitingForm] = useState(false)
    const formikInitialValues = props.initialValues != null ? props.initialValues : {
        email: "",
        name: "",
        id_card: "",
        phone_number: "",
    }

    let yupSchema = Yup.object().shape({
        name: Yup
            .string()
            .typeError("Este campo solo acepta valores alfabeticos")
            .required("El nombre del usuario es requerido"),
        id_card: Yup
            .number()
            .required("Este campo es requerido")
            .typeError("El número de cedula es requerido")
            .positive("Este campo solo acepta numeros positivos")
            .integer("Solo números enteros"),
        email: Yup
            .string()
            .email("Formato invalido")
            .required("El email del usuario es requerido"),
        phone_number: Yup
            .number()
            .typeError("Este campo no acepta valores NO numericos")
            .integer("Debe ser un número sin valores decimales")
            .positive("Debe ser un número positivo")
            .required("El número de contacto es requerido")
    })

    const onSubmitForm = (values, {setSubmitting, resetForm, setErrors}) => {
        setSubmitingForm(true)
        if(typeof(props.onSubmit) == "undefined") {
            resetForm({values: formikInitialValues})
        } else {
            props.onSubmit({
                values, 
                setErrors, 
                resetForm, 
                initialValues: formikInitialValues, 
                setSubmitingForm, 
                submitingForm
            })
        }
        setSubmitting(false);
    }

    return(
        <Formik
            initialValues={formikInitialValues}
            validationSchema={yupSchema}
            onSubmit={onSubmitForm}
        >
            {formik => (
                <Form>
                    <Container>
                        <FormGroup>
                            <label htmlFor="email">Email del usuario</label>
                            <Field name="email" className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid': ''}`}/>
                            <ErrorMessage name="email" >{msg => <div className="text-danger">{msg}</div> }</ErrorMessage>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="name">Nombre del usuario</label>
                            <Field name="name" className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid': ''}`}/>
                            <ErrorMessage name="name" >{msg => <div className="text-danger">{msg}</div> }</ErrorMessage>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm="12" md="6">
                                <label htmlFor="phone_number">Teléfono de contacto</label>
                                <Field name="phone_number"  className={`form-control ${formik.touched.phone_number && formik.errors.phone_number ? 'is-invalid': ''}`}/>
                                <ErrorMessage name="phone_number" >{msg => <div className="text-danger">{msg}</div> }</ErrorMessage>
                            </Col>
                            <Col sm="12" md="6">
                                <label htmlFor="email">Cedula de identidad</label>
                                <Field name="id_card" className={`form-control ${formik.touched.id_card && formik.errors.id_card ? 'is-invalid': ''}`}/>
                                <ErrorMessage name="id_card" >{msg => <div className="text-danger">{msg}</div> }</ErrorMessage>
                            </Col>
                        </FormGroup>
                    </Container>
                    <ModalFooter className="mt-2">
                        <Button color="primary" disabled={submitingForm} type="submit">Guardar</Button>{' '}
                        <Button color="secondary" onClick={props.onCloseModalPress}>Cancelar</Button>
                    </ModalFooter>
                </Form>
            )}
        </Formik>
    )

}

export default FormAdd