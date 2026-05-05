<script setup>
import { ref } from "vue";
const cardInfo = {
  "pre-deployment-activities": {
    title: "Pre-Deployment Activities",
    status: "Completed",
    description: "The Multimodal Federal team, in coordination with Office of the Secretary, worked to define the ITS4US deployment program vision, goals and structure. The program follows a 3-phase structure with decision gates to ensure project success. The team conducted extensive outreach to local and state agencies and the deployment community through industry presentations and webinars to prepare deployment teams to respond to the RFP."
  },
  "develop-deployment-concept": {
    title: "Phase 1: Develop Deployment Concept",
    status: "Completed",
    description: "From February 2021 – May 2022, the five deployment teams conducted Phase 1 Concept Development activities and produced over 60 planning documents that other deployers can use for future projects.<br/><br/>In Phase 1, the teams refined and improved their proposed concepts to include the set of high-priority needs. The activities in this phase include creating a set of documents clearly defining deployment scope and requirements; describing data, safety, security, performance measurement, and participant recruiting and training management plans; codifying partnering arrangements and contracts and developing a preliminary deployment site plan."
  },
  "design-test": {
    title: "Phase 2: Design & Test",
    status: "Completed",
    description: "In Phase 2, the four deployment sites developed and tested the technologies defined in their deployment concept. Each team conducted a successful operational readiness demonstration before receiving approval to move into real-world operations."
  },
  "operate-evaluate": {
    title: "Phase 3: Operate & Evaluate",
    status: "In Progress",
    description: "In this phase, the tested deployment applications and technologies are placed into operational practice. The impact of the deployment on a set of key performance measures will be monitored and reported on a daily, weekly, and monthly basis. Performance and other data supporting a comprehensive assessment of deployment impacts are shared with independent evaluator to assess the success of the program."
  },
  "operations-maintenance": {
    title: "Operations & Maintenance (Post-Deployment)",
    status: "Not Started",
    description: "Projects must be able to sustain operations for a minimum period of five years after the program is completed with no supplementary program funds."
  },
  "phase-1-awards": {
    title: "Phase 1 Awards",
    status: "Completed",
    description: "From January – June 2020, USDOT opened the procurement process for Phase 1 - Concept Development. The program received over 25 proposals for this work during that time period. In January 2021, USDOT through careful review selected and awarded five teams Phase 1 Contracts for Large-Scale Complete Trip Deployments."
  },
  "phase-2-awards": {
    title: "Phase 2/3 Awards",
    status: "Completed",
    description: "Four projects that successfully completed the concept development phase, were awarded Phase 2 funding in June 2022 through cooperative agreements to develop and test their technologies: HIRTA, UW, GDOT and NFTA."
  }

}
const phaseID = ref("pre-deployment-activities")
const activePhase = ref(cardInfo[phaseID.value])

