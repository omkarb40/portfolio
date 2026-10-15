// Central content store — all copy lives here so components stay presentational.

export const profile = {
  name: 'Omkar Badadale',
  email: 'omkarbadadale09@gmail.com',
  phone: '+1 (508) 287-9861',
  location: 'Massachusetts, USA',
  linkedin: 'https://www.linkedin.com/in/omkarbadadale1620/',
  github: 'https://github.com/omkarb40',
  medium: 'https://medium.com/@obadadale',
  resume: './files/Omkar_Badadale_Resume.pdf?v=20261015', // bump the v= value whenever you replace the PDF
  avatar: './images/avatar.jpg',
}

export const roles = ['Data Scientist', 'ML Engineer', 'GenAI / RAG Builder', 'Data Engineer']

export const stats = [
  { value: 4, suffix: '+', label: 'Years experience' },
  { value: 12, suffix: '', label: 'Projects shipped' },
  { value: 1, suffix: '', label: 'Published paper (JCP)' },
  { value: 85, suffix: '', label: 'Hand-written eval queries (PharmaRAG)' },
]

export const publications = [
  {
    status: 'published',
    title:
      'Unveiling the ESG weighting system using multi-level global analysis: A machine learning approach with SHAP explainability',
    meta: 'Journal of Cleaner Production, Vol. 571 (2026) · Soltanisehat, L., Badadale, O. A., & Bompoti, N. · Presented at INFORMS 2025',
    link: 'https://doi.org/10.1016/j.jclepro.2026.148811',
    linkLabel: 'View on ScienceDirect (DOI)',
  },
  {
    status: 'submitted',
    title: 'Lead-author manuscript — international peer-reviewed journal',
    meta: 'Lead author · Submitted. Title and details withheld until the review process concludes.',
    link: null,
  },
]

