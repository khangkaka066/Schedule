import { useMemo, useState } from 'react'
import './App.css'

const categories = [
  'Tất cả',
  'AI Project',
  'Đồ án',
  'LeetCode',
  'Toán AI',
  'English',
  'Trường',
]

const initialTasks = [
  {
    id: 1,
    title: 'Ôn nhanh bài trên trường trước khi đi làm',
    category: 'Trường',
    time: '05:50',
    note: 'Chỉ 25 phút: đọc lại note, đánh dấu phần cần hỏi hoặc học kỹ vào cuối tuần.',
    link: 'https://roadmap.humblebee.ai/',
    linkLabel: 'AI roadmap',
    done: false,
  },
  {
    id: 2,
    title: 'Review 1 pattern LeetCode',
    category: 'LeetCode',
    time: '18:30',
    note: 'Ngày làm full chỉ review 30 phút, không ép giải bài mới nếu quá mệt.',
    link: 'https://leetcode.com',
    linkLabel: 'LeetCode',
    done: false,
  },
  {
    id: 3,
    title: 'Làm AI Engineer math drill hôm nay',
    category: 'Toán AI',
    time: '19:05',
    note: 'Giải 4 bài thực chiến: RAG similarity, F1 score, token cost, threshold.',
    link: 'https://www.math4ml.com/',
    linkLabel: 'Math4ML',
    done: false,
  },
  {
    id: 4,
    title: 'Ghi 3 đầu việc tiếp theo cho đồ án capstone',
    category: 'Đồ án',
    time: '22:15',
    note: 'Không cần code nhiều ngày mai, chỉ cần giữ project không bị mất hướng.',
    link: 'https://developers.google.com/machine-learning/crash-course/',
    linkLabel: 'Google MLCC',
    done: false,
  },
  {
    id: 5,
    title: 'Thiết kế task schema cho personal AI project',
    category: 'AI Project',
    time: '22:35',
    note: 'Viết ra field cần có: title, category, time, priority, status, note.',
    link: 'https://www.mldl.study/',
    linkLabel: 'MLDL roadmap',
    done: false,
  },
  {
    id: 6,
    title: 'English nhẹ trước khi ngủ',
    category: 'English',
    time: '23:00',
    note: '10 từ mới, 5 câu tự nói, 1 đoạn nhật ký ngắn.',
    link: 'https://dailydictation.com',
    linkLabel: 'Daily Dictation',
    done: false,
  },
]

