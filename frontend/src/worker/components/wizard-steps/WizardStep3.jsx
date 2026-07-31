// // src/worker/components/wizard-steps/WizardStep3.jsx
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'

// // ✅ Tools and Certifications by Trade with Section Headers from PDF
// const TOOLS_CERTIFICATIONS = {
//   // ============================================================
//   // HVAC/Mechanical
//   // ============================================================
//   'HVAC/Mechanical': {
//     'Certifications / Training': [
//       'EPA 608 Universal',
//       'EPA 608 Type I',
//       'EPA 608 Type II',
//       'EPA 608 Type III',
//       'OSHA 10',
//       'OSHA 30',
//       'Lift certification',
//       'Fall protection training',
//       'Hot work / brazing experience',
//       'Confined space awareness',
//       'First aid / CPR',
//       'Other certification - optional note',
//     ],
//     'Tools / Equipment': [
//       'Own basic hand tools',
//       'Own power tools',
//       'Tin snips / sheet metal tools',
//       'Cordless drill / impact',
//       'Multimeter',
//       'Refrigerant gauges',
//       'Vacuum pump',
//       'Recovery machine',
//       'Brazing tools',
//       'Manometer',
//       'Ladders',
//       'PPE available',
//     ],
//   },

//   // ============================================================
//   // Electrical / Power
//   // ============================================================
//   'Electrical / Power': {
//     'Certifications / Training / Licenses': [
//       'Electrical apprentice card / registration',
//       'Journeyman electrician license',
//       'Master electrician license',
//       'Lift certification',
//       'OSHA 10',
//       'OSHA 30',
//       'Fall protection training',
//       'NFPA 70E / electrical safety training',
//       'Lockout/Tagout awareness',
//     ],
//     'Tools / Equipment': [
//       'Own basic hand tools',
//       'Own Cordless tools',
//       'Conduit bender',
//       'Fish tape',
//       'Multimeter',
//       'Label maker',
//       'Electrical tool bag',
//       'Ladders',
//       'PPE available',
//     ],
//   },

//   // ============================================================
//   // Plumbing / Piping
//   // ============================================================
//   'Plumbing / Piping': {
//     'Certifications / Training / Licenses': [
//       'Plumbing License',
//       'Apprentice Card',
//       'Journeyman Card',
//       'Backflow Certification',
//       'Medical Gas Certification',
//       'Gas Piping Qualification',
//       'OSHA 10',
//       'OSHA 30',
//       'Confined Space Awareness',
//       'Hot Work Awareness',
//       'Trench Safety Awareness',
//       'Hospital / Healthcare Experience',
//     ],
//     'Tools / Equipment': [
//       'Lift Experience',
//       'Own Basic Hand Tools',
//       'Pipe Wrenches',
//       'PEX Tools',
//       'Copper Tools',
//       'Threading Tools',
//       'Press Tool Experience',
//       'Power Tools',
//       'PPE Available',
//     ],
//   },

//   // ============================================================
//   // Interiors
//   // ============================================================
//   'Interiors': {
//     'Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Fall Protection Training',
//       'Ladder Safety',
//     ],
//     'Tools / Equipment': [
//       'Own Basic Hand Tools',
//       'Own Power Tools',
//       'Drywall Tools',
//       'Metal Framing Tools',
//       'Finish Carpentry Tools',
//       'Screw Gun / Drill',
//       'Utility Knife',
//       'Tape Measure',
//       'Level / Laser Level',
//       'Chalk Line',
//       'Drywall T-Square',
//       'Rasp / Surform Tool',
//       'Drywall Saw / Keyhole Saw',
//       'Sandpaper / Sanding Block',
//       'Joint Compound Tools (tapes, knives, mud pans)',
//       'Corner Bead Tools',
//       'Stilts / Drywall Stilts Experience',
//       'Banjo / Automatic Taper',
//       'Rotary Cut-Out Tool',
//       'Drywall Lift / Hoist Experience',
//       'Panel Cart / Material Cart',
//       'PPE Available',
//       'Reliable Transportation',
//       'Valid Driver License',
//     ],
//   },

//   // ============================================================
//   // Concrete / Formwork / Rebar / Flatwork
//   // ============================================================
//   'Concrete / Formwork / Rebar / Flatwork': {
//     'Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'Silica Awareness',
//       'Fall Protection',
//       'Confined Space Awareness',
//       'Trench Safety Awareness',
//       'Hot Work Awareness',
//     ],
//     'Tools / Equipment': [
//       'Lift Experience',
//       'Own Basic Hand Tools',
//       'Concrete Finishing Tools',
//       'Bull Float Experience',
//       'Power Trowel Experience',
//       'Concrete Saw Experience',
//       'Core Drill Experience',
//       'Laser Level Experience',
//       'Vibrator Experience',
//       'PPE',
//       'Hard Hat',
//       'Safety Vest',
//       'Work Boots',
//     ],
//   },

//   // ============================================================
//   // Asphalt / Paving Work
//   // ============================================================
//   'Asphalt / Paving Work': {
//     'Certifications / Training / Licenses': [
//       'OSHA 10',
//       'OSHA 30',
//       'Traffic Control Awareness',
//       'Flagger Certification',
//       'Work Zone Safety',
//       'Hot Work / Heat Exposure Experience',
//       'First Aid / CPR',
//       'Valid Driver License',
//       'CDL',
//       'Equipment Card / Certification',
//     ],
//     'Tools / Equipment': [
//       'Has PPE',
//       'High-Vis Vest / Clothing',
//       'Work Boots',
//       'Hard Hat',
//       'Asphalt Hand Tools',
//       'Rake / Lute Tools',
//       'Sealcoat Tools',
//       'Striping Layout Tools',
//       'Can work around traffic',
//       'Can work in heat',
//       'Can work nights',
//       'Can work weekends',
//     ],
//   },

//   // ============================================================
//   // Civil / Sitework / Earthwork / Utilities
//   // ============================================================
//   'Civil / Sitework / Earthwork / Utilities': {
//     'Certifications / Training / Licenses': [
//       'OSHA 10',
//       'OSHA 30',
//       'Trench Safety Awareness',
//       'Competent Person - Trenching',
//       'Flagger Certification',
//       'Confined Space Awareness',
//       'First Aid / CPR',
//       'Valid Driver License',
//       'CDL',
//       'Equipment Certification / Card',
//     ],
//     'Tools / Equipment': [
//       'Has PPE',
//       'Work Boots',
//       'Hard Hat',
//       'Safety Vest',
//       'Own Hand Tools',
//       'Can work outdoors',
//       'Can work around heavy equipment',
//       'Can work in heat/cold',
//       'Can pass background check',
//     ],
//   },

//   // ============================================================
//   // Landscaping / Exterior Improvements
//   // ============================================================
//   'Landscaping / Exterior Improvements': {
//     'Certifications / Training': [
//       'OSHA 10',
//       'First Aid (Optional)',
//     ],
//     'Tools / Equipment': [
//       'Own Basic Hand Tools',
//       'Shovel / Rake / Wheelbarrow / Pruners / Landscape Hand Tools',
//       'Mower',
//       'String Trimmer',
//       'Blower',
//       'Plate Compactor',
//       'Sod Roller',
//       'Small Paver Tools',
//       'Cut-Off Saw Experience',
//       'Post Hole Digger',
//       'Fence Stretcher',
//       'Basic Hardware Tools',
//       'Trenching Tools',
//       'Basic Irrigation Repair Tools',
//       'Has PPE',
//       'Outdoor work experience',
//       'Heat/weather tolerance',
//     ],
//   },

//   // ============================================================
//   // Roofing / Waterproofing
//   // ============================================================
//   'Roofing / Waterproofing': {
//     'Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'Fall Protection Training',
//       'Roof Safety Awareness',
//       'Harness Experience',
//       'Ladder Safety',
//       'Hot Work Awareness',
//       'Torch Work Experience',
//       'Heat Welding Experience',
//     ],
//     'Tools / Equipment': [
//       'Own Hand Tools',
//       'Roofing Hand Tools',
//       'Screw Gun / Drill',
//       'Utility Knives',
//       'Seam Probe',
//       'Hand Welder',
//       'Robotic Welder Experience',
//       'Torch Equipment Experience',
//       'Caulking Tools',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Ladder Work',
//       'Roof Hatch Access',
//       'Material Hoist Support',
//       'Crane / Material Staging Support',
//       'PPE',
//       'Hard Hat',
//       'Harness',
//       'Lanyard',
//       'Safety Glasses',
//       'Work Boots',
//     ],
//   },

//   // ============================================================
//   // General Labor / Site Support / Material Handling
//   // ============================================================
//   'General Labor / Site Support / Material Handling': {
//     'Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'Fall Protection',
//       'Fire Watch',
//       'Spotter',
//       'Forklift Certification',
//       'Scissor Lift Certification',
//       'Boom Lift Certification',
//     ],
//     'Tools / Equipment': [
//       'Utility Knife',
//       'Tape Measure',
//       'Broom / Shovel',
//       'Scraper',
//       'Basic Hand Tools',
//       'Pallet Jack Experience',
//       'Dolly / Material Cart Experience',
//       'Hard Hat',
//       'Safety Vest',
//       'Safety Glasses',
//       'Gloves',
//       'Work Boots',
//     ],
//   },