export const flagshipProjects = [
  {
    id: 'pharmarag',
    num: '01',
    title: 'PharmaRAG — Safety-Governed RAG for Drug-Label Q&A',
    when: 'Feb 2026 – Sep 2026',
    role: "MS capstone · Answers drug-safety questions over FDA labels for 28 MS medications, fully local, then decides to **answer, caution, or refuse**. Core finding: a RAG system can be highly grounded and still unsafe.",
    metrics: [
      { v: '0.845', k: 'Recall@5' },
      { v: '0.978', k: 'nDCG@5' },
      { v: '0.93', k: 'Groundedness' },
      { v: '8.2%', k: 'Hallucination rate' },
      { v: '0.78', k: 'Refusal accuracy' },
    ],
    approach: [
      'LOINC-aware ingestion of **723 chunks** (DailyMed, SetID-pinned) → PubMedBERT + BM25 retrieval → cross-encoder rerank → Gemma 3 12B, local at T=0.',
      'Three governance agents (**Query Router, Evidence Validator, Refusal Guard**), a JSONL audit record per request, and a live monitoring dashboard.',
      'Benchmarked on **85 human-written queries** (27 must-refuse, incl. adversarial) with a 5-configuration ablation and McNemar tests.',
    ],
    result: [
      'Without the safety agents, groundedness rose (**0.945 vs 0.932**) yet the system answered **all 27** should-refuse questions. Groundedness is blind to the failure that matters.',
      'Reranking was the only statistically clean retrieval gain (Recall@5 **0.707 → 0.845**, p = 0.008).',
      'Caught **3 of 28** labels ingested as the wrong product (oncology, not MS) that every automated check had passed.',
    ],
    tags: ['RAG', 'LLM Evaluation', 'AI Safety', 'PubMedBERT', 'ChromaDB', 'FastAPI'],
    repo: 'https://github.com/omkarb40/pharmaRAG',
    demo: null,
    shots: [
      { src: './images/pharmarag/01-architecture.webp', alt: 'PharmaRAG system architecture diagram', caption: 'Architecture: offline ingestion, hybrid retrieval, and the three-agent governance layer' },
      { src: './images/pharmarag/04-ui-answer.webp', alt: 'PharmaRAG answering a question with citations', caption: 'Answered: groundedness 100%, five cited label chunks' },
      { src: './images/pharmarag/05-ui-refusal.webp', alt: 'PharmaRAG refusing a question', caption: 'Refused: confidence 42%, with the reason shown to the user' },
      { src: './images/pharmarag/09-groundedness-vs-unsafe-emission.webp', alt: 'Chart: groundedness vs unsafe emission rate by configuration', caption: 'The core finding: groundedness stays flat across configurations; unsafe emission does not' },
      { src: './images/pharmarag/07-monitoring-dashboard.webp', alt: 'PharmaRAG monitoring dashboard', caption: 'Monitoring dashboard reading the live audit log' },
    ],
  },
  {
    id: 'aml',
    num: '02',
    title: 'AML Investigation Copilot — Multi-Framework Agent Benchmark',
    when: '2025 – 2026',
    role: 'Reproducible anti-money-laundering triage pipeline over IBM’s synthetic AMLSim dataset (~5M transactions, ~515K accounts) and U.S. Treasury OFAC sanctions lists — built to test whether agent orchestration frameworks help AML case triage without sacrificing auditability.',
    metrics: [
      { v: '788', k: 'Tests passing' },
      { v: '~89%', k: 'Coverage' },
      { v: '78.9%', k: 'Triage accuracy' },
      { v: '90/90', k: 'Cross-framework agreement' },
    ],
    approach: [
      'Sanctions screening (OFAC fuzzy matching), 2-hop entity-graph resolution over 515K accounts, and 8 AML typology rules, all wrapped in a fixed-precedence decision table — no LLM calls in the core policy.',
      'The same deterministic policy implemented in three agent frameworks (LangGraph, CrewAI, OpenAI Agents SDK) to isolate orchestration overhead and cost from reasoning quality.',
    ],
    result: [
      'All three frameworks produced **identical dispositions on 90/90** frozen eval cases, at latencies from **0.78ms (LangGraph) to 43ms (CrewAI)** — isolating pure orchestration cost.',
      'Four pipeline artifacts are SHA-256 checksummed to prevent threshold rigging or eval leakage — reproducibility as a first-class constraint, not an afterthought.',
    ],
    tags: ['LangGraph', 'CrewAI', 'OpenAI Agents SDK', 'Agentic AI', 'FinCrime'],
    repo: 'https://github.com/omkarb40/anti-money-laundering-AML-',
    demo: null,
  },
  {
    id: 'banking',
    num: '03',
    title: 'Banking Modern Data Stack — Real-Time CDC Pipeline',
    when: '2025 – 2026',
    role: 'A production-grade data engineering pipeline mirroring how banks move data from OLTP systems to analytics-ready warehouses in real time: PostgreSQL → Kafka + Debezium (CDC) → MinIO → Airflow → Snowflake → dbt → Power BI.',
    metrics: [],
    approach: [
      '6-table OLTP schema (customers, accounts, transactions, loans, branches, audit_log) with trigger-based audit trails mirroring SOX/PCI-DSS compliance patterns — not the 3-table toy schema most CDC tutorials use.',
      'Medallion architecture (Bronze/Silver/Gold) in Snowflake with dbt-managed SCD Type-2 history and CI/CD via GitHub Actions.',
    ],
    result: [
      'Solved a real Debezium quirk: built a custom Snowflake UDF to decode base64-encoded NUMERIC columns back into usable dollar amounts.',
      'Refactored batch loading from row-by-row inserts (projected **11+ hours**) to `LATERAL FLATTEN`, cutting load time to **minutes**.',
    ],
    tags: ['Kafka', 'Debezium', 'Snowflake', 'dbt', 'Airflow', 'Power BI'],
    repo: 'https://github.com/omkarb40/Banking-data-pipeline',
    demo: null,
  },
  {
    id: 'hospital',
    num: '04',
    title: 'Real-Time Healthcare Data Platform — Patient Flow & Bed Occupancy',
    when: '2025 – 2026',
    role: 'End-to-end Azure data engineering platform for a simulated 7-hospital network: real-time patient admission/discharge events streamed through Azure Databricks into a Star Schema, served via Azure Synapse.',
    metrics: [
      { v: '~2,400+', k: 'Events processed' },
      { v: '7', k: 'Data quality rules' },
      { v: '100%', k: 'Records DQ-audited' },
      { v: '19+', k: 'Fields per event' },
    ],
    approach: [
      'Azure Event Hubs (Kafka protocol) → Databricks Medallion pipeline (Bronze/Silver/Gold) → Synapse Serverless SQL, orchestrated by Azure Data Factory with failure alerting.',
      '7 configurable dirty-data scenarios (invalid ages, discharge-before-admission, department typos) injected and handled explicitly.',
    ],
    result: [
      'Every record carries a `_dq_flags` audit column — data is corrected with a documented trail, not silently patched.',
      'SCD Type-2 patient dimension tracks historical attribute changes with hash-based change detection.',
    ],
    tags: ['Azure Databricks', 'Azure Data Factory', 'Azure Synapse', 'PySpark', 'Healthcare'],
    repo: 'https://github.com/omkarb40/hospital-patient-flow-analytics',
    demo: null,
  },
  {
    id: 'kaggle',
    num: '05',
    title: 'Stock Price Directional Move Prediction — Kaggle Competition',
    when: '2025',
    role: 'Competitive ML — predicting next-period stock price direction. Finished **5th place**.',
    metrics: [],
    approach: [
      'Gradient-boosted models (CatBoost) with engineered technical and market-microstructure features for directional classification.',
    ],
    result: ['Placed **5th** on the competition leaderboard.'],
    tags: ['CatBoost', 'Feature Engineering', 'Competitive ML'],
    repo: 'https://github.com/omkarb40/kaggle-competition',
    demo: null,
  },
]

