---
name: literature-research
description: Perform comprehensive literature research from academic sources (arXiv, PubMed, Google Scholar, Semantic Scholar, Crossref, etc.) and technical blogs, with PDF text extraction support
license: MIT
compatibility: opencode
metadata:
  audience: researchers
  sources: arXiv, PubMed, PMC, Google Scholar, Semantic Scholar, Crossref, OpenAlex, bioRxiv, medRxiv
  capabilities: paper-search-mcp, web search, PDF text extraction
---

## What I do
- Search academic papers using paper-search-mcp (arXiv, PubMed, Google Scholar, Semantic Scholar, Crossref, OpenAlex, bioRxiv, medRxiv)
- Download and read papers directly from arXiv
- Extract text content from PDF papers using pdf-reader MCP tool
- Generate structured literature review reports
- Compare technologies and methods across papers
- Identify research gaps and opportunities

## When to use me
Use this skill when you need to:
- Conduct literature review on a specific topic
- Survey existing research in a field
- Compare different approaches/technologies
- Find research gaps for new projects
- Prepare a research proposal background

## Workflow

### Phase 1: Topic Analysis
1. Parse the research topic from user input
2. Extract 3-5 core keywords
3. Determine search strategy
4. Set time range (default: last 5 years, extend if insufficient papers)

### Phase 2: Multi-source Search (Preferred: paper-search-mcp)

**Primary method - Use paper-search-mcp tools (faster, structured data):**

| Tool | Source | Best for |
|------|--------|----------|
| `paper-search_search_arxiv` | arXiv | CS, Physics, Math preprints |
| `paper-search_search_pubmed` | PubMed | Biomedical literature |
| `paper-search_search_pmc` | PMC | Free full-text biomedical |
| `paper-search_search_google_scholar` | Google Scholar | Cross-disciplinary search |
| `paper-search_search_crossref` | Crossref | DOI metadata lookup |
| `paper-search_search_openalex` | OpenAlex | Broad academic coverage |
| `paper-search_search_semantic` | Semantic Scholar | AI-enhanced search |
| `paper-search_search_biorxiv` | bioRxiv | Biology preprints |
| `paper-search_search_medrxiv` | medRxiv | Medical preprints |

Usage example:
```
paper-search_search_arxiv(query="tof lidar denoising", max_results=10)
paper-search_search_google_scholar(query="time-of-flight lidar deep learning", max_results=10)
```

**Fallback - Use websearch tool with site-specific queries:**
- `site:arxiv.org [keywords]`
- `site:ieee.org [keywords]`
- `site:scholar.google.com [keywords]`
- `site:science.org [keywords]`
- `site:nature.com [keywords]`
- Technical blogs: `site:medium.com OR site:dev.to [keywords]`

### Phase 3: Paper Selection
- Filter by relevance (title + snippet)
- Target 10-20 most relevant papers
- Prioritize recent publications (last 5 years)
- If insufficient papers, extend time range to 10 years
- Include seminal/foundational papers if relevant

### Phase 4: Information Extraction
For each selected paper:
1. Paper data from paper-search-mcp already includes title, authors, abstract, DOI, PDF URL
2. To get full text, use paper-search-mcp download/read tools:
   - `paper-search_download_arxiv(paper_id="2106.12345")` - Download PDF
   - `paper-search_read_arxiv_paper(paper_id="2106.12345")` - Extract text directly
   - `paper-search_download_pubmed(paper_id="PMID")` - PubMed papers
   - `paper-search_download_biorxiv(paper_id="DOI")` - bioRxiv papers
3. Alternative: If PDF URL available, use pdf-reader MCP tool:
   - Call `extract_pdf_text` with PDF path or URL
   - Use `max_chars` parameter to limit output if needed
4. Extract key information:
   - Title
   - Authors
   - Year
   - Source (journal/conference)
   - Key contributions
   - Methods/technologies
   - Results
   - Limitations

