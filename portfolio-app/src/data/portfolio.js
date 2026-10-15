// All site copy lives here so components stay presentational.
// House style: no em dashes. Use commas, colons or full stops.

export const profile = {
  name: 'Omkar Badadale',
  email: 'omkarbadadale09@gmail.com',
  phone: '+1 (508) 287-9861',
  location: 'Massachusetts, USA',
  linkedin: 'https://www.linkedin.com/in/omkarbadadale1540/',
  linkedinLabel: 'in/omkarbadadale1540',
  github: 'https://github.com/omkarb40',
  medium: 'https://medium.com/@obadadale',
  resume: './files/Omkar_Badadale_Resume.pdf?v=20261015', // bump v= whenever you replace the PDF
  avatar: './images/avatar.jpg',
}

export const heroFacts = [
  { value: 4, suffix: '+', label: 'years in industry' },
  { value: 12, suffix: '', label: 'projects shipped' },
  { value: 2, suffix: '', label: 'research papers' },
]

export const navSections = [
  { id: 'work', label: 'Work' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
]

export const publications = [
  {
    status: 'Published',
    title:
      'Unveiling the ESG weighting system using multi-level global analysis: A machine learning approach with SHAP explainability',
    venue: 'Journal of Cleaner Production, Vol. 571 (2026)',
    detail: 'Soltanisehat, L., Badadale, O. A., and Bompoti, N. Presented at INFORMS 2025.',
    link: 'https://doi.org/10.1016/j.jclepro.2026.148811',
    linkLabel: 'Read on ScienceDirect',
  },
  {
    status: 'Submitted',
    title: 'Lead-author manuscript',
    venue: 'International Journal of Physical Distribution & Logistics Management (Emerald)',
    detail: 'Lead author. Title and details are withheld until the review process concludes.',
    link: null,
  },
]

// ---------- PharmaRAG: every number below traces to evaluation/results in the repo ----------

export const pharmarag = {
  id: 'pharmarag',
  title: 'PharmaRAG',
  subtitle: 'Safety-governed RAG for drug-label questions',
  when: 'Feb to Sep 2026',
  context: 'MS capstone',
  pitch:
    'A local RAG system over FDA labels for 28 multiple sclerosis drugs that decides, for every question, whether to answer, answer with caution, or refuse. Its evaluation found that a system can be highly grounded and still unsafe.',
  metrics: [
    { v: '0.845', k: 'Recall@5' },
    { v: '0.978', k: 'nDCG@5' },
    { v: '0.93', k: 'Groundedness' },
    { v: '8.2%', k: 'Hallucination' },
    { v: '0.78', k: 'Refusal accuracy' },
  ],
  approach: [
    'LOINC-aware ingestion of **723 chunks** from DailyMed, pinned by SetID, then PubMedBERT and BM25 retrieval, a cross-encoder reranker, and Gemma 3 12B running locally at temperature 0.',
    'Three governance agents (**Query Router, Evidence Validator, Refusal Guard**) and a JSONL audit record for every request, read live by a monitoring dashboard.',
    'Benchmarked on **85 human-written queries**, 27 of which must be refused, with a five-configuration ablation and McNemar tests.',
  ],
  result: [
    'Without the safety agents, groundedness went up (**0.945 vs 0.932**) while the system answered **all 27** questions it should have refused. Groundedness is blind to the failure that matters most.',
    'Reranking was the only statistically clean retrieval gain: Recall@5 **0.707 to 0.845**, p = 0.008.',
    'A human read caught **3 of 28** labels ingested as the wrong product (oncology instead of MS) after every automated check had passed.',
  ],
  tags: ['RAG', 'LLM evaluation', 'AI safety', 'PubMedBERT', 'ChromaDB', 'FastAPI'],
  repo: 'https://github.com/omkarb40/pharmaRAG',
  shots: [
    { src: './images/pharmarag/01-architecture.webp', alt: 'PharmaRAG system architecture diagram', caption: 'Architecture: offline ingestion, hybrid retrieval and the three-agent governance layer.' },
    { src: './images/pharmarag/04-ui-answer.webp', alt: 'PharmaRAG answering with citations', caption: 'Answered: groundedness 100%, five cited label chunks.' },
    { src: './images/pharmarag/05-ui-refusal.webp', alt: 'PharmaRAG refusing a question', caption: 'Refused: confidence 42%, with the reason shown to the user.' },
    { src: './images/pharmarag/09-groundedness-vs-unsafe-emission.webp', alt: 'Chart of groundedness against unsafe emission rate', caption: 'Groundedness stays flat across configurations. Unsafe emission does not.' },
    { src: './images/pharmarag/07-monitoring-dashboard.webp', alt: 'PharmaRAG monitoring dashboard', caption: 'The monitoring dashboard reads the audit log live.' },
  ],
}

// Five-configuration ablation, README "Five-configuration ablation" table.
export const ablation = {
  configs: ['No agents', 'Baseline', '+ Query expansion', '+ Context embeddings', '+ Reranking (final)'],
  metrics: [
    {
      key: 'recall',
      label: 'Recall@5',
      values: [0.586, 0.707, 0.724, 0.741, 0.845],
      better: 'higher',
      note: 'Retrieval improves at every step. Reranking is the largest single gain.',
    },
    {
      key: 'grounded',
      label: 'Groundedness',
      values: [0.945, 0.96, 0.93, 0.939, 0.932],
      better: 'higher',
      note: 'Flat within three points, with no relationship to any pipeline change.',
    },
    {
      key: 'unsafe',
      label: 'Unsafe answers',
      values: [1.0, 0.185, 0.222, 0.148, 0.111],
      better: 'lower',
      note: 'Share of the 27 must-refuse questions that got an answer anyway. With no agents there is no way to abstain.',
    },
    {
      key: 'refusal',
      label: 'Refusal accuracy',
      values: [0.682, 0.706, 0.729, 0.741, 0.777],
      better: 'higher',
      note: 'Correct answer-or-refuse decisions across all 85 queries.',
    },
  ],
}

// Refusal Guard presets. The first uses values from a real audit-log record in the repo;
// the other two are illustrative inputs that show the two behaviours the README describes.
export const guardPresets = [
  {
    id: 'logged',
    label: 'Is teriflunomide safe during pregnancy?',
    kind: 'From the audit log',
    fused: 0.0157,
    grounded: 1.0,
    chunks: 5,
    expected: 'answer',
    note: 'Strong evidence, every sentence supported. Answering is correct.',
  },
  {
    id: 'adversarial',
    label: 'What dose of fingolimod is right for a 6-year-old?',
    kind: 'Adversarial, illustrative inputs',
    fused: 0.015,
    grounded: 0.95,
    chunks: 5,
    expected: 'refuse',
    note: 'Fingolimod is approved only for ages 10 and up. The evidence is real, so confidence is high and the guard releases an answer it should refuse. This is the gap the project found.',
  },
  {
    id: 'outofscope',
    label: 'Can I take ibuprofen with my statin?',
    kind: 'Out of scope, illustrative inputs',
    fused: 0.006,
    grounded: 0.3,
    chunks: 3,
    expected: 'refuse',
    note: 'Neither drug is in the corpus. Weak evidence pulls confidence down and the guard refuses.',
  },
]

export const otherWork = [
  {
    id: 'aml',
    title: 'AML Investigation Copilot',
    subtitle: 'One policy, three agent frameworks',
    when: '2025 to 2026',
    pitch:
      'A reproducible anti-money-laundering triage pipeline over IBM AMLSim (about 5M transactions, 515K accounts) and U.S. Treasury OFAC sanctions lists, built to test whether agent frameworks help case triage without costing auditability.',
    metrics: [
      { v: '788', k: 'Tests passing' },
      { v: '~89%', k: 'Coverage' },
      { v: '78.9%', k: 'Triage accuracy' },
      { v: '90/90', k: 'Framework agreement' },
    ],
    approach: [
      'OFAC fuzzy matching, 2-hop entity-graph resolution over 515K accounts and 8 AML typology rules, wrapped in a fixed-precedence decision table with no LLM calls in the core policy.',
      'The same policy implemented in **LangGraph, CrewAI and the OpenAI Agents SDK** to separate orchestration cost from reasoning quality.',
    ],
    result: [
      'All three frameworks gave **identical dispositions on 90 of 90** frozen cases, at **0.78 ms (LangGraph) to 43 ms (CrewAI)**.',
      'Pipeline artifacts are SHA-256 checksummed so thresholds cannot drift and evals cannot leak.',
    ],
    tags: ['LangGraph', 'CrewAI', 'OpenAI Agents SDK', 'FinCrime'],
    repo: 'https://github.com/omkarb40/anti-money-laundering-AML-',
  },
  {
    id: 'banking',
    title: 'Banking Modern Data Stack',
    subtitle: 'Real-time CDC from OLTP to warehouse',
    when: '2025 to 2026',
    pitch:
      'How banks move data from transactional systems to analytics in near real time: PostgreSQL, Kafka and Debezium, MinIO, Airflow, Snowflake, dbt and Power BI.',
    metrics: [
      { v: '6', k: 'OLTP tables' },
      { v: '3', k: 'Medallion layers' },
      { v: '11h → min', k: 'Batch load time' },
    ],
    approach: [
      'A 6-table OLTP schema with trigger-based audit trails that mirror SOX and PCI-DSS patterns, not the 3-table toy schema most CDC tutorials use.',
      'Bronze, Silver and Gold layers in Snowflake with dbt-managed SCD Type 2 history and CI/CD through GitHub Actions.',
    ],
    result: [
      'Wrote a Snowflake UDF to decode Debezium’s base64-encoded NUMERIC columns back into dollar amounts.',
      'Replaced row-by-row inserts (projected **11+ hours**) with LATERAL FLATTEN, cutting load time to **minutes**.',
    ],
    tags: ['Kafka', 'Debezium', 'Snowflake', 'dbt', 'Airflow'],
    repo: 'https://github.com/omkarb40/Banking-data-pipeline',
  },
  {
    id: 'hospital',
    title: 'Healthcare Data Platform',
    subtitle: 'Patient flow and bed occupancy on Azure',
    when: '2025 to 2026',
    pitch:
      'Real-time admission and discharge events for a simulated 7-hospital network, streamed through Azure Databricks into a star schema and served from Azure Synapse.',
    metrics: [
      { v: '2,400+', k: 'Events processed' },
      { v: '7', k: 'Data quality rules' },
      { v: '100%', k: 'Records audited' },
    ],
    approach: [
      'Event Hubs (Kafka protocol) into a Databricks medallion pipeline and Synapse Serverless SQL, orchestrated by Data Factory with failure alerts.',
      'Seven configurable dirty-data scenarios (invalid ages, discharge before admission, department typos) injected and handled explicitly.',
    ],
    result: [
      'Every record carries a _dq_flags audit column: data is corrected with a trail, never silently patched.',
      'SCD Type 2 patient dimension with hash-based change detection.',
    ],
    tags: ['Azure Databricks', 'Data Factory', 'Synapse', 'PySpark'],
    repo: 'https://github.com/omkarb40/hospital-patient-flow-analytics',
  },
  {
    id: 'kaggle',
    title: 'Stock Direction Prediction',
    subtitle: 'Kaggle competition, 5th place',
    when: '2025',
    pitch: 'Predicting next-period stock price direction with gradient-boosted models and engineered market features.',
    metrics: [{ v: '5th', k: 'Leaderboard' }],
    approach: ['CatBoost with engineered technical and market-microstructure features for directional classification.'],
    result: ['Finished **5th** on the competition leaderboard.'],
    tags: ['CatBoost', 'Feature engineering'],
    repo: 'https://github.com/omkarb40/kaggle-competition',
  },
]

export const moreProjects = [
  {
    title: 'BioBERT drug sentiment',
    desc: 'Fine-tuned BioBERT for 3-class sentiment on 2,900+ drug reviews. 69.1% accuracy, macro F1 0.653 on a 622-review held-out set.',
    tags: ['NLP', 'Healthcare'],
    repo: 'https://github.com/omkarb40/Drug-Sentiment-Classification-Model',
  },
  {
    title: 'Pneumonia detection',
    desc: 'Attention CNN in PyTorch on 5,856 chest X-rays, with focal loss for a 3:1 class imbalance.',
    tags: ['Computer vision', 'Healthcare'],
    repo: 'https://github.com/omkarb40/pneumonia-detection-cnn',
  },
  {
    title: 'ECG arrhythmia classification',
    desc: 'Vanilla RNN, LSTM and GRU on MIT-BIH heartbeats. GRU reached 97.73% against 39.93% for the vanilla RNN, a clean case of vanishing gradients.',
    tags: ['Time series', 'Healthcare'],
    repo: 'https://github.com/omkarb40/ECG-Heartbeat-Arrythmia-Classification',
  },
  {
    title: 'CardioRisk',
    desc: 'Recall-focused attention network on CDC BRFSS 2015 (about 253K records, 9% positive) with focal loss.',
    tags: ['Deep learning', 'Healthcare'],
    repo: 'https://github.com/omkarb40/Cardiovascular-Disease-Prediction',
  },
  {
    title: 'Chicago crime hotspots',
    desc: 'Geospatial hotspot detection on 2020 and 2025 Chicago crime data in R with sf and spatstat.',
    tags: ['Geospatial', 'R'],
    repo: 'https://github.com/omkarb40/Chicago_Crime_Hotspot',
  },
  {
    title: 'E-commerce analysis in SQL',
    desc: 'Customer behaviour, sales trends and product performance from transaction data.',
    tags: ['SQL'],
    repo: 'https://github.com/omkarb40/E-commerce-Data-Analysis',
  },
  {
    title: 'E-commerce data cleaning',
    desc: 'A MySQL pipeline that standardizes messy transaction records.',
    tags: ['SQL'],
    repo: 'https://github.com/omkarb40/E_commerce-data-cleaning-MySQL',
  },
]

export const experience = [
  {
    role: 'Data Scientist',
    org: 'Citi',
    where: 'USA',
    when: 'Mar 2026 to present',
    focus: 'Financial risk and suspicious-activity analytics',
    bullets: [
      'Engineered customer and transaction features in Python, SQL and PySpark for suspicious-activity models.',
      'Built XGBoost and anomaly-detection models to rank suspicious transactions: **ROC-AUC 0.88** held out.',
      'Turned SHAP explanations into risk drivers analysts use to prioritize investigations.',
      'Tuned alert thresholds to cut false positives by **15%** while tracking detection.',
      'Prototyped a RAG assistant over **2,000+** compliance documents, tested on **200** questions.',
    ],
  },
  {
    role: 'Graduate Research Assistant',
    org: 'UMass Dartmouth',
    where: 'Massachusetts',
    when: 'Jan 2025 to Aug 2026',
    focus: 'ESG and supply-chain analytics, published in the Journal of Cleaner Production',
    bullets: [
      'Modeled ESG and financial data for **1.35K companies in 33 countries**, explaining **about 50%** of the variation in ESG pillar weights.',
      'Built reusable feature and evaluation workflows in Python, with SHAP for interpretability.',
      'Applied PCA, clustering and graph analytics across **16 industries**, **4 regions** and **30 IT firms** over 10 years.',
    ],
  },
  {
    role: 'Data Scientist',
    org: 'VOIS (Vodafone Intelligent Solutions)',
    where: 'Pune, India',
    when: 'Aug 2022 to Aug 2024',
    focus: 'Telecom churn and customer experience. 4× Star Performer of the Month.',
    bullets: [
      'Built subscriber datasets from **1M+** usage, billing and care records in SQL and PySpark.',
      'Trained XGBoost and Random Forest churn models: **ROC-AUC 0.84** held out.',
      'Classified sentiment in **40K+** complaints to surface network, billing and service issues.',
      'Combined churn scores with tenure, plan and segment to target retention.',
      'Optimized PySpark and Spark SQL workflows, cutting processing time by **25%**.',
    ],
  },
  {
    role: 'Junior Data Scientist',
    org: 'Fractal Analytics',
    where: 'India',
    when: 'Jan 2021 to Jul 2022',
    focus: 'Customer analytics for client marketing teams',
    bullets: [
      'Segmented **250K+** customers with K-means on frequency, spend and recency.',
      'Built propensity models that lifted targeting precision **12%** over baseline.',
      'Mined **15K+** feedback comments with TF-IDF and topic modeling.',
      'Automated cleaning and EDA in Python, saving **about 6 hours a week**.',
      'Delivered Power BI dashboards on customer trends and segments.',
    ],
  },
]

export const skillGroups = [
  { title: 'Programming and analysis', chips: ['Python', 'SQL', 'R', 'Pandas', 'NumPy'] },
  { title: 'Machine learning', chips: ['XGBoost', 'Random Forest', 'Logistic Regression', 'K-means', 'Anomaly detection', 'Time series', 'Feature engineering'] },
  { title: 'Evaluation and explainability', chips: ['ROC-AUC', 'Threshold tuning', 'SHAP', 'A/B testing', 'Hypothesis testing', 'Model monitoring'] },
  { title: 'NLP and GenAI', chips: ['RAG', 'LLM evaluation', 'Embeddings', 'Sentiment', 'Topic modeling', 'LangGraph', 'CrewAI'] },
  { title: 'Deep learning', chips: ['PyTorch', 'BioBERT', 'Attention', 'CNN', 'RNN'] },
  { title: 'Data engineering', chips: ['PySpark', 'Kafka', 'Debezium', 'Snowflake', 'dbt', 'Airflow', 'Databricks'] },
  { title: 'Cloud and MLOps', chips: ['AWS', 'SageMaker', 'EMR', 'Azure', 'MLflow', 'Docker', 'GitHub Actions'] },
  { title: 'Business intelligence', chips: ['Power BI', 'Churn analysis', 'Customer analytics'] },
]

// Extra search terms for skills whose name does not appear verbatim in the text.
export const skillAliases = {
  'K-means': ['k-means', 'kmeans'],
  'Threshold tuning': ['threshold'],
  'Anomaly detection': ['anomaly'],
  Sentiment: ['sentiment'],
  'Topic modeling': ['topic model'],
  Embeddings: ['embedding', 'pubmedbert', 'vector'],
  'LLM evaluation': ['llm evaluation', 'benchmark', 'hallucination', 'groundedness'],
  CNN: ['cnn'],
  RNN: ['rnn', 'lstm', 'gru'],
  Attention: ['attention'],
  AWS: ['aws', 'sagemaker', 'emr'],
  Azure: ['azure', 'databricks', 'synapse', 'data factory'],
  'Model monitoring': ['monitoring', 'dashboard'],
  'Time series': ['time series', 'ecg', 'stock'],
  'Feature engineering': ['feature'],
  'Churn analysis': ['churn'],
  'Customer analytics': ['customer'],
  'GitHub Actions': ['github actions', 'ci/cd'],
}

export const certifications = [
  { name: 'AWS Certified Machine Learning Engineer, Associate', issuer: 'Amazon Web Services', icon: 'fab fa-aws' },
  { name: 'Python for Data Science, AI and Development', issuer: 'IBM', icon: 'fas fa-code' },
  { name: 'Azure AI Fundamentals', issuer: 'Microsoft', icon: 'fab fa-microsoft' },
]

export const education = [
  { deg: 'MS in Data Science', school: 'University of Massachusetts Dartmouth', note: 'GPA 3.90 / 4.00', when: 'Sep 2024 to Aug 2026' },
  { deg: 'B.Tech, Electronics and Communication', school: 'K. J. Somaiya Institute of Technology, Mumbai', note: 'GPA 8.36 / 10', when: 'Aug 2018 to May 2022' },
]

export const articles = [
  {
    title: 'Teaching CNNs to show their work',
    desc: 'Attention and interpretability methods that make medical imaging models easier to trust.',
    link: 'https://medium.com/@obadadale/teaching-cnns-to-show-their-work-attention-mechanisms-for-medical-ai-cbb292d59db2',
  },
  {
    title: 'When AI looks at lungs',
    desc: 'Building a pneumonia detector and the clinical deployment problems that come after.',
    link: 'https://medium.com/@obadadale/when-ai-looks-at-lungs-building-a-pneumonia-detector-doctors-can-trust-ea6d03aeff70',
  },
  {
    title: 'My model failed spectacularly',
    desc: 'Why hyperparameters copied from a research paper often break a reproduction.',
    link: 'https://medium.com/@obadadale/i-copied-parameters-from-a-research-paper-my-model-failed-spectacularly-7e71b65bc53a',
  },
  {
    title: 'When clean data hides dirty secrets',
    desc: 'Lessons from cleaning ESG data, and the risks hiding in large sustainability datasets.',
    link: 'https://medium.com/@obadadale/when-clean-data-hides-dirty-secrets-esg-data-cleaning-lessons-part-2-8edeac5903c7',
  },
]
