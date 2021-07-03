import { Dropdown, DropdownButton } from "react-bootstrap";

function ViewDropdownButtons(props) {

    return (
        <DropdownButton>
        {props.dataList.map(data=>(
            
                <Dropdown.Item key={data}>{data}</Dropdown.Item>
            
        ))}
    </DropdownButton>
    )
}

export default ViewDropdownButtons;