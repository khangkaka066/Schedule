import { useMemo, useState } from 'react'
import glossarySource from '../AI_ENGINEER_GLOSSARY_VI.md?raw'
import './AiEngineerGlossary.css'

function readGlossary(source) {
  const sections = source.split(/^## /m).slice(1)

  return sections
    .map((section) => {
      const [heading, ...body] = section.split('\n')
      const headingMatch = heading.match(/^(\d+)\.\s+(.+)$/)
      if (!headingMatch || Number(headingMatch[1]) > 6) return null

      const terms = [...body.join('\n').matchAll(/^\d+\. \*\*(.+?)\*\*:?[ \t]+(.+)$/gm)]
        .map(([, term, explanation], index) => ({
          id: `${headingMatch[1]}-${index}`,
          term: term.replace(/:$/, ''),
          explanation,
        }))

      return { title: headingMatch[2], terms }
    })
    .filter(Boolean)
}

function readReferences(source) {
  const referenceSection = source.split(/^## Tài liệu chính thức để học tiếp\s*$/m)[1] ?? ''

  return [...referenceSection.matchAll(/^- \[(.+?)\]\((.+?)\) — (.+)$/gm)]
    .map(([, label, href, description]) => ({ label, href, description }))
}

const glossarySections = readGlossary(glossarySource)
const references = readReferences(glossarySource)
const categories = ['Tất cả', ...glossarySections.map(({ title }) => title)]
const totalTerms = glossarySections.reduce((total, section) => total + section.terms.length, 0)

export default function AiEngineerGlossary() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Tất cả')
  const normalizedQuery = query.trim().toLocaleLowerCase('vi')

  const visibleSections = useMemo(() => glossarySections
    .filter((section) => category === 'Tất cả' || section.title === category)
    .map((section) => ({
      ...section,
      terms: section.terms.filter(({ term, explanation }) =>
        `${term} ${explanation}`.toLocaleLowerCase('vi').includes(normalizedQuery),
      ),
    }))
    .filter((section) => section.terms.length > 0), [category, normalizedQuery])

  const visibleCount = visibleSections.reduce((total, section) => total + section.terms.length, 0)

  return (
    <main className="ai-glossary-page">
      <header className="ai-glossary-hero">
        <div className="ai-glossary-copy">
          <span className="ai-glossary-eyebrow">AI ENGINEER · KIẾN THỨC NỀN TẢNG</span>
          <h2>Thuật ngữ AI Engineer</h2>
          <p>
            Từ dữ liệu và machine learning đến LLM, RAG và vận hành sản phẩm AI.
            Mỗi thuật ngữ đều có phần giải thích ngắn để bạn hiểu và biết khi nào cần dùng.
          </p>
          <div className="ai-learning-route" aria-label="Thứ tự học gợi ý">
            <span>Dữ liệu</span><b>→</b><span>Machine Learning</span><b>→</b><span>Deep Learning</span><b>→</b><span>LLM</span><b>→</b><span>Vận hành</span>
          </div>
        </div>
        <div className="ai-glossary-count">
          <strong>{totalTerms}</strong>
          <span>thuật ngữ có giải thích</span>
        </div>
      </header>

      <section className="ai-glossary-controls" aria-label="Tìm và lọc thuật ngữ">
        <label className="ai-glossary-search">
          <span aria-hidden="true">⌕</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm thuật ngữ hoặc nội dung giải thích…"
            type="search"
            value={query}
          />
        </label>
        <p className="ai-glossary-result-count">Hiển thị {visibleCount}/{totalTerms} thuật ngữ</p>
        <div className="ai-glossary-filters" aria-label="Lọc theo nhóm">
          {categories.map((item) => (
            <button
              aria-pressed={category === item}
              className={category === item ? 'selected' : ''}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {visibleSections.length ? visibleSections.map((section) => (
        <section className="ai-glossary-section" key={section.title}>
          <div className="ai-glossary-section-title">
            <div>
              <span>NHÓM KIẾN THỨC</span>
              <h3>{section.title}</h3>
            </div>
            <b>{section.terms.length} thuật ngữ</b>
          </div>
          <div className="ai-glossary-grid">
            {section.terms.map(({ id, term, explanation }, index) => (
              <article className="ai-glossary-term" key={id}>
                <span className="ai-glossary-term-number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{term}</h4>
                  <p>{explanation}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )) : (
        <section className="ai-glossary-empty">
          <strong>Chưa tìm thấy thuật ngữ phù hợp</strong>
          <p>Thử từ khóa khác hoặc chọn nhóm “Tất cả”.</p>
          <button onClick={() => { setQuery(''); setCategory('Tất cả') }} type="button">Xóa bộ lọc</button>
        </section>
      )}

      <section className="ai-glossary-sources">
        <div className="ai-glossary-section-title">
          <div>
            <span>ĐỌC TIẾP</span>
            <h3>Tài liệu chính thức</h3>
          </div>
        </div>
        <div className="ai-glossary-source-grid">
          {references.map(({ label, href, description }) => (
            <a href={href} key={label} rel="noreferrer" target="_blank">
              <strong>{label}<span aria-hidden="true">↗</span></strong>
              <small>{description}</small>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
