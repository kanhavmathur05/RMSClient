import { useRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function UploadDocuments() {

    const idProofFileInput=useRef();
    const addressProofFileInput=useRef();
    const policyDocumentFileInput=useRef();

    function uploadDocumentsToStorage(e) {
        e.preventDefault();
        console.log('method called!!')
    }



    return (
        <Container>
            <Row className="justify-content-center">
                <Col style={{'maxWidth':"600px", 'margin':"40px"}}>
                    <Card style={{'padding':"40px"}}>
                        <Form onSubmit={uploadDocumentsToStorage}>
                            <h2>Upload Policy Documents</h2>
                            <Form.Group controlId="formBasicProductName">
                                <Form.Label>Policy Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Policy Number" />
                                <Form.Text className="text-muted">
                                    {/* We'll never share your email with anyone else. */}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicProductImage">
                                <Form.Label>ID Proof Document</Form.Label>
                                <Form.Control type="file" ref={idProofFileInput} placeholder="Add ID Proof Document" />
                            </Form.Group>
                            <Form.Group controlId="formBasicProductImage">
                                <Form.Label>Address Proof Document</Form.Label>
                                <Form.Control type="file" ref={addressProofFileInput} placeholder="Add Address Proof Document" />
                            </Form.Group>
                            <Form.Group controlId="formBasicProductImage">
                                <Form.Label>Policy Document</Form.Label>
                                <Form.Control type="file" ref={policyDocumentFileInput} placeholder="Add Policy Document" />
                            </Form.Group>
                            {/* <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            <Button variant="primary" type="submit">
                                Upload Document
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default UploadDocuments;