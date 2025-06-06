---
module: 67
code: "CSE 201, Part 2 of 2"
title: "Introduction to Security Credentials Management System (SCMS) Part 2 of 2 (2021)"
length: "1 hour, 3 minutes"
presentation: "/assets/pcb/standards-trainings/module-67/m67ppt.pdf"
transcript: "/assets/pcb/standards-trainings/module-67/m67trans.pdf"
supplement: "/assets/pcb/standards-trainings/module-67/m67sup.pdf"
---
SCMS is a form of Public Key Infrastructure (PKI) that issues and manages the security certificates that form the basis of trust for V2X communications. The SCMS is distinguished from traditional PKI in several aspects—its size and the balance among security, privacy, and efficiency. V2X devices enroll into the SCMS after completing device certification processes that validate the devices as trusted players in the system; obtain security certificates from certificate authorities (CAs); and attach those certificates to their transmitted messages as part of a digital signature. Authorized system participants use digital certificates issued by the SCMS to authenticate and validate the safety and mobility messages that form the foundation for connected vehicle eco-system. As well as authorizing baseline application activities, these credentials provide special permissions to first responders to prioritize their V2X messages.

SCMS also plays a key function in protecting the system as a whole by identifying and removing misbehaving devices, while still maintaining privacy. With misbehavior, field devices (onboard units (OBUs), aftermarket safety devices (ASDs), or roadside units (RSUs)) can report back to the SCMS if they perceive that other vehicle devices are transmitting invalid or untrustworthy messages. Misbehavior detection capabilities remove misbehaving devices from the system, so they do not interfere with safety and transportation critical operations.

After taking this course, participants will be able to understand the application of a transportation-oriented SCMS and how the security certificates provide the mechanism for devices to exchange messages in a trustworthy and privacy-protected manner. This course will help participants in understanding the standards used to ensure the security of the V2X communications exchanges, including the interoperability among devices operating in a connected vehicle environment. Finally, participants will understand technical and organizational challenges associated with obtaining credentials for use by devices that participate in deployments and will be positioned to specify implementation or deployment requirements related to SCMS-based certificate management. To protect the privacy of vehicle owners, these certificates contain no personal or equipment-identifying information and limit the ability to track an individual vehicle without external resources.

### Instructor(s)
Dr. William Whyte
Senior Director, Technical Standards
Qualcomm Technologies, Inc.
San Diego, CA, USA

Dr. Virendra Kumar
Senior Staff Engineer, Technical Standards
Qualcomm Technologies, Inc.
San Diego, CA, USA

### Target Audiences
* Private and Public Sector Users including Manufacturers
* Procurement Managers/Decision Makers
* Project Managers
* Public Sector Project Managers
* Specification Writers
* System Developers
* System Integrators
* Traffic Management and Engineering Staff
* Traffic Management Center and Operations Staff
* Transit Managers
* Transit Planning, Operations, and Maintenance Staff
* Transportation Planners

### Prerequisite(s)
* CSE201: Introduction to Security Credentials Management System (SCMS) Part 1
* CV262: Vehicle-to-Vehicle ITS Standards for Project Managers
* CV261: Vehicle-to-Infrastructure ITS Standards for Project Managers
* CV265: Introduction to IEEE 1609 Family of Standards for Wireless Access in Vehicular Environments

### Learning Objectives/Key Elements
1. Identify the Vehicle-to-Everything (V2X) certification process for a device to enroll in the SCMS
2. Illustrate how to make a deployment plan that uses SCMS services