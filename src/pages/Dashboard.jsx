import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectSuccessMsg, setProjectSuccessMsg] = useState("");
  const [newProject, setNewProject] = useState({
    name: "",
    imageUrl: "",
    link: "",
  });
  
  const [newQA, setNewQA] = useState({
    question: "",
    answer: "",
  });
  const [expensaver, setExpensaver] = useState({
    userCount: 0,
    expenseCount: 0,
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://studio-bd.onrender.com/api/projects");
      console.log("Fetched projects:", res.data); // ← check what you actually receive
      setProjects(res.data.projects); // if backend returns { projects: [...] }
    } catch (err) {
      console.error("Error fetching projects", err);
    }
  };
  
  

  
const handleQAChange = (e) => {
  const { name, value } = e.target;
  setNewQA({ ...newQA, [name]: value });
};
 
  const handleAddQA = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://studio-bd.onrender.com/api/ai-data", newQA); // Change this URL to your AI database endpoint
      setNewQA({ question: "", answer: "" });
      alert("Question and answer added successfully!");
    } catch (err) {
      console.error("Error adding QA pair", err);
      alert("Failed to add question and answer.");
    }
  };

  const fetchExpensaverData = async () => {
    try {
      const res = await axios.get("https://es-backend-1.onrender.com/api/expensaver-data");
      setExpensaver({
        userCount: res.data.userCount,
        expenseCount: res.data.expenseCount,
      });
    } catch (err) {
      console.error("Error fetching Expensaver data", err);
    }
  };


const handleProjectChange = (e) => {
  const { name, value } = e.target;
  setNewProject((prev) => ({ ...prev, [name]: value }));
};

const checkStatus = async (link) => {
  try {
    const res = await fetch(link, { method: "GET", timeout: 3000 });
    return res.ok ? "online" : "offline";
  } catch {
    return "offline";
  }
};

const handleAddProject = async (e) => {
  e.preventDefault(); // Prevent page refresh

  const status = await checkStatus(newProject.link);
  console.log('Link status:', status); // Log link status

  const newEntry = {
    ...newProject,
    status,
    commandsUsed: 0,
    userCount: 0,
  };

  console.log('Sending new project:', newEntry); // Log the data being sent

  try {
    const res = await axios.post("https://studio-bd.onrender.com/api/projects", newEntry);
    console.log("Response from backend:", res.data); // Log the backend response

    setProjects((prevProjects) => [res.data, ...prevProjects]); // Add project to state
    setNewProject({ name: "", imageUrl: "", link: "" }); // Reset form
    setProjectSuccessMsg("✅ Project added successfully!"); // Success message
  } catch (err) {
    console.error("Error adding project", err);
    alert("❌ Failed to add project.");
  }
};


setTimeout(() => setProjectSuccessMsg(""), 2000);

const handleDeleteProject = async (id) => {
  try {
    await axios.delete(`https://studio-bd.onrender.com/api/projects/${id}`);
    setProjects(projects.filter((project) => project.id !== id));
    alert("🗑️ Project deleted successfully!");
  } catch (err) {
    console.error("Error deleting project", err);
    alert("❌ Failed to delete project.");
  }
};


useEffect(() => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  if (!token) return navigate("/login");

  const storedUsername = sessionStorage.getItem("username") || localStorage.getItem("username");
  setUsername(storedUsername);

  
fetchExpensaverData();
fetchProjects();
}, [navigate]);
  

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Dashboard</h2>
      <p className="dashboard-welcome">Welcome, {username}!</p>
      {projectSuccessMsg && (
  <p className="floating-success">
    {projectSuccessMsg}
  </p>
)}

      {/* ✅ AI Q&A Input Section */}
      <form onSubmit={handleAddQA} className="project-form">
        <h3 className="text-2xl font-bold mb-4">LIX - Add Q&A</h3>

        <textarea
          name="question"
          value={newQA.question}
          onChange={handleQAChange}
          placeholder="Enter Question"
          className="textarea"
          rows={3}
          required
        />
        <textarea
          name="answer"
          value={newQA.answer}
          onChange={handleQAChange}
          placeholder="Enter Answer"
          className="textarea"
          rows={5}
          required
        />
        <button type="submit" className="project-form button">
          Add Q&A
        </button>
      </form>


      {/* ✅ Expensaver Card */}
      <div className="expensaver-card project-card">
        <h3 >Expensaver</h3>
        <div className="expensaver-card details">
          <p className="expensaver-detail">Users: {expensaver.userCount}</p>
          <p className="expensaver-detail">Expenses: {expensaver.expenseCount}</p>
        </div>
      </div>

    {/* Display Project Cards */}
    {Array.isArray(projects) && projects.map((project) => (
  <div key={project._id} className="project-card">
    <img 
      src={project.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdINGRnkX6PiG3W8O4DvHFUO5Z0nSPXmfVWg&s'} 
      alt={project.name} 
      className="project-card img" 
    />
    <h3 className="project-card h3">{project.name}</h3>
    <p className={`ping-status ${project.status === "online" ? "online" : "offline"}`}>
      Status: {project.status === "online" ? "Online" : "Offline"}
    </p>
    <button onClick={() => handleDeleteProject(project.id)} className="delete-button">
  Delete
</button>

  </div>
))}



{/* Add New Project Form */}
<form onSubmit={handleAddProject} className="project-form">
  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Add New Project</h3>

  <label>Project Name</label>
  <input
    type="text"
    name="name"
    value={newProject.name}
    onChange={handleProjectChange}
    placeholder="Enter project name"
    required
  />

  <label>Image URL</label>
  <input
    type="text"
    name="imageUrl"
    value={newProject.imageUrl}
    onChange={handleProjectChange}
    placeholder="Enter image URL"
    required
  />

  <label>Backend Link</label>
  <input
    type="text"
    name="link"
    value={newProject.link}
    onChange={handleProjectChange}
    placeholder="Enter backend link for ping"
    required
  />

  <button type="submit">Add Project</button>
</form>


    </div>
  );
}