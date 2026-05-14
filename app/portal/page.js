'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const C = {
  green: '#3DAF2C',
  yellow: '#FDAB1C',
  dark: '#1A1A1A',
  blue: '#47C8F0',
  red: '#F0130F',
}

const COLOR_BAR = [C.green, C.yellow, C.dark, C.blue, C.red]

const ROLES = {
  member: { label: 'Member', color: C.green },
  family: { label: 'Family Member', color: C.blue },
  staff: { label: 'Staff Member', color: C.dark },
}

const NAV = [
  { id: 'home', label: 'Home', color: C.green },
  { id: 'schedule', label: 'Schedule', color: C.blue },
  { id: 'resources', label: 'Resources', color: C.yellow },
  { id: 'progress', label: 'Progress', color: C.dark },
]

// ---- Icons ----

function HomeIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function CalendarIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function BookIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function ChartIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function SwitchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
  )
}

const NAV_ICONS = { home: HomeIcon, schedule: CalendarIcon, resources: BookIcon, progress: ChartIcon }

// ---- Shared UI ----

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  )
}

function SectionTitle({ children }) {
  return <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">{children}</h3>
}

function Badge({ label, color }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold text-white whitespace-nowrap" style={{ backgroundColor: color }}>
      {label}
    </span>
  )
}

function ResourceCard({ name, desc, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: color + '22' }}>
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
      </div>
      <h4 className="font-semibold text-gray-900 group-hover:text-gray-700 leading-snug">{name}</h4>
      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>
      <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color }}>
        View resource <ChevronRight />
      </div>
    </div>
  )
}

function SessionRow({ time, name, room, color, label }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
      <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 truncate">{name}</div>
        <div className="text-sm text-gray-500">{time}{room ? ` · ${room}` : ''}</div>
      </div>
      {label && <Badge label={label} color={color} />}
    </div>
  )
}

// ---- Member Content ----

function MemberHome() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, Alex</h2>
        <p className="text-gray-400 mt-1">Thursday, May 14, 2025</p>
      </div>

      <Card>
        <SectionTitle>Today at The Living Room</SectionTitle>
        <div className="space-y-2.5">
          <SessionRow time="10:00 AM" name="Group Therapy" room="Green Room" color={C.green} label="Upcoming" />
          <SessionRow time="2:00 PM" name="Individual Session" room="Tibet Room" color={C.red} label="Upcoming" />
          <SessionRow time="4:00 PM" name="Movement" room="Great Room" color={C.blue} label="Upcoming" />
        </div>
      </Card>

      <Card>
        <SectionTitle>Today's Reflection</SectionTitle>
        <blockquote className="text-gray-600 italic text-lg leading-relaxed border-l-4 pl-4" style={{ borderColor: C.green }}>
          "The present moment always will have been. Whatever you do now, you keep forever."
        </blockquote>
      </Card>
    </div>
  )
}

