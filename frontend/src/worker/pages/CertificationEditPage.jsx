// // src/worker/pages/CertificationEditPage.jsx
// import { useState, useRef, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TopNav } from '../../common/components/TopNav'
// import { TextField } from '../../common/components/TextField'
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

// function IconPencil(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" fill="currentColor" />
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
// // TOOLS & CERTIFICATIONS BY TRADE (from WizardStep3)
// // ============================================================

// const TOOLS_CERTIFICATIONS = {
//   'Interiors': [
//     'OSHA 10',
//     'OSHA 30',
//     'Scissor lift experience',
//     'Boom lift experience',
//     'Lift certified',
//     'Fall protection',
//     'Own hand tools',
//     'Own power tools',
//     'Basic PPE',
//     'Reliable transportation',
//     'Valid driver license',
//     'Willing to travel',
//     'Night shift available',
//     'Weekend work available',
//     'Overtime available',
//     'Can pass background check if required',
//     'Can work secure/badged sites',
//     'Bilingual English/Spanish',
//   ],
//   'HVAC/Mechanical': [
//     'EPA 608 Universal',
//     'EPA 608 Type I',
//     'EPA 608 Type II',
//     'EPA 608 Type III',
//     'OSHA 10',
//     'OSHA 30',
//     'Lift certification',
//     'Fall protection training',
//     'Hot work / brazing experience',
//     'Confined space awareness',
//     'First aid / CPR',
//     'Other certification - optional note',
//     'Own basic hand tools',
//     'Own power tools',
//     'Tin snips / sheet metal tools',
//     'Cordless drill / impact',
//     'Multimeter',
//     'Refrigerant gauges',
//     'Vacuum pump',
//     'Recovery machine',
//     'Brazing tools',
//     'Manometer',
//     'Ladders',
//     'PPE available',
//   ],
//   'Electrical / Power': [
//     'Electrical apprentice card / registration',
//     'Journeyman electrician license',
//     'Master electrician license',
//     'Lift certification',
//     'OSHA 10',
//     'OSHA 30',
//     'Fall protection training',
//     'NFPA 70E / electrical safety training',
//     'Lockout/Tagout awareness',
//     'Own basic hand tools',
//     'Own Cordless tools',
//     'Conduit bender',
//     'Fish tape',
//     'Multimeter',
//     'Label maker',
//     'Reliable transportation',
//     'Valid driver license',
//     'Service vehicle available',
//     'Electrical tool bag',
//     'Ladders',
//     'PPE available',
//   ],
//   'Plumbing / Piping': [
//     'Plumbing license',
//     'Apprentice card',
//     'Journeyman card',
//     'Backflow certification',
//     'Medical gas certification',
//     'Gas piping qualification',
//     'OSHA 10',
//     'OSHA 30',
//     'Lift experience',
//     'Confined space awareness',
//     'Hot work awareness',
//     'Trench safety awareness',
//     'Hospital/healthcare experience',
//     'Own basic hand tools',
//     'Pipe wrenches',
//     'PEX tools',
//     'Copper tools',
//     'Threading tools',
//     'Press tool experience',
//     'Power tools',
//     'PPE',
//   ],
//   'Concrete / Formwork / Rebar / Flatwork': [
//     'OSHA 10',
//     'OSHA 30',
//     'Silica awareness',
//     'Fall protection',
//     'Lift experience',
//     'Confined space awareness',
//     'Trench safety awareness',
//     'Hot work awareness',
//     'Own basic hand tools',
//     'Concrete finishing tools',
//     'Bull float experience',
//     'Power trowel experience',
//     'Concrete saw experience',
//     'Core drill experience',
//     'Laser level experience',
//     'Vibrator experience',
//     'Hard hat',
//     'Safety vest',
//     'Gloves',
//     'Boots',
//     'Eye protection',
//     'Hearing protection',
//   ],
//   'Civil / Sitework / Earthwork / Utilities': [
//     'OSHA 10',
//     'OSHA 30',
//     'Trench safety awareness',
//     'Competent person - trenching',
//     'Flagger certification',
//     'Confined space awareness',
//     'First aid / CPR',
//     'Valid driver license',
//     'CDL',
//     'Equipment certification/card',
//     'TWIC / secure site eligible',
//     'Can pass background check',
//     'Has PPE',
//     'Work boots',
//     'Hard hat',
//     'Safety vest',
//     'Own hand tools',
//     'Can work outdoors',
//     'Can work around heavy equipment',
//     'Can work in heat/cold',
//   ],
//   'Asphalt / Paving Work': [
//     'OSHA 10',
//     'OSHA 30',
//     'Traffic control awareness',
//     'Flagger certification',
//     'Work zone safety',
//     'Hot work / heat exposure experience',
//     'First aid / CPR',
//     'Valid driver license',
//     'CDL',
//     'Equipment card/certification',
//     'Can pass background check',
//     'Secure/badged site eligible',
//     'Has PPE',
//     'High-vis vest/clothing',
//     'Work boots',
//     'Hard hat',
//     'Asphalt hand tools',
//     'Rake/lute tools',
//     'Sealcoat tools',
//     'Striping layout tools',
//     'Can work around traffic',
//     'Can work in heat',
//     'Can work nights',
//     'Can work weekends',
//   ],
//   'Landscaping / Exterior Improvements': [
//     'Own basic hand tools',
//     'Shovel / Rake / Wheelbarrow / Pruners / Landscape hand tools',
//     'Mower',
//     'String trimmer',
//     'Blower',
//     'Plate compactor',
//     'Sod roller',
//     'Small Paver tools',
//     'Cut-off saw experience',
//     'Post hole digger',
//     'Fence stretcher',
//     'Basic hardware tools',
//     'Trenching tools',
//     'Basic irrigation repair tools',
//     'Has PPE',
//     'Outdoor work experience',
//     'Heat/weather tolerance',
//     'OSHA 10',
//     'First aid optional',
//   ],
//   'Roofing / Waterproofing': [
//     'OSHA 10',
//     'OSHA 30',
//     'Fall protection training',
//     'Roof safety awareness',
//     'Harness experience',
//     'Ladder safety',
//     'Hot work awareness',
//     'Torch work experience',
//     'Heat welding experience',
//     'Own hand tools',
//     'Roofing hand tools',
//     'Screw gun/drill',
//     'Utility knives',
//     'Seam probe',
//     'Hand welder',
//     'Robotic welder experience',
//     'Torch equipment experience',
//     'Caulking tools',
//     'Scissor lift experience',
//     'Boom lift experience',
//     'Ladder work',
//     'Roof hatch access',
//     'Material hoist support',
//     'Crane/material staging support',
//     'Hard hat',
//     'Safety glasses',
//     'Gloves',
//     'Boots',
//     'High-vis',
//     'Harness',
//     'Lanyard',
//   ],
//   'General Labor / Site Support / Material Handling': [
//     'OSHA 10',
//     'OSHA 30',
//     'Fall protection',
//     'Fire watch',
//     'Spotter',
//     'Forklift',
//     'Pallet jack',
//     'Dolly/material cart',
//     'Scissor lift',
//     'Boom lift if certified',
//     'Utility knife',
//     'Tape measure',
//     'Broom/shovel',
//     'Scraper',
//     'Basic hand tools',
//     'Hard hat',
//     'Vest',
//     'Safety glasses',
//     'Gloves',
//     'Boots',
//   ],
//   'Demolition / Selective Demo / Abatement Support': [
//     'OSHA 10',
//     'OSHA 30',
//     'PPE awareness',
//     'Eye protection',
//     'Gloves',
//     'Hard hat',
//     'Hearing protection',
//     'Dust mask/respirator experience',
//     'Silica awareness',
//     'HEPA vacuum experience',
//     'Respirator use',
//     'Fit-test required',
//     'Dust-control experience',
//     'Asbestos awareness',
//     'Lead awareness',
//     'Mold remediation support',
//     'Abatement certification',
//     'Containment experience',
//     'Demo saw',
//     'Chipping hammer',
//     'Jackhammer',
//     'Roto-hammer',
//     'Floor scraper',
//     'Grinder',
//     'HEPA vacuum',
//     'Trash chute support',
//     'Carts/dollies',
//   ],
//   'Masonry / Stucco / EIFS Systems': [
//     'OSHA 10',
//     'Fall protection',
//     'Lift experience',
//     'Can work exterior/weather conditions',
//     'OSHA 30',
//     'Silica awareness',
//     'Forklift / telehandler experience',
//     'Can pass background check if required',
//     'Scaffold awareness',
//     'Respirator / fit-test',
//     'Can work at heights',
//     'Secure-site eligible',
//     'Own basic hand tools',
//     'Grinder experience',
//     'Mortar boards / pans',
//     'Stucco tools',
//     'Masonry trowel tools',
//     'Masonry saw experience',
//     'Caulking tools',
//     'PPE available',
//     'Levels / layout tools',
//     'Mixer experience',
//     'EIFS tools',
//     'Reliable transportation',
//   ],
//   'Structural Steel / Misc. Metals / Welding': [
//     'OSHA 10',
//     'OSHA 30',
//     'Fall protection training',
//     'Scissor lift / boom lift experience',
//     'Lift certification',
//     'Welding certification',
//     'Hot work experience',
//     'Rigging / signalperson experience',
//     'Own hand tools',
//     'Welding hood / basic welding gear',
//     'Harness / fall protection gear',
//     'Can work secure/badged site',
//   ],
//   'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems': [
//     'OSHA 10',
//     'OSHA 30',
//     'Fall protection',
//     'Scissor lift / boom lift',
//     'Ladder experience',
//     'Framing tools',
//     'Circular saw',
//     'Compound miter saw',
//     'Table saw',
//     'Impact driver',
//     'Drill',
//     'Chalk line',
//     'Laser level',
//     'Tape measure',
//     'Speed square',
//     'Hand tools',
//     'Hard hat',
//     'Safety glasses',
//     'Gloves',
//     'Hearing protection',
//   ],
//   'Millwork / Cabinets / Finish Carpentry': [
//     'OSHA 10',
//     'Fall protection',
//     'Scissor lift / boom lift',
//     'Ladder experience',
//     'Cabinet installation tools',
//     'Router',
//     'Drill/driver',
//     'Miter saw',
//     'Jigsaw',
//     'Laminate trimmer',
//     'Level',
//     'Laser level',
//     'Clamps',
//     'Shims',
//     'Hand tools',
//     'Hard hat',
//     'Safety glasses',
//     'Gloves',
//     'Hearing protection',
//     'Dust mask',
//   ],
//   'Flooring / Tile / Resilient / Carpet Systems': [
//     'Lift / scissor lift / boom lift experience',
//     'Moisture-testing training',
//     'Manufacturer certification / approved installer',
//     'Heat-welding experience',
//     'Large-format / gauged-panel handling',
//     'Epoxy / resinous chemical-system experience',
//     'Terrazzo experience',
//     'Polished-concrete equipment experience',
//     'ICRA / healthcare / clean-work protocol',
//     'Occupied building / night-shift experience',
//     'Own flooring hand tools',
//     'Tile saw / grinder / dust-control tools',
//     'Carpet power stretcher / seaming tools',
//     'Sheet-vinyl groover / heat welder',
//     'Floor grinder / shot blaster / HEPA vacuum',
//     'Valid driver license / reliable transportation',
//     'Secure-site / badging eligibility',
//   ],
//   'Painting / Coatings / Wallcovering Systems': [
//     'OSHA 10',
//     'OSHA 30',
//     'Scissor lift / boom lift',
//     'Fall protection / scaffold / swing-stage experience',
//     'Respirator use / medical clearance / fit test',
//     'Lead-safe / RRP / lead-abatement credential',
//     'HazCom / SDS / solvent / chemical handling',
//     'ICRA / healthcare clean-work protocol',
//     'AMPP / SSPC / NACE-related training or certification',
//     'Manufacturer/product-system certification',
//     'Abrasive blasting / pressure washing',
//     'Confined-space awareness/entry',
//     'Own brushes/rollers/basic painter tools',
//     'Airless sprayer / HVLP / conventional spray experience',
//     'Wallcovering tools / paste machine',
//     'Sander / vacuum sander / grinder / needle scaler',
//     'Wet-film / dry-film gauge',
//   ],
//   'Doors / Frames / Hardware / Openings Systems': [
//     'OSHA 10',
//     'OSHA 30',
//     'PPE',
//     'Ladder/scaffold experience',
//     'Fall protection',
//     'Scissor lift',
//     'Boom lift',
//     'Door cart',
//     'Material lift',
//     'Specialty lifting equipment',
//     'Hot-work permit',
//     'Welding qualification',
//     'Powder-actuated tool training',
//     'Silica awareness',
//     'Own door tools',
//     'Router/mortiser',
//     'Mag drill',
//     'Grinder',
//     'Manufacturer training/certification',
//     'Fire-door assembly inspector credential',
//     'Locksmith license/registration',
//     'Low-voltage/electrical license or credential',
//     'Spring/counterbalance experience',
//     'Fire-shutter training',
//     'ICRA/healthcare experience',
//     'Occupied building experience',
//     'School experience',
//     'Secure site experience',
//     'Background/badging eligible',
//     'Public-area work experience',
//     'Oversized/heavy doors',
//     'Team lift',
//     'Lifting plan',
//     'Specialty rigging support',
//   ],
//   'Glass / Glazing / Storefront': [
//     'OSHA 10',
//     'OSHA 30',
//     'PPE',
//     'Cut-resistant gloves',
//     'Eye/face protection',
//     'Ladder/scaffold experience',
//     'Harness use',
//     'Fall-protection training',
//     'Suspended scaffold',
//     'Swing-stage experience',
//     'Scissor lift',
//     'Boom lift',
//     'Mast climber',
//     'Scaffold',
//     'Suspended access',
//     'Roof rig',
//     'Manual suction cups',
//     'Glass cart',
//     'A-frame',
//     'Vacuum lifter',
//     'Powered manipulator',
//     'Rigging',
//     'Tag-line control',
//     'Hoist/crane coordination',
//     'Aluminum saw',
//     'Punch/drill/router',
//     'Glass cutting table',
//     'Edger/polisher',
//     'Glass drill',
//     'Caulk gun',
//     'Battery caulk gun',
//     'Glazing tools',
//     'Gasket tools',
//     'Setting blocks',
//     'Sealant tooling',
//     'AGMT or equivalent',
//     'Structural-silicone training',
//     'Fire-rated glazing',
//     'Security/ballistic/detention glazing',
//     'Smart glass',
//     'Automatic entrance interface',
//     'Current fit test',
//     'Chemical/dust protection',
//     'Hot-work authorization',
//     'Aluminum/metal modification',
//     'Welding qualification',
//     'Healthcare/ICRA',
//     'Occupied retail',
//     'Secure/federal/badged',
//   ],
//   'Fire Protection / Sprinkler Systems': [
//     'OSHA 10',
//     'OSHA 30',
//     'PPE',
//     'Ladder safety',
//     'Housekeeping',
//     'Hazard communication',
//     'Harness use',
//     'Fall-protection training',
//     'Scissor lift',
//     'Boom lift',
//     'High-bay',
//     'High-rise',
//     'Threader',
//     'Roll groover',
//     'Cut groover',
//     'Band saw',
//     'Drill press',
//     'Outlet machine',
//     'Reamer',
//     'Hot-work training',
//     'Fire watch',
//     'Welding process/material',
//     'Welder qualification',
//     'Torch cutting',
//     'Forklift',
//     'Telehandler',
//     'Chain fall',
//     'Come-along',
//     'Pipe cart',
//     'Signalperson/rigging experience',
//     'State/local sprinkler fitter card',
//     'Apprentice card',
//     'Journeyman card',
//     'Contractor/company sponsorship',
//     'NICET Water-Based Systems Layout certification',
//     'Sprinkler layout software experience',
//     'ITM certification/license',
//     'Certified backflow tester',
//     'Backflow repair credential',
//     'CPVC manufacturer training',
//     'Flexible hose system training',
//     'Dry/preaction valve training',
//     'Fire pump training',
//     'Specialty system training',
//     'Trench awareness',
//     'Competent-person status',
//     'Underground pipe/joint training',
//     'Occupied building experience',
//     'Impairment/fire-watch coordination',
//     'Citizen-only access',
//     'Hospital/school/industrial orientation',
//     'Basic hand tools',
//     'Pipe wrenches',
//     'Head wrenches',
//   ],
//   'Firestopping / Fireproofing / Joint Sealants': [
//     'OSHA 10',
//     'OSHA 30',
//     'PPE',
//     'Hazard Communication',
//     'Housekeeping',
//     'Ladder Safety',
//     'Harness Use',
//     'Fall-Protection Training',
//     'Scissor Lift',
//     'Boom Lift',
//     'Scaffold User',
//     'Swing Stage',
//     'High-Rise Perimeter',
//     'Respirator Use',
//     'Medical Clearance',
//     'Fit Test',
//     'Ventilation',
//     'Silica Awareness',
//     'Overspray Control',
//     'Caulk Gun',
//     'Bulk Gun',
//     'Trowels / Knives',
//     'Mineral-Wool Tools',
//     'Backer-Rod Tools',
//     'Cutting Tools',
//     'Labeling / Photo Tools',
//     'Mixer',
//     'Pump',
//     'Compressor',
//     'Hose',
//     'Nozzle',
//     'Spray Equipment',
//     'Airless / Conventional Spray',
//     'Rollers / Brushes',
//     'Wet-Film Gauge',
//     'Dry-Film Gauge',
//     'Environmental Meters',
//     'Depth / Annular-Space Tools',
//     'Joint Gauges',
//     'Thickness Pins / Gauges',
//     'Density Sampling Support',
//     'Adhesion / Cohesion Test Support',
//     'Photo / Log Software',
//     'Firestop Product / System',
//     'Perimeter System',
//     'SFRM',
//     'Intumescent',
//     'Board / Blanket',
//     'Sealant System',
//     'ICC or Other Accepted Fireproofing / Firestop Inspector Credential',
//     'Hot-Work Training',
//     'Fire Watch',
//     'Powered Prep Tools',
//     'Grinding',
//     'Approved Abrasive Prep',
//     'ICRA',
//     'Hospital',
//     'Data Center',
//     'Clean Work',
//     'Dust / Odor Control',
//     'Night Work',
//     'Secure Site',
//     'Background Check',
//     'Badging',
//     'Citizen-Only Access',
//     'Industrial Orientation',
//     'Shutdown Access',
//   ],
//   'Low Voltage / Data / Security / Fire Alarm': [
//     'Local limited-energy license',
//     'Low-voltage license',
//     'Alarm license',
//     'Security license',
//     'Fire-alarm license',
//     'NICET Fire Alarm Systems',
//     'NICET Inspection and Testing of Fire Alarm Systems',
//     'BICSI Installer 1',
//     'BICSI Installer 2 Copper',
//     'BICSI Installer 2 Fiber',
//     'BICSI Technician',
//     'BICSI RCDD',
//     'AVIXA CTS',
//     'AVIXA CTS-I',
//     'AVIXA CTS-D',
//     'Manufacturer training',
//     'Manufacturer certification',
//     'OSHA 10',
//     'OSHA 30',
//     'Site orientation',
//     'Lift training',
//     'Fall protection',
//     'Ladder training',
//     'Aerial lift training',
//     'Swing-stage training',
//     'Fiber safety',
//     'Laser awareness',
//     'Shard disposal',
//     'Eye protection',
//     'Confined space',
//     'Manhole safety',
//     'Traffic safety',
//     'OSP safety',
//     'ICRA',
//     'Infection control',
//     'Healthcare orientation',
//     'Secure-site access',
//     'Background check',
//     'Badging',
//     'Fire alarm test equipment',
//     'Inspection authorization',
//     'Copper certification test equipment',
//     'Fiber certification test equipment',
//     'Fusion splicer',
//     'Cleaver',
//     'Inspection scope',
//     'OTDR',
//     'RF test equipment',
//     'PIM test equipment',
//     'Sweep test equipment',
//     'Grid test equipment',
//     'AHJ coordination',
//     'Owner coordination',
//     'Monitoring coordination',
//     'Commissioning coordination',
//   ],
//   'Division 10 Specialties / Accessories / Signage Systems': [
//     'Tape',
//     'Level',
//     'Laser',
//     'Square',
//     'Drills/drivers',
//     'Bits',
//     'Anchors',
//     'Hand tools',
//     'Ladders',
//     'Hammer drill',
//     'Rotary hammer',
//     'Concrete/masonry bits',
//     'Toggle/expansion anchors',
//     'Rivnuts',
//     'Specialty fasteners',
//     'Rivet tools',
//     'Nut drivers',
//     'Impact drivers',
//     'Specialty bits',
//     'Shims',
//     'Clamps',
//     'Panel supports',
//     'Jigsaw',
//     'Circular saw',
//     'Miter saw',
//     'Laminate/phenolic blades',
//     'Metal cutting tools',
//     'Shears',
//     'Deburring tools',
//     'Standoffs/pin tools',
//     'Adhesive systems',
//     'Clean mounting tools',
//     'Room-list tracking',
//     'Adhesive tools',
//     'Rollers',
//     'Heat-weld equipment where applicable',
//     'Cutters',
//     'Trim tools',
//     'Scissor lift',
//     'Boom lift',
//     'Rolling scaffold',
//     'Ladders',
//     'High-ceiling work',
//     'Panel carts',
//     'Board/glass handling',
//     'Hoists',
//     'Suction devices',
//     'Flagpole rigging',
//     'Team lifts',
//     'Track/panel adjustment tools',
//     'Seal adjustment',
//     'Hardware/service tools',
//     'Manufacturer-specific tools',
//     'Service vehicle',
//     'Parts transport',
//     'Camera/tablet',
//     'Measuring tools',
//     'Punch-list and photo documentation',
//   ],
//   'Equipment / Specialty Installations / Owner-Furnished Equipment Systems': [
//     'Hand tools',
//     'Drills',
//     'Impacts',
//     'Sockets',
//     'Levels',
//     'Lasers',
//     'Measuring tools',
//     'Torque tools',
//     'Manufacturer tools',
//     'Laser',
//     'Transit',
//     'Digital level',
//     'Plumb tools',
//     'Tape',
//     'Field-measurement tools',
//     'Shop-drawing reading',
//     'Rotary hammer',
//     'Core drill',
//     'Adhesive anchor tools',
//     'Mechanical anchors',
//     'Torque wrench',
//     'Dust control',
//     'Laser alignment',
//     'Dial indicators',
//     'Precision level',
//     'Feeler gauges',
//     'Shim packs',
//     'Coupling tools',
//     'Slings',
//     'Shackles',
//     'Chain fall',
//     'Gantry',
//     'Hoist',
//     'Jacks',
//     'Skates',
//     'Cribbing',
//     'Signal equipment',
//     'Lift-plan familiarity',
//     'Pallet jack',
//     'Forklift',
//     'Telehandler',
//     'Reach forklift',
//     'Powered tug',
//     'Lift gate',
//     'Scissor lift',
//     'Boom lift',
//     'Mast lift',
//     'Ladder',
//     'Fall protection',
//     'Roof/high-access work',
//     'Grinder',
//     'Torch',
//     'Welding equipment',
//     'Brazing tools',
//     'Fire-watch awareness',
//     'Manufacturer diagnostic tools',
//     'Mechanical gauges',
//     'Torque records',
//     'Service laptop/tablet',
//     'Parts tracking',
//     'Camera',
//     'Barcode/serial capture',
//     'Punch app',
//     'Room/equipment list',
//     'As-built and closeout tools',
//   ],
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
//   const [mainTrade, setMainTrade] = useState('')
//   const [expandedSections, setExpandedSections] = useState({})
//   const fileInputRefs = useRef({})

