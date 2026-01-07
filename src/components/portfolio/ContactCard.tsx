import { Mail, Linkedin, Github, ArrowUpRight, Code2 } from "lucide-react";

const contacts = [
  {
    label: "Email",
    href: "mailto:hdubey_be22@thapar.edu",
    icon: Mail,
    iconColor: "text-red-500",
    hoverBg: "hover:bg-red-50 dark:hover:bg-red-950/30",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/frizzyfreak",
    icon: Linkedin,
    iconColor: "text-[#0A66C2]",
    hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-950/30",
  },
  {
    label: "GitHub",
    href: "https://www.github.com/frizzyfreak",
    icon: Github,
    iconColor: "text-black dark:text-white",
    hoverBg: "hover:bg-gray-100 dark:hover:bg-gray-800/50",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/Frizzyfreak/",
    icon: Code2,
    iconColor: "text-[#FFA116]",
    hoverBg: "hover:bg-amber-50 dark:hover:bg-amber-950/30",
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
            className={`group flex items-center justify-between p-2 rounded-lg bg-muted/50 ${contact.hoverBg} transition-all duration-200`}
          >
            <div className="flex items-center gap-2">
              <contact.icon className={`w-3 h-3 ${contact.iconColor} transition-colors`} />
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
