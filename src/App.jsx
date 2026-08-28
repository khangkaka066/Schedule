import { useEffect, useMemo, useState } from 'react'
import './App.css'

const fptPrepStorageKey = 'fpt-ai-test-prep-progress-v2'

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

const initialFptPrepPlan = [
  {
    id: 'coding',
    title: 'Coding',
    target: '25-30 bài LeetCode, Python chắc, giải thích được độ phức tạp.',
    days: [
      {
        id: 'coding-day-1',
        day: 'Ngày 1',
        time: '08:00 - 12:00',
        focus: 'Python + Array/String',
        learned: 'List, dict, set, Counter, sort key, slicing, edge cases.',
        tasks: [
          { id: 'py-core', title: 'Ôn Python list/dict/set + Counter/defaultdict' },
          { id: 'lc-two-sum', title: 'LeetCode: Two Sum, Contains Duplicate, Valid Anagram' },
          { id: 'lc-array', title: 'LeetCode: Best Time to Buy/Sell Stock, Maximum Subarray' },
        ],
      },
      {
        id: 'coding-day-2',
        day: 'Ngày 2',
        time: '08:00 - 12:00',
        focus: 'Hash Map + Sorting',
        learned: 'Đếm tần suất, group key, sort interval, prefix/suffix product.',
        tasks: [
          { id: 'lc-group', title: 'LeetCode: Group Anagrams' },
          { id: 'lc-topk', title: 'LeetCode: Top K Frequent Elements' },
          { id: 'lc-product-merge', title: 'LeetCode: Product Except Self, Merge Intervals' },
        ],
      },
      {
        id: 'coding-day-3',
        day: 'Ngày 3',
        time: '08:00 - 12:00',
        focus: 'Two Pointers + Sliding Window',
        learned: 'Hai con trỏ, window set/map, update answer trong vòng lặp.',
        tasks: [
          { id: 'lc-palindrome', title: 'LeetCode: Valid Palindrome' },
          { id: 'lc-3sum-water', title: 'LeetCode: 3Sum, Container With Most Water' },
          { id: 'lc-longest-substring', title: 'LeetCode: Longest Substring Without Repeating Characters' },
        ],
      },
      {
        id: 'coding-day-4',
        day: 'Ngày 4',
        time: '08:00 - 12:00',
        focus: 'Stack/Queue',
        learned: 'Stack validate, monotonic stack, xử lý expression cơ bản.',
        tasks: [
          { id: 'lc-parentheses', title: 'LeetCode: Valid Parentheses' },
          { id: 'lc-min-stack', title: 'LeetCode: Min Stack' },
          { id: 'lc-temperatures-rpn', title: 'LeetCode: Daily Temperatures, Evaluate RPN' },
        ],
      },
      {
        id: 'coding-day-5',
        day: 'Ngày 5',
        time: '08:00 - 12:00',
        focus: 'Binary Search + Tree',
        learned: 'Điều kiện left/right, DFS, BFS level order.',
        tasks: [
          { id: 'lc-binary-search', title: 'LeetCode: Binary Search, Search Insert Position' },
          { id: 'lc-rotated', title: 'LeetCode: Search in Rotated Sorted Array' },
          { id: 'lc-tree', title: 'LeetCode: Max Depth, Invert Tree, Level Order' },
        ],
      },
      {
        id: 'coding-day-6',
        day: 'Ngày 6',
        time: '08:00 - 12:00',
        focus: 'Dynamic Programming cơ bản',
        learned: 'State, base case, transition, memo/tabulation.',
        tasks: [
          { id: 'lc-climb', title: 'LeetCode: Climbing Stairs' },
          { id: 'lc-house', title: 'LeetCode: House Robber' },
          { id: 'lc-coin-lis', title: 'LeetCode: Coin Change, Longest Increasing Subsequence nếu còn thời gian' },
        ],
      },
      {
        id: 'coding-day-7',
        day: 'Ngày 7',
        time: '08:00 - 10:00',
        focus: 'Mock coding test',
        learned: 'Làm bài có giới hạn thời gian, ghi lỗi sai và edge case.',
        tasks: [
          { id: 'mock-easy', title: 'Mock: 1 Easy Array/String' },
          { id: 'mock-medium', title: 'Mock: 1 Medium HashMap/Sliding Window' },
          { id: 'mock-tree-dp', title: 'Mock: 1 Tree hoặc DP dễ' },
        ],
      },
    ],
  },
  {
    id: 'ai-math',
    title: 'AI Math',
    target: 'Hiểu vector, matrix, probability, metrics, loss và gradient descent.',
    days: [
      {
        id: 'math-day-1',
        day: 'Ngày 1',
        time: '13:30 - 15:30',
        focus: 'ML overview',
        learned: 'Supervised/unsupervised, classification/regression, train/test split.',
        tasks: [
          { id: 'ml-types', title: 'Phân biệt supervised, unsupervised, classification, regression' },
          { id: 'overfit', title: 'Ghi ví dụ overfitting/underfitting' },
          { id: 'split', title: 'Vẽ pipeline train/validation/test' },
        ],
      },
      {
        id: 'math-day-2',
        day: 'Ngày 2',
        time: '13:30 - 15:30',
        focus: 'Linear Algebra',
        learned: 'Vector, matrix, dot product, feature vector trong dataset.',
        tasks: [
          { id: 'vector-matrix', title: 'Ôn vector, matrix, shape dữ liệu' },
          { id: 'dot-product', title: 'Tính dot product và cosine similarity đơn giản' },
          { id: 'feature-vector', title: 'Giải thích row/sample và column/feature' },
        ],
      },
      {
        id: 'math-day-3',
        day: 'Ngày 3',
        time: '13:30 - 15:30',
        focus: 'Probability + Statistics',
        learned: 'Mean, variance, standard deviation, distribution, correlation.',
        tasks: [
          { id: 'stats-basic', title: 'Tính mean, median, variance trên ví dụ nhỏ' },
          { id: 'prob-basic', title: 'Ôn xác suất cơ bản và conditional probability' },
          { id: 'correlation', title: 'Hiểu correlation không đồng nghĩa causation' },
        ],
      },
      {
        id: 'math-day-4',
        day: 'Ngày 4',
        time: '13:30 - 15:30',
        focus: 'Loss + Gradient Descent',
        learned: 'Loss function, derivative, gradient, learning rate.',
        tasks: [
          { id: 'loss', title: 'So sánh MSE và Cross Entropy ở mức ý tưởng' },
          { id: 'gradient', title: 'Giải thích gradient descent bằng tiếng Việt' },
          { id: 'lr', title: 'Ghi tác động của learning rate quá lớn/quá nhỏ' },
        ],
      },
      {
        id: 'math-day-5',
        day: 'Ngày 5',
        time: '13:30 - 15:30',
        focus: 'Metrics',
        learned: 'Confusion matrix, accuracy, precision, recall, F1.',
        tasks: [
          { id: 'confusion', title: 'Tính TP/FP/FN/TN từ ví dụ classifier' },
          { id: 'metrics', title: 'Tính precision, recall, F1' },
          { id: 'metric-choice', title: 'Biết khi nào ưu tiên precision hoặc recall' },
        ],
      },
      {
        id: 'math-day-6',
        day: 'Ngày 6',
        time: '13:30 - 15:30',
        focus: 'ML/DL models',
        learned: 'Linear/logistic regression, tree, random forest, neural network, CNN.',
        tasks: [
          { id: 'classical-models', title: 'Ghi công dụng của 5 model ML phổ biến' },
          { id: 'nn-basic', title: 'Giải thích input/hidden/output layer' },
          { id: 'cnn-genai', title: 'Ôn CNN, embedding, RAG ở mức phỏng vấn fresher' },
        ],
      },
      {
        id: 'math-day-7',
        day: 'Ngày 7',
        time: '13:30 - 15:30',
        focus: 'AI mock interview',
        learned: 'Trả lời ngắn, đúng ý, có ví dụ project.',
        tasks: [
          { id: 'mock-ai-pipeline', title: 'Trả lời ML pipeline từ data đến evaluation' },
          { id: 'mock-overfit-metric', title: 'Trả lời overfitting và metrics' },
          { id: 'mock-rag', title: 'Trả lời CNN/Embedding/RAG' },
        ],
      },
    ],
  },
  {
    id: 'english',
    title: 'IELTS 6.5',
    target: 'Mục tiêu IELTS 6.5: Listening/Reading 6.5+, Writing/Speaking tối thiểu 6.0-6.5.',
    days: [
      {
        id: 'english-day-1',
        day: 'Ngày 1',
        time: '19:30 - 20:30',
        focus: 'IELTS baseline + pronunciation',
        learned: 'Biết band hiện tại, lỗi phát âm chính, format 4 kỹ năng IELTS.',
        tasks: [
          { id: 'ielts-format', title: 'Ôn format Listening, Reading, Writing, Speaking' },
          { id: 'pronunciation-record', title: 'Ghi âm Speaking Part 1: hometown/study/work' },
          { id: 'daily-vocab-1', title: 'Học 15 từ academic + collocation chủ đề Education' },
        ],
      },
      {
        id: 'english-day-2',
        day: 'Ngày 2',
        time: '19:30 - 20:30',
        focus: 'Listening accuracy',
        learned: 'Nghe bắt keyword, số, tên riêng, paraphrase trong câu hỏi.',
        tasks: [
          { id: 'listening-section-1', title: 'Làm 1 bài Listening Section 1 hoặc dictation 20 phút' },
          { id: 'listening-error-log', title: 'Ghi error log: spelling, plural, number, missed keyword' },
          { id: 'daily-vocab-2', title: 'Học 15 từ/cụm chủ đề Work và Daily Life' },
        ],
      },
      {
        id: 'english-day-3',
        day: 'Ngày 3',
        time: '19:30 - 20:30',
        focus: 'Reading speed',
        learned: 'Skimming, scanning, keyword matching và tránh bẫy True/False/Not Given.',
        tasks: [
          { id: 'reading-passage', title: 'Làm 1 passage Reading trong 20 phút' },
          { id: 'tfng-review', title: 'Review 5 câu True/False/Not Given hoặc matching headings' },
          { id: 'daily-vocab-3', title: 'Học 15 từ/cụm chủ đề Environment' },
        ],
      },
      {
        id: 'english-day-4',
        day: 'Ngày 4',
        time: '19:30 - 20:30',
        focus: 'Writing Task 1',
        learned: 'Viết overview rõ, mô tả trend/comparison, tránh liệt kê số liệu lan man.',
        tasks: [
          { id: 'task1-structure', title: 'Ôn cấu trúc Task 1: intro, overview, 2 body' },
          { id: 'task1-write', title: 'Viết 1 bài Task 1 trong 20 phút' },
          { id: 'task1-check', title: 'Tự check grammar: tense, comparison, article, plural' },
        ],
      },
      {
        id: 'english-day-5',
        day: 'Ngày 5',
        time: '19:30 - 20:30',
        focus: 'Writing Task 2',
        learned: 'Lập luận rõ, paragraph có topic sentence, example, explanation.',
        tasks: [
          { id: 'task2-outline', title: 'Lập outline cho 2 đề Task 2' },
          { id: 'task2-body', title: 'Viết 2 body paragraphs cho 1 đề trong 25 phút' },
          { id: 'daily-vocab-5', title: 'Học 15 collocations chủ đề Society/Technology' },
        ],
      },
      {
        id: 'english-day-6',
        day: 'Ngày 6',
        time: '19:30 - 20:30',
        focus: 'Speaking Part 2/3',
        learned: 'Nói 2 phút có mở bài, chi tiết, cảm nhận, ví dụ; trả lời Part 3 có quan điểm.',
        tasks: [
          { id: 'cue-card', title: 'Chuẩn bị 1 cue card Speaking Part 2' },
          { id: 'speaking-record', title: 'Ghi âm câu trả lời 2 phút và nghe lại' },
          { id: 'part3-practice', title: 'Trả lời 5 câu Speaking Part 3 theo cấu trúc point-reason-example' },
        ],
      },
      {
        id: 'english-day-7',
        day: 'Ngày 7',
        time: '19:30 - 20:30',
        focus: 'IELTS mini mock + error review',
        learned: 'Biết kỹ năng yếu nhất và kế hoạch tăng lên band 6.5.',
        tasks: [
          { id: 'mini-listening-reading', title: 'Làm mini mock Listening hoặc Reading 30 phút' },
          { id: 'writing-rewrite', title: 'Rewrite đoạn Writing yếu nhất trong tuần' },
          { id: 'speaking-final', title: 'Ghi âm Speaking Part 1 + Part 2, chấm theo fluency/vocab/grammar/pronunciation' },
        ],
      },
    ],
  },
  {
    id: 'project',
    title: 'Thực hành AI',
    target: 'Có 1 mini project scikit-learn để trình bày khi test/phỏng vấn.',
    days: [
      {
        id: 'project-day-1',
        day: 'Ngày 1',
        time: '15:45 - 17:00',
        focus: 'First sklearn model',
        learned: 'Load dataset, split data, train Logistic Regression, in accuracy.',
        tasks: [
          { id: 'iris-load', title: 'Load Iris dataset bằng sklearn' },
          { id: 'iris-train', title: 'Train Logistic Regression' },
          { id: 'iris-eval', title: 'In accuracy và giải thích kết quả' },
        ],
      },
      {
        id: 'project-day-2',
        day: 'Ngày 2',
        time: '15:45 - 17:00',
        focus: 'Pandas preprocessing',
        learned: 'read_csv, info, describe, isnull, groupby, fill missing values.',
        tasks: [
          { id: 'pandas-read', title: 'Đọc 1 dataset CSV hoặc built-in dataset' },
          { id: 'pandas-clean', title: 'Kiểm tra missing values và xử lý đơn giản' },
          { id: 'pandas-summary', title: 'Tạo summary bằng groupby/describe' },
        ],
      },
      {
        id: 'project-day-3',
        day: 'Ngày 3',
        time: '15:45 - 17:00',
        focus: 'Train classical ML',
        learned: 'So sánh Logistic Regression, KNN, Random Forest.',
        tasks: [
          { id: 'train-logistic', title: 'Train Logistic Regression' },
          { id: 'train-knn-rf', title: 'Train KNN hoặc Random Forest' },
          { id: 'compare-models', title: 'So sánh accuracy/F1 giữa các model' },
        ],
      },
      {
        id: 'project-day-4',
        day: 'Ngày 4',
        time: '15:45 - 17:00',
        focus: 'PyTorch/TensorFlow workflow',
        learned: 'Tensor, forward pass, loss, optimizer step ở mức cơ bản.',
        tasks: [
          { id: 'tensor-basic', title: 'Tạo tensor và kiểm tra shape' },
          { id: 'train-loop-read', title: 'Đọc hiểu skeleton training loop' },
          { id: 'dl-terms', title: 'Ghi nghĩa epoch, batch size, learning rate' },
        ],
      },
      {
        id: 'project-day-5',
        day: 'Ngày 5',
        time: '15:45 - 17:00',
        focus: 'Computer Vision/GenAI quick demo',
        learned: 'Image classification/object detection/RAG ở mức concept.',
        tasks: [
          { id: 'cv-notes', title: 'Ghi note CNN: convolution, pooling, classifier' },
          { id: 'rag-notes', title: 'Ghi flow RAG: chunk, embed, retrieve, generate' },
          { id: 'demo-choice', title: 'Chọn project để kể: Iris/Titanic/Spam/House Price' },
        ],
      },
      {
        id: 'project-day-6',
        day: 'Ngày 6',
        time: '15:45 - 17:00',
        focus: 'Mini project finish',
        learned: 'Một pipeline hoàn chỉnh đủ để đưa vào CV/phỏng vấn.',
        tasks: [
          { id: 'project-notebook', title: 'Hoàn thành notebook/script mini project' },
          { id: 'project-readme', title: 'Viết README: Problem, Dataset, Model, Metric' },
          { id: 'project-result', title: 'Ghi kết quả và cách cải thiện' },
        ],
      },
      {
        id: 'project-day-7',
        day: 'Ngày 7',
        time: '15:45 - 17:00',
        focus: 'Review and polish',
        learned: 'Biết trình bày project mạch lạc dưới áp lực test.',
        tasks: [
          { id: 'project-clean-code', title: 'Dọn code/notebook cho dễ đọc' },
          { id: 'project-practice', title: 'Tập demo hoặc kể project trong 2 phút' },
          { id: 'project-gap', title: 'Ghi 3 điểm còn yếu để học tiếp sau test' },
        ],
      },
    ],
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

const initialEnglishInterview = [
  {
    id: 'speaking-part-1',
    title: 'IELTS Speaking Part 1',
    prompt: 'Practice short natural answers about hometown, study, work, hobbies, daily routine, and future plans.',
    link: 'https://dailydictation.com',
    linkLabel: 'Pronunciation',
    done: false,
  },
  {
    id: 'speaking-part-2',
    title: 'IELTS Speaking Part 2',
    prompt: 'Prepare one cue card answer with clear structure: opening, details, story, feeling, and closing.',
    link: 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education',
    linkLabel: 'Vocabulary',
    done: false,
  },
  {
    id: 'writing-task-2',
    title: 'IELTS Writing Task 2',
    prompt: 'Write one clear opinion paragraph with topic sentence, reason, example, and explanation.',
    link: 'https://youpass.vn/luyen-thi/ielts/writing',
    linkLabel: 'Writing',
    done: false,
  },
]

const initialAiInterview = [
  {
    id: 'rag',
    title: 'RAG hoạt động như thế nào?',
    answer: 'Nêu flow: chunking, embedding, vector search, retrieve top-k, build prompt, generate answer, evaluate hallucination.',
    done: false,
  },
  {
    id: 'embedding',
    title: 'Embedding dùng để làm gì?',
    answer: 'Giải thích vector biểu diễn meaning, dùng cho search, clustering, recommendation, duplicate detection.',
    done: false,
  },
  {
    id: 'eval',
    title: 'Đánh giá AI feature bằng gì?',
    answer: 'Nêu task metric như precision/recall/F1, retrieval hit rate, latency, cost, user feedback, human review.',
    done: false,
  },
  {
    id: 'hallucination',
    title: 'Làm sao giảm hallucination?',
    answer: 'Dùng RAG, quote source, guardrail, refusal rule, eval set, prompt constraint, lower temperature khi cần.',
    done: false,
  },
]

const portfolioProjects = [
  ['AI Daily Planner', 'Checklist, calendar, links, interview roadmap, localStorage progress.'],
  ['RAG PDF Chatbot', 'Upload PDF, chunking, embeddings, retrieval, source citation, answer eval.'],
  ['English Interview Coach', 'Question bank, speech practice checklist, vocabulary log, answer template.'],
  ['AI Resume Assistant', 'Analyze JD, rewrite bullet points, match skill gaps, mock interview questions.'],
]

const confidenceStats = [
  ['IELTS target', '6.5 band'],
  ['AI concepts', '0/4 answers'],
  ['LeetCode roadmap', 'Week 1'],
  ['Portfolio shipped', '0/4 projects'],
]

const leetcodeRoadmap = [
  ['Tuần 1', 'Array, String, HashMap', 'Two Sum, Valid Anagram, Contains Duplicate, Group Anagrams, Product of Array Except Self'],
  ['Tuần 2', 'Two Pointers, Sliding Window, Stack', 'Valid Palindrome, 3Sum, Best Time to Buy/Sell Stock, Longest Substring, Valid Parentheses'],
  ['Tuần 3', 'Binary Search, Linked List, Tree', 'Binary Search, Search Insert Position, Reverse Linked List, Merge Two Lists, Maximum Depth'],
  ['Tuần 4', 'Graph, DP cơ bản, Mock Interview', 'Number of Islands, Clone Graph, Climbing Stairs, House Robber, 2 mock interviews'],
]

const ieltsRoadmap = [
  {
    week: 'Tuần 1',
    focus: 'Foundation for IELTS 6.5',
    target: 'Nắm format đề, test baseline, sửa lỗi phát âm và grammar cơ bản.',
    tasks: [
      ['Listening', 'Daily Dictation: 20-30 phút/ngày, tập nghe số, tên riêng, plural', 'https://dailydictation.com'],
      ['Vocabulary', 'IELTS Dictionary: 15 từ/cụm academic mỗi ngày, ghi ví dụ riêng', 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education'],
      ['Grammar', 'Ôn sentence structure, tense, article, plural, subject-verb agreement', 'https://youpass.vn/luyen-thi/ielts/writing'],
    ],
  },
  {
    week: 'Tuần 2',
    focus: 'Listening + Reading 6.5+',
    target: 'Tăng độ chính xác bằng keyword, paraphrase, skimming, scanning và error log.',
    tasks: [
      ['Listening', 'Làm 1 section/ngày, ghi lỗi spelling, plural, distractor, missed keyword', 'https://dailydictation.com'],
      ['Reading', 'Làm 1 passage/ngày, ưu tiên True/False/Not Given và matching headings', 'https://youpass.vn/luyen-thi/ielts/writing'],
      ['Review', 'Tạo bảng lỗi sai: câu hỏi, keyword, paraphrase, lý do chọn sai', 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education'],
    ],
  },
  {
    week: 'Tuần 3',
    focus: 'Writing 6.0-6.5',
    target: 'Viết Task 1 có overview rõ và Task 2 có lập luận mạch lạc.',
    tasks: [
      ['Task 1', 'Viết 3 bài chart/map/process, luôn có overview và comparison', 'https://youpass.vn/luyen-thi/ielts/writing'],
      ['Task 2', 'Luyện outline, topic sentence, example, explanation cho opinion/discussion', 'https://youpass.vn/luyen-thi/ielts/writing'],
      ['Vocabulary', 'Học collocations theo chủ đề education, environment, health, society', 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education'],
    ],
  },
  {
    week: 'Tuần 4',
    focus: 'Speaking 6.5 + Mock test',
    target: 'Nói tự nhiên, đủ ý, phát âm rõ; làm mini mock và chốt lỗi cần sửa.',
    tasks: [
      ['Speaking', 'Ghi âm Part 1, Part 2, Part 3; tự chấm fluency, vocab, grammar, pronunciation', 'https://dailydictation.com'],
      ['Mock', 'Làm mini mock Listening/Reading + 1 bài Writing, đo thời gian nghiêm túc', 'https://youpass.vn/luyen-thi/ielts/writing'],
      ['Review', 'Tổng hợp lỗi grammar, vocab, pronunciation, listening miss, reading trap', 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education'],
    ],
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

function calculatePrepProgress(section) {
  const tasks = section.days.flatMap((day) => day.tasks)
  const done = tasks.filter((task) => task.done).length
  const total = tasks.length

  return {
    done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  }
}

function loadFptPrepPlan() {
  try {
    const savedPlan = window.localStorage.getItem(fptPrepStorageKey)

    if (!savedPlan) return initialFptPrepPlan

    return JSON.parse(savedPlan)
  } catch {
    return initialFptPrepPlan
  }
}

function getPreviewItems(day) {
  return day.items
    ?.filter((item) => item.id !== 'sleep' && item.id !== 'wake')
    .slice(0, 3) ?? []
}

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [weekPlans, setWeekPlans] = useState(initialWeekPlans)
  const [selectedDayId, setSelectedDayId] = useState(initialWeekPlans[0].id)
  const [fptPrepPlan, setFptPrepPlan] = useState(loadFptPrepPlan)
  const [mathExercises, setMathExercises] = useState(initialMathExercises)
  const [englishInterview, setEnglishInterview] = useState(initialEnglishInterview)
  const [aiInterview, setAiInterview] = useState(initialAiInterview)
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [activePrepSectionId, setActivePrepSectionId] = useState(initialFptPrepPlan[0].id)

  useEffect(() => {
    window.localStorage.setItem(fptPrepStorageKey, JSON.stringify(fptPrepPlan))
  }, [fptPrepPlan])

  const selectedDay = weekPlans.find((day) => day.id === selectedDayId) ?? weekPlans[0]
  const selectedDate = selectedDay.id.split('-').reverse().slice(0, 2).join('/')

  const filteredTasks = useMemo(() => {
    if (activeCategory === 'Tất cả') return tasks
    return tasks.filter((task) => task.category === activeCategory)
  }, [activeCategory, tasks])

  const completedCount = selectedDay.items.filter((task) => task.done).length
  const progress = Math.round((completedCount / selectedDay.items.length) * 100)
  const prepTotals = fptPrepPlan.reduce(
    (summary, section) => {
      const sectionProgress = calculatePrepProgress(section)

      return {
        done: summary.done + sectionProgress.done,
        total: summary.total + sectionProgress.total,
      }
    },
    { done: 0, total: 0 },
  )
  const prepProgress = prepTotals.total === 0
    ? 0
    : Math.round((prepTotals.done / prepTotals.total) * 100)
  const activePrepSection =
    fptPrepPlan.find((section) => section.id === activePrepSectionId) ?? fptPrepPlan[0]
  const activePrepProgress = calculatePrepProgress(activePrepSection)

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

  function toggleEnglishInterview(id) {
    setEnglishInterview((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    )
  }

  function toggleAiInterview(id) {
    setAiInterview((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    )
  }

  function togglePrepTask(sectionId, dayId, taskId) {
    setFptPrepPlan((currentPlan) =>
      currentPlan.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              days: section.days.map((day) =>
                day.id === dayId
                  ? {
                      ...day,
                      tasks: day.tasks.map((task) =>
                        task.id === taskId ? { ...task, done: !task.done } : task,
                      ),
                    }
                  : day,
              ),
            }
          : section,
      ),
    )
  }

  function resetFptPrepPlan() {
    setFptPrepPlan(initialFptPrepPlan)
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

      <section className="fpt-prep-panel">
        <div className="fpt-prep-header">
          <div>
            <span>FPT AI test prep</span>
            <h2>Lộ trình gấp 7 ngày: code, AI math, IELTS 6.5</h2>
          </div>
          <div className="storage-status">
            <b>Local saved</b>
            <small>MongoDB-ready khi có backend API</small>
          </div>
        </div>

        <div className="prep-overview">
          <article>
            <span>Tổng tiến độ</span>
            <strong>{prepProgress}%</strong>
            <div className="progress-track" aria-label={`${prepProgress}% FPT prep completed`}>
              <span style={{ width: `${prepProgress}%` }} />
            </div>
            <p>{prepTotals.done}/{prepTotals.total} đầu việc đã xong</p>
          </article>
          <article>
            <span>Giờ tự học/ngày</span>
            <strong>8h</strong>
            <p>08:00-12:00 coding, 13:30-17:00 AI, 19:30-20:30 IELTS.</p>
          </article>
          <article>
            <span>Kết quả cần đạt</span>
            <strong>IELTS 6.5</strong>
            <p>Listening/Reading vững, Writing/Speaking đủ cấu trúc và ít lỗi cơ bản.</p>
          </article>
        </div>

        <div className="prep-workspace">
          <article className="prep-section">
            <div className="prep-section-title">
              <div>
                <span>{activePrepSection.title}</span>
                <strong>{activePrepProgress.percent}%</strong>
              </div>
              <p>{activePrepSection.target}</p>
              <div className="progress-track" aria-label={`${activePrepSection.title} ${activePrepProgress.percent}% completed`}>
                <span style={{ width: `${activePrepProgress.percent}%` }} />
              </div>
            </div>

            <div className="prep-days">
              {activePrepSection.days.map((day) => {
                const done = day.tasks.filter((task) => task.done).length
                const dayProgress = Math.round((done / day.tasks.length) * 100)

                return (
                  <details className="prep-day" key={day.id}>
                    <summary>
                      <span>
                        <b>{day.day}</b>
                        <small>{day.time}</small>
                      </span>
                      <span>{dayProgress}%</span>
                    </summary>
                    <div className="prep-day-body">
                      <strong>{day.focus}</strong>
                      <p>Học được: {day.learned}</p>
                      <div className="prep-task-list">
                        {day.tasks.map((task) => (
                          <label className={`prep-task ${task.done ? 'done' : ''}`} key={task.id}>
                            <input
                              checked={Boolean(task.done)}
                              onChange={() => togglePrepTask(activePrepSection.id, day.id, task.id)}
                              type="checkbox"
                            />
                            <span className="checkmark" />
                            <span>{task.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          </article>

          <aside className="prep-menu" aria-label="FPT prep menu">
            <span>Mục học</span>
            {fptPrepPlan.map((section) => {
              const sectionProgress = calculatePrepProgress(section)

              return (
                <button
                  className={activePrepSectionId === section.id ? 'active' : ''}
                  key={section.id}
                  onClick={() => setActivePrepSectionId(section.id)}
                  type="button"
                >
                  <b>{section.title}</b>
                  <small>{sectionProgress.done}/{sectionProgress.total} việc</small>
                  <strong>{sectionProgress.percent}%</strong>
                </button>
              )
            })}
          </aside>
        </div>

        <div className="prep-actions">
          <button onClick={resetFptPrepPlan} type="button">Reset tiến độ 7 ngày</button>
          <p>
            Dữ liệu hiện lưu bằng localStorage. Khi thêm backend, gửi payload này lên MongoDB collection
            <code> study_progress </code>
            theo userId và ngày cập nhật.
          </p>
        </div>
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

      <section className="interview-panel">
        <div className="panel-title">
          <div>
            <span>Practice prep</span>
            <h2>IELTS drills và AI answer drill</h2>
          </div>
        </div>

        <div className="interview-grid">
          <div>
            <h3>IELTS 6.5 drills</h3>
            <div className="mini-list">
              {englishInterview.map((item) => (
                <label className={`mini-item ${item.done ? 'done' : ''}`} key={item.id}>
                  <input
                    checked={item.done}
                    onChange={() => toggleEnglishInterview(item.id)}
                    type="checkbox"
                  />
                  <span className="checkmark" />
                  <span>
                    <strong>{item.title}</strong>
                    <p>{item.prompt}</p>
                    <a href={item.link} onClick={(event) => event.stopPropagation()} rel="noreferrer" target="_blank">
                      {item.linkLabel}
                    </a>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3>AI interview</h3>
            <div className="mini-list">
              {aiInterview.map((item) => (
                <label className={`mini-item ${item.done ? 'done' : ''}`} key={item.id}>
                  <input
                    checked={item.done}
                    onChange={() => toggleAiInterview(item.id)}
                    type="checkbox"
                  />
                  <span className="checkmark" />
                  <span>
                    <strong>{item.title}</strong>
                    <p>{item.answer}</p>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ielts-panel">
        <div className="panel-title">
          <div>
            <span>IELTS roadmap</span>
            <h2>Lộ trình 4 tuần hướng tới IELTS 6.5</h2>
          </div>
        </div>

        <div className="ielts-grid">
          {ieltsRoadmap.map((week) => (
            <article className="ielts-card" key={week.week}>
              <span>{week.week}</span>
              <strong>{week.focus}</strong>
              <p>{week.target}</p>
              <div className="ielts-task-list">
                {week.tasks.map(([skill, task, link]) => (
                  <a href={link} key={`${week.week}-${skill}`} rel="noreferrer" target="_blank">
                    <b>{skill}</b>
                    {task}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="leetcode-panel">
        <div className="panel-title">
          <div>
            <span>LeetCode roadmap</span>
            <h2>Lộ trình giải thuật 4 tuần để phỏng vấn</h2>
          </div>
        </div>
        <div className="leetcode-grid">
          {leetcodeRoadmap.map(([week, pattern, problems]) => (
            <article className="leetcode-card" key={week}>
              <span>{week}</span>
              <strong>{pattern}</strong>
              <p>{problems}</p>
              <a href="https://leetcode.com" rel="noreferrer" target="_blank">Open LeetCode</a>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-panel">
        <div className="panel-title">
          <div>
            <span>Portfolio</span>
            <h2>Project nên có trước khi phỏng vấn</h2>
          </div>
        </div>
        <div className="portfolio-grid">
          {portfolioProjects.map(([name, detail]) => (
            <article className="portfolio-card" key={name}>
              <strong>{name}</strong>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="confidence-panel">
        <div className="panel-title">
          <div>
            <span>Confidence dashboard</span>
            <h2>Điểm tự tin trước phỏng vấn</h2>
          </div>
        </div>
        <div className="confidence-grid">
          {confidenceStats.map(([label, value]) => (
            <article className="confidence-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
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