//   // ============================================================
//   // LOAD DATA FROM WORKERS TABLE
//   // ============================================================
  
// // src/worker/pages/CertificationEditPage.jsx
// // Replace the entire useEffect with this:

// useEffect(() => {
//   const loadCertifications = async () => {
//     try {
//       const userId = localStorage.getItem('userId')
//       if (!userId) {
//         setError('User ID not found. Please login again.')
//         setLoading(false)
//         return
//       }

//       console.log('📊 Fetching certification data from Workers table')
      
//       // First check if we have data in location state that has actual certRows
//       if (location?.state?.tradeData) {
//         const data = location.state.tradeData
//         // Check if there's actual certification data
//         if (data.certRows && data.certRows.length > 0) {
//           console.log('✅ Using certification data from location.state')
//           setCertData({
//             certChecklist: data.certChecklist || {},
//             certRows: data.certRows || [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }],
//             safetyFlags: data.safetyFlags || {},
//           })
//           if (data.mainTrade) setMainTrade(data.mainTrade)
//           setLoading(false)
//           return
//         }
//         // If tradeData exists but has no certRows, fetch from API
//         console.log('⚠️ location.state.tradeData exists but has no certRows, fetching from API')
//       }

//       const profile = await workerService.getWorkerProfile(userId)
      