function MemberSchedule() {
  const days = [
    { label: 'Mon', date: '12', sessions: [
      { name: 'Group Therapy', time: '9–10 AM', color: C.blue },
      { name: 'Movement', time: '4–5 PM', color: C.green },
    ]},
    { label: 'Tue', date: '13', sessions: [
      { name: 'Art Therapy', time: '11 AM–12 PM', color: C.red },
      { name: 'Individual', time: '2–3 PM', color: C.yellow },
    ]},
    { label: 'Wed', date: '14', sessions: [
      { name: 'Group Therapy', time: '9–10 AM', color: C.blue },
      { name: 'Family Session', time: '4–5 PM', color: C.green },
    ], today: true },
    { label: 'Thu', date: '15', sessions: [
      { name: 'Individual', time: '2–3 PM', color: C.yellow },
      { name: 'Movement', time: '4–5 PM', color: C.green },
    ]},
    { label: 'Fri', date: '16', sessions: [
      { name: 'Group Therapy', time: '9–10 AM', color: C.blue },
      { name: 'Life Skills', time: '11 AM–12 PM', color: C.yellow },
    ]},
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Your Schedule</h2>
        <p className="text-gray-400 mt-1">Week of May 12–16, 2025</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {days.map((day) => (
          <div
            key={day.label}
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${day.today ? 'border-gray-300 ring-2 ring-offset-1' : 'border-gray-100'}`}
            style={day.today ? { ringColor: C.green } : {}}
          >
            <div className={`px-3 py-2.5 border-b ${day.today ? 'border-gray-200' : 'border-gray-50'}`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700 text-sm">{day.label}</span>
                <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${day.today ? 'text-white' : 'text-gray-400'}`}
                  style={day.today ? { backgroundColor: C.green } : {}}>
                  {day.date}
                </span>
              </div>
            </div>
            <div className="p-2.5 space-y-2">
              {day.sessions.map((s, i) => (
                <div key={i} className="rounded-xl p-2.5 text-white text-xs font-medium" style={{ backgroundColor: s.color }}>
                  <div className="font-semibold leading-snug">{s.name}</div>
                  <div className="opacity-75 mt-0.5">{s.time}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MemberResources() {
  const resources = [
    { name: 'Breathing Exercises', desc: 'Guided techniques for stress and anxiety relief', color: C.blue },
    { name: 'Journaling Prompts', desc: 'Daily reflections and self-inquiry exercises', color: C.green },
    { name: 'Sleep Hygiene', desc: 'Evidence-based habits for better rest', color: C.dark },
    { name: 'Mindfulness', desc: 'Present-moment awareness practices', color: C.yellow },
    { name: 'Movement Library', desc: 'Body-based wellness and somatic techniques', color: C.red },
    { name: 'Community Guidelines', desc: 'Our shared values and expectations', color: C.green },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
        <p className="text-gray-400 mt-1">Tools to support your journey</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r) => <ResourceCard key={r.name} {...r} />)}
      </div>
    </div>
  )
}

function MemberProgress() {
  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const checkIns = [0.8, 0.6, 0.9, 0.7, 0.85, 0.5, 0.75]
  const badges = [
    { name: 'First Week', earned: true },
    { name: 'Two Weeks', earned: true },
    { name: 'One Month', earned: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
        <p className="text-gray-400 mt-1">Keep up the great work</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <SectionTitle>Current Streak</SectionTitle>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black leading-none" style={{ color: C.green }}>12</span>
            <span className="text-lg text-gray-400 mb-0.5">days</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Personal best: 14 days</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: C.green }} />
            ))}
          </div>
        </Card>

        <Card className="sm:col-span-2">
          <SectionTitle>Weekly Check-ins</SectionTitle>
          <div className="flex items-end gap-2 h-20">
            {checkIns.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md"
                  style={{ height: `${h * 60}px`, backgroundColor: C.green + 'BB' }}
                />
                <span className="text-xs text-gray-400">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle>Milestones</SectionTitle>
        <div className="flex flex-wrap gap-3">
          {badges.map((b) => (
            <div
              key={b.name}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-colors ${b.earned ? 'text-white border-transparent' : 'text-gray-400 border-gray-200 bg-white'}`}
              style={b.earned ? { backgroundColor: C.green, borderColor: C.green } : {}}
            >
              {b.earned && <CheckIcon />}
              {b.name}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ---- Family Content ----

function FamilyHome() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Supporting Your Loved One's Journey</h2>
        <p className="text-gray-400 mt-1">Family Portal · May 2025</p>
      </div>

      <Card>
        <SectionTitle>Program Overview</SectionTitle>
        <p className="text-gray-600 leading-relaxed">
          Your loved one is currently in <strong className="text-gray-900">Week 3</strong> of their program at The Living Room.
          They are engaging meaningfully with their therapeutic work. Family support is a vital part of the healing process — thank you for being here.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: '30%', backgroundColor: C.blue }} />
          </div>
          <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">Week 3 of 10</span>
        </div>
      </Card>

      <Card>
        <SectionTitle>Next Family Session</SectionTitle>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: C.blue }}>
            <span className="text-xs uppercase tracking-wide leading-none opacity-80">May</span>
            <span className="text-2xl font-black leading-tight">16</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Family Therapy Session</div>
            <div className="text-sm text-gray-500 mt-0.5">Thursday, May 16 at 4:00 PM</div>
            <div className="text-sm text-gray-500">With Dr. Sarah Chen · Video or In-person</div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle>A Note for Families</SectionTitle>
        <p className="text-gray-600 leading-relaxed text-sm">
          Recovery is not linear, and your loved one may have good days and challenging days.
          Consistent, gentle support without pressure is one of the most powerful things you can offer.
          Our family liaison is always available to talk through any concerns.
        </p>
      </Card>
    </div>
  )
}

function FamilySchedule() {
  const upcoming = [
    { date: 'May 16', time: '4:00 PM', type: 'Family Therapy Session', with: 'Dr. Sarah Chen', color: C.blue },
    { date: 'May 18', time: '2:00 PM', type: 'Visiting Hours', with: 'Open Visit', color: C.green },
    { date: 'May 20', time: '6:00 PM', type: 'Family Education Workshop', with: 'Group Session', color: C.yellow },
    { date: 'May 23', time: '4:00 PM', type: 'Family Therapy Session', with: 'Dr. Sarah Chen', color: C.blue },
    { date: 'May 25', time: '2:00 PM', type: 'Visiting Hours', with: 'Open Visit', color: C.green },
    { date: 'May 27', time: '6:00 PM', type: 'Family Education Workshop', with: 'Group Session', color: C.yellow },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Upcoming Schedule</h2>
        <p className="text-gray-400 mt-1">Family appointments and visiting times</p>
      </div>

      <Card>
        <div className="space-y-2.5">
          {upcoming.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
              <div className="w-1.5 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900">{item.type}</div>
                <div className="text-sm text-gray-500">{item.date} at {item.time} · {item.with}</div>
              </div>
              <Badge label={item.type.split(' ')[0]} color={item.color} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function FamilyResources() {
  const resources = [
    { name: 'How to Support Your Loved One', desc: 'Practical guidance for navigating this time together', color: C.blue },
    { name: 'Setting Healthy Boundaries', desc: 'Balancing care with your own wellbeing', color: C.green },
    { name: 'Family Communication Guide', desc: 'Effective, compassionate communication strategies', color: C.yellow },
    { name: 'Understanding the Program', desc: "What your loved one experiences in a typical day", color: C.red },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Family Resources</h2>
        <p className="text-gray-400 mt-1">Support materials for family members</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((r) => <ResourceCard key={r.name} {...r} />)}
      </div>
    </div>
  )
}

function FamilyProgress() {
  const metrics = [
    { label: 'Group Participation', pct: 85 },
    { label: 'Individual Sessions', pct: 100 },
    { label: 'Skills Practice', pct: 70 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Program Progress</h2>
        <p className="text-gray-400 mt-1">Week 3 overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Days in Program', value: '21', color: C.blue },
          { label: 'Sessions Attended', value: '18', color: C.green },
          { label: 'Family Check-ins', value: '4', color: C.yellow },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="text-4xl font-black leading-none" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-sm text-gray-500 mt-2 font-medium">{stat.label}</div>
          </Card>
        ))}
      </div>

      <Card>
        <SectionTitle>Engagement Overview</SectionTitle>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          Your loved one is actively participating in their treatment plan. Specific session details
          are kept confidential to protect their privacy and therapeutic process.
        </p>
        <div className="space-y-4">
          {metrics.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="text-gray-400">{item.pct}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, backgroundColor: C.blue }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>Next Family Touchpoint</SectionTitle>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: C.blue }}>
            <span className="text-xs uppercase tracking-wide leading-none opacity-80">May</span>
            <span className="text-2xl font-black leading-tight">16</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Family Therapy Session</div>
            <div className="text-sm text-gray-500 mt-0.5">Thursday at 4:00 PM with Dr. Sarah Chen</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

// ---- Staff Content ----

function StaffHome() {
  const members = [
    { id: 'A', name: 'Member A', note: 'Individual session at 2:00 PM', status: 'Active', statusColor: C.green },
    { id: 'B', name: 'Member B', note: 'Missed morning group — check-in recommended', status: 'Check-in Needed', statusColor: C.yellow },
    { id: 'C', name: 'Member C', note: 'Progressing well, no concerns', status: 'Active', statusColor: C.green },
    { id: 'D', name: 'Member D', note: 'Clinical review required before next session', status: 'Flagged', statusColor: C.red },
  ]

  const actions = ['Add Progress Note', 'View All Reports', 'Schedule Session', 'Contact Family']

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Staff Dashboard</h2>
        <p className="text-gray-400 mt-1">Thursday, May 14, 2025</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Today's Census", value: '12', sub: 'Current members', color: C.dark },
          { label: 'Sessions Today', value: '8', sub: 'Scheduled', color: C.blue },
          { label: 'Notes Due', value: '3', sub: 'Pending documentation', color: C.yellow },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="text-4xl font-black leading-none" style={{ color: stat.color }}>{stat.value}</div>
            <div className="font-semibold text-gray-700 mt-2">{stat.label}</div>
            <div className="text-sm text-gray-400">{stat.sub}</div>
          </Card>
        ))}
      </div>

      <Card>
        <SectionTitle>Member Status</SectionTitle>
        <div className="space-y-2.5">
          {members.map((m) => (
            <div key={m.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: C.dark }}>
                {m.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900">{m.name}</div>
                <div className="text-sm text-gray-500 truncate">{m.note}</div>
              </div>
              <Badge label={m.status} color={m.statusColor} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>Quick Actions</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action}
              className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
            >
              {action}
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}

function StaffSchedule() {
  const sessions = [
    { time: '8:00 AM', name: 'Clinical Team Huddle', room: 'Staff Room', count: null, color: C.dark },
    { time: '9:00 AM', name: 'Morning Group Therapy', room: 'Green Room', count: 8, color: C.green },
    { time: '10:00 AM', name: 'Individual Sessions', room: 'Multiple Rooms', count: 4, color: C.blue },
    { time: '11:00 AM', name: 'Art Therapy', room: 'Sun Room', count: 6, color: C.yellow },
    { time: '12:00 PM', name: 'Community Lunch', room: 'Great Room', count: 12, color: C.dark },
    { time: '1:00 PM', name: 'Documentation & Admin', room: 'Staff Room', count: null, color: C.dark },
    { time: '2:00 PM', name: 'Individual Sessions', room: 'Multiple Rooms', count: 5, color: C.blue },
    { time: '3:00 PM', name: 'Life Skills Workshop', room: 'Mud Room', count: 7, color: C.red },
    { time: '4:00 PM', name: 'Movement Therapy', room: 'Great Room', count: 10, color: C.green },
    { time: '5:00 PM', name: 'Evening Check-in', room: 'Green Room', count: 12, color: C.dark },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Daily Schedule</h2>
        <p className="text-gray-400 mt-1">All sessions · Thursday, May 14, 2025</p>
      </div>

      <Card>
        <div className="space-y-1">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="text-sm font-semibold text-gray-400 w-[72px] flex-shrink-0">{s.time}</div>
              <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900">{s.name}</div>
                <div className="text-sm text-gray-500">{s.room}</div>
              </div>
              {s.count !== null && (
                <div className="text-sm font-semibold text-gray-500 whitespace-nowrap">{s.count} members</div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function StaffResources() {
  const resources = [
    { name: 'Treatment Protocols', desc: 'Evidence-based clinical guidelines and procedures', color: C.blue },
    { name: 'Assessment Tools', desc: 'Intake forms and validated screening instruments', color: C.green },
    { name: 'Documentation Templates', desc: 'Progress notes, treatment plans, and discharge forms', color: C.yellow },
    { name: 'Training Materials', desc: 'Staff education, onboarding, and certification resources', color: C.dark },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Clinical Resources</h2>
        <p className="text-gray-400 mt-1">Staff tools and reference materials</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((r) => <ResourceCard key={r.name} {...r} />)}
      </div>
    </div>
  )
}

function StaffProgress() {
  const caseload = [
    { id: 'A', name: 'Member A', week: 3, progress: 70, notesDue: 0, nextSession: 'Today 2:00 PM', status: 'On Track', statusColor: C.green },
    { id: 'B', name: 'Member B', week: 2, progress: 45, notesDue: 1, nextSession: 'Today 3:30 PM', status: 'Needs Attention', statusColor: C.yellow },
    { id: 'C', name: 'Member C', week: 5, progress: 85, notesDue: 0, nextSession: 'Tomorrow 10:00 AM', status: 'On Track', statusColor: C.green },
    { id: 'D', name: 'Member D', week: 1, progress: 30, notesDue: 2, nextSession: 'Today 4:00 PM', status: 'New', statusColor: C.blue },
    { id: 'E', name: 'Member E', week: 8, progress: 92, notesDue: 0, nextSession: 'Tomorrow 2:00 PM', status: 'Thriving', statusColor: C.green },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Caseload Overview</h2>
        <p className="text-gray-400 mt-1">Current member progress</p>
      </div>

      <Card>
        <div className="space-y-3">
          {caseload.map((m) => (
            <div key={m.id} className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: C.dark }}>
                  {m.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">{m.name}</div>
                  <div className="text-xs text-gray-500">Week {m.week} · Next: {m.nextSession}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {m.notesDue > 0 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: C.red }}>
                      {m.notesDue} note{m.notesDue > 1 ? 's' : ''} due
                    </span>
                  )}
                  <Badge label={m.status} color={m.statusColor} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${m.progress}%`, backgroundColor: m.statusColor }} />
                </div>
                <span className="text-xs text-gray-400 font-semibold w-8 text-right">{m.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ---- Content Router ----

function PortalContent({ role, nav }) {
  const map = {
    member: { home: <MemberHome />, schedule: <MemberSchedule />, resources: <MemberResources />, progress: <MemberProgress /> },
    family: { home: <FamilyHome />, schedule: <FamilySchedule />, resources: <FamilyResources />, progress: <FamilyProgress /> },
    staff: { home: <StaffHome />, schedule: <StaffSchedule />, resources: <StaffResources />, progress: <StaffProgress /> },
  }
  return map[role]?.[nav] ?? null
}

// ---- Main Component ----

export default function PortalPage() {
  const router = useRouter()
  const [role, setRole] = useState(null)
  const [activeNav, setActiveNav] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('tlr_role')
    if (!stored) {
      router.replace('/')
      return
    }
    setRole(stored)
  }, [router])

  function switchRole() {
    localStorage.removeItem('tlr_role')
    router.push('/')
  }

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div
          className="w-8 h-8 rounded-full border-4 border-gray-200 animate-spin"
          style={{ borderTopColor: C.green }}
        />
      </div>
    )
  }

  const roleConfig = ROLES[role]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Color bar */}
      <div className="flex h-1.5 flex-shrink-0">
        {COLOR_BAR.map((color) => (
          <div key={color} className="flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
          <span className="font-black text-gray-900 tracking-tight text-base md:text-lg">
            THE LIVING ROOM AT PRINCETON
          </span>
        </div>
        <div
          className="px-4 py-1.5 rounded-full text-white text-sm font-semibold flex-shrink-0 ml-3"
          style={{ backgroundColor: roleConfig.color }}
        >
          {roleConfig.label}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            absolute inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 flex flex-col
            transform transition-transform duration-200 ease-in-out
            lg:relative lg:translate-x-0 lg:z-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <nav className="flex-1 px-3 py-5">
            {NAV.map((item) => {
              const Icon = NAV_ICONS[item.id]
              const isActive = activeNav === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-1
                    transition-all duration-150 text-left
                    ${isActive ? 'text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                  style={isActive ? { backgroundColor: item.color } : {}}
                >
                  <Icon size={18} color={isActive ? 'white' : item.color} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="px-3 pb-6">
            <button
              onClick={switchRole}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              <SwitchIcon />
              Switch Role
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8 max-w-4xl">
            <PortalContent role={role} nav={activeNav} />
          </div>
        </main>
      </div>
    </div>
  )
}
