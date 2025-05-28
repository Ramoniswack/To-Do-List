import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { TodoItem } from "../types/types";
import { FiSearch, FiCheck } from "react-icons/fi";


const Todo = () => {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(Cookies.get("loggedInUser") || "{}");
  const userKey = `todos_${loggedUser.email}`;

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [viewedDescription, setViewedDescription] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);



  useEffect(() => {
    const storedTodos = localStorage.getItem(userKey);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("loggedInUser");
    navigate("/");
  };

 const handleAddTodo = () => {
  const trimmedText = newTodo.trim();
  if (!trimmedText) return;
  if (trimmedText.length > 50) {
    alert("Todo should not exceed 50 characters.");
    return;
  }

  const updatedTodos = [
    ...todos,
    { text: trimmedText, done: false, description: newDescription.trim() },
  ];
  setTodos(updatedTodos);
  localStorage.setItem(userKey, JSON.stringify(updatedTodos));
  setNewTodo("");
  setNewDescription("");
};


  const toggleTodoDone = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
    localStorage.setItem(userKey, JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem(userKey, JSON.stringify(updatedTodos));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      setTodos([]);
      localStorage.removeItem(userKey);
    }
  };

  const startEditTodo = (index: number) => {
    setEditingIndex(index);
    setEditedText(todos[index].text);
  };

  const handleSaveEdit = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editedText;
    setTodos(updatedTodos);
    localStorage.setItem(userKey, JSON.stringify(updatedTodos));
    setEditingIndex(null);
    setEditedText("");
  };

  const pending = todos.filter((t) => !t.done).length;
  const completed = todos.filter((t) => t.done).length;

 const GradientCheckbox = ({ checked, onToggle }: { checked: boolean; onToggle: () => void }) => {
  return (
 <div
  onClick={onToggle}
  className={`w-6 h-6 p-[2px] rounded-md cursor-pointer transition 
    ${checked 
      ? 'bg-black' 
      : 'bg-gradient-to-r from-green-400 via-blue-400 to-yellow-300'}
  `}
>
  <div className="w-full h-full flex items-center justify-center rounded-md bg-white">
    {checked && <FiCheck className="text-black text-sm" />}
  </div>
</div>


  );
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-4">
  <h1 className="text-3xl font-bold text-indigo-600">Your Tasks</h1>
<FiSearch
  className="text-2xl text-indigo-600 hover:scale-110 transition-transform cursor-pointer"
  onClick={() => setShowSearch(!showSearch)}
/>
{showSearch && (
  <div className="relative w-full mb-4 mt-2">
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
    />
    <button
      onClick={() => {
        setSearchTerm("");
        setShowSearch(false);
      }}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 text-sm"
    >
      ✕
    </button>
  </div>
)}



</div>


        {/* Input Form */}
        {/* <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add a task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddTodo}
            className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Add
          </button>
        </div>  */}
<form
  onSubmit={(e) => {
    e.preventDefault();
    handleAddTodo();
  }}
  className="space-y-2 mb-4"
>
  <input
    type="text"
    placeholder="Add a task"
    value={newTodo}
    onChange={(e) => setNewTodo(e.target.value)}
    maxLength={50}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
  <textarea
    placeholder="Add a description (optional)"
    value={newDescription}
    onChange={(e) => setNewDescription(e.target.value)}
    rows={2}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
  <button
    type="submit"
    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
  >
    Add Task
  </button>
</form>



        {/* Task List */}
        <ul className="space-y-3 mb-6">
{todos
  .filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 px-4 py-3 border rounded-lg shadow"
            >
              {editingIndex === index ? (
                <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSaveEdit(index);
  }}
  className="flex w-full gap-2"
>
  <input
    value={editedText}
    onChange={(e) => setEditedText(e.target.value)}
    className="flex-grow border px-2 py-1 rounded"
    autoFocus
  />
  <button
    type="submit"
    className="bg-indigo-500 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={!editedText.trim()}
  >
    Save
  </button>
  <button
    type="button"
    onClick={() => setEditingIndex(null)}
    className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
  >
    Cancel
  </button>
</form>

              ) : (
                <>
                  <div className="flex items-center gap-2">
<label className="relative inline-flex items-center">
<GradientCheckbox
  checked={todo.done}
  onToggle={() => toggleTodoDone(index)}
/>



</label>




                
<span
  className={`text-sm w-full overflow-hidden break-all whitespace-normal ${
    todo.done ? "line-through text-gray-400" : "text-gray-800"
  }`}
>
  {todo.text}
</span>



                  </div>
                  <div className="flex gap-2 text-sm">
                    <button
  onClick={() => setViewedDescription(todo.description || "No description")}
  className="text-blue-600 hover:underline"
>
  View
</button>

                    <button onClick={() => startEditTodo(index)} className="text-indigo-600 hover:underline">Edit</button>
                    <button onClick={() => handleDeleteTodo(index)} className="text-red-500 hover:underline">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-center mb-4">
          <div>
            <div className="text-xl font-bold text-yellow-600">{pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">{completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-xl font-bold text-indigo-600">{todos.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>

        {/* Clear All */}
        {todos.length > 0 && (
          <button
            onClick={handleClearAll}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
          >
            Clear All
          </button>
        )}

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
{viewedDescription !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Transparent background to block interaction */}
    <div className="absolute inset-0 bg-transparent pointer-events-auto"></div>

    {/* Modal container */}
    <div className="relative bg-white border border-gray-300 rounded-lg shadow-xl p-6 max-w-sm w-full animate-fadeInScale z-50">
      <h2 className="text-xl font-semibold text-indigo-600 mb-2">Task Description</h2>
      <p className="text-gray-800 whitespace-pre-line">{viewedDescription}</p>
      <button
        onClick={() => setViewedDescription(null)}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Close
      </button>
    </div>
  </div>
)}



    </div>
  );
};

export default Todo;
