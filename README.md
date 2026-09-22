<!-- <p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/logo-en-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="docs/assets/logo-en-light.png">
    <img src="docs/assets/logo-en-light.png" width="180" alt="Hands-On Computing logo">
  </picture>
</p> -->

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/banner-en-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="docs/assets/banner-en-light.png">
    <img src="docs/assets/banner-en-light.png" width="1200" alt="Hands-On Computing: from programming fundamentals to AI engineering. Understand the principles, learn by doing.">
  </picture>
</p>

<h1 align="center">Hands-On Computing: From Programming Fundamentals to AI Engineering</h1>

<p align="center">
  <a href="README.md"><strong>English</strong></a> · <a href="README.zh-CN.md">中文文档</a>
  &nbsp;
  <a href="docs/project-plan.md"><img align="absmiddle" src="https://img.shields.io/badge/Status-building-2563eb?style=flat" alt="Status: under active development"></a>
  <a href="docs/START_HERE.md"><img align="absmiddle" src="https://img.shields.io/badge/Format-Notebook-4f46e5?style=flat" alt="Format: Jupyter Notebook"></a>
  <a href="#-contributing"><img align="absmiddle" src="https://img.shields.io/badge/PRs-welcome-0f766e?style=flat" alt="Pull requests welcome"></a>
</p>

<p align="center">
  <strong>
    <a href="#-motivation">Motivation</a> ·
    <a href="#-curriculum">Curriculum</a> ·
    <a href="docs/START_HERE.md">Getting Started</a> ·
    <a href="docs/project-plan.md">Roadmap</a> ·
    <a href="#-contributing">Contributing</a>
  </strong>
</p>

> [!NOTE]
> Hands-On Computing is under active development. The course notebooks and linked guides are primarily in Chinese. Corrections, suggestions, and focused pull requests are welcome.

## 🎯 Motivation

**A practical computing tutorial built around Jupyter Notebooks, starting from scratch and progressing from programming fundamentals to AI engineering.**

Hands-On Computing (`hands-on-computing`, 《动手学计算机》) follows a simple teaching principle: **understand the principles, learn by doing**. It connects programming languages, computing fundamentals, and AI applications into a coherent path for independent learners. Through explanations, code experiments, and projects, readers explore how programs run, how systems work together, and how to write, debug, test, and deploy applications.

The planned curriculum covers:

- **Programming foundations**: development environments and tools, programming languages, data structures, and algorithms to build basic programming skills.
- **Computing fundamentals**: computer systems, networks, databases, and storage to understand program execution, data organization, and communication between systems.
- **Software engineering and applications**: web and application development, testing, architecture, deployment, operations, and information security to build and maintain complete applications.
- **AI principles and applications**: mathematical foundations, machine learning, deep learning, and large models, followed by model APIs, RAG, agents, evaluation, fine-tuning, and inference deployment.

Each chapter combines explanations and code in a single Notebook, with supporting scripts, pages, and experiment resources where needed. Readers run examples, change inputs, observe results, and complete exercises. Explanations draw on official documentation, formal standards, original papers, and other primary sources, with references collected at the end of each chapter. See the [curriculum index](paths/README.md) and [project roadmap](docs/project-plan.md) for scope and plans.

## 📚 Curriculum

Start with the [getting started guide](docs/START_HERE.md), then use the [curriculum index](paths/README.md) to choose a subject and course. Each course directory's `README.md` contains environment setup and run instructions; individual chapters describe prerequisites, supporting code, and exercises.

### Programming Languages

| Course | Overview | Links |
| --- | --- | --- |
| **Python** | Covers syntax, types and containers, strings, control flow, functions and closures, object-oriented programming, modules and packages, exceptions and debugging, files and data processing, iterators, generators, decorators, context managers, type hints, the standard library, command-line tools and logging, SQLite, testing and packaging, concurrency and async programming, CPython internals, performance optimization, metaprogramming, plugins and C extensions, free threading, Pygame, and integrated engineering practice. | [Contents](content/编程语言/python/plan.md) |
| **JavaScript** | Covers syntax, types and conversions, numbers and strings, control flow, functions and closures, objects and properties, arrays and collections, this, prototypes and classes, exceptions and debugging, regular expressions, JSON, dates and internationalization, modules, iterators and generators, promises and asynchronous scheduling, testing and engineering tools, binary data, metaprogramming, memory and performance, explicit resource management, and integrated engineering practice. | [Contents](content/编程语言/javascript/plan.md) |
| **TypeScript** | Covers the toolchain, basic types and inference, arrays and tuples, objects and interfaces, unions and intersections, narrowing, functions and overloads, type compatibility, generics, classes and enums, type operations and utility types, module resolution, declaration files and merging, project configuration, JavaScript migration, runtime validation, testing and package distribution, JSX, decorators, namespaces, project references and compilation performance, and integrated engineering practice. | [Contents](content/编程语言/typescript/plan.md) |

