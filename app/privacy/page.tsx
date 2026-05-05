import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <p style={{ fontSize: "13px", color: "#6B6B6B", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Last updated: May 2026</p>
        <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#00215e", fontFamily: "var(--font-display)", letterSpacing: "-1px", marginBottom: "8px" }}>Privacy Policy</h1>
        <p style={{ fontSize: "15px", color: "#6B6B6B", fontFamily: "var(--font-sans)", lineHeight: "1.7", marginBottom: "48px" }}>This Privacy Policy sets out how SPONSTUDIO, operated by CENTENNIAL BEAUTY PTY LTD ACN 54 657 154 213, manages personal information in accordance with the Australian Privacy Principles in the Privacy Act 1988 (Cth). In this Privacy Policy, "we", "us", and "our" refer to SPONSTUDIO and CENTENNIAL BEAUTY PTY LTD, and "you" refers to any individual about whom we collect personal information.</p>

        {[
          {
            title: "Definitions",
            body: `Personal Information means information or an opinion about an identified individual, or an individual who is reasonably identifiable, whether recorded in a material form or not, and whether true or not, as defined in the Privacy Act.

Sensitive Information means information or an opinion about an individual's racial or ethnic origin, political opinions, membership of a political, professional or trade association, religious beliefs, sexual orientation or practices, criminal record, health information, genetic or biometric information.

Privacy Officer means the designated individual responsible for managing and overseeing privacy compliance for SPONSTUDIO and CENTENNIAL BEAUTY PTY LTD.

APP Entity means an entity required to comply with the Australian Privacy Principles under the Privacy Act.

Automated Decision Making means any process or system which makes decisions about individuals solely by automated means, including profiling and matching.`
          },
          {
            title: "About SponStudio",
            body: "SPONSTUDIO is a podcast advertising marketplace operated by CENTENNIAL BEAUTY PTY LTD ACN 54 657 154 213. SPONSTUDIO provides a platform that connects independent podcasters with brands and advertisers. We are committed to protecting and managing personal information responsibly and transparently."
          },
          {
            title: "What information do we collect",
            body: `3.1 Personal information is collected from users, podcasters, brands, service providers, contractors, and others who interact with the platform. The types of personal information collected include:

Podcasters and Brands: Name, contact details (email address and telephone number), company or organisation identifiers (ABN, ACN, or business registration), professional background, podcast details, audience statistics, billing and payment information, feedback and any other information provided to us.

Website Visitors: Information about your device (IP address, browser type, operating system), usage data and browsing behaviour collected via cookies and similar technologies, enquiry details, aggregated analytics, and information provided through forms or correspondence.

Service Providers, Contractors and Other Individuals: Name, contact details, professional details, transaction records, and information about our interactions.

3.2 Sensitive Information may be collected only with consent or when required or permitted by law.

3.3 If participating in campaigns, events or promotions where children's information is collected, we may seek parental or guardian consent in accordance with the Privacy Act and include additional safeguards as required by law.`
          },
          {
            title: "How do we collect information",
            body: `4.1 We collect personal information directly from you when you:
— register an account;
— submit a podcast or brand listing;
— contact us via email, phone, online forms or other communication channels;
— respond to surveys, provide feedback, participate in promotions or events.

4.2 We may also obtain information from third parties such as partners, affiliates, service providers, analytics, or social media platforms, where you have authorised such disclosure or as permitted by law.

4.3 Information may be collected using cookies and automated technologies (see Section 7).`
          },
          {
            title: "Why do we collect and use your information",
            body: `5.1 Personal information is collected and used for the purposes of:
— providing, operating and improving the SPONSTUDIO platform and related services;
— managing accounts, verifying identity, eligibility, and processing applications;
— conducting analytics, market research, performance measurement and aggregated reporting;
— communicating with you regarding your account or our services, including notifications about relevant platform updates and policy changes;
— administering promotions, events, and campaigns;
— managing billing, payments and contractual relationships;
— fulfilling legal, regulatory or compliance obligations;
— internal management, planning, quality assurance and risk management;
— with your consent, marketing activities to inform you about products, services, opportunities, or events that may be of interest.

5.2 You can opt out of receiving direct marketing communications at any time by notifying us at hello@sponstudio.com.`
          },
          {
            title: "How do we hold and secure your information",
            body: `6.1 Personal information is stored securely in electronic databases and, where necessary, in paper-based files. Electronic data is maintained on servers located in Australia or in trusted third-party storage providers in jurisdictions including the United States of America and the United Kingdom.

6.2 We implement physical and technical safeguards, including:
— password and access controls;
— encryption, firewalls, and network security measures including Transport Layer Security (TLS);
— restricted access for authorised personnel only;
— physical security for paper records;
— regular security audits and disaster recovery protocols.

6.3 Third-party storage providers are contractually required to maintain equivalent privacy and security standards consistent with APP 11.`
          },
          {
            title: "Cookies and tracking technologies",
            body: `7.1 Our websites use cookies and similar tracking technologies to enhance user experience, manage customised settings, deliver content, and perform analytics.

7.2 Types of cookies used include:
— Strictly necessary cookies: essential for website operation and access to secure areas;
— Analytical cookies: anonymous information about browsing behaviour used to improve website functionality;
— Functionality cookies: recognise users and remember preferences such as language and region;
— Targeting cookies: record browsing history to provide more relevant content and advertising;
— Third-party cookies: set by social media platforms and analytics providers.

7.3 Information collected via cookies may include device information, IP address, browser type and pages visited. If combined, such information may reasonably identify an individual and be treated as personal information.

7.4 You can control cookies via your browser settings. Disabling certain cookies may affect your ability to access or use portions of our website. For guidance, contact us at hello@sponstudio.com.`
          },
          {
            title: "Data sharing and disclosure",
            body: `8.1 We may disclose personal information to:
— service providers, contractors, affiliates and IT personnel engaged to support platform operations or deliver services;
— payment processors, analytics providers and marketing partners;
— related entities of CENTENNIAL BEAUTY PTY LTD;
— venues, sponsors, clients, or collaborators in campaigns and events;
— government agencies, regulatory authorities, or law enforcement as required by law;
— third parties necessary for managing legal claims, enforcing agreements or fulfilling regulatory obligations.

8.2 International Disclosure: Personal information may be disclosed to overseas recipients in jurisdictions including the United States of America and the United Kingdom. We will only disclose information overseas when:
— you have expressly consented to such disclosure;
— it is required or permitted by the Privacy Act;
— we have taken reasonable steps to ensure the overseas recipient provides privacy protections comparable to those required under the Privacy Act and, where applicable, under the GDPR.

8.3 Third-party contracts are vetted to ensure compliance with the APPs and relevant privacy legislation.`
          },
          {
            title: "Automated decision making",
            body: `9.1 Automated decision-making, including profiling or algorithmic matching for podcast-advertiser connections, may be used in the delivery of services.

9.2 No solely automated decisions that have legal or similarly significant effects are made unless permitted by law or with your explicit consent.

9.3 You may request information regarding the logic and consequences of automated decisions affecting you, and raise objections or request human review by contacting the Privacy Officer.`
          },
          {
            title: "Child privacy and parental consent",
            body: `10.1 Where personal information concerns children, we require verifiable parental or guardian consent prior to collection.

10.2 Additional safeguards are adopted when processing children's information in connection with campaigns, events or platform activities.

10.3 Please contact us if you believe we have collected personal information about a child without appropriate consent.`
          },
          {
            title: "Data retention and destruction",
            body: `11.1 Personal information is retained only for as long as necessary to fulfil the purposes stated in this Policy or as required by law or contractual obligations.

11.2 When personal information is no longer required, we take reasonable steps to securely destroy or de-identify it, including secure digital deletion and shredding of paper files.`
          },
          {
            title: "User rights and access",
            body: `12.1 You have the right to:
— request access to your personal information held by us;
— request correction of any information that is inaccurate, out-of-date, incomplete or misleading;
— request to opt out of direct marketing communications;
— make a complaint about our handling of your personal information.

12.2 All requests should be made to the Privacy Officer at hello@sponstudio.com. Requests will be handled in accordance with the Privacy Act and, where applicable, the GDPR. We may charge a reasonable fee for access where permitted by law.`
          },
          {
            title: "Complaints",
            body: `13.1 If you have complaints or concerns about this Privacy Policy or our handling of your personal information, contact the Privacy Officer at hello@sponstudio.com.

13.2 We will acknowledge complaints within seven (7) days and endeavour to respond or resolve within thirty (30) days. If dissatisfied, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC):
— Phone: 1300 363 992
— Website: https://www.oaic.gov.au/`
          },
          {
            title: "Policy changes and notifications",
            body: `14.1 This Privacy Policy may be amended from time to time to reflect changes in operations or legal requirements. Any amended policy will be published on our website and will take effect from the date of publication.

14.2 Where required by law or significant changes are made, direct notification will be provided to users by email or platform notification.`
          },
          {
            title: "GDPR compliance",
            body: `15.1 If you are a resident of the European Union, your rights under the GDPR include: right to access, rectification, erasure, restriction, portability, and objection to processing.

15.2 Our lawful basis for processing your data includes consent, performance of contract, legal obligations, and legitimate interests as permitted under Article 6 of the GDPR.

15.3 You have the right to lodge a complaint with your local Data Protection Authority. For details on cross-border transfers under GDPR, contact our Privacy Officer at hello@sponstudio.com.`
          },
          {
            title: "Contact information",
            body: `If you have any questions, requests, or complaints regarding this Privacy Policy or our privacy practices, please contact:

SPONSTUDIO Privacy Officer
CENTENNIAL BEAUTY PTY LTD
Email: hello@sponstudio.com
Telephone: 0468 472 514`
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "36px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#00215e", fontFamily: "var(--font-display)", marginBottom: "12px" }}>{section.title}</h2>
            <p style={{ fontSize: "15px", color: "#4A4A4A", fontFamily: "var(--font-sans)", lineHeight: "1.8", whiteSpace: "pre-line" }}>{section.body}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