export const moreProjects = [
  {
    title: 'BioBERT Drug Sentiment Classification',
    desc: 'Fine-tuned BioBERT (dmis-lab/biobert-base-cased) for 3-class sentiment on 2,900+ drug reviews. Test accuracy 69.1%, macro F1 0.653 on a 622-sample held-out set.',
    tags: ['BioBERT', 'NLP', 'Healthcare'],
    repo: 'https://github.com/omkarb40/Drug-Sentiment-Classification-Model',
  },
  {
    title: 'Pneumonia Detection (Attention CNN)',
    desc: 'PyTorch attention-based CNN on 5,856 chest X-rays with focal loss for 3:1 class imbalance. CIS 602, Nov 2025.',
    tags: ['PyTorch', 'CNN', 'Healthcare AI'],
    repo: 'https://github.com/omkarb40/pneumonia-detection-cnn',
  },
  {
    title: 'ECG Heartbeat Arrhythmia Classification',
    desc: 'Compared Vanilla RNN, LSTM, and GRU on MIT-BIH heartbeat data. GRU hit 97.73% test accuracy vs. 39.93% for vanilla RNN — a clean demonstration of vanishing-gradient failure on long sequences.',
    tags: ['PyTorch', 'RNN/LSTM/GRU', 'Time Series'],
    repo: 'https://github.com/omkarb40/ECG-Heartbeat-Arrythmia-Classification',
  },
  {
    title: 'CardioRisk — Heart Disease Risk Prediction',
    desc: 'Recall-focused attention network on CDC BRFSS 2015 data (~253K records, ~9% positive class) using focal loss for imbalance-aware screening.',
    tags: ['PyTorch', 'Attention', 'Healthcare'],
    repo: 'https://github.com/omkarb40/Cardiovascular-Disease-Prediction',
  },
  {
    title: 'Chicago Crime Hotspot Analysis',
    desc: 'Geospatial hotspot detection on Chicago crime data (2020 & 2025) using R (tidyverse, sf, spatstat).',
    tags: ['R', 'Geospatial', 'EDA'],
    repo: 'https://github.com/omkarb40/Chicago_Crime_Hotspot',
  },
  {
    title: 'E-commerce Data Analysis (SQL EDA)',
    desc: 'SQL-based exploratory analysis of e-commerce transaction data — customer behavior, sales trends, and product performance.',
    tags: ['SQL', 'EDA'],
    repo: 'https://github.com/omkarb40/E-commerce-Data-Analysis',
  },
  {
    title: 'E-commerce Data Cleaning (MySQL)',
    desc: 'Data cleaning and standardization pipeline for messy e-commerce transaction records in MySQL.',
    tags: ['MySQL', 'Data Cleaning'],
    repo: 'https://github.com/omkarb40/E_commerce-data-cleaning-MySQL',
  },
]

export const experience = [
  {
    role: 'Data Scientist',
    when: 'Mar 2026 – Present',
    org: 'Citi · USA · Financial risk & suspicious-activity analytics',
    bullets: [
      'Engineered customer- and transaction-level features with Python, SQL and PySpark for suspicious-activity modeling.',
      'Built XGBoost and anomaly-detection models to prioritize suspicious transactions (**ROC-AUC 0.88** held-out).',
      'Explained risk drivers with SHAP to support analyst review and investigation priority.',
      'Tuned alert thresholds, cutting false positives by **15%** while tracking detection.',
      'Prototyped a RAG assistant over **2,000+** compliance documents, evaluated on a **200-question** test set.',
    ],
  },
  {
    role: 'Graduate Research Assistant',
    when: 'Jan 2025 – Aug 2026',
    org: 'University of Massachusetts Dartmouth · Co-author, Journal of Cleaner Production (2026) · INFORMS 2025',
    bullets: [
      'Modeled ESG and financial data for **1.35K companies in 33 countries**, explaining **~50%** of variation in ESG pillar weights.',
      'Built reusable feature and model-evaluation workflows in Python, with SHAP for interpretability.',
      'Applied PCA, clustering and graph analytics across **16 industries**, **4 regions** and **30 IT firms** over 10 years.',
    ],
  },
  {
    role: 'Data Scientist',
    when: 'Aug 2022 – Aug 2024',
    org: 'VOIS (Vodafone Intelligent Solutions) · Pune, India · 4× Star Performer of the Month',
    bullets: [
      'Built subscriber-level datasets from **1M+** usage, billing and care records with SQL and PySpark.',
      'Trained XGBoost and Random Forest churn models (**ROC-AUC 0.84** held-out).',
      'Classified sentiment in **40K+** complaints to surface network, billing and service issues.',
      'Combined churn scores with tenure, plan and segment to target retention.',
      'Optimized PySpark / Spark SQL workflows, cutting processing time **25%**.',
    ],
  },
  {
    role: 'Junior Data Scientist',
    when: 'Jan 2021 – Jul 2022',
    org: 'Fractal Analytics · India · Customer analytics for client marketing',
    bullets: [
      'Segmented **250K+** customers with K-means on frequency, spend and recency.',
      'Built propensity models that lifted targeting precision **12%** over baseline.',
      'Mined **15K+** feedback comments with TF-IDF and topic modeling.',
      'Automated cleaning and EDA in Python, saving **~6 hrs/week**.',
      'Delivered Power BI dashboards on customer trends and segments.',
    ],
  },
]

