let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        displayTodoItem();

        function getTodo() {
          const inputElement = document.querySelector(".todoInput");
          const inputDate = document.querySelector("#todoDate");
          const inputTime = document.querySelector("#todoTime");

          const todoItem = inputElement.value.trim();
          const todoDate = inputDate.value;
          const todoTime = inputTime.value;

          if (todoItem === "" || todoDate === "" || todoTime === "") {
            alert("Please enter a task, date, and time.");
            return;
          }

          todoList.push({
            item: todoItem,
            dueDate: `${todoDate} ${todoTime}`,
            completed: false,
            subtasks: [],
          });

          inputElement.value = "";
          inputDate.value = "";
          inputTime.value = "";
          displayTodoItem();
        }

        function displayTodoItem() {
          const todoItems = document.querySelector(".todoContainer");

          if (todoList.length === 0) {
            todoItems.innerHTML =
              '<p class="text-muted">No tasks available. Add your first task!</p>';
            return;
          }

          let newHtml = "";
          localStorage.setItem("todoList", JSON.stringify(todoList));

          for (let i = 0; i < todoList.length; i++) {
            const { item, dueDate, completed, subtasks } = todoList[i];

            newHtml += `
            <div class="row align-items-center mb-4">
              <div class="col-12">
                <div class="card shadow-sm border-info">
                  <div class="card-body">
                    <h5 class="card-title text-primary">
                      ${completed ? `<del>${item}</del>` : item}
                    </h5>
                    <p class="card-text text-muted mb-2">
                      <span class="text-danger">${dueDate}</span>
                    </p>
                    <ul class="list-group mb-3">
                      ${subtasks
                        .map(
                          (subtask, idx) =>
                            `<li class="list-group-item d-flex justify-content-between align-items-center">
                              ${
                                subtask.completed
                                  ? `<del>${subtask.item}</del>`
                                  : subtask.item
                              }
                              <div class="d-flex">
                                <button class="btn btn-sm btn-outline-success me-2" onclick="markSubtaskComplete(${i}, ${idx});">
                                  Complete
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="removeSubtask(${i}, ${idx});">
                                  Delete
                                </button>
                              </div>
                            </li>`
                        )
                        .join("")}
                    </ul>
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control form-control-sm d-inline-block w-75"
                        placeholder="Add Subtask"
                        id="subtaskInput-${i}"
                      />
                      <button
                        class="btn btn-sm btn-outline-primary"
                        onclick="addSubtask(${i});"
                      >
                        Add
                      </button>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        type="button"
                        class="btn btn-outline-success rounded-pill px-4"
                        onclick="markComplete(${i});"
                      >
                        Completed
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-danger rounded-pill px-4"
                        onclick="removeTodo(${i});"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
          }

          todoItems.innerHTML = newHtml;
        }

        function addSubtask(index) {
          const subtaskInput = document.querySelector(`#subtaskInput-${index}`);
          const subtask = subtaskInput.value.trim();

          if (subtask === "") {
            alert("Subtask cannot be empty.");
            return;
          }

          todoList[index].subtasks.push({ item: subtask, completed: false });
          subtaskInput.value = "";
          localStorage.setItem("todoList", JSON.stringify(todoList));
          displayTodoItem();
        }

        function removeTodo(index) {
          todoList.splice(index, 1);
          localStorage.setItem("todoList", JSON.stringify(todoList));
          displayTodoItem();
        }

        function markComplete(index) {
          todoList[index].completed = true;
          localStorage.setItem("todoList", JSON.stringify(todoList));
          displayTodoItem();
        }

        function markSubtaskComplete(taskIndex, subtaskIndex) {
          todoList[taskIndex].subtasks[subtaskIndex].completed = true;
          localStorage.setItem("todoList", JSON.stringify(todoList));
          displayTodoItem();
        }

        function removeSubtask(taskIndex, subtaskIndex) {
          todoList[taskIndex].subtasks.splice(subtaskIndex, 1);
          localStorage.setItem("todoList", JSON.stringify(todoList));
          displayTodoItem();
        }