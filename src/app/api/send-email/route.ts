import { NextResponse } from "next/server";
import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_PUBLIC_KEY!,
  process.env.MAILJET_API_PRIVATE_KEY!
);

// Email template
const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interview Scheduled</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 16px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background-color: #f4f4f4;
      color: #666666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <h1>Interview Scheduled</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Hello {{name}},</h2>
      <p>Your interview has been scheduled for <strong>{{date}}</strong>.</p>
      <p>Interview Title: <strong>{{title}}</strong></p>
      <p>Description: <strong>{{description}}</strong></p>
      <p>Click the button below to join the meeting:</p>
      <a href="{{meetingLink}}" class="button">Join Meeting</a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Best of luck!</p>
      <p>If you have any questions, feel free to contact us.</p>
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: Request) {
  try {
    const { to, name, date, title, description, meetingLink } =
      await request.json();

    // Replace placeholders with actual data
    const html = emailTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{date}}/g, date)
      .replace(/{{title}}/g, title)
      .replace(/{{description}}/g, description)
      .replace(/{{meetingLink}}/g, meetingLink);

    // Send email using Mailjet
    const emailResponse = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "banerjeeswarnab66@gmail.com", // Replace with your verified sender email
              Name: "CodeVue",
            },
            To: [
              {
                Email: to,
                Name: name,
              },
            ],
            Subject: "Interview Scheduled",
            HTMLPart: html,
          },
        ],
      });

    // Log the Mailjet response
    console.log("Mailjet Response:", emailResponse.body);

    return NextResponse.json(emailResponse.body, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
