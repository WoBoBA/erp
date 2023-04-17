import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Form, Button } from "react-bootstrap";

function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [showError, setShowError] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState("");
  const [shift, setShift] = useState("");
  const [exp, setExp] = useState("");
  const [shipment, setShipment] = useState("");
  const [qty, setQty] = useState("");
  const [datestar, setDatestar] = useState("");
  const [dateend, setDateend] = useState("");
  const [ass_line, setAss_line] = useState("");
  const [events, setEvents] = useState([]);
  const [lines, setLine] = useState([]);
  const [models, setModel] = useState([]);

  const handleModalClose = () => {
    setSelectedEvent(null);
  };
  const handleEventClick = (eventInfo) => {
    setSelectedEvent(eventInfo.event);
  };

  const handleSelect = (eventInfo) => {
    const start =
      eventInfo.start.toLocaleDateString("default", { year: "numeric" }) +
      "-" +
      eventInfo.start.toLocaleDateString("default", { month: "2-digit" }) +
      "-" +
      eventInfo.start.toLocaleDateString("default", { day: "2-digit" });
    const end =
      eventInfo.end.toLocaleDateString("default", { year: "numeric" }) +
      "-" +
      eventInfo.end.toLocaleDateString("default", { month: "2-digit" }) +
      "-" +
      eventInfo.end.toLocaleDateString("default", { day: "2-digit" });

    //start.setDate(start.getDate() + 1);
    //const end1 = eventInfo.end.toISOString().substr(0, 10);
    setSelectedDateRange({
      start: start,
      end: end,
    });
  };

  /*   const handleEventChange = (eventChangeInfo) => {
    const { event, oldEvent, revert } = eventChangeInfo;

    // Update the event in the database via an API
    fetch("http://localhost:3336/production", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        job: event.id,
        datestar: event.start.toLocaleDateString(),
        dateend: event.end.toLocaleDateString()
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Event updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        revert();
      });
  }; */

  const handleSelectModalClose = () => {
    setSelectedDateRange(null);
  };

  const handleEventResize = (eventInfo) => {
    const event = eventInfo.event;

    //eventInfo.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const start =
      event.start.toLocaleDateString("default", { year: "numeric" }) +
      "-" +
      event.start.toLocaleDateString("default", { month: "2-digit" }) +
      "-" +
      event.start.toLocaleDateString("default", { day: "2-digit" });
    const end =
      event.end.toLocaleDateString("default", { year: "numeric" }) +
      "-" +
      event.end.toLocaleDateString("default", { month: "2-digit" }) +
      "-" +
      event.end.toLocaleDateString("default", { day: "2-digit" });

    const raw = JSON.stringify({
      job: event.id,
      datestar: start,
      dateend: end,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3336/production", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "OK") {
          window.location.href = "/calender";
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleSave = (event) => {
    //setIsLoading(true);

    event.preventDefault();
    if (modal === "" || ass_line === "") {
      setShowError(true);
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        modal: modal,
        shift: shift,
        exp: exp,
        shipment: shipment,
        qty: qty,
        datestar: datestar,
        dateend: dateend,
        ass_line: ass_line,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3336/production", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          //alert(raw);
          alert(result["message"]);
          if (result["status"] === "OK") {
            window.location.href = "/calender";
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  const data_model = (e) => {
    setAss_line(e.target.value)
    const line = e.target.value;
    fetch(`http://localhost:3336/model/${line}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setModel(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const data_line = () => {
    fetch("http://localhost:3336/line")
      .then((response) => response.json())
      .then((data) => {
        setLine(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const data_event = () => {
    fetch("http://localhost:3336/production")
      .then((response) => response.json())
      .then((data) => {
        const mappedEvents = data.map((event) => {
          const endDate = new Date(event.dateend);
          endDate.setMinutes(endDate.getMinutes() + 1);

          return {
            title: event.modal,
            id: event.job,
            start: event.datestar,
            end: endDate,
            //allDay : true,
            //allDay: event.all_day,
          };
        });
        setEvents(mappedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  useEffect(() => {
    data_event();
    data_line();
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Calendar</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Calendar</li>
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
                <div className="card-body p-1">
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleSelect}
                    events={events}
                    eventClick={handleEventClick}
                    eventChange={handleEventResize}
                    //eventChange={handleChange}
                    //nextDayThreshold={"23:00:00"}
                    /* weekends={this.state.weekendsVisible}
                    initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    select={this.handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={this.handleEventClick}
                    eventsSet={this.handleEvents}  */ // called after events are initialized/added/changed/removed
                    /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                  */
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
      <Modal show={selectedEvent !== null} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent && selectedEvent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <p>Start : {selectedEvent.start.toLocaleDateString()}</p>
              <p>End : {selectedEvent.end.toLocaleDateString()}</p>
              <p>Job_ID : {selectedEvent.id}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      {/* Modal Selected */}
      <Modal show={selectedDateRange !== null} onHide={handleSelectModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Selected Date Range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDateRange && (
            <form>
              <div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Ass Line</Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder=""
                    required
                    onChange={(e) => setAss_line(e.target.value)}
                  /> */}
                  <Form.Control
                    as="select"
                    onChange={data_model}
                    required
                    className={showError && ass_line === "" ? "is-invalid" : ""}
                  >
                    <option value="">โปรดเลือก Line</option>
                    {lines.map((line) => (
                      <option value={line.id}>{line.line_name}</option>
                    ))}
                  </Form.Control>
                  {showError && ass_line === "" && (
                    <Form.Control.Feedback type="invalid">
                      Please Select Line.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Modal</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setModal(e.target.value)}
                    required
                    className={showError && modal === "" ? "is-invalid" : ""}
                  >
                    <option value="">โปรดเลือก Model</option>
                    {models.map((model) => (
                      <option value={model.model_name}>
                        {model.model_name}
                      </option>
                    ))}
                  </Form.Control>
                  {showError && modal === "" && (
                    <Form.Control.Feedback type="invalid">
                      Please Select Modal.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Shift</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) => setShift(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Exp-Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) => setExp(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Shipment</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setShipment(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Qty</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) => setQty(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date Start</Form.Label>
                  <Form.Control
                    type="date"
                    //value={selectedDateRange.start}

                    onChange={(e) => setDatestar(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date End</Form.Label>
                  <Form.Control
                    type="date"
                    //value={selectedDateRange.end}

                    onChange={(e) => setDateend(e.target.value)}
                  />
                </Form.Group>
                {/* <p>Start: {selectedDateRange.start}</p>
                <p>End: {selectedDateRange.end}</p> */}
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSelectModalClose}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={handleSave}
            //disabled={isLoading}
          >
            {/* {isLoading ? "Saving..." : "Save"} */}Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Calendar;
