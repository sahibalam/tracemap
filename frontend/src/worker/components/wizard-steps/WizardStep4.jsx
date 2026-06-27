// // src/worker/components/wizard-steps/WizardStep4.jsx
// import { TextField } from '../../../common/components/TextField'
// import { IconFolder, IconSupport, IconLocation, IconUser } from '../../../common/components/Icons'

// export function WizardStep4({ data, onChange, onNext, onBack }) {
//   const updateProjectField = (index, key) => (value) => {
//     const projects = [...(data.projects || [])]
//     projects[index] = { ...projects[index], [key]: value }
//     onChange({ ...data, projects })
//   }

//   const projects = data.projects || [
//     { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//     { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//   ]

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Recent Projects (Last 3 to 5 Relevant Projects)</div>
//           <div className="wizardProjectList">
//             {[0, 1].map((idx) => (
//               <div key={idx} className="wizardProjectCard">
//                 <div className="wizardProjectTitle">Project {idx + 1}</div>
//                 <div className="wizardGrid2">
//                   <TextField
//                     placeholder="Project name"
//                     icon={<IconFolder />}
//                     value={projects[idx]?.name || ''}
//                     onChange={updateProjectField(idx, 'name')}
//                   />
//                   <TextField
//                     placeholder="Client / GC"
//                     icon={<IconSupport />}
//                     value={projects[idx]?.client || ''}
//                     onChange={updateProjectField(idx, 'client')}
//                   />
//                 </div>

//                 <div className="wizardGrid4">
//                   <TextField
//                     placeholder="City"
//                     icon={<IconLocation />}
//                     value={projects[idx]?.city || ''}
//                     onChange={updateProjectField(idx, 'city')}
//                   />
//                   <TextField
//                     placeholder="State"
//                     icon={<IconLocation />}
//                     value={projects[idx]?.state || ''}
//                     onChange={updateProjectField(idx, 'state')}
//                   />
//                   <TextField
//                     placeholder="Role"
//                     icon={<IconUser />}
//                     value={projects[idx]?.role || ''}
//                     onChange={updateProjectField(idx, 'role')}
//                   />
//                   <TextField
//                     placeholder="Trade"
//                     icon={<IconSupport />}
//                     value={projects[idx]?.trade || ''}
//                     onChange={updateProjectField(idx, 'trade')}
//                   />
//                 </div>

//                 <div className="wizardGrid2">
//                   <TextField
//                     placeholder="Start date"
//                     icon={<IconSupport />}
//                     value={projects[idx]?.start || ''}
//                     onChange={updateProjectField(idx, 'start')}
//                   />
//                   <TextField
//                     placeholder="End date"
//                     icon={<IconSupport />}
//                     value={projects[idx]?.end || ''}
//                     onChange={updateProjectField(idx, 'end')}
//                   />
//                 </div>

//                 <TextField
//                   placeholder="Scope summary"
//                   icon={<IconSupport />}
//                   value={projects[idx]?.scope || ''}
//                   onChange={updateProjectField(idx, 'scope')}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="wizardFooter">
//         <button type="button" className="wizardPillBtn" onClick={onBack}>
//           <span className="wizardPillBtnLabel">Back</span>
//           <span className="wizardPillBtnIcon">←</span>
//         </button>
//         <div className="wizardFooterRight">
//           <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={onNext}>
//             <span className="wizardPillBtnLabel">Next</span>
//             <span className="wizardPillBtnIcon">→</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


// src/worker/components/wizard-steps/WizardStep4.jsx
import { TextField } from '../../../common/components/TextField'
import { IconFolder, IconSupport, IconLocation, IconUser, IconPhone } from '../../../common/components/Icons'

