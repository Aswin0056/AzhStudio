import "../styles.css";

export default function Download() {
  const apps = [
    { title: "CF", size: "81 MB", version: "1.0", link: "/downloads/CF.apk" },
    { title: "Expensaver", size: "9.5 MB", version: "1.0", link: "/downloads/app-debug.apk" },
    { title: "LIX AI", size: "78 MB", version: "1.0", link: "/downloads/LIX.apk" },
  ];

  return (
    <div className="download-container">
      <h2>Download Our Apps Here</h2>
      <h4>Android - APK</h4>
      <table className="app-table">
        <thead>
          <tr>
            <th>Application</th>
            <th>Size</th>
            <th>version</th>
            <th>Download</th>
            
          </tr>
        </thead>
        <tbody>
          {apps.map((app, index) => (
            <tr key={index}>
              <td>{app.title}</td>
              <td>{app.size}</td>
              <td>{app.version}</td>
              <td>
                <a href={app.link} className="download-btn" download>
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="owner-label" style={{ marginTop: "150px" }}>
        Created by <span>Aswin</span>
      </p>
    </div>
  );
}
