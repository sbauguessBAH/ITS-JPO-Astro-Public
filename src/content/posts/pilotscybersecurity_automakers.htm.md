---
title: Connected Vehicle Pilot Deployment Program Shares Open Source Cybersecurity Advances with Automakers
date: 2021-01-25
---

The USDOT Intelligent Transportation Systems (ITS) Joint Program Office (JPO) Connected Vehicle (CV) Pilot Deployment Program has led the way in developing operational CV cybersecurity solutions, particularly in systematic misbehavior detection. In preparation for the CV Pilot sites transitioning into an operational state, the Program has created a flexible software/hardware capability to identify device misbehavior and remove these devices from the active CV environment. The resulting open source misbehavior detection approach and underlying code has since been shared with GM, Ford and other private companies for further development and refinement of the original concept.

For the purposes of this early capability, “misbehavior” is defined as any case where a CV device generates a Basic Safety Message (BSM) containing one or more values inconsistent with the corresponding vehicle’s true status, position, or behavior. Criteria used for misbehavior include: 

![Figure 1. ](press-images/figure1_misbehavior.png)

1.  **Infeasible reported position** (e.g., BSM with position that is 5 miles from a known accurate vehicle position)
2.  **Unrealistic vehicle speed** (e.g., BSM with 150 mph reported speed)
3.  **Non-standard message content** (e.g., BSM including values that fall outside of pre-determined ranges specified in J2735 standard or incorrectly formatted)
4.  **Excessive message rate** (e.g., BSMs received from a single source at greater than 10 Hz)

Vehicle manufacturers and private sector CV stakeholders have significant interest in misbehavior detection to ensure cybersecure and safe vehicle operation. A connected vehicle device may exhibit misbehavior from underlying reasons related to being hacked, or simply because of sensor error or malfunction. When misbehavior occurs for any reason, it is time-critical that these devices and vehicles are detected – and safety-critical that other nearby CVs know to ignore BSMs from these vehicles.

The Program is developing two tools to assist misbehavior detection research:

### 1\. Faulty BSM Generator

Misbehavior detection capability development and testing requires having known faulty BSM data to compare against known correct BSM data. _The Faulty BSM Generator_ creates a stream of both correct and incorrect BSM data from a record of vehicle movement, or trajectory.  The underlying approach uses the Trajectory Conversion Algorithm (TCA) software, an open source tool available on the ITS CodeHub. In this case, the Faulty BSM Generator allows the user to specify the type, frequency, and other attributes of these errors via a control file.

### 2\. Misbehavior Detection Evaluato**r**

_The Misbehavior Detection Evaluator_ assesses BSMs chronologically by timestamp and location. The tool applies detection algorithms on nearby sequential BSMs and outputs findings to the console. The detection algorithms are designed to be self-contained, taking in BSMs and returning a misbehavior result. The Misbehavior Detection Evaluator uses that result to perform computations and store historical data. The simulator also outputs the overall completion time and the average computational time of each algorithm being tested.

Current misbehavior detection algorithms focus on specific elements of the BSM:

-   **Latitude (X):** the geographic latitude of an object, expressed in 1/10th integer microdegrees, as a 31-bit value, and with reference to the horizonal datum then in use.
-   **Longitude (Y):** the geographic longitude of an object, expressed in 1/10th integer microdegrees, as a 32-bit value, and with reference to the horizontal datum then in use.
-   **Speed:** represents the vehicle speed.
-   **Acceleration:** represents the signed acceleration of the vehicle along some known axis. Negative values indicate deceleration, and possible braking action.
-   **Heading:** provides current heading of the sending device. North shall be defined as the axis prescribed by the WGS-84 coordinate system and its reference ellipsoid.
-   **Brake status:** indicates active/inactive brake status independently for each of four wheels in the form of a 5-digit bit string. The first digit represents availability of brake status data – the first digit set to 1 implies data is unavailable. The next four digits correspond to wheels that are designated in the following order: Left Front, Right Front, Left Rear, and Right Rear. The indicated status of a wheel is set to 1 if brakes are active on that wheel, and 0 if brakes are inactive on that wheel.

Misbehavior detection testing has been conducted in specific scenarios focused on reported speed and position, for example:

-   **Under-Speed Test**.  A CV generating BSMs and reporting accurate speed passes a roadside unit configured to receive BSMs at a known location.  In this case, neither device detected misbehavior and no misbehavior reports were generated.
-   **Over-Speed Test**.  A CV generating BSMs and reporting excessive speeds passes a roadside unit configured to receive BSMs at a known location.  In this case, both the roadside unit and the vehicle itself identified the misbehavior.  Reports of the identified misbehavior were referred to the entity that manages credentials within the CV ecosystem, the Security Credential Management System (SCMS).  The SCMS accepted these reports and could then take action to alert all other vehicles to ignore BSMs from the identified misbehaving device.
-   **Position Misbehavior**. Similar tests were conducted with respect to BSMs containing erroneous position data, wherein:
    -   The roadside unit was able to detect misbehavior and generate a misbehavior report accepted by the SCMS.
    -   The in-vehicle device was able to self-detect position misbehavior and generate an appropriate misbehavior report.

For full access to the Misbehavior Detection tools, or access to the Testing Report, please contact [cory.krause@noblis.org](mailto:cory.krause@noblis.org).
