import { useEffect, useMemo, useState } from 'react'
import './App.css'

const progressKey = 'study-roadmap-progress-v1'
const scheduleProgressKey = 'daily-schedule-progress-v1'

const weeklySchedule = [
  {
    day: 'Thứ 2',
    type: 'Work + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:00', 'Ôn note LeetCode hoặc English nhẹ', 'Study'],
      ['08:00 - 17:00', 'Làm việc cố định', 'Work'],
      ['17:30 - 18:20', 'Ăn tối, nghỉ mắt, reset trước buổi học', 'Routine'],
      ['18:30 - 19:30', 'LeetCode: 1 bài mới hoặc redo bài sai', 'LeetCode'],
      ['20:00 - 22:10', 'Trade cố định, ngồi theo plan và ghi journal sau lệnh', 'Trading'],
      ['22:20 - 23:10', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['23:10 - 00:00', 'Đồ án: chốt 1 task nhỏ hoặc ghi tiến độ', 'Project'],
      ['00:00 - 00:20', 'Review nhanh và chuẩn bị task ngày mai', 'Review'],
    ],
  },
  {
    day: 'Thứ 3',
    type: 'English + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:00', 'AI Math drill: 1 công thức + 2 ví dụ số', 'AI Math'],
      ['09:00 - 11:00', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['14:00 - 16:00', 'Đồ án: code/report/demo một phần rõ ràng', 'Project'],
      ['18:00 - 19:30', 'Học tiếng Anh cố định', 'English'],
      ['20:00 - 22:10', 'Trade cố định, ưu tiên kỷ luật entry/exit', 'Trading'],
      ['22:20 - 23:20', 'LeetCode pattern review hoặc redo bài sai', 'LeetCode'],
      ['23:20 - 00:15', 'Ghi lỗi học tập và lỗi trading trong ngày', 'Review'],
    ],
  },
  {
    day: 'Thứ 4',
    type: 'School day',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'Làm bài tập hoặc ôn bài trước khi tới trường', 'School'],
      ['08:50 - 09:20', 'Di chuyển tới trường', 'Travel'],
      ['09:30 - 12:00', 'Học tại trường', 'School'],
      ['12:00 - 12:30', 'Di chuyển về hoặc tới điểm tiếp theo', 'Travel'],
      ['14:00 - 15:30', 'Đồ án: hoàn thành 1 việc có thể demo/commit', 'Project'],
      ['16:00 - 17:00', 'AI Math hoặc học lại bài trên trường', 'AI Math'],
      ['18:30 - 19:30', 'LeetCode redo: làm lại bài sai, không xem lời giải', 'LeetCode'],
      ['20:00 - 22:10', 'Trade cố định', 'Trading'],
      ['22:20 - 23:20', 'English Listening/Reading nhẹ', 'English'],
      ['23:20 - 00:15', 'Review ngắn, không học nặng sau trade', 'Review'],
    ],
  },
  {
    day: 'Thứ 5',
    type: 'Work + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:00', 'AI Math flashcard: metric/loss/threshold', 'AI Math'],
      ['08:00 - 17:00', 'Làm việc cố định', 'Work'],
      ['17:30 - 18:20', 'Ăn tối, nghỉ mắt, reset trước buổi học', 'Routine'],
      ['18:30 - 19:30', 'LeetCode: 1 bài Medium theo roadmap', 'LeetCode'],
      ['20:00 - 22:10', 'Trade cố định', 'Trading'],
      ['22:20 - 23:10', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['23:10 - 00:00', 'Đồ án: sửa 1 bug nhỏ hoặc viết report', 'Project'],
      ['00:00 - 00:20', 'Tổng kết bài LeetCode và trade journal', 'Review'],
    ],
  },
  {
    day: 'Thứ 6',
    type: 'Work half-day + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:00', 'Ôn lại notebook AI Math trong tuần', 'AI Math'],
      ['08:00 - 12:00', 'Làm việc cố định', 'Work'],
      ['14:00 - 15:30', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['16:00 - 17:30', 'Đồ án: code/report phần quan trọng nhất tuần', 'Project'],
      ['18:20 - 19:30', 'LeetCode timed practice trước giờ trade', 'LeetCode'],
      ['20:00 - 22:10', 'Trade cố định, cuối phiên chốt weekly journal', 'Trading'],
      ['22:20 - 23:00', 'Speaking Part 1 hoặc shadowing nhẹ', 'English'],
      ['23:00 - 00:15', 'Chọn 3 việc quan trọng cho cuối tuần', 'Review'],
    ],
  },
  {
    day: 'Thứ 7',
    type: 'School day',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:30 - 07:30', 'Ôn bài trước khi tới trường', 'School'],
      ['08:50 - 09:20', 'Di chuyển tới trường', 'Travel'],
      ['09:30 - 12:00', 'Học tại trường', 'School'],
      ['12:00 - 12:30', 'Di chuyển về hoặc nghỉ trưa', 'Travel'],
      ['14:00 - 15:30', 'Làm bài tập trên trường', 'School'],
      ['15:45 - 17:30', 'Đồ án: deep work không bị cắt bởi trade', 'Project'],
      ['19:30 - 21:00', 'AI Math hoặc project notebook sâu hơn', 'AI Math'],
      ['21:15 - 22:30', 'Weekly LeetCode review: redo bài sai và cập nhật sổ tay', 'LeetCode'],
      ['23:00 - 00:00', 'English Writing/Speaking nhẹ', 'English'],
    ],
  },
  {
    day: 'Chủ nhật',
    type: 'English + planning',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['09:00 - 10:30', 'Mock LeetCode hoặc review 1 pattern yếu nhất', 'LeetCode'],
      ['10:45 - 12:00', 'AI Math recap: viết lại công thức và ví dụ số', 'AI Math'],
      ['13:30 - 14:45', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['15:00 - 16:30', 'Học tiếng Anh cố định', 'English'],
      ['17:00 - 18:30', 'Đồ án: tổng hợp tiến độ, chuẩn bị phần tuần tới', 'Project'],
      ['20:00 - 21:00', 'Plan tuần mới theo 3 roadmap', 'Planning'],
      ['21:00 - 22:00', 'Chuẩn bị sổ tay, bài cần redo và checklist tuần tới', 'Review'],
      ['22:00 - 23:00', 'English hoặc đọc lại bài trường nhẹ', 'English'],
    ],
  },
]

