# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.3.x   | :white_check_mark: |
| < 0.3   | :x:                |

## Reporting a Vulnerability

The @adoptaunabuelo/react-components team takes security issues seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report a Security Issue

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:

**guillermo.angeles@adoptaunabuelo.com**

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include in Your Report

Please include the following information in your report:

- **Type of issue** (e.g., XSS, CSRF, SQL injection, etc.)
- **Full paths of source file(s)** related to the manifestation of the issue
- **The location of the affected source code** (tag/branch/commit or direct URL)
- **Any special configuration** required to reproduce the issue
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the issue**, including how an attacker might exploit it

This information will help us triage your report more quickly.

### What to Expect

After submitting a report, you can expect:

1. **Confirmation** - We'll confirm receipt of your vulnerability report within 48 hours
2. **Assessment** - We'll investigate and determine the severity and impact
3. **Updates** - We'll keep you informed of our progress as we work on a fix
4. **Resolution** - Once the vulnerability is resolved, we'll:
   - Release a patch in a new version
   - Publish a security advisory
   - Credit you for the discovery (unless you prefer to remain anonymous)

### Security Update Process

1. The security issue is received and assigned to a primary handler
2. The problem is confirmed and affected versions are determined
3. Code is audited to find any similar problems
4. Fixes are prepared for all supported releases
5. New versions are released with the security fix
6. Security advisory is published on GitHub

## Preferred Languages

We prefer all communications to be in English or Spanish.

## Policy

We follow the principle of [Responsible Disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure).

### Our Commitment

- We will respond to your report within 48 hours with our evaluation and expected resolution date
- We will keep you informed of the progress towards resolving the issue
- We will credit you for discovering the issue (unless you prefer otherwise)
- We will not take legal action against researchers who:
  - Report vulnerabilities responsibly
  - Avoid privacy violations, data destruction, and service interruption
  - Give us reasonable time to fix issues before public disclosure

## Security Best Practices for Users

When using @adoptaunabuelo/react-components in your application:

1. **Keep Dependencies Updated** - Always use the latest version of the library
2. **Input Validation** - Validate and sanitize all user inputs before passing to components
3. **Content Security Policy** - Implement CSP headers to prevent XSS attacks
4. **API Keys** - Never expose API keys in client-side code (especially for Google Maps, Stripe, etc.)
5. **Authentication** - Implement proper authentication and authorization in your application
6. **HTTPS** - Always use HTTPS in production

## Known Security Considerations

### External Dependencies

This library integrates with external services that require API keys:

- **Google Maps API** (InputLocation component) - Store API keys securely, use API restrictions
- **Stripe** (Payout component) - Use publishable keys only in client-side code
- **Webcam Access** - Always request user permission for camera access

### Component-Specific Notes

- **Input Components**: Always validate and sanitize input data server-side
- **Modal/Dialog Components**: Ensure proper focus management to prevent focus trapping issues
- **File Upload Components**: Validate file types and sizes server-side, scan for malware
- **Rich Text Editor (TextArea with Tiptap)**: Sanitize HTML output to prevent XSS

## Acknowledgments

We would like to thank the following individuals for responsibly disclosing security issues:

<!-- Security researchers will be listed here -->

---

Thank you for helping keep @adoptaunabuelo/react-components and its users safe!
