import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  Container,
  Table,
} from "react-bootstrap";
import DataTable from "react-data-table-component";

function Prod() {
  const [showModal, setShowModal] = useState(null);
  //const [showModalProd, setShowModalProd] = useState(null);
  const [databam, setData_Bam] = useState(null);
  const [datajobbam, setData_Jobbam] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  //const [selectedRowDataProd, setSelectedRowDataProd] = useState(null);
  //const [showError, setShowError] = useState(false);
  const [qty, setQty] = useState("");
  const [modal, setModal] = useState("");
  const [job_bam, setJob_bam] = useState("");
  const [ass_line, setAss_line] = useState("");
  const [datestart, setDatestart] = useState("");
  const [data_lines, setData_Line] = useState([]);
  const [data_models, setData_Model] = useState([]);
  const [data_job, setData_job] = useState([]);

  const columns = [
    {
      name: "Job",
      selector: (row) => row.job,
    },
    {
      name: "modal",
      selector: (row) => row.modal,
    },
    {
      name: "shift",
      selector: (row) => row.shift,
    },
    {
      name: "exp",
      selector: (row) => row.exp,
    },
    {
      name: "shipment",
      selector: (row) => row.shipment,
    },
    {
      name: "qty",
      selector: (row) => row.qty,
    },
    {
      name: "datestar",
      selector: (row) => row.datestar,
    },
    {
      name: "ass_line",
      selector: (row) => row.line_name,
    },
    {
      name: "alternate",
      selector: (row) => row.alternate,
    },
    {
      name: "status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Button variant="primary" onClick={() => handleButtonClick(row)}>
            View
          </Button>
        </div>
      ),
    },
  ];

  const radioOptions = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "8", value: "8" },
  ];

  const SplitExp = (exp) => {
    let Exp = exp.split("-");

    return Exp;
  };

  const FormatDate = (date) => {
    let dateTime = new Date(date);
    let dateOnly = new Date(
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate()
    );
    let dateString = dateOnly.toISOString().split("T")[0];

    return dateString;
  };

  const handleButtonClick = (row) => {
    fetch(`http://localhost:3336/bam/${row.job}`)
      .then((response) => response.json())
      .then((data) => {
        setData_Bam(data);
        setSelectedRowData(row);
        setShowModal(true);
        //console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    //setShowModalProd(false);
  };

  const DetailBam = (e) => {
    if (e.key === "Enter") {
      fetch(`http://localhost:3336/jobbam/${job_bam}/${qty}`)
        .then((response) => response.json())
        .then((data) => {
          setData_Jobbam([...datajobbam, data[0]]);
          console.log(datajobbam)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  const handleSave = (e) => {
    //const line = e.target.value;
    fetch(
      `http://localhost:3336/production/${ass_line}/${encodeURIComponent(
        modal
      )}/${datestart}`
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.job);
        setData_job(data);
        //setData_Bam(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    //console.log(`${modal}${ass_line}${datestart}`)
  };

  const data_line = () => {
    fetch("http://localhost:3336/line")
      .then((response) => response.json())
      .then((data) => {
        setData_Line(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const data_model = (e) => {
    setAss_line(e.target.value);
    const line = e.target.value;
    fetch(`http://localhost:3336/model/${line}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setData_Model(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    data_line();
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Production</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Production</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* /.col */}
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-body p-3">
                  <Form>
                    <Row>
                      <Col xs={3}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Ass Line</Form.Label>
                          <Form.Control
                            as="select"
                            onChange={data_model}
                            required
                          >
                            <option value="">โปรดเลือก Line</option>
                            {data_lines.map((line) => (
                              <option value={line.id}>{line.line_name}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col xs={3}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput2"
                        >
                          <Form.Label>Modal</Form.Label>
                          <Form.Control
                            as="select"
                            onChange={(e) => setModal(e.target.value)}
                            required
                          >
                            <option value="">โปรดเลือก Model</option>
                            {data_models.map((model) => (
                              <option value={model.model_name}>
                                {model.model_name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col xs={3}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput3"
                        >
                          <Form.Label>Job_Date</Form.Label>
                          <Form.Control
                            type="date"
                            onChange={(e) => setDatestart(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={3} className="d-flex align-items-end mb-3">
                        <Button variant="primary" onClick={handleSave}>
                          Search
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <DataTable
                    columns={columns}
                    data={data_job}
                    selectableRows
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="500px"
                  />
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detali</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRowData && (
            <form>
              <div>
                <Container>
                  <Row>
                    <Col xs={12} md={6}>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Line</Form.Label>
                          <Form.Control as="select" className="" disabled>
                            <option value={selectedRowData.line_name}>
                              {selectedRowData.line_name}
                            </option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Label className=""></Form.Label>
                        <Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="exampleForm.ControlInput2"
                        >
                          <Form.Label>Modal</Form.Label>
                          <Form.Control as="select" className="" disabled>
                            <option value={selectedRowData.modal}>
                              {selectedRowData.modal}
                            </option>
                          </Form.Control>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Alternate</Form.Label>
                          <Form.Control
                            as="select"
                            //onChange={}
                            required
                            className=""
                            disabled
                          >
                            <option value={selectedRowData.alternate}>
                              {selectedRowData.alternate}
                            </option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group
                          //as={Col}
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Shipment</Form.Label>
                          <Form.Control
                            type="date"
                            value={FormatDate(selectedRowData.shipment)}
                            disabled
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Exp-Code</Form.Label>
                          <Form.Control
                            as="select"
                            required
                            className=""
                            disabled
                          >
                            <option value={SplitExp(selectedRowData.exp)[0]}>
                              {SplitExp(selectedRowData.exp)[0]}
                            </option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Label className=""></Form.Label>
                        <Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label></Form.Label>
                          <Form.Control
                            as="select"
                            required
                            className="mt-2"
                            disabled
                          >
                            <option value={SplitExp(selectedRowData.exp)[1]}>
                              {SplitExp(selectedRowData.exp)[1]}
                            </option>
                          </Form.Control>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Qty</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={selectedRowData.qty}
                            disabled
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Shift</Form.Label>
                          <div className="d-flex flex-row">
                            {radioOptions.map((option) => (
                              <Form.Check
                                className="ml-2"
                                key={option.value}
                                type="radio"
                                id={option.value}
                                label={option.label}
                                value={selectedRowData.shift}
                                checked={selectedRowData.shift === option.value}
                                disabled
                              />
                            ))}
                          </div>
                        </Form.Group>
                      </Row>
                    </Col>
                    <Col xs={6} md={6}>
                      <Form.Label>Alternate</Form.Label>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>BAM</th>
                            <th>QTY</th>
                          </tr>
                        </thead>
                        <tbody>
                          {databam.map((data) => (
                            <tr>
                              <td>{data.bam_code}</td>
                              <td>{data.req * data.qty}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                  <Row className="border-top mb-3">
                    <Form.Group
                      as={Row}
                      className="mb-3 p-2"
                      required
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label column sm={4}>
                        User [*]
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control type="text" placeholder="" />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3 p-2"
                      required
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label column sm={4}>
                        Tag Balance
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          placeholder=""
                          value={datajobbam?.qty_act}
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      as={Row}
                      className="mb-3 p-1"
                      required
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label column sm={4} md={4}>
                        Scan Tag [*]
                      </Form.Label>
                      <Col sm={8} md={8}>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChange={(e) => setJob_bam(e.target.value)}
                          onKeyPress={DetailBam}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3 p-1"
                      required
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label column sm={4} md={4}>
                        Qty [*]
                      </Form.Label>
                      <Col sm={8} md={8}>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChange={(e) => setQty(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                  <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>status</th>
                            <th>Assembly</th>
                            <th>Good Qty</th>
                            <th>Return Qty</th>
                            <th>Tag</th>
                            <th>Ref Tag</th>
                          </tr>
                        </thead>
                        <tbody>
                          {datajobbam?.map((innerArray, index) => (
                            innerArray.map((item, innerIndex) => (
                            <tr key={innerIndex}>
                              <td>{item.status}</td>
                              <td>{item.ass_line}</td>
                              <td>{item.qty_use}</td>
                              <td>{item.qty_return}</td>
                              <td>{item.job}</td>
                              <td>{item.ref_tag}</td>
                            </tr>
                            ))  
                          ))}
                        </tbody>
                      </Table>
                  </Row>
                </Container>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            hidden
            //onClick={handleSave}
            //disabled={isLoading}
          >
            {/* {isLoading ? "Saving..." : "Save"} */}Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Prod;
