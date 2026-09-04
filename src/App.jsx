import { useEffect, useMemo, useState } from 'react'
import './App.css'

const fptPrepStorageKey = 'fpt-ai-test-prep-progress-v5'

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

function buildTaskList(prefix, items) {
  return items.map((title, index) => ({
    id: `${prefix}-${index + 1}`,
    title,
  }))
}

const initialFptPrepPlan = [
  {
    id: 'coding',
    title: 'LeetCode',
    target: 'Lộ trình mở từ Python nền đến mock interview: học pattern, giải bài, review lỗi và lặp lại phần yếu.',
    days: [
      {
        id: 'lc-phase-1',
        day: 'Phase 1',
        time: 'Tuần 1 - 2',
        focus: 'Python + Array/String/HashMap',
        learned: 'Code Python nhanh, biết chọn dict/set/list, phân tích O(n), xử lý edge case.',
        tasks: buildTaskList('lc-p1', [
          'Week 1 Day 1: Python drill 60 phút: list, dict, set, slicing, sort key, Counter, defaultdict',
          'Week 1 Day 2: Array Easy: Two Sum, Contains Duplicate, Best Time to Buy/Sell Stock',
          'Week 1 Day 3: String Easy: Valid Anagram, Valid Palindrome, Longest Common Prefix',
          'Week 1 Day 4: Prefix/Suffix: Product of Array Except Self + review prefix sum idea',
          'Week 1 Day 5: HashMap Medium: Group Anagrams, Top K Frequent Elements',
          'Week 1 Day 6: Timed practice 90 phút: 2 Easy + 1 Medium, ghi lỗi syntax/edge case',
          'Week 1 Day 7: Review lại toàn bộ bài sai, viết template giải thích time/space complexity',
          'Week 2 Day 1-2: Sorting + intervals: Merge Intervals, Insert Interval, Meeting Rooms concept',
          'Week 2 Day 3-4: Matrix basics: Valid Sudoku, Rotate Image hoặc Spiral Matrix',
          'Week 2 Day 5-7: Mixed set 6 bài Array/String/HashMap, mỗi bài phải tự code lại không nhìn lời giải',
        ]),
      },
      {
        id: 'lc-phase-2',
        day: 'Phase 2',
        time: 'Tuần 3 - 4',
        focus: 'Two Pointers + Sliding Window + Stack',
        learned: 'Nhận dạng window, dùng set/map để giữ trạng thái, dùng stack cho validate/monotonic problems.',
        tasks: buildTaskList('lc-p2', [
          'Week 3 Day 1: Two pointers căn bản: Valid Palindrome, Two Sum II',
          'Week 3 Day 2: Two pointers medium: 3Sum, Container With Most Water',
          'Week 3 Day 3: Sliding window fixed/variable: Best Time to Buy/Sell Stock, Longest Substring Without Repeating Characters',
          'Week 3 Day 4: Sliding window nâng cao: Minimum Size Subarray Sum, Permutation in String',
          'Week 3 Day 5: Review window template: expand right, shrink left, update answer',
          'Week 3 Day 6-7: Timed practice 4 bài mixed two pointers/window',
          'Week 4 Day 1: Stack basics: Valid Parentheses, Min Stack',
          'Week 4 Day 2: Expression stack: Evaluate Reverse Polish Notation, Basic Calculator concept',
          'Week 4 Day 3-4: Monotonic stack: Daily Temperatures, Next Greater Element',
          'Week 4 Day 5-7: Mock 2 buổi, mỗi buổi 90 phút: 1 Easy + 2 Medium',
        ]),
      },
      {
        id: 'lc-phase-3',
        day: 'Phase 3',
        time: 'Tuần 5 - 6',
        focus: 'Binary Search + Linked List + Tree',
        learned: 'Viết binary search không kẹt loop, duyệt linked list/tree bằng iterative hoặc recursive.',
        tasks: buildTaskList('lc-p3', [
          'Week 5 Day 1: Binary Search, Search Insert Position, First Bad Version',
          'Week 5 Day 2: Search in Rotated Sorted Array, Find Minimum in Rotated Sorted Array',
          'Week 5 Day 3: Binary search on answer concept: Koko Eating Bananas hoặc Capacity To Ship Packages',
          'Week 5 Day 4-5: Linked List: Reverse Linked List, Merge Two Sorted Lists, Linked List Cycle',
          'Week 5 Day 6-7: Review pointer mistakes, null handling, mid calculation',
          'Week 6 Day 1: Tree DFS: Maximum Depth, Invert Binary Tree, Same Tree',
          'Week 6 Day 2: Tree BFS: Binary Tree Level Order Traversal',
          'Week 6 Day 3-4: BST basics: Validate BST, Lowest Common Ancestor concept',
          'Week 6 Day 5-7: Mock 2 buổi Tree/Binary Search/Linked List',
        ]),
      },
      {
        id: 'lc-phase-4',
        day: 'Phase 4',
        time: 'Tuần 7 - 8',
        focus: 'Heap + Backtracking + Graph basics',
        learned: 'Biết dùng heap cho top-k/priority, backtracking cho tổ hợp, graph BFS/DFS cho connected components.',
        tasks: buildTaskList('lc-p4', [
          'Week 7 Day 1: Heap API Python: heapq, Kth Largest Element, Last Stone Weight',
          'Week 7 Day 2: Top K Frequent Elements bằng heap/bucket, Merge K Sorted Lists concept',
          'Week 7 Day 3-4: Backtracking: Subsets, Permutations, Combination Sum',
          'Week 7 Day 5-7: Viết backtracking template: choose -> explore -> unchoose',
          'Week 8 Day 1: Graph representation: adjacency list, visited set',
          'Week 8 Day 2: DFS/BFS: Number of Islands, Flood Fill',
          'Week 8 Day 3-4: Graph medium: Clone Graph, Course Schedule concept',
          'Week 8 Day 5-7: Mock 2 buổi Heap/Backtracking/Graph',
        ]),
      },
      {
        id: 'lc-phase-5',
        day: 'Phase 5',
        time: 'Tuần 9+',
        focus: 'DP + Interview readiness',
        learned: 'Nhận dạng state/base/transition, giải thích solution sạch và ổn định dưới giới hạn thời gian.',
        tasks: buildTaskList('lc-p5', [
          'Week 9 Day 1: DP 1D: Climbing Stairs, Min Cost Climbing Stairs',
          'Week 9 Day 2: DP choose/skip: House Robber, House Robber II concept',
          'Week 9 Day 3: DP coin/string: Coin Change, Longest Increasing Subsequence',
          'Week 9 Day 4-5: Review DP table/memo, viết recurrence trước khi code',
          'Week 9 Day 6-7: Mock 2 buổi DP + mixed topics',
          'Mỗi tuần sau đó: 3 buổi practice pattern yếu, 1 buổi mock 90 phút, 1 buổi review toàn bộ bài sai',
          'Ready checklist: code chạy first try nhiều hơn, giải thích O(n), biết test edge cases, không panic khi gặp bài lạ',
        ]),
      },
    ],
  },
  {
    id: 'ai-math',
    title: 'AI Math',
    target: 'Lộ trình mở từ toán nền đến ML/DL/GenAI: học công thức vừa đủ, luôn gắn với bài code nhỏ.',
    days: [
      {
        id: 'ai-phase-1',
        day: 'Phase 1',
        time: 'Tuần 1 - 2',
        focus: 'Python for data + Linear Algebra',
        learned: 'Biết biểu diễn dataset thành matrix, hiểu vector/dot product/norm/cosine similarity.',
        tasks: buildTaskList('ai-p1', [
          'Week 1 Day 1: NumPy arrays, shape, axis, broadcasting căn bản',
          'Week 1 Day 2: Pandas read_csv, head, info, describe, missing values',
          'Week 1 Day 3: Vector/matrix, dataset X/y, row là sample, column là feature',
          'Week 1 Day 4: Dot product, norm, cosine similarity; tự tính 3 ví dụ nhỏ',
          'Week 1 Day 5: Matplotlib: line/bar/scatter để nhìn trend và outlier',
          'Week 1 Day 6-7: Mini drill: load dataset -> clean -> plot -> viết 5 nhận xét',
          'Week 2 Day 1-2: Train/test split, data leakage, standardization',
          'Week 2 Day 3-4: Feature engineering cơ bản: encoding, scaling, handling missing values',
          'Week 2 Day 5-7: Làm notebook Iris/Titanic baseline bằng sklearn',
        ]),
      },
      {
        id: 'ai-phase-2',
        day: 'Phase 2',
        time: 'Tuần 3 - 4',
        focus: 'Probability + Statistics + Evaluation',
        learned: 'Hiểu mean/variance/distribution, confusion matrix và cách chọn metric theo mục tiêu sản phẩm.',
        tasks: buildTaskList('ai-p2', [
          'Week 3 Day 1: Mean, median, variance, standard deviation trên dataset nhỏ',
          'Week 3 Day 2: Probability, conditional probability, distribution ở mức ứng dụng',
          'Week 3 Day 3: Correlation vs causation, outlier và sampling bias',
          'Week 3 Day 4-5: Logistic regression intuition: probability, sigmoid, decision threshold',
          'Week 3 Day 6-7: Bài tập threshold tuning: precision/recall tradeoff',
          'Week 4 Day 1: Confusion matrix: TP, FP, FN, TN',
          'Week 4 Day 2: Accuracy, precision, recall, F1; khi nào ưu tiên metric nào',
          'Week 4 Day 3-4: Cross-validation, overfitting/underfitting, bias-variance',
          'Week 4 Day 5-7: Evaluate 2 model sklearn và viết report ngắn',
        ]),
      },
      {
        id: 'ai-phase-3',
        day: 'Phase 3',
        time: 'Tuần 5 - 6',
        focus: 'Classical ML models',
        learned: 'Biết khi dùng regression/classification model, ưu nhược điểm và cách đọc kết quả.',
        tasks: buildTaskList('ai-p3', [
          'Week 5 Day 1: Linear Regression: MSE, residual, feature scaling',
          'Week 5 Day 2: Logistic Regression: sigmoid, classification threshold',
          'Week 5 Day 3: KNN: distance, k value, scaling sensitivity',
          'Week 5 Day 4: Decision Tree: split, depth, overfitting',
          'Week 5 Day 5: Random Forest: ensemble, feature importance',
          'Week 5 Day 6-7: Train 3 model trên cùng dataset, so sánh metrics',
          'Week 6 Day 1-2: SVM/Naive Bayes concept ở mức phỏng vấn fresher',
          'Week 6 Day 3-4: Hyperparameter tuning cơ bản: grid/random search concept',
          'Week 6 Day 5-7: Hoàn thiện mini project sklearn version 1',
        ]),
      },
      {
        id: 'ai-phase-4',
        day: 'Phase 4',
        time: 'Tuần 7 - 8',
        focus: 'Deep Learning fundamentals',
        learned: 'Hiểu neural network, activation, loss, backprop ở mức ý tưởng và đọc được training loop.',
        tasks: buildTaskList('ai-p4', [
          'Week 7 Day 1: Perceptron, input/hidden/output layer, weight, bias',
          'Week 7 Day 2: Activation: ReLU, sigmoid, softmax; chọn theo bài toán',
          'Week 7 Day 3: Loss: MSE vs cross entropy',
          'Week 7 Day 4: Gradient descent, learning rate, optimizer SGD/Adam',
          'Week 7 Day 5-7: Đọc và chạy một training loop PyTorch/TensorFlow đơn giản',
          'Week 8 Day 1-2: CNN: convolution, pooling, flatten, classifier',
          'Week 8 Day 3-4: Data augmentation, train/validation curves, dropout concept',
          'Week 8 Day 5-7: Mini CV demo hoặc notebook classification nhỏ',
        ]),
      },
      {
        id: 'ai-phase-5',
        day: 'Phase 5',
        time: 'Tuần 9+',
        focus: 'GenAI/RAG + AI Engineer readiness',
        learned: 'Hiểu embedding/RAG/prompt/evaluation/cost và trình bày được end-to-end AI feature.',
        tasks: buildTaskList('ai-p5', [
          'Week 9 Day 1: LLM basics: token, context window, temperature, prompt structure',
          'Week 9 Day 2: Embedding: semantic vector, cosine similarity, vector search',
          'Week 9 Day 3: RAG flow: chunk -> embed -> retrieve -> prompt -> generate -> cite source',
          'Week 9 Day 4: RAG evaluation: hit rate, answer faithfulness, hallucination, latency',
          'Week 9 Day 5: Cost estimate: input/output tokens, requests/day, monthly cost',
          'Week 9 Day 6-7: Thiết kế một mini RAG hoặc AI assistant architecture diagram',
          'Mỗi tuần sau đó: 1 model drill, 1 metric drill, 1 GenAI drill, 1 mini project improvement',
          'Ready checklist: giải thích ML pipeline, metrics, overfitting, neural network, CNN, embedding, RAG',
        ]),
      },
    ],
  },
  {
    id: 'english',
    title: 'IELTS 6.5',
    target: 'Lộ trình mở từ 2.5 lên 6.5: English Core -> IELTS Skills -> IELTS Strategy.',
    days: [
      {
        id: 'ielts-phase-1',
        day: 'Phase 1',
        time: 'Tuần 1 - 3',
        focus: '2.5 -> 3.5: Xây nền tiếng Anh',
        learned: 'Không cày full test mỗi ngày; ưu tiên viết câu đúng, collocation, nghe cơ bản và nói câu đơn rõ.',
        tasks: [
          { id: 'p1-grammar-w1', title: 'Week 1 grammar: S/V/O, be/do/have, Present Simple/Continuous, Past Simple, Future, pronouns, articles' },
          { id: 'p1-w1-daily', title: 'Week 1 daily: 20 phút grammar sentence drill, 20 phút collocation, 30 phút listening numbers/names, 20 phút speaking My name/I live/I study' },
          { id: 'p1-grammar-w2', title: 'Week 2 grammar: Present Perfect, Past Perfect, modal verbs, comparatives, prepositions, countable/uncountable nouns, conjunctions' },
          { id: 'p1-w2-daily', title: 'Week 2 daily: viết 8 câu đúng grammar, nghe basic conversation, shadow 5 câu, nói Answer -> Reason' },
          { id: 'p1-grammar-w3', title: 'Week 3 grammar: passive voice, relative clauses, conditionals, gerund/infinitive, complex sentences' },
          { id: 'p1-w3-daily', title: 'Week 3 daily: biến câu đơn thành câu phức, nghe transcript, shadow, nói Answer -> Reason -> Example' },
          { id: 'p1-vocab', title: 'Vocabulary: 20-30 useful words/collocations/day + active recall + đặt câu' },
          { id: 'p1-listen-speak', title: 'Listening 30-40 phút + Speaking 20-30 phút: basic conversations, numbers, dates, names, spelling' },
        ],
      },
      {
        id: 'ielts-phase-2',
        day: 'Phase 2',
        time: 'Tuần 4 - 6',
        focus: '3.5 -> 4.5: Chuyển mạnh sang IELTS',
        learned: 'Bắt đầu học dạng bài IELTS nhưng vẫn ưu tiên accuracy hơn mẹo.',
        tasks: [
          { id: 'p2-listening-types', title: 'Listening: form/note/table completion, multiple choice, matching, map' },
          { id: 'p2-w4-daily', title: 'Week 4 daily: Mon form completion, Tue note completion, Wed table completion, Thu multiple choice, Fri matching, Sat map, Sun review' },
          { id: 'p2-listening-target', title: 'Mục tiêu cuối tuần 6: Listening khoảng 20-23/40' },
          { id: 'p2-reading', title: 'Reading: locating keywords, paraphrase, scanning, skimming, T/F/NG, matching headings, sentence completion' },
          { id: 'p2-w5-daily', title: 'Week 5 daily: Mon locating keyword, Tue paraphrase, Wed scanning, Thu skimming, Fri T/F/NG, Sat matching headings, Sun review' },
          { id: 'p2-writing', title: 'Writing: Task 1 intro/overview/body; Task 2 intro/body/conclusion; accuracy > fancy vocabulary' },
          { id: 'p2-w6-daily', title: 'Week 6 daily: Mon Task 1 intro, Tue overview, Wed Body 1, Thu Body 2, Fri Task 2 intro, Sat Speaking Part 2, Sun full review' },
          { id: 'p2-speaking', title: 'Speaking: Part 1 trả lời 2-3 câu, Part 2 nói liên tục 1-2 phút, không học thuộc sample' },
        ],
      },
      {
        id: 'ielts-phase-3',
        day: 'Phase 3',
        time: 'Tuần 7 - 10',
        focus: '4.5 -> 5.5: Tăng tốc',
        learned: 'Bắt đầu làm đề thường xuyên nhưng mỗi đề phải analyze transcript/error chứ không làm lấy số lượng.',
        tasks: [
          { id: 'p3-listening', title: 'Listening: 3 full tests/week theo flow Test -> Score -> Analyze -> Transcript -> Redo; target 26-29/40' },
          { id: 'p3-reading', title: 'Reading: 3 tests/week, tập trung paraphrase, inference, distractors, T/F/NG, matching headings, multiple choice; target 26-29/40' },
          { id: 'p3-weekly-template', title: 'Weekly template: Mon Listening test, Tue Reading test, Wed Writing Task 2, Thu Listening/Reading review, Fri Speaking, Sat Writing Task 1, Sun error log' },
          { id: 'p3-writing', title: 'Writing: 3 Task 2 + 2 Task 1/tuần; kiểm soát thesis, topic sentence, explanation, example, link' },
          { id: 'p3-speaking', title: 'Speaking 30 phút/ngày: Part 1 -> Part 2 -> Part 3, phát triển opinion -> reason -> example -> consequence -> contrast' },
          { id: 'p3-speaking-target', title: 'Mục tiêu cuối Phase 3: Speaking 5.0-5.5' },
        ],
      },
      {
        id: 'ielts-phase-4',
        day: 'Phase 4',
        time: 'Tuần 11 - 13',
        focus: '5.5 -> 6.0: Band optimization',
        learned: 'Không học lan man; biết chính xác mất điểm ở đâu và drill đúng điểm yếu.',
        tasks: [
          { id: 'p4-diagnose', title: 'Diagnosis: Reading sai T/F/NG thì drill T/F/NG; Writing sai grammar thì drill grammar accuracy; Speaking câu đơn thì drill complex sentence' },
          { id: 'p4-weekly-template', title: 'Weekly template: Mon diagnose score, Tue weakest Listening type, Wed weakest Reading type, Thu Writing grammar rewrite, Fri Speaking complex sentences, Sat mock, Sun review' },
          { id: 'p4-listening', title: 'Listening target: 30-32/40' },
          { id: 'p4-reading', title: 'Reading target: 30-32/40' },
          { id: 'p4-writing', title: 'Writing target 6.0: Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy' },
          { id: 'p4-speaking', title: 'Speaking target 6.0: fluency, pronunciation, grammatical range, lexical resource' },
        ],
      },
      {
        id: 'ielts-phase-5',
        day: 'Phase 5',
        time: 'Tuần 14 - 15',
        focus: '6.0 -> 6.5: Ổn định performance',
        learned: 'Hai tuần cuối ít học kiến thức mới; ưu tiên giữ phong độ và mock ổn định.',
        tasks: [
          { id: 'p5-weekly-load', title: 'Mỗi tuần: 2 full Listening, 2 full Reading, 3 Task 2, 2 Task 1, 3-4 Speaking sessions' },
          { id: 'p5-weekly-template', title: 'Weekly template: Mon full Listening, Tue full Reading, Wed Task 2 + Speaking, Thu full mock, Fri rewrite/review, Sat full mock, Sun light review' },
          { id: 'p5-mock', title: 'Ít nhất 2 full mock tests/week' },
          { id: 'p5-score-target', title: 'Mock ổn định: Listening 7.0, Reading 7.0, Writing 6.0, Speaking 6.0' },
          { id: 'p5-review', title: 'Review lỗi cuối: grammar, vocab, pronunciation, timing, distractors' },
        ],
      },
      {
        id: 'ielts-daily-system',
        day: 'Daily System',
        time: '3 giờ/ngày',
        focus: 'Lịch học lặp lại mỗi ngày',
        learned: 'Nếu bận, vẫn giữ grammar/vocab/shadowing/error log để không mất nền.',
        tasks: [
          { id: 'daily-foundation', title: '60 phút English Foundation: 20 phút vocabulary, 20 phút grammar, 20 phút pronunciation/shadowing' },
          { id: 'daily-lr', title: '45 phút Listening/Reading luân phiên: Mon Listening, Tue Reading, Wed Listening, Thu Reading, Fri Listening, Sat Reading' },
          { id: 'daily-ws', title: '60 phút Writing/Speaking luân phiên: Task 1, Task 2, Speaking, Task 2, Speaking, full review' },
          { id: 'daily-error-log', title: '15 phút Error Log: Error -> Cause -> Correct answer -> Rule -> Similar example' },
        ],
      },
      {
        id: 'ielts-principle',
        day: 'Nguyên tắc',
        time: 'Luôn áp dụng',
        focus: 'English Core trước IELTS tricks',
        learned: 'Từ band 2.5 muốn lên 6.5 phải xây nền tiếng Anh trước rồi mới tối ưu chiến thuật IELTS.',
        tasks: [
          { id: 'core-first', title: 'Luôn đi theo thứ tự: English Core -> IELTS Skills -> IELTS Strategy' },
          { id: 'no-tricks-first', title: 'Không đảo thành IELTS tricks -> cày đề khi grammar/vocab/listening nền còn yếu' },
          { id: 'active-recall', title: 'Vocabulary phải học bằng collocation + đặt câu + active recall' },
          { id: 'sentence-accuracy', title: 'Grammar mục tiêu là viết được câu đúng, rồi mới kéo dài thành complex sentence' },
        ],
      },
    ],
  },
  {
    id: 'project',
    title: 'Thực hành AI',
    target: 'Lộ trình project mở: từ notebook sklearn đến mini AI feature có README, metric và demo.',
    days: [
      {
        id: 'project-phase-1',
        day: 'Phase 1',
        time: 'Tuần 1 - 2',
        focus: 'Data project baseline',
        learned: 'Biết làm một ML pipeline cơ bản từ data đến metric.',
        tasks: buildTaskList('project-p1', [
          'Week 1 Day 1: Chọn project nhỏ: Iris, Titanic, Spam hoặc House Price',
          'Week 1 Day 2: Load dataset, kiểm tra shape, columns, missing values',
          'Week 1 Day 3: EDA: describe, value_counts, groupby, plot 2 biểu đồ',
          'Week 1 Day 4: Preprocess: fill missing, encode categorical, scale numeric nếu cần',
          'Week 1 Day 5: Train baseline Logistic/Linear Regression',
          'Week 1 Day 6: Evaluate accuracy/F1 hoặc MAE/RMSE, ghi nhận lỗi model',
          'Week 1 Day 7: Viết README ngắn: Problem, Dataset, Baseline, Metric',
          'Week 2 Day 1-3: Train thêm KNN/Tree/Random Forest và so sánh',
          'Week 2 Day 4-7: Chốt model tốt nhất, lưu notebook/script sạch',
        ]),
      },
      {
        id: 'project-phase-2',
        day: 'Phase 2',
        time: 'Tuần 3 - 4',
        focus: 'Model improvement + evaluation',
        learned: 'Không chỉ train model, mà biết vì sao metric tăng/giảm.',
        tasks: buildTaskList('project-p2', [
          'Week 3 Day 1: Tạo train/validation/test split rõ ràng',
          'Week 3 Day 2: Thử feature engineering 1-2 biến mới',
          'Week 3 Day 3: Tuning hyperparameter đơn giản',
          'Week 3 Day 4: Tính confusion matrix, precision, recall, F1',
          'Week 3 Day 5: Phân tích false positives/false negatives',
          'Week 3 Day 6-7: Viết evaluation report 1 trang',
          'Week 4 Day 1-3: Làm error analysis và cải thiện preprocessing',
          'Week 4 Day 4-7: Chuẩn bị notebook clean version + requirements',
        ]),
      },
      {
        id: 'project-phase-3',
        day: 'Phase 3',
        time: 'Tuần 5 - 6',
        focus: 'Deep Learning or Computer Vision mini demo',
        learned: 'Có trải nghiệm tensor/training loop/CNN ở mức đủ nói chuyện kỹ thuật.',
        tasks: buildTaskList('project-p3', [
          'Week 5 Day 1: Chọn PyTorch hoặc TensorFlow, chạy tensor basics',
          'Week 5 Day 2: Đọc training loop: forward, loss, backward, optimizer step',
          'Week 5 Day 3-4: Train MLP nhỏ trên tabular/MNIST sample',
          'Week 5 Day 5: Vẽ train/validation curve và nhận xét overfitting',
          'Week 5 Day 6-7: Ghi note epoch, batch size, learning rate, dropout',
          'Week 6 Day 1-3: CNN demo: convolution, pooling, classifier',
          'Week 6 Day 4-7: Chốt kết quả và viết phần limitation/improvement',
        ]),
      },
      {
        id: 'project-phase-4',
        day: 'Phase 4',
        time: 'Tuần 7 - 8',
        focus: 'GenAI/RAG mini feature',
        learned: 'Thiết kế được một AI feature có data flow, cost, latency và evaluation.',
        tasks: buildTaskList('project-p4', [
          'Week 7 Day 1: Viết use case RAG hoặc AI assistant: user, input, output, success metric',
          'Week 7 Day 2: Thiết kế flow: document -> chunk -> embed -> retrieve -> generate',
          'Week 7 Day 3: Tạo sample data nhỏ và mock retrieval bằng cosine similarity',
          'Week 7 Day 4: Viết prompt template và guardrails cơ bản',
          'Week 7 Day 5: Estimate token cost/request và latency risk',
          'Week 7 Day 6-7: Tạo diagram architecture + README',
          'Week 8 Day 1-4: Nếu có API key/backend, làm prototype; nếu chưa, dùng mock data',
          'Week 8 Day 5-7: Viết eval checklist: correct answer, source, hallucination, refusal',
        ]),
      },
      {
        id: 'project-phase-5',
        day: 'Phase 5',
        time: 'Tuần 9+',
        focus: 'Portfolio polish + interview/demo readiness',
        learned: 'Project đủ sạch để mở ra demo, giải thích, và cải thiện tiếp đến khi muốn dừng.',
        tasks: buildTaskList('project-p5', [
          'Week 9 Day 1: Dọn repo: README, requirements, folder structure, sample output',
          'Week 9 Day 2: Viết model card nhỏ: data, metric, limitation, ethical risk',
          'Week 9 Day 3: Tạo demo script 2 phút: problem -> approach -> result -> improvement',
          'Week 9 Day 4: Chuẩn bị 10 câu hỏi có thể bị hỏi về project',
          'Week 9 Day 5: Review code readability, naming, comments cần thiết',
          'Week 9 Day 6-7: Demo thử, ghi lỗi và sửa',
          'Mỗi tuần sau đó: thêm 1 improvement nhỏ, update metric/report, luyện demo lại',
        ]),
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

const leetcodeRoutine = [
  ['15 phút', 'Ôn lại note hôm qua và nói lại pattern bằng lời của mình.'],
  ['70 phút', 'Làm 2 bài mới: brute force trước, tối ưu sau, luôn tính time/space.'],
  ['25 phút', 'Đọc lời giải, ghi lỗi, viết câu chốt nhớ lâu vào sổ tay.'],
  ['10 phút', 'Làm lại nhanh 1 bài cũ hoặc viết pseudo-code không nhìn đáp án.'],
]

const leetcodeNotebookTemplate = [
  'Tên bài + chủ đề',
  'Dấu hiệu nhận diện pattern',
  'Brute force và điểm nghẽn',
  'Ý tưởng tối ưu + độ phức tạp',
  'Lỗi mình mắc và câu chốt nhớ lâu',
]

const leetcodeRoadmap = [
  {
    week: 'Tuần 1',
    pattern: 'Array, String, HashMap',
    target: 'Quen cách biến đề thành cấu trúc dữ liệu, tự viết brute force và tối ưu bằng dict/set/prefix.',
    days: [
      ['Ngày 1', 'Array cơ bản', 'Two Sum, Contains Duplicate, Best Time to Buy and Sell Stock'],
      ['Ngày 2', 'Prefix Sum', 'Running Sum, Range Sum Query Immutable, Subarray Sum Equals K'],
      ['Ngày 3', 'HashMap/HashSet', 'Valid Anagram, Group Anagrams, Top K Frequent Elements'],
      ['Ngày 4', 'String', 'Valid Palindrome, Is Subsequence, Longest Common Prefix'],
      ['Ngày 5', 'Two Pointers', 'Two Sum II, 3Sum, Container With Most Water'],
      ['Ngày 6', 'Sliding Window', 'Best Time to Buy/Sell Stock, Longest Substring Without Repeating Characters, Minimum Size Subarray Sum'],
      ['Ngày 7', 'Review', 'Làm lại 5 bài đã sai hoặc phải xem gợi ý'],
    ],
  },
  {
    week: 'Tuần 2',
    pattern: 'Stack, Queue, Binary Search, Linked List',
    target: 'Nhận diện pattern nhanh hơn, viết pointer/binary search không kẹt loop.',
    days: [
      ['Ngày 8', 'Stack', 'Valid Parentheses, Min Stack, Daily Temperatures'],
      ['Ngày 9', 'Monotonic Stack', 'Next Greater Element I, Daily Temperatures, Largest Rectangle in Histogram nếu còn sức'],
      ['Ngày 10', 'Queue/BFS cơ bản', 'Number of Recent Calls, Moving Average from Data Stream, Binary Tree Level Order Traversal'],
      ['Ngày 11', 'Binary Search', 'Binary Search, Search Insert Position, First Bad Version'],
      ['Ngày 12', 'Binary Search nâng hơn', 'Search in Rotated Sorted Array, Find Minimum in Rotated Sorted Array, Koko Eating Bananas'],
      ['Ngày 13', 'Linked List', 'Reverse Linked List, Merge Two Sorted Lists, Linked List Cycle'],
      ['Ngày 14', 'Review', 'Làm lại bài khó nhất mỗi ngày trong tuần'],
    ],
  },
  {
    week: 'Tuần 3',
    pattern: 'Tree, Graph, Recursion, Backtracking',
    target: 'Luyện tư duy đệ quy, BFS/DFS và duyệt trạng thái có visited/checkpoint rõ ràng.',
    days: [
      ['Ngày 15', 'Tree DFS', 'Maximum Depth of Binary Tree, Same Tree, Invert Binary Tree'],
      ['Ngày 16', 'Tree nâng hơn', 'Diameter of Binary Tree, Balanced Binary Tree, Lowest Common Ancestor'],
      ['Ngày 17', 'BFS trên grid', 'Number of Islands, Max Area of Island, Flood Fill'],
      ['Ngày 18', 'Graph cơ bản', 'Clone Graph, Course Schedule, Graph Valid Tree'],
      ['Ngày 19', 'Recursion', 'Fibonacci, Climbing Stairs, Pow(x, n)'],
      ['Ngày 20', 'Backtracking', 'Subsets, Permutations, Combination Sum'],
      ['Ngày 21', 'Review', 'Chọn 6 bài bất kỳ, nhìn đề và nói hướng giải trước khi code'],
    ],
  },
  {
    week: 'Tuần 4',
    pattern: 'Dynamic Programming, Greedy, Heap, Mock',
    target: 'Biết xác định state/base/transition, luyện giải thích solution như phỏng vấn.',
    days: [
      ['Ngày 22', 'DP 1D', 'Climbing Stairs, House Robber, Min Cost Climbing Stairs'],
      ['Ngày 23', 'DP chuỗi', 'Longest Palindromic Substring, Longest Common Subsequence'],
      ['Ngày 24', 'DP mảng', 'Maximum Subarray, Coin Change, Partition Equal Subset Sum'],
      ['Ngày 25', 'Greedy', 'Jump Game, Gas Station, Merge Intervals'],
      ['Ngày 26', 'Heap/Priority Queue', 'Kth Largest Element in an Array, Last Stone Weight, Merge K Sorted Lists'],
      ['Ngày 27', 'Mixed Practice', 'Làm 4 bài random Easy/Medium, không xem tag trong 15 phút đầu'],
      ['Ngày 28', 'Mock Interview', '2 bài Medium, timer 45 phút/bài'],
      ['Ngày 29', 'Redo sai', 'Làm lại toàn bộ bài sai, không đọc lời giải cũ ngay'],
      ['Ngày 30', 'Tổng kết pattern', 'Chia sổ tay theo HashMap, Two Pointers, Sliding Window, Stack, Binary Search, Tree, Graph, Backtracking, DP, Greedy, Heap'],
    ],
  },
]

const ieltsRoadmap = [
  {
    week: 'Phase 1',
    focus: 'Tuần 1-3: 2.5 -> 3.5',
    target: 'Xây English Core: grammar nền, collocation, listening everyday, speaking câu đơn kéo dài.',
    tasks: [
      ['Grammar', 'Viết câu đúng: S/V/O, tense cơ bản, articles, pronouns, complex sentences', 'https://youpass.vn/luyen-thi/ielts/writing'],
      ['Vocabulary', '20-30 collocations/day: play a role, have an impact, pose a threat, address an issue', 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education'],
      ['Listening/Speaking', '30-40 phút nghe + 20-30 phút nói câu cơ bản theo Answer -> Reason -> Example', 'https://dailydictation.com'],
    ],
  },
  {
    week: 'Phase 2',
    focus: 'Tuần 4-6: 3.5 -> 4.5',
    target: 'Chuyển mạnh sang IELTS: học dạng bài, keyword, paraphrase, Task 1/2 structure.',
    tasks: [
      ['Listening', 'Form/note/table completion, multiple choice, matching, map; target cuối phase 20-23/40', 'https://dailydictation.com'],
      ['Reading', 'Locating keywords, paraphrase, scanning, skimming, T/F/NG, matching headings', 'https://youpass.vn/luyen-thi/ielts/writing'],
      ['Writing/Speaking', 'Task 1 intro/overview/body; Task 2 intro/body/conclusion; Part 1 và Part 2 cơ bản', 'https://youpass.vn/luyen-thi/ielts/writing'],
    ],
  },
  {
    week: 'Phase 3',
    focus: 'Tuần 7-10: 4.5 -> 5.5',
    target: 'Tăng tốc bằng đề thường xuyên, nhưng mỗi đề phải score, analyze, redo.',
    tasks: [
      ['Listening/Reading', '3 full tests/week mỗi kỹ năng; target 26-29/40', 'https://dailydictation.com'],
      ['Writing', '3 Task 2 + 2 Task 1/tuần, body theo Claim -> Why -> How -> Example -> Result', 'https://youpass.vn/luyen-thi/ielts/writing'],
      ['Speaking', '30 phút/ngày: Part 1 -> Part 2 -> Part 3; target Speaking 5.0-5.5', 'https://dailydictation.com'],
    ],
  },
  {
    week: 'Phase 4',
    focus: 'Tuần 11-13: 5.5 -> 6.0',
    target: 'Band optimization: biết mất điểm ở đâu rồi drill đúng lỗi đó.',
    tasks: [
      ['L/R', 'Listening và Reading target 30-32/40, tập trung dạng sai nhiều nhất', 'https://dailydictation.com'],
      ['Writing', 'Target 6.0 theo 4 tiêu chí: TR, CC, LR, GRA', 'https://youpass.vn/luyen-thi/ielts/writing'],
      ['Speaking', 'Target 6.0: fluency, pronunciation, grammatical range, lexical resource', 'https://dailydictation.com'],
    ],
  },
  {
    week: 'Phase 5',
    focus: 'Tuần 14-15: 6.0 -> 6.5',
    target: 'Ổn định performance, ít học kiến thức mới, mock đều để giữ band.',
    tasks: [
      ['Weekly Load', '2 full Listening, 2 full Reading, 3 Task 2, 2 Task 1, 3-4 Speaking sessions', 'https://dailydictation.com'],
      ['Mock', 'Ít nhất 2 full mock tests/week', 'https://youpass.vn/luyen-thi/ielts/writing'],
      ['Target', 'Mock ổn định khoảng L 7.0, R 7.0, W 6.0, S 6.0 để overall 6.5 thực tế', 'https://theieltsdictionary.com/practice/writing/dich-cau/buoc2-education'],
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
            <h2>Tiến độ học linh hoạt: code, AI math, IELTS 6.5</h2>
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
            <span>Giờ tự học gợi ý</span>
            <strong>8h/ngày</strong>
            <p>Có thể học ít hơn hoặc nhiều hơn, tiến độ vẫn giữ cho đến khi bạn reset.</p>
          </article>
          <article>
            <span>Cách theo dõi</span>
            <strong>Không giới hạn</strong>
            <p>Hoàn thành từng chặng, lặp lại phần yếu, dừng khi bạn thấy đủ sẵn sàng.</p>
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
          <button onClick={resetFptPrepPlan} type="button">Reset tiến độ học</button>
          <p>
            Dữ liệu hiện lưu bằng localStorage. Khi thêm backend, gửi payload này lên MongoDB collection
            <code> study_progress </code>
            theo userId, ngày cập nhật và trạng thái từng chặng.
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
            <h2>Lộ trình 30 ngày để tăng khả năng tự giải</h2>
          </div>
        </div>
        <div className="leetcode-method">
          <article>
            <span>Routine mỗi ngày</span>
            {leetcodeRoutine.map(([time, task]) => (
              <p key={time}><b>{time}</b>{task}</p>
            ))}
          </article>
          <article>
            <span>Sổ tay mỗi bài</span>
            {leetcodeNotebookTemplate.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </article>
          <article>
            <span>Khi bí</span>
            <p><b>20 phút</b>Tự nghĩ brute force, ví dụ nhỏ và edge case.</p>
            <p><b>10 phút</b>Xem hint nhẹ, không đọc full code ngay.</p>
            <p><b>30 phút</b>Tự code lại và ghi vì sao mình chưa nghĩ ra.</p>
          </article>
        </div>
        <div className="leetcode-grid">
          {leetcodeRoadmap.map((week) => (
            <article className="leetcode-card" key={week.week}>
              <span>{week.week}</span>
              <strong>{week.pattern}</strong>
              <p>{week.target}</p>
              <div className="leetcode-day-list">
                {week.days.map(([day, focus, problems]) => (
                  <div className="leetcode-day" key={`${week.week}-${day}`}>
                    <b>{day}</b>
                    <span>{focus}</span>
                    <p>{problems}</p>
                  </div>
                ))}
              </div>
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
