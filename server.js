const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001; // Ensure this matches your frontend's requests
const filePath = path.join(__dirname, "skills.json");

// Middleware to parse JSON
app.use(express.json());
app.use(express.static("public")); // Serve static files from 'public'

// GET: Retrieve skills
app.get("/skills", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading skills file" });
    }
    res.json(JSON.parse(data || "[]"));
  });
});

// POST: Add a new skill
app.post("/skills", (req, res) => {
  const newSkill = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading skills file" });
    }

    const skills = JSON.parse(data || "[]");
    skills.unshift(newSkill);

    fs.writeFile(filePath, JSON.stringify(skills, null, 2), "utf8", (err) => {
      if (err) {
        return res.status(500).json({ error: "Error writing skills file" });
      }
      res.status(200).json({ message: "Skill added successfully" });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
