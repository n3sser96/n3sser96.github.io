import { Mail, Phone, MapPin } from "lucide-react";

const AboutWindow = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-ubuntu-orange to-ubuntu-purple flex items-center justify-center text-5xl font-bold">
          NA
        </div>
        <div>
          <h1 className="text-4xl font-ubuntu font-bold mb-2">Nasser Al Subhi</h1>
          <p className="text-xl text-ubuntu-orange">Software Development Manager</p>
          <p className="text-base text-muted-foreground">Rihal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
          <Mail className="w-5 h-5 text-ubuntu-orange" />
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <a href="mailto:nasser@subhi.tech" className="text-sm hover:text-ubuntu-orange transition-colors">
              nasser@subhi.tech
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
          <Phone className="w-5 h-5 text-ubuntu-orange" />
          <div>
            <p className="text-xs text-muted-foreground">Mobile</p>
            <a href="tel:+96894944011" className="text-sm hover:text-ubuntu-orange transition-colors">
              +968 94944011
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
          <MapPin className="w-5 h-5 text-ubuntu-orange" />
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm">Muscat, Oman</p>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <h2 className="text-2xl font-ubuntu font-bold mb-4 text-ubuntu-orange">About</h2>
        <p className="text-muted-foreground leading-relaxed">
          Software Development Manager with extensive experience in managing cross-functional teams, 
          building scalable microservices architectures, and implementing modern DevOps practices. 
          Specialized in GoLang, Python, and cloud-native technologies. Passionate about mentoring 
          engineers and driving technical excellence across organizations.
        </p>
      </div>

      <div className="pt-4">
        <h2 className="text-2xl font-ubuntu font-bold mb-4 text-ubuntu-orange">Education</h2>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-ubuntu font-bold">Bachelor of Science in Computer Science</h3>
          <p className="text-sm text-ubuntu-orange">Sultan Qaboos University</p>
          <p className="text-sm text-muted-foreground">Muscat, Oman • Sep 2014 - Sep 2019</p>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;
