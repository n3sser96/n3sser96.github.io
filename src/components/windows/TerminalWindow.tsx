import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

const commands = {
  help: "Available commands: help, about, skills, experience, contact, clear, neofetch",
  about: "Nasser Al Subhi - Software Development Manager\nEmail: nasser@subhi.tech\nLocation: Muscat, Oman",
  skills: "Languages: GoLang, Python, JavaScript/TypeScript, Rust, PHP, C#\nTech: Docker, Kubernetes, Kafka, ELK, Qdrant, Postgres, Temporal, Airflow",
  experience: "Current: Software Development Manager @ Rihal (Mar 2025 - Present)\nManaging software development lifecycle across multiple teams",
  contact: "Email: nasser@subhi.tech\nPhone: +968 94944011",
  neofetch: `
╔══════════════════════════════════════╗
║   Nasser Al Subhi                   ║
╠══════════════════════════════════════╣
║ OS: Ubuntu 22.04 LTS (Custom)       ║
║ Shell: bash 5.1.16                  ║
║ Role: Software Development Manager   ║
║ Company: Rihal                       ║
║ Experience: 5+ years                 ║
║ Team Size: 25+ engineers             ║
║ Languages: Go, Python, TS, Rust     ║
║ Specialization: Cloud & DevOps      ║
╚══════════════════════════════════════╝
  `,
};

const TerminalWindow = () => {
  const [history, setHistory] = useState<Array<{ type: "input" | "output"; text: string }>>([
    { type: "output", text: "Welcome to Nasser's Interactive Terminal!" },
    { type: "output", text: "Type 'help' for available commands." },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    setHistory((prev) => [...prev, { type: "input", text: `$ ${cmd}` }]);

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (trimmed in commands) {
      setHistory((prev) => [
        ...prev,
        { type: "output", text: commands[trimmed as keyof typeof commands] },
        { type: "output", text: "" },
      ]);
    } else if (trimmed === "") {
      setHistory((prev) => [...prev, { type: "output", text: "" }]);
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "output", text: `Command not found: ${trimmed}. Type 'help' for available commands.` },
        { type: "output", text: "" },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="h-full bg-ubuntu-dark font-mono text-sm p-4">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-ubuntu-orange/30">
        <TerminalIcon className="w-4 h-4 text-ubuntu-orange" />
        <span className="text-ubuntu-orange font-bold">nasser@ubuntu-cv:~$</span>
      </div>

      <div className="space-y-1 mb-4 max-h-[calc(100%-8rem)] overflow-y-auto">
        {history.map((item, index) => (
          <div key={index} className={item.type === "input" ? "text-ubuntu-orange" : "text-ubuntu-light"}>
            <pre className="whitespace-pre-wrap font-mono">{item.text}</pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-ubuntu-orange">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-ubuntu-light"
          placeholder="Type a command..."
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalWindow;
