# Cẩm nang thuật ngữ AI Engineer

Tài liệu nhập môn dành cho người muốn xây dựng, đánh giá và đưa hệ thống AI vào sử dụng. Mỗi mục trả lời ngắn gọn: thuật ngữ nghĩa là gì, dùng ở đâu và cần nhớ điều gì.

> **Thứ tự học gợi ý:** lập trình và dữ liệu → ML căn bản → deep learning → LLM và ứng dụng → triển khai, đánh giá, vận hành. Không cần học thuộc mọi công thức trước khi bắt đầu làm dự án.

## 1. Nền tảng dữ liệu và lập trình

1. **Dataset (tập dữ liệu):** Tập hợp ví dụ dùng để huấn luyện hoặc đánh giá mô hình. Mỗi dòng thường là một ví dụ; cần hiểu dữ liệu được thu thập ra sao, đại diện cho ai và có được phép sử dụng không.
2. **Sample / Example (mẫu):** Một đơn vị dữ liệu, chẳng hạn một email, một ảnh hoặc một giao dịch.
3. **Feature (đặc trưng):** Thông tin đầu vào mà mô hình dùng để dự đoán, ví dụ số lần đăng nhập hoặc độ dài văn bản.
4. **Label / Target (nhãn / mục tiêu):** Đáp án cần dự đoán, ví dụ email “spam” hay “không spam”. Dữ liệu không có nhãn vẫn có thể dùng cho học không giám sát hoặc tự giám sát.
5. **Structured / unstructured data (dữ liệu có cấu trúc / phi cấu trúc):** Dữ liệu có cấu trúc có trường rõ ràng như bảng SQL; dữ liệu phi cấu trúc gồm văn bản, ảnh, âm thanh. Một hệ thống AI thực tế thường phải chuẩn hóa và kết hợp nhiều dạng dữ liệu.
6. **ETL / ELT:** Quy trình trích xuất dữ liệu, biến đổi và nạp vào nơi lưu trữ (hoặc nạp trước rồi biến đổi). Đây là cách đưa dữ liệu nguồn thành dữ liệu có thể dùng ổn định.
7. **Data cleaning (làm sạch dữ liệu):** Xử lý giá trị thiếu, bản ghi trùng, định dạng sai, ngoại lệ và nhãn lỗi. Chất lượng dữ liệu kém thường làm giới hạn chất lượng mô hình.
8. **Data leakage (rò rỉ dữ liệu):** Thông tin mà mô hình không thể biết tại thời điểm dự đoán lọt vào tập huấn luyện hoặc đánh giá, khiến kết quả trông cao giả tạo. Ví dụ dùng trạng thái “đã hoàn tiền” để dự báo liệu giao dịch ban đầu có gian lận hay không.
9. **Data split (chia dữ liệu):** Tách dữ liệu thành tập train, validation và test để huấn luyện, chọn mô hình và ước lượng chất lượng cuối cùng. Với chuỗi thời gian, thường chia theo thời điểm thay vì xáo trộn ngẫu nhiên.
10. **SQL:** Ngôn ngữ truy vấn cơ sở dữ liệu quan hệ; AI Engineer dùng để lấy, nối, tổng hợp và kiểm tra dữ liệu.
11. **Python:** Ngôn ngữ phổ biến cho ML/AI nhờ hệ sinh thái thư viện; cần nắm hàm, lớp, môi trường ảo, xử lý lỗi, đọc file, API và kiểm thử cơ bản.
12. **NumPy / pandas:** NumPy hỗ trợ tính toán mảng số; pandas hỗ trợ bảng dữ liệu và thao tác làm sạch, nhóm, nối dữ liệu.
13. **API (giao diện lập trình ứng dụng):** Hợp đồng cho phép các phần mềm gọi chức năng của nhau. API suy luận thường nhận dữ liệu đầu vào có cấu trúc và trả dự đoán, lỗi hoặc trạng thái.
14. **Git:** Hệ thống quản lý phiên bản giúp theo dõi thay đổi mã và cộng tác. Mô hình, dữ liệu lớn và bí mật thường cần quản lý bằng cơ chế phù hợp thay vì đưa thẳng vào Git.

