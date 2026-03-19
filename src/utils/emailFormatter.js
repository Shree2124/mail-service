export function generateEmailContent(data) {
  return {
    subject: `📢 AcadFlow: ${data.titleOfAssesment}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">

    <!-- Header -->
    <h2 style="color: #2c3e50; text-align: center; margin-bottom: 10px;">
      📢 AcadFlow Notification
    </h2>
    <p style="text-align: center; color: #7f8c8d; font-size: 14px;">
      New Assignment Uploaded
    </p>

    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

    <!-- Content -->
    <p><strong>📚 Subject:</strong> ${data.subjectName} (${data.subjectCode})</p>
    <p><strong>👨‍🏫 Teacher:</strong> ${data.teacherName}</p>
    <p><strong>📝 Assessment:</strong> ${data.titleOfAssesment}</p>
    <p><strong>📅 Due Date:</strong> 
      <span style="color: #e74c3c; font-weight: bold;">
        ${data.dueDate}
      </span>
    </p>

    <p style="margin-top: 10px;">
      <strong>🎓 Class Details:</strong><br/>
      Year ${data.year} | Sem ${data.sem} | Div ${data.div}
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://acadflow-pvppcoe.vercel.app/" target="_blank"
         style="background-color: #3498db;
                color: #ffffff;
                padding: 12px 20px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                display: inline-block;">
        🚀 Go to AcadFlow Portal
      </a>
    </div>

    <!-- Footer -->
    <p style="font-size: 13px; color: #7f8c8d; text-align: center;">
      Please complete your submission before the deadline.<br/>
      – Team AcadFlow
    </p>

  </div>
</div>
    `,
  };
}