import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from 'react'


/** @module EditGroup */

/**
 * Represents adding button for each searched student
 * @function
 */
export function ButtonAdd(props) {
    return (
        <button className="btn btn-outline-success btn-sm" 
                onClick={props.onClick}> 
                { props.children } 
        </button>
        )
}

/**
 * Represents remove button for each student from current study group
 * @function
 */
function ButtonRemove(props) {
    return (
        <button className="btn btn-outline-danger btn-sm" 
                onClick={props.onClick}> 
                { props.children } 
        </button>
        )
}

/**
 * Represents searching bar that is used for searching of specific student
 * @function
 */
function SearchBar(props){
    return(
        <input className="form-control mb-3"
                onChange={ (e) => props.onChange(e.target.value)} 
                placeholder="Zadej jméno studenta">
        </input>
    )
}

/**
 * Creates and renders part of page where are searched students, that can be added to current study group
 * @function
 */
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

/**
 * Creates and renders part of page where are students from current study group, that can be removed
 * @function
 */
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

/**
 * Renders whole page with search bar, searched and current students. This function also handles searching, adding and removing of students
 * @function
 */
export function EditStudyGroup(props) {
    const [members, setMembers] = React.useState(props.students) 
    const deleteStudent = (id, name) => {
        if(window.confirm("Chcete odebrat studenta/ku " + name + "?")){
            const selectedStudents = members.filter(
                (item) => item.id !== id
            )

            const selectedAllStudents = members.filter(
                (item) => item.id === id
            )

            setMembers(selectedStudents)
        }
    }

    const [allMembers, setAllMembers] = React.useState([])
    const addStudent = (id, name) => {      
        if(window.confirm("Chcete přidat studenta/ku " + name + "?")) {
            if(!members.some((item) => item.id === id)) {
                const selectedStudents = allMembers.filter(
                    (item) => item.id === id
                )

                const selectedAllStudents = allMembers.filter(
                    (item) => item.id !== id
                ) 

                setAllMembers(selectedAllStudents)
                setMembers([...members, ...selectedStudents])
            }

            else {
                alert("Student/ka už je ve skupině, nebude přidán/a.")
            }
        }    
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