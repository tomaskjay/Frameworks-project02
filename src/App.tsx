import { useState } from "react";
import { BsList} from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalButton from "./Components/ModalButton";
import { Task } from "./Components/ModalButton";
import { Button, Form } from "react-bootstrap";
import { BiXCircle } from "react-icons/bi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
  <ToastContainer
    position="bottom-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />;

  const handleSave = (data: Task) => {
    console.log("app check:", data.title);
    tit: data.title;
    // check if a task with the same title already exists
    const isDuplicate = tasks.some((task) => task.title === data.title);
    if (isDuplicate) {
      // show an error message or alert
      //toast.error();
      toast.error("Task with same title already exists!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // add the new task to the tasks array
      setTasks([...tasks, data]);
      // show a success message

      toast.success("Task added successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleEdit = (data: Task, title: string) => {
    // create a copy of the tasks array
    const updatedTasks = [...tasks];

    // find the task to edit by its title
    const index = updatedTasks.findIndex((task) => task.title === title);

    // modify the task object with the new data
    updatedTasks[index] = {
      ...updatedTasks[index],
      description: data.description,
      deadline: data.deadline,
      priority: data.priority,
    };

    // set the modified tasks array as the new state
    setTasks(updatedTasks);

    toast.success("Task updated successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleDelete = (index: number) => {
    // remove the task at the given index from the tasks array
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    toast.success("Task deleted successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleCheck = (index: number) => {
    if (checkedTasks.includes(index)) {
      // uncheck the task
      setCheckedTasks(checkedTasks.filter((i) => i !== index));
    } else {
      // check the task
      setCheckedTasks([...checkedTasks, index]);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header bg-primary">
            <div className="row">
              <div className="col-5"></div>
              <div
                className="col-6"
                style={{
                  fontSize: "20px",
                  color: "white",
                }}
              >
                <BsList />
                <span>
                  {" "}
                  <strong>FRAMEWORKS</strong>{" "}
                </span>
              </div>
              <div className="col-1">
                <ModalButton name="Add" onSave={handleSave} />
              </div>
            </div>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Is Complete</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task: Task, index: number) => (
                  <tr key={index}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.deadline}</td>
                    <td>{task.priority}</td>
                    <td>
                      {" "}
                      <Form>
                        <Form.Check
                          type="checkbox"
                          checked={checkedTasks.includes(index)}
                          onChange={() => handleCheck(index)}
                        />
                      </Form>
                    </td>
                    <td>
                      {!checkedTasks.includes(index) && (
                        <>
                          <ModalButton
                            name="Edit"
                            onSave={(data) => handleEdit(data, task.title)}
                          />
                          <br />
                        </>
                      )}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(index)}
                      >
                        <BiXCircle />
                        <span>DELETE</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