## 2. Machine Learning căn bản

15. **Artificial Intelligence (AI):** Tên gọi rộng cho hệ thống thực hiện tác vụ thường đòi hỏi năng lực thông minh, như nhận biết, lập luận hoặc tạo nội dung.
16. **Machine Learning (ML):** Nhánh AI trong đó hệ thống rút ra quy luật từ dữ liệu để dự đoán hoặc ra quyết định, thay vì viết thủ công mọi quy tắc.
17. **Supervised learning (học có giám sát):** Học từ các ví dụ có đầu vào và nhãn; ví dụ phân loại ảnh mèo/chó hoặc dự đoán giá nhà.
18. **Unsupervised learning (học không giám sát):** Tìm cấu trúc trong dữ liệu chưa có nhãn, chẳng hạn phân cụm khách hàng. Phân cụm cho ra nhóm theo tiêu chí toán học, không tự chứng minh nhóm đó có ý nghĩa nghiệp vụ.
19. **Self-supervised learning (học tự giám sát):** Tạo mục tiêu học từ chính dữ liệu, chẳng hạn che một phần câu rồi yêu cầu mô hình dự đoán phần bị che. Cách này giúp tận dụng lượng lớn dữ liệu chưa gắn nhãn.
20. **Reinforcement learning (học tăng cường):** Tác nhân thử hành động trong môi trường, nhận thưởng/phạt và học chính sách giúp tối đa hóa tổng phần thưởng về sau.
21. **Classification (phân loại):** Dự đoán một hay nhiều lớp rời rạc, như “gian lận” hoặc “không gian lận”.
22. **Regression (hồi quy):** Dự đoán giá trị số liên tục, như nhu cầu bán hàng hoặc thời gian giao hàng.
23. **Clustering (phân cụm):** Gom các mẫu tương tự theo biểu diễn và độ đo đã chọn; kết quả phụ thuộc vào cách biểu diễn, thuật toán và số cụm.
24. **Model (mô hình):** Cấu trúc tính toán cùng các tham số đã học, biến đầu vào thành dự đoán hoặc nội dung.
25. **Training / inference (huấn luyện / suy luận):** Huấn luyện điều chỉnh tham số từ dữ liệu; suy luận dùng mô hình đã huấn luyện để tạo kết quả cho đầu vào mới.
26. **Loss function (hàm mất mát):** Đại lượng mà quá trình tối ưu cố gắng giảm; loss nhỏ hơn không tự động đồng nghĩa mô hình tốt hơn với người dùng.
27. **Gradient descent (hạ gradient):** Họ phương pháp cập nhật tham số theo hướng làm giảm loss; learning rate quyết định bước cập nhật lớn hay nhỏ.
28. **Learning rate (tốc độ học):** Siêu tham số điều khiển độ lớn bước cập nhật. Quá lớn dễ dao động hoặc không hội tụ; quá nhỏ làm học chậm.
29. **Epoch / batch / iteration:** Epoch là một lượt đi qua toàn bộ dữ liệu huấn luyện; batch là một nhóm mẫu xử lý cùng lúc; iteration là một lần cập nhật tham số.
30. **Hyperparameter (siêu tham số):** Cài đặt do người phát triển chọn thay vì được học trực tiếp từ dữ liệu, như learning rate, batch size hoặc số tầng.
31. **Overfitting (quá khớp):** Mô hình làm tốt trên dữ liệu huấn luyện nhưng kém trên dữ liệu mới vì học cả chi tiết riêng hoặc nhiễu. Phát hiện bằng đánh giá đúng cách trên dữ liệu chưa dùng để huấn luyện.
32. **Underfitting (chưa khớp):** Mô hình quá đơn giản, đặc trưng kém hoặc chưa được huấn luyện đủ nên không nắm được quy luật ngay cả trên tập huấn luyện.
33. **Regularization (điều chuẩn):** Kỹ thuật hạn chế mô hình quá phức tạp để cải thiện khả năng tổng quát hóa; ví dụ L1/L2, dropout hoặc dừng sớm.
34. **Generalization (khả năng tổng quát hóa):** Khả năng hoạt động tốt trên dữ liệu mới có liên quan với dữ liệu phát triển. Đây là mục tiêu thực tế hơn việc chỉ đạt điểm cao trên tập train.
35. **Class imbalance (mất cân bằng lớp):** Một số lớp có ít ví dụ hơn nhiều so với lớp khác. Accuracy có thể đánh lừa; cần xem recall, precision, cách lấy mẫu và chi phí từng loại lỗi.
36. **Confusion matrix (ma trận nhầm lẫn):** Bảng đếm dự đoán đúng/sai theo từng lớp, gồm true positive, false positive, true negative và false negative.
37. **Precision (độ chính xác dương):** Trong các dự đoán là dương tính, tỷ lệ thực sự dương tính: TP / (TP + FP). Hữu ích khi báo động giả gây tốn kém.
38. **Recall (độ bao phủ):** Trong các trường hợp thực sự dương tính, tỷ lệ được tìm thấy: TP / (TP + FN). Hữu ích khi bỏ sót trường hợp dương tính gây hại.
39. **F1 score:** Trung bình điều hòa giữa precision và recall; có ích khi cần cân bằng cả hai, nhưng không thay thế quyết định theo chi phí nghiệp vụ.
40. **Baseline (mốc so sánh):** Giải pháp đơn giản hoặc hiện có để so với mô hình mới. Không có baseline thì khó biết mô hình phức tạp có tạo ra giá trị thật hay không.
41. **Cross-validation (kiểm định chéo):** Chia dữ liệu thành nhiều lượt train/validation để ước lượng độ ổn định khi dữ liệu ít. Vẫn cần giữ test set độc lập để đánh giá cuối.