//   // ============================================================
//   // Demolition / Selective Demo / Abatement Support
//   // ============================================================
//   'Demolition / Selective Demo / Abatement Support': {
//     'Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'PPE Awareness',
//       'Silica Awareness',
//       'Respirator Use',
//       'Fit-Test Required',
//       'Dust-Control Experience',
//       'Asbestos Awareness',
//       'Lead Awareness',
//       'Mold Remediation Support',
//       'Abatement Certification',
//       'Containment Experience',
//     ],
//     'Tools / Equipment': [
//       'Demo Saw',
//       'Chipping Hammer',
//       'Jackhammer',
//       'Roto-Hammer',
//       'Floor Scraper',
//       'Grinder',
//       'HEPA Vacuum',
//       'HEPA Vacuum Experience',
//       'Trash Chute Support',
//       'Carts / Dollies',
//       'Hard Hat',
//       'Safety Glasses',
//       'Gloves',
//       'Hearing Protection',
//       'Dust Mask',
//     ],
//   },

//   // ============================================================
//   // Masonry / Stucco / EIFS Systems
//   // ============================================================
//   'Masonry / Stucco / EIFS Systems': {
//     'Safety / Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'Fall Protection',
//       'Silica Awareness',
//       'Scaffold Awareness',
//       'Respirator / Fit-Test',
//       'Lift Experience',
//       'Forklift / Telehandler Experience',
//       'Can Work at Heights',
//       'Can Work Exterior / Weather Conditions',
//       'Can Pass Background Check (if Required)',
//       'Secure-Site Eligible',
//     ],
//     'Tools / Equipment': [
//       'Own Basic Hand Tools',
//       'Grinder Experience',
//       'Mortar Boards / Pans',
//       'Stucco Tools',
//       'Masonry Trowel Tools',
//       'Masonry Saw Experience',
//       'Caulking Tools',
//       'Levels / Layout Tools',
//       'Mixer Experience',
//       'EIFS Tools',
//       'PPE',
//     ],
//   },

//   // ============================================================
//   // Structural Steel / Misc. Metals / Welding
//   // ============================================================
//   'Structural Steel / Misc. Metals / Welding': {
//     'Safety / Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'Fall Protection Training',
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Welding Certification',
//       'Hot Work Experience',
//       'Rigging / Signalperson Experience',
//       'Can Work Secure / Badged Site',
//     ],
//     'Tools / Equipment': [
//       'Own Hand Tools',
//       'Welding Hood / Basic Welding Gear',
//       'PPE',
//       'Harness / Fall Protection Gear',
//     ],
//   },

//   // ============================================================
//   // Carpentry / Rough Carpentry / Wood Framing / Blocking Systems
//   // ============================================================
//   'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems': {
//     'Safety / Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'Fall Protection Training',
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Powder-Actuated Tool Authorization / Experience',
//       'Saw / Power Tool Competency',
//       'Framing Nailer / Pneumatic Tool Experience',
//       'Plan Reading / Layout',
//       'Engineered Wood / Truss Experience',
//       'Fire-Retardant / Treated Lumber Experience',
//     ],
//     'Tools / Equipment': [
//       'Own Hand Tools',
//       'Own Power Tools',
//       'PPE',
//       'Hard Hat',
//       'Safety Glasses',
//       'Gloves',
//       'Hearing Protection',
//     ],
//   },

//   // ============================================================
//   // Millwork / Cabinets / Finish Carpentry
//   // ============================================================
//   'Millwork / Cabinets / Finish Carpentry': {
//     'Safety / Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Ladder / Scaffold Awareness',
//       'HEPA Vacuum / Dust-Control Experience',
//       'Plan / Shop-Drawing Reading',
//       'Occupied Healthcare / School Environment Experience',
//       'Clean-Work / Controlled-Area Experience',
//       'Can Work Secure / Badged Sites',
//       'Can Pass Background Check (if Required)',
//     ],
//     'Tools / Equipment': [
//       'Own Finish-Carpentry Hand Tools',
//       'Drill / Impact Tools',
//       'Laser / Level / Measuring Tools',
//       'Miter Saw / Circular Saw / Jigsaw',
//       'Router / Laminate Trimmer',
//       'Scribing / Templating Tools',
//       'Panel Saw / Table Saw / Edge-Bander / CNC',
//       'Hard Hat',
//       'Safety Glasses',
//       'Gloves',
//       'Hearing Protection',
//       'Dust Mask',
//     ],
//   },

//   // ============================================================
//   // Flooring / Tile / Resilient / Carpet Systems
//   // ============================================================
//   'Flooring / Tile / Resilient / Carpet Systems': {
//     'Safety / Certifications / Training': [
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Moisture-Testing Training',
//       'Manufacturer Certification / Approved Installer',
//       'Heat-Welding Experience',
//       'Large-Format / Gauged-Panel Handling',
//       'Epoxy / Resinous Chemical-System Experience',
//       'Terrazzo Experience',
//       'Polished-Concrete Equipment Experience',
//       'ICRA / Healthcare / Clean-Work Protocol',
//       'Occupied Building / Night-Shift Experience',
//       'Secure-Site / Badging Eligibility',
//     ],
//     'Tools / Equipment': [
//       'Own Flooring Hand Tools',
//       'Tile Saw / Grinder / Dust-Control Tools',
//       'Carpet Power Stretcher / Seaming Tools',
//       'Sheet-Vinyl Groover / Heat Welder',
//       'Floor Grinder / Shot Blaster / HEPA Vacuum',
//       'Valid Driver License / Reliable Transportation',
//     ],
//   },

//   // ============================================================
//   // Painting / Coatings / Wallcovering Systems
//   // ============================================================
//   'Painting / Coatings / Wallcovering Systems': {
//     'Safety / Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Fall Protection',
//       'Scaffold / Swing-Stage Experience',
//       'Respirator Use / Medical Clearance / Fit Test',
//       'Lead-Safe / RRP / Lead-Abatement Credential',
//       'HazCom / SDS / Solvent / Chemical Handling',
//       'ICRA / Healthcare Clean-Work Protocol',
//       'AMPP / SSPC / NACE Training or Certification',
//       'Manufacturer / Product-System Certification',
//       'Abrasive Blasting / Pressure Washing Experience',
//       'Confined-Space Awareness / Entry',
//     ],
//     'Tools / Equipment': [
//       'Own Brushes / Rollers / Basic Painter Tools',
//       'Airless Sprayer / HVLP / Conventional Spray Experience',
//       'Wallcovering Tools / Paste Machine',
//       'Sander / Vacuum Sander / Grinder / Needle Scaler',
//       'Wet-Film / Dry-Film Gauge',
//     ],
//   },

//   // ============================================================
//   // Doors / Frames / Hardware / Openings Systems
//   // ============================================================
//   'Doors / Frames / Hardware / Openings Systems': {
//     'Safety / Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'PPE Training / Awareness',
//       'Ladder / Scaffold Experience',
//       'Fall Protection',
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Hot-Work Permit',
//       'Welding Qualification',
//       'Powder-Actuated Tool Training',
//       'Silica Awareness',
//       'Manufacturer Training / Certification',
//       'Fire-Door Assembly Inspector Credential',
//       'Locksmith License / Registration',
//       'Low-Voltage / Electrical License or Credential',
//       'Fire-Shutter Training',
//       'ICRA / Healthcare Experience',
//       'Occupied Building Experience',
//       'School Experience',
//       'Secure Site Experience',
//       'Background / Badging Eligible',
//       'Public-Area Work Experience',
//       'Spring / Counterbalance Experience',
//       'Mechanical-Only Experience',
//       'Wiring / Termination / Programming Experience',
//       'Manufacturer Service Training',
//     ],
//     'Tools / Equipment': [
//       'Own Door Tools',
//       'Router / Mortiser',
//       'Magnetic Drill (Mag Drill)',
//       'Grinder',
//       'Door Cart',
//       'Material Lift',
//       'Specialty Lifting Equipment',
//       'Oversized / Heavy Doors',
//       'Team Lift',
//       'Lifting Plan',
//       'Specialty Rigging Support',
//     ],
//   },

//   // ============================================================
//   // Glass / Glazing / Storefront
//   // ============================================================
//   'Glass / Glazing / Storefront': {
//     'Safety / Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'PPE Training / Awareness',
//       'Cut-Resistant Gloves',
//       'Eye / Face Protection',
//       'Ladder / Scaffold Experience',
//       'Harness Use',
//       'Fall Protection Training',
//       'Suspended Scaffold Experience',
//       'Swing-Stage Experience',
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Mast Climber Experience',
//       'Scaffold Experience',
//       'Suspended Access Experience',
//       'Roof Rig Experience',
//       'Rigging Experience',
//       'Tag-Line Control',
//       'Hoist / Crane Coordination',
//       'AGMT or Equivalent Certification',
//       'Storefront / Curtain-Wall / Window System Training',
//       'Structural Silicone Training',
//       'Fire-Rated Glazing Experience',
//       'Security / Ballistic / Detention Glazing Experience',
//       'Smart Glass Experience',
//       'Automatic Entrance Interface Experience',
//       'Current Respirator Fit Test',
//       'Chemical / Dust Protection Training',
//       'Hot-Work Authorization',
//       'Aluminum / Metal Modification Experience',
//       'Welding Qualification',
//       'Healthcare / ICRA Experience',
//       'Occupied Retail Experience',
//       'Secure / Federal / Badged Site Experience',
//     ],
//     'Tools / Equipment': [
//       'Manual Suction Cups',
//       'Glass Cart',
//       'A-Frame',
//       'Vacuum Lifter',
//       'Powered Manipulator',
//       'Aluminum Saw',
//       'Punch / Drill / Router',
//       'Glass Cutting Table',
//       'Edger / Polisher',
//       'Glass Drill',
//       'Caulk Gun',
//       'Battery Caulk Gun',
//       'Glazing Tools',
//       'Gasket Tools',
//       'Setting Blocks',
//       'Sealant Tooling',
//     ],
//   },

