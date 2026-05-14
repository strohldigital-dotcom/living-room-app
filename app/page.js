'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const COLOR_BAR = ['#3DAF2C', '#FDAB1C', '#1A1A1A', '#47C8F0', '#F0130F']

const ROLES = [
  { id: 'member', label: "I'm a Member", sub: 'Access your personal portal', color: '#3DAF2C' },
  { id: 'family', label: "I'm a Family Member", sub: 'Support your loved one', color: '#47C8F0' },
  { id: 'staff', label: "I'm a Staff Member", sub: 'Clinical dashboard', color: '#1A1A1A' },
]

export default function HomePage() {
  const router = useRouter()

  function selectRole(roleId) {
    localStorage.setItem('tlr_role', roleId)
    router.push('/portal')
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Color bar */}
      <div className="flex h-2 fixed top-0 left-0 right-0 z-50">
        {COLOR_BAR.map((color) => (
          <div key={color} className="flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>

      {/* Demo badge */}
      <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">
        Demo Mode
      </div>

      {/* Main content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <div className="text-center max-w-3xl w-full">
          <div className="flex justify-center mb-6">
            <Image
              src="/unalome.png"
              alt="Unalome"
              width={1295}
              height={2077}
              style={{ height: '120px', width: 'auto' }}
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-none mb-6">
            THE LIVING ROOM<br />AT PRINCETON
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mx-auto mb-16 leading-relaxed">
            Forget everything you think you know about your mind and step into The Living Room.
          </p>

          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">
            Select your role to continue
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => selectRole(role.id)}
                className="group rounded-2xl p-7 text-white cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-2xl shadow-lg flex flex-col items-center justify-center min-h-[160px] text-center"
                style={{ backgroundColor: role.color }}
              >
                <span className="font-bold text-lg leading-snug">{role.label}</span>
                <span className="text-sm opacity-70 mt-2 group-hover:opacity-90 transition-opacity">
                  {role.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
