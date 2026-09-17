import { useEffect, useMemo, useState } from 'react'
import './App.css'
import EnglishLab from './EnglishLab'

const progressKey = 'study-roadmap-progress-v1'
const scheduleProgressKey = 'daily-schedule-progress-v1'
const exhibitFlowProgressKey = 'exhibitflow-team-progress-v1'
const ownerName = 'Khang'

const weeklySchedule = [
  {
    day: 'Thứ 2',
    type: 'Work + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'English: học 1 cặp thì + viết/nói + dictation', 'English'],
      ['08:00 - 17:00', 'Làm việc cố định', 'Work'],
      ['17:30 - 18:20', 'Ăn tối, nghỉ mắt, reset trước buổi học', 'Routine'],
      ['18:30 - 19:30', 'Làm bài tập trường hoặc chốt 1 task đồ án nhỏ', 'School'],
      ['20:00 - 22:10', 'Trade cố định, ngồi theo plan và ghi journal sau lệnh', 'Trading'],
      ['22:20 - 22:30', 'Reset sau trade, mở sẵn bài LeetCode', 'Review'],
      ['22:30 - 23:30', 'LeetCode cố định: 1 bài theo chủ đề ngày', 'LeetCode'],
      ['23:30 - 00:20', 'Ghi pattern notebook, chuẩn bị bài English sáng mai', 'Review'],
    ],
  },
  {
    day: 'Thứ 3',
    type: 'Work + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'English: ôn từ vựng cách quãng + shadowing + speaking', 'English'],
      ['09:00 - 11:00', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['14:00 - 16:00', 'Đồ án: code/report/demo một phần rõ ràng', 'Project'],
      ['18:00 - 19:30', 'AI Math hoặc đồ án: hoàn thành 1 phần rõ ràng', 'AI Math'],
      ['20:00 - 22:10', 'Trade cố định, ưu tiên kỷ luật entry/exit', 'Trading'],
      ['22:20 - 22:30', 'Reset sau trade, mở sẵn bài LeetCode', 'Review'],
      ['22:30 - 23:30', 'LeetCode cố định: Two Pointers / Prefix Sum', 'LeetCode'],
      ['23:30 - 00:15', 'Ghi lỗi học tập và lỗi trading trong ngày', 'Review'],
    ],
  },
  {
    day: 'Thứ 4',
    type: 'School day',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'English: phân biệt 2 thì dễ nhầm + nghe chép chính tả', 'English'],
      ['08:50 - 09:20', 'Di chuyển tới trường', 'Travel'],
      ['09:30 - 12:00', 'Học tại trường', 'School'],
      ['12:00 - 12:30', 'Di chuyển về hoặc tới điểm tiếp theo', 'Travel'],
      ['14:00 - 15:30', 'Đồ án: hoàn thành 1 việc có thể demo/commit', 'Project'],
      ['16:00 - 17:00', 'AI Math hoặc học lại bài trên trường', 'AI Math'],
      ['18:30 - 19:30', 'Làm bài tập trường hoặc review AI Math nhẹ', 'School'],
      ['20:00 - 22:10', 'Trade cố định', 'Trading'],
      ['22:20 - 22:30', 'Reset sau trade, mở sẵn bài LeetCode', 'Review'],
      ['22:30 - 23:30', 'LeetCode cố định: Sliding Window', 'LeetCode'],
      ['23:30 - 00:15', 'Review ngắn, không học nặng sau trade', 'Review'],
    ],
  },
  {
    day: 'Thứ 5',
    type: 'Work + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'English: từ vựng theo cụm + nghe 4 bước', 'English'],
      ['08:00 - 17:00', 'Làm việc cố định', 'Work'],
      ['17:30 - 18:20', 'Ăn tối, nghỉ mắt, reset trước buổi học', 'Routine'],
      ['18:30 - 19:30', 'Làm bài tập trường hoặc chốt 1 task đồ án nhỏ', 'School'],
      ['20:00 - 22:10', 'Trade cố định', 'Trading'],
      ['22:20 - 22:30', 'Reset sau trade, mở sẵn bài LeetCode', 'Review'],
      ['22:30 - 23:30', 'LeetCode cố định: Stack / Monotonic Stack', 'LeetCode'],
      ['23:30 - 00:20', 'Tổng kết bài LeetCode và trade journal', 'Review'],
    ],
  },
  {
    day: 'Thứ 6',
    type: 'Work half-day + trade',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'English: ghi âm dùng thì trong câu chuyện cá nhân', 'English'],
      ['08:00 - 12:00', 'Làm việc cố định', 'Work'],
      ['14:00 - 15:30', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['16:00 - 17:30', 'Đồ án: code/report phần quan trọng nhất tuần', 'Project'],
      ['17:30 - 18:00', 'Báo cáo tiến độ với giáo viên hướng dẫn', 'Advisor'],
      ['18:00 - 18:15', 'Ghi lại feedback và việc cần sửa sau buổi báo cáo', 'Review'],
      ['18:20 - 19:30', 'Làm bài tập trường hoặc xử lý việc đồ án còn dang dở', 'School'],
      ['20:00 - 22:10', 'Trade cố định, cuối phiên chốt weekly journal', 'Trading'],
      ['22:20 - 22:30', 'Reset sau trade, mở sẵn bài LeetCode', 'Review'],
      ['22:30 - 23:30', 'LeetCode cố định: Binary Search / Linked List', 'LeetCode'],
      ['23:30 - 00:15', 'Chọn 3 việc quan trọng cho cuối tuần', 'Review'],
    ],
  },
  {
    day: 'Thứ 7',
    type: 'School day',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'English: viết đoạn ngắn dùng 2-4 thì + nghe tóm tắt', 'English'],
      ['08:50 - 09:20', 'Di chuyển tới trường', 'Travel'],
      ['09:30 - 12:00', 'Học tại trường', 'School'],
      ['12:00 - 12:30', 'Di chuyển về hoặc nghỉ trưa', 'Travel'],
      ['14:00 - 15:30', 'Làm bài tập trên trường', 'School'],
      ['15:45 - 17:30', 'Đồ án: deep work không bị cắt bởi trade', 'Project'],
      ['19:30 - 21:00', 'AI Math hoặc project notebook sâu hơn', 'AI Math'],
      ['21:15 - 22:15', 'Chuẩn bị bài trường hoặc nghỉ sau ngày học dài', 'School'],
      ['22:30 - 23:30', 'LeetCode cố định: Tree / Graph', 'LeetCode'],
      ['23:30 - 00:00', 'Ghi pattern notebook và chuẩn bị bài English sáng Chủ nhật', 'Review'],
    ],
  },
  {
    day: 'Chủ nhật',
    type: 'Planning + review',
    blocks: [
      ['00:30 - 05:30', 'Ngủ cố định', 'Sleep'],
      ['05:30 - 06:00', 'Thức dậy, vệ sinh, uống nước, chuẩn bị ngày', 'Routine'],
      ['06:00 - 07:30', 'English: kiểm tra 12 thì + review từ/nghe + nói 3 phút', 'English'],
      ['09:00 - 10:00', 'Đồ án hoặc bài tập trường ưu tiên cao', 'School'],
      ['10:00 - 10:30', 'Cập nhật pattern notebook và chọn bài cho tuần mới', 'Review'],
      ['10:45 - 12:00', 'AI Math recap: viết lại công thức và ví dụ số', 'AI Math'],
      ['13:30 - 14:45', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['15:00 - 16:30', 'Đồ án hoặc bài tập trường: hoàn thành việc ưu tiên tuần mới', 'Project'],
      ['17:00 - 18:30', 'Đồ án: tổng hợp tiến độ, chuẩn bị phần tuần tới', 'Project'],
      ['20:00 - 21:00', 'Plan tuần mới theo 3 roadmap', 'Planning'],
      ['21:00 - 22:00', 'Chuẩn bị sổ tay, bài cần redo và checklist tuần tới', 'Review'],
      ['22:00 - 22:30', 'Chuẩn bị sổ tay và bài LeetCode redo', 'Review'],
      ['22:30 - 23:30', 'LeetCode cố định: redo bài sai + pattern yếu nhất', 'LeetCode'],
    ],
  },
]

