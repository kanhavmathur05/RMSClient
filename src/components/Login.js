import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import UserPool from "../UserPool";

function Login() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const history = useHistory();

    function loginUser(e) {
        e.preventDefault();
        console.log(username)
        console.log(password)

        const user = new CognitoUser({
            Username: username,
            Pool: UserPool,
          });
          console.log(user)
          const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
          });

          console.log(authDetails);

          user.authenticateUser(authDetails, 
            {
            onSuccess: (data) => {
              console.log("onSuccess: ", data);

              console.log(data.idToken.jwtToken)    //This one to send in headers to access using api gateway
                
              console.log(data.idToken.payload['custom:role'])  //This one to get the logged in users role   
              localStorage.setItem('jwtToken',data.idToken.jwtToken);
              localStorage.setItem('loggedInUsername',data.idToken.payload['cognito:username'])
              localStorage.setItem('userrole',data.idToken.payload['custom:role'])
              history.push("/policydocumentlist");
              window.location.reload();
            },
            onFailure: (err) => {
              console.error("onFailure: ", err);
            }
            ,
            newPasswordRequired: (data) => {
              console.log("newPasswordRequired: ", data);
            }
            ,
          }
          );
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col style={{'maxWidth':"600px", 'margin':"40px"}}>
                    <Card style={{'padding':"40px"}}>
                        <Form onSubmit={loginUser}>
                            <h2>Sign-In</h2>
                            <Form.Group controlId="formBasicUsername" style={{padding:"10px",marginTop:"15px"}}>
                                <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(event)=>setUsername(event.target.value)} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" style={{padding:"10px"}}>
                                <Form.Control type="password" placeholder="Enter Password"  value={password} onChange={(event)=>setPassword(event.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{'marginTop':"10px",'width':"100%",'backgroundColor':"#232a8c"}}>
                                Login
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;