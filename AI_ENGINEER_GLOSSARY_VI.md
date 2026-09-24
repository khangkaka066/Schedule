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

## 5. Thuật ngữ chuyên sâu về LLM

75. **Foundation model (mô hình nền tảng):** Mô hình được tiền huấn luyện trên dữ liệu rộng để có thể thích nghi với nhiều tác vụ. Tên gọi này không đảm bảo mô hình luôn đúng hoặc an toàn.
76. **Base model (mô hình gốc):** Mô hình sau tiền huấn luyện, thường giỏi tiếp tục văn bản nhưng chưa chắc làm theo chỉ dẫn hội thoại ổn định.
77. **Instruction-tuned model (mô hình tinh chỉnh theo chỉ dẫn):** Base model được huấn luyện thêm trên ví dụ yêu cầu và câu trả lời để phản hồi theo dạng trợ lý.
78. **Causal language model:** Mô hình dự đoán token kế tiếp dựa trên các token đứng trước; mặt nạ causal ngăn nó nhìn trước đáp án khi huấn luyện.
79. **Chat template (mẫu hội thoại):** Quy tắc biến danh sách thông điệp thành chuỗi token đúng định dạng model đã học. Sai template có thể làm chất lượng giảm.
80. **Message role (vai trò thông điệp):** Nhãn như system, developer, user, assistant hoặc tool biểu thị nguồn và chức năng của thông điệp; cách mã hóa tùy model/API.
81. **Control token (token điều khiển):** Token đặc biệt đánh dấu ranh giới thông điệp, kênh, lời gọi công cụ hoặc trạng thái kết thúc.
82. **BOS / EOS:** Begin-of-sequence đánh dấu đầu chuỗi; end-of-sequence đánh dấu kết thúc. Token kết thúc thông điệp và kết thúc lượt assistant có thể khác nhau.
83. **Padding token:** Token đệm để các chuỗi có cùng độ dài trong batch; cần attention mask đúng để model bỏ qua phần đệm.
84. **Attention mask:** Mặt nạ quy định vị trí token nào được tham gia attention, thường để che padding hoặc token tương lai.
85. **Vocabulary (bộ từ vựng token):** Tập token mà tokenizer ánh xạ từ văn bản. Các model khác nhau có thể chia cùng câu thành số token khác nhau.
86. **BPE (Byte Pair Encoding):** Thuật toán token hóa bằng cách ghép các cặp đơn vị thường gặp, tạo token con để xử lý từ chưa thấy.
87. **SentencePiece:** Bộ công cụ học đơn vị token trực tiếp từ văn bản thô; thường gặp các biến thể unigram và BPE.
88. **Tokenization mismatch:** Lệch giữa cách prompt/dữ liệu được token hóa với định dạng model mong đợi, có thể gây sai ranh giới hoặc giảm chất lượng.
89. **Logits:** Điểm chưa chuẩn hóa mà model gán cho từng token ứng viên kế tiếp; sampling biến đổi các điểm này trước khi chọn token.
90. **Softmax:** Phép đổi logits thành phân phối xác suất tổng bằng 1. Xác suất cao nhất không có nghĩa câu trả lời đúng.
91. **Autoregressive generation:** Sinh từng token rồi dùng token mới làm đầu vào cho bước sau; câu trả lời dài thường tốn thời gian hơn.
92. **Greedy decoding:** Mỗi bước chọn token điểm cao nhất; ổn định nhưng có thể mắc vào lựa chọn cục bộ hoặc lặp.
93. **Top-k sampling:** Chỉ lấy mẫu trong k token điểm cao nhất; k thấp giới hạn lựa chọn mạnh hơn.
94. **Top-p / nucleus sampling:** Lấy mẫu từ tập token nhỏ nhất có xác suất cộng dồn đạt ngưỡng p; kích thước tập thay đổi theo từng bước.
95. **Repetition penalty:** Điều chỉnh điểm token đã xuất hiện để giảm lặp; đặt quá mạnh có thể làm hỏng tên riêng hoặc cấu trúc cần lặp.
96. **Stop sequence:** Token/chuỗi khiến quá trình sinh dừng; nên đặt theo ranh giới giao thức để không cắt giữa JSON hay câu trả lời.
97. **Constrained decoding:** Giới hạn token sinh ra để đầu ra theo schema/ngữ pháp. Định dạng hợp lệ không đồng nghĩa nội dung đúng.
98. **Beam search:** Giữ nhiều chuỗi ứng viên qua từng bước rồi chọn chuỗi có điểm tổng thể cao; phù hợp một số bài toán nhưng không mặc định tốt hơn sampling cho hội thoại.
99. **Random seed:** Hạt giống bộ sinh số ngẫu nhiên để hỗ trợ tái lập sampling; không bảo đảm đầu ra giống hệt giữa phần cứng hoặc backend.
100. **Multi-Head Attention (MHA):** Tính nhiều attention head song song để học các quan hệ khác nhau; key/value head riêng có thể làm KV cache lớn.
101. **Q, K, V projections:** Query là thông tin cần tìm, Key là chỉ dấu nội dung có thể được chú ý, Value là nội dung được trộn vào đầu ra.
102. **Grouped-Query Attention (GQA):** Nhiều query head chia sẻ nhóm key/value head, giảm bộ nhớ cache so với MHA.
103. **Multi-Query Attention (MQA):** Mọi query head dùng chung một key và value head; giảm cache mạnh hơn GQA nhưng có thể giảm chất lượng tùy model.
104. **Causal attention mask:** Mặt nạ tam giác cho token chỉ chú ý vị trí trước đó và chính nó, tránh rò rỉ token tương lai.
105. **RoPE (Rotary Position Embedding):** Mã hóa vị trí bằng phép quay trên query/key để attention mang thông tin thứ tự; mở rộng context phụ thuộc cách triển khai.
106. **Absolute positional embedding:** Cộng biểu diễn vị trí tuyệt đối vào token; là một họ mã hóa vị trí khác với RoPE.
107. **RMSNorm:** Biến thể chuẩn hóa theo căn bậc hai trung bình bình phương, thường không trừ mean; được dùng trong nhiều Transformer hiện đại.
108. **Residual connection:** Cộng đầu vào khối vào đầu ra khối, giúp tín hiệu và gradient đi qua mạng sâu.
109. **Feed-forward network / MLP block:** Khối tuyến tính và phi tuyến biến đổi từng vị trí token, bổ sung tính toán ngoài attention.
110. **Mixture of Experts (MoE):** Có nhiều mạng chuyên gia nhưng mỗi token chỉ kích hoạt một số chuyên gia; tổng tham số khác số tham số hoạt động mỗi token.
111. **Router / gating network:** Chọn chuyên gia xử lý token trong MoE; cần cân bằng tải để tránh một số chuyên gia bị quá tải hoặc ít được học.
112. **Active parameters:** Số tham số thực sự được dùng cho một token. Với MoE thường thấp hơn tổng tham số của model.
113. **KV cache:** Lưu Key/Value của token trước để không tính lại ở bước sinh sau; tăng tốc decode nhưng tốn VRAM theo context và số phiên.
114. **Prefill:** Pha đọc prompt và tính KV cache ban đầu; prompt dài thường làm tăng thời gian pha này.
115. **Decode:** Pha sinh token đầu ra từng bước từ KV cache; thường bị giới hạn bởi băng thông bộ nhớ và tính tuần tự.
116. **TTFT (time to first token):** Thời gian từ khi nhận yêu cầu đến token đầu tiên, gồm queue, prefill và xử lý hạ tầng.
117. **TPOT (time per output token):** Thời gian trung bình giữa các token sau token đầu tiên; phản ánh độ mượt khi stream.
118. **FlashAttention:** Thuật toán/kernel attention tối ưu truy cập bộ nhớ, giảm tensor trung gian và tăng tốc trên phần cứng phù hợp; không phải kiến trúc model.
119. **PagedAttention:** Quản lý KV cache theo block để giảm phân mảnh và cấp phát linh hoạt khi phục vụ nhiều yêu cầu.
120. **Continuous batching:** Thêm yêu cầu mới khi yêu cầu cũ kết thúc thay vì đợi cả batch; thường tăng thông lượng phục vụ.
121. **Prefix caching:** Tái sử dụng tính toán/KV cache cho các tiền tố prompt trùng nhau; chỉ có ích nếu prefix lặp thường xuyên.
122. **Speculative decoding:** Model nhỏ đề xuất token, model lớn kiểm tra song song; có thể tăng tốc trong khi giữ phân phối mục tiêu nếu triển khai đúng.
123. **Tokens per second:** Số token sinh mỗi giây; cần nói rõ tính theo từng yêu cầu hay toàn hệ thống, có bao gồm queue/prefill không.
124. **Full fine-tuning:** Cập nhật hầu hết/toàn bộ trọng số trên dữ liệu mục tiêu; linh hoạt nhưng cần nhiều VRAM, dữ liệu và lưu trữ checkpoint.
125. **SFT (supervised fine-tuning):** Huấn luyện trên ví dụ chỉ dẫn và câu trả lời để model học định dạng, tác vụ và hành vi mong muốn.
126. **Continued pretraining:** Tiếp tục mục tiêu tiền huấn luyện trên dữ liệu mới để model hấp thụ lĩnh vực/ngôn ngữ; khác SFT vốn dạy phản hồi theo yêu cầu.
127. **PEFT:** Nhóm cách tinh chỉnh chỉ cập nhật một phần nhỏ tham số hoặc thêm tham số phụ, giảm chi phí so với cập nhật toàn model.
128. **LoRA:** Đóng băng trọng số gốc và học hai ma trận hạng thấp biểu diễn phần cập nhật; adapter có thể lưu riêng.
129. **LoRA rank và alpha:** Rank điều khiển dung lượng adapter, alpha điều chỉnh tỉ lệ cập nhật; rank lớn hơn tốn tài nguyên hơn và không tự đảm bảo tốt hơn.
130. **QLoRA:** Huấn luyện LoRA trên trọng số gốc lượng tử hóa, thường 4-bit, để giảm bộ nhớ; cần kiểm tra kernel và chất lượng thực tế.
131. **Adapter:** Tham số bổ sung gắn vào model đã huấn luyện để thích nghi cho tác vụ, tránh lưu một bản đầy đủ cho mỗi biến thể.
132. **Prompt tuning:** Học embedding mềm được thêm vào đầu vào/tầng model; khác prompt engineering vì embedding được tối ưu bằng dữ liệu.
133. **Catastrophic forgetting:** Mất một phần năng lực cũ sau khi fine-tune lệch vào dữ liệu mới; cần kiểm tra cả tác vụ đích và năng lực nền.
134. **Data curation:** Chọn/lọc chất lượng, quyền sử dụng, độ đa dạng, bản sao và rủi ro riêng tư của dữ liệu huấn luyện.
135. **Deduplication:** Phát hiện và bỏ bản ghi trùng/gần trùng để hạn chế lặp, rò rỉ benchmark và ghi nhớ nguyên văn.
136. **Sequence packing:** Ghép ví dụ ngắn vào chuỗi để giảm padding; phải mask ranh giới để ví dụ không học lẫn nhau.
137. **Loss masking:** Chọn token nào được tính loss, chẳng hạn tính trên câu trả lời assistant mà bỏ prompt; mask sai làm sai mục tiêu học.
138. **Gradient accumulation:** Cộng gradient qua nhiều micro-batch rồi mới cập nhật để mô phỏng batch lớn khi VRAM hạn chế.
139. **Learning-rate warmup:** Tăng learning rate dần ở bước đầu để ổn định, rồi giảm theo lịch huấn luyện.
140. **Mixed-precision training:** Kết hợp nhiều kiểu số như FP16/BF16 và FP32 để giảm bộ nhớ/tăng tốc; cần theo dõi độ ổn định số học.
141. **BF16:** Kiểu số 16-bit có dải số mũ rộng gần FP32, thường ổn định hơn FP16 trong một số tác vụ; hỗ trợ tùy phần cứng.
142. **Quantization:** Lưu trọng số hoặc tính toán bằng ít bit hơn để giảm bộ nhớ và có thể tăng tốc; phải đo chất lượng, tốc độ và tương thích phần cứng.
143. **Post-training quantization (PTQ):** Lượng tử hóa model sau huấn luyện, đôi khi dùng tập calibration nhỏ, không cần huấn luyện đầy đủ lại.
144. **AWQ / GPTQ:** Các phương pháp lượng tử hóa trọng số LLM khác nhau về cách chọn/hiệu chỉnh; hiệu quả phụ thuộc model, kernel và phần cứng.
145. **Calibration data:** Dữ liệu đại diện để ước lượng activation/chọn tham số lượng tử; dữ liệu lệch miền có thể gây suy giảm lớn.
146. **Knowledge distillation:** Dạy model nhỏ từ đáp án hoặc phân phối của model lớn để giảm chi phí; model nhỏ không nhất thiết giữ mọi năng lực teacher.
147. **Perplexity:** Metric xác suất trên chuỗi kiểm tra; thấp hơn thường nghĩa model dự đoán chuỗi đó tốt hơn, nhưng không đo trực tiếp ích dụng hay độ đúng.
148. **Benchmark:** Bộ tác vụ, dữ liệu và quy tắc chấm để so model; cần công bố prompt, phiên bản và cách chấm mới so sánh được.
149. **Benchmark contamination:** Model đã gặp câu hỏi/đáp án benchmark trong dữ liệu huấn luyện, làm điểm đo cao nhưng không phản ánh tổng quát hóa.
150. **Golden set:** Bộ ví dụ chuẩn được rà soát để kiểm tra hồi quy khi đổi model, prompt, dữ liệu hoặc code.
151. **Exact match:** Yêu cầu đầu ra trùng đáp án chuẩn sau chuẩn hóa; hợp với đáp án cố định nhưng khắt khe với văn bản tự do.
152. **Pairwise evaluation:** So hai câu trả lời cho cùng câu hỏi theo rubric khi khó định nghĩa một đáp án duy nhất; cần kiểm soát thiên lệch vị trí.
153. **LLM-as-a-judge:** Dùng model khác chấm theo rubric; cần so với người chấm và để ý thiên lệch độ dài/văn phong.
154. **Pass@k:** Tỷ lệ bài mà ít nhất một trong k lần sinh vượt qua kiểm thử; phụ thuộc số mẫu và chất lượng test.
155. **Sparse retrieval:** Tìm bằng khớp từ khóa/trọng số thưa; hữu ích với tên riêng, mã lỗi và thuật ngữ chính xác.
156. **BM25:** Hàm xếp hạng tìm kiếm dùng tần suất từ, độ dài tài liệu và độ hiếm của từ; thường là baseline từ khóa tốt.
157. **Hybrid retrieval:** Kết hợp tìm từ khóa và vector để lấy cả kết quả chính xác lẫn gần nghĩa; cần hợp nhất hoặc xếp hạng lại.
158. **Recall@k:** Tỷ lệ tài liệu/đáp án liên quan xuất hiện trong k kết quả đầu; đo khả năng thu hồi, không đo thứ hạng tốt nhất.
159. **MRR:** Trung bình nghịch đảo thứ hạng của kết quả liên quan đầu tiên; điểm cao khi kết quả đúng gần đầu danh sách.
160. **nDCG:** Đo chất lượng xếp hạng có xét thứ tự và mức độ liên quan, phù hợp khi có nhiều mức nhãn.
161. **MMR:** Chọn kết quả vừa liên quan vừa ít trùng với kết quả đã chọn, giúp giảm các đoạn gần như giống nhau.
162. **Query rewriting:** Viết lại câu hỏi hội thoại thành truy vấn đủ ngữ cảnh; phải giữ ý định và thực thể quan trọng.
163. **HyDE:** Tạo đoạn trả lời giả định rồi dùng embedding của nó để truy xuất đoạn tương tự; nội dung giả định không phải bằng chứng.
164. **Parent-child retrieval:** Tìm bằng đoạn nhỏ chính xác rồi đưa thêm đoạn cha lớn hơn làm ngữ cảnh; phải giữ metadata nguồn.
165. **Contextual compression:** Rút gọn nội dung truy xuất theo câu hỏi trước khi đưa vào prompt; tránh loại bỏ điều kiện/ý phủ định quan trọng.
166. **Metadata filtering:** Lọc theo ngày, khách hàng, ngôn ngữ hoặc quyền trước/sau vector search; backend phải thực thi kiểm soát truy cập.
167. **Groundedness / faithfulness:** Đo mức câu trả lời được ngữ cảnh hỗ trợ; có trích nguồn vẫn có thể sai nếu nguồn lỗi thời hoặc không liên quan.
168. **Tool schema:** Khai báo tên hàm, ý nghĩa, kiểu và ràng buộc đối số để model phát yêu cầu có cấu trúc; backend vẫn phải xác thực.
169. **Tool execution protocol:** Nhận tool call, kiểm tra quyền/đầu vào, chạy ở ứng dụng rồi gửi kết quả về model; cần log và xử lý lỗi.
170. **Agent loop:** Model chọn hành động → công cụ chạy → nhận kết quả → model quyết định tiếp; nên giới hạn bước, thời gian, chi phí và quyền.
171. **Workflow và agent:** Workflow là chuỗi bước định trước; agent chọn bước kế dựa trên kết quả. Workflow dễ kiểm thử hơn, agent linh hoạt hơn nhưng khó dự đoán.
172. **Agent state:** Mục tiêu, công cụ đã gọi, kết quả và bước còn lại để tiếp tục công việc; không nên để lịch sử hội thoại dài là nơi lưu duy nhất.
173. **Short-term / long-term memory:** Bộ nhớ phiên và bộ nhớ qua nhiều phiên; chỉ lưu dữ liệu có mục đích, quyền phù hợp và cơ chế sửa/xóa.
174. **MCP (Model Context Protocol):** Giao thức mở chuẩn hóa cách ứng dụng AI kết nối nguồn dữ liệu/công cụ qua client/server; không tự cấp quyền an toàn cho công cụ.

