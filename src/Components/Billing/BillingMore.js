import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import secret from "../config";
import "./BillMore.css";

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

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container invoice">
      <div className="invoice-header">
        <div className="row">
          <div className="col-xs-8">
            <h2>DELIVERY/ORDER CHALLAN</h2>
          </div>
        </div>
      </div>
      <div className="invoice-body">
        <div className="row">
          <div className="col-xs-7">
            <div className="Customer_Details_Box">
              <div className="Customer_Details_heading">
                <h3>Customer Details</h3>
              </div>
              <div className="Customer_Details_Inner_Box">
                <dl className="Customer_Details_Inner_Text">
                  <dt>Name :</dt>
                  <dd>Microsoft Corporation</dd>
                  <dt>Industry :</dt>
                  <dd>Software Development</dd>
                  <dt>Address :</dt>
                  <dd>One Microsoft Way Redmond, WA 98052-7329, USA</dd>
                  <dt>Phone :</dt>
                  <dd>(425) 882-8080</dd>
                  <dt>Email :</dt>
                  <dd>contact@microsoft.com</dd>
                  <dt>Tax NO :</dt>
                  <dd className="mono">123456789</dd>
                  <dt>&nbsp;</dt>
                  <dd>&nbsp;</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-default Service_section">
          <div className="panel-heading">
            <h3 className="panel-title">Services / Products</h3>
          </div>
          <table className="table table-bordered Table_section ">
            <thead>
              <tr>
                <th className="text-center">
                  <b>Item</b>
                </th>
                <th className="text-center colfix">
                  <b>Details</b>
                </th>
              </tr>
            </thead>
            {product.map((item) => (
              <tbody>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>Company</b>
                    </p>
                  </td>
                  <td class="text-center">{item.company}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>coatingnum</b>
                    </p>
                  </td>
                  <td class="text-center">{item.coatingnum}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>grade</b>
                    </p>
                  </td>
                  <td class="text-center">{item.grade}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>gst</b>
                    </p>
                  </td>
                  <td class="text-center">{item.gst}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>guardfilm</b>
                    </p>
                  </td>

                  <td class="text-center">{item.guardfilm}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>isOrderReady</b>
                    </p>
                  </td>

                  <td class="text-center">{item.isOrderReady}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>length</b>
                    </p>
                  </td>
                  <td class="text-center">{item.length}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>pcs</b>
                    </p>
                  </td>

                  <td class="text-center">{item.pcs}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>productId</b>
                    </p>
                  </td>

                  <td class="text-center">{item.productId}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>rate</b>
                    </p>
                  </td>

                  <td class="text-center">{item.rate}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>select_product</b>
                    </p>
                  </td>

                  <td class="text-center">{item.select_product}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>temper</b>
                    </p>
                  </td>

                  <td class="text-center">{item.temper}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>thickness</b>
                    </p>
                  </td>

                  <td class="text-center">{item.thickness}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>topcolor</b>
                    </p>
                  </td>

                  <td class="text-center">{item.topcolor}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>weight</b>
                    </p>
                  </td>

                  <td class="text-center">{item.weight}</td>
                </tr>
                <tr>
                  <td>
                    <p class="text-center">
                      <b>width</b>
                    </p>
                  </td>

                  <td class="text-center">{item.width}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <div className="invoice-footer">
        Thank you for choosing our services. We hope to see you again soon
      </div>
      <button
        className="ms-auto"
        style={{
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "0px 2px 6px lightgrey",
          width: "100px",
          padding: "10px",
          marginBottom: "1%",
        }}
        onClick={print}
      >
        Print
      </button>
    </div>
  );
};

export default BillingMore;
