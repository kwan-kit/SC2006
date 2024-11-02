// src/components/Terms.js
import React from 'react';
const Terms = () => {
  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start', // Aligns content to the top
        minHeight: '100vh', // Minimum height to allow scrolling
        backgroundColor: 'black',
        fontSize: '1.2rem',
        color: 'white',
        textAlign: 'left',
        padding: '20px', // Adds padding around the content
        overflowY: 'auto' // Ensures scrolling if content overflows
      }}>
      <div style={{ maxWidth: '800px' }}>
        <h1>Terms and Conditions</h1>
        <p>Welcome to HELTH! These Terms and Conditions ("Terms") govern your use of our fitness application, website, and any related services (collectively, the "Service"). By accessing or using the Service, you agree to comply with these Terms. If you do not agree, please refrain from using the Service.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By registering, accessing, or using the Service, you accept these Terms and confirm that you are at least 18 years old or have the consent of a legal guardian if under 18.</p>

        <h2>2. Privacy Policy</h2>
        <p>Our Privacy Policy explains how we collect, use, and protect your information. By using the Service, you agree to the collection and use of information as described in our Privacy Policy.</p>

        <h2>3. User Accounts</h2>
        <ul>
          <li>You may need to create an account to use certain features of the Service.</li>
          <li>You are responsible for keeping your login credentials secure.</li>
          <li>We reserve the right to suspend or terminate your account if we suspect any unauthorized use.</li>
        </ul>

        <h2>4. Health Disclaimer</h2>
        <p>The Service is intended for general fitness guidance and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before starting any exercise or nutritional program. You assume all risks associated with your use of the Service, including any personal injuries that may result from participating in the activities suggested by the Service.</p>

        <h2>5. Content Ownership and License</h2>
        <p>All content on the Service, including text, images, logos, videos, and software, is owned by or licensed to HELTH and protected by applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to access and use the Service solely for personal, non-commercial purposes.</p>

        <h2>6. User Content</h2>
        <p>By submitting, uploading, or sharing content (e.g., workout logs, photos, comments), you grant HELTH a worldwide, royalty-free, perpetual license to use, reproduce, modify, display, and distribute your content as part of the Service. You represent and warrant that you have the right to share the content and that it does not violate any third-party rights.</p>

        <h2>7. Prohibited Conduct</h2>
        <ul>
          <li>Use the Service for any illegal or unauthorized purpose.</li>
          <li>Share false or misleading information.</li>
          <li>Attempt to interfere with or disrupt the Service or its servers.</li>
          <li>Reproduce, duplicate, or sell any part of the Service without prior consent from HELTH.</li>
        </ul>

        <h2>8. Subscription and Fees</h2>
        <p>Certain features of the Service may require a subscription or payment of fees. All fees and charges are non-refundable, except as expressly provided in these Terms or required by applicable law. HELTH reserves the right to change fees or introduce new charges at any time, with advance notice provided.</p>

        <h2>9. Third-Party Services and Links</h2>
        <p>The Service may contain links to third-party websites or services that are not owned or controlled by HELTH. HELTH does not assume any responsibility for third-party content, privacy policies, or practices and will not be liable for any loss or damage.</p>

        <h2>10. Termination</h2>
        <p>We reserve the right to suspend or terminate your access to the Service at our sole discretion, with or without notice, for any reason, including violation of these Terms. Upon termination, all rights granted to you will cease immediately.</p>

        <h2>11. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, HELTH and its affiliates, officers, directors, and employees will not be liable for any indirect, incidental, special, or consequential damages arising from your use or inability to use the Service. Our liability for any claim arising out of or relating to these Terms or the Service shall not exceed the amount paid by you, if any, to access the Service.</p>

        <h2>12. Indemnification</h2>
        <p>You agree to indemnify, defend, and hold harmless HELTH and its affiliates from and against all claims, liabilities, damages, and expenses (including legal fees) arising out of your use of the Service, violation of these Terms, or infringement of any third-party rights.</p>

        <h2>13. Governing Law</h2>
        <p>These Terms are governed by and construed in accordance with the laws of Singapore. Any dispute arising from these Terms or your use of the Service will be subject to the exclusive jurisdiction of the courts in Singapore.</p>

        <h2>14. Changes to Terms</h2>
        <p>We reserve the right to update these Terms at any time. Any changes will be effective immediately upon posting on the Service. Continued use of the Service after changes are posted constitutes acceptance of the updated Terms.</p>
      </div>
    </div>
  );
};

export default Terms;