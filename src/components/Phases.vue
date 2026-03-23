 <script setup>
 import { ref } from "vue";
 const cardInfo = {
    "program-initiation": {
      title: "Program Initiation",
      status: "Completed",
      description: "The Program Initiation phase establishes the foundation for the ITS4US deployment. This includes identifying stakeholders, defining project scope, securing funding, and forming partnerships necessary to support the deployment program."
    },
    "pre-deployment-activities": {
      title: "Pre-Deployment Activities",
      status: "Completed",
      description: "The Multimodal Federal team worked in coordination with Office of the Secretary, to define the program and reach out to local and state agencies and the deployment community through a series of seven webinars to prepare them to respond to the RFP. These efforts reached over 1000 stakeholders."
    },
      "develop-deployment-concept": {
        title: "Phase 1: Develop Deployment Concept",
        status: "Completed",
        description: "From February 2021 – May 2022, the five deployment teams conducted Phase 1 and produced over 60 planning documents that other deployers can use for future projects. <br/>In the Concept Development Phase 1, the teams refined and improved their proposed their concepts to include the set of high-priority needs. The activities in this phase include creating a set of documents clearly defining deployment scope and requirements; describing data, safety, security, performance measurement, and participant recruiting and training management plans; codifying partnering arrangements and contracts, and developing a preliminary deployment site plan."
      },
      "design-test": {
        title: "Phase 2: Design & Test",
        status: "Completed",
        description: "After passing all checkpoints, four successful projects were awarded Phase 2 funding in June 2022 and have been developing and testing their technologies: HIRTA, UW, GDOT and NFTA. In this phase, the deployment concept is designed in detail, built, and tested prior to operation."
      },
      "operate-evaluate": {
        title: "Phase 3: Operate & Evaluate",
        status: "In Progress",
        description: "In this phase, the tested deployment applications and technologies are placed into operational practice. The impact of the deployment on a set of key performance measures will be monitored and reported on a daily, weekly, and monthly basis. Further, performance and other data supporting a comprehensive assessment of deployment impacts are to be shared with an USDOT-identified independent evaluator."
      },
      "operations-maintenance": {
        title: "Operations & Maintenance (Post-Deployment)",
        status: "Not Started",
        description: "Projects must be able to sustain operations for a minimum period of five years after the program is completed with no supplementary federal funds."
      },
      "phase-1-awards": {
        title: "Phase 1 Awards",
        status: "Completed",
        description: "From January – June 2020, USDOT opened the procurement process. The program received over many proposals for this work during that time period. In January 2021, USDOT through careful review selected and awarded five teams Phase 1 Contracts for Large-Scale Complete Trip Deployments."
      },
      "phase-2-awards": {
        title: "Phase 2/3 Awards",
        status: "Completed",
        description: "After passing all checkpoints, four successful projects were awarded Phase 2 funding in June 2022 and have been developing and testing their technologies: HIRTA, UW, GDOT and NFTA."
      }
   
  }
  const phaseID = ref("program-initiation")
  const activePhase = ref(cardInfo[phaseID.value])

  const handlePhaseClick = (event) => {
    console.log("Clicked phase:", event.currentTarget.id);
    const phaseId = event.currentTarget.id;
    const phaseInfo = cardInfo[phaseId];
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
 <div class="program-phases-track" data-phases>
   <ul class="program-phases-container">
          <li id="program-initiation" @click="handlePhaseClick" class="program-phase-item active">
            <span class="phase-item-circle progress"></span>
            <h3>Program Initiation</h3>
          </li> 
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
        <span class="progress-bar">
          <span class="progress-bar-fill"></span>
        </span>
      </div>
      <div class="program-phase-details">
        <div class="d-flex justify-content-between">
          <h3>{{ activePhase.title }}</h3>
          <p class="status-pill align-self-end">Status: {{ activePhase.status }}</p>
        </div>
        <p>{{ activePhase.description }}</p>
      </div>
</template>
<style>
    h3, h4 {
      color: #055681;
      text-transform:capitalize;
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
      top: calc(4.5rem + 18px);
    }

    .progress-bar-fill {
      display: block;
      height: 100%;
      width: 70%;
      background-color: rgb(0, 188, 212, 1);
      border-radius: inherit;
    }

    .program-phases-container {
        display: flex;
        justify-content: space-between;
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
    .program-phase-item > h3,
    .program-phase-award > h4 {
      margin: 0.75rem 0 0;
      padding-right: 0;
      font-size: 1rem;
      line-height: 1.2;
      text-transform: none;
      text-wrap: nowrap;
      font-weight: 400;
      transition: all 300ms ease-in-out;
    }
    .program-phase-item, 
    .program-phase-award {
      flex: 1 1 0;   /* equal-width columns -> no shifting when text weight changes */
      min-width: 0;  /* prevents flex overflow weirdness */
  }

    .program-phase-item > h3:hover, .program-phase-item:hover {
      font-weight: 700;
    }

    .program-phase-award > h4 {
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

      .program-phase-award > h4:hover  {
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
        width: 10px;          /* dot size */
        height: 10px;
        background: #ffffff;
        border-radius: 100%;
        transform: translate(-50%, -50%);
      }

      .program-phase-item.active > .phase-item-circle {
        border: 3px solid rgb(0, 188, 212, 1);
      }

      .program-phase-item.active > .phase-item-circle::before {
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
        background-color:  #dc3545;
        border: none;
        width: 32px;
        height: 32px;
    }

     .phase-item-circle.award:hover {
        transform: scale(1.1);
    }
      .program-phase-award.active > .phase-item-circle.award {
        transform: scale(1.1);
    }
    .phase-item-circle.progress:hover, .phase-item-circle:hover {
      transform: scale(1.2);
    }

    .program-phase-details {
      padding: 2rem;
      background-color: white;
      min-height: 150px;
    }

    @keyframes borderFocus {
      0% {
        width: 40px;
        height: 40px;
      }
      100% {
        width:30px;
        height:30px;
      }
    }
</style>

