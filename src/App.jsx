import { useEffect, useMemo, useState } from 'react'
import './App.css'
import AiEngineerGlossary from './AiEngineerGlossary'
import DailyPractice from './DailyPractice'

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
      ['06:00 - 07:30', 'IELTS: 1 Listening lẻ + 1 Reading lẻ + Shadowing + Speaking', 'English'],
      ['08:00 - 17:00', 'Làm việc cố định', 'Work'],
      ['17:30 - 18:20', 'Ăn tối, nghỉ mắt, reset trước buổi học', 'Routine'],
      ['18:30 - 19:30', 'Project AI: làm phần nhỏ nhất chạy được theo tuần hiện tại', 'Project'],
      ['20:00 - 22:10', 'Trade cố định, ngồi theo plan và ghi journal sau lệnh', 'Trading'],
      ['22:20 - 22:30', 'Reset sau trade; tối nay chỉ review nhẹ hoặc nghỉ', 'Review'],
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
      ['14:00 - 16:00', 'Đồ án: code/report/demo một phần rõ ràng', 'Project'],
      ['18:00 - 19:30', 'AI Math hoặc project AI: theo checklist của tuần hiện tại', 'AI Math'],
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
      ['14:00 - 15:30', 'Đồ án: hoàn thành 1 việc có thể demo/commit', 'Project'],
      ['16:00 - 17:00', 'AI Math: học một ý và kiểm tra bằng ví dụ số', 'AI Math'],
      ['18:30 - 19:30', 'Làm bài tập trường hoặc review AI Math nhẹ', 'School'],
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
      ['18:30 - 19:30', 'Làm bài tập trường hoặc chốt 1 task đồ án nhỏ', 'School'],
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
      ['16:00 - 17:30', 'Đồ án: code/report phần quan trọng nhất tuần', 'Project'],
      ['17:30 - 18:00', 'Báo cáo tiến độ với giáo viên hướng dẫn', 'Advisor'],
      ['18:00 - 18:15', 'Ghi lại feedback và việc cần sửa sau buổi báo cáo', 'Review'],
      ['18:20 - 19:30', 'Làm bài tập trường hoặc xử lý việc đồ án còn dang dở', 'School'],
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
      ['15:45 - 17:30', 'Đồ án: deep work không bị cắt bởi trade', 'Project'],
      ['19:30 - 21:00', 'Project AI: buổi tập trung để hoàn thành đầu ra tuần', 'Project'],
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
      ['09:00 - 10:00', 'Đồ án hoặc bài tập trường ưu tiên cao', 'School'],
      ['10:00 - 10:30', 'Cập nhật pattern notebook và chọn bài cho tuần mới', 'Review'],
      ['10:45 - 12:00', 'Review AI Math: tự giải thích công thức bằng ví dụ project', 'AI Math'],
      ['13:30 - 14:45', 'Làm bài tập hoặc học bài trên trường', 'School'],
      ['15:00 - 16:30', 'Đồ án hoặc bài tập trường: hoàn thành việc ưu tiên tuần mới', 'Project'],
      ['17:00 - 18:30', 'Đồ án: tổng hợp tiến độ, chuẩn bị phần tuần tới', 'Project'],
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

