import LegalPageLayout, { LegalSection } from "../components/LegalPageLayout";
import { CONTACT } from "../constants/contact";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p style={{ marginBottom: "24px" }}>
        Last updated: August 2026. Unique Healthcare (&quot;we&quot;, &quot;us&quot;) respects your privacy.
        This policy explains how we collect, use, and protect your information when you use our website and services.
      </p>

      <LegalSection heading="Information We Collect">
        <p>We may collect:</p>
        <ul>
          <li>Name, email, phone number, and delivery address when you register or place an order</li>
          <li>Payment-related information processed securely through our payment partner (Chapa)</li>
          <li>Messages you send via our contact form</li>
          <li>Email address if you subscribe to our newsletter</li>
          <li>Basic usage data such as pages visited and device type</li>
        </ul>
      </LegalSection>

      <LegalSection heading="How We Use Your Information">
        <p>We use your information to:</p>
        <ul>
          <li>Process orders and deliver products</li>
          <li>Send order updates and respond to inquiries</li>
          <li>Provide customer support and after-sales service</li>
          <li>Send newsletter updates if you subscribed</li>
          <li>Improve our website and services</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Data Sharing">
        <p>
          We do not sell your personal data. We may share information only with trusted service providers
          (payment processing, email delivery, hosting) as needed to operate our business, or when required by law.
        </p>
      </LegalSection>

      <LegalSection heading="Data Security">
        <p>
          We use industry-standard measures to protect your data, including encrypted connections and secure
          password storage. No method of transmission over the internet is 100% secure, but we work to protect
          your information responsibly.
        </p>
      </LegalSection>

      <LegalSection heading="Your Rights">
        <p>
          You may request access, correction, or deletion of your personal data by contacting us at{" "}
          <a href={`mailto:${CONTACT.email}`} style={{ color: "#2563eb" }}>{CONTACT.email}</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Us">
        <p>
          For privacy-related questions, contact Unique Healthcare at {CONTACT.email} or {CONTACT.address.short}.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