//   // ============================================================
//   // Fire Protection / Sprinkler Systems
//   // ============================================================
//   'Fire Protection / Sprinkler Systems': {
//     'Safety / Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'PPE Training / Awareness',
//       'Ladder Safety',
//       'Housekeeping',
//       'Hazard Communication (HazCom)',
//       'Harness Use',
//       'Fall Protection Training',
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'High-Bay Work Experience',
//       'High-Rise Work Experience',
//       'Hot-Work Training',
//       'Fire Watch',
//       'Welding Process / Material Experience',
//       'Welder Qualification',
//       'Torch Cutting Experience',
//       'Forklift Experience',
//       'Telehandler Experience',
//       'Signalperson / Rigging Experience',
//       'Trench Awareness',
//       'Competent Person Status (if Verified)',
//       'Underground Pipe / Joint Training',
//       'Occupied Building Experience',
//       'Impairment / Fire-Watch Coordination',
//       'Hospital / School / Industrial Orientation',
//     ],
//     'Licenses / Certifications': [
//       'State / Local Sprinkler Fitter Card',
//       'Apprentice Card',
//       'Journeyman Card',
//       'Contractor / Company Sponsorship (where Applicable)',
//       'NICET Water-Based Systems Layout Certification',
//       'ITM Certification / License',
//       'Certified Backflow Tester',
//       'Backflow Repair Credential',
//       'CPVC Manufacturer Training',
//       'Flexible Hose System Training',
//       'Dry / Preaction Valve Training',
//       'Fire Pump Training',
//       'Specialty System Training',
//     ],
//     'Tools / Equipment': [
//       'Basic Hand Tools',
//       'Pipe Wrenches',
//       'Head Wrenches',
//       'Threader',
//       'Roll Groover',
//       'Cut Groover',
//       'Band Saw',
//       'Drill Press',
//       'Outlet Machine',
//       'Reamer',
//       'Chain Fall',
//       'Come-Along',
//       'Pipe Cart',
//     ],
//   },

//   // ============================================================
//   // Firestopping / Fireproofing / Joint Sealants
//   // ============================================================
//   'Firestopping / Fireproofing / Joint Sealants': {
//     'Safety / Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'PPE Training / Awareness',
//       'Hazard Communication (HazCom)',
//       'Housekeeping',
//       'Ladder Safety',
//       'Harness Use',
//       'Fall Protection Training',
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Scaffold User Experience',
//       'Swing-Stage Experience',
//       'High-Rise Perimeter Work Experience',
//       'Respirator Use',
//       'Medical Clearance',
//       'Respirator Fit Test',
//       'Ventilation Procedures',
//       'Silica Awareness',
//       'Overspray Control',
//       'Hot-Work Training',
//       'Fire Watch',
//       'Approved Abrasive Surface Preparation',
//       'ICRA Experience',
//       'Hospital Experience',
//       'Data Center Experience',
//       'Clean Work Experience',
//       'Dust / Odor Control',
//       'Night Work Experience',
//       'Secure Site Experience',
//       'Background Check Eligible',
//       'Badging Eligible',
//     ],
//     'Licenses / Certifications': [
//       'Firestop Product / System Certification',
//       'Perimeter Fire Containment System Certification',
//       'SFRM (Sprayed Fire-Resistive Material) Experience',
//       'Intumescent Coating Experience',
//       'Board / Blanket Fireproofing Experience',
//       'Sealant System Experience',
//       'Individual Qualified Installer Evidence',
//       'Company Qualified Contractor Program',
//       'ICC or Other Accepted Fireproofing / Firestop Inspector Credential',
//       'Manufacturer QA Certification',
//       'Special Inspection Role',
//     ],
//     'Tools / Equipment': [
//       'Caulk Gun',
//       'Bulk Gun',
//       'Trowels / Knives',
//       'Mineral Wool Tools',
//       'Backer Rod Tools',
//       'Cutting Tools',
//       'Mixer',
//       'Pump',
//       'Compressor',
//       'Hose',
//       'Nozzle',
//       'Spray Equipment',
//       'Powered Preparation Tools',
//       'Grinding Tools',
//       'Airless / Conventional Spray Equipment',
//       'Rollers / Brushes',
//       'Wet-Film Gauge',
//       'Dry-Film Gauge',
//       'Environmental Meters',
//       'Depth / Annular Space Tools',
//       'Joint Gauges',
//       'Thickness Pins / Gauges',
//     ],
//   },

//   // ============================================================
//   // Low Voltage / Data / Security / Fire Alarm
//   // ============================================================
//   'Low Voltage / Data / Security / Fire Alarm': {
//     'Safety / Certifications / Training': [
//       'OSHA 10',
//       'OSHA 30',
//       'Site Orientation',
//       'Lift Training',
//       'Aerial Lift Training',
//       'Fall Protection Training',
//       'Ladder Training',
//       'Swing-Stage Training',
//       'Fiber Safety',
//       'Laser Awareness',
//       'Shard Disposal Procedures',
//       'Eye Protection',
//       'Confined Space Training',
//       'Manhole Safety',
//       'Traffic Safety',
//       'OSP (Outside Plant) Safety',
//       'ICRA Training',
//       'Infection Control',
//       'Healthcare Orientation',
//       'Secure-Site Access',
//       'Background Check Eligible',
//       'Badging Eligible',
//     ],
//     'Licenses / Certifications': [
//       'Local Limited-Energy License',
//       'Low-Voltage License',
//       'Alarm License',
//       'Security License',
//       'Fire Alarm License',
//       'NICET Fire Alarm Systems',
//       'NICET Inspection & Testing of Fire Alarm Systems',
//       'BICSI Installer 1',
//       'BICSI Installer 2 - Copper',
//       'BICSI Installer 2 - Fiber',
//       'BICSI Technician',
//       'BICSI RCDD',
//       'AVIXA CTS',
//       'AVIXA CTS-I',
//       'AVIXA CTS-D',
//       'Manufacturer Training',
//       'Manufacturer Certification',
//       'Inspection Authorization',
//     ],
//     'Tools / Test Equipment': [
//       'Fire Alarm Test Equipment',
//       'Copper Certification Test Equipment',
//       'Fiber Certification Test Equipment',
//       'Fusion Splicer',
//       'Cleaver',
//       'Inspection Scope',
//       'OTDR',
//       'RF Test Equipment',
//       'PIM Test Equipment',
//       'Sweep Test Equipment',
//       'Grid Test Equipment',
//     ],
//   },

//   // ============================================================
//   // Division 10 Specialties / Accessories / Signage Systems
//   // ============================================================
//   'Division 10 Specialties / Accessories / Signage Systems': {
//     'Safety / Certifications / Training': [
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Rolling Scaffold Experience',
//       'Ladder Safety / Experience',
//       'High-Ceiling Work Experience',
//     ],
//     'Tools / Equipment': [
//       'Tape Measure',
//       'Level',
//       'Laser Level',
//       'Square',
//       'Measuring Tools',
//       'Hand Tools',
//       'Drills / Drivers',
//       'Bits',
//       'Anchors',
//       'Hammer Drill',
//       'Rotary Hammer',
//       'Concrete / Masonry Bits',
//       'Toggle / Expansion Anchors',
//       'Rivnuts',
//       'Specialty Fasteners',
//       'Rivet Tools',
//       'Nut Drivers',
//       'Impact Drivers',
//       'Specialty Bits',
//       'Shims',
//       'Clamps',
//       'Panel Supports',
//       'Jigsaw',
//       'Circular Saw',
//       'Miter Saw',
//       'Laminate / Phenolic Blades',
//       'Metal Cutting Tools',
//       'Shears',
//       'Deburring Tools',
//       'Standoffs / Pin Tools',
//       'Adhesive Systems',
//       'Clean Mounting Tools',
//       'Adhesive Tools',
//       'Rollers',
//       'Heat-Weld Equipment (where Applicable)',
//       'Cutters',
//       'Trim Tools',
//       'Track / Panel Adjustment Tools',
//       'Seal Adjustment Tools',
//       'Hardware / Service Tools',
//       'Manufacturer-Specific Tools',
//     ],
//     'Material Handling': [
//       'Ladders',
//       'Panel Carts',
//       'Board / Glass Handling Equipment',
//       'Hoists',
//       'Suction Devices',
//       'Flagpole Rigging',
//       'Team Lifts',
//     ],
//   },

//   // ============================================================
//   // Equipment / Specialty Installations / Owner-Furnished Equipment Systems
//   // ============================================================
//   'Equipment / Specialty Installations / Owner-Furnished Equipment Systems': {
//     'Safety / Certifications / Training': [
//       'Lift Certification',
//       'Scissor Lift Experience',
//       'Boom Lift Experience',
//       'Mast Lift Experience',
//       'Ladder Safety / Experience',
//       'Fall Protection',
//       'Roof / High-Access Work Experience',
//       'Lift Plan Familiarity',
//       'Fire-Watch Awareness',
//       'Shop-Drawing Reading',
//     ],
//     'Tools / Equipment': [
//       'Hand Tools',
//       'Drills',
//       'Impact Drivers',
//       'Sockets',
//       'Levels',
//       'Laser Level',
//       'Transit',
//       'Digital Level',
//       'Plumb Tools',
//       'Tape Measure',
//       'Field Measurement Tools',
//       'Measuring Tools',
//       'Torque Tools',
//       'Torque Wrench',
//       'Manufacturer-Specific Tools',
//       'Rotary Hammer',
//       'Core Drill',
//       'Adhesive Anchor Tools',
//       'Mechanical Anchors',
//       'Dust Control Equipment',
//       'Laser Alignment Tools',
//       'Dial Indicators',
//       'Precision Level',
//       'Feeler Gauges',
//       'Shim Packs',
//       'Coupling Tools',
//       'Grinder',
//       'Torch',
//       'Welding Equipment',
//       'Brazing Tools',
//       'Manufacturer Diagnostic Tools',
//       'Mechanical Gauges',
//     ],
//     'Material Handling & Lifting': [
//       'Slings',
//       'Shackles',
//       'Chain Fall',
//       'Gantry',
//       'Hoist',
//       'Jacks',
//       'Skates',
//       'Cribbing',
//       'Signal Equipment',
//       'Pallet Jack',
//       'Forklift',
//       'Telehandler',
//       'Reach Forklift',
//       'Powered Tug',
//       'Lift Gate',
//     ],
//     'Documentation & Service': [
//       'Torque Records',
//       'Service Laptop / Tablet',
//       'Parts Tracking',
//       'Camera',
//       'Barcode / Serial Capture',
//       'Punch App',
//       'Room / Equipment List',
//       'As-Built Documentation',
//     ],
//   },
// }