//       if (profile.success && profile.data) {
//         console.log('📦 Profile data received:', profile.data)
        
//         // ✅ Get main trade from trade section
//         const tradeData = profile.data.trade || {}
//         let mainTradeValue = tradeData.mainTrade || ''
        
//         // If no mainTrade in trade section, check basics
//         if (!mainTradeValue && profile.data.basics?.mainTrade) {
//           mainTradeValue = profile.data.basics.mainTrade
//         }
        
//         if (mainTradeValue) {
//           setMainTrade(mainTradeValue)
//           console.log('✅ Main trade set to:', mainTradeValue)
//         }
        
//         // ✅ IMPORTANT: Get tools certifications from trade.toolsCertifications
//         // This is where the data is actually stored!
//         const toolsCerts = tradeData.toolsCertifications || {}
//         console.log('🔧 Tools certifications from trade:', Object.keys(toolsCerts).filter(k => toolsCerts[k]).length, 'selected')
        
//         // ✅ Also check certifications section as fallback
//         const certsData = profile.data.certifications || {}
//         const certChecklist = certsData.certChecklist || {}
        
//         // ✅ Use toolsCerts as primary source, certChecklist as fallback
//         const checklistData = Object.keys(toolsCerts).length > 0 
//           ? toolsCerts 
//           : certChecklist
        