const fixedCommitments = [
  ['Ngủ và dậy', 'Đi ngủ 00:30, dậy 05:30 mỗi ngày để giữ nhịp ổn định.'],
  ['Làm việc', 'Thứ 2 và thứ 5 làm 08:00 - 17:00; thứ 6 làm 08:00 - 12:00.'],
  ['Học tại trường', 'Thứ 4 và thứ 7, 09:30 - 12:00, cộng 30 phút di chuyển mỗi chiều.'],
  ['Tiếng Anh', 'Thứ 3 học 18:00 - 19:30; Chủ nhật học 15:00 - 16:30.'],
  ['Trade', 'Thứ 2 tới thứ 6, 20:00 - 22:10 là block cố định.'],
  ['Đồ án', 'Có slot đồ án riêng vào thứ 2, 3, 4, 5, 6, 7 và Chủ nhật để không bị trôi tiến độ.'],
]

const englishSkillMethods = [
  {
    skill: 'Listening',
    goal: 'Nghe để bắt keyword, paraphrase và distractor, không chỉ nghe lấy đáp án.',
    steps: [
      'Làm 1 section có timer, khoanh câu không chắc.',
      'Chấm điểm rồi nghe lại từng câu sai với transcript.',
      'Ghi cụm paraphrase: price -> cost, student -> learner, cancel -> call off.',
      'Nghe lại lần 2 không nhìn transcript, chỉ dừng ở đoạn sai.',
    ],
  },
  {
    skill: 'Reading',
    goal: 'Tìm thông tin nhanh và nhận ra paraphrase giữa câu hỏi và bài đọc.',
    steps: [
      'Đọc câu hỏi trước, gạch keyword chính và loại thông tin cần tìm.',
      'Scan tên riêng, số, danh từ cụ thể trước khi đọc kỹ.',
      'Với T/F/NG, hỏi: bài có nói đúng ý này không hay chỉ liên quan?',
      'Sau khi sai, ghi lý do: sai keyword, bị distractor, hiểu nhầm phủ định.',
    ],
  },
  {
    skill: 'Writing Task 1',
    goal: 'Viết rõ overview, so sánh đúng số liệu, không kể từng chi tiết rời rạc.',
    steps: [
      'Nhìn biểu đồ 2 phút: trend chính, cao nhất, thấp nhất, thay đổi lớn.',
      'Viết intro bằng paraphrase đề.',
      'Overview có 2 ý lớn, không cần số liệu chi tiết.',
      'Body chia nhóm thông minh: tăng/giảm, cao/thấp, nhóm giống nhau.',
    ],
  },
  {
    skill: 'Writing Task 2',
    goal: 'Bài có thesis rõ, mỗi đoạn một ý chính, giải thích đủ sâu.',
    steps: [
      'Dành 5 phút lập dàn ý: position, 2 main ideas, example.',
      'Mỗi body theo Claim -> Why -> Example -> Result.',
      'Không dùng từ quá khó nếu làm câu sai grammar.',
      'Sau khi viết, rewrite 5 câu yếu nhất cho ngắn và đúng hơn.',
    ],
  },
  {
    skill: 'Speaking',
    goal: 'Nói tự nhiên, có phát triển ý, không học thuộc sample cứng.',
    steps: [
      'Part 1: Answer -> Reason -> Example trong 2-3 câu.',
      'Part 2: chuẩn bị story theo Past -> Detail -> Feeling -> Lesson.',
      'Part 3: Opinion -> Reason -> Contrast -> Consequence.',
      'Ghi âm 2 phút, nghe lại và sửa pronunciation, pause, grammar lỗi lặp.',
    ],
  },
  {
    skill: 'Vocabulary',
    goal: 'Học cụm dùng được trong nói/viết, không học list từ đơn lẻ.',
    steps: [
      'Mỗi ngày 10-15 collocations theo chủ đề.',
      'Mỗi cụm đặt 1 câu thật liên quan tới bản thân hoặc bài IELTS.',
      'Ôn active recall: che nghĩa, tự nhớ lại cụm và ví dụ.',
      'Gắn nhãn dùng cho Speaking, Writing Task 1 hoặc Writing Task 2.',
    ],
  },
  {
    skill: 'Grammar',
    goal: 'Tăng độ chính xác câu trước, rồi mới tăng độ dài và độ phức tạp.',
    steps: [
      'Mỗi ngày chọn 1 lỗi chính: tense, article, plural, preposition, clause.',
      'Viết 8 câu ngắn đúng 100% trước khi viết câu dài.',
      'Rewrite câu sai từ bài writing/speaking log.',
      'Cuối tuần tổng hợp 5 lỗi lặp nhiều nhất để drill lại.',
    ],
  },
]

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