// // ✅ Heavy Equipment lists (separate block for Civil)
// const HEAVY_EQUIPMENT_TYPES = [
//   'Skid Steer',
//   'Mini Excavator',
//   'Excavator',
//   'Backhoe',
//   'Dozer',
//   'Front Loader / Wheel Loader',
//   'Roller / Compactor',
//   'Motor Grader',
//   'Trencher',
//   'Forklift / Telehandler',
//   'Water Truck',
//   'Dump Truck support / CDL if applicable'
// ]

// const HEAVY_EQUIPMENT_TASKS = [
//   'Rough grade',
//   'Fine grade',
//   'Excavate trenches',
//   'Load trucks',
//   'Backfill trenches',
//   'Compact soil/base',
//   'Move materials',
//   'Spread base material',
//   'Work near utilities',
//   'Finish grade support',
//   'Operate safely around crews',
//   'Read plans/basic stakes'
// ]

// // ============================================================
// // Helper function to get tool sections
// // ============================================================
// const getToolSections = (trade) => {
//   return TOOLS_CERTIFICATIONS[trade] || {}
// }

// // ============================================================
// // COMPONENT - WizardStep3 (Certifications & Requirements)
// // ============================================================
// export function WizardStep3({ data, onChange, onNext, onBack }) {
//   const { t } = useTranslation()

//   // ✅ State for tools and certifications - read from data prop
//   const [toolsCertifications, setToolsCertifications] = useState(() => {
//     if (data?.toolsCertifications) {
//       return data.toolsCertifications
//     }
//     return {}
//   })

//   // ✅ State for heavy equipment operation (separate block for Civil)
//   const [heavyEquipment, setHeavyEquipment] = useState(() => {
//     if (data?.heavyEquipment) {
//       return data.heavyEquipment
//     }
//     return {}
//   })

//   // ✅ Handle tools/certifications toggle
//   const handleToolToggle = (tool) => (e) => {
//     const isChecked = e.target.checked
//     const updated = { ...toolsCertifications, [tool]: isChecked }
//     setToolsCertifications(updated)
//     onChange({ toolsCertifications: updated })
//   }

//   // ✅ Handle heavy equipment toggle (separate block for Civil)
//   const handleHeavyEquipmentToggle = (skill) => (e) => {
//     const isChecked = e.target.checked
//     const updated = { ...heavyEquipment, [skill]: isChecked }
//     setHeavyEquipment(updated)
//     onChange({ heavyEquipment: updated })
//   }

//   const selectedTrade = data?.mainTrade || ''
//   const sections = getToolSections(selectedTrade)
//   const sectionKeys = Object.keys(sections)
//   const showToolsSection = selectedTrade !== '' && sectionKeys.length > 0
//   const isCivil = selectedTrade === 'Civil / Sitework / Earthwork / Utilities'

//   // ✅ Count selected items
//   const selectedCount = Object.values(toolsCertifications).filter(v => v === true).length
//   const totalItems = Object.keys(toolsCertifications).length

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           {/* ✅ Selected Trade Badge */}
//           {selectedTrade && (
//             <div style={{
//               display: 'inline-block',
//               padding: '4px 16px',
//               background: 'rgba(15, 78, 169, 0.08)',
//               border: '1px solid rgba(15, 78, 169, 0.15)',
//               borderRadius: '20px',
//               fontSize: '13px',
//               fontWeight: 500,
//               color: '#0f4ea9',
//               marginBottom: '16px',
//             }}>
//               📋 {selectedTrade}
//             </div>
//           )}

//           {/* ✅ Heavy Equipment Operation Section - Separate Block for Civil */}
//           {isCivil && (
//             <div style={{ marginBottom: '24px' }}>
//               <div style={{
//                 fontSize: '14px',
//                 fontWeight: 600,
//                 color: '#17263a',
//                 marginBottom: '4px',
//               }}>
//                 🚜 Heavy Equipment Operation
//               </div>
//               <div style={{
//                 fontSize: '13px',
//                 color: 'rgba(23, 38, 58, 0.6)',
//                 marginBottom: '12px',
//               }}>
//                 Select the heavy equipment you are qualified to operate
//               </div>

//               {/* Equipment Type Checklist */}
//               <div style={{
//                 marginBottom: '16px',
//                 padding: '16px 20px',
//                 border: '1px solid rgba(15, 78, 169, 0.2)',
//                 borderRadius: '8px',
//                 background: 'rgba(15, 78, 169, 0.02)',
//               }}>
//                 <div style={{
//                   fontSize: '13px',
//                   fontWeight: 600,
//                   color: '#0f4ea9',
//                   marginBottom: '12px',
//                 }}>
//                   Equipment Type Checklist
//                 </div>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr 1fr',
//                   gap: '6px 16px',
//                 }}>
//                   {HEAVY_EQUIPMENT_TYPES.map((skill) => (
//                     <label key={skill} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '8px',
//                       cursor: 'pointer',
//                       fontSize: '13px',
//                       color: '#17263a',
//                       padding: '4px 0',
//                     }}>
//                       <input
//                         type="checkbox"
//                         checked={!!(heavyEquipment?.[skill] || false)}
//                         onChange={handleHeavyEquipmentToggle(skill)}
//                       />
//                       {skill}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Equipment Operation Task Capabilities */}
//               <div style={{
//                 padding: '16px 20px',
//                 border: '1px solid rgba(15, 78, 169, 0.2)',
//                 borderRadius: '8px',
//                 background: 'rgba(15, 78, 169, 0.02)',
//               }}>
//                 <div style={{
//                   fontSize: '13px',
//                   fontWeight: 600,
//                   color: '#0f4ea9',
//                   marginBottom: '12px',
//                 }}>
//                   Equipment Operation Task Capabilities
//                 </div>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr 1fr',
//                   gap: '6px 16px',
//                 }}>
//                   {HEAVY_EQUIPMENT_TASKS.map((skill) => (
//                     <label key={skill} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '8px',
//                       cursor: 'pointer',
//                       fontSize: '13px',
//                       color: '#17263a',
//                       padding: '4px 0',
//                     }}>
//                       <input
//                         type="checkbox"
//                         checked={!!(heavyEquipment?.[skill] || false)}
//                         onChange={handleHeavyEquipmentToggle(skill)}
//                       />
//                       {skill}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Heavy Equipment Summary */}
//               {Object.values(heavyEquipment).some(v => v === true) && (
//                 <div style={{
//                   marginTop: '12px',
//                   padding: '10px 16px',
//                   background: 'rgba(47, 180, 99, 0.06)',
//                   border: '1px solid rgba(47, 180, 99, 0.2)',
//                   borderRadius: '8px',
//                   fontSize: '13px',
//                   color: '#17263a',
//                 }}>
//                   <strong style={{ color: '#2fb463' }}>
//                     {Object.values(heavyEquipment).filter(v => v === true).length}
//                   </strong>
//                   {' '}heavy equipment item{Object.values(heavyEquipment).filter(v => v === true).length !== 1 ? 's' : ''} selected
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ✅ Tools, Certifications, and Requirements Section with Headers */}
//           {showToolsSection ? (
//             <>
//               <div style={{
//                 fontSize: '14px',
//                 fontWeight: 600,
//                 color: '#17263a',
//                 marginBottom: '12px',
//               }}>
//                 Tools, Certifications & Licenses
//               </div>
              
//               {sectionKeys.map((sectionKey) => (
//                 <div key={sectionKey} style={{ marginBottom: '20px' }}>
//                   <div style={{
//                     fontSize: '13px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     marginBottom: '8px',
//                     paddingBottom: '4px',
//                     borderBottom: '1px solid rgba(15, 78, 169, 0.15)',
//                   }}>
//                     {sectionKey}
//                     <span style={{
//                       fontSize: '11px',
//                       fontWeight: 400,
//                       color: 'rgba(23, 38, 58, 0.4)',
//                       marginLeft: '8px',
//                     }}>
//                       ({sections[sectionKey].length})
//                     </span>
//                   </div>
//                   <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: '1fr 1fr 1fr',
//                     gap: '6px 16px',
//                     padding: '12px 16px',
//                     border: '1px solid rgba(18, 38, 63, 0.06)',
//                     borderRadius: '8px',
//                     background: 'rgba(15, 78, 169, 0.02)',
//                   }}>
//                     {sections[sectionKey].map((tool) => (
//                       <label key={tool} style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         cursor: 'pointer',
//                         fontSize: '13px',
//                         color: '#17263a',
//                         padding: '4px 0',
//                       }}>
//                         <input
//                           type="checkbox"
//                           checked={!!(toolsCertifications[tool] || false)}
//                           onChange={handleToolToggle(tool)}
//                         />
//                         {tool}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               ))}