//         console.log('✅ Final checklist data:', Object.keys(checklistData).filter(k => checklistData[k]).length, 'selected')
        
//         // ✅ Load certRows from certifications section
//         let certRows = certsData.certRows || []
//         if (certRows.length === 0) {
//           certRows = [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }]
//         }
        
//         // ✅ Load safety flags
//         const safetyFlags = certsData.safetyFlags || {}
        
//         setCertData({
//           certChecklist: checklistData,
//           certRows: certRows,
//           safetyFlags: safetyFlags,
//         })
        
//         // Auto-expand the main trade section
//         if (mainTradeValue) {
//           setExpandedSections(prev => ({ ...prev, [mainTradeValue]: true }))
//         }
        
//         console.log('✅ Certifications loaded successfully')
//         console.log('  - Checklist items:', Object.keys(checklistData).length)
//         console.log('  - Cert rows:', certRows.length)
//         console.log('  - Safety flags:', Object.keys(safetyFlags).length)
        
//       } else {
//         // No profile data - initialize empty
//         console.log('ℹ️ No profile data found, initializing empty state')
//         setCertData({
//           certChecklist: {},
//           certRows: [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }],
//           safetyFlags: {},
//         })
//       }
//     } catch (error) {
//       console.error('❌ Error loading certifications:', error)
//       setError(error.message || 'Failed to load certifications')
//     } finally {
//       setLoading(false)
//     }
//   }

//   loadCertifications()
// }, [location?.state?.tradeData])

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
//         // Don't remove the last row, just clear it
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
  
//  // Replace the handleSave function with this:

// const handleSave = async () => {
//   setIsSaving(true)
//   setError('')
//   setSuccess('')

//   try {
//     const userId = localStorage.getItem('userId')
//     if (!userId) {
//       throw new Error('User ID not found. Please login again.')
//     }

//     console.log('💾 Saving certifications to Workers table')
//     console.log('📋 certChecklist:', certData.certChecklist)

//     // ✅ Step 1: Update the trade section with toolsCertifications
//     const profile = await workerService.getWorkerProfile(userId)
//     const currentTrade = profile.data?.trade || {}
    
//     const updatedTrade = {
//       ...currentTrade,
//       toolsCertifications: certData.certChecklist || {},
//     }
    
//     await workerService.updateTrade(userId, updatedTrade)
//     console.log('✅ Trade toolsCertifications updated')
    
//     // ✅ Step 2: Update the certifications section
//     await workerService.updateCertifications(userId, {
//       certChecklist: certData.certChecklist || {},
//       certRows: certData.certRows || [],
//       safetyFlags: certData.safetyFlags || {},
//     })
    
//     console.log('✅ Certifications saved to Workers table')
//     setSuccess('Certifications saved successfully!')

//     setTimeout(() => {
//       navigate('/wizard/summary', {
//         state: {
//           ...location?.state?.parentData,
//           certifications: certData,
//           updatedCert: true
//         },
//         replace: true
//       })
//     }, 500)

//   } catch (error) {
//     console.error('❌ Error saving certifications:', error)
//     setError(error.message || 'Failed to save certifications')
//   } finally {
//     setIsSaving(false)
//   }
// }

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

//   const getCertificationsForTrade = (trade) => {
//     return TOOLS_CERTIFICATIONS[trade] || []
//   }

//   const tradeCertifications = getCertificationsForTrade(mainTrade)

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
//               {mainTrade && (
//                 <span style={{
//                   marginLeft: '8px',
//                   padding: '4px 12px',
//                   background: 'rgba(15, 78, 169, 0.08)',
//                   borderRadius: '16px',
//                   fontSize: '12px',
//                   color: '#0f4ea9',
//                   fontWeight: 500,
//                 }}>
//                   {mainTrade}
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
//                 SECTION 1: CERTIFICATION CHECKLIST - ACCORDION BY TRADE
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
//                     {mainTrade && (
//                       <span style={{
//                         fontSize: '12px',
//                         color: 'rgba(23, 38, 58, 0.5)',
//                         fontWeight: 400,
//                       }}>
//                         Based on: {mainTrade}
//                       </span>
//                     )}
//                   </div>

