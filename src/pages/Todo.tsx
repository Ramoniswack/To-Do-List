import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { TodoItem } from "../types/types";
import { FiSearch, FiCheck } from "react-icons/fi";
import Footer from "../components/Footer";

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
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTodos = filteredTodos.slice(startIndex, startIndex + itemsPerPage);

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
    if (!window.confirm("Are you sure you want to delete this task?")) return;
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
  const trimmed = editedText.trim();

  if (trimmed === todos[index].text) {
    alert("No changes made.");
    setEditingIndex(null);  // exit edit mode
    setEditedText("");      // clear input
    return;
  }

  if (!trimmed) return; // prevent saving empty

  if (!window.confirm("Are you sure you want to save changes?")) return;

  const updatedTodos = [...todos];
  updatedTodos[index].text = trimmed;
  setTodos(updatedTodos);
  localStorage.setItem(userKey, JSON.stringify(updatedTodos));
  setEditingIndex(null);
  setEditedText("");
};



  const pending = todos.filter((t) => !t.done).length;
  const completed = todos.filter((t) => t.done).length;

const GradientCheckbox = ({ checked, onToggle }: { checked: boolean; onToggle: () => void }) => (
  <div
    onClick={onToggle}
    className="w-6 h-6 rounded-md p-[2px] cursor-pointer"
    style={{
      background: checked
        ? 'black'
        : 'linear-gradient(to right, #34d399, #3b82f6, #facc15)', // green, blue, yellow
    }}
  >
    <div
      className="w-full h-full flex items-center justify-center bg-white rounded-md"
    >
      {checked && <FiCheck className="text-black text-sm" />}
    </div>
  </div>
);



  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex justify-center items-start px-4 py-6">
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                            <img
  src="/ats.png"
  alt="Aaja Ta Suree Logo"
  className="w-24 mx-auto mb-4 animate-fadeInScale transition-transform transform hover:scale-105"
/>

          <div className="flex items-center justify-center gap-2 mb-4">
   
   

            <h1 className="text-3xl font-bold text-indigo-600">Your Tasks</h1>
            <FiSearch
              className="text-2xl text-indigo-600 hover:scale-110 transition-transform cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>

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
className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 text-xl"
              >
                ✕
              </button>
            </div>
          )}

          {/* Add Task Form */}
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
  onFocus={() => setShowSearch(false)} 
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
  disabled={showSearch}
  className={`w-full py-2 rounded-lg transition cursor-pointer 
    ${showSearch
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
>
  Add Task
</button>


          </form>

          {/* Task List */}
          <ul className="space-y-3 mb-6">
            {currentTodos.map((todo, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-50 px-4 py-3 border rounded-lg shadow">
                {editingIndex === index ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveEdit(index);
                    }}
                    className="flex flex-col sm:flex-row w-full gap-2"
                  >
                    <input
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="flex-grow border px-2 py-1 rounded"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-indigo-500 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                      disabled={!editedText.trim()}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingIndex(null)}
                      className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 w-full sm:w-auto"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
           <div className="flex items-center gap-2">
  <GradientCheckbox checked={todo.done} onToggle={() => toggleTodoDone(index)} />
  <span className={`text-sm ${todo.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
    {todo.text}
  </span>
</div>

                    <div className="flex gap-2 text-sm">
                      <button
                        onClick={() =>
                          setViewedDescription(todo.description || "No description")
                        }
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        View
                      </button>
                      <button
                        onClick={() => startEditTodo(index)}
                        className="text-indigo-600 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(index)}
                        className="text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex justify-between items-center mb-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {Math.ceil(filteredTodos.length / itemsPerPage)}
            </span>
            <button
              disabled={startIndex + itemsPerPage >= filteredTodos.length}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>

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

          {/* Actions */}
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
      </div>

      {/* Description Modal */}
      {viewedDescription !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-transparent pointer-events-auto"></div>
          <div className="relative bg-white border border-gray-300 rounded-lg shadow-xl p-6 max-w-sm w-full animate-fadeInScale z-50">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">Task Description</h2>
<p className="text-gray-800 whitespace-pre-line break-words">{viewedDescription}</p>
            <button
              onClick={() => setViewedDescription(null)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Todo;