const fixedCommitments = [
  ['Ngủ và dậy', 'Đi ngủ 00:30, dậy 05:30 mỗi ngày để giữ nhịp ổn định.'],
  ['Làm việc', 'Thứ 2 và thứ 5 làm 08:00 - 17:00; thứ 6 làm 08:00 - 12:00.'],
  ['Học tại trường', 'Thứ 4 và thứ 7, 09:30 - 12:00, cộng 30 phút di chuyển mỗi chiều.'],
  ['Tiếng Anh', 'Cố định 06:00 - 07:30 mỗi ngày. Nội dung và bài nghe cụ thể nằm trong trang English.'],
  ['LeetCode', 'Cố định 22:30 - 23:30 mỗi ngày. Làm đúng pattern của ngày, có 1 bài redo vào Chủ nhật.'],
  ['Trade', 'Thứ 2 tới thứ 6, 20:00 - 22:10 là block cố định.'],
  ['Báo cáo GVHD', 'Mỗi thứ 6 lúc 17:30 báo cáo tiến độ với giáo viên hướng dẫn.'],
  ['Đồ án', 'Có slot đồ án riêng vào thứ 2, 3, 4, 5, 6, 7 và Chủ nhật để không bị trôi tiến độ.'],
]

const khangProjectWeeks = [
  {
    week: 'Tuần 1',
    focus: 'Nền móng C++ project, CLI skeleton và dashboard wireframe',
    report: 'Demo được CMake build, CLI skeleton, dashboard wireframe và contract dữ liệu đã thống nhất.',
    days: [
      ['Thứ 2', 'Setup C/C++ project structure và CMake, đảm bảo build được project rỗng.'],
      ['Thứ 3', 'Thiết kế tracker interface: input, config, output schema và pseudo flow.'],
      ['Thứ 4', 'Thiết kế CLI skeleton nhận input/config/output và in kết quả mẫu đúng schema.'],
      ['Thứ 5', 'Thiết kế dashboard layout: floor map, heatmap, zone stats, transition, journey.'],
      ['Thứ 6', 'Tổng hợp CMake + CLI + wireframe, chuẩn bị báo cáo GVHD lúc 17:30.'],
      ['Thứ 7', 'Sửa feedback sau báo cáo, bổ sung README setup ban đầu.'],
      ['Chủ nhật', 'Chốt checklist tuần 1 và chuẩn bị task port bottleneck tuần 2.'],
    ],
  },
  {
    week: 'Tuần 2',
    focus: 'Port bottleneck ban đầu, CLI flags và dashboard đọc mock data',
    report: 'Có initial C++ core, CLI flags cơ bản và dashboard prototype đọc mock_tracks.csv.',
    days: [
      ['Thứ 2', 'Đọc bottleneck report, chọn module cần port sang C/C++.'],
      ['Thứ 3', 'Port module bottleneck sang C/C++ bản tối thiểu chạy được sample input.'],
      ['Thứ 4', 'Thiết kế Linux CLI flags: input, output, config, device.'],
      ['Thứ 5', 'Implement dashboard prototype đọc mock data và hiển thị panel chính.'],
      ['Thứ 6', 'Chạy demo C++ core + CLI flags + dashboard mock, báo cáo GVHD lúc 17:30.'],
      ['Thứ 7', 'Fix lỗi build/CLI sau feedback, ghi lại dependency còn thiếu.'],
      ['Chủ nhật', 'Chuẩn bị kế hoạch tiếp tục port LTC-DMA core tuần 3.'],
    ],
  },
  {
    week: 'Tuần 3',
    focus: 'C++ core milestone, shared library và first end-to-end prototype',
    report: 'Có C++ core milestone, libltcdma.so build được và first end-to-end prototype.',
    days: [
      ['Thứ 2', 'Tiếp tục port LTC-DMA core sang C++, ưu tiên module chính.'],
      ['Thứ 3', 'Viết test/sample input để kiểm tra output C++ core.'],
      ['Thứ 4', 'Build shared library .so trên Linux hoặc môi trường tương đương.'],
      ['Thứ 5', 'Integrate Python tracker output vào dashboard để có first end-to-end prototype.'],
      ['Thứ 6', 'Chuẩn bị demo Python tracker -> analytics/dashboard, báo cáo GVHD lúc 17:30.'],
      ['Thứ 7', 'Ghi lỗi integration và cập nhật contract nếu có thay đổi.'],
      ['Chủ nhật', 'Chuẩn bị task Python binding/API cho tuần 4.'],
    ],
  },
  {
    week: 'Tuần 4',
    focus: 'Python binding/API, backend swap và analytics dashboard',
    report: 'C++ core gọi được từ Python/API, backend swap Python/C++ và analytics dashboard chạy được.',
    days: [
      ['Thứ 2', 'Expose C++ core qua Python binding/API bản tối thiểu.'],
      ['Thứ 3', 'Viết wrapper để gọi C++ backend từ Python với output đúng contract.'],
      ['Thứ 4', 'Implement backend swap Python <-> C++ bằng config hoặc CLI flag.'],
      ['Thứ 5', 'Kết nối analytics output vào dashboard, kiểm tra heatmap/zone stats.'],
      ['Thứ 6', 'Demo backend swap + analytics dashboard, báo cáo GVHD lúc 17:30.'],
      ['Thứ 7', 'Sửa bug binding/API và ghi checklist rủi ro realtime.'],
      ['Chủ nhật', 'Chuẩn bị threading/async pipeline tuần 5.'],
    ],
  },
  {
    week: 'Tuần 5',
    focus: 'Realtime pipeline, full CLI và live dashboard',
    report: 'Có pipeline threading/async nếu cần, CLI đầy đủ và live dashboard kết nối backend.',
    days: [
      ['Thứ 2', 'Implement threading/async pipeline nếu bottleneck realtime còn rõ.'],
      ['Thứ 3', 'Kiểm tra queue/buffer, tránh block UI hoặc mất frame.'],
      ['Thứ 4', 'Complete CLI: input, output, device, display, save, config.'],
      ['Thứ 5', 'Kết nối live dashboard với C++/Python backend, chạy video mẫu.'],
      ['Thứ 6', 'Demo CLI đầy đủ + live dashboard, báo cáo GVHD lúc 17:30.'],
      ['Thứ 7', 'Fix realtime issues và thêm fallback nếu FPS chưa đạt.'],
      ['Chủ nhật', 'Chuẩn bị evaluation Python vs C++ tuần 6.'],
    ],
  },
  {
    week: 'Tuần 6',
    focus: 'Performance evaluation, reproducible build và polished dashboard',
    report: 'Có report FPS/latency/resource, build instructions và dashboard polished theo feedback.',
    days: [
      ['Thứ 2', 'Performance evaluation Python vs C++: FPS, latency, CPU/GPU, memory.'],
      ['Thứ 3', 'Viết bảng so sánh, nhận xét bottleneck còn lại và giới hạn hệ thống.'],
      ['Thứ 4', 'Package reproducible Linux build: dependency, commands, expected output.'],
      ['Thứ 5', 'Polish dashboard theo user feedback, dọn UI lỗi và trạng thái loading/error.'],
      ['Thứ 6', 'Nộp/report evaluation + build instruction, báo cáo GVHD lúc 17:30.'],
      ['Thứ 7', 'Chạy lại build từ đầu, ghi lỗi môi trường nếu có.'],
      ['Chủ nhật', 'Chuẩn bị release candidate tuần 7.'],
    ],
  },
  {
    week: 'Tuần 7',
    focus: 'Release candidate, clean install test và demo video draft',
    report: 'Có package .so/DLL/CLI gần final, clean install test và demo video draft.',
    days: [
      ['Thứ 2', 'Finalize .so/DLL/CLI packaging, dọn tên file và version.'],
      ['Thứ 3', 'Run installation test on clean environment, ghi lại lỗi reproduce.'],
      ['Thứ 4', 'Sửa lỗi install/package, cập nhật README theo kết quả test.'],
      ['Thứ 5', 'Chuẩn bị demo video draft: flow, script, screen cần quay.'],
      ['Thứ 6', 'Demo release candidate + clean install + video draft, báo cáo GVHD lúc 17:30.'],
      ['Thứ 7', 'Sửa feedback, khóa danh sách việc còn lại cho tuần final.'],
      ['Chủ nhật', 'Chuẩn bị tài liệu build, CLI, API cho tuần 8.'],
    ],
  },
  {
    week: 'Tuần 8',
    focus: 'Final documentation, deployment docs và demo cuối',
    report: 'Hoàn thiện README, build docs, CLI/API docs và final ExhibitFlow system demo.',
    days: [
      ['Thứ 2', 'Finalize documentation: build, CLI, API.'],
      ['Thứ 3', 'Viết deployment docs và troubleshooting cho môi trường Linux/demo.'],
      ['Thứ 4', 'Chạy full demo từ setup -> CLI -> dashboard -> kết quả analytics.'],
      ['Thứ 5', 'Polish final: screenshot, sample command, known limitations, backup plan.'],
      ['Thứ 6', 'Báo cáo final progress với GVHD lúc 17:30, chốt việc còn thiếu.'],
      ['Thứ 7', 'Sửa lần cuối theo feedback, chuẩn bị trình bày.'],
      ['Chủ nhật', 'Tổng duyệt demo và đóng gói final submission.'],
    ],
  },
]

