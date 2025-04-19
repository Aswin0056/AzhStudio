import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles.css'; // Import custom styles

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    imageUrl: "",
    link: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        setProjects(res.data.projects);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/projects", newProject);
      setNewProject({ name: "", description: "", imageUrl: "", link: "" });
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data.projects);
    } catch (err) {
      console.error("Error adding project", err);
    }
  };

  return (
    
    <div className="dashboard-container">
   
      <h2 className="dashboard-header">Dashboard</h2>
      <p className="dashboard-welcome">Welcome, {username}!</p>

      {/* Add New Project Form */}
      <form onSubmit={handleAddProject} className="project-form">
        <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
        <input
          type="text"
          name="name"
          value={newProject.name}
          onChange={handleInputChange}
          placeholder="Project Name"
          className="block mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="block mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={newProject.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="block mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          name="link"
          value={newProject.link}
          onChange={handleInputChange}
          placeholder="Project Link"
          className="block mb-4 p-2 border rounded w-full"
          required
        />
        <button type="submit" className="submit-button">
          Add Project
        </button>
      </form>

      {/* Display Projects */}
      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.imageUrl} alt={project.name} className="w-full h-40 object-cover rounded-md mb-2" />
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="text-gray-700">{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Visit Project
            </a>
            <div className="mt-2 text-sm text-gray-500">
              <p>Status: {project.status}</p>
              <p>Commands: {project.commandsUsed}</p>
              <p>Users: {project.userCount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
