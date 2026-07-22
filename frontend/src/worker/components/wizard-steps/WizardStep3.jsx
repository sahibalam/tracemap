// src/worker/components/wizard-steps/WizardStep3.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// ✅ Tools and Certifications by Trade
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

  // ✅ Get tools/certifications based on the mainTrade from data prop
  const getToolsCertifications = () => {
    const mainTrade = data?.mainTrade || ''
    return TOOLS_CERTIFICATIONS[mainTrade] || []
  }

  const selectedTrade = data?.mainTrade || ''
  const toolsList = getToolsCertifications()
  const showToolsSection = selectedTrade !== '' && toolsList.length > 0
  const isCivil = selectedTrade === 'Civil / Sitework / Earthwork / Utilities'

  // ✅ Count selected items
  const selectedCount = Object.values(toolsCertifications).filter(v => v === true).length

  // ✅ Heavy Equipment lists
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

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          {/* ✅ Section Header */}
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#17263a',
            marginBottom: '8px',
          }}>
            {t('wizard.step3.title') || 'Tools, Certifications & Requirements'}
          </div>
          <div style={{
            fontSize: '13px',
            color: 'rgba(23, 38, 58, 0.6)',
            marginBottom: '20px',
          }}>
            {selectedTrade 
              ? `Select all tools, certifications, and requirements that apply to you for "${selectedTrade}"`
              : 'Please select a trade in the previous step to see available tools and certifications.'}
          </div>

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
                🚜 Heavy Equipment Operation
              </div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(23, 38, 58, 0.6)',
                marginBottom: '12px',
              }}>
                Select the heavy equipment you are qualified to operate
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
                  Equipment Type Checklist
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
                  Equipment Operation Task Capabilities
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
              {Object.values(heavyEquipment).some(v => v === true) && (
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
                    {Object.values(heavyEquipment).filter(v => v === true).length}
                  </strong>
                  {' '}heavy equipment item{Object.values(heavyEquipment).filter(v => v === true).length !== 1 ? 's' : ''} selected
                </div>
              )}
            </div>
          )}

          {/* ✅ Tools, Certifications, and Requirements Section */}
          {showToolsSection ? (
            <>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#17263a',
                marginBottom: '12px',
              }}>
                Tools & Certifications
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '6px 16px',
                padding: '16px',
                border: '1px solid rgba(18, 38, 63, 0.08)',
                borderRadius: '8px',
                background: 'rgba(15, 78, 169, 0.02)',
              }}>
                {toolsList.map((tool) => (
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

              {/* ✅ Summary of selected items */}
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
                  <strong>{selectedCount}</strong> item{selectedCount !== 1 ? 's' : ''} selected
                </span>
                {selectedCount > 0 && (
                  <span style={{ fontSize: '12px', color: '#2fb463' }}>
                    {Math.round((selectedCount / toolsList.length) * 100)}% complete
                  </span>
                )}
              </div>
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
                ? 'No tools or certifications defined for this trade yet.'
                : '← Please select a trade in the previous step first'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WizardStep3