//               {/* ✅ Summary of selected items */}
//               <div style={{
//                 marginTop: '16px',
//                 padding: '12px 16px',
//                 background: selectedCount > 0 ? 'rgba(47, 180, 99, 0.06)' : 'rgba(23, 38, 58, 0.04)',
//                 border: selectedCount > 0 ? '1px solid rgba(47, 180, 99, 0.2)' : '1px solid rgba(23, 38, 58, 0.06)',
//                 borderRadius: '8px',
//                 fontSize: '13px',
//                 color: '#17263a',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//                 <span>
//                   {selectedCount > 0 ? '✅' : '📋'} 
//                   {' '}
//                   <strong>{selectedCount}</strong> item{selectedCount !== 1 ? 's' : ''} selected
//                 </span>
//                 {selectedCount > 0 && totalItems > 0 && (
//                   <span style={{ fontSize: '12px', color: '#2fb463' }}>
//                     {Math.round((selectedCount / totalItems) * 100)}% complete
//                   </span>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div style={{
//               padding: '40px 20px',
//               textAlign: 'center',
//               border: '1px dashed rgba(18, 38, 63, 0.12)',
//               borderRadius: '8px',
//               color: 'rgba(23, 38, 58, 0.4)',
//               fontSize: '14px',
//             }}>
//               {selectedTrade 
//                 ? 'No tools or certifications defined for this trade yet.'
//                 : '← Please select a trade in the previous step first'}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WizardStep3









