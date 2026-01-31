// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('lead-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const CONFIG = window.CONFIG || {
        CLIENT_ID: "demo_client"
    };

    // Get CONFIG from window object or use defaults
    const CLIENT_ID = CONFIG.CLIENT_ID;

    // Webhook URL
    const WEBHOOK_URL = 'https://hook.us2.make.com/xfylmsm5av0wletmhw6218949wknfqmg';

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        // Disable submit button and show loading
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

        // Clear previous messages
        formMessage.className = 'hidden';
        formMessage.textContent = '';

        try {
            // Build payload
            const payload = {
                client_id: CLIENT_ID,
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim(),
                source: "website_form",
                page_url: window.location.href,
                timestamp: new Date().toISOString()
            };

            // Try JSON POST first
            let success = await sendRequest(payload, 'json');
            
            // If JSON fails, retry with form-urlencoded
            if (!success) {
                console.log('JSON request failed, retrying with form-urlencoded...');
                success = await sendRequest(payload, 'form');
            }

            if (success) {
                // Show success message
                showMessage('Thanks — we received your request and will follow up soon.', 'success');
                
                // Reset form
                form.reset();
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                throw new Error('Submission failed after retry');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Sorry, there was an error submitting your request. Please try again or call us directly.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            feather.replace(); // Refresh icons
        }
    });

    // Validate form function
    function validateForm() {
        const fields = ['name', 'email', 'phone', 'service', 'message'];
        let isValid = true;

        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.classList.add('border-red-500');
                isValid = false;
            } else {
                field.classList.remove('border-red-500');
            }
        });

        // Email validation
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.classList.add('border-red-500');
            showMessage('Please enter a valid email address.', 'error');
            isValid = false;
        }

        return isValid;
    }

    // Send request function
    async function sendRequest(payload, type) {
        let options = {};

        if (type === 'json') {
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            };
        } else {
            // Form-urlencoded
            const formData = new URLSearchParams();
            Object.keys(payload).forEach(key => {
                formData.append(key, payload[key]);
            });

            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            };
        }

        try {
            const response = await fetch(WEBHOOK_URL, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error(`Request failed (${type}):`, error);
            return false;
        }
    }

    // Show message function
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = type === 'success' ? 
            'message-success p-4 rounded-lg' : 
            'message-error p-4 rounded-lg';
        formMessage.classList.remove('hidden');
    }

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('border-red-500');
            
            // Clear message when user starts typing
            if (formMessage.textContent.includes('Please enter')) {
                formMessage.classList.add('hidden');
            }
        });
    });

    // Initialize form with default values for testing (remove in production)
    if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
        console.log('Development mode detected - form pre-filled for testing');
        document.getElementById('name').value = 'Test User';
        document.getElementById('email').value = 'test@example.com';
        document.getElementById('phone').value = '555-123-4567';
        document.getElementById('service').value = 'Repairs';
        document.getElementById('message').value = 'This is a test submission from development mode.';
    }
});