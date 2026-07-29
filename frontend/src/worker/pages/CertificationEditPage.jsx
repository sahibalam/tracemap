

// // src/worker/pages/CertificationEditPage.jsx
// import { useState, useRef, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TopNav } from '../../common/components/TopNav'
// import workerService from '../services/workerService'
// import wizardService from '../services/workerWizardService'

// // ============================================================
// // ICONS
// // ============================================================

// function IconGrid(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconFolder(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconChart(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconLogout(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconSupport(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconUser(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconArrowLeft(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// function IconChevronDown(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// function IconChevronRight(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// function IconPlus(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//     </svg>
//   )
// }

// function IconTrash(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// // ============================================================
// // TOOLS & CERTIFICATIONS BY TRADE - SECTION BASED (Matching WizardStep3)
// // ============================================================

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

// // ============================================================
// // Helper function to get flat tools list for rendering
// // ============================================================
// const getFlatToolsList = (trade) => {
//   const sections = TOOLS_CERTIFICATIONS[trade]
//   if (!sections) return []
//   const allItems = []
//   Object.keys(sections).forEach(section => {
//     sections[section].forEach(item => {
//       allItems.push(item)
//     })
//   })
//   return allItems
// }

// // ============================================================
// // Helper function to get sections for rendering with headers
// // ============================================================
// const getToolSections = (trade) => {
//   return TOOLS_CERTIFICATIONS[trade] || {}
// }

// // ============================================================
// // MAIN COMPONENT
// // ============================================================

// export function CertificationEditPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
  
//   // ============================================================
//   // STATE MANAGEMENT
//   // ============================================================
  
//   const [certData, setCertData] = useState({
//     certChecklist: {},
//     certRows: [
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//     ],
//     safetyFlags: {},
//   })
//   const [isSaving, setIsSaving] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')
//   const [uploadingIndex, setUploadingIndex] = useState(null)
//   const [uploadError, setUploadError] = useState('')
//   const [userTrades, setUserTrades] = useState([])
//   const [expandedSections, setExpandedSections] = useState({})
//   const fileInputRefs = useRef({})

//   // ============================================================
//   // LOAD DATA FROM WORKERS TABLE
//   // ============================================================
  
//   useEffect(() => {
//     const loadCertifications = async () => {
//       try {
//         const userId = localStorage.getItem('userId')
//         if (!userId) {
//           setError('User ID not found. Please login again.')
//           setLoading(false)
//           return
//         }

//         console.log('📊 Fetching certification data from Workers table')
        
//         // First check if we have data in location state
//         if (location?.state?.tradeData) {
//           const data = location.state.tradeData
//           if (data.certRows && data.certRows.length > 0) {
//             console.log('✅ Using certification data from location.state')
//             setCertData({
//               certChecklist: data.certChecklist || {},
//               certRows: data.certRows || [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }],
//               safetyFlags: data.safetyFlags || {},
//             })
//             if (data.tradeRows) {
//               const trades = data.tradeRows.map(row => row.trade).filter(Boolean)
//               setUserTrades(trades)
//               const expanded = {}
//               trades.forEach(t => { expanded[t] = true })
//               setExpandedSections(expanded)
//             }
//             setLoading(false)
//             return
//           }
//           console.log('⚠️ location.state.tradeData exists but has no certRows, fetching from API')
//         }

//         const profile = await workerService.getWorkerProfile(userId)
        
//         if (profile.success && profile.data) {
//           console.log('📦 Profile data received:', profile.data)
          
//           const tradeData = profile.data.trade || {}
          
//           // ✅ Get ALL trades from tradeRows
//           const tradeRows = tradeData.tradeRows || []
//           const trades = tradeRows.map(row => row.trade).filter(Boolean)
          
//           // If no trades in tradeRows, try mainTrade
//           if (trades.length === 0 && tradeData.mainTrade) {
//             trades.push(tradeData.mainTrade)
//           }
          
//           setUserTrades(trades)
//           console.log('✅ User trades:', trades)
          
//           // Auto-expand all trades
//           const expanded = {}
//           trades.forEach(t => { expanded[t] = true })
//           setExpandedSections(expanded)
          
//           // ✅ Get tools certifications from trade.toolsCertifications
//           const toolsCerts = tradeData.toolsCertifications || {}
//           const checkedCount = Object.values(toolsCerts).filter(v => v === true).length
//           console.log(`🔧 Tools certifications from trade: ${checkedCount} selected`)
          
//           const certsData = profile.data.certifications || {}
//           const certChecklist = certsData.certChecklist || {}
          
//           const checklistData = Object.keys(toolsCerts).length > 0 
//             ? toolsCerts 
//             : certChecklist
          
//           console.log('✅ Final checklist data:', Object.keys(checklistData).filter(k => checklistData[k]).length, 'selected')
          
//           let certRows = certsData.certRows || []
//           if (certRows.length === 0) {
//             certRows = [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }]
//           }
          
//           const safetyFlags = certsData.safetyFlags || {}
          
//           setCertData({
//             certChecklist: checklistData,
//             certRows: certRows,
//             safetyFlags: safetyFlags,
//           })
          
//           console.log('✅ Certifications loaded successfully')
//           console.log('  - Trades:', trades)
//           console.log('  - Checklist items:', Object.keys(checklistData).length)
//           console.log('  - Selected items:', Object.keys(checklistData).filter(k => checklistData[k]).length)
          
//         } else {
//           console.log('ℹ️ No profile data found, initializing empty state')
//           setCertData({
//             certChecklist: {},
//             certRows: [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }],
//             safetyFlags: {},
//           })
//           setUserTrades([])
//         }
//       } catch (error) {
//         console.error('❌ Error loading certifications:', error)
//         setError(error.message || 'Failed to load certifications')
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadCertifications()
//   }, [location?.state?.tradeData])

//   // ============================================================
//   // HANDLERS
//   // ============================================================
  
//   const handleChange = (field, value) => {
//     setCertData(prev => ({ ...prev, [field]: value }))
//   }

//   const toggleCertChecklist = (key) => (e) => {
//     const isChecked = e.target.checked
//     console.log(`🔄 Toggling ${key}: ${isChecked}`)
//     setCertData(prev => ({
//       ...prev,
//       certChecklist: {
//         ...(prev.certChecklist || {}),
//         [key]: isChecked,
//       },
//     }))
//   }

//   const toggleSafetyFlag = (key) => (e) => {
//     const isChecked = e.target.checked
//     setCertData(prev => ({
//       ...prev,
//       safetyFlags: {
//         ...(prev.safetyFlags || {}),
//         [key]: isChecked,
//       },
//     }))
//   }

//   const updateCertRow = (index, key) => (value) => {
//     setCertData(prev => {
//       const rows = [...(prev.certRows || [])]
//       if (!rows[index]) {
//         rows[index] = { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }
//       }
//       rows[index] = { ...rows[index], [key]: value }
//       return { ...prev, certRows: rows }
//     })
//   }

//   const toggleSection = (trade) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [trade]: !prev[trade]
//     }))
//   }

//   // ============================================================
//   // CERTIFICATION ROW OPERATIONS
//   // ============================================================
  
//   const addCertRow = () => {
//     setCertData(prev => ({
//       ...prev,
//       certRows: [
//         ...(prev.certRows || []),
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }
//       ]
//     }))
//   }

//   const removeCertRow = (index) => {
//     setCertData(prev => {
//       const rows = [...(prev.certRows || [])]
//       if (rows.length <= 1) {
//         rows[0] = { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }
//         return { ...prev, certRows: rows }
//       }
//       rows.splice(index, 1)
//       return { ...prev, certRows: rows }
//     })
//   }

//   // ============================================================
//   // FILE UPLOAD HANDLER
//   // ============================================================
  
//   const handleFileUpload = (index) => async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     if (file.size > 5 * 1024 * 1024) {
//       setUploadError('File size must be less than 5MB')
//       return
//     }

//     const allowedTypes = [
//       'application/pdf',
//       'image/jpeg',
//       'image/png',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     ]
//     if (!allowedTypes.includes(file.type)) {
//       setUploadError('Invalid file type. Allowed: PDF, JPEG, PNG, DOC, DOCX')
//       return
//     }

//     setUploadingIndex(index)
//     setUploadError('')

//     try {
//       const userId = localStorage.getItem('userId')
//       if (!userId) throw new Error('User ID not found')

//       console.log(`📄 Uploading certificate (row ${index}) for user: ${userId}`)

//       const result = await wizardService.uploadCertificate(userId, file, index)
      
//       if (result.success) {
//         setCertData(prev => {
//           const rows = [...(prev.certRows || [])]
//           if (!rows[index]) {
//             rows[index] = { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }
//           }
//           rows[index] = {
//             ...rows[index],
//             uploadRef: file.name,
//             fileKey: result.fileKey,
//             fileUrl: result.fileUrl,
//             uploadedAt: new Date().toISOString()
//           }
//           return { ...prev, certRows: rows }
//         })
//         setSuccess(`File "${file.name}" uploaded successfully!`)
//       }
//     } catch (error) {
//       console.error('Error uploading certificate:', error)
//       setUploadError(error.message || 'Failed to upload file')
//     } finally {
//       setUploadingIndex(null)
//     }
//   }

//   const triggerFileUpload = (index) => () => {
//     if (fileInputRefs.current[index]) {
//       fileInputRefs.current[index].click()
//     }
//   }

