import { useMemo, useState } from 'react'
import { englishBookSchedule, quizSets } from './englishPracticeData'

const dailyProgressKey = 'english-daily-practice-v1'
const quizAttemptsKey = 'english-quiz-attempts-v1'
const errorLogKey = 'english-error-log-v1'

const cd1Files = import.meta.glob('../CD1/**/*.mp3', { eager: true, import: 'default', query: '?url' })
const cd2Files = import.meta.glob('../CD2/**/*.mp3', { eager: true, import: 'default', query: '?url' })

function loadJson(key, fallback) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

function getAudioEntries() {
  return Object.entries({ ...cd1Files, ...cd2Files }).map(([file, url]) => {
    const normalized = file.replace('../', '')
    const chapterMatch = normalized.match(/(CD[12])\/Chapter (\d+)/)
    const exerciseMatch = normalized.match(/Ex_([\d]+)/i)

    return {
      cd: chapterMatch?.[1] ?? 'CD',
      chapter: Number(chapterMatch?.[2] ?? 0),
      exercise: exerciseMatch?.[1] ?? '',
      label: normalized.split('/').pop().replace(/\.mp3$/i, '').replaceAll('_', ' '),
      path: normalized,
      url,
    }
  }).sort((a, b) => a.chapter - b.chapter || a.path.localeCompare(b.path))
}

function getChapterNumbers(chapterLabel) {
  return [...chapterLabel.matchAll(/\d+/g)].map((match) => Number(match[0]))
}

function normalizeAnswer(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.!?,]/g, '')
    .replace(/\s+/g, ' ')
}

function isCorrect(question, value) {
  const normalized = normalizeAnswer(value)
  const answers = Array.isArray(question.answer) ? question.answer : [question.answer]

  return answers.some((answer) => normalizeAnswer(answer) === normalized)
}

function todayIndex() {
  return (new Date().getDay() + 6) % 7
}

function getTodayWeek() {
  const start = new Date('2026-09-14T00:00:00')
  const now = new Date()
  const day = Math.max(0, Math.floor((now - start) / 86400000))

  return Math.min(12, Math.floor(day / 7) + 1)
}

function buildDailyTasks(weekPlan, dayIndex, audioEntries) {
  const exercise = weekPlan.exercises[dayIndex]
  const chapters = getChapterNumbers(weekPlan.chapter)
  const audio = audioEntries.find((entry) => chapters.includes(entry.chapter))
  const audioText = audio
    ? `Nghe ${audio.cd} · ${audio.label}; nghe 2 lần không transcript rồi shadow 5 câu.`
    : 'Nghe lại một đoạn đã học; chép chính tả 30–60 giây rồi shadow 5 câu.'

  return [
    {
      id: `${weekPlan.week}-${dayIndex}-book`,
      label: 'Bài sách',
      title: `${weekPlan.chapter} · ${exercise}`,
      detail: `Đọc chart và làm trọn ${exercise}. Gạch chân dấu hiệu thì/cấu trúc mới.`,
    },
    {
      id: `${weekPlan.week}-${dayIndex}-listen`,
      label: 'Listening',
      title: audio ? `${audio.cd} · Chapter ${String(audio.chapter).padStart(2, '0')}` : 'Ôn audio đã học',
      detail: audioText,
      audio,
    },
    {
      id: `${weekPlan.week}-${dayIndex}-output`,
      label: 'Output',
      title: 'Viết + nói 10 phút',
      detail: 'Viết 5 câu dùng điểm ngữ pháp hôm nay, đọc to và ghi lại 1 lỗi vào error log.',
    },
  ]
}

