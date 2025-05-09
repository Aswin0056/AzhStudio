import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import "../styles.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectSuccessMsg, setProjectSuccessMsg] = useState("");
  const [projectDeleteMsg, setProjectDeleteMsg] = useState("");
  const [reminderText, setReminderText] = useState("");
  const [reminderSuccessMsg, setReminderSuccessMsg] = useState("");
  const [reminderErrorMsg, setReminderErrorMsg] = useState("");
  const [reminderEditMode, setReminderEditMode] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentDeleteMsg, setCommentDeleteMsg] = useState("");
  const [commentsHidden, setCommentsHidden] = useState(false);

  const [newProject, setNewProject] = useState({
    name: "",
    imageUrl: "",
    link: "",
  });

  const [newQA, setNewQA] = useState({
    question: "",
    answer: "",
  });

  // const [expensaver, setExpensaver] = useState({
  //   userCount: 0,
  //   expenseCount: 0,
  // });

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://studio-bd.onrender.com/api/projects");
      setProjects(res.data.projects);
    } catch (err) {
      console.error("Error fetching projects", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch("https://studio-bd.onrender.com/api/get-comments");
      const data = await res.json();
      setComments(data.reverse());
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`https://studio-bd.onrender.com/api/comments/${id}`);
      setComments(comments.filter((comment) => comment._id !== id));
      setCommentDeleteMsg("🗑️ Comment deleted successfully!");
    } catch (err) {
      console.error("Error deleting comment", err);
      alert("❌ Failed to delete comment.");
    }
  };

  useEffect(() => {
    const fetchReminder = async () => {
      try {
        const res = await axios.get("https://studio-bd.onrender.com/api/reminder");
        setReminderText(res.data.reminder.reminder_text || "");
      } catch (err) {
        console.error("Error fetching reminder", err);
      }
    };

    fetchReminder();
  }, []);

  const handleReminderChange = (e) => {
    setReminderText(e.target.value);
  };

  const handleAddReminder = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://studio-bd.onrender.com/api/reminder", {
        text: reminderText,
      });

      setReminderSuccessMsg("✅ Reminder saved!");
      setReminderEditMode(false);
      setTimeout(() => setReminderSuccessMsg(""), 2000);
    } catch (error) {
      console.error("Error saving reminder:", error);
      setReminderErrorMsg("❌ Failed to save reminder.");
    }
  };

  useEffect(() => {
    if (reminderEditMode) {
      document.querySelector(".edit-reminder input")?.focus();
    }
  }, [reminderEditMode]);

  const handleQAChange = (e) => {
    const { name, value } = e.target;
    setNewQA({ ...newQA, [name]: value });
  };

  const handleAddQA = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://studio-bd.onrender.com/api/aiData", newQA);
      setNewQA({ question: "", answer: "" });
      setProjectSuccessMsg("Question and answer added successfully!");
    } catch (err) {
      console.error("Error adding QA pair", err);
      alert("Failed to add question and answer.");
    }
  };
  // const fetchExpensaverData = async () => {
  //   try {
  //     const res = await axios.get("https://studio-bd.onrender.com/api/expensaver-data");
  //     setExpensaver({
  //       userCount: res.data.userCount,
  //       expenseCount: res.data.expenseCount,
  //     });
  //   } catch (err) {
  //     console.error("Error fetching Expensaver data", err);
  //   }
  // };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const checkStatus = async (link) => {
    try {
      const res = await axios.get(`${link}/api/ping`, { timeout: 5000 });
      return res.data.message === "pong" ? "online" : "offline";
    } catch {
      return "offline";
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setProjectSuccessMsg("⏳ Checking project status...");
    const status = await checkStatus(newProject.link);

    const newEntry = {
      ...newProject,
      status,
      commandsUsed: 0,
      userCount: 0,
    };

    try {
      const res = await axios.post("https://studio-bd.onrender.com/api/projects", newEntry);
      setProjects((prev) => [res.data, ...prev]);
      setNewProject({ name: "", imageUrl: "", link: "" });
      setProjectSuccessMsg("✅ Project added successfully!");
    } catch (err) {
      console.error("Error adding project", err);
      alert("❌ Failed to add project.");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) return navigate("/login");

    const storedUsername = sessionStorage.getItem("username") || localStorage.getItem("username");
    setUsername(storedUsername);

    // fetchExpensaverData();
    fetchProjects();
    fetchComments();
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setProjectSuccessMsg(""), 2000);
    return () => clearTimeout(timer);
  }, [projectSuccessMsg]);

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`https://studio-bd.onrender.com/api/projects/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
      setProjectDeleteMsg("🗑️ Project deleted successfully!");
    } catch (err) {
      console.error("Error deleting project", err);
      alert("❌ Failed to delete project.");
    }
  };

  return (
<div className="dashboard-container">
  {reminderSuccessMsg && <p className="floating-success">{reminderSuccessMsg}</p>}
  {reminderErrorMsg && <p className="floating-error">{reminderErrorMsg}</p>}

  <div className="reminder-bar">
    {reminderEditMode ? (
      <div className="edit-reminder">
        <input
          type="text"
          value={reminderText}
          onChange={handleReminderChange}
          placeholder="Enter reminder"
        />
        <button onClick={handleAddReminder}>Save</button>
      </div>
    ) : (
      <div className="display-reminder">
        <span><strong>Reminder:</strong> {reminderText || "No reminder set"}</span>
        <FaEdit className="edit-icon" onClick={() => setReminderEditMode(true)} />
      </div>
    )}
  </div>
 
  <h2 className="dashboard-header">Dashboard</h2>
  <p className="dashboard-welcome">Welcome, {username}!</p>

  {projectSuccessMsg && <p className="floating-success">{projectSuccessMsg}</p>}
  {projectDeleteMsg && <p className="floating-error">{projectDeleteMsg}</p>}
  <div className="dashboard-items-container">
  <form onSubmit={handleAddQA} className="project-form">
    <h3 className="text-2xl font-bold mb-4">LIX - Add Q&A</h3>
    <textarea name="question" value={newQA.question} onChange={handleQAChange} placeholder="Enter Question" rows={3} required />
    <textarea name="answer" value={newQA.answer} onChange={handleQAChange} placeholder="Enter Answer" rows={5} required />
    <button type="submit" className="project-form button">Add Q&A</button>
  </form>

  {commentDeleteMsg && <p className="floating-error">{commentDeleteMsg}</p>}


    <div className="project-cards-container">
      {Array.isArray(projects) && projects.map((project) => (
        <div key={project._id} className="project-card">
          <img src={project.imageUrl} alt={project.name} className="project-card-img" />
          <h3>{project.name}</h3>
          <p className={`ping-status ${project.status}`}>Status: {project.status}</p>
          <button onClick={() => handleDeleteProject(project._id)} className="delete-button">Delete</button>
        </div>
      ))}
    </div>

    {/* <div className="expensaver-card project-card">
      <h3>Expensaver</h3>
      <div className="expensaver-card details">
        <p className="expensaver-detail">Users: {expensaver.userCount}</p>
        <p className="expensaver-detail">Expenses: {expensaver.expenseCount}</p>
      </div>
    </div> */}
  </div>

  <h3 className="text-2xl font-bold mb-4">User Comments</h3>
  {/* The command table will be handled separately */}
  <table className="comment-table">
    <thead>
      <tr>
        <th colSpan={4} style={{ textAlign: "right" }}>
          <button onClick={() => setCommentsHidden((prev) => !prev)} className="hide-toggle-btn">
            {commentsHidden ? "Show Comments" : "Hide Comments"}
          </button>
        </th>
      </tr>
      <tr><th>Name</th><th>Gmail</th><th>Comment</th><th>Action</th></tr>
    </thead>
    {!commentsHidden && (
      <tbody>
        {comments.map((comment) => (
          <tr key={comment._id}>
            <td>{comment.name}</td>
            <td>{comment.gmail}</td>
            <td>{comment.comment}</td>
            <td><button className="delete-button" onClick={() => handleDeleteComment(comment._id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    )}
  </table>

      <form onSubmit={handleAddProject} className="project-form">
        <h3>Add New Project</h3>
        <input type="text" name="name" value={newProject.name} onChange={handleProjectChange} placeholder="Enter project name" required />
        <input type="text" name="imageUrl" value={newProject.imageUrl} onChange={handleProjectChange} placeholder="Enter image URL" required />
        <input type="text" name="link" value={newProject.link} onChange={handleProjectChange} placeholder="Enter backend link for ping" required />
        <button type="submit">Add Project</button>
      </form>

      <p style={{ fontSize: "0.9rem", opacity: 0.7, textAlign: "center" }}>
        Built by Aswin with 🤍 & creativity.
      </p>
    </div>
  );
}