// src/worker/components/wizard-steps/WizardStep3.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// ✅ Tools and Certifications by Trade with Section Headers from PDF
// Note: Tool names are kept as-is since they are technical terms
// Only UI labels are translated
const TOOLS_CERTIFICATIONS = {
  // ============================================================
  // HVAC/Mechanical
  // ============================================================
  'HVAC/Mechanical': {
    'certificationsTraining': [
      'EPA 608 Universal',
      'EPA 608 Type I',
      'EPA 608 Type II',
      'EPA 608 Type III',
      'OSHA 10',
      'OSHA 30',
      'Lift certification',
      'Fall protection training',
      'Hot work / brazing experience',
      'Confined space awareness',
      'First aid / CPR',
      'Other certification - optional note',
    ],
    'toolsEquipment': [
      'Own basic hand tools',
      'Own power tools',
      'Tin snips / sheet metal tools',
      'Cordless drill / impact',
      'Multimeter',
      'Refrigerant gauges',
      'Vacuum pump',
      'Recovery machine',
      'Brazing tools',
      'Manometer',
      'Ladders',
      'PPE available',
    ],
  },

  // ============================================================
  // Electrical / Power
  // ============================================================
  'Electrical / Power': {
    'certificationsTrainingLicenses': [
      'Electrical apprentice card / registration',
      'Journeyman electrician license',
      'Master electrician license',
      'Lift certification',
      'OSHA 10',
      'OSHA 30',
      'Fall protection training',
      'NFPA 70E / electrical safety training',
      'Lockout/Tagout awareness',
    ],
    'toolsEquipment': [
      'Own basic hand tools',
      'Own Cordless tools',
      'Conduit bender',
      'Fish tape',
      'Multimeter',
      'Label maker',
      'Electrical tool bag',
      'Ladders',
      'PPE available',
    ],
  },

  // ============================================================
  // Plumbing / Piping
  // ============================================================
  'Plumbing / Piping': {
    'certificationsTrainingLicenses': [
      'Plumbing License',
      'Apprentice Card',
      'Journeyman Card',
      'Backflow Certification',
      'Medical Gas Certification',
      'Gas Piping Qualification',
      'OSHA 10',
      'OSHA 30',
      'Confined Space Awareness',
      'Hot Work Awareness',
      'Trench Safety Awareness',
      'Hospital / Healthcare Experience',
    ],
    'toolsEquipment': [
      'Lift Experience',
      'Own Basic Hand Tools',
      'Pipe Wrenches',
      'PEX Tools',
      'Copper Tools',
      'Threading Tools',
      'Press Tool Experience',
      'Power Tools',
      'PPE Available',
    ],
  },

  // ============================================================
  // Interiors
  // ============================================================
  'Interiors': {
    'certificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Fall Protection Training',
      'Ladder Safety',
    ],
    'toolsEquipment': [
      'Own Basic Hand Tools',
      'Own Power Tools',
      'Drywall Tools',
      'Metal Framing Tools',
      'Finish Carpentry Tools',
      'Screw Gun / Drill',
      'Utility Knife',
      'Tape Measure',
      'Level / Laser Level',
      'Chalk Line',
      'Drywall T-Square',
      'Rasp / Surform Tool',
      'Drywall Saw / Keyhole Saw',
      'Sandpaper / Sanding Block',
      'Joint Compound Tools (tapes, knives, mud pans)',
      'Corner Bead Tools',
      'Stilts / Drywall Stilts Experience',
      'Banjo / Automatic Taper',
      'Rotary Cut-Out Tool',
      'Drywall Lift / Hoist Experience',
      'Panel Cart / Material Cart',
      'PPE Available',
      'Reliable Transportation',
      'Valid Driver License',
    ],
  },

  // ============================================================
  // Concrete / Formwork / Rebar / Flatwork
  // ============================================================
  'Concrete / Formwork / Rebar / Flatwork': {
    'certificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'Silica Awareness',
      'Fall Protection',
      'Confined Space Awareness',
      'Trench Safety Awareness',
      'Hot Work Awareness',
    ],
    'toolsEquipment': [
      'Lift Experience',
      'Own Basic Hand Tools',
      'Concrete Finishing Tools',
      'Bull Float Experience',
      'Power Trowel Experience',
      'Concrete Saw Experience',
      'Core Drill Experience',
      'Laser Level Experience',
      'Vibrator Experience',
      'PPE',
      'Hard Hat',
      'Safety Vest',
      'Work Boots',
    ],
  },

  // ============================================================
  // Asphalt / Paving Work
  // ============================================================
  'Asphalt / Paving Work': {
    'certificationsTrainingLicenses': [
      'OSHA 10',
      'OSHA 30',
      'Traffic Control Awareness',
      'Flagger Certification',
      'Work Zone Safety',
      'Hot Work / Heat Exposure Experience',
      'First Aid / CPR',
      'Valid Driver License',
      'CDL',
      'Equipment Card / Certification',
    ],
    'toolsEquipment': [
      'Has PPE',
      'High-Vis Vest / Clothing',
      'Work Boots',
      'Hard Hat',
      'Asphalt Hand Tools',
      'Rake / Lute Tools',
      'Sealcoat Tools',
      'Striping Layout Tools',
      'Can work around traffic',
      'Can work in heat',
      'Can work nights',
      'Can work weekends',
    ],
  },

  // ============================================================
  // Civil / Sitework / Earthwork / Utilities
  // ============================================================
  'Civil / Sitework / Earthwork / Utilities': {
    'certificationsTrainingLicenses': [
      'OSHA 10',
      'OSHA 30',
      'Trench Safety Awareness',
      'Competent Person - Trenching',
      'Flagger Certification',
      'Confined Space Awareness',
      'First Aid / CPR',
      'Valid Driver License',
      'CDL',
      'Equipment Certification / Card',
    ],
    'toolsEquipment': [
      'Has PPE',
      'Work Boots',
      'Hard Hat',
      'Safety Vest',
      'Own Hand Tools',
      'Can work outdoors',
      'Can work around heavy equipment',
      'Can work in heat/cold',
      'Can pass background check',
    ],
  },

  // ============================================================
  // Landscaping / Exterior Improvements
  // ============================================================
  'Landscaping / Exterior Improvements': {
    'certificationsTraining': [
      'OSHA 10',
      'First Aid (Optional)',
    ],
    'toolsEquipment': [
      'Own Basic Hand Tools',
      'Shovel / Rake / Wheelbarrow / Pruners / Landscape Hand Tools',
      'Mower',
      'String Trimmer',
      'Blower',
      'Plate Compactor',
      'Sod Roller',
      'Small Paver Tools',
      'Cut-Off Saw Experience',
      'Post Hole Digger',
      'Fence Stretcher',
      'Basic Hardware Tools',
      'Trenching Tools',
      'Basic Irrigation Repair Tools',
      'Has PPE',
      'Outdoor work experience',
      'Heat/weather tolerance',
    ],
  },

  // ============================================================
  // Roofing / Waterproofing
  // ============================================================
  'Roofing / Waterproofing': {
    'certificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'Fall Protection Training',
      'Roof Safety Awareness',
      'Harness Experience',
      'Ladder Safety',
      'Hot Work Awareness',
      'Torch Work Experience',
      'Heat Welding Experience',
    ],
    'toolsEquipment': [
      'Own Hand Tools',
      'Roofing Hand Tools',
      'Screw Gun / Drill',
      'Utility Knives',
      'Seam Probe',
      'Hand Welder',
      'Robotic Welder Experience',
      'Torch Equipment Experience',
      'Caulking Tools',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Ladder Work',
      'Roof Hatch Access',
      'Material Hoist Support',
      'Crane / Material Staging Support',
      'PPE',
      'Hard Hat',
      'Harness',
      'Lanyard',
      'Safety Glasses',
      'Work Boots',
    ],
  },

  // ============================================================
  // General Labor / Site Support / Material Handling
  // ============================================================
  'General Labor / Site Support / Material Handling': {
    'certificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'Fall Protection',
      'Fire Watch',
      'Spotter',
      'Forklift Certification',
      'Scissor Lift Certification',
      'Boom Lift Certification',
    ],
    'toolsEquipment': [
      'Utility Knife',
      'Tape Measure',
      'Broom / Shovel',
      'Scraper',
      'Basic Hand Tools',
      'Pallet Jack Experience',
      'Dolly / Material Cart Experience',
      'Hard Hat',
      'Safety Vest',
      'Safety Glasses',
      'Gloves',
      'Work Boots',
    ],
  },

  // ============================================================
  // Demolition / Selective Demo / Abatement Support
  // ============================================================
  'Demolition / Selective Demo / Abatement Support': {
    'certificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'PPE Awareness',
      'Silica Awareness',
      'Respirator Use',
      'Fit-Test Required',
      'Dust-Control Experience',
      'Asbestos Awareness',
      'Lead Awareness',
      'Mold Remediation Support',
      'Abatement Certification',
      'Containment Experience',
    ],
    'toolsEquipment': [
      'Demo Saw',
      'Chipping Hammer',
      'Jackhammer',
      'Roto-Hammer',
      'Floor Scraper',
      'Grinder',
      'HEPA Vacuum',
      'HEPA Vacuum Experience',
      'Trash Chute Support',
      'Carts / Dollies',
      'Hard Hat',
      'Safety Glasses',
      'Gloves',
      'Hearing Protection',
      'Dust Mask',
    ],
  },

  // ============================================================
  // Masonry / Stucco / EIFS Systems
  // ============================================================
  'Masonry / Stucco / EIFS Systems': {
    'safetyCertificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'Fall Protection',
      'Silica Awareness',
      'Scaffold Awareness',
      'Respirator / Fit-Test',
      'Lift Experience',
      'Forklift / Telehandler Experience',
      'Can Work at Heights',
      'Can Work Exterior / Weather Conditions',
      'Can Pass Background Check (if Required)',
      'Secure-Site Eligible',
    ],
    'toolsEquipment': [
      'Own Basic Hand Tools',
      'Grinder Experience',
      'Mortar Boards / Pans',
      'Stucco Tools',
      'Masonry Trowel Tools',
      'Masonry Saw Experience',
      'Caulking Tools',
      'Levels / Layout Tools',
      'Mixer Experience',
      'EIFS Tools',
      'PPE',
    ],
  },

  // ============================================================
  // Structural Steel / Misc. Metals / Welding
  // ============================================================
  'Structural Steel / Misc. Metals / Welding': {
    'safetyCertificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'Fall Protection Training',
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Welding Certification',
      'Hot Work Experience',
      'Rigging / Signalperson Experience',
      'Can Work Secure / Badged Site',
    ],
    'toolsEquipment': [
      'Own Hand Tools',
      'Welding Hood / Basic Welding Gear',
      'PPE',
      'Harness / Fall Protection Gear',
    ],
  },

  // ============================================================
  // Carpentry / Rough Carpentry / Wood Framing / Blocking Systems
  // ============================================================
  'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems': {
    'safetyCertificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'Fall Protection Training',
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Powder-Actuated Tool Authorization / Experience',
      'Saw / Power Tool Competency',
      'Framing Nailer / Pneumatic Tool Experience',
      'Plan Reading / Layout',
      'Engineered Wood / Truss Experience',
      'Fire-Retardant / Treated Lumber Experience',
    ],
    'toolsEquipment': [
      'Own Hand Tools',
      'Own Power Tools',
      'PPE',
      'Hard Hat',
      'Safety Glasses',
      'Gloves',
      'Hearing Protection',
    ],
  },

  // ============================================================
  // Millwork / Cabinets / Finish Carpentry
  // ============================================================
  'Millwork / Cabinets / Finish Carpentry': {
    'safetyCertificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Ladder / Scaffold Awareness',
      'HEPA Vacuum / Dust-Control Experience',
      'Plan / Shop-Drawing Reading',
      'Occupied Healthcare / School Environment Experience',
      'Clean-Work / Controlled-Area Experience',
      'Can Work Secure / Badged Sites',
      'Can Pass Background Check (if Required)',
    ],
    'toolsEquipment': [
      'Own Finish-Carpentry Hand Tools',
      'Drill / Impact Tools',
      'Laser / Level / Measuring Tools',
      'Miter Saw / Circular Saw / Jigsaw',
      'Router / Laminate Trimmer',
      'Scribing / Templating Tools',
      'Panel Saw / Table Saw / Edge-Bander / CNC',
      'Hard Hat',
      'Safety Glasses',
      'Gloves',
      'Hearing Protection',
      'Dust Mask',
    ],
  },

  // ============================================================
  // Flooring / Tile / Resilient / Carpet Systems
  // ============================================================
  'Flooring / Tile / Resilient / Carpet Systems': {
    'safetyCertificationsTraining': [
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Moisture-Testing Training',
      'Manufacturer Certification / Approved Installer',
      'Heat-Welding Experience',
      'Large-Format / Gauged-Panel Handling',
      'Epoxy / Resinous Chemical-System Experience',
      'Terrazzo Experience',
      'Polished-Concrete Equipment Experience',
      'ICRA / Healthcare / Clean-Work Protocol',
      'Occupied Building / Night-Shift Experience',
      'Secure-Site / Badging Eligibility',
    ],
    'toolsEquipment': [
      'Own Flooring Hand Tools',
      'Tile Saw / Grinder / Dust-Control Tools',
      'Carpet Power Stretcher / Seaming Tools',
      'Sheet-Vinyl Groover / Heat Welder',
      'Floor Grinder / Shot Blaster / HEPA Vacuum',
      'Valid Driver License / Reliable Transportation',
    ],
  },

  // ============================================================
  // Painting / Coatings / Wallcovering Systems
  // ============================================================
  'Painting / Coatings / Wallcovering Systems': {
    'safetyCertificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Fall Protection',
      'Scaffold / Swing-Stage Experience',
      'Respirator Use / Medical Clearance / Fit Test',
      'Lead-Safe / RRP / Lead-Abatement Credential',
      'HazCom / SDS / Solvent / Chemical Handling',
      'ICRA / Healthcare Clean-Work Protocol',
      'AMPP / SSPC / NACE Training or Certification',
      'Manufacturer / Product-System Certification',
      'Abrasive Blasting / Pressure Washing Experience',
      'Confined-Space Awareness / Entry',
    ],
    'toolsEquipment': [
      'Own Brushes / Rollers / Basic Painter Tools',
      'Airless Sprayer / HVLP / Conventional Spray Experience',
      'Wallcovering Tools / Paste Machine',
      'Sander / Vacuum Sander / Grinder / Needle Scaler',
      'Wet-Film / Dry-Film Gauge',
    ],
  },

  // ============================================================
  // Doors / Frames / Hardware / Openings Systems
  // ============================================================
  'Doors / Frames / Hardware / Openings Systems': {
    'safetyCertificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'PPE Training / Awareness',
      'Ladder / Scaffold Experience',
      'Fall Protection',
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Hot-Work Permit',
      'Welding Qualification',
      'Powder-Actuated Tool Training',
      'Silica Awareness',
      'Manufacturer Training / Certification',
      'Fire-Door Assembly Inspector Credential',
      'Locksmith License / Registration',
      'Low-Voltage / Electrical License or Credential',
      'Fire-Shutter Training',
      'ICRA / Healthcare Experience',
      'Occupied Building Experience',
      'School Experience',
      'Secure Site Experience',
      'Background / Badging Eligible',
      'Public-Area Work Experience',
      'Spring / Counterbalance Experience',
      'Mechanical-Only Experience',
      'Wiring / Termination / Programming Experience',
      'Manufacturer Service Training',
    ],
    'toolsEquipment': [
      'Own Door Tools',
      'Router / Mortiser',
      'Magnetic Drill (Mag Drill)',
      'Grinder',
      'Door Cart',
      'Material Lift',
      'Specialty Lifting Equipment',
      'Oversized / Heavy Doors',
      'Team Lift',
      'Lifting Plan',
      'Specialty Rigging Support',
    ],
  },

  // ============================================================
  // Glass / Glazing / Storefront
  // ============================================================
  'Glass / Glazing / Storefront': {
    'safetyCertificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'PPE Training / Awareness',
      'Cut-Resistant Gloves',
      'Eye / Face Protection',
      'Ladder / Scaffold Experience',
      'Harness Use',
      'Fall Protection Training',
      'Suspended Scaffold Experience',
      'Swing-Stage Experience',
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Mast Climber Experience',
      'Scaffold Experience',
      'Suspended Access Experience',
      'Roof Rig Experience',
      'Rigging Experience',
      'Tag-Line Control',
      'Hoist / Crane Coordination',
      'AGMT or Equivalent Certification',
      'Storefront / Curtain-Wall / Window System Training',
      'Structural Silicone Training',
      'Fire-Rated Glazing Experience',
      'Security / Ballistic / Detention Glazing Experience',
      'Smart Glass Experience',
      'Automatic Entrance Interface Experience',
      'Current Respirator Fit Test',
      'Chemical / Dust Protection Training',
      'Hot-Work Authorization',
      'Aluminum / Metal Modification Experience',
      'Welding Qualification',
      'Healthcare / ICRA Experience',
      'Occupied Retail Experience',
      'Secure / Federal / Badged Site Experience',
    ],
    'toolsEquipment': [
      'Manual Suction Cups',
      'Glass Cart',
      'A-Frame',
      'Vacuum Lifter',
      'Powered Manipulator',
      'Aluminum Saw',
      'Punch / Drill / Router',
      'Glass Cutting Table',
      'Edger / Polisher',
      'Glass Drill',
      'Caulk Gun',
      'Battery Caulk Gun',
      'Glazing Tools',
      'Gasket Tools',
      'Setting Blocks',
      'Sealant Tooling',
    ],
  },

  // ============================================================
  // Fire Protection / Sprinkler Systems
  // ============================================================
  'Fire Protection / Sprinkler Systems': {
    'safetyCertificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'PPE Training / Awareness',
      'Ladder Safety',
      'Housekeeping',
      'Hazard Communication (HazCom)',
      'Harness Use',
      'Fall Protection Training',
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'High-Bay Work Experience',
      'High-Rise Work Experience',
      'Hot-Work Training',
      'Fire Watch',
      'Welding Process / Material Experience',
      'Welder Qualification',
      'Torch Cutting Experience',
      'Forklift Experience',
      'Telehandler Experience',
      'Signalperson / Rigging Experience',
      'Trench Awareness',
      'Competent Person Status (if Verified)',
      'Underground Pipe / Joint Training',
      'Occupied Building Experience',
      'Impairment / Fire-Watch Coordination',
      'Hospital / School / Industrial Orientation',
    ],
    'licensesCertifications': [
      'State / Local Sprinkler Fitter Card',
      'Apprentice Card',
      'Journeyman Card',
      'Contractor / Company Sponsorship (where Applicable)',
      'NICET Water-Based Systems Layout Certification',
      'ITM Certification / License',
      'Certified Backflow Tester',
      'Backflow Repair Credential',
      'CPVC Manufacturer Training',
      'Flexible Hose System Training',
      'Dry / Preaction Valve Training',
      'Fire Pump Training',
      'Specialty System Training',
    ],
    'toolsEquipment': [
      'Basic Hand Tools',
      'Pipe Wrenches',
      'Head Wrenches',
      'Threader',
      'Roll Groover',
      'Cut Groover',
      'Band Saw',
      'Drill Press',
      'Outlet Machine',
      'Reamer',
      'Chain Fall',
      'Come-Along',
      'Pipe Cart',
    ],
  },

  // ============================================================
  // Firestopping / Fireproofing / Joint Sealants
  // ============================================================
  'Firestopping / Fireproofing / Joint Sealants': {
    'safetyCertificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'PPE Training / Awareness',
      'Hazard Communication (HazCom)',
      'Housekeeping',
      'Ladder Safety',
      'Harness Use',
      'Fall Protection Training',
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Scaffold User Experience',
      'Swing-Stage Experience',
      'High-Rise Perimeter Work Experience',
      'Respirator Use',
      'Medical Clearance',
      'Respirator Fit Test',
      'Ventilation Procedures',
      'Silica Awareness',
      'Overspray Control',
      'Hot-Work Training',
      'Fire Watch',
      'Approved Abrasive Surface Preparation',
      'ICRA Experience',
      'Hospital Experience',
      'Data Center Experience',
      'Clean Work Experience',
      'Dust / Odor Control',
      'Night Work Experience',
      'Secure Site Experience',
      'Background Check Eligible',
      'Badging Eligible',
    ],
    'licensesCertifications': [
      'Firestop Product / System Certification',
      'Perimeter Fire Containment System Certification',
      'SFRM (Sprayed Fire-Resistive Material) Experience',
      'Intumescent Coating Experience',
      'Board / Blanket Fireproofing Experience',
      'Sealant System Experience',
      'Individual Qualified Installer Evidence',
      'Company Qualified Contractor Program',
      'ICC or Other Accepted Fireproofing / Firestop Inspector Credential',
      'Manufacturer QA Certification',
      'Special Inspection Role',
    ],
    'toolsEquipment': [
      'Caulk Gun',
      'Bulk Gun',
      'Trowels / Knives',
      'Mineral Wool Tools',
      'Backer Rod Tools',
      'Cutting Tools',
      'Mixer',
      'Pump',
      'Compressor',
      'Hose',
      'Nozzle',
      'Spray Equipment',
      'Powered Preparation Tools',
      'Grinding Tools',
      'Airless / Conventional Spray Equipment',
      'Rollers / Brushes',
      'Wet-Film Gauge',
      'Dry-Film Gauge',
      'Environmental Meters',
      'Depth / Annular Space Tools',
      'Joint Gauges',
      'Thickness Pins / Gauges',
    ],
  },

  // ============================================================
  // Low Voltage / Data / Security / Fire Alarm
  // ============================================================
  'Low Voltage / Data / Security / Fire Alarm': {
    'safetyCertificationsTraining': [
      'OSHA 10',
      'OSHA 30',
      'Site Orientation',
      'Lift Training',
      'Aerial Lift Training',
      'Fall Protection Training',
      'Ladder Training',
      'Swing-Stage Training',
      'Fiber Safety',
      'Laser Awareness',
      'Shard Disposal Procedures',
      'Eye Protection',
      'Confined Space Training',
      'Manhole Safety',
      'Traffic Safety',
      'OSP (Outside Plant) Safety',
      'ICRA Training',
      'Infection Control',
      'Healthcare Orientation',
      'Secure-Site Access',
      'Background Check Eligible',
      'Badging Eligible',
    ],
    'licensesCertifications': [
      'Local Limited-Energy License',
      'Low-Voltage License',
      'Alarm License',
      'Security License',
      'Fire Alarm License',
      'NICET Fire Alarm Systems',
      'NICET Inspection & Testing of Fire Alarm Systems',
      'BICSI Installer 1',
      'BICSI Installer 2 - Copper',
      'BICSI Installer 2 - Fiber',
      'BICSI Technician',
      'BICSI RCDD',
      'AVIXA CTS',
      'AVIXA CTS-I',
      'AVIXA CTS-D',
      'Manufacturer Training',
      'Manufacturer Certification',
      'Inspection Authorization',
    ],
    'toolsTestEquipment': [
      'Fire Alarm Test Equipment',
      'Copper Certification Test Equipment',
      'Fiber Certification Test Equipment',
      'Fusion Splicer',
      'Cleaver',
      'Inspection Scope',
      'OTDR',
      'RF Test Equipment',
      'PIM Test Equipment',
      'Sweep Test Equipment',
      'Grid Test Equipment',
    ],
  },

  // ============================================================
  // Division 10 Specialties / Accessories / Signage Systems
  // ============================================================
  'Division 10 Specialties / Accessories / Signage Systems': {
    'safetyCertificationsTraining': [
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Rolling Scaffold Experience',
      'Ladder Safety / Experience',
      'High-Ceiling Work Experience',
    ],
    'toolsEquipment': [
      'Tape Measure',
      'Level',
      'Laser Level',
      'Square',
      'Measuring Tools',
      'Hand Tools',
      'Drills / Drivers',
      'Bits',
      'Anchors',
      'Hammer Drill',
      'Rotary Hammer',
      'Concrete / Masonry Bits',
      'Toggle / Expansion Anchors',
      'Rivnuts',
      'Specialty Fasteners',
      'Rivet Tools',
      'Nut Drivers',
      'Impact Drivers',
      'Specialty Bits',
      'Shims',
      'Clamps',
      'Panel Supports',
      'Jigsaw',
      'Circular Saw',
      'Miter Saw',
      'Laminate / Phenolic Blades',
      'Metal Cutting Tools',
      'Shears',
      'Deburring Tools',
      'Standoffs / Pin Tools',
      'Adhesive Systems',
      'Clean Mounting Tools',
      'Adhesive Tools',
      'Rollers',
      'Heat-Weld Equipment (where Applicable)',
      'Cutters',
      'Trim Tools',
      'Track / Panel Adjustment Tools',
      'Seal Adjustment Tools',
      'Hardware / Service Tools',
      'Manufacturer-Specific Tools',
    ],
    'materialHandling': [
      'Ladders',
      'Panel Carts',
      'Board / Glass Handling Equipment',
      'Hoists',
      'Suction Devices',
      'Flagpole Rigging',
      'Team Lifts',
    ],
  },

  // ============================================================
  // Equipment / Specialty Installations / Owner-Furnished Equipment Systems
  // ============================================================
  'Equipment / Specialty Installations / Owner-Furnished Equipment Systems': {
    'safetyCertificationsTraining': [
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Mast Lift Experience',
      'Ladder Safety / Experience',
      'Fall Protection',
      'Roof / High-Access Work Experience',
      'Lift Plan Familiarity',
      'Fire-Watch Awareness',
      'Shop-Drawing Reading',
    ],
    'toolsEquipment': [
      'Hand Tools',
      'Drills',
      'Impact Drivers',
      'Sockets',
      'Levels',
      'Laser Level',
      'Transit',
      'Digital Level',
      'Plumb Tools',
      'Tape Measure',
      'Field Measurement Tools',
      'Measuring Tools',
      'Torque Tools',
      'Torque Wrench',
      'Manufacturer-Specific Tools',
      'Rotary Hammer',
      'Core Drill',
      'Adhesive Anchor Tools',
      'Mechanical Anchors',
      'Dust Control Equipment',
      'Laser Alignment Tools',
      'Dial Indicators',
      'Precision Level',
      'Feeler Gauges',
      'Shim Packs',
      'Coupling Tools',
      'Grinder',
      'Torch',
      'Welding Equipment',
      'Brazing Tools',
      'Manufacturer Diagnostic Tools',
      'Mechanical Gauges',
    ],
    'materialHandlingLifting': [
      'Slings',
      'Shackles',
      'Chain Fall',
      'Gantry',
      'Hoist',
      'Jacks',
      'Skates',
      'Cribbing',
      'Signal Equipment',
      'Pallet Jack',
      'Forklift',
      'Telehandler',
      'Reach Forklift',
      'Powered Tug',
      'Lift Gate',
    ],
    'documentationService': [
      'Torque Records',
      'Service Laptop / Tablet',
      'Parts Tracking',
      'Camera',
      'Barcode / Serial Capture',
      'Punch App',
      'Room / Equipment List',
      'As-Built Documentation',
    ],
  },
}