export default function EnglishLab() {
  const audioEntries = useMemo(() => getAudioEntries(), [])
  const [selectedWeek, setSelectedWeek] = useState(getTodayWeek)
  const [selectedDay, setSelectedDay] = useState(todayIndex)
  const [dailyProgress, setDailyProgress] = useState(() => loadJson(dailyProgressKey, {}))
  const [selectedQuizId, setSelectedQuizId] = useState(quizSets[0].id)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [quizAttempts, setQuizAttempts] = useState(() => loadJson(quizAttemptsKey, []))
  const [errorLog, setErrorLog] = useState(() => loadJson(errorLogKey, []))

  const weekPlan = englishBookSchedule[selectedWeek - 1]
  const dailyTasks = useMemo(() => buildDailyTasks(weekPlan, selectedDay, audioEntries), [audioEntries, selectedDay, weekPlan])
  const selectedQuiz = quizSets.find((quiz) => quiz.id === selectedQuizId) ?? quizSets[0]
  const answeredCount = selectedQuiz.questions.filter((question) => answers[question.id] !== undefined && answers[question.id] !== '').length
  const score = submitted
    ? selectedQuiz.questions.filter((question) => isCorrect(question, answers[question.id])).length
    : 0
  const completedDaily = dailyTasks.filter((task) => dailyProgress[task.id]).length
  const lastAttempt = quizAttempts.find((attempt) => attempt.quizId === selectedQuiz.id)

  function toggleDailyTask(taskId) {
    const next = { ...dailyProgress, [taskId]: !dailyProgress[taskId] }
    setDailyProgress(next)
    window.localStorage.setItem(dailyProgressKey, JSON.stringify(next))
  }

  function selectQuiz(quizId) {
    setSelectedQuizId(quizId)
    setAnswers({})
    setSubmitted(false)
  }

  function updateAnswer(questionId, value) {
    setAnswers((current) => ({ ...current, [questionId]: value }))
    setSubmitted(false)
  }

  function submitQuiz() {
    const result = selectedQuiz.questions.filter((question) => isCorrect(question, answers[question.id])).length
    const attempt = {
      quizId: selectedQuiz.id,
      score: result,
      total: selectedQuiz.questions.length,
      date: new Date().toISOString(),
    }
    const nextAttempts = [attempt, ...quizAttempts.filter((item) => item.quizId !== selectedQuiz.id)].slice(0, 20)
    const nextErrors = selectedQuiz.questions
      .filter((question) => !isCorrect(question, answers[question.id]))
      .map((question) => ({
        id: `${selectedQuiz.id}-${question.id}`,
        quizId: selectedQuiz.id,
        prompt: question.prompt,
        answer: question.displayAnswer ?? (Array.isArray(question.answer) ? question.answer.join(' / ') : question.answer),
        date: new Date().toISOString(),
      }))
    const mergedErrors = [...nextErrors, ...errorLog.filter((item) => !nextErrors.some((error) => error.id === item.id))].slice(0, 30)

    setSubmitted(true)
    setQuizAttempts(nextAttempts)
    setErrorLog(mergedErrors)
    window.localStorage.setItem(quizAttemptsKey, JSON.stringify(nextAttempts))
    window.localStorage.setItem(errorLogKey, JSON.stringify(mergedErrors))
  }

  function resetQuiz() {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <section className="english-lab-panel">
      <div className="english-lab-heading">
        <div>
          <span>English Lab · làm 2–3 bài mỗi ngày</span>
          <h3>Học theo sách, nghe đúng audio, biết rõ mình sai ở đâu</h3>
          <p>
            Lộ trình chia 20 chapter thành 12 tuần. Mỗi ngày chỉ cần hoàn thành 3 mục nhỏ; điểm số, bài sai và tiến độ được lưu ngay trên trình duyệt này.
          </p>
        </div>
        <div className="english-lab-stat">
          <strong>{completedDaily}/3</strong>
          <span>mục hôm nay</span>
          <div className="progress-line"><span style={{ width: `${(completedDaily / 3) * 100}%`, background: '#dc2626' }} /></div>
        </div>
      </div>

      <div className="english-lab-grid">
        <section className="english-day-panel">
          <div className="lab-section-title">
            <div>
              <span>Lộ trình 12 tuần</span>
              <h4>Chọn tuần và ngày để lấy đúng 3 việc</h4>
            </div>
            <span className="lab-source-note">Nguồn: Student Book + Answer Key</span>
          </div>
          <div className="lab-select-row">
            <label>Tuần
              <select value={selectedWeek} onChange={(event) => setSelectedWeek(Number(event.target.value))}>
                {englishBookSchedule.map((week) => <option key={week.week} value={week.week}>Tuần {week.week} · {week.chapter}</option>)}
              </select>
            </label>
            <label>Ngày
              <select value={selectedDay} onChange={(event) => setSelectedDay(Number(event.target.value))}>
                {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map((day, index) => <option key={day} value={index}>{day}</option>)}
              </select>
            </label>
          </div>
          <div className="selected-week-callout">
            <strong>{weekPlan.chapter}: {weekPlan.title}</strong>
            <span>{weekPlan.pages} · {weekPlan.exercises[selectedDay]}</span>
          </div>
          <div className="daily-task-list">
            {dailyTasks.map((task) => (
              <article className={`daily-task-item ${dailyProgress[task.id] ? 'is-complete' : ''}`} key={task.id}>
                <button className="daily-task-check" onClick={() => toggleDailyTask(task.id)} type="button" aria-label={`Đánh dấu ${task.label}`}>
                  {dailyProgress[task.id] ? '✓' : ''}
                </button>
                <div>
                  <span>{task.label}</span>
                  <h5>{task.title}</h5>
                  <p>{task.detail}</p>
                  {task.audio ? <audio controls preload="none" src={task.audio.url} /> : null}
                </div>
              </article>
            ))}
          </div>
          <p className="lab-tip"><b>Cách dùng:</b> làm Bài sách trước, nghe audio theo 4 bước, rồi mới làm Output. Nếu bận, giữ tối thiểu 1 bài sách + 1 audio.</p>
        </section>

        <aside className="english-side-panel">
          <div className="lab-section-title">
            <div>
              <span>Audio đã nối vào app</span>
              <h4>CD1 / CD2</h4>
            </div>
            <strong>{audioEntries.length} file</strong>
          </div>
          <p>Audio được lấy trực tiếp từ các folder bạn đã đặt trong `Schedule`. Chapter 17 hiện chưa có MP3 nên ngày đó sẽ chuyển sang ôn lại audio cũ.</p>
          <div className="audio-chapter-list">
            {[...new Set(audioEntries.map((audio) => audio.chapter))].map((chapter) => {
              const chapterAudio = audioEntries.filter((audio) => audio.chapter === chapter)

              return <span key={chapter}>Ch. {String(chapter).padStart(2, '0')} · {chapterAudio[0].cd} · {chapterAudio.length} bài</span>
            })}
          </div>
          <div className="lab-mini-metrics">
            <div><strong>{quizAttempts.length}</strong><span>bài đã nộp</span></div>
            <div><strong>{errorLog.length}</strong><span>lỗi cần ôn</span></div>
          </div>
        </aside>
      </div>

      <section className="english-quiz-panel">
        <div className="lab-section-title quiz-title-row">
          <div>
            <span>Kiểm tra + đáp án sau khi nộp</span>
            <h4>Chọn checkpoint, làm hết rồi bấm “Nộp bài”</h4>
          </div>
          {lastAttempt ? <span className="last-attempt">Lần gần nhất: {lastAttempt.score}/{lastAttempt.total}</span> : null}
        </div>
        <div className="quiz-tabs" role="tablist" aria-label="Chọn bài kiểm tra">
          {quizSets.map((quiz) => <button className={quiz.id === selectedQuiz.id ? 'active' : ''} key={quiz.id} onClick={() => selectQuiz(quiz.id)} type="button">{quiz.label}</button>)}
        </div>
        <div className="quiz-meta">
          <div><strong>{selectedQuiz.title}</strong><span>{selectedQuiz.source}</span></div>
          <span>{answeredCount}/{selectedQuiz.questions.length} câu đã làm</span>
        </div>
        <div className="quiz-question-list">
          {selectedQuiz.questions.map((question, index) => {
            const userAnswer = answers[question.id] ?? ''
            const correct = submitted && isCorrect(question, userAnswer)

            return <article className={`quiz-question ${submitted ? (correct ? 'is-correct' : 'is-wrong') : ''}`} key={question.id}>
              <div className="quiz-question-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="quiz-question-body">
                <h5>{question.prompt}</h5>
                {question.type === 'choice' ? (
                  <div className="quiz-options">
                    {question.options.map((option) => <label key={option}><input checked={userAnswer === option} name={question.id} onChange={() => updateAnswer(question.id, option)} type="radio" />{option}</label>)}
                  </div>
                ) : <input className="quiz-text-answer" onChange={(event) => updateAnswer(question.id, event.target.value)} placeholder="Gõ câu trả lời của bạn" type="text" value={userAnswer} />}
                {submitted ? <div className={`answer-reveal ${correct ? 'correct' : 'wrong'}`}>
                  <strong>{correct ? 'Đúng' : 'Cần xem lại'}</strong>
                  <span>Đáp án: <b>{question.displayAnswer ?? (Array.isArray(question.answer) ? question.answer.join(' / ') : question.answer)}</b></span>
                  <p>{question.explanation}</p>
                </div> : null}
              </div>
            </article>
          })}
        </div>
        <div className="quiz-actions">
          <button className="primary-lab-button" onClick={submitQuiz} type="button">Nộp bài · xem điểm và đáp án</button>
          <button className="secondary-lab-button" onClick={resetQuiz} type="button">Làm lại bài này</button>
          {submitted ? <strong className="quiz-score">{score}/{selectedQuiz.questions.length} · {Math.round((score / selectedQuiz.questions.length) * 100)}%</strong> : null}
        </div>
      </section>

      {errorLog.length > 0 ? <section className="english-error-panel">
        <div className="lab-section-title">
          <div><span>Error log tự động</span><h4>Ôn lại lỗi thay vì làm lại cả chương</h4></div>
          <span>{errorLog.length} lỗi gần nhất</span>
        </div>
        <div className="error-log-grid">
          {errorLog.slice(0, 6).map((error) => <article key={error.id}><span>{error.quizId.replaceAll('-', ' ')}</span><p>{error.prompt}</p><strong>{error.answer}</strong></article>)}
        </div>
      </section> : null}
    </section>
  )
}
