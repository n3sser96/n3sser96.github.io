import { GraduationCap, Calendar, MapPin } from "lucide-react";

const EducationWindow = () => {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <GraduationCap className="w-8 h-8 text-ubuntu-orange" />
        <h1 className="text-3xl font-ubuntu font-bold">Education</h1>
      </div>

      <div className="bg-gradient-to-br from-ubuntu-purple/30 to-ubuntu-orange/10 rounded-xl p-8 border border-ubuntu-orange/30">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-ubuntu-orange/20 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-10 h-10 text-ubuntu-orange" />
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <h2 className="text-2xl font-ubuntu font-bold mb-2">
                Bachelor of Science in Computer Science
              </h2>
              <p className="text-xl text-ubuntu-orange font-medium">
                Sultan Qaboos University
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ubuntu-orange" />
                <span className="text-sm text-muted-foreground">Muscat, Oman</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-ubuntu-orange" />
                <span className="text-sm text-muted-foreground">Sep 2014 - Sep 2019</span>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-muted-foreground leading-relaxed">
                Completed comprehensive study in Computer Science, covering algorithms, 
                data structures, software engineering principles, database systems, and 
                modern programming paradigms. Developed strong foundation in theoretical 
                computer science and practical software development.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-muted rounded-lg text-center">
          <p className="text-3xl font-bold text-ubuntu-orange mb-1">5</p>
          <p className="text-sm text-muted-foreground">Years of Study</p>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <p className="text-3xl font-bold text-ubuntu-orange mb-1">CS</p>
          <p className="text-sm text-muted-foreground">Major</p>
        </div>
        <div className="p-4 bg-muted rounded-lg text-center">
          <p className="text-3xl font-bold text-ubuntu-orange mb-1">B.Sc</p>
          <p className="text-sm text-muted-foreground">Degree</p>
        </div>
      </div>
    </div>
  );
};

export default EducationWindow;