## 3. Deep Learning

42. **Neural network (mạng nơ-ron):** Mô hình gồm các phép biến đổi có tham số xếp thành lớp; huấn luyện điều chỉnh trọng số để giảm loss.
43. **Tensor:** Mảng nhiều chiều dùng để biểu diễn dữ liệu và tính toán trong thư viện deep learning; ảnh thường là tensor chiều cao × rộng × kênh màu.
44. **Layer (lớp):** Một phép biến đổi trong mạng, ví dụ phép chiếu tuyến tính, convolution hoặc attention.
45. **Activation function (hàm kích hoạt):** Hàm phi tuyến như ReLU, sigmoid hoặc softmax; giúp mạng học được quan hệ phức tạp hơn phép biến đổi tuyến tính đơn thuần.
46. **Backpropagation (lan truyền ngược):** Tính gradient của loss theo tham số bằng quy tắc dây chuyền, để optimizer biết cần cập nhật trọng số theo hướng nào.
47. **Autograd (tự động vi phân):** Cơ chế của framework như PyTorch tự ghi nhận phép tính và tính gradient; thuận tiện để huấn luyện nhưng cần theo dõi bộ nhớ và đồ thị tính toán.
48. **Optimizer (bộ tối ưu):** Thuật toán cập nhật tham số dựa trên gradient, ví dụ SGD hoặc Adam. Đây là thành phần của quá trình học, không phải một metric đánh giá.
49. **GPU / accelerator:** Phần cứng tăng tốc phép tính song song. Dùng GPU có thể nhanh hơn nhưng cần cân nhắc bộ nhớ, chi phí truyền dữ liệu và kích thước batch.
50. **Transfer learning (học chuyển giao):** Dùng mô hình đã học từ dữ liệu lớn làm điểm xuất phát cho tác vụ mới; thường tiết kiệm dữ liệu và tài nguyên hơn huấn luyện từ đầu.
51. **Fine-tuning (tinh chỉnh):** Tiếp tục huấn luyện mô hình đã có bằng dữ liệu/tác vụ mục tiêu để điều chỉnh hành vi hoặc năng lực.

## 4. NLP, LLM và ứng dụng tạo sinh

