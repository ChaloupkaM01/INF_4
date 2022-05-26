import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from 'react'

export function ButtonAdd(props) {
    return (
        <button className="btn btn-outline-success btn-sm" 
                onClick={props.onClick}> 
                { props.children } 
        </button>
        )
}

function ButtonRemove(props) {
    return (
        <button className="btn btn-outline-danger btn-sm" 
                onClick={props.onClick}> 
                { props.children } 
        </button>
        )
}

function SearchBar(props){
    return(
        <input className="form-control mb-3"
                onChange={ (e) => props.onChange(e.target.value)} 
                placeholder="Zadej jméno studenta">
        </input>
    )
}

function SearchedStudentsCard(props) {
    let allStudents = props.allStudents.map(
        (item,index) => (
            <Row key={index}>
                <Col>
                    {item.name} 
                </Col>

                <Col className="d-flex justify-content-end">
                    <ButtonAdd onClick={()=>props.onAdd(item.id, item.name)}>+</ButtonAdd>
                </Col>
            </Row>
            )
        )
    return (
        <Card>
            <Card.Header>Vyhledaní studenti</Card.Header>
            <Card.Body>{allStudents}</Card.Body>
        </Card>
    )   
}

function GroupStudentsCard(props) {
    let students = props.students.map(
        (item,index) => (
            <Row key={index}>
                <Col>
                    {item.name} 
                </Col>

                <Col className="d-flex justify-content-end">
                    <ButtonRemove onClick={()=>props.onRemove(item.id, item.name)}>-</ButtonRemove>
                </Col>
            </Row>
            )
    )
    return (
        <Card>
            <Card.Header>Studenti skupiny </Card.Header>
            <Card.Body> {students} </Card.Body>         
        </Card>
    )
}

export function EditStudyGroup(props) {
    const [members, setMembers] = React.useState(props.students) 
    const deleteStudent = (id, name) => {
        alert("Student/ka " + name + " bude odstraněn/a.")

        const selectedStudents = members.filter(
            (item) => item.id !== id
        )

        const selectedAllStudents = members.filter(
            (item) => item.id === id
        )

        setMembers(selectedStudents)
    }

    const [allMembers, setAllMembers] = React.useState([])
    const addStudent = (id, name) => {
        alert("Student/ka " + name + " bude přidán/a.")          

        const selectedStudents = allMembers.filter(
            (item) => item.id === id
        )

        const selectedAllStudents = allMembers.filter(
            (item) => item.id !== id
        ) 
        
        setAllMembers(selectedAllStudents)
        setMembers([...members, ...selectedStudents])
    }

    const inputHandler = (inputTxt) => {
        if(inputTxt.length < 3){
            inputTxt = "";
            setAllMembers([])
        }

        else{
            const namesToFilter = props.allStudents.filter(
                (item) => !members.includes(item)
            )

            const filteredNames = namesToFilter.filter(
                (item) => item.name.toLowerCase().includes(inputTxt.toLowerCase())
            )

            setAllMembers(filteredNames)
        }       
    }

    return (
        <Card>
            <Card.Header>Úprava studentů skupiny: {props.name}</Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <SearchBar onChange={inputHandler}/>  
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SearchedStudentsCard allStudents={allMembers} onAdd={addStudent} />
                    </Col>
                            
                    <Col>                                  
                        <GroupStudentsCard students={members} onRemove={deleteStudent} />
                    </Col>
                </Row>     
            </Card.Body>           
        </Card>
    )
}