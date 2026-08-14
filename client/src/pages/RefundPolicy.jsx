import LegalPageLayout, { LegalSection } from "../components/LegalPageLayout";
import { CONTACT } from "../constants/contact";

export default function RefundPolicy() {
  return (
    <LegalPageLayout title="Refund Policy">
      <p style={{ marginBottom: "24px" }}>
        Last updated: August 2026. At Unique Healthcare, we want you to be satisfied with your purchase.
        Please read this refund policy carefully before placing an order.
      </p>

      <LegalSection heading="Eligible Returns">
        <p>Returns may be considered when:</p>
        <ul>
          <li>The product arrived damaged or defective</li>
          <li>You received the wrong item</li>
          <li>The product does not match the description in a material way</li>
        </ul>
        <p>
          You must notify us within <strong>7 days</strong> of delivery with photos and your order number.
        </p>
      </LegalSection>

      <LegalSection heading="Non-Returnable Items">
        <p>The following are generally not eligible for return:</p>
        <ul>
          <li>Opened consumables or sterile disposables</li>
          <li>Custom-ordered or specially procured equipment</li>
          <li>Products that have been installed, used, or modified</li>
          <li>Items returned without original packaging or documentation</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Refund Process">
        <p>
          Contact us at{" "}
          <a href={`mailto:${CONTACT.email}`} style={{ color: "#2563eb" }}>{CONTACT.email}</a>
          {" "}with your order details. After we review your request, we will instruct you on return
          shipping or inspection. Approved refunds are processed to the original payment method within
          <strong> 7–14 business days</strong> after we receive and verify the returned item.
        </p>
      </LegalSection>

      <LegalSection heading="Order Cancellation">
        <p>
          Orders may be cancelled before shipment. If payment was already made, a full refund will be
          issued. Once an order has shipped, our standard return policy applies.
        </p>
      </LegalSection>

      <LegalSection heading="Shipping Costs">
        <p>
          Return shipping costs for eligible defective or incorrect items are covered by Unique Healthcare.
          For other returns not covered by warranty, the customer may be responsible for return shipping.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Us">
        <p>
          Refund inquiries: {CONTACT.email} · {CONTACT.phones.map((p) => p.display).join(" · ")}
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