const exhibitFlowTeam = [
  {
    member: 'Khang',
    role: 'Systems, Integration, Dashboard, Deployment',
    accent: '#7c3aed',
    summary: 'Owns the technical backbone: C/C++ build, CLI, backend integration, dashboard wiring, packaging, documentation, and final demo polish.',
    weeks: [
      ['Week 1', [
        'Set up the C/C++ project structure and CMake build system.',
        'Design the tracker interface and CLI skeleton.',
        'Design the ExhibitFlow dashboard layout with floor map, heatmap, zone stats, transitions, and visitor journeys.',
      ]],
      ['Week 2', [
        'Port the selected bottleneck module to an initial C/C++ core.',
        'Design and implement Linux CLI flags for input, output, config, and device.',
        'Implement a dashboard prototype that reads mock track data.',
      ]],
      ['Week 3', [
        'Continue porting the LTC-DMA core to C++.',
        'Build the shared library libltcdma.so on Linux.',
        'Integrate Python tracker output into the dashboard for the first end-to-end prototype.',
      ]],
      ['Week 4', [
        'Expose the C++ core through a Python binding or API.',
        'Implement backend swapping between Python and C++ without breaking the track contract.',
        'Integrate analytics output into the dashboard.',
      ]],
      ['Week 5', [
        'Implement a threading or async pipeline if real-time performance requires it.',
        'Complete the CLI with input, output, device, display, save, and config options.',
        'Integrate the real-time track stream into the dashboard.',
      ]],
      ['Week 6', [
        'Evaluate Python vs C++ performance using FPS, latency, CPU/GPU, and memory metrics.',
        'Package a reproducible Linux build with clear build instructions.',
        'Improve dashboard UX for the exhibition demo.',
      ]],
      ['Week 7', [
        'Finalize .so, DLL, and CLI packaging for the release candidate.',
        'Run installation testing on a clean environment.',
        'Run the full exhibition demo rehearsal.',
      ]],
      ['Week 8', [
        'Finalize build, CLI, API, README, and deployment documentation.',
        'Polish the dashboard, final demo, and slide integration.',
      ]],
    ],
  },
  {
    member: 'Thuận',
    role: 'Spatial Analytics and Visualization',
    accent: '#059669',
    summary: 'Owns floor mapping, zones, visitor analytics, dwell time, heatmaps, journey paths, case studies, and final insight reports.',
    weeks: [
      ['Week 1', [
        'Design the initial floor plan and analysis zones.',
        'Define analytics metrics and the track data schema.',
        'Create mock track data for analytics and dashboard development.',
      ]],
      ['Week 2', [
        'Implement foot-point extraction and homography mapping.',
        'Implement visitor count and dwell time metrics.',
        'Implement interactive floor map visualization.',
      ]],
      ['Week 3', [
        'Implement heatmap generation and zone transition matrix.',
        'Test analytics with synthetic scenarios.',
        'Visualize live or recorded visitor trajectories.',
      ]],
      ['Week 4', [
        'Refine dwell time and transition logic using real tracker output.',
        'Implement visitor journey path reconstruction.',
        'Prepare the end-to-end demo checkpoint.',
      ]],
      ['Week 5', [
        'Implement hot zone and dead zone classification.',
        'Implement congestion detection from mapped trajectories.',
        'Implement visitor flow replay with basic timeline controls.',
      ]],
      ['Week 6', [
        'Evaluate zone count, dwell time, and transition accuracy.',
        'Prepare the Layout A vs Layout B case study.',
      ]],
      ['Week 7', [
        'Run exhibition scenarios for normal flow, dead zones, congestion, and occlusion.',
        'Finalize analytics findings for count, dwell, heatmap, transition, journey, and hot/dead zones.',
        'Prepare recording and presentation assets.',
      ]],
      ['Week 8', [
        'Finalize analytics tables, figures, and case study results.',
      ]],
    ],
  },
  {
    member: 'Hưng',
    role: 'Algorithm and Performance',
    accent: '#2563eb',
    summary: 'Owns LTC-DMA benchmarking, profiling, optimization, tracking evaluation, stress testing, performance figures, and technical documentation.',
    weeks: [
      ['Week 1', [
        'Benchmark the current LTC-DMA pipeline for FPS, latency, CPU/GPU, and memory.',
        'Profile the pipeline to identify the main bottleneck.',
      ]],
      ['Week 2', [
        'Optimize the Python LTC-DMA version with vectorization, caching, and reduced data copying.',
        'Benchmark the baseline Python version against the optimized Python version.',
      ]],
      ['Week 3', [
        'Validate that the optimized version preserves tracking quality.',
        'Benchmark tracking quality against the baseline and ByteTrack.',
      ]],
      ['Week 4', [
        'Benchmark the optimized Python version against the C++ version.',
        'Analyze the speed-quality tradeoff and propose the demo configuration.',
      ]],
      ['Week 5', [
        'Optimize remaining bottlenecks after integration.',
        'Stress test occlusion and crowded scenes.',
      ]],
      ['Week 6', [
        'Evaluate LTC-DMA against ByteTrack using HOTA, IDF1, MOTA, IDSW, or suitable alternatives.',
        'Analyze how tracking errors affect analytics stability.',
        'Visualize benchmark and analytics results for reports and dashboard pages.',
      ]],
      ['Week 7', [
        'Run final stress testing and bug fixing.',
        'Prepare algorithm and performance figures for the final report and slides.',
      ]],
      ['Week 8', [
        'Finalize the benchmark report and technical tracking documentation.',
      ]],
    ],
  },
]