// ✅ Heavy Equipment lists (separate block for Civil)
const HEAVY_EQUIPMENT_TYPES = [
  'Skid Steer',
  'Mini Excavator',
  'Excavator',
  'Backhoe',
  'Dozer',
  'Front Loader / Wheel Loader',
  'Roller / Compactor',
  'Motor Grader',
  'Trencher',
  'Forklift / Telehandler',
  'Water Truck',
  'Dump Truck support / CDL if applicable'
]

const HEAVY_EQUIPMENT_TASKS = [
  'Rough grade',
  'Fine grade',
  'Excavate trenches',
  'Load trucks',
  'Backfill trenches',
  'Compact soil/base',
  'Move materials',
  'Spread base material',
  'Work near utilities',
  'Finish grade support',
  'Operate safely around crews',
  'Read plans/basic stakes'
]

// ============================================================
// Helper function to get tool sections with translated keys
// ============================================================
const getToolSections = (trade) => {
  return TOOLS_CERTIFICATIONS[trade] || {}
}

// ============================================================
// Helper to get section label for display
// ============================================================
const getSectionLabel = (sectionKey, t) => {
  const labels = {
    'certificationsTraining': t('wizard.step3.certificationsTraining') || 'Certifications / Training',
    'certificationsTrainingLicenses': t('wizard.step3.certificationsTrainingLicenses') || 'Certifications / Training / Licenses',
    'toolsEquipment': t('wizard.step3.toolsEquipment') || 'Tools / Equipment',
    'safetyCertificationsTraining': t('wizard.step3.safetyCertificationsTraining') || 'Safety / Certifications / Training',
    'licensesCertifications': t('wizard.step3.licensesCertifications') || 'Licenses / Certifications',
    'toolsTestEquipment': t('wizard.step3.toolsTestEquipment') || 'Tools / Test Equipment',
    'materialHandling': t('wizard.step3.materialHandling') || 'Material Handling',
    'materialHandlingLifting': t('wizard.step3.materialHandlingLifting') || 'Material Handling & Lifting',
    'documentationService': t('wizard.step3.documentationService') || 'Documentation & Service',
  }
  return labels[sectionKey] || sectionKey
}

