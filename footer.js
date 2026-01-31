class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        
        // Get CONFIG from window
        const CONFIG = window.CONFIG || {
            BUSINESS_NAME: "TradeMaster Pro",
            BUSINESS_PHONE: "+1234567890",
            BUSINESS_EMAIL: "info@trademasterpro.local",
            SERVICE_AREA: "Springfield and surrounding areas"
        };

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                .footer {
                    background-color: #111827;
                    color: #d1d5db;
                    padding: 3rem 1rem;
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 3rem;
                }
                
                @media (min-width: 768px) {
                    .footer-content {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                
                .footer-section {
                    display: flex;
                    flex-direction: column;
                }
                
                .footer-title {
                    color: white;
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .footer-link {
                    color: #9ca3af;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: color 0.2s ease;
                }
                
                .footer-link:hover {
                    color: white;
                }
                
                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #9ca3af;
                }
                
                .contact-icon {
                    color: #2563eb;
                    flex-shrink: 0;
                }
                
                .copyright {
                    margin-top: 3rem;
                    padding-top: 2rem;
                    border-top: 1px solid #374151;
                    text-align: center;
                    color: #9ca3af;
                    font-size: 0.875rem;
                }
                
                .business-hours {
                    color: #9ca3af;
                    line-height: 1.6;
                }
                
                .hours-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                
                .hour-item {
                    display: flex;
                    justify-content: space-between;
                }
                
                .emergency {
                    color: #ef4444;
                    font-weight: 600;
                }
            </style>
            
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3 class="footer-title">
                                <i data-feather="tool" class="w-5 h-5"></i>
                                ${CONFIG.BUSINESS_NAME}
                            </h3>
                            <p class="business-hours">
                                Professional local service for ${CONFIG.SERVICE_AREA}. 
                                Quality workmanship and reliable service guaranteed.
                            </p>
                        </div>
                        
                        <div class="footer-section">
                            <h3 class="footer-title">
                                <i data-feather="clock" class="w-5 h-5"></i>
                                Service Hours
                            </h3>
                            <div class="hours-list">
                                <div class="hour-item">
                                    <span>Monday - Friday</span>
                                    <span>7:00 AM - 7:00 PM</span>
                                </div>
                                <div class="hour-item">
                                    <span>Saturday</span>
                                    <span>8:00 AM - 5:00 PM</span>
                                </div>
                                <div class="hour-item">
                                    <span>Sunday</span>
                                    <span>Emergency Only</span>
                                </div>
                                <div class="hour-item emergency">
                                    <span>24/7 Emergency</span>
                                    <span>Available</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="footer-section">
                            <h3 class="footer-title">
                                <i data-feather="phone" class="w-5 h-5"></i>
                                Contact Us
                            </h3>
                            <div class="contact-info">
                                <a href="tel:${CONFIG.BUSINESS_PHONE}" class="contact-item">
                                    <i data-feather="phone" class="contact-icon w-4 h-4"></i>
                                    <span>${CONFIG.BUSINESS_PHONE}</span>
                                </a>
                                <a href="mailto:${CONFIG.BUSINESS_EMAIL}" class="contact-item">
                                    <i data-feather="mail" class="contact-icon w-4 h-4"></i>
                                    <span>${CONFIG.BUSINESS_EMAIL}</span>
                                </a>
                                <div class="contact-item">
                                    <i data-feather="map-pin" class="contact-icon w-4 h-4"></i>
                                    <span>${CONFIG.SERVICE_AREA}</span>
                                </div>
                            </div>
                            <div class="footer-links" style="margin-top: 1.5rem;">
                                <a href="#contact-form" class="footer-link">
                                    <i data-feather="message-square" class="w-4 h-4"></i>
                                    Request a Quote
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="copyright">
                        <p>&copy; ${new Date().getFullYear()} ${CONFIG.BUSINESS_NAME}. All rights reserved.</p>
                        <p style="margin-top: 0.5rem;">Licensed, Bonded & Insured | Master Template v1.0</p>
                    </div>
                </div>
            </footer>
        `;

        // Initialize feather icons in shadow DOM
        setTimeout(() => {
            feather.replace();
        }, 100);
    }
}

customElements.define('custom-footer', CustomFooter);