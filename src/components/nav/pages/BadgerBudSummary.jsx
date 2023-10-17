
//import React from "react";
import { Button } from "react-bootstrap";
import { React, useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Alert } from "react-bootstrap";
const BadgerBudSummary = (props) => {

    //let showMore = props.showmore;
    const [showMore, setShowMore] = useState(props.showmore);
    //const [fip, setFlip] = useState(0);
    //const [adoptList, setAdoptList] = useState([]);
    //const [savelist, setSaveList] = useState([]);
    function ageOut(props) {
        const years = Math.floor(props.age / 12);
        const months = props.age % 12;

        if(years===0){
            return months+" month(s) old";
        }
        else if(months===0){
            return years+" year(s) old";
        }
        else{
            return years+" year(s) and " + months +" month(s) old"
        }
    }

    const flip = () => {
        setShowMore(!showMore);
      };
    //props.showmore = !props.showmore;
    //useEffect(() => {},[showMore])
    

    const saveCats = () => {
        
        props.refresh();

        let arr = JSON.parse(sessionStorage.getItem("saved"));
        sessionStorage.setItem("saved", JSON.stringify([...arr, props.id]));

        alert(props.name+" has been added to your basket!");
    };
    const unsaveCats = () => {
        props.refresh();

        let arr = JSON.parse(sessionStorage.getItem("saved"));
        sessionStorage.setItem("saved", JSON.stringify(arr.filter(adpid => adpid !== props.id)));
        
        alert(props.name+" has been removed from your basket!");
    };
    const adoptCats = () => {
        props.refresh();

        console.log("adp");
        let sarr = JSON.parse(sessionStorage.getItem("saved"));
        let arr = JSON.parse(sessionStorage.getItem("adopted"));
        sessionStorage.setItem("saved", JSON.stringify(sarr.filter(adpid => adpid !== props.id)));
        sessionStorage.setItem("adopted", JSON.stringify([...arr, props.id]));
    
        alert(props.name+" has been adopted!");
    };

    function car(p) {
        let len = (p.imgIds).length;
        console.log(len);
        let isrc="https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/";
        
    }

    //const cat = useContext(BadgerBudsDataContext);
    let imgsrc="https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/";
    if(props.calledBy==="adopt"){
        return <div style={{padding:"10px"}}>
            {
                showMore? /*add carousel*/<Carousel style={{width:"200", height:"200"}}>
                {props.imgIds.map(im => (
                  <Carousel.Item key={im}>
                    <img
                      src={imgsrc+im}
                      alt={props.name+": "+im}
                      width="200"  height="200"
                    />
                  </Carousel.Item>
                ))}
              </Carousel> : <img src={imgsrc+props.imgIds[0]} alt={props.name} width="200"  height="200"/>
            
            }
            
            <h5>{props.name}</h5>
            {
                showMore? <div><p>{props.gender}</p> <p>{props.breed}</p> <p>{ageOut(props)}</p> <p>{props.description}</p> </div>: <p></p>
            
            }
            <Button onClick={flip} style={{ border: 'none'}}>{showMore===true?"Show Less":"Show More"}</Button>
            <Button onClick={saveCats} style={{backgroundColor:'grey', border: 'none'}}>❤️ Save</Button>
            </div>
    }
    else if(props.calledBy==="saved"){
        return <div style={{padding:"10px"}}>
            <img src={imgsrc+props.imgIds[0]} alt={props.name} width="200"  height="200"/>
            <h5>{props.name}</h5>
            <Button onClick={unsaveCats} style={{backgroundColor:'grey', border: 'none' }}>Unselect</Button>
            <Button onClick={adoptCats} style={{backgroundColor:'green', border: 'none'}}>💕 Adopt</Button>
            </div>
    }
}

export default BadgerBudSummary;