const initialWeekPlans = [
  {
    id: '2026-08-27',
    weekday: 'Thu',
    dayName: 'Thứ 5',
    dayNumber: '27',
    subtitle: 'Làm full, tối học nhẹ và giữ nhịp AI',
    items: [
      { id: 'sleep', time: '00:30 - 05:30', title: 'Ngủ cố định', done: false },
      { id: 'wake', time: '05:30 - 05:50', title: 'Thức dậy, vệ sinh, chuẩn bị ngày', done: false },
      { id: 'school-review', time: '05:50 - 06:25', title: 'Ôn bài trường nhẹ', link: 'https://roadmap.humblebee.ai/', linkLabel: 'Roadmap', done: false },
      { id: 'breakfast', time: '06:30 - 07:45', title: 'Ăn sáng và di chuyển/chuẩn bị đi làm', done: false },
      { id: 'work-morning', time: '08:00 - 12:00', title: 'Làm việc', done: false },
      { id: 'lunch', time: '12:00 - 13:00', title: 'Ăn trưa, nghỉ mắt', done: false },
      { id: 'work-afternoon', time: '13:00 - 17:00', title: 'Làm việc', done: false },
      { id: 'reset', time: '17:00 - 18:15', title: 'Về nhà, tắm, ăn nhẹ, reset', done: false },
      { id: 'leetcode', time: '18:30 - 19:00', title: 'Review LeetCode pattern', link: 'https://leetcode.com', linkLabel: 'LeetCode', done: false },
      { id: 'math', time: '19:05 - 19:35', title: 'AI Engineer math drill: RAG, metric, token cost', link: 'https://www.math4ml.com/', linkLabel: 'Math4ML', done: false },
      { id: 'trading', time: '20:00 - 22:00', title: 'Trading nếu thị trường mở, nếu không thì AI Project', link: 'https://developers.google.com/machine-learning/crash-course/', linkLabel: 'MLCC', done: false },
      { id: 'deep-work', time: '22:15 - 23:30', title: 'Đồ án, AI Project, English nhẹ', link: 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education', linkLabel: 'Vocabulary', done: false },
      { id: 'review', time: '23:30 - 00:10', title: 'Review ngày và plan thứ 6', done: false },
    ],
  },
  {
    id: '2026-08-28',
    weekday: 'Fri',
    dayName: 'Thứ 6',
    dayNumber: '28',
    subtitle: 'Ngày build mạnh cho AI Project và đồ án',
    items: [
      { id: 'sleep', time: '00:30 - 05:30', title: 'Ngủ cố định', done: false },
      { id: 'morning-review', time: '05:50 - 06:30', title: 'Ôn bài trường hoặc English nhẹ', link: 'https://dailydictation.com', linkLabel: 'Listening', done: false },
      { id: 'ai-project', time: '09:00 - 11:30', title: 'Build Personal AI Project: task schema + local state', link: 'https://www.mldl.study/', linkLabel: 'Roadmap', done: false },
      { id: 'leetcode', time: '14:00 - 15:30', title: 'Giải 1 bài LeetCode array/string', link: 'https://leetcode.com', linkLabel: 'LeetCode', done: false },
      { id: 'capstone', time: '16:00 - 17:30', title: 'Làm đồ án capstone: hoàn thành 1 màn hình hoặc 1 API', done: false },
      { id: 'trading', time: '20:00 - 22:00', title: 'Trading 2 tiếng', done: false },
      { id: 'review', time: '22:30 - 00:00', title: 'Review code, ghi log học tập, chuẩn bị thứ 7', done: false },
    ],
  },
  {
    id: '2026-08-29',
    weekday: 'Sat',
    dayName: 'Thứ 7',
    dayNumber: '29',
    subtitle: 'Đi học buổi sáng, làm việc buổi chiều, tối review nhẹ',
    items: [
      { id: 'sleep', time: '00:30 - 05:30', title: 'Ngủ cố định', done: false },
      { id: 'prepare-school', time: '05:50 - 07:30', title: 'Ăn sáng, chuẩn bị đi học, xem lại bài', done: false },
      { id: 'school', time: '08:30 - 12:00', title: 'Đi học', done: false },
      { id: 'work', time: '13:00 - 17:00', title: 'Làm việc', done: false },
      { id: 'reset', time: '17:00 - 19:00', title: 'Nghỉ, ăn tối, hồi phục năng lượng', done: false },
      { id: 'weekly-review', time: '20:30 - 22:00', title: 'Weekly review: tổng kết LeetCode, AI, đồ án', done: false },
      { id: 'english', time: '22:15 - 22:45', title: 'English nhẹ: 10 từ + 5 câu nói', link: 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education', linkLabel: 'Vocabulary', done: false },
    ],
  },
  {
    id: '2026-08-30',
    weekday: 'Sun',
    dayName: 'Chủ nhật',
    dayNumber: '30',
    subtitle: 'Tổng ôn, English online, plan tuần mới',
    items: [
      { id: 'sleep', time: '00:30 - 05:30', title: 'Ngủ cố định', done: false },
      { id: 'school-review', time: '09:00 - 11:00', title: 'Tổng ôn bài trường', done: false },
      { id: 'english-online', time: '15:00 - 16:30', title: 'Học tiếng Anh online', link: 'https://youpass.vn/luyen-thi/ielts/writing', linkLabel: 'YouPass', done: false },
      { id: 'math', time: '17:00 - 18:00', title: 'AI Engineer math drill: eval metric + threshold', link: 'https://www.math4ml.com/', linkLabel: 'Math4ML', done: false },
      { id: 'week-plan', time: '20:00 - 22:00', title: 'Plan tuần mới + cải thiện Personal AI Project', link: 'https://developers.google.com/machine-learning/crash-course/', linkLabel: 'MLCC', done: false },
      { id: 'review', time: '22:30 - 00:00', title: 'Chuẩn bị thứ 2, chọn task quan trọng nhất', done: false },
    ],
  },
  {
    id: '2026-08-31',
    weekday: 'Mon',
    dayName: 'Thứ 2',
    dayNumber: '31',
    subtitle: 'Làm việc buổi sáng, chiều học thuật toán và toán AI',
    items: [
      { id: 'sleep', time: '00:30 - 05:30', title: 'Ngủ cố định', done: false },
      { id: 'work', time: '08:00 - 12:00', title: 'Làm việc', done: false },
      { id: 'leetcode', time: '14:00 - 15:15', title: 'LeetCode: hash map hoặc two pointers', link: 'https://leetcode.com', linkLabel: 'LeetCode', done: false },
      { id: 'math', time: '15:30 - 17:00', title: 'AI Engineer math drill: embedding, ranking, latency', link: 'https://www.math4ml.com/', linkLabel: 'Math4ML', done: false },
      { id: 'ai', time: '20:00 - 22:00', title: 'Trading hoặc AI Project: lưu checklist bằng localStorage', done: false },
      { id: 'english', time: '22:30 - 23:15', title: 'Daily Dictation + ghi 5 câu mới', link: 'https://dailydictation.com', linkLabel: 'Listening', done: false },
    ],
  },
  {
    id: '2026-09-01',
    weekday: 'Tue',
    dayName: 'Thứ 3',
    dayNumber: '01',
    subtitle: 'Đồ án buổi sáng, English online buổi tối',
    items: [
      { id: 'sleep', time: '00:30 - 05:30', title: 'Ngủ cố định', done: false },
      { id: 'capstone', time: '09:00 - 11:00', title: 'Đồ án capstone: code + ghi report', done: false },
      { id: 'leetcode', time: '14:00 - 15:15', title: 'LeetCode: 1 bài two pointers', link: 'https://leetcode.com', linkLabel: 'LeetCode', done: false },
      { id: 'english-online', time: '18:00 - 19:30', title: 'Học tiếng Anh online', link: 'https://youpass.vn/luyen-thi/ielts/writing', linkLabel: 'YouPass', done: false },
      { id: 'trading', time: '20:30 - 22:30', title: 'Trading hoặc review AI notes', done: false },
      { id: 'review', time: '22:45 - 00:00', title: 'Review bài học và chuẩn bị thứ 4 đi học', done: false },
    ],
  },
  {
    id: '2026-09-02',
    weekday: 'Wed',
    dayName: 'Thứ 4',
    dayNumber: '02',
    subtitle: 'Đi học buổi sáng, chiều dành cho trường và đồ án',
    items: [
      { id: 'sleep', time: '00:30 - 05:30', title: 'Ngủ cố định', done: false },
      { id: 'prepare-school', time: '05:50 - 07:45', title: 'Chuẩn bị đi học, xem lại bài', done: false },
      { id: 'school', time: '08:30 - 12:00', title: 'Đi học', done: false },
      { id: 'school-review', time: '14:00 - 15:30', title: 'Học bài trên trường', done: false },
      { id: 'capstone', time: '16:00 - 17:30', title: 'Đồ án capstone: chốt 1 đầu việc nhỏ', done: false },
      { id: 'ai-project', time: '20:00 - 22:00', title: 'Personal AI Project: cải thiện UI hoặc data model', link: 'https://www.mldl.study/', linkLabel: 'Roadmap', done: false },
      { id: 'english', time: '22:30 - 23:15', title: 'Vocabulary + writing 5 câu', link: 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education', linkLabel: 'Vocabulary', done: false },
    ],
  },
]

const fixedSchedule = [
  { day: 'Thứ 2', blocks: ['08:00 - 12:00 Làm việc', '14:00 - 15:15 LeetCode', '15:30 - 17:00 Toán AI', '20:00 - 22:00 Trading hoặc AI Project'] },
  { day: 'Thứ 3', blocks: ['09:00 - 11:00 Đồ án', '14:00 - 15:15 LeetCode', '18:00 - 19:30 English online', '20:30 - 22:30 Trading hoặc review AI'] },
  { day: 'Thứ 4', blocks: ['08:30 - 12:00 Đi học', '14:00 - 15:30 Học bài trường', '16:00 - 17:30 Đồ án', '20:00 - 22:00 AI Project'] },
  { day: 'Thứ 5', blocks: ['08:00 - 17:00 Làm việc', '18:30 - 19:15 English nhẹ', '20:00 - 22:00 Trading hoặc LeetCode review'] },
  { day: 'Thứ 6', blocks: ['09:00 - 11:30 AI Project', '14:00 - 15:30 LeetCode', '16:00 - 17:30 Đồ án', '20:00 - 22:00 Trading'] },
  { day: 'Thứ 7', blocks: ['08:30 - 12:00 Đi học', '13:00 - 17:00 Làm việc', '20:30 - 22:00 Weekly review nhẹ'] },
  { day: 'Chủ nhật', blocks: ['09:00 - 11:00 Tổng ôn trường', '15:00 - 16:30 English online', '17:00 - 18:00 Toán AI', '20:00 - 22:00 Plan tuần + AI Project'] },
]

const roadmap = [
  ['Tuần 1', 'Nền tảng', 'Setup project AI, ôn Python/JS, array-string, từ vựng daily routine.'],
  ['Tuần 2', 'Machine Learning', 'Linear regression, classification, probability, hash map/two pointers.'],
  ['Tuần 3', 'Deep Learning', 'Neural network cơ bản, embeddings, stack/queue, capstone demo flow.'],
  ['Tuần 4', 'AI Engineer mini product', 'Hoàn thiện AI planner: UI, prompt, memory, README, demo video ngắn.'],
]

const freeTools = [
  ['Daily Dictation', 'Listening dictation mỗi ngày', 'https://dailydictation.com'],
  ['IELTS Dictionary', 'Dịch câu, vocabulary, writing', 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education'],
  ['YouPass IELTS', 'Reading, writing, listening', 'https://youpass.vn/luyen-thi/ielts/writing'],
  ['LeetCode', 'Algorithm practice', 'https://leetcode.com'],
  ['Google MLCC', 'Machine learning thực hành', 'https://developers.google.com/machine-learning/crash-course/'],
  ['Math4ML', 'Toán cho machine learning', 'https://www.math4ml.com/'],
  ['MLDL Study', 'Roadmap ML/DL/GenAI free', 'https://www.mldl.study/'],
  ['HumbleBeeAI', 'Open AI engineering curriculum', 'https://roadmap.humblebee.ai/'],
]

const initialMathExercises = [
  {
    id: 'rag-cosine',
    title: 'Bài 1: RAG retrieval - cosine similarity',
    problem: 'Query embedding q = [0.6, 0.8]. Có 3 document: d1 = [1, 0], d2 = [0, 1], d3 = [0.6, 0.8]. Tính cosine similarity giữa q với từng document và chọn top-2 document để đưa vào context.',
    hint: 'cos(q,d) = (q·d) / (||q|| ||d||). Với q và d3 đã có norm = 1.',
    goal: 'Biết cách hệ RAG chọn tài liệu liên quan nhất từ vector database.',
    done: false,
  },
  {
    id: 'f1-score',
    title: 'Bài 2: Evaluation - precision, recall, F1',
    problem: 'Một AI classifier phát hiện ticket cần escalate. Kết quả: TP=32, FP=8, FN=10, TN=50. Tính precision, recall và F1-score. Nếu team muốn tránh bỏ sót ticket quan trọng, nên ưu tiên precision hay recall?',
    hint: 'precision = TP/(TP+FP), recall = TP/(TP+FN), F1 = 2PR/(P+R).',
    goal: 'Đọc được metric để quyết định model có phù hợp yêu cầu sản phẩm không.',
    done: false,
  },
  {
    id: 'token-cost',
    title: 'Bài 3: LLM cost - token budget',
    problem: 'Một request RAG dùng 900 input tokens và sinh 250 output tokens. App có 1,200 requests/ngày. Nếu input cost = $0.15/1M tokens và output cost = $0.60/1M tokens, tính chi phí/ngày và 30 ngày.',
    hint: 'Cost = input_tokens/1,000,000*0.15 + output_tokens/1,000,000*0.60, rồi nhân số request.',
    goal: 'Biết estimate chi phí trước khi deploy AI feature thật.',
    done: false,
  },
  {
    id: 'threshold',
    title: 'Bài 4: Threshold tuning - moderation model',
    problem: 'Model moderation trả về score toxic cho 6 comment: [0.95, 0.82, 0.71, 0.64, 0.43, 0.22]. Nhãn thật toxic là [1, 1, 0, 1, 0, 0]. So sánh threshold 0.7 và 0.6: mỗi threshold có TP, FP, FN bao nhiêu? Threshold nào hợp hơn nếu không muốn bỏ lọt toxic?',
    hint: 'Score >= threshold thì predict toxic. Không muốn bỏ lọt toxic nghĩa là giảm FN, ưu tiên recall.',
    goal: 'Biết chỉnh threshold theo mục tiêu sản phẩm thay vì chỉ nhìn accuracy.',
    done: false,
  },
]

const dailyRules = [
  ['00:30 - 05:30', 'Ngủ cố định'],
  ['05:30 - 05:50', 'Thức dậy, vệ sinh, nước, chuẩn bị ngày'],
  ['05:50 - 06:30', 'Ôn bài trường hoặc English nhẹ'],
  ['22:30 - 00:00', 'Review, ghi log, chuẩn bị task ngày mai'],
]

const calendarDays = [
  { id: '2026-08-24', weekday: 'Mon', dayNumber: '24', muted: true },
  { id: '2026-08-25', weekday: 'Tue', dayNumber: '25', muted: true },
  { id: '2026-08-26', weekday: 'Wed', dayNumber: '26', muted: true, isToday: true },
  ...initialWeekPlans,
  { id: '2026-09-03', weekday: 'Thu', dayNumber: '03', muted: true },
  { id: '2026-09-04', weekday: 'Fri', dayNumber: '04', muted: true },
  { id: '2026-09-05', weekday: 'Sat', dayNumber: '05', muted: true },
  { id: '2026-09-06', weekday: 'Sun', dayNumber: '06', muted: true },
]

const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getPreviewItems(day) {
  return day.items
    ?.filter((item) => item.id !== 'sleep' && item.id !== 'wake')
    .slice(0, 3) ?? []
}

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [weekPlans, setWeekPlans] = useState(initialWeekPlans)
  const [selectedDayId, setSelectedDayId] = useState(initialWeekPlans[0].id)
  const [mathExercises, setMathExercises] = useState(initialMathExercises)
  const [activeCategory, setActiveCategory] = useState('Tất cả')

  const selectedDay = weekPlans.find((day) => day.id === selectedDayId) ?? weekPlans[0]
  const selectedDate = selectedDay.id.split('-').reverse().slice(0, 2).join('/')

  const filteredTasks = useMemo(() => {
    if (activeCategory === 'Tất cả') return tasks
    return tasks.filter((task) => task.category === activeCategory)
  }, [activeCategory, tasks])

  const completedCount = selectedDay.items.filter((task) => task.done).length
  const progress = Math.round((completedCount / selectedDay.items.length) * 100)

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  function toggleDayPlan(id) {
    setWeekPlans((currentPlans) =>
      currentPlans.map((day) =>
        day.id === selectedDayId
          ? {
              ...day,
              items: day.items.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item,
              ),
            }
          : day,
      ),
    )
  }

  function toggleMathExercise(id) {
    setMathExercises((currentExercises) =>
      currentExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, done: !exercise.done } : exercise,
      ),
    )
  }

  return (
    <main className="planner">
      <section className="page-header">
        <div>
          <p>Bắt đầu từ thứ 5, 27/08/2026</p>
          <h1>{selectedDay.dayName} Plan</h1>
        </div>
        <div className="date-card">
          <span>{selectedDay.weekday}</span>
          <strong>{selectedDay.dayNumber}</strong>
        </div>
      </section>

      <section className="summary">
        <div>
          <span>Hôm nay</span>
          <strong>{progress}%</strong>
        </div>
        <div className="progress-track" aria-label={`${progress}% completed`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <p>
          {completedCount} / {selectedDay.items.length} việc trong ngày đã hoàn thành
        </p>
      </section>

      <section className="calendar-panel">
        <div className="calendar-header">
          <div>
            <span>Calendar</span>
            <h2>August - September 2026</h2>
          </div>
          <p>Selected: {selectedDay.dayName}, {selectedDate}</p>
        </div>

        <div className="calendar-weekdays" aria-hidden="true">
          {weekLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="calendar-month">
          {calendarDays.map((day) => {
            const plan = weekPlans.find((weekPlan) => weekPlan.id === day.id)
            const dayCompleted = plan?.items.filter((item) => item.done).length ?? 0
            const total = plan?.items.length ?? 0
            const previewItems = getPreviewItems(plan ?? day)

            return (
              <button
                className={[
                  'calendar-day',
                  selectedDayId === day.id ? 'active' : '',
                  day.muted ? 'muted' : '',
                  day.isToday ? 'today' : '',
                ].filter(Boolean).join(' ')}
                disabled={!plan}
                key={day.id}
                onClick={() => plan && setSelectedDayId(day.id)}
                type="button"
              >
                <span className="calendar-day-top">
                  <span>{day.weekday}</span>
                  <strong>{day.dayNumber}</strong>
                </span>

                <span className="event-stack">
                  {previewItems.map((item) => (
                    <span className="event-chip" key={`${day.id}-${item.id}`}>
                      <b>{item.time.split(' - ')[0]}</b>
                      {item.title}
                    </span>
                  ))}
                  {total > previewItems.length && (
                    <span className="event-more">
                      +{total - previewItems.length} việc khác
                    </span>
                  )}
                </span>

                {plan && (
                  <span className="calendar-progress">
                    {dayCompleted}/{total}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <section className="tomorrow-panel">
        <div className="panel-title">
          <div>
            <span>Lịch ngày</span>
            <h2>{selectedDay.subtitle}</h2>
          </div>
        </div>

        <div className="day-plan-list">
          {selectedDay.items.map((item) => (
            <label className={`day-plan-item ${item.done ? 'done' : ''}`} key={item.id}>
              <input
                checked={item.done}
                onChange={() => toggleDayPlan(item.id)}
                type="checkbox"
              />
              <span className="checkmark" />
              <time>{item.time}</time>
              <div className="day-plan-content">
                <p>{item.title}</p>
                {item.link && (
                  <a href={item.link} onClick={(event) => event.stopPropagation()} rel="noreferrer" target="_blank">
                    {item.linkLabel}
                  </a>
                )}
              </div>
            </label>
          ))}
        </div>
      </section>

      <nav className="category-tabs" aria-label="Task categories">
        {categories.map((category) => (
          <button
            className={activeCategory === category ? 'active' : ''}
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </nav>

      <section className="planner-grid">
        <section className="checklist-panel" aria-label="Task checklist">
          <div className="panel-title">
            <div>
              <span>Checklist chính</span>
              <h2>{activeCategory === 'Tất cả' ? 'Việc cần làm ngày mai' : activeCategory}</h2>
            </div>
            <button aria-label="Add task" type="button">+</button>
          </div>

          <div className="task-list">
            {filteredTasks.map((task) => (
              <label className={`task-item ${task.done ? 'done' : ''}`} key={task.id}>
                <input
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  type="checkbox"
                />
                <span className="checkmark" />
                <span className="task-content">
                  <span className="task-row">
                    <strong>{task.title}</strong>
                    <time>{task.time}</time>
                  </span>
                  <span className="task-note">{task.note}</span>
                  <span className="task-meta">
                    <span className="task-category">{task.category}</span>
                    {task.link && (
                      <a href={task.link} onClick={(event) => event.stopPropagation()} rel="noreferrer" target="_blank">
                        {task.linkLabel}
                      </a>
                    )}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </section>

        <aside className="side-panel">
          <section className="timeline-card">
            <div className="panel-title compact">
              <div>
                <span>Cố định mỗi ngày</span>
                <h2>Khung sinh hoạt</h2>
              </div>
            </div>

            <div className="timeline">
              {dailyRules.map(([time, title]) => (
                <div className="timeline-row" key={`${time}-${title}`}>
                  <time>{time}</time>
                  <span />
                  <p>{title}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="focus-note">
            <span>Trading rule</span>
            <p>
              Ưu tiên 20:00. Nếu phiên mùa đông mở muộn, dời sang 21:00 và chỉ giao dịch 2 tiếng.
            </p>
          </section>
        </aside>
      </section>

      <section className="math-panel">
        <div className="panel-title">
          <div>
            <span>AI Engineer math</span>
            <h2>Bài toán thực chiến cần giải trong 30 phút</h2>
          </div>
        </div>

        <div className="math-list">
          {mathExercises.map((exercise) => (
            <label className={`math-item ${exercise.done ? 'done' : ''}`} key={exercise.id}>
              <input
                checked={exercise.done}
                onChange={() => toggleMathExercise(exercise.id)}
                type="checkbox"
              />
              <span className="checkmark" />
              <span className="math-content">
                <strong>{exercise.title}</strong>
                <p>{exercise.problem}</p>
                <small>Gợi ý: {exercise.hint}</small>
                <em>Mục tiêu: {exercise.goal}</em>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="weekly-panel">
        <div className="panel-title">
          <div>
            <span>Lịch tuần</span>
            <h2>Lịch học, làm việc và block phát triển AI</h2>
          </div>
        </div>
        <div className="week-grid">
          {fixedSchedule.map((day) => (
            <article className="day-card" key={day.day}>
              <h3>{day.day}</h3>
              {day.blocks.map((block) => (
                <p key={block}>{block}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="roadmap-panel">
        <div className="panel-title">
          <div>
            <span>Roadmap</span>
            <h2>Mục tiêu từng tuần</h2>
          </div>
        </div>
        <div className="roadmap-list">
          {roadmap.map(([week, title, detail]) => (
            <article className="roadmap-item" key={week}>
              <span>{week}</span>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="tools-panel">
        <div className="panel-title">
          <div>
            <span>Công cụ free</span>
            <h2>Link học nhanh theo từng kỹ năng</h2>
          </div>
        </div>
        <div className="tools-grid">
          {freeTools.map(([name, detail, link]) => (
            <a className="tool-card" href={link} key={name} rel="noreferrer" target="_blank">
              <strong>{name}</strong>
              <span>{detail}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