### Phase 5: Analysis & Report Generation
1. Categorize papers by theme/technology
2. Create comparison table
3. Identify trends and gaps
4. Generate structured Markdown report
5. Save report to `literature-reviews/` directory

## Output Format
Generate a Markdown file with this structure:

```markdown
# Literature Review: [Topic]

## Metadata
- **Topic**: [User's research topic]
- **Date**: [YYYY-MM-DD]
- **Papers Reviewed**: [Count]
- **Time Range**: [e.g., 2020-2025]

## Executive Summary
[2-3 paragraph overview of key findings]

## Papers

| # | Title | Authors | Source | Year | Key Contribution |
|---|-------|---------|--------|------|------------------|
| 1 | ... | ... | IEEE | 2024 | ... |

## Detailed Analysis

### Theme 1: [Category Name]
- Paper 1: [Summary of contributions and findings]
- Paper 2: [Summary of contributions and findings]

### Theme 2: [Category Name]
- ...

## Technology Comparison

| Method/Technology | Advantages | Limitations | Best Use Case |
|-------------------|------------|-------------|---------------|
| ... | ... | ... | ... |

## Research Trends
- [Trend 1: Description and supporting papers]
- [Trend 2: Description and supporting papers]

## Research Gaps & Opportunities
- [Gap 1: Description and potential research direction]
- [Gap 2: Description and potential research direction]

## Recommended Next Steps
- [ ] [Action 1: Specific next step]
- [ ] [Action 2: Specific next step]

## References
1. [Full citation 1]
2. [Full citation 2]
```

## Tools to Use

### paper-search-mcp (Primary - structured academic search)
- `paper-search_search_arxiv` - Search arXiv papers
- `paper-search_search_pubmed` - Search PubMed biomedical literature
- `paper-search_search_pmc` - Search PubMed Central full-text
- `paper-search_search_google_scholar` - Search Google Scholar
- `paper-search_search_crossref` - Search Crossref DOI metadata
- `paper-search_search_openalex` - Search OpenAlex academic database
- `paper-search_search_semantic` - Search Semantic Scholar (AI-enhanced)
- `paper-search_search_biorxiv` - Search bioRxiv preprints
- `paper-search_search_medrxiv` - Search medRxiv preprints
- `paper-search_download_arxiv` - Download arXiv paper PDF
- `paper-search_read_arxiv_paper` - Extract text from arXiv paper
- `paper-search_download_pubmed` - Download PubMed paper
- `paper-search_download_biorxiv` - Download bioRxiv paper

### Other tools (Fallback)
- `websearch`: For finding papers via web search when MCP unavailable
- `webfetch`: For extracting content from web pages
- `pdf-reader`: MCP tool for PDF text extraction (extract_pdf_text)
- `write`: For saving the final report to file

## Important Notes
- Always cite sources properly
- Distinguish between peer-reviewed papers and technical blogs
- Note when PDF full text is not available
- Be objective in analysis - present both strengths and weaknesses
- If papers < 10, extend time range automatically
- Save report to: `literature-reviews/[topic-slug]-[date].md`
- Create `literature-reviews/` directory if it doesn't exist

## Example Usage
User: "请调研 Time-of-Flight 激光雷达深度学习去噪 相关文献"

Agent actions:
1. Load skill: `skill({ name: "literature-research" })`
2. Extract keywords: "ToF LiDAR", "deep learning", "denoising", "noise reduction"
3. Search using paper-search-mcp (parallel calls):
   - `paper-search_search_arxiv(query="tof lidar denoising", max_results=10)`
   - `paper-search_search_google_scholar(query="time-of-flight lidar deep learning", max_results=10)`
   - `paper-search_search_semantic(query="lidar noise reduction neural network", max_results=10)`
4. Select 10-20 papers from combined results
5. For key papers, read full text: `paper-search_read_arxiv_paper(paper_id="...")`
6. Generate report
7. Save to `literature-reviews/tof-lidar-deep-learning-denoising-20260327.md`
