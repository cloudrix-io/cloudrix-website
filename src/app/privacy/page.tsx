import { Metadata } from "next";
import { Section, Container } from "@/components/ui";
import { companyInfo } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Cloudrix - how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 2026";

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

          <h2>8. Cookies and Analytics</h2>
          <h3>8.1 Google Analytics (GA4)</h3>
          <p>
            We use Google Analytics 4 (measurement ID: G-3WL9275XNR) to
            understand how visitors interact with our website. Google Analytics
            uses cookies to collect information such as:
          </p>
          <ul>
            <li>Pages visited and time spent on each page</li>
            <li>Traffic sources and referral information</li>
            <li>Device type, browser, and operating system</li>
            <li>Approximate geographic location (country/city level)</li>
            <li>User interactions and engagement events</li>
          </ul>
          <p>
            Google Analytics data is processed by Google LLC. For more
            information, see{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s Privacy Policy
            </a>
            . You can opt out of Google Analytics by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <h3>8.2 Vercel Analytics</h3>
          <p>
            We use Vercel Analytics to monitor website performance and
            understand usage patterns. Vercel Analytics collects anonymized
            data about page views and web vitals (such as page load speed and
            interactivity metrics). This data is processed by Vercel Inc. and
            is used solely to improve the performance and reliability of our
            website.
          </p>

          <h3>8.3 Cookies We Use</h3>
          <p>Our website uses the following types of cookies:</p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Required for basic website
              functionality (e.g., session management). These cannot be
              disabled.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Set by Google Analytics
              (e.g., <code>_ga</code>, <code>_ga_*</code>) to distinguish
              unique users and track sessions. These cookies expire after up
              to 2 years.
            </li>
          </ul>
          <p>
            We do not use third-party advertising or tracking cookies. You can
            manage or delete cookies through your browser settings at any
            time.
          </p>

          <h2>9. AI Services and Data Handling</h2>
          <h3>9.1 AI-Powered Services</h3>
          <p>
            {companyInfo.name} offers AI-powered services and tools. When you
            use our AI services, we may process data you provide as input
            (such as text, code, or documents) to generate outputs. We handle
            this data as follows:
          </p>
          <ul>
            <li>
              Input data is processed solely to provide the requested AI
              service output.
            </li>
            <li>
              We do not use your input data to train or improve our AI models
              unless you explicitly consent to this.
            </li>
            <li>
              AI outputs are generated automatically and may be stored
              temporarily for delivery purposes.
            </li>
            <li>
              We may use third-party AI providers (such as OpenAI or
              Anthropic) to process data. These providers are bound by data
              processing agreements that ensure your data is protected.
            </li>
          </ul>

          <h3>9.2 EU AI Act Compliance</h3>
          <p>
            {companyInfo.name} is committed to compliance with the European
            Union Artificial Intelligence Act (EU AI Act, Regulation (EU)
            2024/1689). We take the following measures:
          </p>
          <ul>
            <li>
              We classify our AI systems according to the risk categories
              defined by the EU AI Act and apply appropriate safeguards.
            </li>
            <li>
              We maintain transparency about the use of AI in our services
              and clearly disclose when content or outputs are AI-generated.
            </li>
            <li>
              We conduct regular assessments of our AI systems to identify
              and mitigate potential risks, including bias and
              discrimination.
            </li>
            <li>
              We ensure human oversight is maintained for AI systems where
              required by the regulation.
            </li>
            <li>
              We keep records of our AI systems and their usage as required
              by the Act.
            </li>
          </ul>

          <h2>10. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures
            to protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the Internet is 100% secure.
          </p>

          <h2>11. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other
            than your country of residence. We ensure appropriate safeguards are in
            place to protect your data in accordance with applicable data protection
            laws.
          </p>

          <h2>12. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 16. We do
            not knowingly collect personal information from children.
          </p>

          <h2>13. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you
            of any changes by posting the new Privacy Policy on this page and
            updating the &quot;Last updated&quot; date.
          </p>

          <h2>14. Contact Us</h2>
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
