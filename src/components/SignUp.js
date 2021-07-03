import axios from "axios";
import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import UserPool from '../UserPool';

function SignUp() {

    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone, setPhone]=useState('');

    const history=useHistory();

    function registerUser(e) {
     e.preventDefault();

    var attributeList=[];
    
    var dataEmail = {
        Name: 'email',
        Value: email
    }

    var dataRole = {
        Name:'custom:role',
        Value:'ROLE_USER'
        // Value:'ROLE_ADMIN'
    }

    var dataPhone = {
        Name:'phone_number',
        Value: '+91'+phone
    }
    // var attributeEmail=new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    console.log({phone})
    // attributeList.push(attributeEmail)
    attributeList.push(dataEmail);
    attributeList.push(dataRole);
    attributeList.push(dataPhone);


    UserPool.signUp(username, password,attributeList,null, (err, data) => {
        if (err) {
          console.error(err);
        }
        console.log(data);
      });
      history.push("/");
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col style={{'maxWidth':"600px", 'margin':"40px"}}>
                    <Card style={{'padding':"40px"}}>
                        <Form onSubmit={registerUser}>
                            <h2>SignUp</h2>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
                                <Form.Text className="text-muted">
                                    {/* We'll never share your email with anyone else. */}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email"  value={email} onChange={(event)=>setEmail(event.target.value)}/>
                                <Form.Text className="text-muted">
                                    {/* We'll never share your email with anyone else. */}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicContact">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Contact number" value={phone} onChange={(event)=>setPhone(event.target.value)}/>
                                <Form.Text className="text-muted">
                                    {/* We'll never share your email with anyone else. */}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                            </Form.Group>
                            {/* <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            <Button variant="primary" type="submit" style={{'marginTop':"20px",'width':"100%"}}>
                                Register
  </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
                            
        </Container>
    )
}

export default SignUp;