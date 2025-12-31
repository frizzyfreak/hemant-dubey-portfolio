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
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Get In Touch</h2>
      <div className="border-t border-border mb-2" />
      <div className="flex flex-col gap-1">
        {contacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <contact.icon className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-xs font-medium text-foreground">{contact.label}</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactCard;
