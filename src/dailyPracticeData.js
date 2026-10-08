export const listeningUrl = 'https://youpass.vn/luyen-thi/ielts/listening?quiz_type=quiz&status=unfinished'
export const readingUrl = 'https://youpass.vn/luyen-thi/ielts/reading?quiz_type=quiz&status=unfinished'
export const readingExampleUrl = 'https://youpass.vn/practice/reading/7544'

const leetcodeWeeks = [
  [
    ['Two Sum', 'two-sum'],
    ['Contains Duplicate', 'contains-duplicate'],
    ['Valid Anagram', 'valid-anagram'],
    ['Group Anagrams', 'group-anagrams'],
    ['Top K Frequent Elements', 'top-k-frequent-elements'],
    ['Product of Array Except Self', 'product-of-array-except-self'],
    ['Valid Palindrome', 'valid-palindrome'],
  ],
  [
    ['Two Sum II', 'two-sum-ii-input-array-is-sorted'],
    ['3Sum', '3sum'],
    ['Container With Most Water', 'container-with-most-water'],
    ['Best Time to Buy and Sell Stock', 'best-time-to-buy-and-sell-stock'],
    ['Longest Substring Without Repeating Characters', 'longest-substring-without-repeating-characters'],
    ['Longest Repeating Character Replacement', 'longest-repeating-character-replacement'],
    ['Minimum Size Subarray Sum', 'minimum-size-subarray-sum'],
  ],
  [
    ['Valid Parentheses', 'valid-parentheses'],
    ['Min Stack', 'min-stack'],
    ['Daily Temperatures', 'daily-temperatures'],
    ['Binary Search', 'binary-search'],
    ['Search in Rotated Sorted Array', 'search-in-rotated-sorted-array'],
    ['Find Minimum in Rotated Sorted Array', 'find-minimum-in-rotated-sorted-array'],
    ['Koko Eating Bananas', 'koko-eating-bananas'],
  ],
  [
    ['Reverse Linked List', 'reverse-linked-list'],
    ['Merge Two Sorted Lists', 'merge-two-sorted-lists'],
    ['Linked List Cycle', 'linked-list-cycle'],
    ['Maximum Depth of Binary Tree', 'maximum-depth-of-binary-tree'],
    ['Invert Binary Tree', 'invert-binary-tree'],
    ['Number of Islands', 'number-of-islands'],
    ['Course Schedule', 'course-schedule'],
  ],
]

const speakingTopics = [
  'Giới thiệu bản thân và ngành bạn đang học.',
  'Mô tả lịch học và làm việc một ngày.',
  'Kể về một môn học bạn thấy khó.',
  'Giải thích một dự án AI bạn từng làm.',
  'Kể về một lần làm việc nhóm hiệu quả.',
  'Nói về một người truyền cảm hứng học tập.',
  'Tóm tắt điều bạn học được trong tuần.',
  'Giải thích một ứng dụng AI cho người không chuyên.',
  'Nói về lợi ích và rủi ro của AI.',
  'Mô tả cách bạn học một kỹ năng mới.',
  'Kể về một lỗi code khó và cách bạn sửa.',
  'So sánh học online và học trên lớp.',
  'Nói về một công nghệ bạn muốn nghiên cứu.',
  'Tóm tắt tiến độ dự án tuần này.',
  'Mô tả một câu hỏi nghiên cứu bạn quan tâm.',
  'Giải thích vì sao cần kiểm tra dữ liệu trước khi huấn luyện.',
  'Nói về cách bạn đánh giá một mô hình AI.',
  'Kể về một thí nghiệm cho kết quả bất ngờ.',
  'Giải thích một biểu đồ hoặc kết quả bằng lời đơn giản.',
  'Nói về một bài báo khoa học bạn đã đọc.',
  'Tóm tắt ý tưởng nghiên cứu trong hai phút.',
  'Giải thích lý do bạn muốn học sau đại học.',
  'Nói về việc học tập ở Hong Kong.',
  'Mô tả một kỹ năng cần cho công việc Quant.',
  'So sánh nghiên cứu học thuật và làm sản phẩm.',
  'Nói về cách bạn xử lý áp lực thời gian.',
  'Giải thích một quyết định kỹ thuật trong dự án.',
  'Tự giới thiệu như trong phỏng vấn nghiên cứu.',
]

export const practiceDays = leetcodeWeeks.flatMap((problems, weekIndex) =>
  problems.map(([problem, slug], dayIndex) => {
    const number = weekIndex * 7 + dayIndex + 1

    return {
      number,
      week: weekIndex + 1,
      problem,
      leetcodeUrl: `https://leetcode.com/problems/${slug}/`,
      speakingTopic: speakingTopics[number - 1],
    }
  }),
)
