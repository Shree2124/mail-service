export function generateEmailContent(data) {
  return {
    subject: `📢 AcadFlow: ${data.titleOfAssesment}`,
    html: `
      <h2>AcadFlow Notification</h2>
      <p><b>Subject:</b> ${data.subjectName}</p>
      <p><b>Teacher:</b> ${data.teacherName}</p>
      <p><b>Assessment:</b> ${data.titleOfAssesment}</p>
      <p><b>Due Date:</b> ${data.dueDate}</p>
      <p>Year ${data.year} | Sem ${data.sem} | Div ${data.div}</p>
      <br/>
      <p>Please submit before deadline.</p>
    `,
  };
}