import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Dropdown, DropdownButton } from "react-bootstrap";

function ViewButton(props) {

    if(props.dataList==null) {

        return <p>PENDING</p>
    }

    else {

        async function goToLink(data) 
        {
            console.log('reached')
            console.log(data)
            const response =await axios.get('https://nv4nhpwp39.execute-api.ap-south-1.amazonaws.com/deploystage/getobjecturl?objectKey='+data,{headers:{Authorization:localStorage.getItem('jwtToken')}})
            .catch((err)=>{
                console.log("Err ",err) 
            })
    
            console.log('response',response.data);
            window.location.href=response.data;
        }

        const renderDropDown=<DropdownButton title=''>
        {props.dataList.map(data=>(
                <Dropdown.Item key={data} onClick={()=>goToLink(data)}>{data}</Dropdown.Item>
            
        ))}
    </DropdownButton>

        return(
            <Col>{renderDropDown}</Col>
        )
    }

}

export default ViewButton;