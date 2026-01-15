// TOGAF ADM (Architecture Development Method) Complete Data Structure

export interface Step {
  id: string;
  name: string;
  description: string;
  tips?: string[];
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  template?: string;
  required: boolean;
}

export interface Artifact {
  id: string;
  name: string;
  type: 'catalog' | 'matrix' | 'diagram';
  description: string;
}

export interface Phase {
  id: string;
  code: string;
  name: string;
  fullName: string;
  description: string;
  objectives: string[];
  inputs: string[];
  outputs: string[];
  steps: Step[];
  deliverables: Deliverable[];
  artifacts: Artifact[];
  keyQuestions: string[];
  stakeholderFocus: string[];
  tips: string[];
}

export const phases: Phase[] = [
  {
    id: 'preliminary',
    code: 'P',
    name: 'Preliminary',
    fullName: 'Preliminary Phase',
    description: 'Prepare the organization for successful TOGAF architecture projects. Define the architecture capability, principles, and governance framework.',
    objectives: [
      'Define the enterprise scope',
      'Confirm governance and support frameworks',
      'Define and establish the Architecture Team',
      'Identify and establish Architecture Principles',
      'Tailor the TOGAF framework',
      'Implement architecture tools'
    ],
    inputs: [
      'TOGAF Library',
      'Other architecture frameworks',
      'Board strategies, business plans',
      'IT strategy, business principles',
      'Governance and legal frameworks'
    ],
    outputs: [
      'Organizational Model for Enterprise Architecture',
      'Tailored Architecture Framework',
      'Initial Architecture Repository',
      'Architecture Principles',
      'Request for Architecture Work (draft)'
    ],
    steps: [
      { id: 'p1', name: 'Scope the enterprise', description: 'Define which parts of the enterprise will be covered by the architecture effort' },
      { id: 'p2', name: 'Confirm governance frameworks', description: 'Establish architecture governance structure and processes' },
      { id: 'p3', name: 'Define architecture team', description: 'Set up the team structure, roles, and responsibilities' },
      { id: 'p4', name: 'Identify architecture principles', description: 'Define the guiding principles that will shape architecture decisions' },
      { id: 'p5', name: 'Tailor TOGAF', description: 'Adapt TOGAF to your organization\'s specific needs' },
      { id: 'p6', name: 'Implement tools', description: 'Set up architecture tools and repositories' }
    ],
    deliverables: [
      { id: 'p-d1', name: 'Organizational Model for EA', description: 'Defines scope, maturity, roles, responsibilities, constraints, budget', required: true },
      { id: 'p-d2', name: 'Tailored Architecture Framework', description: 'Customized TOGAF for the organization', required: true },
      { id: 'p-d3', name: 'Architecture Principles', description: 'Foundational rules governing architecture work', required: true },
      { id: 'p-d4', name: 'Architecture Repository', description: 'Initial structure for storing architecture artifacts', required: true }
    ],
    artifacts: [
      { id: 'p-a1', name: 'Principles Catalog', type: 'catalog', description: 'List of architecture principles with rationale and implications' }
    ],
    keyQuestions: [
      'What is the scope of the architecture effort?',
      'Who are the key stakeholders?',
      'What governance framework will be used?',
      'What principles will guide the architecture?',
      'How will TOGAF be tailored for this organization?'
    ],
    stakeholderFocus: ['Executive Sponsors', 'Architecture Board', 'CIO/CTO'],
    tips: [
      'Don\'t skip this phase - poor preparation leads to project failure',
      'Get executive buy-in early',
      'Define clear scope boundaries',
      'Establish architecture principles that align with business goals'
    ]
  },
  {
    id: 'phase-a',
    code: 'A',
    name: 'Architecture Vision',
    fullName: 'Phase A: Architecture Vision',
    description: 'Develop a high-level vision of the capabilities and business value to be delivered. Obtain approval for a Statement of Architecture Work.',
    objectives: [
      'Develop high-level aspirational vision',
      'Obtain approval for Statement of Architecture Work',
      'Identify stakeholders and their concerns',
      'Create the Architecture Vision',
      'Validate business principles, goals, and drivers',
      'Define scope and constraints'
    ],
    inputs: [
      'Request for Architecture Work',
      'Business principles, goals, and drivers',
      'Organizational Model for EA',
      'Tailored Architecture Framework',
      'Architecture Repository'
    ],
    outputs: [
      'Approved Statement of Architecture Work',
      'Refined statements of business principles, goals, and drivers',
      'Architecture Vision',
      'Draft Architecture Definition Document',
      'Communications Plan',
      'Architecture Project Plan'
    ],
    steps: [
      { id: 'a1', name: 'Establish architecture project', description: 'Set up the project, team, and initial planning' },
      { id: 'a2', name: 'Identify stakeholders and concerns', description: 'Map all stakeholders and understand their needs', tips: ['Use a stakeholder map', 'Consider both internal and external stakeholders'] },
      { id: 'a3', name: 'Confirm business goals and drivers', description: 'Validate the business context for the architecture' },
      { id: 'a4', name: 'Evaluate business capabilities', description: 'Assess current capabilities against desired state' },
      { id: 'a5', name: 'Assess readiness for transformation', description: 'Evaluate the organization\'s ability to change' },
      { id: 'a6', name: 'Define scope', description: 'Set clear boundaries for the architecture effort' },
      { id: 'a7', name: 'Confirm architecture principles', description: 'Validate and refine principles from Preliminary Phase' },
      { id: 'a8', name: 'Develop Architecture Vision', description: 'Create the high-level vision document' },
      { id: 'a9', name: 'Define target architecture value', description: 'Articulate the business value proposition' },
      { id: 'a10', name: 'Identify risks and mitigation', description: 'Assess transformation risks' },
      { id: 'a11', name: 'Develop Statement of Architecture Work', description: 'Formal agreement to proceed with architecture' }
    ],
    deliverables: [
      { id: 'a-d1', name: 'Statement of Architecture Work', description: 'Defines scope, approach, and agreement to proceed', required: true },
      { id: 'a-d2', name: 'Architecture Vision', description: 'High-level summary of changes and business value', required: true },
      { id: 'a-d3', name: 'Communications Plan', description: 'How architecture will be communicated to stakeholders', required: false },
      { id: 'a-d4', name: 'Architecture Definition Document (draft)', description: 'Initial outline of the architecture', required: false }
    ],
    artifacts: [
      { id: 'a-a1', name: 'Stakeholder Map Matrix', type: 'matrix', description: 'Maps stakeholders to their concerns and influence' },
      { id: 'a-a2', name: 'Value Chain Diagram', type: 'diagram', description: 'Shows key business activities and dependencies' },
      { id: 'a-a3', name: 'Solution Concept Diagram', type: 'diagram', description: 'High-level view of the proposed solution' }
    ],
    keyQuestions: [
      'What is the business problem we\'re solving?',
      'Who are the stakeholders and what do they need?',
      'What is the scope of this architecture effort?',
      'What value will this deliver?',
      'What are the key risks?'
    ],
    stakeholderFocus: ['Business Executives', 'Project Sponsors', 'Business Users', 'Architecture Board'],
    tips: [
      'This phase is about getting buy-in and approval',
      'Focus on business value, not technical details',
      'The Architecture Vision should fit on one page',
      'Don\'t go too deep - save detail for later phases'
    ]
  },
  {
    id: 'phase-b',
    code: 'B',
    name: 'Business Architecture',
    fullName: 'Phase B: Business Architecture',
    description: 'Develop the Target Business Architecture that describes how the enterprise needs to operate to achieve business goals.',
    objectives: [
      'Develop Baseline Business Architecture (if not existing)',
      'Develop Target Business Architecture',
      'Perform gap analysis',
      'Define roadmap components',
      'Resolve impacts across the Architecture Landscape'
    ],
    inputs: [
      'Request for Architecture Work',
      'Architecture Vision',
      'Architecture Repository',
      'Business principles, goals, and drivers',
      'Capability assessments'
    ],
    outputs: [
      'Refined Architecture Vision',
      'Draft Architecture Definition Document (Business)',
      'Draft Architecture Requirements Specification',
      'Business Architecture components of Architecture Roadmap'
    ],
    steps: [
      { id: 'b1', name: 'Select reference models and tools', description: 'Choose appropriate frameworks and viewpoints' },
      { id: 'b2', name: 'Develop Baseline Business Architecture', description: 'Document current state if not already done' },
      { id: 'b3', name: 'Develop Target Business Architecture', description: 'Define the desired future state' },
      { id: 'b4', name: 'Perform gap analysis', description: 'Identify differences between baseline and target' },
      { id: 'b5', name: 'Define roadmap components', description: 'Identify work packages needed to close gaps' },
      { id: 'b6', name: 'Resolve impacts', description: 'Assess impacts on other architecture domains' },
      { id: 'b7', name: 'Conduct stakeholder review', description: 'Validate with stakeholders' },
      { id: 'b8', name: 'Finalize Business Architecture', description: 'Complete documentation and get approval' },
      { id: 'b9', name: 'Create Architecture Definition Document', description: 'Document the business architecture' }
    ],
    deliverables: [
      { id: 'b-d1', name: 'Architecture Definition Document (Business)', description: 'Baseline and target business architecture', required: true },
      { id: 'b-d2', name: 'Architecture Requirements Specification (Business)', description: 'Business requirements for the architecture', required: true }
    ],
    artifacts: [
      { id: 'b-a1', name: 'Organization/Actor Catalog', type: 'catalog', description: 'List of organizational units and actors' },
      { id: 'b-a2', name: 'Driver/Goal/Objective Catalog', type: 'catalog', description: 'Business drivers and goals' },
      { id: 'b-a3', name: 'Role Catalog', type: 'catalog', description: 'Business roles and responsibilities' },
      { id: 'b-a4', name: 'Business Service/Function Catalog', type: 'catalog', description: 'Business services and functions' },
      { id: 'b-a5', name: 'Location Catalog', type: 'catalog', description: 'Business locations' },
      { id: 'b-a6', name: 'Process/Event/Control/Product Catalog', type: 'catalog', description: 'Business processes and events' },
      { id: 'b-a7', name: 'Contract/Measure Catalog', type: 'catalog', description: 'Business contracts and KPIs' },
      { id: 'b-a8', name: 'Business Interaction Matrix', type: 'matrix', description: 'Interactions between business units' },
      { id: 'b-a9', name: 'Actor/Role Matrix', type: 'matrix', description: 'Mapping of actors to roles' },
      { id: 'b-a10', name: 'Business Footprint Diagram', type: 'diagram', description: 'Business goals mapped to organizational units' },
      { id: 'b-a11', name: 'Business Service/Information Diagram', type: 'diagram', description: 'Information flow between services' },
      { id: 'b-a12', name: 'Functional Decomposition Diagram', type: 'diagram', description: 'Breakdown of business functions' },
      { id: 'b-a13', name: 'Product Lifecycle Diagram', type: 'diagram', description: 'Product lifecycle stages' },
      { id: 'b-a14', name: 'Goal/Objective/Service Diagram', type: 'diagram', description: 'Mapping goals to services' },
      { id: 'b-a15', name: 'Business Use-Case Diagram', type: 'diagram', description: 'Business use cases' },
      { id: 'b-a16', name: 'Organization Decomposition Diagram', type: 'diagram', description: 'Organizational structure' },
      { id: 'b-a17', name: 'Process Flow Diagram', type: 'diagram', description: 'Business process flows' },
      { id: 'b-a18', name: 'Event Diagram', type: 'diagram', description: 'Business events and triggers' }
    ],
    keyQuestions: [
      'What business capabilities are needed?',
      'What processes need to change?',
      'What organizational changes are required?',
      'What are the key business services?',
      'What information flows between business units?'
    ],
    stakeholderFocus: ['Business Process Owners', 'Business Analysts', 'Operations Managers', 'Business Architects'],
    tips: [
      'Start with business capabilities, not org structure',
      'Focus on what the business does, not how IT supports it',
      'Use business language, not technical jargon',
      'Don\'t try to model everything - focus on scope'
    ]
  },
  {
    id: 'phase-c-is',
    code: 'C-IS',
    name: 'Information Systems (Data)',
    fullName: 'Phase C: Information Systems Architecture - Data Architecture',
    description: 'Develop the Target Data Architecture that describes the structure of the organization\'s logical and physical data assets.',
    objectives: [
      'Develop Baseline Data Architecture',
      'Develop Target Data Architecture',
      'Perform gap analysis',
      'Define roadmap components',
      'Ensure data architecture supports business architecture'
    ],
    inputs: [
      'Request for Architecture Work',
      'Architecture Vision',
      'Architecture Repository',
      'Business Architecture outputs',
      'Data principles'
    ],
    outputs: [
      'Refined Architecture Vision',
      'Draft Architecture Definition Document (Data)',
      'Draft Architecture Requirements Specification (Data)',
      'Data Architecture components of Architecture Roadmap'
    ],
    steps: [
      { id: 'c-is1', name: 'Select reference models and tools', description: 'Choose data architecture viewpoints and tools' },
      { id: 'c-is2', name: 'Develop Baseline Data Architecture', description: 'Document current data landscape' },
      { id: 'c-is3', name: 'Develop Target Data Architecture', description: 'Design target data structures and flows' },
      { id: 'c-is4', name: 'Perform gap analysis', description: 'Identify data gaps and migration needs' },
      { id: 'c-is5', name: 'Define roadmap components', description: 'Plan data transformation activities' },
      { id: 'c-is6', name: 'Resolve impacts', description: 'Assess impacts on application architecture' },
      { id: 'c-is7', name: 'Conduct stakeholder review', description: 'Validate data architecture with stakeholders' },
      { id: 'c-is8', name: 'Finalize Data Architecture', description: 'Complete and approve data architecture' },
      { id: 'c-is9', name: 'Create Architecture Definition Document', description: 'Document the data architecture' }
    ],
    deliverables: [
      { id: 'c-is-d1', name: 'Architecture Definition Document (Data)', description: 'Baseline and target data architecture', required: true },
      { id: 'c-is-d2', name: 'Architecture Requirements Specification (Data)', description: 'Data requirements and constraints', required: true }
    ],
    artifacts: [
      { id: 'c-is-a1', name: 'Data Entity/Data Component Catalog', type: 'catalog', description: 'List of data entities and components' },
      { id: 'c-is-a2', name: 'Data Entity/Business Function Matrix', type: 'matrix', description: 'Data entities mapped to business functions' },
      { id: 'c-is-a3', name: 'System/Data Matrix', type: 'matrix', description: 'Systems mapped to data they use' },
      { id: 'c-is-a4', name: 'Conceptual Data Diagram', type: 'diagram', description: 'High-level data model' },
      { id: 'c-is-a5', name: 'Logical Data Diagram', type: 'diagram', description: 'Detailed logical data model' },
      { id: 'c-is-a6', name: 'Data Dissemination Diagram', type: 'diagram', description: 'Data flows and distribution' },
      { id: 'c-is-a7', name: 'Data Security Diagram', type: 'diagram', description: 'Data security zones and controls' },
      { id: 'c-is-a8', name: 'Data Migration Diagram', type: 'diagram', description: 'Data migration approach' },
      { id: 'c-is-a9', name: 'Data Lifecycle Diagram', type: 'diagram', description: 'Data lifecycle management' }
    ],
    keyQuestions: [
      'What are the key data entities?',
      'Where does data originate and flow?',
      'What are the data quality requirements?',
      'What data governance is needed?',
      'How will data be migrated?'
    ],
    stakeholderFocus: ['Data Architects', 'Data Stewards', 'Database Administrators', 'Business Analysts'],
    tips: [
      'Start with conceptual model before going logical/physical',
      'Identify data owners and stewards early',
      'Consider data quality and governance from the start',
      'Plan for data migration complexity'
    ]
  },
  {
    id: 'phase-c-app',
    code: 'C-App',
    name: 'Information Systems (Application)',
    fullName: 'Phase C: Information Systems Architecture - Application Architecture',
    description: 'Develop the Target Application Architecture that describes how individual applications are to be deployed and their interactions.',
    objectives: [
      'Develop Baseline Application Architecture',
      'Develop Target Application Architecture',
      'Perform gap analysis',
      'Define roadmap components',
      'Ensure applications support business and data architectures'
    ],
    inputs: [
      'Request for Architecture Work',
      'Architecture Vision',
      'Architecture Repository',
      'Business Architecture outputs',
      'Data Architecture outputs'
    ],
    outputs: [
      'Refined Architecture Vision',
      'Draft Architecture Definition Document (Application)',
      'Draft Architecture Requirements Specification (Application)',
      'Application Architecture components of Architecture Roadmap'
    ],
    steps: [
      { id: 'c-app1', name: 'Select reference models and tools', description: 'Choose application architecture viewpoints' },
      { id: 'c-app2', name: 'Develop Baseline Application Architecture', description: 'Document current application landscape' },
      { id: 'c-app3', name: 'Develop Target Application Architecture', description: 'Design target application portfolio' },
      { id: 'c-app4', name: 'Perform gap analysis', description: 'Identify application changes needed' },
      { id: 'c-app5', name: 'Define roadmap components', description: 'Plan application development/retirement' },
      { id: 'c-app6', name: 'Resolve impacts', description: 'Assess impacts on technology architecture' },
      { id: 'c-app7', name: 'Conduct stakeholder review', description: 'Validate with stakeholders' },
      { id: 'c-app8', name: 'Finalize Application Architecture', description: 'Complete and approve' },
      { id: 'c-app9', name: 'Create Architecture Definition Document', description: 'Document the application architecture' }
    ],
    deliverables: [
      { id: 'c-app-d1', name: 'Architecture Definition Document (Application)', description: 'Baseline and target application architecture', required: true },
      { id: 'c-app-d2', name: 'Architecture Requirements Specification (Application)', description: 'Application requirements', required: true }
    ],
    artifacts: [
      { id: 'c-app-a1', name: 'Application Portfolio Catalog', type: 'catalog', description: 'List of all applications' },
      { id: 'c-app-a2', name: 'Interface Catalog', type: 'catalog', description: 'Application interfaces' },
      { id: 'c-app-a3', name: 'System/Organization Matrix', type: 'matrix', description: 'Applications mapped to org units' },
      { id: 'c-app-a4', name: 'Role/System Matrix', type: 'matrix', description: 'User roles mapped to applications' },
      { id: 'c-app-a5', name: 'System/Function Matrix', type: 'matrix', description: 'Applications mapped to functions' },
      { id: 'c-app-a6', name: 'Application Interaction Matrix', type: 'matrix', description: 'Application dependencies' },
      { id: 'c-app-a7', name: 'Application Communication Diagram', type: 'diagram', description: 'Application interactions' },
      { id: 'c-app-a8', name: 'Application and User Location Diagram', type: 'diagram', description: 'Geographic distribution' },
      { id: 'c-app-a9', name: 'Application Use-Case Diagram', type: 'diagram', description: 'Application use cases' },
      { id: 'c-app-a10', name: 'Enterprise Manageability Diagram', type: 'diagram', description: 'Application management' },
      { id: 'c-app-a11', name: 'Process/Application Realization Diagram', type: 'diagram', description: 'Business processes to applications' },
      { id: 'c-app-a12', name: 'Software Engineering Diagram', type: 'diagram', description: 'Application development approach' },
      { id: 'c-app-a13', name: 'Application Migration Diagram', type: 'diagram', description: 'Application migration plan' },
      { id: 'c-app-a14', name: 'Software Distribution Diagram', type: 'diagram', description: 'Software deployment' }
    ],
    keyQuestions: [
      'What applications are needed to support business capabilities?',
      'Which applications should be built vs bought vs retired?',
      'How will applications integrate?',
      'What is the application portfolio strategy?',
      'What development approach will be used?'
    ],
    stakeholderFocus: ['Application Architects', 'Development Leads', 'Solution Architects', 'Integration Architects'],
    tips: [
      'Consider buy vs build vs SaaS for each capability',
      'Map applications to business capabilities, not org structure',
      'Plan integration architecture alongside applications',
      'Consider application lifecycle and technical debt'
    ]
  },
  {
    id: 'phase-d',
    code: 'D',
    name: 'Technology Architecture',
    fullName: 'Phase D: Technology Architecture',
    description: 'Develop the Target Technology Architecture that describes the logical and physical technology components required.',
    objectives: [
      'Develop Baseline Technology Architecture',
      'Develop Target Technology Architecture',
      'Perform gap analysis',
      'Define roadmap components',
      'Map technology to applications and data'
    ],
    inputs: [
      'Request for Architecture Work',
      'Architecture Vision',
      'Architecture Repository',
      'Business, Data, and Application Architecture outputs'
    ],
    outputs: [
      'Refined Architecture Vision',
      'Draft Architecture Definition Document (Technology)',
      'Draft Architecture Requirements Specification (Technology)',
      'Technology Architecture components of Architecture Roadmap'
    ],
    steps: [
      { id: 'd1', name: 'Select reference models and tools', description: 'Choose technology architecture viewpoints' },
      { id: 'd2', name: 'Develop Baseline Technology Architecture', description: 'Document current technology landscape' },
      { id: 'd3', name: 'Develop Target Technology Architecture', description: 'Design target infrastructure and platforms' },
      { id: 'd4', name: 'Perform gap analysis', description: 'Identify technology changes needed' },
      { id: 'd5', name: 'Define roadmap components', description: 'Plan technology implementation' },
      { id: 'd6', name: 'Resolve impacts', description: 'Finalize all architecture domain impacts' },
      { id: 'd7', name: 'Conduct stakeholder review', description: 'Validate with stakeholders' },
      { id: 'd8', name: 'Finalize Technology Architecture', description: 'Complete and approve' },
      { id: 'd9', name: 'Create Architecture Definition Document', description: 'Document the technology architecture' }
    ],
    deliverables: [
      { id: 'd-d1', name: 'Architecture Definition Document (Technology)', description: 'Baseline and target technology architecture', required: true },
      { id: 'd-d2', name: 'Architecture Requirements Specification (Technology)', description: 'Technology requirements', required: true }
    ],
    artifacts: [
      { id: 'd-a1', name: 'Technology Standards Catalog', type: 'catalog', description: 'Approved technology standards' },
      { id: 'd-a2', name: 'Technology Portfolio Catalog', type: 'catalog', description: 'Current and planned technology assets' },
      { id: 'd-a3', name: 'System/Technology Matrix', type: 'matrix', description: 'Applications mapped to technology' },
      { id: 'd-a4', name: 'Environments and Locations Diagram', type: 'diagram', description: 'Technology environments' },
      { id: 'd-a5', name: 'Platform Decomposition Diagram', type: 'diagram', description: 'Platform components' },
      { id: 'd-a6', name: 'Processing Diagram', type: 'diagram', description: 'Processing nodes and flows' },
      { id: 'd-a7', name: 'Networked Computing/Hardware Diagram', type: 'diagram', description: 'Network and hardware topology' },
      { id: 'd-a8', name: 'Communications Engineering Diagram', type: 'diagram', description: 'Network communications' }
    ],
    keyQuestions: [
      'What technology platforms are needed?',
      'What infrastructure changes are required?',
      'What are the technology standards?',
      'How will security be implemented?',
      'What is the cloud strategy?'
    ],
    stakeholderFocus: ['Infrastructure Architects', 'Security Architects', 'Network Engineers', 'Platform Engineers'],
    tips: [
      'Consider cloud vs on-premise vs hybrid',
      'Address security architecture explicitly',
      'Plan for scalability and performance',
      'Consider operational requirements (monitoring, backup, DR)'
    ]
  },
  {
    id: 'phase-e',
    code: 'E',
    name: 'Opportunities & Solutions',
    fullName: 'Phase E: Opportunities and Solutions',
    description: 'Generate the initial complete version of the Architecture Roadmap, based on gap analysis from phases B-D.',
    objectives: [
      'Determine whether incremental or transformational approach',
      'Identify major work packages',
      'Group work packages into Transition Architectures',
      'Develop Architecture Roadmap',
      'Ensure business value at each transition'
    ],
    inputs: [
      'Architecture Vision',
      'Architecture Definition Document (all domains)',
      'Architecture Requirements Specification',
      'Gap analysis results from B, C, D'
    ],
    outputs: [
      'Architecture Roadmap (initial)',
      'Transition Architectures',
      'Implementation and Migration Strategy',
      'Capability Assessment'
    ],
    steps: [
      { id: 'e1', name: 'Determine key constraints', description: 'Identify constraints on implementation' },
      { id: 'e2', name: 'Review and consolidate gap analysis', description: 'Bring together gaps from all domains' },
      { id: 'e3', name: 'Review architecture requirements', description: 'Ensure all requirements are addressed' },
      { id: 'e4', name: 'Consolidate and reconcile interoperability', description: 'Address integration requirements' },
      { id: 'e5', name: 'Refine and validate dependencies', description: 'Confirm project dependencies' },
      { id: 'e6', name: 'Confirm readiness and business transformation', description: 'Assess organizational readiness' },
      { id: 'e7', name: 'Formulate Implementation Strategy', description: 'Define the overall approach' },
      { id: 'e8', name: 'Identify Transition Architectures', description: 'Define intermediate states' },
      { id: 'e9', name: 'Create Architecture Roadmap', description: 'Develop the implementation roadmap' }
    ],
    deliverables: [
      { id: 'e-d1', name: 'Implementation and Migration Strategy', description: 'Overall approach to implementation', required: true },
      { id: 'e-d2', name: 'Architecture Roadmap', description: 'Phased plan for implementation', required: true },
      { id: 'e-d3', name: 'Transition Architecture', description: 'Intermediate architecture states', required: false }
    ],
    artifacts: [
      { id: 'e-a1', name: 'Project Context Diagram', type: 'diagram', description: 'Project scope and context' },
      { id: 'e-a2', name: 'Benefits Diagram', type: 'diagram', description: 'Business benefits mapping' }
    ],
    keyQuestions: [
      'What is the implementation sequence?',
      'What are the dependencies between projects?',
      'How many transition states are needed?',
      'What business value is delivered at each stage?',
      'Is the organization ready for this change?'
    ],
    stakeholderFocus: ['Program Managers', 'Portfolio Managers', 'Business Sponsors', 'Change Managers'],
    tips: [
      'Focus on delivering business value early',
      'Don\'t create too many transition architectures',
      'Consider organizational change capacity',
      'Build in flexibility for changing priorities'
    ]
  },
  {
    id: 'phase-f',
    code: 'F',
    name: 'Migration Planning',
    fullName: 'Phase F: Migration Planning',
    description: 'Finalize a detailed Implementation and Migration Plan that addresses how to move from the Baseline to Target Architecture.',
    objectives: [
      'Finalize the Architecture Roadmap',
      'Ensure Implementation Plan is aligned with enterprise approach',
      'Estimate resource requirements and timings',
      'Develop Implementation and Migration Plan',
      'Confirm architecture governance for implementation'
    ],
    inputs: [
      'Implementation and Migration Strategy',
      'Architecture Roadmap (from Phase E)',
      'Transition Architectures',
      'Implementation Factor Assessment'
    ],
    outputs: [
      'Finalized Implementation and Migration Plan',
      'Finalized Architecture Definition Document',
      'Finalized Architecture Requirements Specification',
      'Architecture Contract'
    ],
    steps: [
      { id: 'f1', name: 'Confirm management framework interactions', description: 'Align with project/portfolio management' },
      { id: 'f2', name: 'Assign business value to work packages', description: 'Quantify value for prioritization' },
      { id: 'f3', name: 'Estimate resource requirements', description: 'Determine costs and resources' },
      { id: 'f4', name: 'Prioritize migration projects', description: 'Rank projects by value and risk' },
      { id: 'f5', name: 'Confirm Architecture Roadmap', description: 'Finalize the roadmap' },
      { id: 'f6', name: 'Generate Implementation and Migration Plan', description: 'Create detailed plan' },
      { id: 'f7', name: 'Complete Architecture Development cycle', description: 'Wrap up architecture development' }
    ],
    deliverables: [
      { id: 'f-d1', name: 'Implementation and Migration Plan', description: 'Detailed plan for implementation', required: true },
      { id: 'f-d2', name: 'Architecture Contract', description: 'Agreement between architecture and implementation', required: true },
      { id: 'f-d3', name: 'Finalized Architecture Definition Document', description: 'Complete architecture document', required: true }
    ],
    artifacts: [
      { id: 'f-a1', name: 'Implementation Factor Assessment', type: 'catalog', description: 'Factors affecting implementation' },
      { id: 'f-a2', name: 'Consolidated Gaps, Solutions, and Dependencies Matrix', type: 'matrix', description: 'Comprehensive gap analysis' },
      { id: 'f-a3', name: 'Architecture Roadmap', type: 'diagram', description: 'Visual roadmap of implementation' }
    ],
    keyQuestions: [
      'What is the detailed implementation plan?',
      'How will projects be sequenced?',
      'What resources are needed?',
      'How will governance work during implementation?',
      'What are the go/no-go criteria?'
    ],
    stakeholderFocus: ['Project Managers', 'Resource Managers', 'Portfolio Managers', 'Procurement'],
    tips: [
      'Align with existing project methodologies',
      'Get commitment on resource allocation',
      'Build in governance checkpoints',
      'Plan for risk mitigation'
    ]
  },
  {
    id: 'phase-g',
    code: 'G',
    name: 'Implementation Governance',
    fullName: 'Phase G: Implementation Governance',
    description: 'Provide architectural oversight of the implementation projects. Ensure conformance with the Target Architecture.',
    objectives: [
      'Ensure conformance with Target Architecture',
      'Perform architecture governance functions',
      'Handle change requests during implementation',
      'Update Architecture Repository',
      'Monitor implementation projects'
    ],
    inputs: [
      'Implementation and Migration Plan',
      'Architecture Contract',
      'Architecture Definition Document',
      'Implementation project plans'
    ],
    outputs: [
      'Architecture Contract (signed)',
      'Compliance Assessments',
      'Change Requests',
      'Architecture-compliant solutions'
    ],
    steps: [
      { id: 'g1', name: 'Confirm scope and priorities', description: 'Verify implementation scope' },
      { id: 'g2', name: 'Identify deployment resources', description: 'Ensure resources are available' },
      { id: 'g3', name: 'Guide development of solutions', description: 'Provide architecture guidance' },
      { id: 'g4', name: 'Perform architecture compliance reviews', description: 'Check for compliance' },
      { id: 'g5', name: 'Implement business and IT operations', description: 'Support operational changes' },
      { id: 'g6', name: 'Perform post-implementation review', description: 'Assess implementation success' },
      { id: 'g7', name: 'Close implementation', description: 'Complete implementation phase' }
    ],
    deliverables: [
      { id: 'g-d1', name: 'Architecture Contract (signed)', description: 'Formal agreement for compliance', required: true },
      { id: 'g-d2', name: 'Compliance Assessments', description: 'Results of compliance reviews', required: true },
      { id: 'g-d3', name: 'Implementation Governance Model', description: 'How governance works in implementation', required: false }
    ],
    artifacts: [
      { id: 'g-a1', name: 'Architecture Compliance Review', type: 'catalog', description: 'Compliance review results' }
    ],
    keyQuestions: [
      'Are projects conforming to the architecture?',
      'What dispensations or waivers are needed?',
      'How are change requests being handled?',
      'Is the target architecture still valid?',
      'What lessons are being learned?'
    ],
    stakeholderFocus: ['Project Teams', 'Solution Architects', 'Quality Assurance', 'Architecture Board'],
    tips: [
      'Be pragmatic - some dispensations may be needed',
      'Keep architecture updated based on learnings',
      'Regular compliance reviews, not just at the end',
      'Document decisions and rationale'
    ]
  },
  {
    id: 'phase-h',
    code: 'H',
    name: 'Architecture Change Management',
    fullName: 'Phase H: Architecture Change Management',
    description: 'Establish procedures for managing change to the architecture. Monitor changes and determine whether to initiate a new ADM cycle.',
    objectives: [
      'Ensure architecture change management process is established',
      'Monitor changes in technology and business',
      'Assess changes and determine if new cycle needed',
      'Manage architecture governance',
      'Activate the process for implementing change'
    ],
    inputs: [
      'Implementation Governance outputs',
      'Change Requests',
      'Architecture Repository',
      'Performance metrics'
    ],
    outputs: [
      'Architecture updates',
      'Changes to Architecture Framework',
      'New Request for Architecture Work (if needed)',
      'Statement of Architecture Work (for new cycle)'
    ],
    steps: [
      { id: 'h1', name: 'Establish value realization process', description: 'Track business value delivery' },
      { id: 'h2', name: 'Deploy monitoring tools', description: 'Set up architecture monitoring' },
      { id: 'h3', name: 'Manage risks', description: 'Monitor and mitigate architecture risks' },
      { id: 'h4', name: 'Provide analysis for architecture change management', description: 'Assess change impacts' },
      { id: 'h5', name: 'Develop change requirements', description: 'Document needed changes' },
      { id: 'h6', name: 'Manage governance process', description: 'Execute governance procedures' },
      { id: 'h7', name: 'Activate process for new ADM cycle', description: 'Initiate new cycle if needed' }
    ],
    deliverables: [
      { id: 'h-d1', name: 'Architecture Updates', description: 'Changes to the architecture', required: true },
      { id: 'h-d2', name: 'Changes to Architecture Framework', description: 'Framework improvements', required: false },
      { id: 'h-d3', name: 'Request for Architecture Work (if new cycle)', description: 'Trigger for new ADM cycle', required: false }
    ],
    artifacts: [],
    keyQuestions: [
      'Is the architecture still meeting business needs?',
      'What changes have occurred in technology or business?',
      'Should we start a new ADM cycle?',
      'What process improvements are needed?',
      'How effective was this architecture cycle?'
    ],
    stakeholderFocus: ['Architecture Board', 'Business Executives', 'Change Advisory Board', 'IT Operations'],
    tips: [
      'Establish clear thresholds for triggering new cycles',
      'Continuously monitor technology trends',
      'Build feedback loops with operations',
      'Keep architecture evergreen, not stale'
    ]
  },
  {
    id: 'requirements-management',
    code: 'RM',
    name: 'Requirements Management',
    fullName: 'Requirements Management',
    description: 'The process of managing architecture requirements throughout the ADM cycle. This is a continuous process that operates across all phases.',
    objectives: [
      'Identify requirements for enterprise architecture',
      'Baseline requirements',
      'Monitor baseline requirements',
      'Identify changed requirements',
      'Assess impact of changed requirements',
      'Ensure Requirements Management process is sustained'
    ],
    inputs: [
      'Requirements from all ADM phases',
      'Architecture Requirements Specification',
      'Change requests',
      'Impact assessments'
    ],
    outputs: [
      'Requirements Impact Assessment',
      'Architecture Requirements Specification (updated)',
      'Recommendations on changes'
    ],
    steps: [
      { id: 'rm1', name: 'Identify/document requirements', description: 'Capture all requirements' },
      { id: 'rm2', name: 'Baseline requirements', description: 'Establish baseline for tracking' },
      { id: 'rm3', name: 'Monitor baseline', description: 'Track requirement changes' },
      { id: 'rm4', name: 'Identify changed requirements', description: 'Detect requirement changes' },
      { id: 'rm5', name: 'Assess impact', description: 'Evaluate impact of changes' },
      { id: 'rm6', name: 'Update requirements', description: 'Modify requirements as needed' },
      { id: 'rm7', name: 'Implement requirements in phases', description: 'Apply requirements to ADM phases' }
    ],
    deliverables: [
      { id: 'rm-d1', name: 'Architecture Requirements Specification', description: 'Complete requirements document', required: true },
      { id: 'rm-d2', name: 'Requirements Impact Assessment', description: 'Analysis of requirement changes', required: true }
    ],
    artifacts: [
      { id: 'rm-a1', name: 'Requirements Catalog', type: 'catalog', description: 'All architecture requirements' }
    ],
    keyQuestions: [
      'What requirements have changed?',
      'What is the impact of the change?',
      'Which phase should address this requirement?',
      'Is the requirement still valid?',
      'How should conflicting requirements be prioritized?'
    ],
    stakeholderFocus: ['Business Analysts', 'All ADM Phase Stakeholders', 'Requirements Managers'],
    tips: [
      'Requirements Management spans all phases',
      'Keep requirements traceable',
      'Link requirements to business goals',
      'Have a clear change management process'
    ]
  }
];

// Helper function to get phase by ID
export function getPhaseById(id: string): Phase | undefined {
  return phases.find(phase => phase.id === id);
}

// Helper function to get phase by code
export function getPhaseByCode(code: string): Phase | undefined {
  return phases.find(phase => phase.code === code);
}

// Get all phases in order
export function getAllPhases(): Phase[] {
  return phases;
}

// Get phase navigation (previous and next)
export function getPhaseNavigation(currentId: string): { prev: Phase | null; next: Phase | null } {
  const index = phases.findIndex(p => p.id === currentId);
  return {
    prev: index > 0 ? phases[index - 1] : null,
    next: index < phases.length - 1 ? phases[index + 1] : null
  };
}

// ADM cycle order for visualization
export const admCycleOrder = [
  'preliminary',
  'phase-a',
  'phase-b',
  'phase-c-is',
  'phase-c-app',
  'phase-d',
  'phase-e',
  'phase-f',
  'phase-g',
  'phase-h'
];

