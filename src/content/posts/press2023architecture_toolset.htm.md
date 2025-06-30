---
title: U.S. Department of Transportation Releases Update to ITS Architecture Reference and Toolsets
date: 2023-09-20
---

[**Architecture Reference for Cooperative and Intelligent Transportation (ARC-IT**)](https://www.arc-it.net/) Version 9.2 is a significant update of the U.S. National ITS Architecture Reference focusing on improvements that support Multimodal Accessible Travel (MAT), the Management of Electronic Traffic Regulations (METR), and other new concepts and refinements. The most significant enhancements for version 9.2 are:

-   Multimodal Accessible Travel: Concepts supporting complete trip, integrated payment, safety for vulnerable road users, and pathway/indoor navigation use cases. Most obviously impacted service packages:

-   SU15: Vulnerable Road User Device Transition Support
-   TI03: En-Route Guidance
-   TI04: Trip Planning and Payment
-   TI05: Integrated Multi-Modal Electronic Payment (previously PT18)
-   TI06: Shared Use Mobility and Dynamic Ridesharing
-   TI08: Personal Wayfinding
-   VS12: Vulnerable Road User Safety
-   VS18: Vulnerable Road User Clustering

-   Major enhancements to VS17 Traffic Code Dissemination based on developments in the Management of Electronic Traffic Regulations (METR) standards being developed in ISO/TC 204. This includes details of how METR systems are expected to operate by collecting, managing and disseminating road regulations.
-   Other new or significantly enhanced Service Packages:

-   MC12: One-Way Convoy Driving -- all new, inspired by operations in Norway but implemented similarly in some snow-heavy US states
-   ST05: Electric Charging Stations Management -- modified to better accommodate information sharing and management entities

-   Updates to all views to reflect changes in technology and standards development
-   Many new physical objects supporting MAT, METR and other new and refined concepts, such as the Micro-Mobility Vehicle OBE, Electric Charging Management Center and Shared Use Transportation Center
-   An upgrade to the physical database model to better support notions of hierarchy. This hierarchy’s primary purpose is to enable inheritance, which should help RAD-IT and SET-IT users develop more succinct architecture descriptions while also enabling flexibility for architects at all levels. In practice, ARC-IT users will see the ‘Light Vehicle OBE’ in many places where a Vehicle OBE was previously noted, and also note that functional objects originating at one higher level object (e.g., Vehicle) appear in lower-level objects (e.g., Light Vehicle OBE).

As with previous versions, ARC-IT is available as an online website and also as a single download that contains the majority of the ARC-IT web site that may be installed locally for off-line use.

The architecture [**toolset**](https://www.arc-it.net/html/resources/tools.html) has been upgraded to work with version 9.2 of ARC-IT, to include additional standalone features and maintain the ability for users to exchange information between the tools.

Regional Architecture Development for Intelligent Transportation ([**RAD-IT**](https://www.arc-it.net/html/resources/radit.html)) supports development of regional and project ITS architectures using ARC-IT as a starting point.  RAD-IT 9.2 adds:

-   A new ‘alias’ function to allow the user to use their own terminology for information flows without losing traceability to ARC-IT
-   Support for object hierarchy and user defined flow types, including the ability to hide generic p-object mappings
-   New output reports for user defined objects
-   Various bug fixes

The Systems Engineering Tool for Intelligent Transportation ([**SET-IT**](https://www.arc-it.net/html/resources/setit.html)) integrates drawing and database tools with ARC-IT so that users can develop detailed ITS project architectures. SET-IT 9.2 adds:

-   A new ‘alias’ function to allow the user to use their own terminology for information flows without losing traceability to ARC-IT
-   View-specific notes
-   Support for object hierarchy and user defined flow types, including the ability to hide generic p-object mappings to hide generic class object mappings
-   Enhanced context diagram generator
-   Enhanced enterprise layer 0 diagram generator
-   Various bug fixes