const handlePhaseClick = (event) => {
  console.log("Clicked phase:", event.currentTarget.id);
  const phaseId = event.currentTarget.id;
  const phaseInfo = cardInfo[phaseId];
  phaseID.value = phaseId;
  activePhase.value = { ...phaseInfo };
  // const detailsSection = document.querySelector(".program-phase-details");
  // detailsSection.querySelector("h3").textContent = phaseInfo.title;
  // detailsSection.querySelector(".status-pill").textContent = `Status: ${phaseInfo.status}`;
  // detailsSection.querySelector("p:nth-of-type(2)").innerHTML = phaseInfo.description;

  // Update active class
  document.querySelectorAll(".program-phase-item, .program-phase-award").forEach(item => {
    item.classList.remove("active");
  });
  event.currentTarget.classList.add("active");
};
</script>
<template>
  <div class="phases-container">
    <div class="program-phases-track" data-phases>
      <ul class="program-phases-container">

        <li id="pre-deployment-activities" @click="handlePhaseClick" class="program-phase-item">
          <span class="phase-item-circle progress"></span>
          <h3>Pre-Deployment Activities</h3>
        </li>
        <li id="phase-1-awards" @click="handlePhaseClick" class="program-phase-award">
          <span class="phase-item-circle award"></span>
          <h4>Phase 1 Awards</h4>
        </li>
        <li id="develop-deployment-concept" @click="handlePhaseClick" class="program-phase-item">
          <span class="phase-item-circle progress"></span>
          <h3>Develop Deployment Concept</h3>
        </li>
        <li id="phase-2-awards" @click="handlePhaseClick" class="program-phase-award">
          <span class="phase-item-circle award"></span>
          <h4>Phase 2/3 Awards</h4>
        </li>
        <li id="design-test" @click="handlePhaseClick" class="program-phase-item">
          <span class="phase-item-circle progress"></span>
          <h3>Design & Test</h3>
        </li>
        <li id="operate-evaluate" @click="handlePhaseClick" class="program-phase-item">
          <span class="phase-item-circle progress"></span>
          <h3>Operate & Evaluate</h3>
        </li>
        <li id="operations-maintenance" @click="handlePhaseClick" class="program-phase-item">
          <span class="phase-item-circle progress"></span>
          <h3>Operations & Maintenance</h3>
        </li>
      </ul>
      <span class="progress-bar" aria-roledescription="image"
        aria-label="Progress bar showing a blue highlight line up to which phase is currently in progress, and a grey line behind the phases that have not started. The phases that are complete are, ">
        <span class="progress-bar-fill"></span>
      </span>
    </div>
    <div class="d-flex justify-content-center mt-4">
      <Transition name="phase-fade" mode="out-in">
        <div class="program-phase-details" :key="phaseID">
          <div class="d-flex justify-content-between">
            <h3>{{ activePhase.title }}</h3>
            <p
              :class="['status-pill', 'flex-1', 'px-3', 'py-1', { 'status-in-progress': activePhase.status === 'In Progress' || activePhase.status === 'Not Started' }]">
              Status: {{ activePhase.status }}</p>
          </div>
          <p>{{ activePhase.description }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style>
h3,
h4 {
  color: #055681;
  text-transform: capitalize;
}

.status-pill {
  color: #313833;
  background-color: #dcfce7;
  border-radius: 10px;
  font-weight: 500;
}

.status-pill.status-in-progress {
  background-color: #fee2e2;
  color: #991b1b;
}

.program-phases-track {
  position: relative;
}

.progress-bar {
  position: absolute;
  height: 4px;
  background-color: #d1d5dc;
  border-radius: 9999px;
  pointer-events: none;
  z-index: 0;
  transform: translateY(-50%);
  left: -20px;
  right: -20px;
  top: calc(2.5rem + 18px);
}

.progress-bar-fill {
  display: block;
  height: 100%;
  width: 60%;
  background-color: rgb(0, 188, 212, 1);
  border-radius: inherit;
}

.program-phases-container {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 2fr 2fr 2fr;

  align-items: flex-start;
  margin-top: 2rem;
  position: relative;
  z-index: 1;
}

.program-phase-item {
  list-style: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding-top: 2.5rem;
}

.program-phase-award {
  list-style: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding-top: 2.5rem;
  background-image: url("/assets/images/its4us/award-icon.png");
}

.program-phase-item>h3,
.program-phase-award>h4 {
  margin: 0.75rem 0 0;
  padding-right: 0;
  font-size: 1rem;
  line-height: 1.2;
  text-transform: none;
  font-weight: 400;
  transition: all 300ms ease-in-out;
}

.program-phase-item,
.program-phase-award {
  flex: 1 1 0;
  /* equal-width columns -> no shifting when text weight changes */
  min-width: 0;
  /* prevents flex overflow weirdness */
}

.program-phase-item>h3:hover,
.program-phase-item:hover {
  font-weight: 700;
}

.program-phase-award>h4 {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  width: 100%;
  color: #055681;
  font-weight: 500;
  transition: all 300ms ease-in-out;
}

.program-phase-award>h4:hover {
  cursor: pointer;
  color: #dc3545;
  font-weight: 700;
}

.phase-item-circle {
  border-radius: 100%;
  background-color: #ffffff;
  border: 5px solid #d1d5dc;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
  position: relative;
  display: inline-block;
  margin-right: 0;
  transition: all 300ms ease-in-out;
  z-index: 2;

}

.phase-item-circle.progress {
  background-color: #055681;
}

.phase-item-circle.progress::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  /* dot size */
  height: 10px;
  background: #ffffff;
  border-radius: 100%;
  transform: translate(-50%, -50%);
}

.program-phase-item.active>.phase-item-circle {
  border: 3px solid rgb(0, 188, 212, 1);
}

.program-phase-item.active>.phase-item-circle::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  animation: borderFocus 300ms ease-out;
  width: 30px;
  height: 30px;
  border: 2px solid rgb(0, 188, 212, 1);
  border-radius: 100%;
  transform: translate(-50%, -50%);

}

.phase-item-circle.award {
  background-color: #dc3545;
  border: none;
  top: 3px;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
}

.phase-item-circle.award::after {
  content: "\f024";
  font-family: "Font Awesome 5 Free";
  /* Ensure you have Font Awesome included in your project */
  color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.program-phase-item:hover .phase-item-circle,
.program-phase-award:hover .phase-item-circle {
  transform: scale(1.1);
}

.program-phase-item:hover h3 {
  font-weight: 700;
}

.program-phase-award:hover h4 {
  color: #dc3545;
  font-weight: 700;
}


.program-phase-award.active>.phase-item-circle.award {
  transform: scale(1.1);
}


.program-phase-details {
  padding: 2rem;
  background-color: white;
  min-height: 150px;
  max-width: 56rem;
}

.phase-fade-enter-active,
.phase-fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.phase-fade-enter-from,
.phase-fade-leave-to {
  opacity: 0;
}

@media(max-width: 968px) {
  .phases-container {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
  }

  .program-phases-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    padding-left: 0;
  }

  .program-phases-track {
    position: relative;
    width: 25%;
  }


  .program-phase-item,
  .program-phase-award {
    margin-bottom: 1.25rem;
    padding-top: 0;
    width: 100%;
    flex: none;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    gap: 0.75rem;
  }

  .program-phase-item>h3,
  .program-phase-award>h4 {
    margin: 0;
  }

  /* In the small layout, keep the award label in-flow beside the circle */
  .program-phase-award>h4 {
    position: static;
    top: auto;
    left: auto;
    transform: none;
    width: auto;
  }

  .progress-bar {
    top: 50%;
    width: 4px;
    height: 100%;
    left: 18px;
    right: auto;
    justify-content: start;

  }

  .progress-bar-fill {
    top: 0;
    width: 100%;
    height: 60%;
  }

  .program-phase-award {
    margin-left: 5px;
  }
}

@media(max-width: 768px) {
  .program-phases-container{
    min-width: 60px;
  }
  .phase-item-circle {
    display: none;
  }

  .program-phase-award {
    padding-left: 0;
    margin-left: 0;
  }
  .progress-bar{
    display: none ;
  }


}

@keyframes borderFocus {
  0% {
    width: 40px;
    height: 40px;
  }

  100% {
    width: 30px;
    height: 30px;
  }
}
</style>
