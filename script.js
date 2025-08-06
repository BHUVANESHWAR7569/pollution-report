// Initialize EmailJS
emailjs.init("i9cCFwggpMM-VLMKW"); // Replace with your actual public key

// Email Service Class
class EmailService {
    constructor() {
        this.serviceID = 'service_eywet1s'; // Replace with your actual service ID
        this.templateID = 'template_hbekyv9'; // Replace with your actual template ID
        this.replyTemplateID = 'template_9ewozzh'; // Replace with your reply template ID
    }

    async sendReport(formData) {
        const templateParams = {
            location: formData.location,
            pollutionType: formData.pollutionType,
            description: formData.description,
            mobile: formData.mobile,
            email: formData.email,
            timestamp: new Date().toLocaleString()
        };

        try {
            const response = await emailjs.send(this.serviceID, this.templateID, templateParams);
            console.log('Email sent successfully:', response);
            // Send reply email
            await this.sendReplyEmail(formData);
            return { success: true };
        } catch (error) {
            console.error('EmailJS error:', error);
            return { success: false, error };
        }
    }

    async sendReplyEmail(formData) {
    const replyParams = {
        location: formData.location,
        pollutionType: formData.pollutionType,
        description: formData.description,
        mobile: formData.mobile,
        email: formData.email // This should be the user's email
    };

    try {
        const response = await emailjs.send(this.serviceID, this.replyTemplateID, replyParams);
        console.log('Reply email sent successfully:', response);
    } catch (error) {
        console.error('Error sending reply email:', error);
    }
}

}

// Form Submission Handling
document.getElementById('pollutionForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        location: document.getElementById('location').value,
        pollutionType: document.getElementById('pollutionType').value,
        description: document.getElementById('description').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value
    };

    const emailService = new EmailService();
    const result = await emailService.sendReport(formData);

    if (result.success) {
        alert("Report sent successfully!");
    } else {
        alert("Failed to send report: " + result.error);
    }
});
