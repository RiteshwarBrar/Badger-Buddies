import BadgerBuds from "../../BadgerBuds";
import BadgerBudSummary from "./BadgerBudSummary";
import { useContext, useState } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import { Container, Row, Col } from "react-bootstrap";
export default function BadgerBudsAdoptable(props) {

    const cats = useContext(BadgerBudsDataContext);
    const [flip, setFlip] = useState(0);

    function refresh() {
        flip===0?setFlip(1):setFlip(0);
        console.log(flip);
    }



    //console.log("ere are te cats");
    //console.log(cats);
    if(cats.filter(item => !(JSON.parse(sessionStorage.getItem("saved"))).includes(item.id) && !(JSON.parse(sessionStorage.getItem("adopted"))).includes(item.id)).length!==0){
    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        
        <Container fluid>
            <Row>
                {cats.filter(item => !(JSON.parse(sessionStorage.getItem("saved"))).includes(item.id) && !(JSON.parse(sessionStorage.getItem("adopted"))).includes(item.id)).map(bud =>  <Col key={bud.id} xs={12} sm={6} md={4} lg={3} xl={2} >
                            
                                <BadgerBudSummary {...bud} showmore = {false} calledBy={"adopt"} refresh={refresh}/>
                            
                        </Col>
                    )
                }
            </Row>
        </Container>
        
    </div>
    }
    else{
        return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <p>No buds are available for adoption!</p>
        </div>
    }
}