## 6. Đánh giá, triển khai và vận hành

175. **Evaluation / eval (đánh giá):** Đo chất lượng hệ thống bằng bộ ví dụ, tiêu chí và cách chấm phù hợp với người dùng. Với LLM, nên kết hợp bộ kiểm thử cố định, kiểm tra nguồn, chấm theo rubric và rà soát con người.
176. **Offline / online evaluation:** Offline đánh giá trên dữ liệu lưu sẵn trước phát hành; online đo trong luồng sử dụng thật. Cả hai cần theo dõi chất lượng, lỗi, độ trễ và chi phí.
177. **MLOps:** Thực hành quản lý toàn vòng đời ML: dữ liệu, huấn luyện, phiên bản, triển khai, giám sát và tái huấn luyện. Mục tiêu là hệ thống có thể tái lập và vận hành ổn định.
178. **Experiment tracking (theo dõi thí nghiệm):** Lưu cấu hình, phiên bản dữ liệu/mã, metric và artifact của từng lần thử để so sánh và tái lập kết quả.
179. **Model registry (sổ đăng ký mô hình):** Nơi quản lý phiên bản mô hình, trạng thái và metadata như bản thử nghiệm hoặc bản phát hành.
180. **Model serving (phục vụ mô hình):** Đưa mô hình ra giao diện gọi được, thường qua HTTP API hoặc xử lý batch; cần xử lý xác thực, timeout, tải đồng thời và lỗi.
181. **Batch inference / online inference:** Batch xử lý nhiều ví dụ theo lịch; online inference xử lý yêu cầu tương tác từng lúc. Chọn kiểu phù hợp với yêu cầu độ trễ và tính mới của dữ liệu.
182. **Latency / throughput:** Latency là thời gian một yêu cầu hoàn tất; throughput là số yêu cầu xử lý mỗi đơn vị thời gian. Tối ưu một chỉ số có thể ảnh hưởng chỉ số kia.
183. **Monitoring (giám sát):** Theo dõi độ trễ, lỗi, tải, chi phí, chất lượng và thay đổi dữ liệu/mô hình sau khi phát hành. Metric kỹ thuật tốt không thay thế chỉ số kết quả nghiệp vụ.
184. **Data drift / concept drift:** Data drift là phân phối đầu vào đổi; concept drift là quan hệ giữa đầu vào và mục tiêu đổi. Chúng có thể làm mô hình suy giảm và cần được phát hiện bằng giám sát, kiểm tra nhãn hoặc đánh giá định kỳ.
185. **A/B test:** So sánh hai phiên bản trên nhóm người dùng được phân chia có kiểm soát; cần xác định trước chỉ số chính, thời gian và cách tránh kết luận từ nhiễu.
186. **Canary / rollback:** Canary phát hành phiên bản mới cho một phần nhỏ lưu lượng trước; rollback quay về bản ổn định nếu gặp vấn đề. Đây là cơ chế giảm ảnh hưởng của lỗi triển khai.
187. **Docker / container:** Đóng gói ứng dụng cùng các phụ thuộc trong môi trường nhất quán để chạy giữa máy phát triển và môi trường triển khai.
188. **CI/CD:** Tự động hóa kiểm tra và phát hành thay đổi. Pipeline AI thường cần thêm kiểm tra dữ liệu, metric, artifact và tương thích mô hình bên cạnh kiểm thử mã.
189. **Scalability (khả năng mở rộng):** Khả năng phục vụ tải lớn hơn bằng tăng tài nguyên hoặc thêm máy. Mô hình lớn có thể bị giới hạn bởi GPU, bộ nhớ, băng thông và chi phí.
190. **Cost per request (chi phí mỗi yêu cầu):** Chi phí trung bình để xử lý một yêu cầu, gồm token/API, phần cứng, truy xuất và vận hành. Nên đo trên lưu lượng thực tế và đặt ngân sách.