const englishSkillMethods = [
  {
    skill: '12 thì',
    goal: 'Không học thuộc công thức riêng lẻ: mỗi thì phải đi cùng ngữ cảnh, câu viết và câu nói.',
    steps: [
      'Học 1 cặp thì trong tuần và ghi: form → cách dùng → dấu hiệu → ví dụ của mình.',
      'Biến 1 ý thành 3 dạng: khẳng định, phủ định, câu hỏi; sau đó đổi chủ ngữ/thời gian.',
      'Viết 8 câu rồi nói lại 8 câu không nhìn bài; đánh dấu lỗi tense trong error log.',
      'Cuối tuần trộn các thì trong 1 đoạn 100 từ và 1 bài nói 2 phút.',
    ],
  },
  {
    skill: 'Từ vựng nhớ dai',
    goal: 'Học ít nhưng gọi lại được và dùng được; ưu tiên cụm từ thay vì danh sách từ đơn.',
    steps: [
      'Mỗi ngày chọn 8–10 cụm theo 1 chủ đề; ghi collocation, câu mẫu và tình huống dùng.',
      'Ôn cách quãng vào ngày 0–1–3–7–14–30 bằng active recall, không nhìn nghĩa trước.',
      'Mỗi cụm phải xuất hiện 2 lần: 1 câu viết và 1 câu nói về chính mình.',
      'Mỗi Chủ nhật bỏ cụm chưa dùng được, giữ lại cụm nhớ và dùng được.',
    ],
  },
  {
    skill: 'Listening 4 bước',
    goal: 'Tăng khả năng nghe bằng một đoạn ngắn nghe sâu, rồi mới tăng độ dài và tốc độ.',
    steps: [
      'Lần 1 nghe không transcript: ghi chủ đề, ai, ở đâu, 3 ý chính.',
      'Lần 2 chép chính tả 30–60 giây; khoanh từ bị nuốt âm, nối âm hoặc không nhận ra.',
      'Mở transcript để sửa, ghi 3 cụm nghe sai và shadow 5 câu.',
      'Ngày hôm sau nghe lại không transcript và tóm tắt miệng 60 giây.',
    ],
  },
  {
    skill: 'Writing',
    goal: 'Dùng được thì để kể, mô tả hiện tại và nói về kế hoạch; ưu tiên câu đúng trước câu hay.',
    steps: [
      'Viết theo khung 4 câu: bối cảnh → sự việc → kết quả → kế hoạch/nhận xét.',
      'Mỗi bài phải gạch chân các thì đã dùng và kiểm tra lý do dùng từng thì.',
      'Sau 24 giờ, tự sửa 5 câu; so sánh với checklist S-V, tense, article, plural.',
      'Mỗi tuần lưu 1 đoạn trước/sau khi sửa để thấy lỗi lặp đã giảm chưa.',
    ],
  },
  {
    skill: 'Speaking',
    goal: 'Biến kiến thức ngữ pháp thành phản xạ nói trong tình huống quen thuộc.',
    steps: [
      'Thứ 6 ghi âm 2 phút, bắt buộc dùng cặp thì đang học và 5 cụm từ trong tuần.',
      'Nghe lại, chép ra 3 câu sai và nói lại ngay phiên bản đúng 3 lần.',
      'Chủ nhật nói 3 phút kể một câu chuyện có quá khứ, hiện tại và tương lai.',
      'Đánh giá 3 điểm: đúng thì, rõ ý, nghe tự nhiên; không chấm theo độ khó của từ.',
    ],
  },
]

