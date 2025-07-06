import { Textarea } from "@/components/ui/textarea";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const JobDescriptionInput = ({ 
  value, 
  onChange, 
  placeholder = "Paste the job description here. Include key requirements, skills, and responsibilities to get the best tailored results..."
}: JobDescriptionInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="job-description" className="block text-sm font-medium text-foreground">
        Paste Job Description
      </label>
      <Textarea
        id="job-description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[160px] resize-none border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
        aria-describedby="job-description-help"
      />
      <p id="job-description-help" className="text-xs text-muted-foreground">
        The more detailed the job description, the better we can tailor your materials.
      </p>
    </div>
  );
};

export default JobDescriptionInput;