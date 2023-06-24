import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: [],
      modal: false
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todo/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  displayCompleted = status => {
    this.setState({ viewCompleted: status });
  };

  renderTabList = () => {
    const { viewCompleted } = this.state;

    return (
      <div className="my-5 tab-list d-flex justify-content-center">
        <span
          onClick={() => this.displayCompleted(true)}
          className={viewCompleted ? "active" : ""}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={!viewCompleted ? "active" : ""}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted, todoList } = this.state;
    const filteredItems = todoList.filter(
      item => item.completed === viewCompleted
    );

    return filteredItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            item.completed ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todo/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todo/", item)
      .then(res => this.refreshList());
  };

  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todo/${item.id}/`)
      .then(res => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo App</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-3">
                  <button
                    onClick={this.createItem}
                    className="btn btn-primary"
                  >
                    Add Task
                  </button>
                </div>
                {this.renderTabList()}
                <ul className="list-group list-group-flush">
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.modal && (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default App;