const tracks = [
  {
    id: 'ai-engineer-2m',
    label: 'AI Engineer · 2 tháng',
    eyebrow: '8 tuần · AI Engineer project',
    title: 'Lộ trình AI Engineer trong 2 tháng',
    goal: 'Xây một sản phẩm AI chạy được, đánh giá chất lượng và giải thích các quyết định kỹ thuật qua từng tuần.',
    accent: '#0f766e',
    daily: [
      ['75–90 phút · 5 ngày/tuần', 'Project: mỗi buổi hoàn thành một phần chạy được, có commit và cập nhật README.'],
      ['Chủ nhật · 30 phút', 'Review tuần: demo đầu ra và chọn việc quan trọng nhất cho tuần sau.'],
    ],
    metrics: [
      ['Portfolio', '1 ứng dụng AI có API, eval, Docker và README'],
    ],
    resources: [
      ['Google ML Crash Course', 'https://developers.google.com/machine-learning/crash-course/'],
      ['PyTorch Tutorials', 'https://pytorch.org/tutorials/'],
      ['Hugging Face LLM Course', 'https://huggingface.co/learn/llm-course/chapter1/1'],
    ],
    months: [
      {
        name: 'Tháng 1 · Nền tảng và ML chạy được',
        focus: 'Python, dữ liệu, mô hình nền và API đầu tiên',
        outcome: 'Có baseline ML chạy được qua API và cách đánh giá trên dữ liệu chưa thấy.',
        weeks: [
          ['Tuần 1', 'Python, NumPy và Git', [
            'Project: tạo repo, môi trường Python, cấu trúc src/tests/data và README; nạp một dataset công khai.',
            'Đầu ra: script đọc và kiểm tra dữ liệu, có README hướng dẫn chạy.',
          ]],
          ['Tuần 2', 'Làm sạch và phân tích dữ liệu', [
            'Project: làm sạch dữ liệu, phân tích missing value/outlier, chia train/validation/test không rò rỉ dữ liệu.',
            'Đầu ra: notebook phân tích dữ liệu và ghi lý do chọn cách chia tập, metric, baseline.',
          ]],
          ['Tuần 3', 'Mô hình baseline', [
            'Project: huấn luyện baseline bằng scikit-learn; tạo pipeline preprocessing và lưu metric trên validation.',
            'Đầu ra: baseline tái lập được; giải thích được metric bằng ví dụ và có bảng kết quả ngắn.',
          ]],
          ['Tuần 4', 'API dự đoán', [
            'Project: đóng gói dự đoán thành FastAPI endpoint có validation đầu vào, xử lý lỗi và ví dụ gọi API.',
            'Đầu ra: API chạy local; so sánh baseline và phiên bản đã chỉnh bằng validation, không dùng test để chọn model.',
          ]],
        ],
      },
      {
        name: 'Tháng 2 · Deep Learning, LLM và triển khai',
        focus: 'PyTorch, embedding/RAG, đánh giá và vận hành',
        outcome: 'Có một ứng dụng hỏi đáp tài liệu chạy được, có bộ đánh giá nhỏ, được đóng gói và có giới hạn/chỉ số được ghi rõ.',
        weeks: [
          ['Tuần 5', 'PyTorch và neural network', [
            'Project: viết một MLP nhỏ bằng PyTorch; tập train/validation, lưu model và so với baseline scikit-learn.',
            'Đầu ra: notebook huấn luyện có seed, loss curve, metric và nhận xét overfitting.',
          ]],
          ['Tuần 6', 'Embedding và retrieval', [
            'Project: làm ingest tài liệu, chunking, embedding và retrieval top-k; giữ metadata nguồn cho từng đoạn.',
            'Đầu ra: demo tìm đoạn liên quan; đo retrieval trên câu hỏi đã gắn tài liệu đúng.',
          ]],
          ['Tuần 7', 'LLM/RAG và đánh giá', [
            'Project: kết nối LLM với retrieval, buộc câu trả lời nêu nguồn, xử lý câu không có bằng chứng và lỗi timeout.',
            'Đầu ra: báo cáo eval có ví dụ đúng/sai, giới hạn đã biết và một thay đổi dựa trên kết quả đo.',
          ]],
          ['Tuần 8', 'Đóng gói và portfolio', [
            'Project: Docker hóa ứng dụng, thêm logging cơ bản, cấu hình qua environment variables và viết hướng dẫn chạy.',
            'Đầu ra: demo 3–5 phút và README có kiến trúc, dữ liệu, eval, chi phí và giới hạn.',
          ]],
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
    const saved = JSON.parse(window.localStorage.getItem(progressKey)) ?? {}
    const oldTaskText = {
      'Đầu ra: script đọc và kiểm tra dữ liệu, có README hướng dẫn chạy.': 'Đầu ra: script đọc và kiểm tra dữ liệu; ghi lại lời giải, edge case và Big-O cho từng bài.',
      'Đầu ra: demo 3–5 phút và README có kiến trúc, dữ liệu, eval, chi phí và giới hạn.': 'Đầu ra: demo 3–5 phút, README có kiến trúc/dữ liệu/eval/chi phí/giới hạn; 2 mock interview và kế hoạch học tiếp.',
    }
    const kept = {}

    for (const month of tracks[0].months) {
      for (const [weekName, , tasks] of month.weeks) {
        for (const task of tasks) {
          const id = makeTaskId(tracks[0].id, month.name, weekName, task)
          const oldId = makeTaskId(tracks[0].id, month.name, weekName, oldTaskText[task] ?? task)
          if (saved[id] || saved[oldId]) kept[id] = true
        }
      }
    }

    return kept
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

    if (route === 'schedule' || route === 'exhibitflow' || route === 'ai-engineer' || route === 'daily-practice') return route

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
      if (route === 'schedule' || route === 'exhibitflow' || route === 'ai-engineer' || route === 'daily-practice') {
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
  const visibleTrackSummaries = trackSummaries
  const isSchedulePage = activeTrackId === 'schedule'
  const isProjectPage = activeTrackId === 'exhibitflow'
  const isAiEngineerPage = activeTrackId === 'ai-engineer'
  const isDailyPracticePage = activeTrackId === 'daily-practice'

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
          <h1>Roadmap 2 tháng</h1>
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
          <button
            className={isAiEngineerPage ? 'active' : ''}
            onClick={() => navigate('ai-engineer')}
            style={{ '--accent': '#0f766e' }}
            type="button"
          >
            AI Engineer
          </button>
          <button
            className={isDailyPracticePage ? 'active' : ''}
            onClick={() => navigate('daily-practice')}
            style={{ '--accent': '#2563eb' }}
            type="button"
          >
            LeetCode + IELTS mỗi ngày
          </button>
          {visibleTrackSummaries.map((track) => (
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
        {isDailyPracticePage ? (
          <DailyPractice />
        ) : isAiEngineerPage ? (
          <AiEngineerGlossary />
        ) : isProjectPage ? (
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
            tracks={visibleTrackSummaries}
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
          <h2>Khang học AI Engineer trong 2 tháng</h2>
          <p>
            Dự án AI được chia thành 8 tuần với checklist và đầu ra cụ thể.
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
        <article className="overview-card ai-engineer-overview-card">
          <span>8 tuần · AI Engineer project</span>
          <h3>AI Engineer · 2 tháng</h3>
          <p>
            Xây một ứng dụng AI có API, đánh giá, Docker và README.
          </p>
          <div className="commitment-preview">
            <small><b>Mỗi tuần</b>Đầu ra project có thể kiểm tra</small>
            <small><b>Mục tiêu</b>1 project portfolio hoàn chỉnh</small>
          </div>
          <div className="card-footer">
            <small>8 tuần · checklist lưu trên máy</small>
            <button onClick={() => onOpenTrack('ai-engineer-2m')} type="button">Mở lộ trình</button>
          </div>
        </article>
        <article className="overview-card ai-engineer-overview-card">
          <span>AI learning guide</span>
          <h3>AI Engineer</h3>
          <p>
            Tra cứu thuật ngữ từ dữ liệu và machine learning đến LLM, RAG, đánh giá và triển khai.
            Có tìm kiếm nhanh, lọc theo nhóm kiến thức và liên kết tài liệu học tiếp.
          </p>
          <div className="commitment-preview">
            <small><b>190 thuật ngữ</b>Định nghĩa ngắn, có ví dụ và lưu ý khi áp dụng</small>
            <small><b>Lộ trình tham khảo</b>Dữ liệu → ML → deep learning → LLM → vận hành</small>
          </div>
          <div className="card-footer">
            <small>Glossary · 190 thuật ngữ</small>
            <button onClick={() => onOpenTrack('ai-engineer')} type="button">Mở kiến thức</button>
          </div>
        </article>
        <article className="overview-card practice-overview-card">
          <span>28 ngày · 1 bài LeetCode/ngày</span>
          <h3>LeetCode + IELTS mỗi ngày</h3>
          <p>06:00–07:30 học Listening, Reading, Shadowing, Speaking theo từng bài lẻ; 22:30–23:30 giải một bài LeetCode.</p>
          <div className="card-footer">
            <small>Checklist 28 ngày lưu trên máy</small>
            <button onClick={() => onOpenTrack('daily-practice')} type="button">Mở lộ trình</button>
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
          <span>Nhịp học mỗi ngày</span>
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
