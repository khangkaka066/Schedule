import { useEffect, useMemo, useState } from 'react'
import './App.css'

const progressKey = 'study-roadmap-progress-v1'

const tracks = [
  {
    id: 'leetcode',
    label: 'LeetCode',
    eyebrow: 'Algorithm practice',
    title: '3 tháng luyện giải thuật để tự nghĩ hướng giải',
    goal: 'Từ nền tảng array/string đến mock interview, ưu tiên nhận diện pattern, tự giải lại và giải thích độ phức tạp.',
    accent: '#2563eb',
    daily: [
      ['15 phút', 'Ôn note hôm qua, nói lại pattern bằng lời của mình.'],
      ['70 phút', 'Làm 2 bài mới: brute force trước, tối ưu sau.'],
      ['25 phút', 'Ghi sổ tay: pattern, lỗi sai, time/space complexity.'],
      ['10 phút', 'Redo nhanh 1 bài cũ hoặc viết pseudo-code.'],
    ],
    metrics: [
      ['Mục tiêu bài', '120+'],
      ['Tỉ lệ', '40% Easy, 50% Medium, 10% Hard'],
      ['Checkpoint', 'Giải lại được sau 3-7 ngày'],
    ],
    resources: [
      ['LeetCode', 'https://leetcode.com'],
      ['NeetCode roadmap', 'https://neetcode.io/roadmap'],
      ['VisuAlgo', 'https://visualgo.net/en'],
    ],
    months: [
      {
        name: 'Tháng 1',
        focus: 'Nền tảng array, string, hash, pointer',
        outcome: 'Nhìn đề biết brute force, biết dùng dict/set/prefix/two pointers để giảm độ phức tạp.',
        weeks: [
          ['Tuần 1', 'Array, String, HashMap', ['Two Sum', 'Contains Duplicate', 'Valid Anagram', 'Group Anagrams', 'Top K Frequent Elements']],
          ['Tuần 2', 'Prefix Sum, Two Pointers', ['Range Sum Query', 'Subarray Sum Equals K', 'Valid Palindrome', 'Two Sum II', '3Sum']],
          ['Tuần 3', 'Sliding Window', ['Best Time to Buy/Sell Stock', 'Longest Substring Without Repeating Characters', 'Minimum Size Subarray Sum', 'Permutation in String']],
          ['Tuần 4', 'Stack, Monotonic Stack', ['Valid Parentheses', 'Min Stack', 'Daily Temperatures', 'Next Greater Element', 'Largest Rectangle in Histogram']],
        ],
      },
      {
        name: 'Tháng 2',
        focus: 'Binary search, linked list, tree, graph',
        outcome: 'Viết traversal chắc, kiểm soát edge case null/visited, không kẹt loop binary search.',
        weeks: [
          ['Tuần 5', 'Binary Search', ['Binary Search', 'Search Insert Position', 'Search in Rotated Sorted Array', 'Find Minimum in Rotated Sorted Array', 'Koko Eating Bananas']],
          ['Tuần 6', 'Linked List', ['Reverse Linked List', 'Merge Two Sorted Lists', 'Linked List Cycle', 'Remove Nth Node From End', 'Reorder List']],
          ['Tuần 7', 'Tree DFS/BFS', ['Maximum Depth', 'Invert Binary Tree', 'Same Tree', 'Diameter of Binary Tree', 'Level Order Traversal']],
          ['Tuần 8', 'Graph/Grid', ['Number of Islands', 'Max Area of Island', 'Flood Fill', 'Clone Graph', 'Course Schedule']],
        ],
      },
      {
        name: 'Tháng 3',
        focus: 'Backtracking, heap, greedy, DP, mock',
        outcome: 'Giải thích được state/transition, chọn đúng data structure và chịu được áp lực timer.',
        weeks: [
          ['Tuần 9', 'Backtracking, Heap', ['Subsets', 'Permutations', 'Combination Sum', 'Kth Largest Element', 'Merge K Sorted Lists']],
          ['Tuần 10', 'Greedy', ['Jump Game', 'Gas Station', 'Merge Intervals', 'Non-overlapping Intervals', 'Partition Labels']],
          ['Tuần 11', 'Dynamic Programming', ['Climbing Stairs', 'House Robber', 'Coin Change', 'Longest Increasing Subsequence', 'Longest Common Subsequence']],
          ['Tuần 12', 'Mock Interview', ['4 mock 45 phút', 'Redo toàn bộ bài sai', 'Tổng kết pattern notebook', 'Ôn edge cases', 'Giải thích solution thành tiếng']],
        ],
      },
    ],
  },
  {
    id: 'ai-math',
    label: 'AI Math',
    eyebrow: 'Math for ML',
    title: '3 tháng xây nền toán AI qua bài tập thực chiến',
    goal: 'Học công thức vừa đủ để đọc model, hiểu metric, debug pipeline và giải thích AI feature bằng ví dụ số.',
    accent: '#059669',
    daily: [
      ['20 phút', 'Đọc công thức và tự viết lại bằng ví dụ nhỏ.'],
      ['45 phút', 'Giải 3-5 bài tính tay hoặc notebook NumPy.'],
      ['35 phút', 'Code mini demo bằng Python/sklearn.'],
      ['10 phút', 'Ghi ý nghĩa thực tế: metric, loss, threshold, cost.'],
    ],
    metrics: [
      ['Notebook', '12 mini notebooks'],
      ['Drill', '180 bài tính nhỏ'],
      ['Checkpoint', 'Giải thích được bằng ví dụ số'],
    ],
    resources: [
      ['Math4ML', 'https://www.math4ml.com/'],
      ['Google MLCC', 'https://developers.google.com/machine-learning/crash-course/'],
      ['StatQuest', 'https://www.youtube.com/@statquest'],
    ],
    months: [
      {
        name: 'Tháng 1',
        focus: 'Python data, linear algebra, probability nền',
        outcome: 'Hiểu vector/matrix, dot product, norm, cosine similarity, probability và distribution ở mức ứng dụng.',
        weeks: [
          ['Tuần 1', 'NumPy/Pandas foundation', ['shape/axis/broadcasting', 'read_csv/head/info', 'missing values', 'plot trend/outlier']],
          ['Tuần 2', 'Linear Algebra', ['vector/matrix', 'dot product', 'norm', 'cosine similarity', 'matrix multiplication']],
          ['Tuần 3', 'Probability', ['probability', 'conditional probability', 'Bayes intuition', 'sampling bias', 'distribution']],
          ['Tuần 4', 'Statistics', ['mean/median', 'variance/std', 'correlation', 'confidence intuition', 'z-score']],
        ],
      },
      {
        name: 'Tháng 2',
        focus: 'Machine learning math and evaluation',
        outcome: 'Biết model học bằng loss/gradient, đọc confusion matrix và chọn metric theo mục tiêu sản phẩm.',
        weeks: [
          ['Tuần 5', 'Regression', ['linear regression', 'MSE/MAE/RMSE', 'residual', 'feature scaling', 'regularization intuition']],
          ['Tuần 6', 'Classification', ['sigmoid', 'logistic regression', 'threshold', 'cross entropy', 'decision boundary']],
          ['Tuần 7', 'Evaluation', ['TP/FP/FN/TN', 'precision/recall/F1', 'ROC-AUC intuition', 'overfitting', 'cross-validation']],
          ['Tuần 8', 'Optimization', ['gradient descent', 'learning rate', 'SGD/Adam intuition', 'loss curve', 'early stopping']],
        ],
      },
      {
        name: 'Tháng 3',
        focus: 'Deep learning, embedding, RAG math',
        outcome: 'Nắm tensor, activation, embedding search, ranking metric, token cost và latency tradeoff.',
        weeks: [
          ['Tuần 9', 'Neural Network', ['layer/weight/bias', 'ReLU/sigmoid/softmax', 'backprop intuition', 'batch size', 'dropout']],
          ['Tuần 10', 'Computer Vision basics', ['convolution', 'pooling', 'augmentation', 'train/val curve', 'confusion analysis']],
          ['Tuần 11', 'Embedding and RAG', ['embedding vector', 'cosine search', 'top-k retrieval', 'chunking', 'retrieval hit rate']],
          ['Tuần 12', 'AI Engineer metrics', ['latency', 'token cost', 'hallucination eval', 'faithfulness', 'product KPI report']],
        ],
      },
    ],
  },
  {
    id: 'english',
    label: 'English',
    eyebrow: 'IELTS 6.5',
    title: '3 tháng nâng nền English và luyện IELTS có kiểm soát',
    goal: 'Từ grammar/vocab/listening nền sang IELTS skills, luôn có error log để sửa đúng lỗi đang kéo band xuống.',
    accent: '#dc2626',
    daily: [
      ['30 phút', 'Grammar và sentence drill, ưu tiên câu đúng trước câu hay.'],
      ['30 phút', 'Vocabulary bằng collocation, đặt câu và active recall.'],
      ['45 phút', 'Listening/Reading luân phiên, luôn analyze lỗi.'],
      ['45 phút', 'Writing/Speaking luân phiên, ghi âm hoặc rewrite.'],
    ],
    metrics: [
      ['Target', 'IELTS 6.5'],
      ['Vocab', '1,200 collocations'],
      ['Checkpoint', 'Mock ổn định L/R 6.5+'],
    ],
    resources: [
      ['Daily Dictation', 'https://dailydictation.com'],
      ['IELTS Dictionary', 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education'],
      ['YouPass IELTS', 'https://youpass.vn/luyen-thi/ielts/writing'],
    ],
    months: [
      {
        name: 'Tháng 1',
        focus: 'English Core',
        outcome: 'Viết câu đúng, nghe được thông tin cơ bản, nói câu ngắn rõ ý và có collocation dùng được.',
        weeks: [
          ['Tuần 1', 'Grammar nền', ['S/V/O', 'be/do/have', 'present/past/future', 'articles', 'pronouns']],
          ['Tuần 2', 'Sentence accuracy', ['modal verbs', 'comparatives', 'prepositions', 'countable nouns', 'compound sentences']],
          ['Tuần 3', 'Complex sentences', ['relative clauses', 'passive voice', 'conditionals', 'gerund/infinitive', 'linking words']],
          ['Tuần 4', 'Listening/Speaking base', ['numbers/dates/names', 'shadowing', 'Part 1 answers', 'Answer-Reason-Example', 'pronunciation log']],
        ],
      },
      {
        name: 'Tháng 2',
        focus: 'IELTS skills',
        outcome: 'Biết dạng bài IELTS, tìm keyword/paraphrase, viết Task 1/2 có cấu trúc và nói Part 2 đủ thời gian.',
        weeks: [
          ['Tuần 5', 'Listening types', ['form completion', 'note completion', 'multiple choice', 'matching', 'map']],
          ['Tuần 6', 'Reading types', ['scanning', 'skimming', 'T/F/NG', 'matching headings', 'sentence completion']],
          ['Tuần 7', 'Writing Task 1', ['intro', 'overview', 'body 1', 'body 2', 'trend comparison']],
          ['Tuần 8', 'Writing Task 2 + Speaking', ['thesis', 'topic sentence', 'example', 'Part 2 story', 'Part 3 opinion']],
        ],
      },
      {
        name: 'Tháng 3',
        focus: 'Band optimization and mock',
        outcome: 'Biết mất điểm ở đâu, mock đều, sửa grammar/vocab/timing theo error log thay vì cày đề vô hướng.',
        weeks: [
          ['Tuần 9', 'Listening/Reading speed', ['3 tests/week', 'transcript analysis', 'paraphrase bank', 'distractor log', 'redo wrong answers']],
          ['Tuần 10', 'Writing improvement', ['3 Task 2/week', '2 Task 1/week', 'grammar rewrite', 'cohesion check', 'sample comparison']],
          ['Tuần 11', 'Speaking fluency', ['Part 1 quick answers', 'Part 2 2-minute talk', 'Part 3 depth', 'recording review', 'pronunciation fixes']],
          ['Tuần 12', 'Mock and stabilize', ['2 full mocks/week', 'timing control', 'weakest skill drill', 'final error log', 'band target review']],
        ],
      },
    ],
  },
]

function makeTaskId(trackId, monthName, weekName, task) {
  return `${trackId}-${monthName}-${weekName}-${task}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function getTrackTaskIds(track) {
  return track.months.flatMap((month) =>
    month.weeks.flatMap(([weekName, , tasks]) =>
      tasks.map((task) => makeTaskId(track.id, month.name, weekName, task)),
    ),
  )
}

function loadProgress() {
  try {
    return JSON.parse(window.localStorage.getItem(progressKey)) ?? {}
  } catch {
    return {}
  }
}

function App() {
  const [activeTrackId, setActiveTrackId] = useState(() => {
    const route = window.location.hash.replace('#', '')

    return tracks.some((track) => track.id === route) ? route : 'overview'
  })
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    function syncRoute() {
      const route = window.location.hash.replace('#', '')
      setActiveTrackId(tracks.some((track) => track.id === route) ? route : 'overview')
    }

    window.addEventListener('hashchange', syncRoute)

    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(progressKey, JSON.stringify(progress))
  }, [progress])

  const trackSummaries = useMemo(
    () => tracks.map((track) => {
      const taskIds = getTrackTaskIds(track)
      const done = taskIds.filter((id) => progress[id]).length
      const total = taskIds.length

      return {
        ...track,
        done,
        total,
        percent: total === 0 ? 0 : Math.round((done / total) * 100),
      }
    }),
    [progress],
  )

  const activeTrack = trackSummaries.find((track) => track.id === activeTrackId)

  function toggleTask(id) {
    setProgress((current) => ({
      ...current,
      [id]: !current[id],
    }))
  }

  function resetTrack(track) {
    const taskIds = new Set(getTrackTaskIds(track))

    setProgress((current) =>
      Object.fromEntries(Object.entries(current).filter(([key]) => !taskIds.has(key))),
    )
  }

  function navigate(trackId) {
    window.location.hash = trackId === 'overview' ? '' : trackId
    setActiveTrackId(trackId)
  }

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Study sections">
        <div className="brand-block">
          <span>Study OS</span>
          <h1>Roadmap 3 tháng</h1>
        </div>

        <nav className="track-nav">
          <button
            className={activeTrackId === 'overview' ? 'active' : ''}
            onClick={() => navigate('overview')}
            type="button"
          >
            Tổng quan
          </button>
          {trackSummaries.map((track) => (
            <button
              className={activeTrackId === track.id ? 'active' : ''}
              key={track.id}
              onClick={() => navigate(track.id)}
              style={{ '--accent': track.accent }}
              type="button"
            >
              {track.label}
              <span>{track.percent}%</span>
            </button>
          ))}
        </nav>
      </aside>

      <section className="workspace">
        {activeTrack ? (
          <TrackPage
            onReset={() => resetTrack(activeTrack)}
            onToggleTask={toggleTask}
            progress={progress}
            track={activeTrack}
          />
        ) : (
          <Overview
            onOpenTrack={navigate}
            tracks={trackSummaries}
          />
        )}
      </section>
    </main>
  )
}

function Overview({ tracks, onOpenTrack }) {
  const totalDone = tracks.reduce((sum, track) => sum + track.done, 0)
  const totalTasks = tracks.reduce((sum, track) => sum + track.total, 0)
  const totalPercent = totalTasks === 0 ? 0 : Math.round((totalDone / totalTasks) * 100)

  return (
    <>
      <section className="hero-panel">
        <div>
          <span>Personal learning system</span>
          <h2>LeetCode, AI Math và English tách riêng để học sâu trong 3 tháng</h2>
          <p>
            Mỗi phần có lộ trình 12 tuần, checklist lưu local, tài nguyên riêng và nhịp học hằng ngày.
          </p>
        </div>
        <div className="hero-meter">
          <strong>{totalPercent}%</strong>
          <span>{totalDone}/{totalTasks} việc đã xong</span>
        </div>
      </section>

      <section className="overview-grid">
        {tracks.map((track) => (
          <article className="overview-card" key={track.id}>
            <span style={{ color: track.accent }}>{track.eyebrow}</span>
            <h3>{track.label}</h3>
            <p>{track.goal}</p>
            <ProgressBar accent={track.accent} percent={track.percent} />
            <div className="card-footer">
              <small>{track.done}/{track.total} checklist</small>
              <button onClick={() => onOpenTrack(track.id)} type="button">Mở page</button>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

function TrackPage({ track, progress, onToggleTask, onReset }) {
  return (
    <>
      <section className="track-header" style={{ '--accent': track.accent }}>
        <div>
          <span>{track.eyebrow}</span>
          <h2>{track.title}</h2>
          <p>{track.goal}</p>
        </div>
        <div className="track-progress">
          <strong>{track.percent}%</strong>
          <span>{track.done}/{track.total} checklist</span>
          <ProgressBar accent={track.accent} percent={track.percent} />
          <button onClick={onReset} type="button">Reset phần này</button>
        </div>
      </section>

      <section className="track-support">
        <article>
          <span>Nhịp học mỗi ngày</span>
          {track.daily.map(([time, task]) => (
            <p key={time}><b>{time}</b><em>{task}</em></p>
          ))}
        </article>
        <article>
          <span>Chỉ số cần giữ</span>
          {track.metrics.map(([label, value]) => (
            <p key={label}><b>{label}</b><em>{value}</em></p>
          ))}
        </article>
        <article>
          <span>Tài nguyên</span>
          <div className="resource-list">
            {track.resources.map(([label, url]) => (
              <a href={url} key={label} rel="noreferrer" target="_blank">{label}</a>
            ))}
          </div>
        </article>
      </section>

      <section className="month-stack">
        {track.months.map((month) => (
          <article className="month-panel" key={month.name}>
            <div className="month-title">
              <div>
                <span>{month.name}</span>
                <h3>{month.focus}</h3>
              </div>
              <p>{month.outcome}</p>
            </div>

            <div className="week-grid">
              {month.weeks.map(([weekName, focus, tasks]) => (
                <section className="week-panel" key={`${month.name}-${weekName}`}>
                  <span>{weekName}</span>
                  <h4>{focus}</h4>
                  <div className="task-stack">
                    {tasks.map((task) => {
                      const taskId = makeTaskId(track.id, month.name, weekName, task)

                      return (
                        <label className={`task-check ${progress[taskId] ? 'done' : ''}`} key={taskId}>
                          <input
                            checked={Boolean(progress[taskId])}
                            onChange={() => onToggleTask(taskId)}
                            type="checkbox"
                          />
                          <span aria-hidden="true" />
                          {task}
                        </label>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

function ProgressBar({ accent, percent }) {
  return (
    <div className="progress-line" aria-label={`${percent}% completed`}>
      <span style={{ width: `${percent}%`, background: accent }} />
    </div>
  )
}

export default App
