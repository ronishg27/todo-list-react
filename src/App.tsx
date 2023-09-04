import "./App.css";
import { useState } from "react";

interface TaskDetails {
  task: string;
  description: string;
}

const App = () => {
  const [Task, setTask] = useState<string>("");
  const [Desc, setDesc] = useState<string>("");
  const [MainTask, setmainTask] = useState<TaskDetails[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newTask: TaskDetails = {
      task: Task,
      description: Desc,
    };

    setmainTask([...MainTask, newTask]);
    setTask("");
    setDesc("");
  }
  const handleDelete = (index: number) => {
    let copyTask = [...MainTask];
    copyTask.splice(index, 1);
    setmainTask(copyTask);
  };
  const handleComplete = (e: number) => {
    let taskList = document.querySelectorAll("li");
    taskList.forEach((element) => {
      const key = element.getAttribute("id");

      if (key && Number(key) == e) {
        element.querySelectorAll(".desc").forEach((el) => {
          if (el.classList.contains("line-through")) {
            el.classList.remove("line-through");
          } else {
            el.classList.add("line-through");
          }
        });
      }
    });
  };
  let renderTask;

  if (MainTask.length === 0) {
    renderTask = <h3 className="text-2xl">No tasks available.</h3>;
  } else {
    renderTask = MainTask.map((t, index) => (
      <>
        <li
          id={String(index)}
          className="flex items-center justify-between mb-5"
        >
          <div className="flex items-center justify-between w-2/3">
            <h4 className="desc mb-4 font-semibold text-2xl">{t.task}</h4>
            <h5 className="desc mb-4 text-lg">{t.description}</h5>
          </div>

          <button
            className="btn bg-green-400 text-white px-4 py-2"
            onClick={() => {
              handleComplete(index);
            }}
          >
            <i className="fa-solid fa-check"></i>
          </button>

          <button
            className="btn bg-red-400 text-white px-4  py-2"
            onClick={() => {
              handleDelete(index);
            }}
          >
            <i className="fi fi-br-cross-circle"></i>
          </button>
        </li>
      </>
    ));
  }

  return (
    <>
      <h3
        id="head1"
        className="bg-black  text-white text-3xl font-medium p-4 text-center"
      >
        My Todo List
      </h3>
      <form id="input" onSubmit={handleSubmit}>
        <input
          type="text"
          className="text-2xl border-zinc-800  border-2 m-8 p-2"
          placeholder="Enter task here"
          value={Task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />

        <input
          type="text"
          className="text-2xl border-zinc-800  border-2 m-8 p-2"
          placeholder="Enter description here"
          value={Desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <button className=" bg-black text-white px-4 py-3 rounded-lg mx-5">
          Add Task <i className="fas fa-tasks"></i>
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-300">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default App;