52. **NLP (xử lý ngôn ngữ tự nhiên):** Lĩnh vực giúp máy xử lý và tạo ngôn ngữ con người, gồm phân loại, tìm kiếm, trích xuất thông tin, dịch và hỏi đáp.
53. **Token / tokenization (token / phân tách token):** Token là đơn vị mà mô hình ngôn ngữ đọc/ghi; token có thể là từ, một phần từ hoặc ký hiệu. Token không đồng nhất với từ hay ký tự, và cách chia phụ thuộc tokenizer.
54. **Embedding (vector nhúng):** Vector số biểu diễn nội dung sao cho nội dung liên quan thường gần nhau theo một độ đo đã chọn. Dùng cho tìm kiếm ngữ nghĩa, phân cụm và gợi ý.
55. **Transformer:** Kiến trúc mạng dùng attention để kết hợp thông tin giữa các token; là nền tảng của phần lớn LLM hiện nay.
56. **Attention / self-attention:** Cơ chế giúp mô hình cân nhắc các vị trí liên quan khi xử lý một vị trí hiện tại. Trong self-attention, các token trong cùng chuỗi có thể tham chiếu lẫn nhau theo mặt nạ được thiết kế.
57. **LLM (mô hình ngôn ngữ lớn):** Mô hình được huấn luyện trên lượng văn bản lớn để dự đoán/tiếp tục chuỗi token và có thể thích nghi với nhiều tác vụ ngôn ngữ.
58. **Pretraining (tiền huấn luyện):** Giai đoạn học biểu diễn/quy luật tổng quát từ dữ liệu lớn trước khi thích nghi cho tác vụ cụ thể.
59. **Prompt / system instruction:** Prompt là đầu vào văn bản hoặc đa phương thức của mô hình; system instruction đặt vai trò và ràng buộc cấp cao cho một phiên. Prompt tốt nêu mục tiêu, ngữ cảnh, định dạng đầu ra và giới hạn rõ ràng.
60. **Context window (cửa sổ ngữ cảnh):** Lượng token đầu vào/đầu ra mô hình có thể xử lý trong một lượt theo giới hạn của model. Tài liệu dài có thể vượt giới hạn hoặc làm tăng độ trễ/chi phí.
61. **Temperature:** Tham số lấy mẫu ảnh hưởng độ ngẫu nhiên khi sinh token. Giá trị thấp thường cho kết quả ổn định hơn, nhưng không bảo đảm đúng; nên đánh giá trên tác vụ thực tế.
62. **Hallucination (bịa đặt thông tin):** Nội dung do mô hình tạo ra nghe hợp lý nhưng sai hoặc không được nguồn hỗ trợ. Cần giảm rủi ro bằng truy xuất nguồn, ràng buộc đầu ra và đánh giá, không chỉ bằng prompt.
63. **RAG (Retrieval-Augmented Generation):** Quy trình tìm các đoạn tài liệu liên quan rồi đưa chúng vào ngữ cảnh để LLM trả lời dựa trên nguồn. RAG cập nhật kiến thức bên ngoài mà không cần huấn luyện lại mô hình, nhưng chất lượng phụ thuộc truy xuất và chất lượng tài liệu.
64. **Chunking (chia đoạn):** Chia tài liệu thành phần nhỏ để lập chỉ mục và truy xuất. Đoạn quá ngắn mất ngữ cảnh, quá dài chứa nhiều nội dung nhiễu; cần thử nghiệm theo dạng tài liệu và câu hỏi.
65. **Vector database / vector store:** Kho lưu vector và metadata, hỗ trợ tìm các vector gần truy vấn. Trong ứng dụng thực tế thường kết hợp tìm kiếm từ khóa, bộ lọc metadata và quyền truy cập.
66. **Semantic search (tìm kiếm ngữ nghĩa):** Tìm theo ý nghĩa gần đúng thông qua embedding, thay vì chỉ khớp từ khóa chính xác. Có thể bỏ sót tên riêng/mã số, nên tìm kiếm lai thường hữu ích.
67. **Reranking (xếp hạng lại):** Dùng mô hình thứ hai chấm điểm và sắp xếp lại kết quả truy xuất để đưa đoạn hữu ích lên trên; cải thiện chất lượng nhưng tăng thời gian và chi phí.
68. **Tool / function calling:** Mô hình tạo yêu cầu gọi một công cụ theo schema; ứng dụng của bạn thực thi hàm và gửi kết quả lại. Mô hình không tự chạy hàm chỉ vì đã mô tả nó trong prompt.
69. **AI agent (tác tử AI):** Ứng dụng cho phép mô hình chọn bước tiếp theo, gọi công cụ, quan sát kết quả và tiếp tục đến khi hoàn tất hoặc cần dừng. Cần giới hạn quyền, thời gian, ngân sách và điều kiện dừng.
70. **Structured output (đầu ra có cấu trúc):** Ép hoặc hướng dẫn mô hình trả theo schema, như JSON với trường và kiểu dữ liệu quy định. Vẫn phải xác thực kết quả và xử lý trường hợp lỗi.
71. **Multimodal AI (AI đa phương thức):** Hệ thống nhận hoặc tạo nhiều dạng dữ liệu như văn bản, ảnh, âm thanh hay video. Cần hiểu giới hạn riêng của từng modality, không giả định chúng được xử lý giống nhau.
72. **Fine-tuning so với RAG:** Fine-tuning thay đổi tham số mô hình để điều chỉnh hành vi; RAG truy xuất dữ liệu ngoài ở thời điểm trả lời. Fine-tuning không phải cách đáng tin cậy để lưu kho kiến thức cần cập nhật thường xuyên.
73. **Guardrails (rào chắn):** Kiểm tra đầu vào/đầu ra và quyền hành động để giảm nội dung không phù hợp, lộ dữ liệu hoặc thao tác nguy hiểm. Đây là một lớp bảo vệ trong thiết kế hệ thống, không phải bảo đảm an toàn tuyệt đối.
74. **Prompt injection:** Nội dung không đáng tin trong prompt hoặc tài liệu truy xuất cố lừa mô hình bỏ qua chỉ dẫn hay làm hành động ngoài ý muốn. Xem dữ liệu người dùng và tài liệu truy xuất là không đáng tin; kiểm soát quyền ở lớp ứng dụng.

