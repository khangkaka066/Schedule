import { useEffect, useState } from 'react'
import { listeningUrl, practiceDays, readingExampleUrl, readingUrl } from './dailyPracticeData'

const storageKey = 'daily-practice-progress-v1'

function loadProgress() {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey)) ?? {}
  } catch {
    return {}
  }
}

const englishSteps = [
  {
    id: 'listening',
    time: '06:00–06:20',
    title: 'Listening · 20 phút',
    description: 'Chọn đúng 1 bài lẻ chưa làm trên YouPass. Làm 12 phút không tạm dừng, dành 8 phút xem đáp án và ghi câu nghe sai.',
    url: listeningUrl,
    linkText: 'Mở Listening YouPass',
  },
  {
    id: 'reading',
    time: '06:20–06:45',
    title: 'Reading · 25 phút',
    description: 'Chọn 1 passage/bài lẻ chưa làm. Đọc và trả lời trong 20 phút; dùng 5 phút đối chiếu đáp án, ghi lý do sai.',
    url: readingUrl,
    linkText: 'Mở Reading YouPass',
  },
  {
    id: 'shadowing',
    time: '06:45–07:00',
    title: 'Shadowing · 15 phút',
    description: 'Sau khi nộp Listening, chọn đoạn audio 1–2 phút có thể nghe lại. Nghe 2 lượt, nhại theo 3 lượt, thu âm và so với bản gốc.',
    url: listeningUrl,
    linkText: 'Mở lại bài Listening',
  },
  {
    id: 'speaking',
    time: '07:00–07:20',
    title: 'Speaking · 20 phút',
    description: 'Chuẩn bị ý 2 phút, nói và thu âm 10 phút, nghe lại rồi nói lại những câu vấp trong 8 phút.',
  },
  {
    id: 'review',
    time: '07:20–07:30',
    title: 'Sổ lỗi · 10 phút',
    description: 'Ghi 1 lỗi Listening, 1 lỗi Reading và 1 câu Speaking muốn sửa. Ngày mai xem lại trước khi bắt đầu.',
  },
]

function findCurrentDay() {
  const saved = loadProgress()
  return practiceDays.find((day) =>
    !englishSteps.every((step) => saved[`${day.number}-${step.id}`]) || !saved[`${day.number}-leetcode`],
  )?.number ?? practiceDays.length
}

export default function DailyPractice() {
  const [selectedDay, setSelectedDay] = useState(findCurrentDay)
  const [progress, setProgress] = useState(loadProgress)
  const day = practiceDays[selectedDay - 1]
  const completed = Object.values(progress).filter(Boolean).length
  const total = practiceDays.length * (englishSteps.length + 1)

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(progress))
  }, [progress])

  function toggle(step) {
    const key = `${day.number}-${step}`
    setProgress((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <>
      <section className="track-header practice-header" style={{ '--accent': '#2563eb' }}>
        <div>
          <span>28 ngày · 1 bài LeetCode mỗi ngày</span>
          <h2>LeetCode và IELTS mỗi ngày</h2>
          <p>Tiếng Anh 06:00–07:30: 1 Listening lẻ, 1 Reading lẻ, Shadowing, Speaking và ghi lỗi. LeetCode 22:30–23:30: đúng 1 bài theo thứ tự bên dưới.</p>
        </div>
        <div className="track-progress">
          <strong>{Math.round((completed / total) * 100)}%</strong>
          <span>{completed}/{total} việc đã làm</span>
          <div className="progress-line"><span style={{ width: `${(completed / total) * 100}%`, background: '#2563eb' }} /></div>
        </div>
      </section>

      <section className="practice-panel">
        <div className="practice-panel-heading">
          <div>
            <span>Chọn ngày trong lộ trình</span>
            <h3>4 tuần · 28 bài LeetCode khác nhau</h3>
          </div>
          <p>Bắt đầu từ Ngày 1 và chuyển sang ngày kế tiếp sau khi hoàn thành. Phần tiếng Anh dùng bài chưa làm trong tài khoản YouPass của bạn.</p>
        </div>
        <div className="practice-week-list">
          {[1, 2, 3, 4].map((week) => (
            <div className="practice-week" key={week}>
              <strong>Tuần {week}</strong>
              <div className="practice-day-list">
                {practiceDays.filter((item) => item.week === week).map((item) => {
                  const dayDone = englishSteps.every((step) => progress[`${item.number}-${step.id}`]) && progress[`${item.number}-leetcode`]

                  return (
                    <button
                      aria-pressed={selectedDay === item.number}
                      className={`${selectedDay === item.number ? 'active' : ''} ${dayDone ? 'complete' : ''}`}
                      key={item.number}
                      onClick={() => setSelectedDay(item.number)}
                      type="button"
                    >
                      Ngày {item.number}{dayDone ? ' ✓' : ''}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="practice-panel practice-day-panel">
        <div className="practice-panel-heading">
          <div>
            <span>Tuần {day.week} · Ngày {day.number}</span>
            <h3>06:00–07:30 · Tiếng Anh</h3>
          </div>
          <p>Chỉ làm một phần Listening và một passage Reading mỗi ngày; không cần hoàn thành cả đề trong một buổi.</p>
        </div>
        <div className="practice-step-list">
          {englishSteps.map((step) => {
            const key = `${day.number}-${step.id}`

            return (
              <article className={`practice-step ${progress[key] ? 'complete' : ''}`} key={step.id}>
                <label>
                  <input checked={Boolean(progress[key])} onChange={() => toggle(step.id)} type="checkbox" />
                  <span>{step.time}</span>
                  <strong>{step.title}</strong>
                </label>
                <p>{step.description}</p>
                {step.id === 'speaking' && <p><b>Chủ đề hôm nay:</b> {day.speakingTopic}</p>}
                {step.url && <a href={step.url} rel="noreferrer" target="_blank">{step.linkText} ↗</a>}
                {step.id === 'reading' && <a href={readingExampleUrl} rel="noreferrer" target="_blank">Bài Reading lẻ mẫu ↗</a>}
              </article>
            )
          })}
        </div>
      </section>

      <section className="practice-panel practice-code-panel">
        <div className="practice-panel-heading">
          <div>
            <span>22:30–23:30 · 1 bài/ngày</span>
            <h3>LeetCode: {day.problem}</h3>
          </div>
          <p>5 phút đọc đề, 35 phút tự giải, 10 phút kiểm thử, 10 phút ghi độ phức tạp và lỗi. Nếu chưa giải được, học lời giải rồi làm lại vào buổi ôn khác.</p>
        </div>
        <div className="practice-code-actions">
          <a href={day.leetcodeUrl} rel="noreferrer" target="_blank">Mở bài LeetCode ↗</a>
          <label>
            <input checked={Boolean(progress[`${day.number}-leetcode`])} onChange={() => toggle('leetcode')} type="checkbox" />
            Đã làm bài hôm nay
          </label>
          {selectedDay < practiceDays.length && <button onClick={() => setSelectedDay(selectedDay + 1)} type="button">Ngày tiếp theo →</button>}
        </div>
      </section>
    </>
  )
}
