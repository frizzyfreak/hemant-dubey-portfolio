import { Mail, Linkedin, Github, ArrowUpRight, Code2 } from "lucide-react";

const contacts = [
  {
    label: "Email",
    href: "mailto:hdubey_be22@thapar.edu",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/frizzyfreak",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://www.github.com/frizzyfreak",
    icon: Github,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/Frizzyfreak/",
    icon: Code2,
  },
];

const ContactCard = () => {
  return (
    <div className="bento-card animate-fade-up" style={{ animationDelay: "500ms" }}>
      <h2 className="text-xl font-semibold mb-4 text-foreground">Get In Touch</h2>
      <div className="flex flex-col gap-2">
        {contacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <contact.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm font-medium text-foreground">{contact.label}</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactCard;