//   // ============================================================
//   // DATE HANDLERS
//   // ============================================================
  
//   const handleDateChange = (index, field) => (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       updateCertRow(index, field)(`${month}/${day}/${year}`)
//     } else {
//       updateCertRow(index, field)('')
//     }
//   }

//   const parseDate = (dateStr) => {
//     if (!dateStr) return null
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
//     }
//     return null
//   }

//   // ============================================================
//   // DELETE CERTIFICATE
//   // ============================================================
  
//   const handleDeleteCertificate = async (index, fileKey) => {
//     if (!fileKey) {
//       updateCertRow(index, 'uploadRef')('')
//       updateCertRow(index, 'fileKey')('')
//       updateCertRow(index, 'fileUrl')('')
//       return
//     }

//     if (!confirm('Are you sure you want to delete this certificate?')) return

//     try {
//       const userId = localStorage.getItem('userId')
//       if (!userId) throw new Error('User ID not found')

//       await wizardService.deleteCertificate(userId, index, fileKey)
      
//       updateCertRow(index, 'uploadRef')('')
//       updateCertRow(index, 'fileKey')('')
//       updateCertRow(index, 'fileUrl')('')
      
//       setSuccess('Certificate deleted successfully!')
//     } catch (error) {
//       console.error('Error deleting certificate:', error)
//       setError(error.message || 'Failed to delete certificate')
//     }
//   }

//   // ============================================================
//   // SAVE TO WORKERS TABLE
//   // ============================================================
  
//   const handleSave = async () => {
//     setIsSaving(true)
//     setError('')
//     setSuccess('')

//     try {
//       const userId = localStorage.getItem('userId')
//       if (!userId) {
//         throw new Error('User ID not found. Please login again.')
//       }

//       console.log('💾 Saving certifications to Workers table')
//       console.log('📋 certChecklist:', certData.certChecklist)

//       const profile = await workerService.getWorkerProfile(userId)
//       const currentTrade = profile.data?.trade || {}
      
//       const updatedTrade = {
//         ...currentTrade,
//         toolsCertifications: certData.certChecklist || {},
//       }
      
//       await workerService.updateTrade(userId, updatedTrade)
//       console.log('✅ Trade toolsCertifications updated')
      
//       await workerService.updateCertifications(userId, {
//         certChecklist: certData.certChecklist || {},
//         certRows: certData.certRows || [],
//         safetyFlags: certData.safetyFlags || {},
//       })
      
//       console.log('✅ Certifications saved to Workers table')
//       setSuccess('Certifications saved successfully!')

//       setTimeout(() => {
//         navigate('/wizard/summary', {
//           state: {
//             ...location?.state?.parentData,
//             certifications: certData,
//             updatedCert: true
//           },
//           replace: true
//         })
//       }, 500)

