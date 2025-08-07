// script.js

// Initialize EmailJS with your public key
emailjs.init("i9cCFwggpMM-VLMKW");

// Add event listener to the form submission
document.getElementById('pollutionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        location: document.getElementById('location').value,
        issueType: document.getElementById('issueType').value,
        description: document.getElementById('description').value
    };

    const emailService = new EmailService();
    const result = await emailService.sendReport(formData);

    if (result.success) {
        alert("Report sent successfully!");
        document.getElementById('pollutionForm').reset();
    } else {
        alert("Failed to send report: " + result.error);
    }
});

class EmailService {
    constructor() {
        this.serviceID = 'service_eywet1s';
        this.templateID = 'template_hbekyv9';
        this.replyTemplateID = 'template_9ewozzh';
    }

    async sendReport(formData) {
        const templateParams = {
            location: formData.location,
            pollutionType: formData.issueType,
            description: formData.description,
            mobile: formData.mobile,
            email: formData.email,
            timestamp: new Date().toLocaleString()
        };

        try {
            const response = await emailjs.send(this.serviceID, this.templateID, templateParams);
            console.log('Email sent successfully:', response);
            await this.sendReplyEmail(formData);
            return { success: true };
        } catch (error) {
            console.error('EmailJS error:', error);
            return { success: false, error: error.message };
        }
    }

    async sendReplyEmail(formData) {
        const replyParams = {
            location: formData.location,
            pollutionType: formData.issueType,
            description: formData.description,
            mobile: formData.mobile,
            email: formData.email
        };

        try {
            const response = await emailjs.send(this.serviceID, this.replyTemplateID, replyParams);
            console.log('Reply email sent successfully:', response);
        } catch (error) {
            console.error('Error sending reply email:', error);
        }
    }
}

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
