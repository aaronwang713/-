const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "siyanwang8787@gmail.com", // Your Gmail
        pass: "pwni pwlg hjwm hzmh" // App password from Google
    }
});

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve other pages
const pages = [
    "pizza", "north-breakfast", "north-lunch", "north-dinner",
    "central-breakfast", "central-lunch", "central-dinner",
    "south-breakfast", "south-lunch", "south-dinner",
    "east-breakfast", "east-lunch", "east-dinner",
    "about", "location", "secret", "profile", "location"
];
pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, "public", `${page}.html`));
    });
});

// Send email notification
app.post("/send-email", async (req, res) => {
    try {
        await transporter.sendMail({
            from: "siyanwang8787@gmail.com",
            to: "siyan0713wang@gmail.com",
            subject: "披薩通知",
            text: "披薩已取出"
        });
        res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});