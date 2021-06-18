import react, {useState, useEffect, Fragment} from 'react'
import {Table} from 'reactstrap'


const tableRow = (headers, rows) => {
    return rows.map((row, index) => {
        return (
            <tr key={index}>
                {headers.map( header => <td key={`${index}-row`}>{ row[header.key] }</td> )}
            </tr>
        )
    })
}

const MainTable = props => {

    let [tableHeaders, setTableHeaders] = useState(props.headers)
    let [rows, setRows] = useState(props.rows || []) 

    useEffect(() => {
        
    })

    return (
        <Table striped hover>
            <thead>
                <tr>
                    {tableHeaders.map((header, index) => <th key={index}>{header.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {tableRow(tableHeaders, rows)}
            </tbody>
        </Table>
    );

}

export default MainTable