## 7. Lộ trình thực hành

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
- [Hugging Face Transformers — Chat templates](https://huggingface.co/docs/transformers/main/chat_templating) — roles, control tokens và định dạng hội thoại.
- [Hugging Face PEFT — LoRA](https://huggingface.co/docs/peft/main/conceptual_guides/lora) — fine-tuning tiết kiệm tham số.
- [Hugging Face PEFT — Quantization](https://huggingface.co/docs/peft/developer_guides/quantization) — QLoRA và lượng tử hóa.
- [PyTorch — Transformer building blocks](https://docs.pytorch.org/tutorials/intermediate/transformer_building_blocks.html) — attention và các khối Transformer.
- [vLLM documentation](https://docs.vllm.ai/en/latest/) — phục vụ LLM, KV cache và tối ưu suy luận.
- [Model Context Protocol — TypeScript SDK](https://ts.sdk.modelcontextprotocol.io/v2/) — kết nối ứng dụng AI với tools, resources và prompts.
- [OpenAI API — Evals](https://platform.openai.com/docs/guides/evals) — thiết kế đánh giá mô hình.
- [OpenAI API — File Search](https://platform.openai.com/docs/guides/tools-file-search) — truy xuất tài liệu và vector stores.
- [OpenAI API — Function calling](https://platform.openai.com/docs/guides/function-calling) — kết nối mô hình với công cụ trong ứng dụng.

---

**Ghi chú:** Công việc AI Engineer thay đổi theo nhóm sản phẩm. Các mục trong tài liệu là nền tảng chung; hãy ưu tiên các mục gắn với bài toán, dữ liệu và môi trường triển khai bạn muốn làm.