## 5. Đánh giá, triển khai và vận hành

75. **Evaluation / eval (đánh giá):** Đo chất lượng hệ thống bằng bộ ví dụ, tiêu chí và cách chấm phù hợp với người dùng. Với LLM, nên kết hợp bộ kiểm thử cố định, kiểm tra nguồn, chấm theo rubric và rà soát con người.
76. **Offline / online evaluation:** Offline đánh giá trên dữ liệu lưu sẵn trước phát hành; online đo trong luồng sử dụng thật. Cả hai cần theo dõi chất lượng, lỗi, độ trễ và chi phí.
77. **MLOps:** Thực hành quản lý toàn vòng đời ML: dữ liệu, huấn luyện, phiên bản, triển khai, giám sát và tái huấn luyện. Mục tiêu là hệ thống có thể tái lập và vận hành ổn định.
78. **Experiment tracking (theo dõi thí nghiệm):** Lưu cấu hình, phiên bản dữ liệu/mã, metric và artifact của từng lần thử để so sánh và tái lập kết quả.
79. **Model registry (sổ đăng ký mô hình):** Nơi quản lý phiên bản mô hình, trạng thái và metadata như bản thử nghiệm hoặc bản phát hành.
80. **Model serving (phục vụ mô hình):** Đưa mô hình ra giao diện gọi được, thường qua HTTP API hoặc xử lý batch; cần xử lý xác thực, timeout, tải đồng thời và lỗi.
81. **Batch inference / online inference:** Batch xử lý nhiều ví dụ theo lịch; online inference xử lý yêu cầu tương tác từng lúc. Chọn kiểu phù hợp với yêu cầu độ trễ và tính mới của dữ liệu.
82. **Latency / throughput:** Latency là thời gian một yêu cầu hoàn tất; throughput là số yêu cầu xử lý mỗi đơn vị thời gian. Tối ưu một chỉ số có thể ảnh hưởng chỉ số kia.
83. **Monitoring (giám sát):** Theo dõi độ trễ, lỗi, tải, chi phí, chất lượng và thay đổi dữ liệu/mô hình sau khi phát hành. Metric kỹ thuật tốt không thay thế chỉ số kết quả nghiệp vụ.
84. **Data drift / concept drift:** Data drift là phân phối đầu vào đổi; concept drift là quan hệ giữa đầu vào và mục tiêu đổi. Chúng có thể làm mô hình suy giảm và cần được phát hiện bằng giám sát, kiểm tra nhãn hoặc đánh giá định kỳ.
85. **A/B test:** So sánh hai phiên bản trên nhóm người dùng được phân chia có kiểm soát; cần xác định trước chỉ số chính, thời gian và cách tránh kết luận từ nhiễu.
86. **Canary / rollback:** Canary phát hành phiên bản mới cho một phần nhỏ lưu lượng trước; rollback quay về bản ổn định nếu gặp vấn đề. Đây là cơ chế giảm ảnh hưởng của lỗi triển khai.
87. **Docker / container:** Đóng gói ứng dụng cùng các phụ thuộc trong môi trường nhất quán để chạy giữa máy phát triển và môi trường triển khai.
88. **CI/CD:** Tự động hóa kiểm tra và phát hành thay đổi. Pipeline AI thường cần thêm kiểm tra dữ liệu, metric, artifact và tương thích mô hình bên cạnh kiểm thử mã.
89. **Scalability (khả năng mở rộng):** Khả năng phục vụ tải lớn hơn bằng tăng tài nguyên hoặc thêm máy. Mô hình lớn có thể bị giới hạn bởi GPU, bộ nhớ, băng thông và chi phí.
90. **Cost per request (chi phí mỗi yêu cầu):** Chi phí trung bình để xử lý một yêu cầu, gồm token/API, phần cứng, truy xuất và vận hành. Nên đo trên lưu lượng thực tế và đặt ngân sách.

