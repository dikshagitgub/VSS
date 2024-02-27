import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import LoaderComp from "../Loader/LoaderComp";
import EditModal from "./EditModal";
import Secret from '../config'
import moment from "moment";


const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");


  useEffect(() => {
    setLoading(true);
    
    fetchData();
  }, [error]);


  const fetchData = async () => {

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      // await axios.get("http://15.206.179.69:3009/user_management", {
      await axios.get(`${Secret.Ip}/mobile/checkDeatils`, {
        headers: { Authorization: `Bearer ${token}` },


      }).then((res) => {
        if (!res) {
          setError(true);


        } else {
          const result = res.data.Details;
          console.log(result);
          setUser(result);
          setLoading(false);

        }
      });
  };


  const refreshData= () =>{
     fetchData();
  }


  const handleConfirm = (val, e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const toDelete = confirm("Want to Delete this User?");

    if (toDelete) {
      handleDelete(val, e);

    }
  };

  const handleEditShow = (id) => {
    console.log(id)
    setEditId(id);
    setShow(!show);
  };


  const handleDelete = async (val, e) => {
    e.preventDefault()

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
    // await axios.delete(`http://15.206.179.69:3009/api/v1/user_management/delete/${val._id}`,
    await axios.delete(`${Secret.Ip}/mobile/delete/${val._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },

      }
    ).then((res) => {
      console.log(res);
      window.location.reload(); // or window.location.href = window.location.href;
    })
  };



  return (
    <>
      {/* EDIT MODEL CONTAINER */}
      <EditModal show={show} setShow={setShow} id={editId} refreshDataCallback={refreshData}/>

      {/* USER PROFILE */}
      {user.length > 0 ? (
        <Container fluid className="col-lg-12">
          <>
            <Row className="my-2 d-flex">
              {user?.map((val, ind) => (

                <>
                  <Col className="col-lg-6 mt-4" key={ind}>

                    <Container className="col-lg-6 col-md-6 col-sm-6 user_profile_container d-grid">
                      <Row className="ms-auto">
                        <button
                          className="editButton mt-2 me-2 "
                          style={{ color: "#0e2434" }}
                          align="right"
                          onClick={() => {
                            handleEditShow(val._id);
                          }}
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </button>

                        <button
                          className="deleteButton mt-2"
                          onClick={(e) => handleConfirm(val, e)}


                          align="right"
                          style={{ color: "maroon" }}
                        >
                          <i class="fas fa-trash-alt"></i>

                        </button>
                      </Row>
                      <Row>
                        <Col className="col-lg-4 col-md-3 col-sm-3">
                          <Container
                            fluid
                            className="image_back_container justify-content-center  m-3  ms-auto"
                          >
                            <img
                              alt="/"
                              src={
                                val.ProfileImage !== ""
                                  ? val.ProfileImage
                                  : "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                              }
                              className="user_image float-left"
                            />


                            <label>
                              <p className="profileName">
                                <b>
                                  {val.UserName} {val.LastName}
                                </b>
                              </p>
                            </label>
                          </Container>
                        </Col>
                        <Col>
                          <Container className="image_back_container m-2  d-gird">
                            <Row style={{ height: "auto" }}>
                              <Col className="col-lg-4">
                                <p className="p_tag">PhoneNo.</p>
                              </Col>
                              <Col className="col-lg-1">
                                <p className="p_tag">-</p>
                              </Col>
                              <Col className="col-lg-6">
                                <p className="p_tag">{val.Phone}</p>

                              </Col>
                            </Row>
                            <Row className="d-flex">
                              <Col className="col-lg-4">
                                <p className="p_tag">Role.</p>
                              </Col>
                              <Col className="col-lg-1">
                                <p className="p_tag">-</p>
                              </Col>
                              <Col className="col-lg-6">
                                <p className="p_tag">{val.Role}</p>
                              </Col>
                            </Row>

                            <Row>
                              <Col className="col-lg-4">
                                <p className="p_tag">Tenure.</p>
                              </Col>
                              <Col className="col-lg-1">
                                <p className="p_tag">-</p>
                              </Col>
                              <Col className="col-lg-6">
                                <p className="p_tag">{val.Tenure}</p>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="col-lg-4">
                                <p className="p_tag">Joining Date.</p>
                              </Col>
                              <Col className="col-lg-1">
                                <p className="p_tag">-</p>
                              </Col>
                              <Col className="col-lg-6">
                                {/* <p className="p_tag">{val.CurrentDate}</p> */}
                                <p className="p_tag">{moment().format('DD-MMM-YYYY', val.CurrentDate)}</p>
                              </Col>
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </>
              ))}
            </Row>
          </>
        </Container>
      ) : (
        <Container
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "grid",
            marginTop: "30%",
          }}
        >
          <LoaderComp type={"Circles"} height={100} color={"#0e2434"} />
        </Container>
      )}
    </>
  );
};

export default UserProfile;