export const articles = [
  {
    title: 'Teaching CNNs to Show Their Work',
    desc: 'Exploring attention mechanisms and interpretability methods for improving trust in medical imaging models.',
    link: 'https://medium.com/@obadadale/teaching-cnns-to-show-their-work-attention-mechanisms-for-medical-ai-cbb292d59db2',
  },
  {
    title: 'When AI Looks at Lungs',
    desc: 'Building a reliable pneumonia detection system and addressing real-world clinical deployment challenges.',
    link: 'https://medium.com/@obadadale/when-ai-looks-at-lungs-building-a-pneumonia-detector-doctors-can-trust-ea6d03aeff70',
  },
  {
    title: 'My Model Failed Spectacularly',
    desc: 'Lessons from reproducing research papers and why hyperparameter transfer often breaks models.',
    link: 'https://medium.com/@obadadale/i-copied-parameters-from-a-research-paper-my-model-failed-spectacularly-7e71b65bc53a',
  },
  {
    title: 'When Clean Data Hides Dirty Secrets',
    desc: 'Real-world lessons from ESG data cleaning and the hidden risks in large sustainability datasets.',
    link: 'https://medium.com/@obadadale/when-clean-data-hides-dirty-secrets-esg-data-cleaning-lessons-part-2-8edeac5903c7',
  },
]

export const skillGroups = [
  { title: 'Programming & Analysis', chips: ['Python', 'SQL', 'R', 'Pandas', 'NumPy', 'EDA'] },
  {
    title: 'Statistics & ML',
    chips: ['Hypothesis Testing', 'A/B Testing', 'Feature Engineering', 'XGBoost', 'Random Forest', 'Logistic Regression', 'K-Means', 'Anomaly Detection', 'Time Series'],
  },
  {
    title: 'Evaluation & Explainability',
    chips: ['ROC-AUC', 'Precision / Recall / F1', 'Threshold Optimization', 'SHAP', 'Model Monitoring', 'Responsible AI'],
  },
  {
    title: 'NLP & GenAI',
    chips: ['RAG', 'LLM Evaluation', 'Embeddings & Vector Search', 'Prompt Engineering', 'Sentiment Analysis', 'Topic Modeling', 'LangGraph', 'CrewAI'],
  },
  { title: 'Deep Learning', chips: ['PyTorch', 'Transformers / BioBERT', 'Attention Mechanisms', 'CNNs / RNNs'] },
  { title: 'Data Engineering', chips: ['PySpark / Spark SQL', 'Kafka / Debezium', 'Snowflake', 'dbt', 'Airflow', 'Azure Databricks'] },
  { title: 'Cloud & MLOps', chips: ['AWS S3', 'Amazon EMR', 'SageMaker', 'MLflow', 'Docker', 'GitHub Actions', 'Git'] },
  { title: 'Business Intelligence', chips: ['Power BI', 'KPI Reporting', 'Customer Analytics', 'Churn Analysis'] },
]

export const education = [
  {
    deg: 'Master of Data Science',
    school: 'University of Massachusetts Dartmouth · GPA 3.90/4.00',
    when: 'Sep 2024 – Aug 2026',
  },
  {
    deg: 'B.Tech, Electronics & Communication Engineering',
    school: 'K. J. Somaiya Institute of Technology, Mumbai · GPA 8.36/10.00',
    when: 'Aug 2018 – May 2022',
  },
]

export const certifications = [
  { name: 'AWS Certified Machine Learning Engineer – Associate', issuer: 'Amazon Web Services', icon: 'fab fa-aws' },
  { name: 'Python for Data Science, AI & Development', issuer: 'IBM', icon: 'fas fa-code' },
  { name: 'Azure AI Fundamentals', issuer: 'Microsoft', icon: 'fab fa-microsoft' },
]

export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'publications', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
]
