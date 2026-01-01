import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInquiryNotification({
  toEmail,
  propertyTitle,
  inquirerName,
  inquirerEmail,
  message,
}: {
  toEmail: string;
  propertyTitle: string;
  inquirerName: string;
  inquirerEmail: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: "Expert Listing <noreply@expertlisting.ng>",
      to: toEmail,
      subject: `New inquiry for ${propertyTitle}`,
      html: `
        <h2>New Property Inquiry</h2>
        <p>You have received a new inquiry for your property: <strong>${propertyTitle}</strong></p>
        <h3>Inquirer Details:</h3>
        <p><strong>Name:</strong> ${inquirerName}</p>
        <p><strong>Email:</strong> ${inquirerEmail}</p>
        <h3>Message:</h3>
        <p>${message}</p>
        <p>Please respond to this inquiry at your earliest convenience.</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send inquiry notification:", error);
  }
}

export async function sendSnaggingConfirmation({
  toEmail,
  fullName,
  packageType,
  address,
  price,
}: {
  toEmail: string;
  fullName: string;
  packageType: string;
  address: string;
  price: number;
}) {
  try {
    await resend.emails.send({
      from: "Expert Listing <noreply@expertlisting.ng>",
      to: toEmail,
      subject: "Snagging Inspection Booking Confirmed",
      html: `
        <h2>Booking Confirmation</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for booking a snagging inspection with Expert Listing.</p>
        <h3>Booking Details:</h3>
        <p><strong>Package:</strong> ${packageType}</p>
        <p><strong>Property Address:</strong> ${address}</p>
        <p><strong>Price:</strong> ₦${price.toLocaleString()}</p>
        <p>Our team will contact you within 24 hours to confirm the inspection date and provide further details.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Expert Listing Team</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send snagging confirmation:", error);
  }
}

export async function sendPropertyApprovalNotification({
  toEmail,
  propertyTitle,
  approved,
  reason,
}: {
  toEmail: string;
  propertyTitle: string;
  approved: boolean;
  reason?: string;
}) {
  try {
    await resend.emails.send({
      from: "Expert Listing <noreply@expertlisting.ng>",
      to: toEmail,
      subject: approved
        ? `Your property listing has been approved`
        : `Your property listing needs revision`,
      html: approved
        ? `
        <h2>Property Listing Approved</h2>
        <p>Great news! Your property listing "<strong>${propertyTitle}</strong>" has been approved and is now live on Expert Listing.</p>
        <p>You can view and manage your listing from your dashboard.</p>
        <p>Best of luck with your property!</p>
      `
        : `
        <h2>Property Listing Needs Revision</h2>
        <p>Your property listing "<strong>${propertyTitle}</strong>" requires some changes before it can be published.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
        <p>Please update your listing and resubmit for review.</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send property approval notification:", error);
  }
}

export async function sendWelcomeEmail({
  toEmail,
  fullName,
}: {
  toEmail: string;
  fullName: string;
}) {
  try {
    await resend.emails.send({
      from: "Expert Listing <noreply@expertlisting.ng>",
      to: toEmail,
      subject: "Welcome to Expert Listing!",
      html: `
        <h2>Welcome to Expert Listing!</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for joining Expert Listing, Nigeria's premier property marketplace.</p>
        <p>Here's what you can do:</p>
        <ul>
          <li>Browse thousands of verified property listings</li>
          <li>List your own properties for sale or rent</li>
          <li>Book professional snagging inspections</li>
          <li>Connect directly with property owners and agents</li>
        </ul>
        <p>Get started by exploring properties or listing your first property!</p>
        <p>Best regards,<br>Expert Listing Team</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

