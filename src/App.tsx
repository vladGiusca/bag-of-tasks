import { useState } from 'react'
import { ClassicApp } from './ui/classic/ClassicApp'
import { ModernApp } from './ui/modern/ModernApp'
import { UiSwitch } from './UiSwitch'
import { loadUiKind, saveUiKind, type UiKind } from './uiPreference'

export default function App() {
  const [ui, setUi] = useState<UiKind>(loadUiKind)

  function handleChange(kind: UiKind) {
    setUi(kind)
    saveUiKind(kind)
  }

  return (
    <>
      {ui === 'classic' ? <ClassicApp /> : <ModernApp />}
      <UiSwitch value={ui} onChange={handleChange} />
    </>
  )
}
