import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import secret from "../config";
const BillingMore = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [product, setProduct] = useState([]);
  const [objectProject, setProductsObj] = useState(null);
  console.log(objectProject);

  const print = () => {
    window.print();
  };

  console.log("id is", id);

  const fetchData = async () => {
    try {
      await Axios.get(`${secret.Ip}/BillingManagement/billing/${id}`, {
        headers: {
          Authorization: `Bearer ${secret.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        console.log("Billing data is", response);
        const data = response.data.message;
        const Products = response.data.message.products;
        console.log("Products are", Products);
        setItem(data);
        setProduct(Products);
        // Convert array to object
        const productsObject = Products.reduce((obj, product) => {
          obj[product.id] = product;
          return obj;
        }, {});

        setProductsObj(productsObject);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [item, product]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
          // style={{
          //   alignItems: "center",
          // }}
        >
          <h2 className="center">DELIVERY/ORDER CHALLAN</h2>
          <button
            className="ms-auto"
            style={{
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "0px 2px 6px lightgrey",
              width: "50px",
            }}
            onClick={print}
          >
            Print
          </button>
        </div>

        <Container
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "block",
          }}
        >
          {product.map((item) => (
            <Container className="mt-4">
              <h4>Date : {} </h4>
              <h5>D/C NO:{item.temper}</h5>
              <h5>M/S:{item.thickness}</h5>
              <h5>Broker:{item.pcs}</h5>
              <h5>Vehical:{item.weight}</h5>
              <h5>Transport:{item.company}</h5>
            </Container>
          ))}

          {/* <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
              <h5>OrderId</h5>
            </Col> */}

          {/* <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1"> */}

          {/* </Col> */}
          {/* <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
              <h5>{item.orderId}</h5>
            </Col> */}

          {/* <Col className="col-xl-2 col-lg-3 col-md-3 col-sm-3"> */}

          {/* </Col> */}
          {/* <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
            <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
              {item.firmName}
            </Col> */}

          {/* <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
            <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
              {item.clientName}
            </Col> */}

          {/* <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
            <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
              {item.phone_no}
            </Col> */}

          <div>
         
          {product.map((item ,index)=>
          <table key={index}style={{border: "2px solid black", marginTop:"8px",}}>
            
  <tr>
    <td>1.</td>
  <td style={{width:"80%"}}>Product</td>
    <td>{item.select_product}</td> 
  </tr>

  <tr>
    <td>2.</td>
    <td>Company</td>
    <td>{item.company}</td>
   
  </tr>

  <tr>
    <td>3.</td>
    <td>Temper</td>
    <td>{item.temper}</td>
   
  </tr>
  <tr>
    <td>4.</td>
    <td>Coating</td>
    <td>{item.coatingnum}</td>
  
  </tr>
  
  <tr>
    <td>5.</td>
    <td>Grade</td>
    <td>{item.grade}</td>
 
    </tr>
    <tr>
    <td>6.</td>
    <td>Guard Film</td>
    <td>{item.temper}</td>
  
  </tr>
  <tr>
    <td>7.</td>
    <td>Color</td>
    <td>{item.topcolor}</td>
    
  </tr>
  <tr>
    <td>8.</td>
    <td>pcs</td>
    <td>{item.pcs}</td>
  
  </tr>
  <tr>
    <td>9.</td>
    <td>Thinkness</td>
    <td>{item.thickness}</td>
   
  </tr>
 
  <tr>
    <td>10.</td>
    <td>Length</td>
    <td>{item.length}</td>
   
  </tr>
  <tr>
    <td>11.</td>
    <td>Weight</td>
    <td>{item.weight}</td>
   
  </tr>
  <tr>
    <td>12.</td>
    <td>Rate</td>
    <td>{item.rate}</td>
   
  </tr>
  <tr>
    <td>13.</td>
    <td>Gst</td>
    <td>{item.gst}</td>
    
  </tr>

              <tr style={{ border:"2px solid black"}}>
                <td></td>
                <td style={{ text:"bold", fontSize: "2xl", textAlign:"center"}} colspan={2}>
                  TOTAL
                </td>
          
              </tr>
  
</table>
)}
       
            
          </div>
          {/* <Row> 
            <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
              Received By :
            </Col> */}
            {/* <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
            <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
              {item.deliveryDate}
            </Col> */}
          {/* </Row> */}

          <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3 ">NAME:-</Col>
          {/* <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
            <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
              {item.address}
            </Col>
          </Row> */}

          <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3 ">MOB:-</Col>
        </Container>
        <Container>
          {product.map((val, ind) => (
            <Container className="mt-4" key={val._id}>
              <h4>Product - {ind + 1}</h4>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Product</Col>
                <Col>-</Col>
                <Col>{val.select_product}</Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Company</Col>
                <Col>-</Col>
                <Col>{val.company}</Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Temper</Col>
                <Col>-</Col>
                <Col>{val.temper}</Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Coating</Col>
                <Col>-</Col>
                <Col>{val.coatingnum}</Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Company</Col>
                <Col>-</Col>
                <Col>{val.company}</Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Grade</Col>
                <Col>-</Col>
                <Col>{val.grade}</Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Guard Film</Col>
                <Col>-</Col>
                <Col>{val.guardfilm}</Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Color</Col>
                <Col>-</Col>
                <Col>{val.topcolor}</Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>pcs</Col>
                <Col>-</Col>
                {/* <Col>{val.pcs}</Col> */}
                <Col>
                  <input className="subfields" name="pcs" type="number"></input>
                </Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Thickness</Col>
                <Col>-</Col>
                <Col>{val.thickness}</Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Weight</Col>
                <Col>-</Col>
                {/* <Col>{val.weight}</Col> */}
                <Col>
                  <input
                    className="subfields"
                    name="weight"
                    type="number"
                  ></input>
                </Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>length</Col>
                <Col>-</Col>
                <Col>{val.length}</Col>
              </Row>
              {/* <Row className="col-xl-8 col-lg-8 ">
                <Col>pcs</Col>
                <Col>-</Col>
                <Col>{val.pcs}</Col>
              </Row> */}
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Weight</Col>
                <Col>-</Col>
                <Col>{val.width}</Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Rate</Col>
                <Col>-</Col>
                <Col>{val.rate}</Col>
              </Row>
              <Row className="col-xl-8 col-lg-8 ">
                <Col>Gst</Col>
                <Col>-</Col>
                <Col>{val.gst}</Col>
              </Row>
            </Container>
          ))}
        </Container>
      </Container>
    </>
  );
};
export default BillingMore;
