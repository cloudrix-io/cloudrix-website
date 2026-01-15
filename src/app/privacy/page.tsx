import { Metadata } from "next";
import { Section, Container } from "@/components/ui";
import { companyInfo } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Cloudrix - how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 2024";

  return (
    <Section variant="default" className="pt-32">
      <Container size="md">
        <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-slate-500">Last updated: {lastUpdated}</p>

        <div className="prose prose-slate mt-12 max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to {companyInfo.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to
            protecting your personal information and your right to privacy. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website or use our services.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Fill out our contact form</li>
            <li>Request a consultation</li>
            <li>Subscribe to our newsletter</li>
            <li>Communicate with us via email</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Company name</li>
            <li>Phone number</li>
            <li>Project details</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information
            about your device, including:
          </p>
          <ul>
            <li>IP address (anonymized)</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Time and date of visit</li>
            <li>Referring website</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send you information about our services</li>
            <li>Improve our website and services</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Legal Basis for Processing (GDPR)</h2>
          <p>
            If you are located in the European Economic Area (EEA), we process your
            personal data under the following legal bases:
          </p>
          <ul>
            <li>
              <strong>Consent:</strong> You have given us consent to process your
              personal data for specific purposes.
            </li>
            <li>
              <strong>Contract:</strong> Processing is necessary for the performance
              of a contract with you.
            </li>
            <li>
              <strong>Legitimate Interest:</strong> Processing is necessary for our
              legitimate business interests, provided these do not override your
              rights.
            </li>
            <li>
              <strong>Legal Obligation:</strong> Processing is necessary for
              compliance with a legal obligation.
            </li>
          </ul>

          <h2>5. Data Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties.
            We may share your information in the following circumstances:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share your information with
              third-party service providers who perform services on our behalf (e.g.,
              email delivery, analytics).
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information
              if required by law or in response to valid legal requests.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of assets, your information may be transferred.
            </li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to
            fulfill the purposes for which it was collected, including to satisfy
            legal, accounting, or reporting requirements. When we no longer need your
            information, we will securely delete or anonymize it.
          </p>

          <h2>7. Your Rights (GDPR)</h2>
          <p>
            If you are located in the EEA, you have the following rights regarding
            your personal data:
          </p>
          <ul>
            <li>
              <strong>Right to Access:</strong> You can request a copy of your
              personal data.
            </li>
            <li>
              <strong>Right to Rectification:</strong> You can request correction of
              inaccurate data.
            </li>
            <li>
              <strong>Right to Erasure:</strong> You can request deletion of your
              personal data.
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> You can request
              restriction of processing.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> You can request transfer
              of your data.
            </li>
            <li>
              <strong>Right to Object:</strong> You can object to processing of your
              personal data.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>.
          </p>

          <h2>8. Cookies</h2>
          <p>
            We use privacy-friendly analytics (Plausible) that do not use cookies
            and do not collect personal data. We do not use tracking cookies or
            third-party advertising cookies.
          </p>

          <h2>9. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures
            to protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the Internet is 100% secure.
          </p>

          <h2>10. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other
            than your country of residence. We ensure appropriate safeguards are in
            place to protect your data in accordance with applicable data protection
            laws.
          </p>

          <h2>11. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 16. We do
            not knowingly collect personal information from children.
          </p>

          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you
            of any changes by posting the new Privacy Policy on this page and
            updating the &quot;Last updated&quot; date.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
          </p>
          <p>
            <strong>{companyInfo.name}</strong>
            <br />
            Email:{" "}
            <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
            <br />
            Location: {companyInfo.location}
          </p>
        </div>
      </Container>
    </Section>
  );
}