### AI Principles and Applications

| Course | Overview | Links |
| --- | --- | --- |
| **NumPy** | Covers array creation, type conversion, indexing, filtering and repeated-index updates, shape transformations, views, copies and memory layout, broadcasting and universal functions, statistical aggregation, sorting, searching and set operations, random sampling, vectors, matrices and tensors, numerical precision, linear systems and matrix decompositions, data I/O and memory mapping, performance and iteration, strings and structured arrays, dates and times, masked arrays, discrete numerical computation, polynomials, Fourier transforms, array interoperability and type annotations, and integrated practice. | [Contents](content/AI原理与应用/NumPy/plan.md) |
| **pandas** | Covers Series and DataFrame, index alignment, filtering, assignment and Copy-on-Write, type conversion, missing and duplicate values, statistics, sorting and function application, text and categorical data, grouping and aggregation, joins, concatenation and comparison, reshaping and hierarchical indexes, dates, times and time zones, resampling and windows, CSV, JSON, SQL, Excel and columnar files, data quality and reproducibility, memory and chunking, Arrow interoperability, sparse data, table presentation, expression evaluation, and integrated practice. | [Contents](content/AI原理与应用/pandas/plan.md) |
| **Data Visualization** | Covers chart selection and visual encoding, comparisons and composition, change and statistical distributions, relationships and uncertainty, hierarchies and flows, scientific plotting with Matplotlib and Seaborn, interaction and export with Plotly, Altair and Bokeh, and Vega-Lite specifications with Vega-Embed integration. | [Contents](content/AI原理与应用/data-visualization/plan.md) |
| **Mathematical Foundations** | Covers mathematical notation, linear algebra and matrix decompositions, calculus and matrix derivatives, extrema and convexity, probability and statistical inference, information measures, numerical stability and Monte Carlo methods, mathematical modeling with optional PCA, and extensions in change of variables, Bayesian inference, and MCMC. | [Contents](content/AI原理与应用/mathematical-foundations/plan.md) |

### Web and Application Development

| Course | Overview | Links |
| --- | --- | --- |
| **HTML** | Covers running pages, syntax and document structure, metadata and resource inclusion, text and lists, semantic structure, links and URLs, responsive images, audio, video and embedded content, tables, forms and native validation, native interactions, accessibility and validation tools, SVG and MathML, templates and slots, parsing and compatibility, and website practice with multiple pages. | [Contents](content/Web与应用开发/html/plan.md) |
| **CSS** | Covers syntax and selectors, the cascade and inheritance, values and units, the box model, normal flow and overflow, colors and backgrounds, typography, list, table and form styling, positioning and stacking contexts, Flexbox and Grid, media and container queries, logical properties, themes, transforms, transitions and animations, style organization, debugging, compatibility and rendering performance, columns and printing, filters, clipping and masks, anchor positioning, scrolling interactions, and responsive page practice. | [Contents](content/Web与应用开发/css/plan.md) |
| **FastAPI** | Covers HTTP and running services, routing and request parameters, request bodies and validation, responses and errors, dependency injection, synchronous and asynchronous processing, automated testing, application structure and configuration, lifecycles and resource management, databases and async access, middleware and CORS, authentication and authorization, forms and files, multiprocess deployment, external HTTP calls, background tasks, WebSocket, streaming and SSE, OpenAPI and client generation, templates and static assets, and integrated API delivery. | [Contents](content/Web与应用开发/FastAPI/plan.md) |

## 🤝 Contributing

Contributions are welcome: correct content or code, improve explanations and exercises, or add practical material with clear learning objectives.

- **Content feedback**: identify the file, describe the issue, and provide an official or other primary source supporting the correction.
- **Runtime feedback**: include the working directory, tool versions, reproduction steps, and error messages with sensitive information removed.
- **Writing contributions**: first read the [project collaboration rules](AGENTS.md), [Notebook writing protocol](docs/notebook-protocol.md), and any applicable directory rules. Describe the changes, checks actually performed, and anything left unverified.

See [writing and feedback](docs/START_HERE.md#编写与反馈) for more details.

## License

Original tutorials and code are licensed under [CC BY-NC-SA 4.0](LICENSE), with attribution to **CMYK Labs (cmyk-labs)**. Sharing and adaptation are permitted for non-commercial purposes under the license's attribution and ShareAlike terms. Third-party materials remain subject to their respective licenses and permissions.
