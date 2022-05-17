export function ButtonAdd(props) {
    return (
        <button className="btn btn-outline-success btn-sm" 
                onClick={props.onClick}> 
                { props.children } 
        </button>
        )
}