// ============================================================
// COMPONENT - WizardStep3 (Certifications & Requirements)
// ============================================================
export function WizardStep3({ data, onChange, onNext, onBack }) {
  const { t } = useTranslation()

  // ✅ State for tools and certifications - read from data prop
  const [toolsCertifications, setToolsCertifications] = useState(() => {
    if (data?.toolsCertifications) {
      return data.toolsCertifications
    }
    return {}
  })

  // ✅ State for heavy equipment operation (separate block for Civil)
  const [heavyEquipment, setHeavyEquipment] = useState(() => {
    if (data?.heavyEquipment) {
      return data.heavyEquipment
    }
    return {}
  })

  // ✅ Handle tools/certifications toggle
  const handleToolToggle = (tool) => (e) => {
    const isChecked = e.target.checked
    const updated = { ...toolsCertifications, [tool]: isChecked }
    setToolsCertifications(updated)
    onChange({ toolsCertifications: updated })
  }

  // ✅ Handle heavy equipment toggle (separate block for Civil)
  const handleHeavyEquipmentToggle = (skill) => (e) => {
    const isChecked = e.target.checked
    const updated = { ...heavyEquipment, [skill]: isChecked }
    setHeavyEquipment(updated)
    onChange({ heavyEquipment: updated })
  }

  const selectedTrade = data?.mainTrade || ''
  const sections = getToolSections(selectedTrade)
  const sectionKeys = Object.keys(sections)
  const showToolsSection = selectedTrade !== '' && sectionKeys.length > 0
  const isCivil = selectedTrade === 'Civil / Sitework / Earthwork / Utilities'

  // ✅ Count selected items
  const selectedCount = Object.values(toolsCertifications).filter(v => v === true).length
  const totalItems = Object.keys(toolsCertifications).length

  // ✅ Heavy Equipment selected count
  const heavySelectedCount = Object.values(heavyEquipment).filter(v => v === true).length

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          {/* ✅ Selected Trade Badge */}
          {selectedTrade && (
            <div style={{
              display: 'inline-block',
              padding: '4px 16px',
              background: 'rgba(15, 78, 169, 0.08)',
              border: '1px solid rgba(15, 78, 169, 0.15)',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#0f4ea9',
              marginBottom: '16px',
            }}>
              📋 {selectedTrade}
            </div>
          )}

          {/* ✅ Heavy Equipment Operation Section - Separate Block for Civil */}
          {isCivil && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#17263a',
                marginBottom: '4px',
              }}>
                🚜 {t('wizard.step3.heavyEquipment')}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(23, 38, 58, 0.6)',
                marginBottom: '12px',
              }}>
                {t('wizard.step3.heavyEquipmentDescription')}
              </div>

              {/* Equipment Type Checklist */}
              <div style={{
                marginBottom: '16px',
                padding: '16px 20px',
                border: '1px solid rgba(15, 78, 169, 0.2)',
                borderRadius: '8px',
                background: 'rgba(15, 78, 169, 0.02)',
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0f4ea9',
                  marginBottom: '12px',
                }}>
                  {t('wizard.step3.equipmentTypeChecklist')}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '6px 16px',
                }}>
                  {HEAVY_EQUIPMENT_TYPES.map((skill) => (
                    <label key={skill} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: '#17263a',
                      padding: '4px 0',
                    }}>
                      <input
                        type="checkbox"
                        checked={!!(heavyEquipment?.[skill] || false)}
                        onChange={handleHeavyEquipmentToggle(skill)}
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              {/* Equipment Operation Task Capabilities */}
              <div style={{
                padding: '16px 20px',
                border: '1px solid rgba(15, 78, 169, 0.2)',
                borderRadius: '8px',
                background: 'rgba(15, 78, 169, 0.02)',
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0f4ea9',
                  marginBottom: '12px',
                }}>
                  {t('wizard.step3.equipmentOperationTasks')}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '6px 16px',
                }}>
                  {HEAVY_EQUIPMENT_TASKS.map((skill) => (
                    <label key={skill} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: '#17263a',
                      padding: '4px 0',
                    }}>
                      <input
                        type="checkbox"
                        checked={!!(heavyEquipment?.[skill] || false)}
                        onChange={handleHeavyEquipmentToggle(skill)}
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              {/* Heavy Equipment Summary */}
              {heavySelectedCount > 0 && (
                <div style={{
                  marginTop: '12px',
                  padding: '10px 16px',
                  background: 'rgba(47, 180, 99, 0.06)',
                  border: '1px solid rgba(47, 180, 99, 0.2)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#17263a',
                }}>
                  <strong style={{ color: '#2fb463' }}>
                    {heavySelectedCount}
                  </strong>
                  {' '}
                  {t('wizard.step3.selectedItems')}
                </div>
              )}
            </div>
          )}

          {/* ✅ Tools, Certifications, and Requirements Section with Headers */}
          {showToolsSection ? (
            <>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#17263a',
                marginBottom: '12px',
              }}>
                {t('wizard.step3.toolsCertifications')}
              </div>
              
              {sectionKeys.map((sectionKey) => {
                const sectionItems = sections[sectionKey] || []
                return (
                  <div key={sectionKey} style={{ marginBottom: '20px' }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f4ea9',
                      marginBottom: '8px',
                      paddingBottom: '4px',
                      borderBottom: '1px solid rgba(15, 78, 169, 0.15)',
                    }}>
                      {getSectionLabel(sectionKey, t)}
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 400,
                        color: 'rgba(23, 38, 58, 0.4)',
                        marginLeft: '8px',
                      }}>
                        ({sectionItems.length})
                      </span>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '6px 16px',
                      padding: '12px 16px',
                      border: '1px solid rgba(18, 38, 63, 0.06)',
                      borderRadius: '8px',
                      background: 'rgba(15, 78, 169, 0.02)',
                    }}>
                      {sectionItems.map((tool) => (
                        <label key={tool} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: '#17263a',
                          padding: '4px 0',
                        }}>
                          <input
                            type="checkbox"
                            checked={!!(toolsCertifications[tool] || false)}
                            onChange={handleToolToggle(tool)}
                          />
                          {tool}
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* ✅ Summary of selected items */}
              {totalItems > 0 && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  background: selectedCount > 0 ? 'rgba(47, 180, 99, 0.06)' : 'rgba(23, 38, 58, 0.04)',
                  border: selectedCount > 0 ? '1px solid rgba(47, 180, 99, 0.2)' : '1px solid rgba(23, 38, 58, 0.06)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#17263a',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span>
                    {selectedCount > 0 ? '✅' : '📋'} 
                    {' '}
                    <strong>{selectedCount}</strong> {t('wizard.step3.selectedItems')}
                  </span>
                  {selectedCount > 0 && totalItems > 0 && (
                    <span style={{ fontSize: '12px', color: '#2fb463' }}>
                      {Math.round((selectedCount / totalItems) * 100)}% {t('common.complete')}
                    </span>
                  )}
                </div>
              )}
            </>
          ) : (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              border: '1px dashed rgba(18, 38, 63, 0.12)',
              borderRadius: '8px',
              color: 'rgba(23, 38, 58, 0.4)',
              fontSize: '14px',
            }}>
              {selectedTrade 
                ? t('wizard.step3.noToolsCertifications')
                : t('wizard.step3.selectTradeFirst')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WizardStep3