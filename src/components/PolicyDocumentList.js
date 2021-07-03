import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { setPolicyDocumentList, removePolicyDocumentList } from "../redux/actions/policyDocumentsActions";
import ViewButton from './ViewButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function PolicyDocumentList() {

    const policyDocuments=useSelector((state)=>state.policyDocuments.policyDocuments);   
    const dispatch = useDispatch();

    const history=useHistory();

    const [docBeforeDate, setDocBeforeDate] = useState(null);
    const [docAfterDate, setDocAfterDate] = useState(null);

    const [policyTypeTable,setPolicyTypeTable]=useState("HealthInsurance");

    async function applyFilter() { 

        let docBeforeMonth=docBeforeDate.getMonth()+1;
        let docBeforeDateDate=docBeforeDate.getDate();
        let docBeforeYear=docBeforeDate.getFullYear();

        let docAfterMonth=docAfterDate.getMonth()+1;
        let docAfterDateDate=docAfterDate.getDate();
        let docAfterYear=docAfterDate.getFullYear();

        if(docBeforeMonth<10) {
            docBeforeMonth='0'+docBeforeMonth;
        }
        if(docBeforeDateDate<10) {
            docBeforeDateDate='0'+docBeforeDateDate;
        }
        if(docAfterMonth<10) {
            docAfterMonth='0'+docAfterMonth;
        }
        if(docAfterDateDate<10) {
            docAfterDateDate='0'+docAfterDateDate;
        }

        let docBeforeParameter=docBeforeYear+'-'+docBeforeMonth+'-'+docBeforeDateDate;
        let docAfterParameter=docAfterYear+'-'+docAfterMonth+'-'+docAfterDateDate;

        console.log('This date==>',docBeforeParameter)
        console.log('That date==>',docAfterParameter)
        console.log('This policy Type==>',policyTypeTable)

        const response=await axios.get('https://nv4nhpwp39.execute-api.ap-south-1.amazonaws.com/deploystage/getdocuments?policyType='+policyTypeTable+'&docsBefore='+docBeforeParameter+'&docsAfter='+docAfterParameter,{headers:{Authorization:localStorage.getItem('jwtToken')}})
        .catch((err)=>{
            console.log("Err ",err) 
        })

        dispatch(removePolicyDocumentList());
        dispatch(setPolicyDocumentList(response.data));
      }

    const fetchPolicyList= async () => {
        const response=await axios.get('https://nv4nhpwp39.execute-api.ap-south-1.amazonaws.com/deploystage/getdocuments?policyType=HealthInsurance',{headers:{Authorization:localStorage.getItem('jwtToken')}})

        .catch((err)=>{
            console.log("Err ",err) 
        })
        dispatch(setPolicyDocumentList(response.data));
    }

    async function getDocuments(policyType) {
        dispatch(removePolicyDocumentList());
        
        const response=await axios.get('https://nv4nhpwp39.execute-api.ap-south-1.amazonaws.com/deploystage/getdocuments?policyType='+policyType,{headers:{Authorization:localStorage.getItem('jwtToken')}})
        .catch((err)=>{
            console.log("Err ",err) 
        })

        setPolicyTypeTable(policyType);

        setDocBeforeDate(null);
        setDocAfterDate(null);

        dispatch(setPolicyDocumentList(response.data));
    }

    useEffect(()=>{
        fetchPolicyList();

    },[])

    function getMissingCount(compareObject,array) {
        let count=0;
        for(var i=0;i<array.length;i++) {
            if(policyTypeTable==="HealthInsurance"){
                if(array[i]==="vehicleRc" || array[i]==="propertyDocuments" || array[i]==="addedAt" || array[i]==="updatedAt" )
                {
                    continue;
                }
                else {
                    if(compareObject[array[i]]===null) {
                        count=count+1;
                    }
                }
            }
            else if(policyTypeTable==="VehicleInsurance"){
                if(array[i]==="healthRecord" || array[i]==="propertyDocuments" || array[i]==="addedAt" || array[i]==="updatedAt")
                {
                    continue;
                }
                else {
                    if(compareObject[array[i]]===null) {
                        count=count+1;
                    }
                }
            }
            else if(policyTypeTable==="PropertyInsurance"){
                console.log("In Property Insurance")
                if(array[i]==="vehicleRc" || array[i]==="healthRecord" || array[i]==="addedAt" || array[i]==="updatedAt")
                {
                    continue;
                }
                else {
                    if(compareObject[array[i]]===null) {
                        console.log("Increment Block")
                        count=count+1;
                    }
                }
            }
        }
        return count;
    }

    const renderPolicyDocumentList=policyDocuments.map((policyDocumentDetails)=>{
        let { id,idProof,addressProof,policyDocument,policyNumber,policyType,healthRecord,vehicleRc,propertyDocuments,addedAt } = policyDocumentDetails;
        if(policyTypeTable==="HealthInsurance")
        {
            vehicleRc=["NA"];
            propertyDocuments=["NA"]
        }
        if(policyTypeTable==="VehicleInsurance")
        {
            healthRecord=["NA"];
            propertyDocuments=["NA"]
        }
        if(policyTypeTable==="PropertyInsurance")
        {
            vehicleRc=["NA"];
            healthRecord=["NA"]
        }
        return (
            <tr key={id}>
                <td>
                    {policyNumber}
                </td>
                <td>
                    {policyType}
                </td>
                <td>
                    <ViewButton dataList={idProof}/>
                </td> 
                <td>            
                    <ViewButton dataList={addressProof}/>
                </td> 
                <td>
                    <ViewButton dataList={policyDocument}/>    
                </td>  
                {
                    policyTypeTable==="VehicleInsurance" ? (
                        <td>
                        <ViewButton dataList={vehicleRc}/>
                    </td>
                    ):(
                        <td></td>
                    )
                }
                                {
                    policyTypeTable==="HealthInsurance" ? (
                    <td>
                        <ViewButton dataList={healthRecord}/>
                    </td>
                    ):(
                        <td></td>
                    )
                }
                                {
                    policyTypeTable==="PropertyInsurance" ? (
                        <td>
                        <ViewButton dataList={propertyDocuments}/>
                    </td>
                    ):(
                        <td></td>
                    )
                }
                <td>
                    {addedAt}
                </td>
                <td>
                    {getMissingCount(policyDocumentDetails,Object.keys(policyDocumentDetails))}
                </td>
            </tr>
        )
    });

    return (
    <Container fluid>
        <div style={{marginTop:"20px"}}>
        <Row >
            <Col>
                <ButtonGroup className="mb-2 sm-2">
                    <Button onClick={()=>getDocuments('HealthInsurance')}>Health Insurance</Button>
                    <Button onClick={()=>getDocuments('VehicleInsurance')}>Vehicle Insurance</Button>
                    <Button onClick={()=>getDocuments('PropertyInsurance')}>Property Insurance</Button>
                    <Button onClick={()=>getDocuments('GeneralInsurance')}>General Insurance</Button>
                    <Button onClick={()=>getDocuments('LifeInsurance')}>Life Insurance</Button>
            </ButtonGroup>
            </Col>
            <Col>
            <Row style={{'padding':"5px"}}>
            <p style={{'padding':"5px",'paddingLeft':"100px"}}>From</p>
                <DatePicker style={{'padding':"5px"}} onChange={setDocAfterDate}  selected={docAfterDate}  format="yyyy-MM-dd" showYearDropdown/>
            <p style={{'padding':"5px"}}>To</p>
                <DatePicker style={{'padding':"5px"}} onChange={setDocBeforeDate} selected={docBeforeDate} format="yyyy-MM-dd" showYearDropdown/>
                <Button style={{'marginLeft':"10px",'height':"35px"}} onClick={()=>applyFilter()}>Apply Filter</Button>
            </Row>
            </Col>
        </Row>
            
    <Table responsive>
        <thead>
        <tr>
            <th>
                Policy Number
            </th>
            <th>
                PolicyType
            </th>
            <th>
                ID Proof
            </th>
            <th>
                Address Document
            </th>
            <th>
                Policy Document
            </th>

            {
                    policyTypeTable==="VehicleInsurance" ? (
                    <th>
                        Vehicle RC
                    </th>
                    ):(
                        <th></th>
                    )
                }
                                {
                    policyTypeTable==="HealthInsurance" ? (
                    <th>
                        Health Record        
                    </th>
                    ):(
                        <th></th>
                    )
                }
                                {
                    policyTypeTable==="PropertyInsurance" ? (
                    <th>
                        Property Docs
                    </th>
                    ):(
                        <th></th>
                    )
                }
            <th>
                Issued On
            </th>
            <th>
                Missing Documents
            </th>
        </tr>
        </thead>
        <tbody>
        {renderPolicyDocumentList}
        </tbody>
    </Table></div>
    </Container>)
}

export default PolicyDocumentList;