//     } catch (error) {
//       console.error('❌ Error saving certifications:', error)
//       setError(error.message || 'Failed to save certifications')
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleBack = () => {
//     navigate('/wizard/summary', {
//       state: location?.state?.parentData || {},
//       replace: true
//     })
//   }

//   // ============================================================
//   // RENDER HELPERS
//   // ============================================================
  
//   const certRows = certData.certRows || [
//     { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//   ]

//   // ✅ UPDATED: Get sections for a trade
//   const getTradeSections = (trade) => {
//     return getToolSections(trade)
//   }

//   // ✅ UPDATED: Get all items from all sections for a trade (for count)
//   const getAllItemsForTrade = (trade) => {
//     return getFlatToolsList(trade)
//   }

//   // ============================================================
//   // STYLES
//   // ============================================================
  
//   const datePickerStyles = `
//     .cert-date-picker .react-datepicker__input-container input {
//       width: 100%;
//       height: 36px;
//       padding: 0 8px;
//       padding-right: 28px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 6px;
//       font-size: 13px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//       cursor: pointer;
//     }

//     .cert-date-picker .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .cert-date-picker .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .cert-date-picker .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .cert-date-picker .react-datepicker {
//       font-family: inherit;
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
//       background: white;
//       padding: 8px;
//       overflow: hidden;
//       font-size: 13px;
//     }

//     .cert-date-picker .react-datepicker__header {
//       background: white;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06);
//       padding: 10px 0 6px 0;
//       border-radius: 12px 12px 0 0;
//     }

//     .cert-date-picker .react-datepicker__current-month {
//       color: #17263a;
//       font-weight: 700;
//       font-size: 14px;
//       padding-bottom: 4px;
//     }

//     .cert-date-picker .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5);
//       font-weight: 600;
//       font-size: 11px;
//       width: 32px;
//       margin: 2px;
//     }

//     .cert-date-picker .react-datepicker__day {
//       width: 32px;
//       height: 32px;
//       line-height: 32px;
//       margin: 2px;
//       border-radius: 8px;
//       font-size: 13px;
//       color: #17263a;
//       transition: all 0.15s ease;
//       cursor: pointer;
//     }

//     .cert-date-picker .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08);
//       border-radius: 8px;
//     }

//     .cert-date-picker .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px;
//       font-weight: 600;
//     }

//     .cert-date-picker .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }

//     .cert-date-picker .react-datepicker__day--keyboard-selected {
//       background: rgba(15, 78, 169, 0.15);
//       border-radius: 8px;
//     }

//     .cert-date-picker .react-datepicker__day--today {
//       font-weight: 700;
//       color: #0f4ea9;
//     }

//     .cert-date-picker .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }

//     .cert-date-picker .react-datepicker__day--disabled {
//       color: rgba(23, 38, 58, 0.2);
//       cursor: not-allowed;
//     }

//     .cert-date-picker .react-datepicker__day--disabled:hover {
//       background: transparent;
//     }

//     .cert-date-picker .react-datepicker__navigation {
//       top: 12px;
//       background: transparent;
//       border: none;
//       cursor: pointer;
//       padding: 0;
//       width: 28px;
//       height: 28px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       border-radius: 6px;
//       transition: all 0.15s ease;
//     }

//     .cert-date-picker .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }

//     .cert-date-picker .react-datepicker__navigation-icon::before {
//       border-color: #17263a;
//       border-width: 2px 2px 0 0;
//       height: 7px;
//       width: 7px;
//     }

//     .cert-date-picker .react-datepicker__day--weekend {
//       color: #e11d48;
//     }

//     .cert-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
//       color: white;
//     }

//     .cert-date-picker .react-datepicker__input-container {
//       width: 100%;
//     }

//     .cert-date-picker .react-datepicker-wrapper {
//       width: 100%;
//     }

//     .cert-date-picker .react-datepicker__input-container {
//       position: relative;
//     }

//     .cert-date-picker .react-datepicker__input-container::after {
//       content: '📅';
//       position: absolute;
//       right: 8px;
//       top: 50%;
//       transform: translateY(-50%);
//       font-size: 14px;
//       pointer-events: none;
//       opacity: 0.6;
//     }

//     .react-datepicker-popper {
//       z-index: 9999 !important;
//     }
//   `

//   const fileUploadStyles = `
//     .file-upload-btn {
//       display: inline-flex;
//       align-items: center;
//       gap: 4px;
//       padding: 4px 12px;
//       background: rgba(15, 78, 169, 0.08);
//       color: #0f4ea9;
//       border: 1px solid rgba(15, 78, 169, 0.2);
//       border-radius: 6px;
//       font-size: 12px;
//       font-weight: 500;
//       cursor: pointer;
//       transition: all 0.2s ease;
//       width: 100%;
//       justify-content: center;
//       white-space: nowrap;
//     }

//     .file-upload-btn:hover {
//       background: rgba(15, 78, 169, 0.15);
//       border-color: #0f4ea9;
//     }

//     .file-upload-btn.has-file {
//       background: rgba(47, 180, 99, 0.1);
//       border-color: #2fb463;
//       color: #2fb463;
//     }

//     .file-upload-btn .file-name {
//       max-width: 80px;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//     }

//     .file-upload-btn:disabled {
//       opacity: 0.6;
//       cursor: not-allowed;
//     }

//     .file-upload-btn .delete-btn {
//       margin-left: 4px;
//       color: #dc2626;
//       background: none;
//       border: none;
//       cursor: pointer;
//       font-size: 14px;
//       padding: 0 4px;
//     }

//     .file-upload-btn .delete-btn:hover {
//       color: #b91c1c;
//     }

//     .add-row-btn {
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//       padding: 8px 16px;
//       background: rgba(15, 78, 169, 0.06);
//       color: #0f4ea9;
//       border: 1px dashed rgba(15, 78, 169, 0.3);
//       border-radius: 8px;
//       font-size: 13px;
//       font-weight: 500;
//       cursor: pointer;
//       transition: all 0.2s ease;
//       margin-top: 12px;
//     }

//     .add-row-btn:hover {
//       background: rgba(15, 78, 169, 0.1);
//       border-color: #0f4ea9;
//     }

//     .remove-row-btn {
//       display: inline-flex;
//       align-items: center;
//       justify-content: center;
//       width: 28px;
//       height: 28px;
//       background: rgba(220, 38, 38, 0.08);
//       color: #dc2626;
//       border: none;
//       border-radius: 6px;
//       cursor: pointer;
//       transition: all 0.2s ease;
//       flex-shrink: 0;
//     }

//     .remove-row-btn:hover {
//       background: rgba(220, 38, 38, 0.15);
//     }
//   `

//   // ============================================================
//   // RENDER
//   // ============================================================
  
//   if (loading) {
//     return (
//       <div className="appShell">
//         <TopNav variant="solid" />
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '80vh',
//           flexDirection: 'column',
//           gap: '16px'
//         }}>
//           <div style={{ 
//             width: '40px', 
//             height: '40px', 
//             border: '3px solid rgba(15, 78, 169, 0.1)',
//             borderTop: '3px solid #0f4ea9',
//             borderRadius: '50%',
//             animation: 'spin 1s linear infinite'
//           }} />
//           <p style={{ color: '#17263a' }}>Loading certifications...</p>
//           <style>{`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}</style>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge" aria-label="12 projects">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconChart /></span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon" aria-hidden="true"><IconUser /></span>
//                 <span className="sideText">Profile</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon" aria-hidden="true"><IconLogout /></span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">
//           <div style={{ 
//             padding: '24px', 
//             maxWidth: '1100px', 
//             margin: '0 auto', 
//             height: 'calc(100vh - 120px)', 
//             display: 'flex', 
//             flexDirection: 'column' 
//           }}>
            
//             {/* ============================================================
//             HEADER
//             ============================================================ */}
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '16px',
//               marginBottom: '16px',
//               paddingBottom: '16px',
//               borderBottom: '1px solid rgba(18, 38, 63, 0.08)',
//               flexShrink: 0,
//               background: 'transparent',
//               zIndex: 10,
//             }}>
//               <button
//                 onClick={handleBack}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   color: '#17263a',
//                   fontSize: '14px',
//                   fontWeight: 500,
//                   padding: '8px 12px',
//                   borderRadius: '8px',
//                   transition: 'background 0.2s',
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'}
//                 onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//               >
//                 <IconArrowLeft />
//                 Back
//               </button>
//               <span style={{
//                 fontSize: '16px',
//                 fontWeight: 600,
//                 color: '#17263a',
//               }}>
//                 Edit Certifications & Safety
//               </span>
//               {userTrades.length > 0 && (
//                 <span style={{
//                   marginLeft: '8px',
//                   padding: '4px 12px',
//                   background: 'rgba(15, 78, 169, 0.08)',
//                   borderRadius: '16px',
//                   fontSize: '12px',
//                   color: '#0f4ea9',
//                   fontWeight: 500,
//                 }}>
//                   {userTrades.length} trade{userTrades.length > 1 ? 's' : ''}
//                 </span>
//               )}
//             </div>

//             {/* ============================================================
//             NOTIFICATIONS
//             ============================================================ */}
//             {error && (
//               <div style={{
//                 padding: '12px 16px',
//                 background: '#fee2e2',
//                 color: '#dc2626',
//                 border: '1px solid #fecaca',
//                 borderRadius: '8px',
//                 marginBottom: '16px',
//                 fontSize: '14px',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center'
//               }}>
//                 <span>❌ {error}</span>
//                 <button
//                   onClick={() => setError('')}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer',
//                     color: '#dc2626',
//                     fontWeight: 'bold',
//                     fontSize: '18px'
//                   }}
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {uploadError && (
//               <div style={{
//                 padding: '12px 16px',
//                 background: '#fee2e2',
//                 color: '#dc2626',
//                 border: '1px solid #fecaca',
//                 borderRadius: '8px',
//                 marginBottom: '16px',
//                 fontSize: '14px',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center'
//               }}>
//                 <span>❌ {uploadError}</span>
//                 <button
//                   onClick={() => setUploadError('')}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer',
//                     color: '#dc2626',
//                     fontWeight: 'bold',
//                     fontSize: '18px'
//                   }}
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {success && (
//               <div style={{
//                 padding: '12px 16px',
//                 background: '#d1fae5',
//                 color: '#065f46',
//                 border: '1px solid #6ee7b7',
//                 borderRadius: '8px',
//                 marginBottom: '16px',
//                 fontSize: '14px',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center'
//               }}>
//                 <span>✅ {success}</span>
//                 <button
//                   onClick={() => setSuccess('')}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer',
//                     color: '#065f46',
//                     fontWeight: 'bold',
//                     fontSize: '18px'
//                   }}
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {/* ============================================================
//             CONTENT - SCROLLABLE
//             ============================================================ */}
//             <div style={{
//               flex: 1,
//               overflowY: 'auto',
//               paddingBottom: '16px',
//             }}>
//               <style>{datePickerStyles}</style>
//               <style>{fileUploadStyles}</style>
              
//               <div style={{
//                 background: 'white',
//                 borderRadius: '16px',
//                 padding: '32px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//               }}>
                
//                 {/* ============================================================
//                 SECTION 1: CERTIFICATION CHECKLIST - ALL TRADES
//                 ============================================================ */}
//                 <div style={{ marginBottom: '32px' }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between'
//                   }}>
//                     <span>1. Certification Checklist</span>
//                     {userTrades.length > 0 && (
//                       <span style={{
//                         fontSize: '12px',
//                         color: 'rgba(23, 38, 58, 0.5)',
//                         fontWeight: 400,
//                       }}>
//                         {userTrades.length} trade{userTrades.length > 1 ? 's' : ''}
//                       </span>
//                     )}
//                   </div>

//                   {userTrades.length > 0 ? (
//                     <div>
//                       {userTrades.map((trade) => {
//                         const sections = getTradeSections(trade)
//                         const sectionKeys = Object.keys(sections)
//                         const allItems = getAllItemsForTrade(trade)
//                         const isExpanded = expandedSections[trade] || false
//                         const checkedForTrade = allItems.filter(item => certData.certChecklist?.[item] === true).length
//                         const totalItems = allItems.length
                        
//                         return (
//                           <div key={trade} style={{ marginBottom: '12px' }}>
//                             <div 
//                               style={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'space-between',
//                                 padding: '12px 16px',
//                                 background: isExpanded ? 'rgba(15, 78, 169, 0.05)' : 'rgba(15, 78, 169, 0.02)',
//                                 border: isExpanded ? '1px solid rgba(15, 78, 169, 0.2)' : '1px solid rgba(18, 38, 63, 0.08)',
//                                 borderRadius: '8px',
//                                 cursor: 'pointer',
//                                 transition: 'all 0.2s ease',
//                               }}
//                               onClick={() => toggleSection(trade)}
//                               onMouseEnter={(e) => {
//                                 if (!isExpanded) {
//                                   e.currentTarget.style.background = 'rgba(15, 78, 169, 0.04)'
//                                 }
//                               }}
//                               onMouseLeave={(e) => {
//                                 if (!isExpanded) {
//                                   e.currentTarget.style.background = 'rgba(15, 78, 169, 0.02)'
//                                 }
//                               }}
//                             >
//                               <div style={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '12px',
//                                 flexWrap: 'wrap',
//                               }}>
//                                 <span style={{
//                                   fontSize: '14px',
//                                   fontWeight: 600,
//                                   color: '#17263a',
//                                 }}>
//                                   {trade}
//                                 </span>
//                                 <span style={{
//                                   fontSize: '11px',
//                                   color: 'rgba(23, 38, 58, 0.4)',
//                                   background: 'rgba(23, 38, 58, 0.06)',
//                                   padding: '2px 10px',
//                                   borderRadius: '12px',
//                                 }}>
//                                   {totalItems} items
//                                 </span>
//                                 {checkedForTrade > 0 && (
//                                   <span style={{
//                                     fontSize: '11px',
//                                     color: '#2fb463',
//                                     background: 'rgba(47, 180, 99, 0.1)',
//                                     padding: '2px 10px',
//                                     borderRadius: '12px',
//                                   }}>
//                                     {checkedForTrade} selected
//                                   </span>
//                                 )}
//                               </div>
//                               {isExpanded ? (
//                                 <IconChevronDown style={{ color: 'rgba(23, 38, 58, 0.4)' }} />
//                               ) : (
//                                 <IconChevronRight style={{ color: 'rgba(23, 38, 58, 0.4)' }} />
//                               )}
//                             </div>

//                             {isExpanded && sectionKeys.length > 0 && (
//                               <div style={{
//                                 marginTop: '12px',
//                                 padding: '16px 20px',
//                                 border: '1px solid rgba(18, 38, 63, 0.06)',
//                                 borderRadius: '8px',
//                                 background: 'white',
//                               }}>
//                                 {sectionKeys.map((sectionKey) => (
//                                   <div key={sectionKey} style={{ marginBottom: '14px' }}>
//                                     <div style={{
//                                       fontSize: '12px',
//                                       fontWeight: 600,
//                                       color: '#0f4ea9',
//                                       marginBottom: '6px',
//                                       paddingBottom: '2px',
//                                       borderBottom: '1px solid rgba(15, 78, 169, 0.1)',
//                                     }}>
//                                       {sectionKey}
//                                       <span style={{
//                                         fontSize: '10px',
//                                         fontWeight: 400,
//                                         color: 'rgba(23, 38, 58, 0.4)',
//                                         marginLeft: '6px',
//                                       }}>
//                                         ({sections[sectionKey].length})
//                                       </span>
//                                     </div>
//                                     <div style={{ 
//                                       display: 'grid', 
//                                       gridTemplateColumns: '1fr 1fr 1fr', 
//                                       gap: '6px'
//                                     }}>
//                                       {sections[sectionKey].map((cert) => (
//                                         <label key={cert} style={{ 
//                                           display: 'flex', 
//                                           alignItems: 'center', 
//                                           gap: '8px', 
//                                           cursor: 'pointer',
//                                           padding: '4px 8px',
//                                           borderRadius: '6px',
//                                           transition: 'background 0.15s ease',
//                                           fontSize: '13px',
//                                         }}
//                                         onMouseEnter={(e) => {
//                                           e.currentTarget.style.background = 'rgba(15, 78, 169, 0.03)'
//                                         }}
//                                         onMouseLeave={(e) => {
//                                           e.currentTarget.style.background = 'transparent'
//                                         }}
//                                         >
//                                           <input
//                                             type="checkbox"
//                                             checked={!!(certData.certChecklist?.[cert] || false)}
//                                             onChange={toggleCertChecklist(cert)}
//                                             style={{
//                                               width: '18px',
//                                               height: '18px',
//                                               cursor: 'pointer',
//                                               accentColor: '#0f4ea9',
//                                             }}
//                                           />
//                                           <span style={{ fontSize: '13px', color: '#17263a' }}>{cert}</span>
//                                         </label>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         )
//                       })}
//                     </div>
//                   ) : (
//                     <div style={{
//                       padding: '20px',
//                       textAlign: 'center',
//                       color: 'rgba(23, 38, 58, 0.4)',
//                       fontSize: '14px',
//                       border: '1px dashed rgba(18, 38, 63, 0.12)',
//                       borderRadius: '8px',
//                     }}>
//                       Please add trades in your Trade Profile first.
//                     </div>
//                   )}
//                 </div>

//                 {/* ============================================================
//                 SECTION 2: VERIFICATION DATA
//                 ============================================================ */}
//                 <div style={{ marginBottom: '24px' }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center'
//                   }}>
//                     <span>2. Verification Data</span>
//                     <span style={{ fontSize: '13px', color: 'rgba(23, 38, 58, 0.5)', fontWeight: 400 }}>
//                       {certRows.length} certificate{certRows.length !== 1 ? 's' : ''}
//                     </span>
//                   </div>
                  
//                   <div style={{ 
//                     width: '100%', 
//                     overflowX: 'auto',
//                     position: 'relative'
//                   }}>
//                     {/* Header Row */}
//                     <div style={{ 
//                       display: 'grid', 
//                       gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr 40px',
//                       gap: '8px',
//                       padding: '8px 4px',
//                       borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                       fontWeight: 600,
//                       fontSize: '11px',
//                       color: 'rgba(23, 38, 58, 0.6)',
//                       minWidth: '750px',
//                       textTransform: 'uppercase',
//                       letterSpacing: '0.3px',
//                     }}>
//                       <div>Certification / card name</div>
//                       <div>Card number / ID</div>
//                       <div>Issue date</div>
//                       <div>Expiration date</div>
//                       <div>Upload / file ref</div>
//                       <div style={{ textAlign: 'center' }}></div>
//                     </div>

//                     {/* Data Rows */}
//                     {certRows.map((row, idx) => (
//                       <div 
//                         key={idx} 
//                         style={{ 
//                           display: 'grid', 
//                           gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr 40px',
//                           gap: '8px',
//                           padding: '6px 4px',
//                           borderBottom: idx < certRows.length - 1 ? '1px solid rgba(18, 38, 63, 0.06)' : 'none',
//                           alignItems: 'center',
//                           minWidth: '750px'
//                         }}
//                       >
//                         <input 
//                           value={row.name || ''} 
//                           onChange={(e) => updateCertRow(idx, 'name')(e.target.value)}
//                           placeholder="e.g. OSHA 10"
//                           style={{
//                             width: '100%',
//                             padding: '6px 10px',
//                             border: '1px solid rgba(18, 38, 63, 0.12)',
//                             borderRadius: '6px',
//                             fontSize: '13px',
//                             outline: 'none',
//                             transition: 'all 0.2s ease',
//                             background: 'white',
//                             color: '#17263a',
//                             boxSizing: 'border-box'
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = '#0f4ea9'
//                             e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                             e.target.style.boxShadow = 'none'
//                           }}
//                         />

//                         <input 
//                           value={row.cardNumber || ''} 
//                           onChange={(e) => updateCertRow(idx, 'cardNumber')(e.target.value)}
//                           placeholder="Card ID"
//                           style={{
//                             width: '100%',
//                             padding: '6px 10px',
//                             border: '1px solid rgba(18, 38, 63, 0.12)',
//                             borderRadius: '6px',
//                             fontSize: '13px',
//                             outline: 'none',
//                             transition: 'all 0.2s ease',
//                             background: 'white',
//                             color: '#17263a',
//                             boxSizing: 'border-box'
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = '#0f4ea9'
//                             e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                             e.target.style.boxShadow = 'none'
//                           }}
//                         />

//                         {/* Issue date - Calendar Picker */}
//                         <div className="cert-date-picker" style={{ 
//                           width: '100%', 
//                           position: 'relative',
//                           zIndex: 99999
//                         }}>
//                           <DatePicker
//                             selected={parseDate(row.issueDate)}
//                             onChange={handleDateChange(idx, 'issueDate')}
//                             dateFormat="MM/dd/yyyy"
//                             placeholderText="MM/DD/YYYY"
//                             maxDate={new Date()}
//                             showYearDropdown
//                             showMonthDropdown
//                             dropdownMode="select"
//                             yearDropdownItemNumber={100}
//                             scrollableYearDropdown
//                             popperPlacement="bottom-start"
//                             popperModifiers={[
//                               {
//                                 name: 'offset',
//                                 options: {
//                                   offset: [0, 10],
//                                 },
//                               },
//                               {
//                                 name: 'preventOverflow',
//                                 options: {
//                                   boundariesElement: 'viewport',
//                                 },
//                               },
//                               {
//                                 name: 'flip',
//                                 options: {
//                                   fallbackPlacements: ['top-start', 'bottom-start', 'right', 'left'],
//                                 },
//                               },
//                             ]}
//                             portalId="root"
//                           />
//                         </div>

//                         {/* Expiration date - Calendar Picker */}
//                         <div className="cert-date-picker" style={{ 
//                           width: '100%', 
//                           position: 'relative',
//                           zIndex: 99999
//                         }}>
//                           <DatePicker
//                             selected={parseDate(row.expirationDate)}
//                             onChange={handleDateChange(idx, 'expirationDate')}
//                             dateFormat="MM/dd/yyyy"
//                             placeholderText="MM/DD/YYYY"
//                             showYearDropdown
//                             showMonthDropdown
//                             dropdownMode="select"
//                             yearDropdownItemNumber={100}
//                             scrollableYearDropdown
//                             popperPlacement="bottom-start"
//                             popperModifiers={[
//                               {
//                                 name: 'offset',
//                                 options: {
//                                   offset: [0, 10],
//                                 },
//                               },
//                               {
//                                 name: 'preventOverflow',
//                                 options: {
//                                   boundariesElement: 'viewport',
//                                 },
//                               },
//                               {
//                                 name: 'flip',
//                                 options: {
//                                   fallbackPlacements: ['top-start', 'bottom-start', 'right', 'left'],
//                                 },
//                               },
//                             ]}
//                             portalId="root"
//                           />
//                         </div>

//                         {/* Upload / file ref - File Upload Button */}
//                         <div>
//                           <input
//                             ref={(el) => (fileInputRefs.current[idx] = el)}
//                             type="file"
//                             accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                             onChange={handleFileUpload(idx)}
//                             style={{ display: 'none' }}
//                           />
//                           <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
//                             <button
//                               type="button"
//                               className={`file-upload-btn ${row.uploadRef ? 'has-file' : ''}`}
//                               onClick={triggerFileUpload(idx)}
//                               disabled={uploadingIndex === idx}
//                               title={row.uploadRef || 'Upload file'}
//                               style={{ flex: 1 }}
//                             >
//                               {uploadingIndex === idx ? (
//                                 <>⏳ Uploading...</>
//                               ) : row.uploadRef ? (
//                                 <>
//                                   <span>📎</span>
//                                   <span className="file-name">{row.uploadRef}</span>
//                                 </>
//                               ) : (
//                                 <>
//                                   <span>📤</span>
//                                   <span>Upload</span>
//                                 </>
//                               )}
//                             </button>
//                             {row.uploadRef && (
//                               <button
//                                 type="button"
//                                 className="delete-btn"
//                                 onClick={() => handleDeleteCertificate(idx, row.fileKey)}
//                                 style={{
//                                   background: 'none',
//                                   border: 'none',
//                                   cursor: 'pointer',
//                                   color: '#dc2626',
//                                   fontSize: '16px',
//                                   padding: '4px 6px',
//                                   borderRadius: '4px',
//                                   transition: 'background 0.2s',
//                                 }}
//                                 onMouseEnter={(e) => {
//                                   e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)'
//                                 }}
//                                 onMouseLeave={(e) => {
//                                   e.currentTarget.style.background = 'transparent'
//                                 }}
//                                 title="Delete file"
//                               >
//                                 ✕
//                               </button>
//                             )}
//                           </div>
//                         </div>

//                         {/* Remove Row Button */}
//                         <button
//                           type="button"
//                           className="remove-row-btn"
//                           onClick={() => removeCertRow(idx)}
//                           title="Remove this certificate"
//                           style={{
//                             display: 'inline-flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             width: '28px',
//                             height: '28px',
//                             background: certRows.length <= 1 ? 'rgba(23, 38, 58, 0.04)' : 'rgba(220, 38, 38, 0.08)',
//                             color: certRows.length <= 1 ? 'rgba(23, 38, 58, 0.3)' : '#dc2626',
//                             border: 'none',
//                             borderRadius: '6px',
//                             cursor: certRows.length <= 1 ? 'not-allowed' : 'pointer',
//                             transition: 'all 0.2s ease',
//                             flexShrink: 0,
//                           }}
//                           disabled={certRows.length <= 1}
//                         >
//                           <IconTrash />
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Add Row Button */}
//                   <button
//                     type="button"
//                     className="add-row-btn"
//                     onClick={addCertRow}
//                     style={{
//                       display: 'inline-flex',
//                       alignItems: 'center',
//                       gap: '6px',
//                       padding: '8px 16px',
//                       background: 'rgba(15, 78, 169, 0.06)',
//                       color: '#0f4ea9',
//                       border: '1px dashed rgba(15, 78, 169, 0.3)',
//                       borderRadius: '8px',
//                       fontSize: '13px',
//                       fontWeight: 500,
//                       cursor: 'pointer',
//                       transition: 'all 0.2s ease',
//                       marginTop: '12px',
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background = 'rgba(15, 78, 169, 0.1)'
//                       e.currentTarget.style.borderColor = '#0f4ea9'
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background = 'rgba(15, 78, 169, 0.06)'
//                       e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.3)'
//                     }}
//                   >
//                     <IconPlus />
//                     Add Certificate
//                   </button>
//                 </div>

//                 {/* ============================================================
//                 SECTION 3: SAFETY FLAGS (Commented out as in original)
//                 ============================================================ */}
//                 {/* Safety flags section remains unchanged */}

//               </div>
//             </div>

//             {/* ============================================================
//             FOOTER
//             ============================================================ */}
//             <div style={{
//               display: 'flex',
//               justifyContent: 'flex-end',
//               gap: '12px',
//               paddingTop: '16px',
//               paddingBottom: '8px',
//               borderTop: '1px solid rgba(18, 38, 63, 0.08)',
//               flexShrink: 0,
//               background: 'transparent',
//               zIndex: 10,
//             }}>
//               <button
//                 onClick={handleBack}
//                 style={{
//                   padding: '10px 24px',
//                   borderRadius: '8px',
//                   background: 'transparent',
//                   color: '#17263a',
//                   border: '1px solid rgba(18, 38, 63, 0.12)',
//                   cursor: 'pointer',
//                   fontWeight: 600,
//                   fontSize: '14px',
//                   transition: 'all 0.2s',
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'}
//                 onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={isSaving}
//                 style={{
//                   padding: '10px 32px',
//                   borderRadius: '8px',
//                   background: isSaving ? '#94a3b8' : '#0f4ea9',
//                   color: 'white',
//                   border: 'none',
//                   cursor: isSaving ? 'not-allowed' : 'pointer',
//                   fontWeight: 600,
//                   fontSize: '14px',
//                   transition: 'all 0.2s',
//                   opacity: isSaving ? 0.7 : 1,
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isSaving) {
//                     e.currentTarget.style.background = '#0b3f90'
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isSaving) {
//                     e.currentTarget.style.background = '#0f4ea9'
//                   }
//                 }}
//               >
//                 {isSaving ? 'Saving...' : 'Save Changes'}
//               </button>
//             </div>

//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default CertificationEditPage




// src/worker/pages/CertificationEditPage.jsx
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TopNav } from '../../common/components/TopNav'
import workerService from '../services/workerService'
import wizardService from '../services/workerWizardService'

// ============================================================
// ICONS
// ============================================================

function IconGrid(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
    </svg>
  )
}

function IconFolder(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor" />
    </svg>
  )
}

function IconChart(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor" />
    </svg>
  )
}

