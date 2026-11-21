import { SiteChrome } from "@/components/site-chrome";
export const metadata = { title: "Contact", description: "Contact Raphael Truffi Bortholuzzi for creative projects and collaborations." };
export default function ContactPage(){return <SiteChrome><main className="portfolio-content text-page contact-page">
  <p className="eyebrow">Contact / Start a conversation</p><h1 className="category-title">Let’s talk.</h1>
  <p className="contact-intro">For project inquiries, collaborations or just to say hello, send a message.</p>
  <form className="contact-form" action="mailto:raphael@bortholuzzi.com" method="post" encType="text/plain">
    <label>Name<input name="Name" type="text" placeholder="Your name" required /></label>
    <label>Email<input name="Email" type="email" placeholder="Your email address" required /></label>
    <label>Message<textarea name="Message" rows={6} placeholder="Tell me about your project" required /></label>
    <button type="submit">Send message ↗</button>
  </form>
  <p className="contact-email">Or email directly: <a href="mailto:raphael@bortholuzzi.com">raphael@bortholuzzi.com</a></p>
</main></SiteChrome>}
