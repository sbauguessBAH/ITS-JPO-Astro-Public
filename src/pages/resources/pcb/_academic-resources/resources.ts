import academicWorkshopsImage from "@/src/assets/images/pcb/academic-resources/academic-workshops.jpg";
import careerPathsImage from "@/src/assets/images/pcb/academic-resources/career-paths.jpg";
import courseModulesImage from "@/src/assets/images/pcb/academic-resources/case-studies.jpg";
import studentCompetitionsImage from "@/src/assets/images/pcb/academic-resources/student-competitions.png";

export const academicResources = [
  {
    description: "ITS Academic Course Modules aim to advance knowledge of ITS by providing instructor and student content targeted to college and university students. Content includes Instructor Guides, PowerPoint Presentations, Student Participant Materials, and more.",
    image: courseModulesImage,
    slug: "course-modules",
    title: "Academic Course Modules"
  },
  {
    description: "The Transportation Technology Tournament (TTT) is an annual student competition conducted by the USDOT, NOCoE, and ITE allowing students to work with public agencies to apply ITS and TSMO solutions to real-world transportation challenges.",
    image: studentCompetitionsImage,
    slug: "student-competitions",
    title: "Student Competitions"
  },
  // {
  //   title: "Academic Workshops",
  //   description: "ITS Academic Workshops provide educators and representatives from public and private entities to explore strategies for integrating ITS education into curricula and provide input for advancing the ITS workforce.",
  //   image: academicWorkshopsImage,
  //   slug: "workshops"
  // },
  {
    description: "The ITS Academic Cohort brings together teaching practitioners and the ITS PCB Program to jointly develop academic resources.",
    image: academicWorkshopsImage,
    slug: "academic-cohort",
    title: "Academic Cohort"
  },
  {
    description: "ITS Career Paths provides a snapshot overview of ITS careers including key details on specific roles, responsibilities, skills/education, and example career paths",
    image: careerPathsImage,
    slug: "career-paths",
    title: "Career Paths"
  },
]