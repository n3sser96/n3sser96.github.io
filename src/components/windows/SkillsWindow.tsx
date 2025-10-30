import { Code2, Server, Database, Cloud } from "lucide-react";

const skills = {
  languages: ["GoLang", "Python", "JavaScript/TypeScript", "Rust", "PHP", "C#"],
  technologies: ["Docker", "Kubernetes", "Kafka", "ELK", "Qdrant", "Postgres", "Temporal", "Airflow"],
  categories: [
    {
      title: "Backend Development",
      icon: Server,
      items: ["GoLang", "Python", "Microservices", "REST APIs", "GraphQL"],
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      items: ["Docker", "Kubernetes", "AWS", "OCI", "GitHub Actions", "CI/CD"],
    },
    {
      title: "Databases & Data",
      icon: Database,
      items: ["PostgreSQL", "Qdrant", "Vector DBs", "ELK Stack", "Apache Kafka"],
    },
    {
      title: "Frontend",
      icon: Code2,
      items: ["React", "TypeScript", "Svelte", "JavaScript", "Modern UI/UX"],
    },
  ],
};

const SkillsWindow = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-3">
        <Code2 className="w-8 h-8 text-ubuntu-orange" />
        <h1 className="text-3xl font-ubuntu font-bold">Skills & Technologies</h1>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-ubuntu font-bold mb-3 text-ubuntu-orange">Programming Languages</h2>
          <div className="flex flex-wrap gap-2">
            {skills.languages.map((lang) => (
              <span
                key={lang}
                className="px-4 py-2 bg-ubuntu-orange/20 border border-ubuntu-orange rounded-lg text-sm font-medium hover:bg-ubuntu-orange/30 transition-colors"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-ubuntu font-bold mb-3 text-ubuntu-orange">Technologies & Tools</h2>
          <div className="flex flex-wrap gap-2">
            {skills.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-ubuntu-purple/30 border border-ubuntu-purple rounded-lg text-sm font-medium hover:bg-ubuntu-purple/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {skills.categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="p-6 bg-gradient-to-br from-window-bg to-muted rounded-xl border border-window-border hover:border-ubuntu-orange transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-6 h-6 text-ubuntu-orange" />
                <h3 className="text-lg font-ubuntu font-bold">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ubuntu-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsWindow;