function loadScheduleProgress() {
  try {
    return JSON.parse(window.localStorage.getItem(scheduleProgressKey)) ?? {}
  } catch {
    return {}
  }
}

function makeScheduleTaskId(day, time, title) {
  return `${day}-${time}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function App() {
  const [activeTrackId, setActiveTrackId] = useState(() => {
    const route = window.location.hash.replace('#', '')

    if (route === 'schedule') return route

    return tracks.some((track) => track.id === route) ? route : 'overview'
  })
  const [progress, setProgress] = useState(loadProgress)
  const [scheduleProgress, setScheduleProgress] = useState(loadScheduleProgress)

  useEffect(() => {
    function syncRoute() {
      const route = window.location.hash.replace('#', '')
      if (route === 'schedule') {
        setActiveTrackId(route)

        return
      }

      setActiveTrackId(tracks.some((track) => track.id === route) ? route : 'overview')
    }

    window.addEventListener('hashchange', syncRoute)

    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(progressKey, JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    window.localStorage.setItem(scheduleProgressKey, JSON.stringify(scheduleProgress))
  }, [scheduleProgress])

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
  const isSchedulePage = activeTrackId === 'schedule'

  function toggleTask(id) {
    setProgress((current) => ({
      ...current,
      [id]: !current[id],
    }))
  }

  function toggleScheduleTask(id) {
    setScheduleProgress((current) => ({
      ...current,
      [id]: !current[id],
    }))
  }

  function resetScheduleDay(day) {
    const dayTaskIds = new Set(
      day.blocks.map(([time, title]) => makeScheduleTaskId(day.day, time, title)),
    )

    setScheduleProgress((current) =>
      Object.fromEntries(Object.entries(current).filter(([key]) => !dayTaskIds.has(key))),
    )
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
          <button
            className={isSchedulePage ? 'active' : ''}
            onClick={() => navigate('schedule')}
            style={{ '--accent': '#7c3aed' }}
            type="button"
          >
            Lịch ngày
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
        {isSchedulePage ? (
          <SchedulePage
            onResetDay={resetScheduleDay}
            onToggleTask={toggleScheduleTask}
            progress={scheduleProgress}
          />
        ) : activeTrack ? (
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
        <article className="overview-card schedule-overview-card">
          <span>Lịch cố định</span>
          <h3>Lịch ngày</h3>
          <p>
            Tách rõ giờ học trường, 30 phút di chuyển, trade tối thứ 2-6 và các slot còn lại cho
            LeetCode, AI Math, English.
          </p>
          <div className="commitment-preview">
            {fixedCommitments.map(([label, value]) => (
              <small key={label}><b>{label}</b>{value}</small>
            ))}
          </div>
          <div className="card-footer">
            <small>7 ngày/tuần</small>
            <button onClick={() => onOpenTrack('schedule')} type="button">Mở lịch</button>
          </div>
        </article>
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

function SchedulePage({ progress, onToggleTask, onResetDay }) {
  const allScheduleTasks = weeklySchedule.flatMap((day) =>
    day.blocks.map(([time, title]) => makeScheduleTaskId(day.day, time, title)),
  )
  const doneCount = allScheduleTasks.filter((id) => progress[id]).length
  const totalCount = allScheduleTasks.length
  const percent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100)

  return (
    <>
      <section className="track-header schedule-header" style={{ '--accent': '#7c3aed' }}>
        <div>
          <span>Daily schedule</span>
          <h2>Lịch trình hàng ngày theo các block cố định</h2>
          <p>
            Lịch này giữ cứng giờ học tại trường và trading, phần còn lại được chia thành slot học
            vừa sức cho LeetCode, AI Math và English.
          </p>
        </div>
        <div className="track-progress">
          <strong>{percent}%</strong>
          <span>{doneCount}/{totalCount} việc trong tuần đã tick</span>
          <div className="progress-line" aria-label="Fixed commitments planned">
            <span style={{ width: `${percent}%`, background: '#7c3aed' }} />
          </div>
        </div>
      </section>

      <section className="fixed-grid">
        {fixedCommitments.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <p>{value}</p>
          </article>
        ))}
      </section>

      <section className="schedule-grid">
        {weeklySchedule.map((day) => {
          const taskIds = day.blocks.map(([time, title]) => makeScheduleTaskId(day.day, time, title))
          const dayDone = taskIds.filter((id) => progress[id]).length
          const dayPercent = Math.round((dayDone / day.blocks.length) * 100)

          return (
            <article className="schedule-day" key={day.day}>
              <div className="schedule-day-title">
                <div>
                  <span>{day.type}</span>
                  <h3>{day.day}</h3>
                </div>
                <div className="day-progress">
                  <b>{dayPercent}%</b>
                  <small>{dayDone}/{day.blocks.length}</small>
                  <button onClick={() => onResetDay(day)} type="button">Reset</button>
                </div>
              </div>
              <div className="schedule-blocks">
                {day.blocks.map(([time, title, category]) => {
                  const taskId = makeScheduleTaskId(day.day, time, title)

                  return (
                    <label
                      className={`schedule-block ${progress[taskId] ? 'done' : ''}`}
                      data-category={category}
                      key={taskId}
                    >
                      <input
                        checked={Boolean(progress[taskId])}
                        onChange={() => onToggleTask(taskId)}
                        type="checkbox"
                      />
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

      {track.id === 'english' && (
        <section className="skill-method-panel">
          <div className="method-heading">
            <span>Cách học từng kỹ năng</span>
            <h3>Học English theo quy trình để biết mình đang sửa lỗi gì</h3>
          </div>

          <div className="skill-method-grid">
            {englishSkillMethods.map((method) => (
              <article className="skill-method-card" key={method.skill}>
                <span>{method.skill}</span>
                <p>{method.goal}</p>
                <ol>
                  {method.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>
      )}

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