const englishTenseRoadmap = [
  ['Present Simple', 'S + V(s/es)', 'thói quen, sự thật', 'I work from home on Fridays.'],
  ['Present Continuous', 'S + am/is/are + V-ing', 'đang diễn ra, tạm thời', 'I am working on a new project.'],
  ['Present Perfect', 'S + have/has + V3', 'đã xảy ra, còn liên quan hiện tại', 'I have finished the report.'],
  ['Present Perfect Continuous', 'S + have/has been + V-ing', 'bắt đầu trước và còn tiếp diễn', 'I have been learning English for a year.'],
  ['Past Simple', 'S + V2/ed', 'đã kết thúc tại thời điểm quá khứ', 'I watched a film last night.'],
  ['Past Continuous', 'S + was/were + V-ing', 'đang diễn ra tại một thời điểm quá khứ', 'I was studying at 8 p.m.'],
  ['Past Perfect', 'S + had + V3', 'xảy ra trước một mốc quá khứ khác', 'I had left before he called.'],
  ['Past Perfect Continuous', 'S + had been + V-ing', 'kéo dài trước một mốc quá khứ', 'I had been waiting for an hour.'],
  ['Future Simple', 'S + will + V', 'quyết định nhanh, dự đoán, lời hứa', 'I will call you tonight.'],
  ['Future Continuous', 'S + will be + V-ing', 'đang diễn ra tại mốc tương lai', 'I will be working at 9 a.m.'],
  ['Future Perfect', 'S + will have + V3', 'hoàn tất trước mốc tương lai', 'I will have finished by Friday.'],
  ['Future Perfect Continuous', 'S + will have been + V-ing', 'kéo dài đến mốc tương lai', 'I will have been studying for two years.'],
]

const leetcodeComplexityGuide = [
  {
    topic: 'Đếm vòng lặp',
    notes: [
      'Một vòng chạy n lần là O(n).',
      'Hai vòng lồng nhau thường là O(n^2).',
      'Hai vòng tách rời O(n) + O(n) vẫn là O(n).',
    ],
  },
  {
    topic: 'Nhìn kích thước input',
    notes: [
      'n khoảng 10^5 thường cần O(n) hoặc O(n log n).',
      'n khoảng 10^3 có thể chịu O(n^2).',
      'n nhỏ dưới 20 thường có thể backtracking/bitmask O(2^n).',
    ],
  },
  {
    topic: 'Nhận diện log n',
    notes: [
      'Mỗi bước bỏ đi một nửa search space là O(log n).',
      'Binary search trên mảng sort hoặc answer space thường là O(log n) nhân chi phí check.',
      'Heap push/pop là O(log n), làm n lần là O(n log n).',
    ],
  },
  {
    topic: 'Tính space complexity',
    notes: [
      'HashMap/HashSet lưu tối đa n phần tử là O(n).',
      'Recursion depth h dùng O(h) call stack; tree skewed có thể là O(n).',
      'Nếu sửa in-place và chỉ dùng vài biến phụ thì thường là O(1).',
    ],
  },
]

const englishDailyPlan = [
  ['Thứ 2', 'Học cặp thì của tuần', 'Nghe 1 đoạn 60–90 giây 4 bước: ý chính → chép chính tả → transcript → shadow.', 'Viết 8 câu với thì mới: khẳng định, phủ định, câu hỏi; đọc to toàn bộ.'],
  ['Thứ 3', 'Từ vựng theo cụm + active recall', 'Nghe lại đoạn hôm qua không transcript, ghi 5 từ/cụm đã nghe được.', 'Học 8–10 collocations; ôn thẻ ngày 1 và đặt 5 câu dùng đúng thì tuần này.'],
  ['Thứ 4', 'Phân biệt hai thì dễ nhầm', 'Nghe đoạn mới; đánh dấu chỗ nối âm, nuốt âm và từ không nhận ra.', 'Viết 1 đoạn 80–100 từ có ít nhất 2 thì; gạch chân và giải thích lý do dùng.'],
  ['Thứ 5', 'Listening sâu + tóm tắt', 'Nghe 1 section ngắn theo timer, chỉ mở transcript ở câu sai rồi shadow 5 câu.', 'Tóm tắt nội dung bằng 5 câu, cố ý dùng 3 thì và 5 cụm từ đã học.'],
  ['Thứ 6', 'Speaking dùng thì trong đời thật', 'Shadow một đoạn 3 vòng: chậm → cùng tốc độ → tự nói lại không nhìn.', 'Ghi âm 2 phút về tuần của mình; bắt buộc dùng cặp thì và 5 collocations.'],
  ['Thứ 7', 'Writing + sửa lỗi', 'Nghe một bài ngắn rồi nói lại 3 ý chính bằng tiếng Anh.', 'Viết 120–150 từ; sau 24 giờ sửa 5 câu yếu và kiểm tra tense/S-V/article/plural.'],
  ['Chủ nhật', 'Kiểm tra tuần + ôn cách quãng', 'Nghe lại bài từng sai sau 6 ngày, không transcript; tóm tắt trong 60 giây.', 'Ôn thẻ ngày 0–1–3–7, viết 12 câu trộn các thì và nói 3 phút kể chuyện.'],
]

