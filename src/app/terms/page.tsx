import { Metadata } from "next";
import { Section, Container } from "@/components/ui";
import { companyInfo } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Cloudrix - the terms and conditions for using our services.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "July 2026";

  return (
    <Section variant="default" className="pt-32">
      <Container size="md">
        <h1 className="text-4xl font-bold text-slate-900">Terms of Service</h1>
        <p className="mt-2 text-slate-500">Last updated: {lastUpdated}</p>

        <div className="prose prose-slate mt-12 max-w-none">
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement
            between you and {companyInfo.name} (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            concerning your access to and use of our website and services.
          </p>
          <p>
            By accessing our website or using our services, you agree to be bound
            by these Terms. If you disagree with any part of these Terms, you may
            not access our website or use our services.
          </p>

          <h2>2. Services</h2>
          <p>
            {companyInfo.name} provides software engineering, consulting, and
            related technology services. The specific scope, deliverables, and
            terms of any project will be defined in a separate agreement or
            statement of work.
          </p>

          <h2>3. Use of Website</h2>
          <h3>3.1 Permitted Use</h3>
          <p>You may use our website for lawful purposes only. You agree not to:</p>
          <ul>
            <li>Use our website in any way that violates applicable laws</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Transmit any malicious code or harmful data</li>
            <li>Interfere with the proper functioning of our website</li>
            <li>Scrape or collect data without permission</li>
          </ul>

          <h3>3.2 Account Information</h3>
          <p>
            If you submit information through our contact form or other means, you
            are responsible for ensuring that all information provided is accurate
            and up to date.
          </p>

          <h2>4. Intellectual Property</h2>
          <h3>4.1 Our Content</h3>
          <p>
            All content on our website, including text, graphics, logos, images,
            and software, is the property of {companyInfo.name} or our licensors
            and is protected by intellectual property laws.
          </p>

          <h3>4.2 Client Work</h3>
          <p>
            Ownership of work product created for clients will be defined in the
            applicable project agreement. Generally, upon full payment, clients
            receive ownership of custom code and deliverables created specifically
            for their project.
          </p>

          <h2>5. Confidentiality</h2>
          <p>
            We take confidentiality seriously. We are willing to sign non-disclosure
            agreements (NDAs) before discussing sensitive project details. Any
            confidential information shared with us will be protected and used only
            for the purposes for which it was provided.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, {companyInfo.name} shall not be
            liable for any indirect, incidental, special, consequential, or punitive
            damages, or any loss of profits or revenues, whether incurred directly
            or indirectly, or any loss of data, use, goodwill, or other intangible
            losses.
          </p>
          <p>
            Our total liability for any claims arising from or related to these
            Terms or our services shall not exceed the total amount paid to us by
            you in the twelve (12) months preceding the claim.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            Our website and information provided therein are provided &quot;as is&quot; and
            &quot;as available&quot; without warranties of any kind, either express or
            implied. We do not warrant that our website will be uninterrupted,
            error-free, or free of viruses or other harmful components.
          </p>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless {companyInfo.name} and
            its officers, directors, employees, and agents from and against any
            claims, liabilities, damages, losses, and expenses arising from your
            use of our website or violation of these Terms.
          </p>

          <h2>9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or services. We
            are not responsible for the content, privacy policies, or practices of
            third-party sites. Accessing third-party links is at your own risk.
          </p>

          <h2>10. AI Services</h2>
          <h3>10.1 AI-Generated Outputs</h3>
          <p>
            {companyInfo.name} may provide services that incorporate artificial
            intelligence and machine learning technologies. You acknowledge and
            agree that:
          </p>
          <ul>
            <li>
              AI-generated outputs are provided &quot;as is&quot; and may contain
              errors, inaccuracies, or biases. We do not guarantee the
              accuracy, completeness, or reliability of any AI-generated
              content.
            </li>
            <li>
              You are responsible for reviewing, validating, and testing all
              AI-generated outputs before using them in production
              environments or relying on them for business decisions.
            </li>
            <li>
              AI models may produce different results for the same input at
              different times. We do not guarantee consistency or
              reproducibility of AI outputs.
            </li>
            <li>
              We are not liable for any damages, losses, or consequences
              arising from your reliance on AI-generated outputs, including
              but not limited to incorrect code, inaccurate analysis, or
              flawed recommendations.
            </li>
          </ul>

          <h3>10.2 AI Model Limitations</h3>
          <p>
            The AI models used in our services are provided by third-party
            providers and are subject to their own limitations and terms. We
            do not make any representations or warranties regarding the
            underlying AI models, including their training data, biases, or
            capabilities. Model availability and performance may change
            without notice.
          </p>

          <h3>10.3 Your Data and AI</h3>
          <p>
            When you use our AI-powered services, any data you provide as
            input may be processed by third-party AI providers. We ensure
            that appropriate data processing agreements are in place with
            these providers. Please refer to our Privacy Policy for details
            on how your data is handled.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the
            laws of the Netherlands, without regard to its conflict of law
            provisions. For EU clients, mandatory consumer protection laws of
            your country of residence shall also apply where applicable.
          </p>

          <h2>12. Dispute Resolution</h2>
          <p>
            Any disputes arising from these Terms or our services will first be
            attempted to be resolved through good-faith negotiation. If negotiation
            fails, disputes shall be submitted to the competent courts in the
            Netherlands, unless otherwise agreed in writing. EU consumers may
            also use the European Commission&apos;s Online Dispute Resolution
            platform at{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            .
          </p>

          <h2>13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide
            notice of significant changes by posting the updated Terms on our
            website with a new &quot;Last updated&quot; date. Your continued use of our
            website after changes constitutes acceptance of the modified Terms.
          </p>

          <h2>14. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid,
            that provision will be limited or eliminated to the minimum extent
            necessary, and the remaining provisions will remain in full force and
            effect.
          </p>

          <h2>15. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy and any project-specific
            agreements, constitute the entire agreement between you and{" "}
            {companyInfo.name} regarding your use of our website.
          </p>

          <h2>16. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
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
