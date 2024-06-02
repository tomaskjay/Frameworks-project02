import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  BsFillPlusCircleFill,
  BsPencilSquare,
  BsSlashCircle,
} from "react-icons/bs";

export interface Task {
  title: string;
  description: string;
  deadline: string;
  priority: string;
  key: string;
}

interface Props {
  name: String;
  onSave: (data: Task) => void;
}

function ModalButton(props: Props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    key: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      props.onSave(task);

      setShow(false);
    }

    setValidated(true);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          backgroundColor: props.name === "Add" ? "#6CB4EE" : undefined,
        }}
      >
        {props.name === "Add" ? (
          <>
            <BsFillPlusCircleFill />
            <span>ADD</span>
          </>
        ) : (
          <>
            <BsPencilSquare />
            <span>UPDATE</span>
          </>
        )}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="card">
          <div className="card-header bg-primary text-white">
            {" "}
            {props.name === "Add" ? (
              <>
                <BsFillPlusCircleFill />
                <span style={{ color: "white" }}>Add Task</span>
              </>
            ) : (
              <>
                <BsPencilSquare />
                <span style={{ color: "white" }}>Edit Task</span>
              </>
            )}
          </div>
          <div className="card-body">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3"></Row>
              <Row className="mb-3">
                <div style={{ marginTop: "10px" }}>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                      {props.name === "Add" ? (
                        <Form.Control
                          name="description"
                          type="text"
                          placeholder="Title"
                          value={task.title}
                          onChange={(event) =>
                            setTask({
                              ...task,
                              title: event.target.value,
                            })
                          }
                          required
                        />
                      ) : null}

                      <Form.Control.Feedback type="invalid">
                        Title is required!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                      <Form.Control
                        name="decription"
                        type="text"
                        placeholder="Description"
                        value={task.description}
                        onChange={(event) =>
                          setTask({
                            ...task,
                            description: event.target.value,
                          })
                        }
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Description is required!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom05">
                      <Form.Control
                        type="date"
                        name="deadline"
                        placeholder="Deadline"
                        value={task.deadline}
                        onChange={(event) =>
                          setTask({
                            ...task,
                            deadline: event.target.value,
                          })
                        }
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Date is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </div>
              </Row>

              <Form.Group className="mb-3">
                <div>Priority</div>
                <Form.Group>
                  <div className="d-flex">
                    <Form.Check
                      inline
                      type="radio"
                      name="priority"
                      id="flexRadioDefault1"
                      label="Low"
                      className="mb-3"
                      value={task.priority}
                      onChange={(event) =>
                        setTask({
                          ...task,
                          priority: "Low",
                        })
                      }
                      required
                    />

                    <Form.Check
                      inline
                      type="radio"
                      name="priority"
                      id="flexRadioDefault2"
                      label="Medium"
                      className="mb-3"
                      value={task.priority}
                      onChange={(event) =>
                        setTask({
                          ...task,
                          priority: "Med",
                        })
                      }
                      required
                    />

                    <Form.Check
                      inline
                      type="radio"
                      name="priority"
                      id="flexRadioDefault3"
                      label="High"
                      className="mb-3"
                      value={task.priority}
                      onChange={(event) =>
                        setTask({
                          ...task,
                          priority: "High",
                        })
                      }
                      required
                    />
                  </div>
                </Form.Group>
              </Form.Group>
              <div className="text-end">
                <Button type="submit" className="me-2">
                  {props.name === "Add" ? (
                    <>
                      <BsFillPlusCircleFill />
                      <span>ADD</span>
                    </>
                  ) : (
                    <>
                      <BsPencilSquare />
                      <span>Edit</span>
                    </>
                  )}
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  <BsSlashCircle />
                  <span>Cancel</span>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalButton;