## 6. Lộ trình thực hành

1. **Bắt đầu với Python, SQL và Git:** đọc một bộ dữ liệu, làm sạch và viết script tái lập được.
2. **Làm một bài toán ML nhỏ:** phân loại hoặc hồi quy; chia train/validation/test đúng cách, lập baseline và chọn metric theo chi phí sai.
3. **Học PyTorch:** tensor, autograd, vòng lặp huấn luyện, lưu và nạp mô hình.
4. **Xây một ứng dụng LLM có đánh giá:** ví dụ hỏi đáp trên tài liệu; triển khai truy xuất, kiểm tra nguồn, bộ câu hỏi đánh giá và xử lý câu không có đáp án.
5. **Đưa ứng dụng thành API:** container hóa, log lỗi, đo latency và chi phí; thử triển khai canary/rollback.
6. **Viết README cho từng dự án:** nêu vấn đề, dữ liệu, baseline, cách đánh giá, giới hạn và cách chạy. Portfolio cần cho thấy bạn giải quyết vấn đề có đo lường, không chỉ gọi một API.

## Tài liệu chính thức để học tiếp

- [Google Machine Learning Crash Course — Fundamentals và Glossary](https://developers.google.com/machine-learning/crash-course) — dữ liệu, loss, overfitting, đánh giá và các khái niệm ML nền tảng.
- [Google Machine Learning Glossary](https://developers.google.com/machine-learning/glossary) — tra thuật ngữ ML.
- [PyTorch — Autograd mechanics](https://docs.pytorch.org/docs/stable/notes/autograd.html) — đồ thị tính toán và gradient.
- [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1) — Transformers, tokenizer, fine-tuning và công cụ LLM.
- [OpenAI API — Evals](https://platform.openai.com/docs/guides/evals) — thiết kế đánh giá mô hình.
- [OpenAI API — File Search](https://platform.openai.com/docs/guides/tools-file-search) — truy xuất tài liệu và vector stores.
- [OpenAI API — Function calling](https://platform.openai.com/docs/guides/function-calling) — kết nối mô hình với công cụ trong ứng dụng.

---

**Ghi chú:** Công việc AI Engineer thay đổi theo nhóm sản phẩm. Các mục trong tài liệu là nền tảng chung; hãy ưu tiên các mục gắn với bài toán, dữ liệu và môi trường triển khai bạn muốn làm.
