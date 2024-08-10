import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { HandleError, HandleSuccess } from '../../utils';
import { ToastContainer} from 'react-toastify';

// import { Alert } from 'bootstrap/dist/js/bootstrap.bundle.min';

const Admin = () => {
   const userId= localStorage.getItem('userId');
   const apiUrl = import.meta.env.VITE_API_URL;
    const handleButtonClick =async () => {
        try {
            const url= `${apiUrl}/checkAdmin/${userId}`
            const response= await fetch(url);
            const result = await response.json();
            console.log(result);
            const {isAdmin, accessKey}=result;
            if(isAdmin){
                localStorage.setItem('key',accessKey) ;       
                HandleSuccess('You are the admin')  ;     
            }
            else{
                // console.log('false');
                HandleError('You are not the admin');
                
            }
        } catch (error) {
            
        }
        console.log('Admin button clicked');
        // Add functionality here, e.g., navigate to a different page or show a modal
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Admin Dashboard</h1>
                    {/* Add your admin functionality here */}
                </Col>
            </Row>
            <Row>
                <Col>
                <p>click here to check if you are the admin or not</p>
                    <Button variant="primary" onClick={handleButtonClick}>
                        Admin 
                    </Button>
                </Col>
               

            </Row>
            <ToastContainer/>
        </Container>
    );
};

export default Admin;
