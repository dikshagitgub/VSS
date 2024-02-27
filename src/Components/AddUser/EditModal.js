import React, { useEffect, useState } from "react";
import { Container, Col, Row, Modal } from "react-bootstrap";
import Axios from "axios";
import Success from "../Alert/Success";
import Failure from "../Alert/Failure";
import LoaderComp from "../Loader/LoaderComp";
import Secret from '../config'


const EditModal = ({ show, setShow, id, refreshDataCallback }) => {
  const [prev, setPrev] = useState({
    UserName: "",
    LastName: "",
    Phone: "",
    Tenure: "",
    Role: "",
    CurrentDate: "",
    Password: "",
  });


  console.log("previuos data is", prev)
  console.log("edit_model", id)
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setPrev({ ...prev, [e.target.name]: e.target.value });
  };
  const formData = {
    UserName: prev?.UserName,
    LastName: prev?.LastName,
    Role: prev?.Role,
    Phone: prev?.Phone,
    Tenure: prev?.Tenure,
    CurrentDate: prev?.CurrentDate,
    Password: prev?.Password,
    ProfileImage:prev?.ProfileImage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form data on submit ", prev);
  
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      const response = await Axios.patch(
        `${Secret.Ip}/mobile/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log("API Response:", response);
  
      if (response.status === 200) {
        setLoading(false);
        setSuccessfull(true);
        setShow(false)
        refreshDataCallback();
      }
  
      setTimeout(() => {
        setSuccessfull(false);
      }, 3000);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }
  };


  

  useEffect(() => {
    const fetchData = async () => {
      const token =
        "";
      // await Axios.get(`http://15.206.179.69:3009/user_management/${id}`, {
      await Axios.get(`${Secret.Ip}/mobile/getById/${id}`, {
        // await Axios.get(`http://13.234.31.236:3001/user_management/${id}`
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        const userValue = response.data.message
        console.log("get data by id ", userValue);
        setPrev(userValue);
      });
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Modal
        size="lg"
        className="modal"
        show={show}
        onHide={(e) => setShow(false)}>
        <Success
          show={successfull}
          variant={"success"}
          message={"User Updated Successfully"}
        />
        <Failure
          show={failure}
          variant={"danger"}
          message={"something Went Wrong"}
        />
        <Modal.Header className="modal_header">

        </Modal.Header>
        <form onSubmit={handleSubmit} autoComplete="off" autoCapitalize="true">
          <Modal.Body className="modal_body">
            <Container className="col-lg-12  ">
              <Row
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "grid",
                  marginBottom: "20px",
                }}
              >
                <Col>
                  {prev?.ProfileImage ? (
                    <img
                      src={prev?.ProfileImage}
                      alt="profilePic"
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                        border: "6px solid lightgrey",
                        boxShadow: "0px 2px 6px grey",
                      }}
                    />
                  ) : (
                    <div></div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    type="text"
                    name="UserName"
                    className="modal_input"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={prev?.UserName}
                    //  required
                    maxLength="20"
                  />
                </Col>
                <Col>
                  <input
                    type="text"
                    name="LastName"
                    className="modal_input"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={prev?.LastName}
                    // required
                    maxLength="20"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <input
                    type="number"
                    name="Phone"
                    className="modal_input"
                    placeholder="Phone No."
                    onChange={handleChange}
                    value={prev?.Phone}
                    // required
                    maxLength="20"
                  />
                </Col>
                <Col>
                  <input
                    type="text"
                    name="Tenure"
                    className="modal_input"
                    placeholder="Tenure"
                    onChange={handleChange}
                    value={prev?.Tenure}
                    // required
                    maxLength="20"
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <select
                    class="form-select modal_input"
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={prev?.Role}
                    name="Role"
                    // required
                    maxLength="20"
                  >
                    <option className="defaultSelect">Role</option>
                    <option value="0">SalesManager</option>
                    <option value="1">Production Head</option>
                    <option value="2">Production Incharge </option>
                    <option value="3">Dispatch Manager </option>
                  </select>
                </Col>

                <Col>
                  <input
                    type="date"
                    name="CurrnetDate"
                    className="modal_input"
                    placeholder="Joined Date"
                    onChange={handleChange}
                    value={prev?.CurrentDate}
                    // required
                    maxLength="20"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <div
                    className="col-lg-6 col-sm-6 col-md-6 col-xl-6"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <input
                      type="password"
                      name="Password"
                      className="modal_input"
                      placeholder="Password"
                      onChange={handleChange}
                      value={prev?.Password}
                    // required
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* <div className="file_container">
                    <input
                      type="file"
                      name="user_image"
                      onChange={handleFile}
                      id="file"
                      defaultValue={image.user_image.name}
                    />

                    <label className="custom-file-label" for="customFile">
                      {image.user_image ? image.user_image.name : "chooseFile"}
                    </label>
                    <button className="file_button" id="btn">
                      {image.user_image ? (
                        image.user_image.name
                      ) : (
                        <i class="fas fa-upload px-4">Profile Image</i>
                      )}
                    </button>
                  </div> */}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer className="modal_footer">
            <button
              className="close_button"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault(e);
                setShow(false);
                setLoading(false)
              }}
            >
              Close
            </button>
            <button
              disbaled
              style={{ height: "auto", minHeight: "45px" }}
              className="submit_button"
              variant="primary"
              type="submit"
            >
              {loading ? (
                <LoaderComp
                  type={"Circles"}
                  hidden={true}
                  height={30}
                  color={"white"}
                />
              ) : (
                "Update User"
              )}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;