//                   {mainTrade ? (
//                     <div>
//                       <div 
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'space-between',
//                           padding: '12px 16px',
//                           background: expandedSections[mainTrade] ? 'rgba(15, 78, 169, 0.05)' : 'rgba(15, 78, 169, 0.02)',
//                           border: expandedSections[mainTrade] ? '1px solid rgba(15, 78, 169, 0.2)' : '1px solid rgba(18, 38, 63, 0.08)',
//                           borderRadius: '8px',
//                           cursor: 'pointer',
//                           transition: 'all 0.2s ease',
//                         }}
//                         onClick={() => toggleSection(mainTrade)}
//                         onMouseEnter={(e) => {
//                           if (!expandedSections[mainTrade]) {
//                             e.currentTarget.style.background = 'rgba(15, 78, 169, 0.04)'
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!expandedSections[mainTrade]) {
//                             e.currentTarget.style.background = 'rgba(15, 78, 169, 0.02)'
//                           }
//                         }}
//                       >
//                         <div style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '12px',
//                         }}>
//                           <span style={{
//                             fontSize: '14px',
//                             fontWeight: 600,
//                             color: '#17263a',
//                           }}>
//                             {mainTrade}
//                           </span>
//                           <span style={{
//                             fontSize: '11px',
//                             color: 'rgba(23, 38, 58, 0.4)',
//                             background: 'rgba(23, 38, 58, 0.06)',
//                             padding: '2px 10px',
//                             borderRadius: '12px',
//                           }}>
//                             {tradeCertifications.length} certifications
//                           </span>
//                           {Object.values(certData.certChecklist || {}).filter(v => v === true).length > 0 && (
//                             <span style={{
//                               fontSize: '11px',
//                               color: '#2fb463',
//                               background: 'rgba(47, 180, 99, 0.1)',
//                               padding: '2px 10px',
//                               borderRadius: '12px',
//                             }}>
//                               {Object.values(certData.certChecklist || {}).filter(v => v === true).length} selected
//                             </span>
//                           )}
//                         </div>
//                         {expandedSections[mainTrade] ? (
//                           <IconChevronDown style={{ color: 'rgba(23, 38, 58, 0.4)' }} />
//                         ) : (
//                           <IconChevronRight style={{ color: 'rgba(23, 38, 58, 0.4)' }} />
//                         )}
//                       </div>

//                       {expandedSections[mainTrade] && (
//                         <div style={{
//                           marginTop: '12px',
//                           padding: '16px 20px',
//                           border: '1px solid rgba(18, 38, 63, 0.06)',
//                           borderRadius: '8px',
//                           background: 'white',
//                         }}>
//                           {tradeCertifications.length > 0 ? (
//                             <div style={{ 
//                               display: 'grid', 
//                               gridTemplateColumns: '1fr 1fr 1fr', 
//                               gap: '8px'
//                             }}>
//                               {tradeCertifications.map((cert) => (
//                                 <label key={cert} style={{ 
//                                   display: 'flex', 
//                                   alignItems: 'center', 
//                                   gap: '8px', 
//                                   cursor: 'pointer',
//                                   padding: '4px 8px',
//                                   borderRadius: '6px',
//                                   transition: 'background 0.15s ease',
//                                 }}
//                                 onMouseEnter={(e) => {
//                                   e.currentTarget.style.background = 'rgba(15, 78, 169, 0.03)'
//                                 }}
//                                 onMouseLeave={(e) => {
//                                   e.currentTarget.style.background = 'transparent'
//                                 }}
//                                 >
//                                   <input
//                                     type="checkbox"
//                                     checked={!!(certData.certChecklist?.[cert] || false)}
//                                     onChange={toggleCertChecklist(cert)}
//                                     style={{
//                                       width: '18px',
//                                       height: '18px',
//                                       cursor: 'pointer',
//                                       accentColor: '#0f4ea9',
//                                     }}
//                                   />
//                                   <span style={{ fontSize: '14px', color: '#17263a' }}>{cert}</span>
//                                 </label>
//                               ))}
//                             </div>
//                           ) : (
//                             <div style={{
//                               textAlign: 'center',
//                               padding: '20px',
//                               color: 'rgba(23, 38, 58, 0.4)',
//                               fontSize: '14px',
//                             }}>
//                               No certifications defined for this trade yet.
//                             </div>
//                           )}
//                         </div>
//                       )}
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
//                       Please select a main trade in your Trade Profile first.
//                     </div>
//                   )}
//                 </div>

//                 {/* ============================================================
//                 SECTION 2: VERIFICATION DATA - UPDATED WITH DYNAMIC ROWS
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
//                 SECTION 3: SAFETY FLAGS
//                 ============================================================ */}
//                 <div style={{ marginTop: '24px' }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                   }}>
//                     3. Safety Flags
//                   </div>
//                   <div style={{ 
//                     display: 'flex', 
//                     gap: '20px', 
//                     flexWrap: 'wrap',
//                     padding: '12px',
//                     background: 'rgba(15, 78, 169, 0.02)',
//                     borderRadius: '12px',
//                     border: '1px solid rgba(15, 78, 169, 0.06)',
//                   }}>
//                     {['Safety training completed', 'PPE available', 'Site orientation completed'].map((flag) => (
//                       <label key={flag} style={{ 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         gap: '8px', 
//                         cursor: 'pointer',
//                         padding: '4px 8px',
//                         borderRadius: '6px',
//                         transition: 'background 0.15s ease',
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = 'rgba(15, 78, 169, 0.03)'
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = 'transparent'
//                       }}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={!!(certData.safetyFlags?.[flag] || false)}
//                           onChange={toggleSafetyFlag(flag)}
//                           style={{
//                             width: '18px',
//                             height: '18px',
//                             cursor: 'pointer',
//                             accentColor: '#0f4ea9',
//                           }}
//                         />
//                         <span style={{ fontSize: '14px', color: '#17263a' }}>{flag}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

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
// TOOLS & CERTIFICATIONS BY TRADE (from WizardStep3)
// ============================================================

const TOOLS_CERTIFICATIONS = {
  'Interiors': [
    'OSHA 10',
    'OSHA 30',
    'Scissor lift experience',
    'Boom lift experience',
    'Lift certified',
    'Fall protection',
    'Own hand tools',
    'Own power tools',
    'Basic PPE',
    'Reliable transportation',
    'Valid driver license',
    'Willing to travel',
    'Night shift available',
    'Weekend work available',
    'Overtime available',
    'Can pass background check if required',
    'Can work secure/badged sites',
    'Bilingual English/Spanish',
  ],
  'HVAC/Mechanical': [
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
  'Electrical / Power': [
    'Electrical apprentice card / registration',
    'Journeyman electrician license',
    'Master electrician license',
    'Lift certification',
    'OSHA 10',
    'OSHA 30',
    'Fall protection training',
    'NFPA 70E / electrical safety training',
    'Lockout/Tagout awareness',
    'Own basic hand tools',
    'Own Cordless tools',
    'Conduit bender',
    'Fish tape',
    'Multimeter',
    'Label maker',
    'Reliable transportation',
    'Valid driver license',
    'Service vehicle available',
    'Electrical tool bag',
    'Ladders',
    'PPE available',
  ],
  'Plumbing / Piping': [
    'Plumbing license',
    'Apprentice card',
    'Journeyman card',
    'Backflow certification',
    'Medical gas certification',
    'Gas piping qualification',
    'OSHA 10',
    'OSHA 30',
    'Lift experience',
    'Confined space awareness',
    'Hot work awareness',
    'Trench safety awareness',
    'Hospital/healthcare experience',
    'Own basic hand tools',
    'Pipe wrenches',
    'PEX tools',
    'Copper tools',
    'Threading tools',
    'Press tool experience',
    'Power tools',
    'PPE',
  ],
  'Concrete / Formwork / Rebar / Flatwork': [
    'OSHA 10',
    'OSHA 30',
    'Silica awareness',
    'Fall protection',
    'Lift experience',
    'Confined space awareness',
    'Trench safety awareness',
    'Hot work awareness',
    'Own basic hand tools',
    'Concrete finishing tools',
    'Bull float experience',
    'Power trowel experience',
    'Concrete saw experience',
    'Core drill experience',
    'Laser level experience',
    'Vibrator experience',
    'Hard hat',
    'Safety vest',
    'Gloves',
    'Boots',
    'Eye protection',
    'Hearing protection',
  ],
  'Civil / Sitework / Earthwork / Utilities': [
    'OSHA 10',
    'OSHA 30',
    'Trench safety awareness',
    'Competent person - trenching',
    'Flagger certification',
    'Confined space awareness',
    'First aid / CPR',
    'Valid driver license',
    'CDL',
    'Equipment certification/card',
    'TWIC / secure site eligible',
    'Can pass background check',
    'Has PPE',
    'Work boots',
    'Hard hat',
    'Safety vest',
    'Own hand tools',
    'Can work outdoors',
    'Can work around heavy equipment',
    'Can work in heat/cold',
  ],
  'Asphalt / Paving Work': [
    'OSHA 10',
    'OSHA 30',
    'Traffic control awareness',
    'Flagger certification',
    'Work zone safety',
    'Hot work / heat exposure experience',
    'First aid / CPR',
    'Valid driver license',
    'CDL',
    'Equipment card/certification',
    'Can pass background check',
    'Secure/badged site eligible',
    'Has PPE',
    'High-vis vest/clothing',
    'Work boots',
    'Hard hat',
    'Asphalt hand tools',
    'Rake/lute tools',
    'Sealcoat tools',
    'Striping layout tools',
    'Can work around traffic',
    'Can work in heat',
    'Can work nights',
    'Can work weekends',
  ],
  'Landscaping / Exterior Improvements': [
    'Own basic hand tools',
    'Shovel / Rake / Wheelbarrow / Pruners / Landscape hand tools',
    'Mower',
    'String trimmer',
    'Blower',
    'Plate compactor',
    'Sod roller',
    'Small Paver tools',
    'Cut-off saw experience',
    'Post hole digger',
    'Fence stretcher',
    'Basic hardware tools',
    'Trenching tools',
    'Basic irrigation repair tools',
    'Has PPE',
    'Outdoor work experience',
    'Heat/weather tolerance',
    'OSHA 10',
    'First aid optional',
  ],
  'Roofing / Waterproofing': [
    'OSHA 10',
    'OSHA 30',
    'Fall protection training',
    'Roof safety awareness',
    'Harness experience',
    'Ladder safety',
    'Hot work awareness',
    'Torch work experience',
    'Heat welding experience',
    'Own hand tools',
    'Roofing hand tools',
    'Screw gun/drill',
    'Utility knives',
    'Seam probe',
    'Hand welder',
    'Robotic welder experience',
    'Torch equipment experience',
    'Caulking tools',
    'Scissor lift experience',
    'Boom lift experience',
    'Ladder work',
    'Roof hatch access',
    'Material hoist support',
    'Crane/material staging support',
    'Hard hat',
    'Safety glasses',
    'Gloves',
    'Boots',
    'High-vis',
    'Harness',
    'Lanyard',
  ],
  'General Labor / Site Support / Material Handling': [
    'OSHA 10',
    'OSHA 30',
    'Fall protection',
    'Fire watch',
    'Spotter',
    'Forklift',
    'Pallet jack',
    'Dolly/material cart',
    'Scissor lift',
    'Boom lift if certified',
    'Utility knife',
    'Tape measure',
    'Broom/shovel',
    'Scraper',
    'Basic hand tools',
    'Hard hat',
    'Vest',
    'Safety glasses',
    'Gloves',
    'Boots',
  ],
  'Demolition / Selective Demo / Abatement Support': [
    'OSHA 10',
    'OSHA 30',
    'PPE awareness',
    'Eye protection',
    'Gloves',
    'Hard hat',
    'Hearing protection',
    'Dust mask/respirator experience',
    'Silica awareness',
    'HEPA vacuum experience',
    'Respirator use',
    'Fit-test required',
    'Dust-control experience',
    'Asbestos awareness',
    'Lead awareness',
    'Mold remediation support',
    'Abatement certification',
    'Containment experience',
    'Demo saw',
    'Chipping hammer',
    'Jackhammer',
    'Roto-hammer',
    'Floor scraper',
    'Grinder',
    'HEPA vacuum',
    'Trash chute support',
    'Carts/dollies',
  ],
  'Masonry / Stucco / EIFS Systems': [
    'OSHA 10',
    'Fall protection',
    'Lift experience',
    'Can work exterior/weather conditions',
    'OSHA 30',
    'Silica awareness',
    'Forklift / telehandler experience',
    'Can pass background check if required',
    'Scaffold awareness',
    'Respirator / fit-test',
    'Can work at heights',
    'Secure-site eligible',
    'Own basic hand tools',
    'Grinder experience',
    'Mortar boards / pans',
    'Stucco tools',
    'Masonry trowel tools',
    'Masonry saw experience',
    'Caulking tools',
    'PPE available',
    'Levels / layout tools',
    'Mixer experience',
    'EIFS tools',
    'Reliable transportation',
  ],
  'Structural Steel / Misc. Metals / Welding': [
    'OSHA 10',
    'OSHA 30',
    'Fall protection training',
    'Scissor lift / boom lift experience',
    'Lift certification',
    'Welding certification',
    'Hot work experience',
    'Rigging / signalperson experience',
    'Own hand tools',
    'Welding hood / basic welding gear',
    'Harness / fall protection gear',
    'Can work secure/badged site',
  ],
  'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems': [
    'OSHA 10',
    'OSHA 30',
    'Fall protection',
    'Scissor lift / boom lift',
    'Ladder experience',
    'Framing tools',
    'Circular saw',
    'Compound miter saw',
    'Table saw',
    'Impact driver',
    'Drill',
    'Chalk line',
    'Laser level',
    'Tape measure',
    'Speed square',
    'Hand tools',
    'Hard hat',
    'Safety glasses',
    'Gloves',
    'Hearing protection',
  ],
  'Millwork / Cabinets / Finish Carpentry': [
    'OSHA 10',
    'Fall protection',
    'Scissor lift / boom lift',
    'Ladder experience',
    'Cabinet installation tools',
    'Router',
    'Drill/driver',
    'Miter saw',
    'Jigsaw',
    'Laminate trimmer',
    'Level',
    'Laser level',
    'Clamps',
    'Shims',
    'Hand tools',
    'Hard hat',
    'Safety glasses',
    'Gloves',
    'Hearing protection',
    'Dust mask',
  ],
  'Flooring / Tile / Resilient / Carpet Systems': [
    'Lift / scissor lift / boom lift experience',
    'Moisture-testing training',
    'Manufacturer certification / approved installer',
    'Heat-welding experience',
    'Large-format / gauged-panel handling',
    'Epoxy / resinous chemical-system experience',
    'Terrazzo experience',
    'Polished-concrete equipment experience',
    'ICRA / healthcare / clean-work protocol',
    'Occupied building / night-shift experience',
    'Own flooring hand tools',
    'Tile saw / grinder / dust-control tools',
    'Carpet power stretcher / seaming tools',
    'Sheet-vinyl groover / heat welder',
    'Floor grinder / shot blaster / HEPA vacuum',
    'Valid driver license / reliable transportation',
    'Secure-site / badging eligibility',
  ],
  'Painting / Coatings / Wallcovering Systems': [
    'OSHA 10',
    'OSHA 30',
    'Scissor lift / boom lift',
    'Fall protection / scaffold / swing-stage experience',
    'Respirator use / medical clearance / fit test',
    'Lead-safe / RRP / lead-abatement credential',
    'HazCom / SDS / solvent / chemical handling',
    'ICRA / healthcare clean-work protocol',
    'AMPP / SSPC / NACE-related training or certification',
    'Manufacturer/product-system certification',
    'Abrasive blasting / pressure washing',
    'Confined-space awareness/entry',
    'Own brushes/rollers/basic painter tools',
    'Airless sprayer / HVLP / conventional spray experience',
    'Wallcovering tools / paste machine',
    'Sander / vacuum sander / grinder / needle scaler',
    'Wet-film / dry-film gauge',
  ],
  'Doors / Frames / Hardware / Openings Systems': [
    'OSHA 10',
    'OSHA 30',
    'PPE',
    'Ladder/scaffold experience',
    'Fall protection',
    'Scissor lift',
    'Boom lift',
    'Door cart',
    'Material lift',
    'Specialty lifting equipment',
    'Hot-work permit',
    'Welding qualification',
    'Powder-actuated tool training',
    'Silica awareness',
    'Own door tools',
    'Router/mortiser',
    'Mag drill',
    'Grinder',
    'Manufacturer training/certification',
    'Fire-door assembly inspector credential',
    'Locksmith license/registration',
    'Low-voltage/electrical license or credential',
    'Spring/counterbalance experience',
    'Fire-shutter training',
    'ICRA/healthcare experience',
    'Occupied building experience',
    'School experience',
    'Secure site experience',
    'Background/badging eligible',
    'Public-area work experience',
    'Oversized/heavy doors',
    'Team lift',
    'Lifting plan',
    'Specialty rigging support',
  ],
  'Glass / Glazing / Storefront': [
    'OSHA 10',
    'OSHA 30',
    'PPE',
    'Cut-resistant gloves',
    'Eye/face protection',
    'Ladder/scaffold experience',
    'Harness use',
    'Fall-protection training',
    'Suspended scaffold',
    'Swing-stage experience',
    'Scissor lift',
    'Boom lift',
    'Mast climber',
    'Scaffold',
    'Suspended access',
    'Roof rig',
    'Manual suction cups',
    'Glass cart',
    'A-frame',
    'Vacuum lifter',
    'Powered manipulator',
    'Rigging',
    'Tag-line control',
    'Hoist/crane coordination',
    'Aluminum saw',
    'Punch/drill/router',
    'Glass cutting table',
    'Edger/polisher',
    'Glass drill',
    'Caulk gun',
    'Battery caulk gun',
    'Glazing tools',
    'Gasket tools',
    'Setting blocks',
    'Sealant tooling',
    'AGMT or equivalent',
    'Structural-silicone training',
    'Fire-rated glazing',
    'Security/ballistic/detention glazing',
    'Smart glass',
    'Automatic entrance interface',
    'Current fit test',
    'Chemical/dust protection',
    'Hot-work authorization',
    'Aluminum/metal modification',
    'Welding qualification',
    'Healthcare/ICRA',
    'Occupied retail',
    'Secure/federal/badged',
  ],
  'Fire Protection / Sprinkler Systems': [
    'OSHA 10',
    'OSHA 30',
    'PPE',
    'Ladder safety',
    'Housekeeping',
    'Hazard communication',
    'Harness use',
    'Fall-protection training',
    'Scissor lift',
    'Boom lift',
    'High-bay',
    'High-rise',
    'Threader',
    'Roll groover',
    'Cut groover',
    'Band saw',
    'Drill press',
    'Outlet machine',
    'Reamer',
    'Hot-work training',
    'Fire watch',
    'Welding process/material',
    'Welder qualification',
    'Torch cutting',
    'Forklift',
    'Telehandler',
    'Chain fall',
    'Come-along',
    'Pipe cart',
    'Signalperson/rigging experience',
    'State/local sprinkler fitter card',
    'Apprentice card',
    'Journeyman card',
    'Contractor/company sponsorship',
    'NICET Water-Based Systems Layout certification',
    'Sprinkler layout software experience',
    'ITM certification/license',
    'Certified backflow tester',
    'Backflow repair credential',
    'CPVC manufacturer training',
    'Flexible hose system training',
    'Dry/preaction valve training',
    'Fire pump training',
    'Specialty system training',
    'Trench awareness',
    'Competent-person status',
    'Underground pipe/joint training',
    'Occupied building experience',
    'Impairment/fire-watch coordination',
    'Citizen-only access',
    'Hospital/school/industrial orientation',
    'Basic hand tools',
    'Pipe wrenches',
    'Head wrenches',
  ],
  'Firestopping / Fireproofing / Joint Sealants': [
    'OSHA 10',
    'OSHA 30',
    'PPE',
    'Hazard Communication',
    'Housekeeping',
    'Ladder Safety',
    'Harness Use',
    'Fall-Protection Training',
    'Scissor Lift',
    'Boom Lift',
    'Scaffold User',
    'Swing Stage',
    'High-Rise Perimeter',
    'Respirator Use',
    'Medical Clearance',
    'Fit Test',
    'Ventilation',
    'Silica Awareness',
    'Overspray Control',
    'Caulk Gun',
    'Bulk Gun',
    'Trowels / Knives',
    'Mineral-Wool Tools',
    'Backer-Rod Tools',
    'Cutting Tools',
    'Labeling / Photo Tools',
    'Mixer',
    'Pump',
    'Compressor',
    'Hose',
    'Nozzle',
    'Spray Equipment',
    'Airless / Conventional Spray',
    'Rollers / Brushes',
    'Wet-Film Gauge',
    'Dry-Film Gauge',
    'Environmental Meters',
    'Depth / Annular-Space Tools',
    'Joint Gauges',
    'Thickness Pins / Gauges',
    'Density Sampling Support',
    'Adhesion / Cohesion Test Support',
    'Photo / Log Software',
    'Firestop Product / System',
    'Perimeter System',
    'SFRM',
    'Intumescent',
    'Board / Blanket',
    'Sealant System',
    'ICC or Other Accepted Fireproofing / Firestop Inspector Credential',
    'Hot-Work Training',
    'Fire Watch',
    'Powered Prep Tools',
    'Grinding',
    'Approved Abrasive Prep',
    'ICRA',
    'Hospital',
    'Data Center',
    'Clean Work',
    'Dust / Odor Control',
    'Night Work',
    'Secure Site',
    'Background Check',
    'Badging',
    'Citizen-Only Access',
    'Industrial Orientation',
    'Shutdown Access',
  ],
  'Low Voltage / Data / Security / Fire Alarm': [
    'Local limited-energy license',
    'Low-voltage license',
    'Alarm license',
    'Security license',
    'Fire-alarm license',
    'NICET Fire Alarm Systems',
    'NICET Inspection and Testing of Fire Alarm Systems',
    'BICSI Installer 1',
    'BICSI Installer 2 Copper',
    'BICSI Installer 2 Fiber',
    'BICSI Technician',
    'BICSI RCDD',
    'AVIXA CTS',
    'AVIXA CTS-I',
    'AVIXA CTS-D',
    'Manufacturer training',
    'Manufacturer certification',
    'OSHA 10',
    'OSHA 30',
    'Site orientation',
    'Lift training',
    'Fall protection',
    'Ladder training',
    'Aerial lift training',
    'Swing-stage training',
    'Fiber safety',
    'Laser awareness',
    'Shard disposal',
    'Eye protection',
    'Confined space',
    'Manhole safety',
    'Traffic safety',
    'OSP safety',
    'ICRA',
    'Infection control',
    'Healthcare orientation',
    'Secure-site access',
    'Background check',
    'Badging',
    'Fire alarm test equipment',
    'Inspection authorization',
    'Copper certification test equipment',
    'Fiber certification test equipment',
    'Fusion splicer',
    'Cleaver',
    'Inspection scope',
    'OTDR',
    'RF test equipment',
    'PIM test equipment',
    'Sweep test equipment',
    'Grid test equipment',
    'AHJ coordination',
    'Owner coordination',
    'Monitoring coordination',
    'Commissioning coordination',
  ],
  'Division 10 Specialties / Accessories / Signage Systems': [
    'Tape',
    'Level',
    'Laser',
    'Square',
    'Drills/drivers',
    'Bits',
    'Anchors',
    'Hand tools',
    'Ladders',
    'Hammer drill',
    'Rotary hammer',
    'Concrete/masonry bits',
    'Toggle/expansion anchors',
    'Rivnuts',
    'Specialty fasteners',
    'Rivet tools',
    'Nut drivers',
    'Impact drivers',
    'Specialty bits',
    'Shims',
    'Clamps',
    'Panel supports',
    'Jigsaw',
    'Circular saw',
    'Miter saw',
    'Laminate/phenolic blades',
    'Metal cutting tools',
    'Shears',
    'Deburring tools',
    'Standoffs/pin tools',
    'Adhesive systems',
    'Clean mounting tools',
    'Room-list tracking',
    'Adhesive tools',
    'Rollers',
    'Heat-weld equipment where applicable',
    'Cutters',
    'Trim tools',
    'Scissor lift',
    'Boom lift',
    'Rolling scaffold',
    'Ladders',
    'High-ceiling work',
    'Panel carts',
    'Board/glass handling',
    'Hoists',
    'Suction devices',
    'Flagpole rigging',
    'Team lifts',
    'Track/panel adjustment tools',
    'Seal adjustment',
    'Hardware/service tools',
    'Manufacturer-specific tools',
    'Service vehicle',
    'Parts transport',
    'Camera/tablet',
    'Measuring tools',
    'Punch-list and photo documentation',
  ],
  'Equipment / Specialty Installations / Owner-Furnished Equipment Systems': [
    'Hand tools',
    'Drills',
    'Impacts',
    'Sockets',
    'Levels',
    'Lasers',
    'Measuring tools',
    'Torque tools',
    'Manufacturer tools',
    'Laser',
    'Transit',
    'Digital level',
    'Plumb tools',
    'Tape',
    'Field-measurement tools',
    'Shop-drawing reading',
    'Rotary hammer',
    'Core drill',
    'Adhesive anchor tools',
    'Mechanical anchors',
    'Torque wrench',
    'Dust control',
    'Laser alignment',
    'Dial indicators',
    'Precision level',
    'Feeler gauges',
    'Shim packs',
    'Coupling tools',
    'Slings',
    'Shackles',
    'Chain fall',
    'Gantry',
    'Hoist',
    'Jacks',
    'Skates',
    'Cribbing',
    'Signal equipment',
    'Lift-plan familiarity',
    'Pallet jack',
    'Forklift',
    'Telehandler',
    'Reach forklift',
    'Powered tug',
    'Lift gate',
    'Scissor lift',
    'Boom lift',
    'Mast lift',
    'Ladder',
    'Fall protection',
    'Roof/high-access work',
    'Grinder',
    'Torch',
    'Welding equipment',
    'Brazing tools',
    'Fire-watch awareness',
    'Manufacturer diagnostic tools',
    'Mechanical gauges',
    'Torque records',
    'Service laptop/tablet',
    'Parts tracking',
    'Camera',
    'Barcode/serial capture',
    'Punch app',
    'Room/equipment list',
    'As-built and closeout tools',
  ],
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
  const [mainTrade, setMainTrade] = useState('')
  const [expandedSections, setExpandedSections] = useState({})
  const fileInputRefs = useRef({})

  // ============================================================
  // LOAD DATA FROM WORKERS TABLE
  // ============================================================
// Replace the useEffect in CertificationEditPage.jsx with this:

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
      
      // First check if we have data in location state that has actual certRows
      if (location?.state?.tradeData) {
        const data = location.state.tradeData
        if (data.certRows && data.certRows.length > 0) {
          console.log('✅ Using certification data from location.state')
          setCertData({
            certChecklist: data.certChecklist || {},
            certRows: data.certRows || [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }],
            safetyFlags: data.safetyFlags || {},
          })
          if (data.mainTrade) setMainTrade(data.mainTrade)
          setLoading(false)
          return
        }
        console.log('⚠️ location.state.tradeData exists but has no certRows, fetching from API')
      }

      const profile = await workerService.getWorkerProfile(userId)
      
      if (profile.success && profile.data) {
        console.log('📦 Profile data received:', profile.data)
        
        // ✅ Get trade data
        const tradeData = profile.data.trade || {}
        
        // ✅ CRITICAL FIX: Get mainTrade from tradeRows
        let mainTradeValue = ''
        
        // Check if tradeRows exists and has data
        if (tradeData.tradeRows && tradeData.tradeRows.length > 0) {
          // Get the first trade's name
          mainTradeValue = tradeData.tradeRows[0]?.trade || ''
          console.log('✅ Found mainTrade from tradeRows[0]:', mainTradeValue)
        }
        
        // If still empty, try other locations
        if (!mainTradeValue && tradeData.mainTrade) {
          mainTradeValue = tradeData.mainTrade
          console.log('✅ Found mainTrade from trade.mainTrade:', mainTradeValue)
        }
        
        if (!mainTradeValue && profile.data.basics?.mainTrade) {
          mainTradeValue = profile.data.basics.mainTrade
          console.log('✅ Found mainTrade from basics.mainTrade:', mainTradeValue)
        }
        
        // If we still don't have a mainTrade, try to get it from the first row's trade
        if (!mainTradeValue && tradeData.tradeRows && tradeData.tradeRows.length > 0) {
          mainTradeValue = tradeData.tradeRows[0]?.trade || ''
        }
        
        if (mainTradeValue) {
          setMainTrade(mainTradeValue)
          console.log('✅ Main trade set to:', mainTradeValue)
        } else {
          console.warn('⚠️ No mainTrade found in any location')
        }
        
        // ✅ IMPORTANT: Get tools certifications from trade.toolsCertifications
        const toolsCerts = tradeData.toolsCertifications || {}
        const checkedCount = Object.values(toolsCerts).filter(v => v === true).length
        console.log(`🔧 Tools certifications from trade: ${checkedCount} selected`)
        
        // Also check certifications section as fallback
        const certsData = profile.data.certifications || {}
        const certChecklist = certsData.certChecklist || {}
        
        // ✅ Use toolsCerts as primary source
        const checklistData = Object.keys(toolsCerts).length > 0 
          ? toolsCerts 
          : certChecklist
        
        console.log('✅ Final checklist data:', Object.keys(checklistData).filter(k => checklistData[k]).length, 'selected')
        
        // Load certRows from certifications section
        let certRows = certsData.certRows || []
        if (certRows.length === 0) {
          certRows = [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }]
        }
        
        // Load safety flags
        const safetyFlags = certsData.safetyFlags || {}
        
        // ✅ Set all the data at once
        setCertData({
          certChecklist: checklistData,
          certRows: certRows,
          safetyFlags: safetyFlags,
        })
        
        // Auto-expand the main trade section
        if (mainTradeValue) {
          setExpandedSections(prev => ({ ...prev, [mainTradeValue]: true }))
        }
        
        console.log('✅ Certifications loaded successfully')
        console.log('  - Main Trade:', mainTradeValue)
        console.log('  - Checklist items:', Object.keys(checklistData).length)
        console.log('  - Selected items:', Object.keys(checklistData).filter(k => checklistData[k]).length)
        console.log('  - Cert rows:', certRows.length)
        console.log('  - Safety flags:', Object.keys(safetyFlags).length)
        
      } else {
        console.log('ℹ️ No profile data found, initializing empty state')
        setCertData({
          certChecklist: {},
          certRows: [{ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }],
          safetyFlags: {},
        })
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
        // Don't remove the last row, just clear it
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

      // ✅ Step 1: Update the trade section with toolsCertifications
      const profile = await workerService.getWorkerProfile(userId)
      const currentTrade = profile.data?.trade || {}
      
      const updatedTrade = {
        ...currentTrade,
        toolsCertifications: certData.certChecklist || {},
      }
      
      await workerService.updateTrade(userId, updatedTrade)
      console.log('✅ Trade toolsCertifications updated')
      
      // ✅ Step 2: Update the certifications section
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

  const getCertificationsForTrade = (trade) => {
    return TOOLS_CERTIFICATIONS[trade] || []
  }

  const tradeCertifications = getCertificationsForTrade(mainTrade)

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
              {mainTrade && (
                <span style={{
                  marginLeft: '8px',
                  padding: '4px 12px',
                  background: 'rgba(15, 78, 169, 0.08)',
                  borderRadius: '16px',
                  fontSize: '12px',
                  color: '#0f4ea9',
                  fontWeight: 500,
                }}>
                  {mainTrade}
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
                SECTION 1: CERTIFICATION CHECKLIST - ACCORDION BY TRADE
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
                    {mainTrade && (
                      <span style={{
                        fontSize: '12px',
                        color: 'rgba(23, 38, 58, 0.5)',
                        fontWeight: 400,
                      }}>
                        Based on: {mainTrade}
                      </span>
                    )}
                  </div>

                  {mainTrade ? (
                    <div>
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          background: expandedSections[mainTrade] ? 'rgba(15, 78, 169, 0.05)' : 'rgba(15, 78, 169, 0.02)',
                          border: expandedSections[mainTrade] ? '1px solid rgba(15, 78, 169, 0.2)' : '1px solid rgba(18, 38, 63, 0.08)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onClick={() => toggleSection(mainTrade)}
                        onMouseEnter={(e) => {
                          if (!expandedSections[mainTrade]) {
                            e.currentTarget.style.background = 'rgba(15, 78, 169, 0.04)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!expandedSections[mainTrade]) {
                            e.currentTarget.style.background = 'rgba(15, 78, 169, 0.02)'
                          }
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#17263a',
                          }}>
                            {mainTrade}
                          </span>
                          <span style={{
                            fontSize: '11px',
                            color: 'rgba(23, 38, 58, 0.4)',
                            background: 'rgba(23, 38, 58, 0.06)',
                            padding: '2px 10px',
                            borderRadius: '12px',
                          }}>
                            {tradeCertifications.length} certifications
                          </span>
                          {Object.values(certData.certChecklist || {}).filter(v => v === true).length > 0 && (
                            <span style={{
                              fontSize: '11px',
                              color: '#2fb463',
                              background: 'rgba(47, 180, 99, 0.1)',
                              padding: '2px 10px',
                              borderRadius: '12px',
                            }}>
                              {Object.values(certData.certChecklist || {}).filter(v => v === true).length} selected
                            </span>
                          )}
                        </div>
                        {expandedSections[mainTrade] ? (
                          <IconChevronDown style={{ color: 'rgba(23, 38, 58, 0.4)' }} />
                        ) : (
                          <IconChevronRight style={{ color: 'rgba(23, 38, 58, 0.4)' }} />
                        )}
                      </div>

                      {expandedSections[mainTrade] && (
                        <div style={{
                          marginTop: '12px',
                          padding: '16px 20px',
                          border: '1px solid rgba(18, 38, 63, 0.06)',
                          borderRadius: '8px',
                          background: 'white',
                        }}>
                          {tradeCertifications.length > 0 ? (
                            <div style={{ 
                              display: 'grid', 
                              gridTemplateColumns: '1fr 1fr 1fr', 
                              gap: '8px'
                            }}>
                              {tradeCertifications.map((cert) => (
                                <label key={cert} style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '8px', 
                                  cursor: 'pointer',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  transition: 'background 0.15s ease',
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
                                  <span style={{ fontSize: '14px', color: '#17263a' }}>{cert}</span>
                                </label>
                              ))}
                            </div>
                          ) : (
                            <div style={{
                              textAlign: 'center',
                              padding: '20px',
                              color: 'rgba(23, 38, 58, 0.4)',
                              fontSize: '14px',
                            }}>
                              No certifications defined for this trade yet.
                            </div>
                          )}
                        </div>
                      )}
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
                      Please select a main trade in your Trade Profile first.
                    </div>
                  )}
                </div>

                {/* ============================================================
                SECTION 2: VERIFICATION DATA - UPDATED WITH DYNAMIC ROWS
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
                SECTION 3: SAFETY FLAGS
                ============================================================ */}
                <div style={{ marginTop: '24px' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '16px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                  }}>
                    3. Safety Flags
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gap: '20px', 
                    flexWrap: 'wrap',
                    padding: '12px',
                    background: 'rgba(15, 78, 169, 0.02)',
                    borderRadius: '12px',
                    border: '1px solid rgba(15, 78, 169, 0.06)',
                  }}>
                    {['Safety training completed', 'PPE available', 'Site orientation completed'].map((flag) => (
                      <label key={flag} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        transition: 'background 0.15s ease',
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
                          checked={!!(certData.safetyFlags?.[flag] || false)}
                          onChange={toggleSafetyFlag(flag)}
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                            accentColor: '#0f4ea9',
                          }}
                        />
                        <span style={{ fontSize: '14px', color: '#17263a' }}>{flag}</span>
                      </label>
                    ))}
                  </div>
                </div>

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