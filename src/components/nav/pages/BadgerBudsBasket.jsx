import BadgerBuds from "../../BadgerBuds";
import BadgerBudSummary from "./BadgerBudSummary";
import { useContext, useState, useEffect } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import { Container, Row, Col } from "react-bootstrap";



export default function BadgerBudsBasket(props) {
    const cats = useContext(BadgerBudsDataContext);
    const [flip, setFlip] = useState(0);

    function refresh() {
        flip===0?setFlip(1):setFlip(0); 
    }

    if(cats.filter(item => (JSON.parse(sessionStorage.getItem("saved"))).includes(item.id)).length!==0){
        return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>

        { <Container fluid>
            <Row>
                {
                    cats.filter(item => (JSON.parse(sessionStorage.getItem("saved"))).includes(item.id)).map(bud =>  <Col key={bud.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            
                                <BadgerBudSummary {...bud} calledBy={"saved"} refresh={refresh}/>
                            
                        </Col>
                    )
                }
            </Row>
        </Container> }
    </div>
    }
    else{
        return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <p>You have no buds in your basket!</p>
        </div>
    }
}