function IconLogout(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
    </svg>
  )
}

function IconSupport(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
    </svg>
  )
}

function IconUser(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
    </svg>
  )
}

function IconArrowLeft(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconChevronDown(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconChevronRight(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconPlus(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function IconTrash(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ============================================================
// TOOLS & CERTIFICATIONS BY TRADE - SECTION BASED (Matching WizardStep3)
// ============================================================

const TOOLS_CERTIFICATIONS = {
  // ============================================================
  // HVAC/Mechanical
  // ============================================================
  'HVAC/Mechanical': {
    'Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Certifications / Training / Licenses': [
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
    'Tools / Equipment': [
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
    'Certifications / Training / Licenses': [
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
    'Tools / Equipment': [
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
    'Certifications / Training': [
      'OSHA 10',
      'OSHA 30',
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Fall Protection Training',
      'Ladder Safety',
    ],
    'Tools / Equipment': [
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
    'Certifications / Training': [
      'OSHA 10',
      'OSHA 30',
      'Silica Awareness',
      'Fall Protection',
      'Confined Space Awareness',
      'Trench Safety Awareness',
      'Hot Work Awareness',
    ],
    'Tools / Equipment': [
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
    'Certifications / Training / Licenses': [
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
    'Tools / Equipment': [
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
    'Certifications / Training / Licenses': [
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
    'Tools / Equipment': [
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
    'Certifications / Training': [
      'OSHA 10',
      'First Aid (Optional)',
    ],
    'Tools / Equipment': [
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
    'Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Certifications / Training': [
      'OSHA 10',
      'OSHA 30',
      'Fall Protection',
      'Fire Watch',
      'Spotter',
      'Forklift Certification',
      'Scissor Lift Certification',
      'Boom Lift Certification',
    ],
    'Tools / Equipment': [
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
    'Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Safety / Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Safety / Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Safety / Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Safety / Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Safety / Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Safety / Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Safety / Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Safety / Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Safety / Certifications / Training': [
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
    'Licenses / Certifications': [
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
    'Tools / Equipment': [
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
    'Safety / Certifications / Training': [
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
    'Licenses / Certifications': [
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
    'Tools / Equipment': [
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
    'Safety / Certifications / Training': [
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
    'Licenses / Certifications': [
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
    'Tools / Test Equipment': [
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
    'Safety / Certifications / Training': [
      'Lift Certification',
      'Scissor Lift Experience',
      'Boom Lift Experience',
      'Rolling Scaffold Experience',
      'Ladder Safety / Experience',
      'High-Ceiling Work Experience',
    ],
    'Tools / Equipment': [
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
    'Material Handling': [
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
    'Safety / Certifications / Training': [
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
    'Tools / Equipment': [
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
    'Material Handling & Lifting': [
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
    'Documentation & Service': [
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

// ============================================================
// Helper function to get flat tools list for rendering
// ============================================================
const getFlatToolsList = (trade) => {
  const sections = TOOLS_CERTIFICATIONS[trade]
  if (!sections) return []
  const allItems = []
  Object.keys(sections).forEach(section => {
    sections[section].forEach(item => {
      allItems.push(item)
    })
  })
  return allItems
}

// ============================================================
// Helper function to get sections for rendering with headers
// ============================================================
const getToolSections = (trade) => {
  return TOOLS_CERTIFICATIONS[trade] || {}
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function CertificationEditPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // ============================================================
  // STATE MANAGEMENT
  // ============================================================
  
  const [certData, setCertData] = useState({
    certChecklist: {},
    certRows: [
      { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
    ],
    safetyFlags: {},
  })
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [uploadingIndex, setUploadingIndex] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const [userTrades, setUserTrades] = useState([])
  const [expandedSections, setExpandedSections] = useState({})
  const fileInputRefs = useRef({})

  // ============================================================
  // LOAD DATA FROM WORKERS TABLE
  // ============================================================
  
  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          setError('User ID not found. Please login again.')
          setLoading(false)
          return
        }

        console.log('📊 Fetching certification data from Workers table')
        
        // First check if we have data in location state
        if (location?.state?.tradeData) {
          const data = location.state.tradeData
          if (data.certRows && data.certRows.length > 0) {
            console.log('✅ Using certification data from location.state')
            setCertData({
              certChecklist: data.certChecklist || {},
              certRows: data.certRows || [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }],
              safetyFlags: data.safetyFlags || {},
            })
            if (data.tradeRows) {
              const trades = data.tradeRows.map(row => row.trade).filter(Boolean)
              setUserTrades(trades)
              // ✅ ALL TRADES COLLAPSED BY DEFAULT
              const expanded = {}
              trades.forEach(t => { expanded[t] = false })
              setExpandedSections(expanded)
            }
            setLoading(false)
            return
          }
          console.log('⚠️ location.state.tradeData exists but has no certRows, fetching from API')
        }

        const profile = await workerService.getWorkerProfile(userId)
        
        if (profile.success && profile.data) {
          console.log('📦 Profile data received:', profile.data)
          
          const tradeData = profile.data.trade || {}
          
          // ✅ Get ALL trades from tradeRows
          const tradeRows = tradeData.tradeRows || []
          const trades = tradeRows.map(row => row.trade).filter(Boolean)
          
          // If no trades in tradeRows, try mainTrade
          if (trades.length === 0 && tradeData.mainTrade) {
            trades.push(tradeData.mainTrade)
          }
          
          setUserTrades(trades)
          console.log('✅ User trades:', trades)
          
          // ✅ ALL TRADES COLLAPSED BY DEFAULT
          const expanded = {}
          trades.forEach(t => { expanded[t] = false })
          setExpandedSections(expanded)
          
          // ✅ Get tools certifications from trade.toolsCertifications
          const toolsCerts = tradeData.toolsCertifications || {}
          const checkedCount = Object.values(toolsCerts).filter(v => v === true).length
          console.log(`🔧 Tools certifications from trade: ${checkedCount} selected`)
          
          const certsData = profile.data.certifications || {}
          const certChecklist = certsData.certChecklist || {}
          
          const checklistData = Object.keys(toolsCerts).length > 0 
            ? toolsCerts 
            : certChecklist
          
          console.log('✅ Final checklist data:', Object.keys(checklistData).filter(k => checklistData[k]).length, 'selected')
          
          let certRows = certsData.certRows || []
          if (certRows.length === 0) {
            certRows = [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }]
          }
          
          const safetyFlags = certsData.safetyFlags || {}
          
          setCertData({
            certChecklist: checklistData,
            certRows: certRows,
            safetyFlags: safetyFlags,
          })
          
          console.log('✅ Certifications loaded successfully')
          console.log('  - Trades:', trades)
          console.log('  - Checklist items:', Object.keys(checklistData).length)
          console.log('  - Selected items:', Object.keys(checklistData).filter(k => checklistData[k]).length)
          
        } else {
          console.log('ℹ️ No profile data found, initializing empty state')
          setCertData({
            certChecklist: {},
            certRows: [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }],
            safetyFlags: {},
          })
          setUserTrades([])
        }
      } catch (error) {
        console.error('❌ Error loading certifications:', error)
        setError(error.message || 'Failed to load certifications')
      } finally {
        setLoading(false)
      }
    }

    loadCertifications()
  }, [location?.state?.tradeData])

  // ============================================================
  // HANDLERS
  // ============================================================
  
  const handleChange = (field, value) => {
    setCertData(prev => ({ ...prev, [field]: value }))
  }

  const toggleCertChecklist = (key) => (e) => {
    const isChecked = e.target.checked
    console.log(`🔄 Toggling ${key}: ${isChecked}`)
    setCertData(prev => ({
      ...prev,
      certChecklist: {
        ...(prev.certChecklist || {}),
        [key]: isChecked,
      },
    }))
  }

  const toggleSafetyFlag = (key) => (e) => {
    const isChecked = e.target.checked
    setCertData(prev => ({
      ...prev,
      safetyFlags: {
        ...(prev.safetyFlags || {}),
        [key]: isChecked,
      },
    }))
  }

  const updateCertRow = (index, key) => (value) => {
    setCertData(prev => {
      const rows = [...(prev.certRows || [])]
      if (!rows[index]) {
        rows[index] = { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }
      }
      rows[index] = { ...rows[index], [key]: value }
      return { ...prev, certRows: rows }
    })
  }

  const toggleSection = (trade) => {
    setExpandedSections(prev => ({
      ...prev,
      [trade]: !prev[trade]
    }))
  }

  // ============================================================
  // CERTIFICATION ROW OPERATIONS
  // ============================================================
  
  const addCertRow = () => {
    setCertData(prev => ({
      ...prev,
      certRows: [
        ...(prev.certRows || []),
        { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }
      ]
    }))
  }

  const removeCertRow = (index) => {
    setCertData(prev => {
      const rows = [...(prev.certRows || [])]
      if (rows.length <= 1) {
        rows[0] = { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }
        return { ...prev, certRows: rows }
      }
      rows.splice(index, 1)
      return { ...prev, certRows: rows }
    })
  }

  // ============================================================
  // FILE UPLOAD HANDLER
  // ============================================================
  
  const handleFileUpload = (index) => async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB')
      return
    }

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Invalid file type. Allowed: PDF, JPEG, PNG, DOC, DOCX')
      return
    }

    setUploadingIndex(index)
    setUploadError('')

    try {
      const userId = localStorage.getItem('userId')
      if (!userId) throw new Error('User ID not found')

      console.log(`📄 Uploading certificate (row ${index}) for user: ${userId}`)

      const result = await wizardService.uploadCertificate(userId, file, index)
      
      if (result.success) {
        setCertData(prev => {
          const rows = [...(prev.certRows || [])]
          if (!rows[index]) {
            rows[index] = { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }
          }
          rows[index] = {
            ...rows[index],
            uploadRef: file.name,
            fileKey: result.fileKey,
            fileUrl: result.fileUrl,
            uploadedAt: new Date().toISOString()
          }
          return { ...prev, certRows: rows }
        })
        setSuccess(`File "${file.name}" uploaded successfully!`)
      }
    } catch (error) {
      console.error('Error uploading certificate:', error)
      setUploadError(error.message || 'Failed to upload file')
    } finally {
      setUploadingIndex(null)
    }
  }

  const triggerFileUpload = (index) => () => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click()
    }
  }

  // ============================================================
  // DATE HANDLERS
  // ============================================================
  
  const handleDateChange = (index, field) => (date) => {
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      updateCertRow(index, field)(`${month}/${day}/${year}`)
    } else {
      updateCertRow(index, field)('')
    }
  }

  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
    }
    return null
  }

  // ============================================================
  // DELETE CERTIFICATE
  // ============================================================
  
  const handleDeleteCertificate = async (index, fileKey) => {
    if (!fileKey) {
      updateCertRow(index, 'uploadRef')('')
      updateCertRow(index, 'fileKey')('')
      updateCertRow(index, 'fileUrl')('')
      return
    }

    if (!confirm('Are you sure you want to delete this certificate?')) return

    try {
      const userId = localStorage.getItem('userId')
      if (!userId) throw new Error('User ID not found')

      await wizardService.deleteCertificate(userId, index, fileKey)
      
      updateCertRow(index, 'uploadRef')('')
      updateCertRow(index, 'fileKey')('')
      updateCertRow(index, 'fileUrl')('')
      
      setSuccess('Certificate deleted successfully!')
    } catch (error) {
      console.error('Error deleting certificate:', error)
      setError(error.message || 'Failed to delete certificate')
    }
  }

  // ============================================================
  // SAVE TO WORKERS TABLE
  // ============================================================
  
  const handleSave = async () => {
    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        throw new Error('User ID not found. Please login again.')
      }

      console.log('💾 Saving certifications to Workers table')
      console.log('📋 certChecklist:', certData.certChecklist)

      const profile = await workerService.getWorkerProfile(userId)
      const currentTrade = profile.data?.trade || {}
      
      const updatedTrade = {
        ...currentTrade,
        toolsCertifications: certData.certChecklist || {},
      }
      
      await workerService.updateTrade(userId, updatedTrade)
      console.log('✅ Trade toolsCertifications updated')
      
      await workerService.updateCertifications(userId, {
        certChecklist: certData.certChecklist || {},
        certRows: certData.certRows || [],
        safetyFlags: certData.safetyFlags || {},
      })
      
      console.log('✅ Certifications saved to Workers table')
      setSuccess('Certifications saved successfully!')

      setTimeout(() => {
        navigate('/wizard/summary', {
          state: {
            ...location?.state?.parentData,
            certifications: certData,
            updatedCert: true
          },
          replace: true
        })
      }, 500)

    } catch (error) {
      console.error('❌ Error saving certifications:', error)
      setError(error.message || 'Failed to save certifications')
    } finally {
      setIsSaving(false)
    }
  }

  const handleBack = () => {
    navigate('/wizard/summary', {
      state: location?.state?.parentData || {},
      replace: true
    })
  }

  // ============================================================
  // RENDER HELPERS
  // ============================================================
  
  const certRows = certData.certRows || [
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
  ]

  // ✅ UPDATED: Get sections for a trade
  const getTradeSections = (trade) => {
    return getToolSections(trade)
  }

  // ✅ UPDATED: Get all items from all sections for a trade (for count)
  const getAllItemsForTrade = (trade) => {
    return getFlatToolsList(trade)
  }

  // ============================================================
  // STYLES
  // ============================================================
  
  const datePickerStyles = `
    .cert-date-picker .react-datepicker__input-container input {
      width: 100%;
      height: 36px;
      padding: 0 8px;
      padding-right: 28px;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 6px;
      font-size: 13px;
      outline: none;
      background: white;
      color: #17263a;
      transition: all 0.2s ease;
      font-family: inherit;
      cursor: pointer;
    }

    .cert-date-picker .react-datepicker__input-container input:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .cert-date-picker .react-datepicker__input-container input:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .cert-date-picker .react-datepicker__input-container input::placeholder {
      color: rgba(23, 38, 58, 0.4);
    }

    .cert-date-picker .react-datepicker {
      font-family: inherit;
      border-radius: 12px;
      border: 1px solid rgba(18, 38, 63, 0.08);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
      background: white;
      padding: 8px;
      overflow: hidden;
      font-size: 13px;
    }

    .cert-date-picker .react-datepicker__header {
      background: white;
      border-bottom: 1px solid rgba(18, 38, 63, 0.06);
      padding: 10px 0 6px 0;
      border-radius: 12px 12px 0 0;
    }

    .cert-date-picker .react-datepicker__current-month {
      color: #17263a;
      font-weight: 700;
      font-size: 14px;
      padding-bottom: 4px;
    }

    .cert-date-picker .react-datepicker__day-name {
      color: rgba(23, 38, 58, 0.5);
      font-weight: 600;
      font-size: 11px;
      width: 32px;
      margin: 2px;
    }

    .cert-date-picker .react-datepicker__day {
      width: 32px;
      height: 32px;
      line-height: 32px;
      margin: 2px;
      border-radius: 8px;
      font-size: 13px;
      color: #17263a;
      transition: all 0.15s ease;
      cursor: pointer;
    }

    .cert-date-picker .react-datepicker__day:hover {
      background: rgba(15, 78, 169, 0.08);
      border-radius: 8px;
    }

    .cert-date-picker .react-datepicker__day--selected {
      background: #0f4ea9 !important;
      color: white !important;
      border-radius: 8px;
      font-weight: 600;
    }

    .cert-date-picker .react-datepicker__day--selected:hover {
      background: #0b3f90 !important;
    }

    .cert-date-picker .react-datepicker__day--keyboard-selected {
      background: rgba(15, 78, 169, 0.15);
      border-radius: 8px;
    }

    .cert-date-picker .react-datepicker__day--today {
      font-weight: 700;
      color: #0f4ea9;
    }

    .cert-date-picker .react-datepicker__day--today::after {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      background: #0f4ea9;
      border-radius: 50%;
      margin: 0 auto;
      margin-top: -2px;
    }

    .cert-date-picker .react-datepicker__day--disabled {
      color: rgba(23, 38, 58, 0.2);
      cursor: not-allowed;
    }

    .cert-date-picker .react-datepicker__day--disabled:hover {
      background: transparent;
    }

    .cert-date-picker .react-datepicker__navigation {
      top: 12px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .cert-date-picker .react-datepicker__navigation:hover {
      background: rgba(15, 78, 169, 0.08);
    }

    .cert-date-picker .react-datepicker__navigation-icon::before {
      border-color: #17263a;
      border-width: 2px 2px 0 0;
      height: 7px;
      width: 7px;
    }

    .cert-date-picker .react-datepicker__day--weekend {
      color: #e11d48;
    }

    .cert-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
      color: white;
    }

    .cert-date-picker .react-datepicker__input-container {
      width: 100%;
    }

    .cert-date-picker .react-datepicker-wrapper {
      width: 100%;
    }

    .cert-date-picker .react-datepicker__input-container {
      position: relative;
    }

    .cert-date-picker .react-datepicker__input-container::after {
      content: '📅';
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      pointer-events: none;
      opacity: 0.6;
    }

    .react-datepicker-popper {
      z-index: 9999 !important;
    }
  `

  const fileUploadStyles = `
    .file-upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      background: rgba(15, 78, 169, 0.08);
      color: #0f4ea9;
      border: 1px solid rgba(15, 78, 169, 0.2);
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      width: 100%;
      justify-content: center;
      white-space: nowrap;
    }

    .file-upload-btn:hover {
      background: rgba(15, 78, 169, 0.15);
      border-color: #0f4ea9;
    }

    .file-upload-btn.has-file {
      background: rgba(47, 180, 99, 0.1);
      border-color: #2fb463;
      color: #2fb463;
    }

    .file-upload-btn .file-name {
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-upload-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .file-upload-btn .delete-btn {
      margin-left: 4px;
      color: #dc2626;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 14px;
      padding: 0 4px;
    }

    .file-upload-btn .delete-btn:hover {
      color: #b91c1c;
    }

    .add-row-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: rgba(15, 78, 169, 0.06);
      color: #0f4ea9;
      border: 1px dashed rgba(15, 78, 169, 0.3);
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 12px;
    }

    .add-row-btn:hover {
      background: rgba(15, 78, 169, 0.1);
      border-color: #0f4ea9;
    }

    .remove-row-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: rgba(220, 38, 38, 0.08);
      color: #dc2626;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .remove-row-btn:hover {
      background: rgba(220, 38, 38, 0.15);
    }
  `

  // ============================================================
  // RENDER
  // ============================================================
  
  if (loading) {
    return (
      <div className="appShell">
        <TopNav variant="solid" />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '80vh',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid rgba(15, 78, 169, 0.1)',
            borderTop: '3px solid #0f4ea9',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#17263a' }}>Loading certifications...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
                <span className="sideText">Overview</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="12 projects">12</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconChart /></span>
                <span className="sideText">Revenues</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true"><IconUser /></span>
                <span className="sideText">Profile</span>
              </a>
            </nav>
          </div>

          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup" aria-label="General">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
                <span className="sideIcon" aria-hidden="true"><IconLogout /></span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        <main className="appContent">
          <div style={{ 
            padding: '24px', 
            maxWidth: '1100px', 
            margin: '0 auto', 
            height: 'calc(100vh - 120px)', 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            
            {/* ============================================================
            HEADER
            ============================================================ */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(18, 38, 63, 0.08)',
              flexShrink: 0,
              background: 'transparent',
              zIndex: 10,
            }}>
              <button
                onClick={handleBack}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#17263a',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <IconArrowLeft />
                Back
              </button>
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#17263a',
              }}>
                Edit Certifications & Safety
              </span>
              {userTrades.length > 0 && (
                <span style={{
                  marginLeft: '8px',
                  padding: '4px 12px',
                  background: 'rgba(15, 78, 169, 0.08)',
                  borderRadius: '16px',
                  fontSize: '12px',
                  color: '#0f4ea9',
                  fontWeight: 500,
                }}>
                  {userTrades.length} trade{userTrades.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* ============================================================
            NOTIFICATIONS
            ============================================================ */}
            {error && (
              <div style={{
                padding: '12px 16px',
                background: '#fee2e2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>❌ {error}</span>
                <button
                  onClick={() => setError('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#dc2626',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {uploadError && (
              <div style={{
                padding: '12px 16px',
                background: '#fee2e2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>❌ {uploadError}</span>
                <button
                  onClick={() => setUploadError('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#dc2626',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {success && (
              <div style={{
                padding: '12px 16px',
                background: '#d1fae5',
                color: '#065f46',
                border: '1px solid #6ee7b7',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>✅ {success}</span>
                <button
                  onClick={() => setSuccess('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#065f46',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {/* ============================================================
            CONTENT - SCROLLABLE
            ============================================================ */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              paddingBottom: '16px',
            }}>
              <style>{datePickerStyles}</style>
              <style>{fileUploadStyles}</style>
              
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(18, 38, 63, 0.08)',
              }}>
                
                {/* ============================================================
                SECTION 1: CERTIFICATION CHECKLIST - ALL TRADES
                ============================================================ */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '16px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>1. Certification Checklist</span>
                    {userTrades.length > 0 && (
                      <span style={{
                        fontSize: '12px',
                        color: 'rgba(23, 38, 58, 0.5)',
                        fontWeight: 400,
                      }}>
                        {userTrades.length} trade{userTrades.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {userTrades.length > 0 ? (
                    <div>
                      {userTrades.map((trade) => {
                        const sections = getTradeSections(trade)
                        const sectionKeys = Object.keys(sections)
                        const allItems = getAllItemsForTrade(trade)
                        const isExpanded = expandedSections[trade] || false
                        const checkedForTrade = allItems.filter(item => certData.certChecklist?.[item] === true).length
                        const totalItems = allItems.length
                        
                        return (
                          <div key={trade} style={{ marginBottom: '12px' }}>
                            <div 
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px 16px',
                                background: isExpanded ? 'rgba(15, 78, 169, 0.05)' : 'rgba(15, 78, 169, 0.02)',
                                border: isExpanded ? '1px solid rgba(15, 78, 169, 0.2)' : '1px solid rgba(18, 38, 63, 0.08)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                              onClick={() => toggleSection(trade)}
                              onMouseEnter={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.style.background = 'rgba(15, 78, 169, 0.04)'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.style.background = 'rgba(15, 78, 169, 0.02)'
                                }
                              }}
                            >
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                flexWrap: 'wrap',
                              }}>
                                <span style={{
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  color: '#17263a',
                                }}>
                                  {trade}
                                </span>
                                <span style={{
                                  fontSize: '11px',
                                  color: 'rgba(23, 38, 58, 0.4)',
                                  background: 'rgba(23, 38, 58, 0.06)',
                                  padding: '2px 10px',
                                  borderRadius: '12px',
                                }}>
                                  {totalItems} items
                                </span>
                                {checkedForTrade > 0 && (
                                  <span style={{
                                    fontSize: '11px',
                                    color: '#2fb463',
                                    background: 'rgba(47, 180, 99, 0.1)',
                                    padding: '2px 10px',
                                    borderRadius: '12px',
                                  }}>
                                    {checkedForTrade} selected
                                  </span>
                                )}
                              </div>
                              {isExpanded ? (
                                <IconChevronDown style={{ color: 'rgba(23, 38, 58, 0.4)' }} />
                              ) : (
                                <IconChevronRight style={{ color: 'rgba(23, 38, 58, 0.4)' }} />
                              )}
                            </div>

                            {isExpanded && sectionKeys.length > 0 && (
                              <div style={{
                                marginTop: '12px',
                                padding: '16px 20px',
                                border: '1px solid rgba(18, 38, 63, 0.06)',
                                borderRadius: '8px',
                                background: 'white',
                              }}>
                                {sectionKeys.map((sectionKey) => (
                                  <div key={sectionKey} style={{ marginBottom: '14px' }}>
                                    <div style={{
                                      fontSize: '12px',
                                      fontWeight: 600,
                                      color: '#0f4ea9',
                                      marginBottom: '6px',
                                      paddingBottom: '2px',
                                      borderBottom: '1px solid rgba(15, 78, 169, 0.1)',
                                    }}>
                                      {sectionKey}
                                      <span style={{
                                        fontSize: '10px',
                                        fontWeight: 400,
                                        color: 'rgba(23, 38, 58, 0.4)',
                                        marginLeft: '6px',
                                      }}>
                                        ({sections[sectionKey].length})
                                      </span>
                                    </div>
                                    <div style={{ 
                                      display: 'grid', 
                                      gridTemplateColumns: '1fr 1fr 1fr', 
                                      gap: '6px'
                                    }}>
                                      {sections[sectionKey].map((cert) => (
                                        <label key={cert} style={{ 
                                          display: 'flex', 
                                          alignItems: 'center', 
                                          gap: '8px', 
                                          cursor: 'pointer',
                                          padding: '4px 8px',
                                          borderRadius: '6px',
                                          transition: 'background 0.15s ease',
                                          fontSize: '13px',
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.background = 'rgba(15, 78, 169, 0.03)'
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background = 'transparent'
                                        }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={!!(certData.certChecklist?.[cert] || false)}
                                            onChange={toggleCertChecklist(cert)}
                                            style={{
                                              width: '18px',
                                              height: '18px',
                                              cursor: 'pointer',
                                              accentColor: '#0f4ea9',
                                            }}
                                          />
                                          <span style={{ fontSize: '13px', color: '#17263a' }}>{cert}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      color: 'rgba(23, 38, 58, 0.4)',
                      fontSize: '14px',
                      border: '1px dashed rgba(18, 38, 63, 0.12)',
                      borderRadius: '8px',
                    }}>
                      Please add trades in your Trade Profile first.
                    </div>
                  )}
                </div>

                {/* ============================================================
                SECTION 2: VERIFICATION DATA
                ============================================================ */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '16px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>2. Verification Data</span>
                    <span style={{ fontSize: '13px', color: 'rgba(23, 38, 58, 0.5)', fontWeight: 400 }}>
                      {certRows.length} certificate{certRows.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div style={{ 
                    width: '100%', 
                    overflowX: 'auto',
                    position: 'relative'
                  }}>
                    {/* Header Row */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr 40px',
                      gap: '8px',
                      padding: '8px 4px',
                      borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                      fontWeight: 600,
                      fontSize: '11px',
                      color: 'rgba(23, 38, 58, 0.6)',
                      minWidth: '750px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      <div>Certification / card name</div>
                      <div>Card number / ID</div>
                      <div>Issue date</div>
                      <div>Expiration date</div>
                      <div>Upload / file ref</div>
                      <div style={{ textAlign: 'center' }}></div>
                    </div>

                    {/* Data Rows */}
                    {certRows.map((row, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          display: 'grid', 
                          gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr 40px',
                          gap: '8px',
                          padding: '6px 4px',
                          borderBottom: idx < certRows.length - 1 ? '1px solid rgba(18, 38, 63, 0.06)' : 'none',
                          alignItems: 'center',
                          minWidth: '750px'
                        }}
                      >
                        <input 
                          value={row.name || ''} 
                          onChange={(e) => updateCertRow(idx, 'name')(e.target.value)}
                          placeholder="e.g. OSHA 10"
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            border: '1px solid rgba(18, 38, 63, 0.12)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            background: 'white',
                            color: '#17263a',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0f4ea9'
                            e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
                            e.target.style.boxShadow = 'none'
                          }}
                        />

                        <input 
                          value={row.cardNumber || ''} 
                          onChange={(e) => updateCertRow(idx, 'cardNumber')(e.target.value)}
                          placeholder="Card ID"
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            border: '1px solid rgba(18, 38, 63, 0.12)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            background: 'white',
                            color: '#17263a',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0f4ea9'
                            e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
                            e.target.style.boxShadow = 'none'
                          }}
                        />

                        {/* Issue date - Calendar Picker */}
                        <div className="cert-date-picker" style={{ 
                          width: '100%', 
                          position: 'relative',
                          zIndex: 99999
                        }}>
                          <DatePicker
                            selected={parseDate(row.issueDate)}
                            onChange={handleDateChange(idx, 'issueDate')}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="MM/DD/YYYY"
                            maxDate={new Date()}
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                            yearDropdownItemNumber={100}
                            scrollableYearDropdown
                            popperPlacement="bottom-start"
                            popperModifiers={[
                              {
                                name: 'offset',
                                options: {
                                  offset: [0, 10],
                                },
                              },
                              {
                                name: 'preventOverflow',
                                options: {
                                  boundariesElement: 'viewport',
                                },
                              },
                              {
                                name: 'flip',
                                options: {
                                  fallbackPlacements: ['top-start', 'bottom-start', 'right', 'left'],
                                },
                              },
                            ]}
                            portalId="root"
                          />
                        </div>

                        {/* Expiration date - Calendar Picker */}
                        <div className="cert-date-picker" style={{ 
                          width: '100%', 
                          position: 'relative',
                          zIndex: 99999
                        }}>
                          <DatePicker
                            selected={parseDate(row.expirationDate)}
                            onChange={handleDateChange(idx, 'expirationDate')}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="MM/DD/YYYY"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                            yearDropdownItemNumber={100}
                            scrollableYearDropdown
                            popperPlacement="bottom-start"
                            popperModifiers={[
                              {
                                name: 'offset',
                                options: {
                                  offset: [0, 10],
                                },
                              },
                              {
                                name: 'preventOverflow',
                                options: {
                                  boundariesElement: 'viewport',
                                },
                              },
                              {
                                name: 'flip',
                                options: {
                                  fallbackPlacements: ['top-start', 'bottom-start', 'right', 'left'],
                                },
                              },
                            ]}
                            portalId="root"
                          />
                        </div>

                        {/* Upload / file ref - File Upload Button */}
                        <div>
                          <input
                            ref={(el) => (fileInputRefs.current[idx] = el)}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            onChange={handleFileUpload(idx)}
                            style={{ display: 'none' }}
                          />
                          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <button
                              type="button"
                              className={`file-upload-btn ${row.uploadRef ? 'has-file' : ''}`}
                              onClick={triggerFileUpload(idx)}
                              disabled={uploadingIndex === idx}
                              title={row.uploadRef || 'Upload file'}
                              style={{ flex: 1 }}
                            >
                              {uploadingIndex === idx ? (
                                <>⏳ Uploading...</>
                              ) : row.uploadRef ? (
                                <>
                                  <span>📎</span>
                                  <span className="file-name">{row.uploadRef}</span>
                                </>
                              ) : (
                                <>
                                  <span>📤</span>
                                  <span>Upload</span>
                                </>
                              )}
                            </button>
                            {row.uploadRef && (
                              <button
                                type="button"
                                className="delete-btn"
                                onClick={() => handleDeleteCertificate(idx, row.fileKey)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: '#dc2626',
                                  fontSize: '16px',
                                  padding: '4px 6px',
                                  borderRadius: '4px',
                                  transition: 'background 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent'
                                }}
                                title="Delete file"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Remove Row Button */}
                        <button
                          type="button"
                          className="remove-row-btn"
                          onClick={() => removeCertRow(idx)}
                          title="Remove this certificate"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '28px',
                            height: '28px',
                            background: certRows.length <= 1 ? 'rgba(23, 38, 58, 0.04)' : 'rgba(220, 38, 38, 0.08)',
                            color: certRows.length <= 1 ? 'rgba(23, 38, 58, 0.3)' : '#dc2626',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: certRows.length <= 1 ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            flexShrink: 0,
                          }}
                          disabled={certRows.length <= 1}
                        >
                          <IconTrash />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Row Button */}
                  <button
                    type="button"
                    className="add-row-btn"
                    onClick={addCertRow}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      background: 'rgba(15, 78, 169, 0.06)',
                      color: '#0f4ea9',
                      border: '1px dashed rgba(15, 78, 169, 0.3)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      marginTop: '12px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(15, 78, 169, 0.1)'
                      e.currentTarget.style.borderColor = '#0f4ea9'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(15, 78, 169, 0.06)'
                      e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.3)'
                    }}
                  >
                    <IconPlus />
                    Add Certificate
                  </button>
                </div>

                {/* ============================================================
                SECTION 3: SAFETY FLAGS (Commented out as in original)
                ============================================================ */}
                {/* Safety flags section remains unchanged */}

              </div>
            </div>

            {/* ============================================================
            FOOTER
            ============================================================ */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              paddingTop: '16px',
              paddingBottom: '8px',
              borderTop: '1px solid rgba(18, 38, 63, 0.08)',
              flexShrink: 0,
              background: 'transparent',
              zIndex: 10,
            }}>
              <button
                onClick={handleBack}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  background: 'transparent',
                  color: '#17263a',
                  border: '1px solid rgba(18, 38, 63, 0.12)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                style={{
                  padding: '10px 32px',
                  borderRadius: '8px',
                  background: isSaving ? '#94a3b8' : '#0f4ea9',
                  color: 'white',
                  border: 'none',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  opacity: isSaving ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isSaving) {
                    e.currentTarget.style.background = '#0b3f90'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSaving) {
                    e.currentTarget.style.background = '#0f4ea9'
                  }
                }}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default CertificationEditPage