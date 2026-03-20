/**
 * TACC HPC Access Request — Google Apps Script
 *
 * PURPOSE: Sends you an email every time someone submits the
 * TACC HPC access request Google Form.
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Form in edit mode
 * 2. Click the three-dot menu (⋮) > Script editor
 *    — This opens the Apps Script editor tied to your form
 * 3. Delete any existing code and paste this entire file
 * 4. Update the CONFIG section below with your info
 * 5. Click the disk icon (or Ctrl+S / Cmd+S) to save
 * 6. Run the "installTrigger" function once:
 *    - Select "installTrigger" from the function dropdown
 *    - Click the Run (▶) button
 *    - Authorize the script when prompted (Google will ask for permissions)
 * 7. Done! You'll now get an email for every new submission.
 *
 * NOTE: The trigger only needs to be installed once. If you run
 * installTrigger again, remove old triggers first via
 * Edit > Current project's triggers to avoid duplicates.
 */

// ============================================================
// CONFIG — Update these values
// ============================================================
const CONFIG = {
  // Your work email where notifications should go
  recipientEmail: "YOUR_WORK_EMAIL@morehouse.edu",

  // Your name (used in the email greeting)
  yourName: "Ashley",

  // The TACC system name (e.g., Frontera, Lonestar6, Vista, Stampede3)
  taccSystem: "TACC HPC",

  // Label for email subjects and headings (e.g., "HPC Access", your project name, etc.)
  allocationName: "HPC Access",
};

// ============================================================
// TRIGGER INSTALLER — Run this once
// ============================================================
function installTrigger() {
  // Remove any existing onFormSubmit triggers to avoid duplicates
  const existingTriggers = ScriptApp.getProjectTriggers();
  existingTriggers.forEach(trigger => {
    if (trigger.getEventType() === ScriptApp.EventType.ON_FORM_SUBMIT) {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create a new form submit trigger
  ScriptApp.newTrigger("onFormSubmit")
    .forForm(FormApp.getActiveForm())
    .onFormSubmit()
    .create();

  Logger.log("Trigger installed successfully. You will receive email notifications for new form submissions.");
}

// ============================================================
// FORM SUBMIT HANDLER — Runs automatically on each submission
// ============================================================
function onFormSubmit(e) {
  try {
    const response = e.response;
    const itemResponses = response.getItemResponses();
    const timestamp = response.getTimestamp();

    // Build a summary of all form responses
    let responseSummary = "";
    let submitterName = "New User";
    let submitterEmail = "";

    itemResponses.forEach(itemResponse => {
      const question = itemResponse.getItem().getTitle();
      const answer = itemResponse.getResponse();

      responseSummary += `<tr>
        <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold; background-color: #f8f9fa;">${question}</td>
        <td style="padding: 8px 12px; border: 1px solid #ddd;">${answer}</td>
      </tr>`;

      // Try to capture name and email from common field names
      const questionLower = question.toLowerCase();
      if (questionLower.includes("name") && !questionLower.includes("last") && !questionLower.includes("user")) {
        submitterName = answer;
      }
      if (questionLower.includes("email")) {
        submitterEmail = answer;
      }
    });

    // Format the timestamp
    const formattedDate = Utilities.formatDate(
      timestamp,
      Session.getScriptTimeZone(),
      "MMMM dd, yyyy 'at' hh:mm a"
    );

    // Build the email
    const subject = `[${CONFIG.allocationName}] New HPC Access Request — ${submitterName}`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #800000; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">${CONFIG.allocationName} — New Access Request</h2>
        </div>

        <div style="padding: 20px; background-color: #ffffff; border: 1px solid #ddd;">
          <p>Hi ${CONFIG.yourName},</p>

          <p>A new HPC access request was submitted on <strong>${formattedDate}</strong>.</p>

          <p><strong>Action needed:</strong> Onboard this user to ${CONFIG.taccSystem}.</p>

          <h3 style="margin-top: 24px; color: #800000;">Submission Details</h3>

          <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
            ${responseSummary}
          </table>

          <div style="margin-top: 24px; padding: 16px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
            <strong>Onboarding checklist:</strong>
            <ol style="margin: 8px 0 0 0; padding-left: 20px;">
              <li>Verify the requester's affiliation</li>
              <li>Send the Getting Started guide</li>
              <li>Add user to the ${CONFIG.allocationName} allocation on TACC</li>
              <li>Confirm the user can log in</li>
            </ol>
          </div>
        </div>

        <div style="padding: 12px 20px; background-color: #f8f9fa; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
          This is an automated notification from the ${CONFIG.allocationName} Access Request Form.
        </div>
      </div>
    `;

    const plainBody = `New ${CONFIG.allocationName} HPC Access Request\n\n` +
      `Submitted: ${formattedDate}\n` +
      `Name: ${submitterName}\n` +
      `Email: ${submitterEmail}\n\n` +
      `Action needed: Onboard this user to ${CONFIG.taccSystem}.\n\n` +
      `View full details in the form responses spreadsheet.`;

    // Send the email
    GmailApp.sendEmail(CONFIG.recipientEmail, subject, plainBody, {
      htmlBody: htmlBody,
      name: `${CONFIG.allocationName} Access Bot`,
    });

    Logger.log(`Notification sent for submission by ${submitterName}`);

  } catch (error) {
    // If something goes wrong, send a simpler fallback email
    GmailApp.sendEmail(
      CONFIG.recipientEmail,
      `[${CONFIG.allocationName}] New Form Submission (check responses)`,
      `A new access request was submitted but the notification script encountered an error.\n\n` +
      `Please check your form responses directly.\n\nError: ${error.message}`
    );
    Logger.log(`Error in onFormSubmit: ${error.message}`);
  }
}

// ============================================================
// TEST FUNCTION — Use to verify email delivery
// ============================================================
function sendTestEmail() {
  GmailApp.sendEmail(
    CONFIG.recipientEmail,
    `[${CONFIG.allocationName}] Test Notification`,
    `This is a test email from your MSCF Access Request form script. If you received this, the script is configured correctly!`,
    {
      name: `${CONFIG.allocationName} Access Bot`,
    }
  );
  Logger.log("Test email sent to " + CONFIG.recipientEmail);
}
