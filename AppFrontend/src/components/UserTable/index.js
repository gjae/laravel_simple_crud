import React, {useState, useEffect} from 'react'
import {Table, ButtonGroup, Button} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPencilAlt, faUserTimes } from '@fortawesome/free-solid-svg-icons'


const tableRow = (headers, rows, onRowPress, onEditRowPress, onDeleteRowPress) => {
    return rows.map((row, index) => {
        return (
            <tr key={index}>
                {headers.map( header => <td key={`${index}-row-${row[header.key]}`}>{ row[header.key] }</td> )}
                <td>
                    <ButtonGroup>
                        <Button className="btn-sm" outline color="default"  onClick={()=> onEditRowPress(row)}>
                            <FontAwesomeIcon icon={faPencilAlt} className="text-success" />
                        </Button>
                        <Button className="btn-sm" outline color="default"  onClick={()=> onDeleteRowPress(row)}>
                            <FontAwesomeIcon icon={faUserTimes} className="text-danger" />
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    })
}

const MainTable = props => {

    let [tableHeaders] = useState(props.headers)
    let [rows, setRows] = useState([]);

    useEffect(()=>  {
        setRows(props.rows)
        // eslint-disable-next-line
    }, [props.rows])

    const onRowPress = (record) => {
        if(typeof(props.onRowPress) !== "undefined") {
            props.onRowPress(record)
        }
    }

    const onDeleteRowPress = (row) => {
        if(typeof(props.onDeletePress) !== "undefined") {
            props.onDeletePress(row)
        }
    }

    const onEditPress = (row) => {
        if(typeof(props.onEditPress) !== "undefined") {
            props.onEditPress(row)
        }
    }

    return (
        <Table striped hover>
            <thead>
                <tr>
                    {tableHeaders.map((header, index) => <th key={`header-${index}`}>{header.label}</th>)}
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {rows.length === 0 ? (
                    <tr>
                        <td colSpan={tableHeaders.length + 1} align="center">
                            <strong>Sin usuarios registrados</strong>
                        </td>
                    </tr>
                ) : tableRow(tableHeaders, rows, onRowPress, onEditPress, onDeleteRowPress)}
            </tbody>
        </Table>
    );

}

export default MainTable