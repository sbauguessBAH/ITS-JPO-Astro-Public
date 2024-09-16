---
title: New York City Connected Vehicle Pilot Data Now Available via the ITS DataHub
date: 2021-07-14
---

The [**Intelligent Transportation Systems (ITS) Joint Program Office (JPO) Data Program**](https://www.its.dot.gov/research_areas/data_access/index.htm) is pleased to announce the launch of new data sets from the New York City Connected Vehicle Pilot via the [**ITS DataHub**](https://www.its.dot.gov/data/index.htm).

### Overview

The ITS JPO's [**Connected Vehicle Pilot Deployment Program**](https://www.its.dot.gov/pilots/index.htm) is pioneering the deployment of connected vehicle technologies in three U.S. locations—Wyoming; Tampa, Florida; and New York City. One of the program's key goals is to produce and provide [**open data from the pilots**](https://data.transportation.gov/stories/s/hr8h-ufhq) to the public in a quick and helpful manner for use by third-party researchers and developers.

The New York City Pilot, led by the New York City Department of Transportation, is the third Connected Vehicle Pilot project site to complete its data pipeline, with data deliveries continuing to flow to the ITS DataHub on a weekly basis. The data the New York City Pilot has made publicly available are in the format of event logs. 

### Details

Each event log record includes:

-   Vehicle-to-vehicle or vehicle-to-infrastructure safety warning details that were issued by the aftermarket safety device in an equipped host vehicle
-   Basic safety messages (BSMs) of the host vehicle that received the warning
-   BSMs heard by the host vehicle
-   Depending on the application warning type, MAP (intersection geometry) messages, signal phase and timing (SPaT) messages, and traveler information (TIM) messages that were heard by the host vehicle.

The BSM, MAP, SPaT, and TIM messages contained in the event logs generally follow the Society of Automotive Engineers (SAE) J2735 data structures. However, elements in the SAE J2735 standard have been removed, transformed, or modified to preserve the privacy of the Connected Vehicle Pilot participant drivers and vehicle operators. For example, time and location data are obfuscated to obscure individual events. Details of these changes are documented [**here**](https://github.com/usdot-its-jpo-data-portal/sandbox/tree/master/doc/nycdot).

To access the data sets, please visit [**http://www.its.dot.gov/data/**](https://www.its.dot.gov/data/index.htm).
