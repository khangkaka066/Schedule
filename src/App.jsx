import { useEffect, useState } from 'react'
import './App.css'
import DailyPractice from './DailyPractice'

const scheduleProgressKey = 'daily-schedule-progress-v1'
const ownerName = 'Khang'

const weeklySchedule = [
  {
    day: 'Thứ 2',
    type: 'Work + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'IELTS: 1 Listening lẻ + 1 Reading lẻ + Shadowing + Speaking', 'English'],
      ['08:00 - 17:00', 'Làm việc cố định', 'Work'],
      ['17:30 - 18:20', 'Ăn tối, nghỉ mắt, reset trước buổi học', 'Routine'],
      ['20:00 - 22:10', 'Trade cố định, ngồi theo plan và ghi journal sau lệnh', 'Trading'],
      ['22:20 - 22:30', 'Reset sau trade, mở sẵn bài LeetCode', 'Review'],
      ['22:30 - 23:30', 'LeetCode: làm 1 bài theo lộ trình 28 ngày', 'LeetCode'],
      ['23:30 - 00:20', 'Ghi pattern notebook, chuẩn bị bài English sáng mai', 'Review'],
    ],
  },
  {
    day: 'Thứ 3',
    type: 'Work + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'IELTS: 1 Listening lẻ + 1 Reading lẻ + Shadowing + Speaking', 'English'],
      ['09:00 - 11:00', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['20:00 - 22:10', 'Trade cố định, ưu tiên kỷ luật entry/exit', 'Trading'],
      ['22:20 - 22:30', 'Reset sau trade, mở sẵn bài LeetCode', 'Review'],
      ['22:30 - 23:30', 'LeetCode: làm 1 bài theo lộ trình 28 ngày', 'LeetCode'],
      ['23:30 - 00:15', 'Ghi lỗi học tập và lỗi trading trong ngày', 'Review'],
    ],
  },
  {
    day: 'Thứ 4',
    type: 'School day',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'IELTS: 1 Listening lẻ + 1 Reading lẻ + Shadowing + Speaking', 'English'],
      ['08:50 - 09:20', 'Di chuyển tới trường', 'Travel'],
      ['09:30 - 12:00', 'Học tại trường', 'School'],
      ['12:00 - 12:30', 'Di chuyển về hoặc tới điểm tiếp theo', 'Travel'],
      ['18:30 - 19:30', 'Làm bài tập trường', 'School'],
      ['20:00 - 22:10', 'Trade cố định', 'Trading'],
      ['22:20 - 22:30', 'Reset sau trade, mở sẵn bài LeetCode', 'Review'],
      ['22:30 - 23:30', 'LeetCode: làm 1 bài theo lộ trình 28 ngày', 'LeetCode'],
      ['23:30 - 00:15', 'Review ngắn, không học nặng sau trade', 'Review'],
    ],
  },
  {
    day: 'Thứ 5',
    type: 'Work + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'IELTS: 1 Listening lẻ + 1 Reading lẻ + Shadowing + Speaking', 'English'],
      ['08:00 - 17:00', 'Làm việc cố định', 'Work'],
      ['17:30 - 18:20', 'Ăn tối, nghỉ mắt, reset trước buổi học', 'Routine'],
      ['18:30 - 19:30', 'Làm bài tập trường', 'School'],
      ['20:00 - 22:10', 'Trade cố định', 'Trading'],
      ['22:20 - 22:30', 'Reset sau trade, mở sẵn bài LeetCode', 'Review'],
      ['22:30 - 23:30', 'LeetCode: làm 1 bài theo lộ trình 28 ngày', 'LeetCode'],
      ['23:30 - 00:20', 'Tổng kết bài LeetCode và trade journal', 'Review'],
    ],
  },
  {
    day: 'Thứ 6',
    type: 'Work half-day + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'IELTS: 1 Listening lẻ + 1 Reading lẻ + Shadowing + Speaking', 'English'],
      ['08:00 - 12:00', 'Làm việc cố định', 'Work'],
      ['14:00 - 15:30', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['18:20 - 19:30', 'Làm bài tập trường', 'School'],
      ['20:00 - 22:10', 'Trade cố định, cuối phiên chốt weekly journal', 'Trading'],
      ['22:20 - 22:30', 'Reset sau trade, mở sẵn bài LeetCode', 'Review'],
      ['22:30 - 23:30', 'LeetCode: làm 1 bài theo lộ trình 28 ngày', 'LeetCode'],
      ['23:30 - 00:15', 'Chọn 3 việc quan trọng cho cuối tuần', 'Review'],
    ],
  },
  {
    day: 'Thứ 7',
    type: 'School day',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'IELTS: 1 Listening lẻ + 1 Reading lẻ + Shadowing + Speaking', 'English'],
      ['08:50 - 09:20', 'Di chuyển tới trường', 'Travel'],
      ['09:30 - 12:00', 'Học tại trường', 'School'],
      ['12:00 - 12:30', 'Di chuyển về hoặc nghỉ trưa', 'Travel'],
      ['14:00 - 15:30', 'Làm bài tập trên trường', 'School'],
      ['21:15 - 22:15', 'Chuẩn bị bài trường hoặc nghỉ sau ngày học dài', 'School'],
      ['22:30 - 23:30', 'LeetCode: làm 1 bài theo lộ trình 28 ngày', 'LeetCode'],
      ['23:30 - 00:00', 'Ghi pattern notebook và chuẩn bị bài English sáng Chủ nhật', 'Review'],
    ],
  },
  {
    day: 'Chủ nhật',
    type: 'Planning + review',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'IELTS: 1 Listening lẻ + 1 Reading lẻ + Shadowing + Speaking', 'English'],
      ['09:00 - 10:00', 'Bài tập trường ưu tiên cao', 'School'],
      ['10:00 - 10:30', 'Cập nhật pattern notebook và chọn bài cho tuần mới', 'Review'],
      ['13:30 - 14:45', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['15:00 - 16:30', 'Bài tập trường: hoàn thành việc ưu tiên tuần mới', 'School'],
      ['20:00 - 21:00', 'Lên kế hoạch công việc tuần mới', 'Planning'],
      ['21:00 - 22:00', 'Chuẩn bị sổ tay, bài cần redo và checklist tuần tới', 'Review'],
      ['22:00 - 22:30', 'Chuẩn bị sổ tay và bài LeetCode redo', 'Review'],
      ['22:30 - 23:30', 'LeetCode: làm 1 bài theo lộ trình 28 ngày', 'LeetCode'],
    ],
  },
]

