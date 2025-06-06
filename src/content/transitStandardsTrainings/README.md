# STEP 1

For each folder in the public/assets/pcb/transit-standards-trainings/ folder, create a markdown file in the content/transitStandardsTrainings/ folder.

The file should follow the naming format transit-module-{number}.md. So transit-module-1 folder should become transit-module-1.md

Each markdown file should be created with the following content, replacing {} with the appropriate values.

The presentation, chat, transcript, and supplement properties should only be present if the files exist int he transit-standards-trainings/transit-module-{number} folder. 
The files will follow this format:
- presentation ends in ppt.pdf {presentationPath}: "/assets/pcb/transit-standards-trainings/transit-module-{number}/m01ppt.pdf"
- chat ends in chat.pdf {chatPath}: "/assets/pcb/transit-standards-trainings/transit-module-{number}/m01chat.pdf"
- transcript ends in trans.pdf {transcriptPath}: "/assets/pcb/transit-standards-trainings/transit-module-{number}/m01trans.pdf"
- supplement ends in sup.pdf {supplementPath}: "/assets/pcb/transit-standards-trainings/transit-module-{number}/m01sup.pdf"

<content>
---
module: {number}
code: 
title: 
length: 
presentation: {presentationPath}
chat: {chatPath}
transcript: {transcriptPath}
supplement: {supplementPath}
---


### Instructor(s)


### Target Audiences


### Prerequisite(s)


### Learning Objectives/Key Elements

</content>

# STEP 2
Step two involves parsing the markdown and splitting it up into the appropriate files