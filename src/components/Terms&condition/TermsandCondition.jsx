import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1>Terms and Conditions</h1>
      </div>
      
      <div className="terms-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to CodeHub. By using our platform, you agree to the terms and
            conditions outlined below. Please read them carefully.
          </p>
        </section>

        <section>
          <h2>2. Acceptance of Terms</h2>
          <p>
            By accessing or using CodeHub, you agree to abide by these terms. If
            you do not agree with any part of these terms, you must not use our
            platform.
          </p>
        </section>

        <section>
          <h2>3. User Responsibilities</h2>
          <p>
            You are responsible for all activities occurring under your account.
            You agree to use CodeHub in compliance with all applicable laws.
          </p>
        </section>

        <section>
          <h2>4. Privacy Policy</h2>
          <p>
            We value your privacy. Please refer to our Privacy Policy for details
            on how we handle your personal information.
          </p>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>
            CodeHub is not liable for any damages, losses, or other consequences
            resulting from your use of our services.
          </p>
        </section>

        <section>
          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify or update these terms at any time. We
            will notify users of significant changes.
          </p>
        </section>

        <section>
          <h2>7. Contact Information</h2>
          <p>
            If you have any questions about these terms, please contact us at
            support@codehub.com.
          </p>
        </section>
      </div>

      <div className="terms-footer">
        <p>© 2025 CodeHub.com All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;