const fixedCommitments = [
  ['Ngủ và dậy', 'Đi ngủ 00:30, dậy 05:30 mỗi ngày để giữ nhịp ổn định.'],
  ['Làm việc', 'Thứ 2 và thứ 5 làm 08:00 - 17:00; thứ 6 làm 08:00 - 12:00.'],
  ['Học tại trường', 'Thứ 4 và thứ 7, 09:30 - 12:00, cộng 30 phút di chuyển mỗi chiều.'],
  ['Tiếng Anh', 'Mỗi ngày 06:00 - 07:30: Listening, Reading, Shadowing, Speaking và ghi lỗi.'],
  ['LeetCode', 'Mỗi ngày 22:30 - 23:30 làm 1 bài trong lộ trình 28 ngày.'],
  ['Trade', 'Thứ 2 tới thứ 6, 20:00 - 22:10 là block cố định.'],
]

function makeScheduleTaskId(day, time, title) {
  return `${day}-${time}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function loadScheduleProgress() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(scheduleProgressKey)) ?? {}
    const taskIds = new Set(weeklySchedule.flatMap((day) =>
      day.blocks.map(([time, title]) => makeScheduleTaskId(day.day, time, title)),
    ))
    return Object.fromEntries(Object.entries(saved).filter(([id]) => taskIds.has(id)))
  } catch {
    return {}
  }
}

function readPage() {
  const page = window.location.hash.replace('#', '')
  return page === 'schedule' || page === 'daily-practice' ? page : 'overview'
}

function App() {
  const [activePage, setActivePage] = useState(readPage)
  const [scheduleProgress, setScheduleProgress] = useState(loadScheduleProgress)

  useEffect(() => {
    function syncPage() {
      setActivePage(readPage())
    }

    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(scheduleProgressKey, JSON.stringify(scheduleProgress))
  }, [scheduleProgress])

  useEffect(() => {
    window.localStorage.removeItem('study-roadmap-progress-v1')
    window.localStorage.removeItem('exhibitflow-team-progress-v1')
  }, [])

  function navigate(page) {
    window.location.hash = page === 'overview' ? '' : page
    setActivePage(page)
  }

  function toggleScheduleTask(id) {
    setScheduleProgress((current) => ({ ...current, [id]: !current[id] }))
  }

  function resetScheduleDay(day) {
    const taskIds = new Set(day.blocks.map(([time, title]) => makeScheduleTaskId(day.day, time, title)))
    setScheduleProgress((current) =>
      Object.fromEntries(Object.entries(current).filter(([id]) => !taskIds.has(id))),
    )
  }

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Study sections">
        <div className="brand-block">
          <span>{ownerName} Study OS</span>
          <h1>LeetCode + IELTS</h1>
        </div>
        <nav className="track-nav">
          <button className={activePage === 'overview' ? 'active' : ''} onClick={() => navigate('overview')} type="button">Tổng quan</button>
          <button className={activePage === 'schedule' ? 'active' : ''} onClick={() => navigate('schedule')} style={{ '--accent': '#7c3aed' }} type="button">Lịch ngày</button>
          <button className={activePage === 'daily-practice' ? 'active' : ''} onClick={() => navigate('daily-practice')} style={{ '--accent': '#2563eb' }} type="button">LeetCode + IELTS mỗi ngày</button>
        </nav>
      </aside>

      <section className="workspace">
        {activePage === 'daily-practice' ? (
          <DailyPractice />
        ) : activePage === 'schedule' ? (
          <SchedulePage progress={scheduleProgress} onToggleTask={toggleScheduleTask} onResetDay={resetScheduleDay} />
        ) : (
          <Overview onOpenPage={navigate} />
        )}
      </section>
    </main>
  )
}

function Overview({ onOpenPage }) {
  return (
    <>
      <section className="hero-panel">
        <div>
          <span>Personal learning system</span>
          <h2>LeetCode và IELTS mỗi ngày</h2>
          <p>28 ngày, mỗi ngày một bài LeetCode và 90 phút luyện Listening, Reading, Shadowing, Speaking.</p>
        </div>
      </section>

      <section className="overview-grid overview-grid-simple">
        <article className="overview-card practice-overview-card">
          <span>28 ngày · 1 bài LeetCode/ngày</span>
          <h3>LeetCode + IELTS mỗi ngày</h3>
          <p>06:00–07:30 học IELTS theo từng bài lẻ; 22:30–23:30 giải một bài LeetCode.</p>
          <div className="card-footer">
            <small>Checklist 28 ngày lưu trên máy</small>
            <button onClick={() => onOpenPage('daily-practice')} type="button">Mở lộ trình</button>
          </div>
        </article>
        <article className="overview-card schedule-overview-card">
          <span>Lịch cố định</span>
          <h3>Lịch ngày</h3>
          <p>Giờ học tại trường, làm việc và trade được xếp cùng khung học IELTS và LeetCode mỗi ngày.</p>
          <div className="commitment-preview">
            {fixedCommitments.map(([label, value]) => <small key={label}><b>{label}</b>{value}</small>)}
          </div>
          <div className="card-footer">
            <small>7 ngày/tuần</small>
            <button onClick={() => onOpenPage('schedule')} type="button">Mở lịch</button>
          </div>
        </article>
      </section>
    </>
  )
}

function SchedulePage({ progress, onToggleTask, onResetDay }) {
  const taskIds = weeklySchedule.flatMap((day) =>
    day.blocks.map(([time, title]) => makeScheduleTaskId(day.day, time, title)),
  )
  const done = taskIds.filter((id) => progress[id]).length
  const percent = taskIds.length === 0 ? 0 : Math.round((done / taskIds.length) * 100)

  return (
    <>
      <section className="track-header schedule-header" style={{ '--accent': '#7c3aed' }}>
        <div>
          <span>{ownerName} daily schedule</span>
          <h2>Lịch trình hàng ngày</h2>
          <p>Giữ giờ làm việc, học tại trường và trading; học IELTS buổi sáng, làm một bài LeetCode mỗi tối.</p>
        </div>
        <div className="track-progress">
          <strong>{percent}%</strong>
          <span>{done}/{taskIds.length} việc đã tick</span>
          <div className="progress-line" aria-label="Daily schedule progress"><span style={{ width: `${percent}%`, background: '#7c3aed' }} /></div>
        </div>
      </section>

      <section className="fixed-grid">
        {fixedCommitments.map(([label, value]) => (
          <article key={label}><span>{label}</span><p>{value}</p></article>
        ))}
      </section>

      <section className="schedule-grid">
        {weeklySchedule.map((day) => {
          const dayTaskIds = day.blocks.map(([time, title]) => makeScheduleTaskId(day.day, time, title))
          const dayDone = dayTaskIds.filter((id) => progress[id]).length
          const dayPercent = Math.round((dayDone / day.blocks.length) * 100)

          return (
            <article className="schedule-day" key={day.day}>
              <div className="schedule-day-title">
                <div><span>{day.type}</span><h3>{day.day}</h3></div>
                <div className="day-progress">
                  <b>{dayPercent}%</b>
                  <small>{dayDone}/{day.blocks.length}</small>
                  <button onClick={() => onResetDay(day)} type="button">Reset</button>
                </div>
              </div>
              <div className="schedule-blocks">
                {day.blocks.map(([time, title, category]) => {
                  const id = makeScheduleTaskId(day.day, time, title)
                  return (
                    <label className={`schedule-block ${progress[id] ? 'done' : ''}`} data-category={category} key={id}>
                      <input checked={Boolean(progress[id])} onChange={() => onToggleTask(id)} type="checkbox" />
                      <span className="schedule-check" aria-hidden="true" />
                      <time>{time}</time>
                      <p>{title}</p>
                      <span className="schedule-tag">{category}</span>
                    </label>
                  )
                })}
              </div>
            </article>
          )
        })}
      </section>
    </>
  )
}

export default App
