import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Rihal",
    role: "Software Development Manager",
    period: "Mar 2025 - Present",
    location: "Muscat, Oman",
    highlights: [
      "Managing the software development lifecycle across multiple teams and projects.",
      "Driving technical strategy and ensuring alignment with business objectives.",
      "Overseeing resource allocation, project planning, and delivery timelines.",
      "Fostering a culture of innovation, collaboration, and continuous improvement.",
    ],
  },
  {
    company: "Rihal",
    role: "Lead Software Engineer",
    period: "Oct 2023 - Mar 2025",
    location: "Muscat, Oman",
    highlights: [
      "Managing 25+ Software Engineers: Led a cross-functional team of 25+ engineers, ensuring high-quality deliverables, strong collaboration, and continuous improvement.",
      "Upskilling the Engineering Department: Launched a department-wide upskilling plan with targeted trainings, mentorships, and knowledge-sharing sessions to elevate technical expertise.",
      "Handling Complex Multi-Service Projects: Orchestrated large-scale initiatives involving multiple microservices, ensuring smooth integration, timely releases, and resilient architectures.",
    ],
  },
  {
    company: "Rihal",
    role: "Senior Software Engineer",
    period: "June 2022 - Oct 2023",
    location: "Muscat, Oman",
    highlights: [
      "Technical Leadership: Led technical projects as Tech Lead, overseeing system design, team management, and full-stack development.",
      "Containerization: Deployed applications using Docker and Kubernetes for streamlined deployment.",
      "CI/CD Pipelines: Created automated GitHub Actions for continuous integration and deployment.",
      "Workflows Orchestration: Implemented and managed workflow orchestration using Apache Airflow and Temporal to handle distributed task execution.",
      "ELK Stack: Integrated the ELK stack for centralized logging and monitoring of applications and services.",
      "Vector DBs: Integrating and optimizing Qdrant as a vector database for scalable and efficient search capabilities.",
      "Cloud Platforms: Managed deployments on Oracle Cloud Infrastructure (OCI) and AWS to ensure high availability and scalability.",
    ],
  },
  {
    company: "Rihal",
    role: "Software Engineer",
    period: "Sep 2020 - June 2022",
    location: "Muscat, Oman",
    highlights: [
      "Full-Stack Development: Worked with Golang for backend and React for frontend.",
      "Microservices Architecture: Built scalable systems using microservices.",
      "Database Management: Designed and managed PostgreSQL databases.",
      "Testing: Conducted comprehensive backend testing.",
    ],
  },
  {
    company: "Smart Developer",
    role: "Application Developer",
    period: "Dec 2019 - Sep 2020",
    location: "Muscat, Oman",
    highlights: [
      "Mobile Development: Developed and maintained Android applications using Java.",
      "Backend Solutions: Provided backend services using CodeIgniter PHP framework.",
      "API Development: Created and managed APIs for mobile apps.",
    ],
  },
];

const ExperienceWindow = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-8 h-8 text-ubuntu-orange" />
        <h1 className="text-3xl font-ubuntu font-bold">Professional Experience</h1>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-6 border-l-2 border-ubuntu-orange">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-ubuntu-orange border-4 border-background" />
            
            <div className="space-y-3">
              <div>
                <h2 className="text-2xl font-ubuntu font-bold">{exp.role}</h2>
                <p className="text-lg text-ubuntu-orange">{exp.company}</p>
                <p className="text-sm text-muted-foreground">
                  {exp.location} • {exp.period}
                </p>
              </div>

              <ul className="space-y-2 ml-4">
                {exp.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="text-sm text-muted-foreground leading-relaxed list-disc">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceWindow;