export function WizardStep4({ data, onChange, onNext, onBack }) {
  const updateProjectField = (index, key) => (value) => {
    const projects = [...(data.projects || [])]
    projects[index] = { ...projects[index], [key]: value }
    onChange({ ...data, projects })
  }

  const projects = data.projects || [
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
  ]

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">Recent Projects (Last 3 to 5 Relevant Projects)</div>
          
          {/* Three project cards in a row */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '16px',
            marginTop: '12px'
          }}>
            {/* Project 1 */}
            <div className="wizardProjectCard" style={{ 
              padding: '16px', 
              border: '1px solid rgba(18, 38, 63, 0.08)',
              borderRadius: '12px',
              background: 'white'
            }}>
              <div className="wizardProjectTitle" style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#0f4ea9',
                marginBottom: '12px'
              }}>
                Project 1
              </div>
              
              <TextField
                placeholder="Project Name"
                icon={<IconFolder />}
                value={projects[0]?.name || ''}
                onChange={updateProjectField(0, 'name')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Client / GC"
                icon={<IconSupport />}
                value={projects[0]?.client || ''}
                onChange={updateProjectField(0, 'client')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Phone Number"
                icon={<IconPhone />}
                value={projects[0]?.phone || ''}
                onChange={updateProjectField(0, 'phone')}
                style={{ marginBottom: '8px' }}
              />
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <TextField
                  placeholder="Trade"
                  icon={<IconSupport />}
                  value={projects[0]?.trade || ''}
                  onChange={updateProjectField(0, 'trade')}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="Role"
                  icon={<IconUser />}
                  value={projects[0]?.role || ''}
                  onChange={updateProjectField(0, 'role')}
                  style={{ flex: 1 }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <TextField
                  placeholder="Start"
                  icon={<IconSupport />}
                  value={projects[0]?.start || ''}
                  onChange={updateProjectField(0, 'start')}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="End"
                  icon={<IconSupport />}
                  value={projects[0]?.end || ''}
                  onChange={updateProjectField(0, 'end')}
                  style={{ flex: 1 }}
                />
              </div>
              
              <TextField
                placeholder="Scope Summary"
                icon={<IconSupport />}
                value={projects[0]?.scope || ''}
                onChange={updateProjectField(0, 'scope')}
                style={{ marginBottom: '8px' }}
              />
              
              <button
                type="button"
                className="btn btnPrimary"
                style={{
                  width: '100%',
                  padding: '6px 12px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  background: '#0f4ea9',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onClick={() => {
                  console.log('Save Project 1')
                }}
              >
                Save Project
              </button>
            </div>

            {/* Project 2 */}
            <div className="wizardProjectCard" style={{ 
              padding: '16px', 
              border: '1px solid rgba(18, 38, 63, 0.08)',
              borderRadius: '12px',
              background: 'white'
            }}>
              <div className="wizardProjectTitle" style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#0f4ea9',
                marginBottom: '12px'
              }}>
                Project 2
              </div>
              
              <TextField
                placeholder="Project Name"
                icon={<IconFolder />}
                value={projects[1]?.name || ''}
                onChange={updateProjectField(1, 'name')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Client / GC"
                icon={<IconSupport />}
                value={projects[1]?.client || ''}
                onChange={updateProjectField(1, 'client')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Phone Number"
                icon={<IconPhone />}
                value={projects[1]?.phone || ''}
                onChange={updateProjectField(1, 'phone')}
                style={{ marginBottom: '8px' }}
              />
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <TextField
                  placeholder="Trade"
                  icon={<IconSupport />}
                  value={projects[1]?.trade || ''}
                  onChange={updateProjectField(1, 'trade')}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="Role"
                  icon={<IconUser />}
                  value={projects[1]?.role || ''}
                  onChange={updateProjectField(1, 'role')}
                  style={{ flex: 1 }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <TextField
                  placeholder="Start"
                  icon={<IconSupport />}
                  value={projects[1]?.start || ''}
                  onChange={updateProjectField(1, 'start')}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="End"
                  icon={<IconSupport />}
                  value={projects[1]?.end || ''}
                  onChange={updateProjectField(1, 'end')}
                  style={{ flex: 1 }}
                />
              </div>
              
              <TextField
                placeholder="Scope Summary"
                icon={<IconSupport />}
                value={projects[1]?.scope || ''}
                onChange={updateProjectField(1, 'scope')}
                style={{ marginBottom: '8px' }}
              />
              
              <button
                type="button"
                className="btn btnPrimary"
                style={{
                  width: '100%',
                  padding: '6px 12px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  background: '#0f4ea9',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onClick={() => {
                  console.log('Save Project 2')
                }}
              >
                Save Project
              </button>
            </div>

            {/* Project 3 */}
            <div className="wizardProjectCard" style={{ 
              padding: '16px', 
              border: '1px solid rgba(18, 38, 63, 0.08)',
              borderRadius: '12px',
              background: 'white'
            }}>
              <div className="wizardProjectTitle" style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#0f4ea9',
                marginBottom: '12px'
              }}>
                Project 3
              </div>
              
              <TextField
                placeholder="Project Name"
                icon={<IconFolder />}
                value={projects[2]?.name || ''}
                onChange={updateProjectField(2, 'name')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Client / GC"
                icon={<IconSupport />}
                value={projects[2]?.client || ''}
                onChange={updateProjectField(2, 'client')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Phone Number"
                icon={<IconPhone />}
                value={projects[2]?.phone || ''}
                onChange={updateProjectField(2, 'phone')}
                style={{ marginBottom: '8px' }}
              />
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <TextField
                  placeholder="Trade"
                  icon={<IconSupport />}
                  value={projects[2]?.trade || ''}
                  onChange={updateProjectField(2, 'trade')}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="Role"
                  icon={<IconUser />}
                  value={projects[2]?.role || ''}
                  onChange={updateProjectField(2, 'role')}
                  style={{ flex: 1 }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <TextField
                  placeholder="Start"
                  icon={<IconSupport />}
                  value={projects[2]?.start || ''}
                  onChange={updateProjectField(2, 'start')}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="End"
                  icon={<IconSupport />}
                  value={projects[2]?.end || ''}
                  onChange={updateProjectField(2, 'end')}
                  style={{ flex: 1 }}
                />
              </div>
              
              <TextField
                placeholder="Scope Summary"
                icon={<IconSupport />}
                value={projects[2]?.scope || ''}
                onChange={updateProjectField(2, 'scope')}
                style={{ marginBottom: '8px' }}
              />
              
              <button
                type="button"
                className="btn btnPrimary"
                style={{
                  width: '100%',
                  padding: '6px 12px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  background: '#0f4ea9',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onClick={() => {
                  console.log('Save Project 3')
                }}
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="wizardFooter">
        <button type="button" className="wizardPillBtn" onClick={onBack}>
          <span className="wizardPillBtnLabel">Back</span>
          <span className="wizardPillBtnIcon">←</span>
        </button>
        <div className="wizardFooterRight">
          <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={onNext}>
            <span className="wizardPillBtnLabel">Next</span>
            <span className="wizardPillBtnIcon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}