const leetcodeDailyPlan = [
  ['Thứ 2', 'Array / HashMap', 'Chọn 1 bài trong roadmap (ví dụ Two Sum hoặc Valid Anagram).'],
  ['Thứ 3', 'Two Pointers / Prefix Sum', 'Chọn 1 bài mới, ưu tiên viết brute force trước rồi tối ưu.'],
  ['Thứ 4', 'Sliding Window', 'Chọn 1 bài Easy/Medium và vẽ cửa sổ di chuyển bằng ví dụ nhỏ.'],
  ['Thứ 5', 'Stack / Monotonic Stack', 'Chọn 1 bài theo tuần roadmap; ghi rõ điều gì được push/pop.'],
  ['Thứ 6', 'Binary Search / Linked List', 'Làm 1 bài có timer 35 phút; test kỹ điều kiện biên.'],
  ['Thứ 7', 'Tree / Graph', 'Chọn 1 DFS/BFS; vẽ tree/graph, thêm visited hoặc base case trước khi code.'],
  ['Chủ nhật', 'Redo + pattern yếu nhất', 'Không xem đáp án: làm lại 1 bài sai sau 3–7 ngày và cập nhật pattern notebook.'],
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
      ['05 phút', 'Đọc đề, tự nói input/output/constraints và chạy tay 1 ví dụ.'],
      ['35 phút', 'Tự giải: brute force → nhận diện pattern → code. Không mở lời giải trước khi hết giờ.'],
      ['10 phút', 'Test edge case, submit và ghi time/space complexity.'],
      ['10 phút', 'Xem lời giải nếu cần; note 1 pattern và ngày redo sau 3–7 ngày.'],
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
    eyebrow: '12 tuần · 3 mục tiêu chính',
    title: '12 tuần dùng được 12 thì trong viết và nói',
    goal: 'Mỗi tuần học một cặp thì, luyện từ vựng theo cách quên rồi nhớ lại, và nghe sâu một đoạn ngắn. Mục tiêu là tạo được câu đúng, nói được thành đoạn và hiểu ý chính khi nghe.',
    accent: '#dc2626',
    daily: [
      ['10 phút', 'Ôn từ/cụm theo lịch 0–1–3–7–14–30 và sửa lỗi của hôm trước.'],
      ['20 phút', 'Học 1 cặp thì: form, cách dùng, dấu hiệu và câu ví dụ của chính mình.'],
      ['25 phút', 'Listening 4 bước: nghe ý → chép chính tả → transcript → shadow.'],
      ['25 phút', 'Output: viết 8 câu/đoạn ngắn rồi ghi âm nói lại, bắt buộc dùng thì mới.'],
      ['10 phút', 'Ghi error log: tense, từ vựng, nghe sai; chọn 1 lỗi để sửa ngày mai.'],
    ],
    metrics: [
      ['12 thì', '12 cặp bài học + 12 bài kiểm tra'],
      ['Từ vựng', '8–10 cụm/ngày · ôn 6 mốc'],
      ['Nghe & nói', '7 audio + 3 recording/tuần'],
    ],
    resources: [
      ['Daily Dictation', 'https://dailydictation.com'],
      ['YouGlish', 'https://youglish.com'],
      ['Oxford Learner’s Dictionaries', 'https://www.oxfordlearnersdictionaries.com'],
    ],
    months: [
      {
        name: 'Tháng 1',
        focus: 'Nắm 8 thì hiện tại và quá khứ',
        outcome: 'Nhận diện đúng ngữ cảnh, viết câu ngắn không sai thì, và nói được thói quen, việc đang diễn ra, trải nghiệm và câu chuyện quá khứ.',
        weeks: [
          ['Tuần 1', 'Present Simple + Present Continuous', ['form và dấu hiệu nhận biết', '8 câu thói quen/đang diễn ra', 'nghe chép chính tả 30 giây', 'nói 1 phút về lịch hằng ngày', 'ôn 40 collocations work/study']],
          ['Tuần 2', 'Present Perfect + Present Perfect Continuous', ['for/since/already/yet', 'phân biệt kết quả và quá trình', 'viết 100 từ về việc đã làm', 'nói về quá trình học English', 'ôn cụm ngày 0–1–3–7']],
          ['Tuần 3', 'Past Simple + Past Continuous', ['when/while và mốc thời gian', 'kể một ngày đã qua bằng 2 thì', 'nghe đoạn kể chuyện và bắt động từ', 'ghi âm 2 phút về một kỷ niệm', 'ôn 40 collocations daily life']],
          ['Tuần 4', 'Past Perfect + Past Perfect Continuous', ['before/after/by the time', 'xếp thứ tự 2 sự việc quá khứ', 'viết lại 8 câu dễ nhầm', 'nói câu chuyện có nguyên nhân/kết quả', 'mini test 8 thì đầu']],
        ],
      },
      {
        name: 'Tháng 2',
        focus: '4 thì tương lai và phối hợp ngữ cảnh',
        outcome: 'Nói/viết được kế hoạch, dự đoán, tiến độ và việc hoàn tất trước một mốc tương lai; biết chọn thì theo ý muốn diễn đạt.',
        weeks: [
          ['Tuần 5', 'Future Simple + Future Continuous', ['will và quyết định tức thời', 'kế hoạch đang diễn ra tại mốc tương lai', 'nghe dự đoán/kế hoạch', 'nói kế hoạch tuần tới', 'ôn 50 collocations future/work']],
          ['Tuần 6', 'Future Perfect + Future Perfect Continuous', ['by/before và for', 'phân biệt hoàn tất và kéo dài', 'viết mục tiêu 1 năm', 'nói tiến độ dự án cá nhân', 'mini dictation 60 giây']],
          ['Tuần 7', 'So sánh 12 thì theo timeline', ['vẽ timeline cho 12 thì', 'chọn thì từ ngữ cảnh thay vì dịch từng chữ', 'sửa 20 câu sai tense', 'nói 3 phút về quá khứ-hiện tại-tương lai', 'ôn thẻ ngày 0–1–3–7–14']],
          ['Tuần 8', 'Viết và nói tích hợp', ['đoạn 150 từ dùng tối thiểu 6 thì', 'nghe rồi kể lại bằng thì phù hợp', 'ghi âm trả lời 5 câu hỏi', 'tự chấm theo checklist', 'kiểm tra 12 thì lần 1']],
        ],
      },
      {
        name: 'Tháng 3',
        focus: 'Tự động hóa qua nghe, viết và nói',
        outcome: 'Không chỉ nhận diện công thức: dùng 12 thì tự nhiên hơn trong bài viết, câu trả lời nói và tóm tắt nội dung nghe.',
        weeks: [
          ['Tuần 9', 'Listening tăng độ dài', ['3 audio/tuần: ngắn → 3 phút', 'chép chính tả 60 giây', 'ghi sổ từ nghe sai', 'tóm tắt 5 câu', 'nghe lại sau 7 ngày']],
          ['Tuần 10', 'Writing 12 thì', ['3 đoạn 120–150 từ', 'gạch chân và gọi tên từng thì', 'rewrite 5 câu yếu', 'dùng 15 collocations đã ôn', 'tự sửa theo error log']],
          ['Tuần 11', 'Speaking 12 thì', ['3 recording/tuần', 'kể chuyện 3 phút', 'trả lời nhanh 10 câu', 'sửa pause/phát âm/tense', 'nói lại sau 24 giờ']],
          ['Tuần 12', 'Final check + duy trì', ['1 bài viết 200 từ', '1 bài nói 5 phút', '1 listening mini test', 'kiểm tra đủ 12 thì', 'lập lịch ôn từ và nghe tháng tiếp theo']],
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

function makeProjectTaskId(week, day, title) {
  return `exhibitflow-${week}-${day}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function makeTeamTaskId(member, week, task) {
  return `team-${member}-${week}-${task}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function getMemberTaskIds(memberPlan) {
  return memberPlan.weeks.flatMap(([week, tasks]) =>
    tasks.map((task) => makeTeamTaskId(memberPlan.member, week, task)),
  )
}

function App() {
  const [activeTrackId, setActiveTrackId] = useState(() => {
    const route = window.location.hash.replace('#', '')

    if (route === 'schedule' || route === 'exhibitflow') return route

    return tracks.some((track) => track.id === route) ? route : 'overview'
  })
  const [progress, setProgress] = useState(loadProgress)
  const [scheduleProgress, setScheduleProgress] = useState(loadScheduleProgress)
  const [exhibitFlowProgress, setExhibitFlowProgress] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(exhibitFlowProgressKey)) ?? {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    function syncRoute() {
      const route = window.location.hash.replace('#', '')
      if (route === 'schedule' || route === 'exhibitflow') {
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

  useEffect(() => {
    window.localStorage.setItem(exhibitFlowProgressKey, JSON.stringify(exhibitFlowProgress))
  }, [exhibitFlowProgress])

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
  const isProjectPage = activeTrackId === 'exhibitflow'

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

  function toggleTeamTask(id) {
    setExhibitFlowProgress((current) => ({
      ...current,
      [id]: !current[id],
    }))
  }

  function resetMember(memberPlan) {
    const memberTaskIds = new Set(getMemberTaskIds(memberPlan))

    setExhibitFlowProgress((current) =>
      Object.fromEntries(Object.entries(current).filter(([key]) => !memberTaskIds.has(key))),
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
          <span>{ownerName} Study OS</span>
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
          <button
            className={isProjectPage ? 'active' : ''}
            onClick={() => navigate('exhibitflow')}
            style={{ '--accent': '#0f766e' }}
            type="button"
          >
            ExhibitFlow
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
        {isProjectPage ? (
          <ExhibitFlowPage
            onResetMember={resetMember}
            onToggleTask={toggleTeamTask}
            progress={exhibitFlowProgress}
          />
        ) : isSchedulePage ? (
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
          <h2>Khang học LeetCode, AI Math và English trong 3 tháng</h2>
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
        <article className="overview-card exhibitflow-overview-card">
          <span>Capstone project</span>
          <h3>ExhibitFlow</h3>
          <p>
            Manage weekly progress for Khang, Thuận, and Hưng with English task names,
            ownership, deliverables, and checkable milestones.
          </p>
          <div className="commitment-preview">
            <small><b>Khang</b>Systems, integration, dashboard, deployment</small>
            <small><b>Thuận</b>Spatial analytics and visualization</small>
            <small><b>Hưng</b>Algorithm and performance</small>
          </div>
          <div className="card-footer">
            <small>8-week project plan</small>
            <button onClick={() => onOpenTrack('exhibitflow')} type="button">Open project</button>
          </div>
        </article>
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
  const allProjectTasks = khangProjectWeeks.flatMap((week) =>
    week.days.map(([day, title]) => makeProjectTaskId(week.week, day, title)),
  )
  const doneCount = allScheduleTasks.filter((id) => progress[id]).length
  const projectDoneCount = allProjectTasks.filter((id) => progress[id]).length
  const totalCount = allScheduleTasks.length + allProjectTasks.length
  const combinedDoneCount = doneCount + projectDoneCount
  const percent = totalCount === 0 ? 0 : Math.round((combinedDoneCount / totalCount) * 100)

  return (
    <>
      <section className="track-header schedule-header" style={{ '--accent': '#7c3aed' }}>
        <div>
          <span>{ownerName} daily schedule</span>
          <h2>Lịch trình hàng ngày theo các block cố định</h2>
          <p>
            Lịch này giữ cứng giờ học tại trường và trading, phần còn lại được chia thành slot học
            vừa sức cho LeetCode, AI Math và English.
          </p>
        </div>
        <div className="track-progress">
          <strong>{percent}%</strong>
          <span>{combinedDoneCount}/{totalCount} việc đã tick</span>
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

      <section className="project-plan-panel">
        <div className="method-heading">
          <span>ExhibitFlow của Khang</span>
          <h3>Chia task đồ án theo ngày để kịp báo cáo thứ 6 lúc 17:30</h3>
        </div>

        <div className="project-week-grid">
          {khangProjectWeeks.map((week) => {
            const taskIds = week.days.map(([day, title]) => makeProjectTaskId(week.week, day, title))
            const weekDone = taskIds.filter((id) => progress[id]).length
            const weekPercent = Math.round((weekDone / week.days.length) * 100)

            return (
              <article className="project-week-card" key={week.week}>
                <div className="project-week-title">
                  <div>
                    <span>{week.week}</span>
                    <h4>{week.focus}</h4>
                  </div>
                  <b>{weekPercent}%</b>
                </div>
                <p><strong>Báo cáo:</strong> {week.report}</p>
                <div className="task-stack">
                  {week.days.map(([day, title]) => {
                    const taskId = makeProjectTaskId(week.week, day, title)

                    return (
                      <label className={`task-check ${progress[taskId] ? 'done' : ''}`} key={taskId}>
                        <input
                          checked={Boolean(progress[taskId])}
                          onChange={() => onToggleTask(taskId)}
                          type="checkbox"
                        />
                        <span aria-hidden="true" />
                        <em><b>{day}</b>{title}</em>
                      </label>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
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

function ExhibitFlowPage({ progress, onToggleTask, onResetMember }) {
  const memberSummaries = exhibitFlowTeam.map((memberPlan) => {
    const taskIds = getMemberTaskIds(memberPlan)
    const done = taskIds.filter((id) => progress[id]).length

    return {
      ...memberPlan,
      done,
      total: taskIds.length,
      percent: taskIds.length === 0 ? 0 : Math.round((done / taskIds.length) * 100),
    }
  })
  const totalDone = memberSummaries.reduce((sum, member) => sum + member.done, 0)
  const totalTasks = memberSummaries.reduce((sum, member) => sum + member.total, 0)
  const totalPercent = totalTasks === 0 ? 0 : Math.round((totalDone / totalTasks) * 100)

  return (
    <>
      <section className="track-header exhibitflow-header" style={{ '--accent': '#0f766e' }}>
        <div>
          <span>ExhibitFlow project control</span>
          <h2>Team progress by owner, week, and deliverable</h2>
          <p>
            Tasks are translated from the Excel project plan and grouped by Khang, Thuận, and Hưng
            so each owner can track weekly progress clearly.
          </p>
        </div>
        <div className="track-progress">
          <strong>{totalPercent}%</strong>
          <span>{totalDone}/{totalTasks} project tasks completed</span>
          <ProgressBar accent="#0f766e" percent={totalPercent} />
        </div>
      </section>

      <section className="member-summary-grid">
        {memberSummaries.map((member) => (
          <article className="member-summary-card" key={member.member} style={{ '--accent': member.accent }}>
            <span>{member.role}</span>
            <h3>{member.member}</h3>
            <p>{member.summary}</p>
            <ProgressBar accent={member.accent} percent={member.percent} />
            <div className="card-footer">
              <small>{member.done}/{member.total} tasks</small>
              <button onClick={() => onResetMember(member)} type="button">Reset</button>
            </div>
          </article>
        ))}
      </section>

      <section className="team-board">
        {memberSummaries.map((member) => (
          <article className="member-board" key={member.member} style={{ '--accent': member.accent }}>
            <div className="member-board-title">
              <div>
                <span>{member.role}</span>
                <h3>{member.member}</h3>
              </div>
              <strong>{member.percent}%</strong>
            </div>

            <div className="member-week-stack">
              {member.weeks.map(([week, tasks]) => {
                const taskIds = tasks.map((task) => makeTeamTaskId(member.member, week, task))
                const done = taskIds.filter((id) => progress[id]).length
                const percent = Math.round((done / tasks.length) * 100)

                return (
                  <section className="member-week" key={`${member.member}-${week}`}>
                    <div className="member-week-title">
                      <span>{week}</span>
                      <b>{percent}%</b>
                    </div>
                    <div className="task-stack">
                      {tasks.map((task) => {
                        const taskId = makeTeamTaskId(member.member, week, task)

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
                )
              })}
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
          <span>{track.id === 'leetcode' ? 'Quy trình suy nghĩ' : 'Nhịp học mỗi ngày'}</span>
          {track.daily.map(([time, task]) => (
            <p key={`${time}-${task}`}><b>{time}</b><em>{task}</em></p>
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
        <TenseRoadmap />
      )}

      {track.id === 'english' && (
        <DailyStudyPlan
          duration="90 phút/ngày"
          intro="Giữ đúng nhịp 90 phút. Mỗi ngày phải có cả input (nghe/ôn) và output (viết/nói); nếu bận, làm phiên bản tối thiểu 30 phút: 10 phút ôn + 10 phút nghe + 10 phút nói/viết."
          plan={englishDailyPlan}
          title="Lịch 7 ngày lặp lại để nhớ lâu và dùng được"
          type="english"
        />
      )}

      {track.id === 'leetcode' && (
        <DailyStudyPlan
          duration="60 phút/ngày"
          intro="Giữ đúng 1 bài/ngày. Nếu chưa ra sau 35 phút, đọc lời giải để học pattern, rồi đánh dấu làm lại sau 3–7 ngày."
          plan={leetcodeDailyPlan}
          title="LeetCode hằng ngày: chủ đề và bài cần làm"
          type="leetcode"
        />
      )}

      {track.id === 'leetcode' && (
        <section className="skill-method-panel leetcode-guide-panel">
          <div className="method-heading">
            <span>Cách tính độ phức tạp</span>
            <h3>Ước lượng Big-O bằng số lần chạy và bộ nhớ phụ</h3>
          </div>

          <div className="skill-method-grid">
            {leetcodeComplexityGuide.map((guide) => (
              <article className="skill-method-card leetcode-method-card" key={guide.topic}>
                <span>{guide.topic}</span>
                <ol>
                  {guide.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>
      )}

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

      {track.id === 'english' && <EnglishLab />}

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

function DailyStudyPlan({ duration, intro, plan, title, type }) {
  return (
    <section className={`daily-study-panel ${type}`}>
      <div className="method-heading">
        <span>Bắt buộc · {duration}</span>
        <h3>{title}</h3>
        <p>{intro}</p>
      </div>
      <div className="daily-study-grid">
        {plan.map(([day, focus, listenOrProblem, output]) => (
          <article className="daily-study-card" key={day}>
            <span>{day}</span>
            <h4>{focus}</h4>
            <p><b>{type === 'english' ? 'Nghe:' : 'Bài:'}</b> {listenOrProblem}</p>
            {type === 'english' ? <p><b>Đầu ra:</b> {output}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}

function TenseRoadmap() {
  return (
    <section className="tense-roadmap-panel">
      <div className="method-heading">
        <span>Trọng tâm bắt buộc · 12 thì</span>
        <h3>Bản đồ 12 thì: học theo cặp, dùng ngay trong viết và nói</h3>
        <p>
          Mỗi tuần học một cặp. Với mỗi thì, đi theo chuỗi: nhận diện ngữ cảnh → biến đổi câu → viết → nói → ôn lại sau 1, 3, 7 và 14 ngày.
        </p>
      </div>
      <div className="tense-roadmap-grid">
        {englishTenseRoadmap.map(([tense, form, use, example], index) => (
          <article className="tense-card" key={tense}>
            <div className="tense-card-heading">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h4>{tense}</h4>
            </div>
            <p><b>Công thức:</b> {form}</p>
            <p><b>Dùng khi:</b> {use}</p>
            <p className="tense-example">“{example}”</p>
          </article>
        ))}
      </div>
    </section>
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
