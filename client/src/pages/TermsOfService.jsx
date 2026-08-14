import LegalPageLayout, { LegalSection } from "../components/LegalPageLayout";
import { CONTACT } from "../constants/contact";

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service">
      <p style={{ marginBottom: "24px" }}>
        Last updated: August 2026. By using the Unique Healthcare website and purchasing our products,
        you agree to these Terms of Service.
      </p>

      <LegalSection heading="Use of Our Website">
        <p>
          You must provide accurate information when registering, ordering, or contacting us.
          You may not misuse the website, attempt unauthorized access, or use it for unlawful purposes.
        </p>
      </LegalSection>

      <LegalSection heading="Products & Pricing">
        <p>
          We strive to display accurate product descriptions, images, and prices. Prices are listed in
          Ethiopian Birr (ETB) unless stated otherwise. We reserve the right to correct errors and update
          prices or availability without prior notice.
        </p>
      </LegalSection>

      <LegalSection heading="Orders & Payment">
        <p>
          Placing an order constitutes an offer to purchase. We confirm orders after successful payment
          through our authorized payment gateway. We may cancel orders in cases of pricing errors,
          stock unavailability, or suspected fraud.
        </p>
      </LegalSection>

      <LegalSection heading="Delivery">
        <p>
          Delivery times and costs depend on your location and order size. Risk of loss passes to you
          upon delivery to the address you provide. Please inspect items upon receipt and report issues promptly.
        </p>
      </LegalSection>

      <LegalSection heading="Warranty">
        <p>
          Products are covered by manufacturer warranty where applicable. Additional installation,
          training, and maintenance services may be offered separately as described on our Services page.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of Liability">
        <p>
          Unique Healthcare is not liable for indirect or consequential damages arising from use of our
          website or products beyond the extent permitted by applicable law. Medical equipment must be
          used by qualified personnel in accordance with manufacturer guidelines.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to Terms">
        <p>
          We may update these terms from time to time. Continued use of the website after changes
          constitutes acceptance of the updated terms.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${CONTACT.email}`} style={{ color: "#2563eb" }}>{CONTACT.email}</a>
          {" · "}{CONTACT.phones[0].display}
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
