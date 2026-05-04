import { FolderGit2, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "CSV Engine",
    description: "Web-based application using Svelte and Golang for cleaning up raw data and making it ready for databases.",
    tech: ["Svelte", "GoLang", "Data Processing"],
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    name: "RFP Agent",
    description: "AI-powered agent that understands Request for Proposals (RFPs) and helps draft proposals.",
    tech: ["AI/ML", "NLP", "Python"],
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    name: "Tasweet",
    description: "Web-based application for organizing online voting with secure and transparent mechanisms.",
    tech: ["React", "Security", "Blockchain"],
    color: "from-green-500/20 to-green-600/10",
  },
  {
    name: "TemporalUI",
    description: "GUI workflow builder for the Temporal workflow engine, streamlining workflow creation and management.",
    tech: ["Temporal", "React", "Workflow Engine"],
    color: "from-orange-500/20 to-orange-600/10",
  },
];

const ProjectsWindow = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FolderGit2 className="w-8 h-8 text-ubuntu-orange" />
        <h1 className="text-3xl font-ubuntu font-bold">Projects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="group relative overflow-hidden rounded-xl border border-window-border hover:border-ubuntu-orange transition-all duration-300 hover:scale-105"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50`} />
            
            <div className="relative p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-ubuntu font-bold mb-2 group-hover:text-ubuntu-orange transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-ubuntu-orange transition-colors flex-shrink-0" />
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-window-bg rounded-full text-xs font-medium border border-window-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-ubuntu-orange/10 to-ubuntu-purple/10 rounded-xl border border-ubuntu-orange/30">
        <h3 className="text-lg font-ubuntu font-bold mb-2 text-ubuntu-orange">More Projects</h3>
        <p className="text-sm text-muted-foreground">
          These are some of the key projects I've worked on. For a complete list of my work and contributions, 
          feel free to reach out or check my professional profiles.
        </p>
      </div>
    </div>
  );
};

export default ProjectsWindow;
