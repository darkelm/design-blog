/**
 * Content Registry
 * 
 * Centralized registry for article HTML content.
 * This separates content from structure, making it easier to:
 * - Add new articles without modifying the factory function
 * - Maintain content independently
 * - Validate content before use
 * - Reuse content across different contexts
 * 
 * Separation of Concerns:
 * - Content: This file
 * - Structure: mockData.ts
 * - Validation: mockData.ts (createMockPost)
 */

export interface ArticleContent {
  html: string
}

/**
 * Registry of article content by post ID
 * 
 * To add new article content:
 * 1. Add your HTML content here with the post ID as the key
 * 2. The createMockPost function will automatically use it if available
 */
export const articleContentRegistry: Record<string, ArticleContent> = {
  'persp-1': {
    html: `<h1>The Three-Person Product Team: How AI Is Reshaping Who Gets to Build</h1>

<p><strong>April 2025</strong></p>

<p>There's a quiet revolution happening in product organizations, and it's not about the technology itself. It's about who gets to wield it.</p>

<p>For decades, the economics of building digital products demanded scale. You needed researchers to understand problems, strategists to frame opportunities, designers to envision solutions, engineers to build them, analysts to measure them, and project managers to keep everyone coordinated. A "lean" product team was still a dozen people. A serious one was fifty or more.</p>

<p>That arithmetic is changing. AI hasn't just automated tasks — it's collapsed the distance between thinking and making. And in that collapse, something unexpected is emerging: the rise of the small team with outsized capability, and the designer who operates not as a specialist within a larger machine but as a strategic leader who happens to use design as their primary medium.</p>

<h2>The Old Constraint Was Execution</h2>

<p>Product development has always been bottlenecked by the gap between having an idea and realizing it. A designer could envision a feature in an afternoon, but building it required weeks of engineering time. A strategist could identify a market opportunity in a single workshop, but validating it meant months of research sprints.</p>

<p>This execution gap created organizational structures designed to manage scarcity. Specialized roles emerged to maximize the efficiency of expensive capabilities. Designers designed. Engineers engineered. Researchers researched. The cost of context-switching was lower than the cost of cross-training, so we built silos and connected them with handoffs, documentation, and meetings.</p>

<p>AI dissolves this constraint — not completely, but enough to restructure the equation. When a designer can generate working prototypes in hours instead of days, when market research that once required a team can be synthesized by a single person with the right tools, when data analysis becomes conversational rather than requiring specialized query languages — the justification for large, specialized teams weakens.</p>

<p>The bottleneck shifts from execution to judgment.</p>

<h2>What Changes When Making Gets Cheap</h2>

<p>When the cost of making things drops dramatically, several things happen simultaneously.</p>

<p>First, iteration becomes the dominant strategy. The old model rewarded getting things right before building, because building was expensive. The new model rewards building to learn, because building is cheap. Teams that can cycle through ideas quickly outpace teams that deliberate extensively before committing.</p>

<p>Second, breadth becomes more valuable than depth. In a world of specialized teams, deep expertise in a narrow domain was essential — you needed to maximize your contribution within your lane. In a world where AI handles much of the specialized execution, the ability to see across domains becomes the scarce resource. The person who can connect market insight to technical possibility to user need to business model creates more value than the person who can execute perfectly within a single function.</p>

<p>Third, taste becomes a competitive advantage. When everyone can generate competent outputs, the ability to discern which outputs matter — which ideas are worth pursuing, which executions resonate, which directions align with something true about the market — separates meaningful work from noise.</p>

<p>These shifts favor a particular kind of practitioner: the generalist with strong judgment, high iteration speed, and the ability to operate across the full stack of product development. Designers, it turns out, have been training for this role for years.</p>

<h2>Design's Unexpected Preparation</h2>

<p>Design as a discipline has always been uncomfortable with its own boundaries. Designers have perpetually pushed into adjacent territories — conducting their own research, learning enough code to prototype, studying business models to understand constraints, dabbling in strategy to influence direction. This restlessness was often treated as a problem, a lack of focus, a refusal to stay in lane.</p>

<p>It was actually preparation.</p>

<p>The skills that define contemporary design practice — systems thinking, synthesis of qualitative and quantitative inputs, rapid prototyping, visual communication, comfort with ambiguity, iteration as a way of thinking — are precisely the skills that AI amplifies. A designer who can use AI effectively isn't just a faster designer. They're a researcher-strategist-designer-analyst hybrid who can operate across the entire product development cycle.</p>

<p>Consider what a skilled designer can now do in a single day: synthesize competitive research across dozens of products, generate strategic positioning frameworks, explore multiple concept directions with high-fidelity prototypes, create business model variations, build a working proof-of-concept, and produce presentation materials to communicate the vision. Each of these tasks once required either specialized expertise or significant time investment. Now they require taste, judgment, and fluency with AI tools.</p>

<p>This isn't about designers "doing everyone else's job." It's about the boundaries between jobs becoming porous enough that a small team with the right capabilities can move faster and more coherently than a large team with traditional handoffs.</p>

<h2>The Emergence of the Designer-Founder</h2>

<p>We're beginning to see a new archetype emerge: the designer who operates as a de facto product leader, not because they've been promoted into management but because they've accumulated the capabilities to drive a product forward with minimal dependencies.</p>

<p>These practitioners don't think of themselves as designers who also do strategy, or designers who've learned business. They've internalized a more integrated identity — someone who uses whatever tools and methods are appropriate to move from problem to solution to market. Design happens to be their home base, the discipline that shaped their thinking, but they operate fluidly across territories.</p>

<p>In startup contexts, this archetype is founding companies with remarkably small teams. Two or three people building products that previously required ten or twenty. They're not skipping steps — they're compressing them, using AI to handle execution while they focus on the judgment calls that matter.</p>

<p>In larger organizations, this archetype is taking on expanded scope within product teams. They're the person who can zoom out to strategic questions and zoom in to implementation details, who can hold the whole picture while others focus on components. They become, often without the formal title, the integrating force that makes small teams function like much larger ones.</p>

<h2>What This Demands</h2>

<p>Operating this way isn't simply a matter of adding AI tools to an existing practice. It requires a different orientation to work.</p>

<p>It requires comfort with perpetual learning. The AI landscape shifts constantly, and the practitioner who gets attached to specific tools or workflows will find their advantage eroding. What matters is the meta-skill of rapidly learning and evaluating new capabilities as they emerge.</p>

<p>It requires discipline about what not to do. When making things becomes cheap, the temptation is to make everything — to explore every direction, prototype every idea, analyze every dataset. The practitioners who thrive will be those who maintain strategic focus, who use AI's speed to go deeper on what matters rather than wider across everything.</p>

<p>It requires a new relationship with quality. AI outputs are often good enough to be useful but not good enough to ship. The practitioner needs to develop instincts for when to polish, when to accept imperfection, and when good-enough-to-learn is more valuable than perfect-but-slow.</p>

<p>And it requires intellectual honesty about limitations. Small teams moving fast can create remarkable things, but they can also miss important perspectives that larger, more diverse teams catch. The designer operating as a strategic leader needs to build in mechanisms for challenge and outside input, to avoid the blind spots that come from working in a small, like-minded group.</p>

<h2>The Organizational Implications</h2>

<p>If this shift plays out — if small, AI-augmented teams become genuinely more effective than traditional large teams — the implications for how companies organize are significant.</p>

<p>We might see a return to something like the early startup model, where small teams own entire product areas with high autonomy, but applied within larger organizational contexts. Product development could become less like a manufacturing process with specialized stations and more like a network of small studios, each capable of end-to-end delivery.</p>

<p>The role of management in such structures shifts from coordination and resource allocation toward vision-setting and quality control. When small teams can execute independently, the organizational challenge becomes ensuring they're pointed in the right direction and maintaining coherence across efforts.</p>

<p>Design leadership, specifically, faces an interesting evolution. The traditional path from individual contributor to manager may become less relevant when individual contributors can achieve outsized impact without direct reports. New forms of leadership may emerge — influence through craft excellence, through frameworks that shape how others work, through the artifacts that set standards for an organization.</p>

<h2>An Invitation, Not a Guarantee</h2>

<p>None of this is inevitable. AI could develop in ways that favor different organizational models. Companies could resist structural change, preferring familiar patterns even at the cost of efficiency. The economics of specific industries could create exceptions and counter-trends.</p>

<p>But for designers paying attention, this moment is an invitation. The tools now exist to operate across the full spectrum of product development — from strategy through execution to measurement. The skills that design has cultivated for decades turn out to be remarkably well-suited to this new landscape. The question is whether designers will claim this expanded territory or cede it to others.</p>

<p>The three-person product team is no longer a fantasy or a scrappy early-stage compromise. It's becoming, in many contexts, the most effective unit for creating new products. And within that small team, the designer who can think strategically, execute rapidly, and exercise judgment across domains has an opportunity to lead in ways that weren't possible a generation ago.</p>

<p>The constraints that limited what designers could do weren't about capability. They were about the economics of execution. Those economics have changed.</p>

<p>What we do with that change is up to us.</p>

<p><em>Published by the Design Editorial Team, April 2025</em></p>`
  },
  'spot-1': {
    html: `<h1>Shaping Journeys: Service Design in the Age of AI</h1>

<p><strong>April 2025</strong></p>

<hr />

<p>As artificial intelligence reshapes how organizations deliver value to their customers, we're reflecting on what this means for the practice of service design itself. Service design has always been about orchestrating complex systems of people, processes, and touchpoints — but what happens when AI becomes a core actor in those systems? We sat down with Service Designer Maya Chen to discuss how she's navigating this evolving landscape, the new challenges it presents, and why she believes we're entering the most exciting era for the discipline. Let's dive in.</p>

<hr />

<h2>Firstly, can you tell us a bit about what you do and how AI has started to change your practice?</h2>

<p>I'm a Service Designer working primarily in healthcare, where I help organizations design end-to-end experiences for patients navigating complex care journeys. Traditionally, my work has focused on mapping touchpoints, identifying pain points, and orchestrating better handoffs between humans — nurses, administrators, specialists, and the patients themselves.</p>

<p>What's shifted in the past year is that AI is no longer just a backend optimization tool. It's becoming a visible participant in the service. Patients now interact with AI triage systems before speaking to a nurse. Clinicians use AI-assisted diagnostic tools during consultations. My job has expanded from designing human-to-human interactions to designing human-to-AI-to-human flows. I'm essentially choreographing a new kind of ensemble cast.</p>

<hr />

<h2>How has your approach to mapping journeys evolved? What's different about designing services that include AI actors?</h2>

<p>The fundamentals haven't changed — I still start with deep research, shadowing users, conducting interviews, and building journey maps. But I've added new layers to my frameworks. When I map a journey now, I'm not just plotting what the customer does and feels. I'm also mapping what the AI knows at each moment, what decisions it's making, and where it hands off to humans.</p>

<p>I've started using what I call "intelligence maps" alongside traditional journey maps. These track the flow of data and context through a service. Where does the AI gain understanding? Where does it lose it? If a patient explains their symptoms to an AI chatbot and then has to repeat everything to a human agent, that's a failure of context continuity — and it's my job to design systems where that handoff is seamless.</p>

<p>The other shift is thinking about AI not as a static tool but as something that learns and changes. I have to design for services that will behave differently six months from now than they do today, as the AI improves or adapts. That's a new kind of design challenge.</p>

<hr />

<h2>What's been the most challenging part of designing AI-powered services?</h2>

<p>Honestly, it's trust calibration. Designing the right level of trust between humans and AI systems is incredibly nuanced. Too much trust, and users over-rely on AI recommendations without critical thinking — which can be dangerous in healthcare. Too little trust, and the AI becomes friction rather than help. People ignore it or work around it.</p>

<p>I spend a lot of time now on what I call "trust choreography" — designing moments where the AI demonstrates its reasoning, admits uncertainty, or explicitly invites human judgment. It's not enough for the AI to be accurate. Users need to understand <em>why</em> they should trust it in this specific moment, for this specific task.</p>

<p>The other challenge is designing for failure gracefully. AI systems will make mistakes. My job is to ensure those mistakes don't cascade into service breakdowns. That means building in human checkpoints, designing clear escalation paths, and making sure users always feel they have agency to override or question the AI.</p>

<hr />

<h2>What does critique and feedback look like when you're designing these kinds of services?</h2>

<p>It's become much more interdisciplinary. In the past, I'd primarily crit with other designers — reviewing journey maps, debating information architecture, stress-testing edge cases. Now my critique sessions include data scientists, ML engineers, and ethicists.</p>

<p>We'll look at a proposed service flow and ask questions that would have seemed strange five years ago: "What happens if the model is confidently wrong here?" "How do we communicate uncertainty without creating anxiety?" "What biases might be embedded in this recommendation?" These aren't afterthought questions — they're central to the design critique.</p>

<p>I've also started running "red team" sessions where we deliberately try to break the AI's experience. We roleplay as confused users, adversarial users, edge-case users. It's uncomfortable but essential. You learn so much about where your service design assumptions fail.</p>

<hr />

<h2>How has your collaboration with engineers and data scientists changed?</h2>

<p>It's become much more iterative and embedded. I used to hand off journey maps and service blueprints to engineering teams and then check in during implementation. Now I'm in working sessions with ML engineers from the start, because design decisions and technical decisions are deeply intertwined.</p>

<p>For example, I recently worked on a project where we were designing an AI assistant for post-surgical recovery. Early on, I learned that the model could either be very personalized (using detailed patient history) or very private (using minimal data). That's not a technical decision or a design decision — it's both. We had to work through it together, understanding the tradeoffs and designing a service that gave patients meaningful control over that spectrum.</p>

<p>The most productive relationships I have with engineers now are ones where we're genuinely co-designing. They teach me about model capabilities and constraints. I teach them about user mental models and emotional journeys. The best solutions emerge from that intersection.</p>

<hr />

<h2>What excites you most about this evolution in service design?</h2>

<p>Two things. First, the scope of what's designable has expanded enormously. Services that were previously impossible to personalize at scale — because they required too much human attention — can now adapt to individual needs. That's genuinely exciting for domains like healthcare, education, and financial services where one-size-fits-all has always been the compromise.</p>

<p>Second, I think AI is forcing our discipline to get more rigorous about things we've always cared about but sometimes treated as soft concerns: transparency, trust, ethics, human agency. When you're designing AI-powered services, you can't hand-wave these issues. They're concrete design challenges that require concrete solutions. That's making us better designers.</p>

<p>We're still early in this evolution. The services I'm designing now will look primitive in five years. But we're laying the groundwork — developing the frameworks, the vocabulary, the critique practices — for a new era of service design. And I find that genuinely thrilling.</p>

<hr />

<h2>What advice would you give to service designers who are just starting to work with AI?</h2>

<p>Get curious about the technology, but stay grounded in human needs. The designers who will thrive aren't the ones who become AI experts — they're the ones who can translate between human experiences and technical capabilities. Learn enough about how these systems work to ask good questions and spot design opportunities. But never forget that your job is to advocate for the people using these services.</p>

<p>And start designing for AI's limitations, not just its capabilities. The most elegant AI-powered services I've seen aren't the ones where AI does the most — they're the ones where AI and humans complement each other beautifully. That's the real design challenge.</p>

<hr />

<p><em>A huge thank you to all the cross-functional partners who are helping shape this new era of service design — the researchers, engineers, data scientists, ethicists, and fellow designers who are navigating this together.</em></p>`
  },
  'persp-2': {
    html: `<h1>Designing Matter: How Generative AI Is Reshaping Industrial Design</h1>

<p><strong>May 2025</strong></p>

<hr />

<p>When you pick up a thoughtfully designed object — a chair that fits your body perfectly, a kitchen tool that anticipates your grip, a speaker that disappears into your shelf until you need it — you're holding the result of countless hours of sketching, prototyping, testing, and refining. Industrial designers have long navigated the space between imagination and physics, dreaming up forms that must eventually exist in the unforgiving reality of materials, manufacturing, and human hands.</p>

<p>Now, generative AI is entering that process — not as a replacement for the designer's eye, but as a collaborator that speaks a new language somewhere between intention and form. Across studios and design teams, industrial designers are discovering what it means to work alongside systems that can generate hundreds of variations in minutes, that can suggest structural solutions humans might never consider, and that challenge designers to articulate what they actually want in ways they never had to before.</p>

<p>So what are designers learning from this new partnership between human intuition and machine generation? It turns out, the answers are as much about rediscovering what makes us human as they are about the technology itself.</p>

<hr />

<h2>The Conversation Starts Differently Now</h2>

<p><strong>"I used to start with a pencil. Now I start with a paragraph. And weirdly, that paragraph forces me to know what I want before I even begin."</strong></p>

<p>— Marcus Webb, senior industrial designer, consumer electronics</p>

<p>A designer sits at a workstation surrounded by 3D-printed prototypes in various stages of refinement, a large monitor displaying dozens of AI-generated form variations.</p>

<hr />

<p>The traditional industrial design process begins with sketching — loose, gestural drawings that capture the spirit of an idea before committing to specifics. It's a conversation between hand and eye, where happy accidents often lead to breakthroughs. Generative AI introduces a different kind of conversation, one that begins with language.</p>

<p>When designers prompt an AI system to generate form concepts, they must first articulate their intentions in words. What feeling should this object evoke? What constraints matter? What references should it echo or avoid? This linguistic starting point has proven unexpectedly valuable.</p>

<p>Designers report that the discipline of writing prompts has sharpened their thinking. Before AI, a designer might hold a vague sense of "something organic but modern" in their mind and sketch toward it intuitively. Now, they must unpack that instinct: What specific qualities make something feel organic? Which modern references? How should those two impulses interact?</p>

<p>The AI doesn't understand these concepts the way a human collaborator would. But the act of explaining — even to a system that processes words differently than we do — clarifies the designer's own vision.</p>

<hr />

<h2>A Thousand Variations Before Lunch</h2>

<p><strong>"The AI doesn't get tired. It doesn't get attached. It'll give you a hundred options without any ego about which one you pick. That's liberating, but it's also overwhelming if you don't know what you're looking for."</strong></p>

<p>— Priya Sharma, design director, furniture and lighting</p>

<p>A studio wall covered in printed AI-generated concept renders, with colored sticky notes and hand-drawn annotations clustering certain designs into groups.</p>

<hr />

<p>One of the most immediate impacts of generative AI on industrial design is sheer volume. Where a designer might previously develop five to ten initial concepts for a product, AI can generate hundreds of variations exploring different formal directions, material expressions, and proportional relationships.</p>

<p>This abundance creates a new challenge: curation. Designers are developing new workflows for rapidly sorting, grouping, and evaluating AI outputs. Some teams have created custom rating systems. Others pin generations to studio walls and use physical clustering to find patterns. Many describe a process of "hunting" through outputs for sparks — small details or unexpected combinations that trigger recognition of something worth pursuing.</p>

<p>The skill isn't in generating more options. It's in recognizing which options contain seeds of something meaningful. Experienced designers find they can scan through AI outputs quickly, their trained eye catching formal relationships and functional possibilities that less experienced team members miss.</p>

<p>This has surfaced an interesting truth: taste and judgment, the qualities that seemed most ineffable about design expertise, have become more valuable, not less. When anyone can generate plausible forms, the ability to identify which forms matter is the differentiator.</p>

<hr />

<h2>When the Machine Surprises You</h2>

<p><strong>"There was this one generation — I almost scrolled past it — where the AI had merged the handle and the body in a way I never would have drawn. It broke a rule I didn't know I was following. That's when it got interesting."</strong></p>

<p>— Daniel Ochoa, lead designer, kitchen products</p>

<p>Close-up photography of a ceramic pitcher with an unusual integrated handle form, alongside the AI-generated concept render that inspired it and early clay prototypes.</p>

<hr />

<p>The most compelling moments in AI-assisted industrial design aren't when the machine gives designers exactly what they asked for. They're when it gives them something they didn't know to ask for.</p>

<p>Generative AI systems have no inherent sense of "how things are usually done." They haven't internalized the conventions that experienced designers absorb over years of practice. This naivety can produce nonsense — forms that couldn't be manufactured, proportions that feel wrong, details that ignore functional requirements.</p>

<p>But occasionally, it produces genuine surprises. The AI might combine elements in unexpected ways, suggest structural approaches that challenge assumptions, or stumble onto forms that feel fresh precisely because they don't follow established patterns.</p>

<p>Designers describe learning to tune their attention for these moments. The goal isn't to use AI outputs directly — they almost always require substantial refinement — but to let the AI disrupt habitual thinking. One designer compared it to working with a collaborator who doesn't speak your language: the miscommunications are usually frustrating, but occasionally they reveal something neither of you would have found alone.</p>

<hr />

<h2>The Translation Problem</h2>

<p><strong>"The AI thinks in pixels. I think in millimeters of aluminum. Getting from one to the other is where all the real work happens."</strong></p>

<p>— Kenji Murakami, materials engineer, consumer devices</p>

<p>A split image showing an AI-generated concept render of a sleek device alongside the physical prototype, with callouts highlighting where the digital vision had to adapt to material realities.</p>

<hr />

<p>There's a fundamental gap between what generative AI produces and what can exist in the physical world. AI-generated images look convincing but aren't bound by physics. They suggest materials that don't exist, forms that couldn't be manufactured, and details that ignore how objects are actually assembled.</p>

<p>Industrial designers have always navigated constraints — that's the job. But AI introduces a new version of this challenge. The generated concept might be beautiful, but can it be injection molded? Can it be held comfortably? Will it survive a drop test? Does the form even make sense when you rotate it to angles the AI didn't show?</p>

<p>Teams are developing new translation workflows. Some designers use AI generations purely as mood references, extracting color relationships or proportional feelings without trying to replicate specific forms. Others take promising generations into CAD software and attempt to reverse-engineer buildable versions, using the AI output as a north star while making countless practical compromises.</p>

<p>The most sophisticated approaches treat AI generation and physical prototyping as a continuous loop. Generate, print, hold, evaluate, refine the prompt, generate again. Each physical prototype reveals what the digital generation got wrong, and that knowledge improves the next round of prompts.</p>

<hr />

<h2>Finding the Feeling</h2>

<p><strong>"We kept generating chairs that looked right but felt wrong. Eventually we realized we were prompting for aesthetics when we should have been prompting for posture, for the moment when you finally sit down after a long day. The AI doesn't know that feeling. We do."</strong></p>

<p>— Sofia Lindgren, design lead, residential furniture</p>

<p>Lifestyle photography of a person sinking into a thoughtfully designed armchair, the soft evening light emphasizing the chair's embracing form.</p>

<hr />

<p>Generative AI excels at visual pattern-matching. It can produce forms that look like chairs, that echo mid-century or contemporary or Scandinavian references, that combine materials in visually coherent ways. What it cannot do is understand why someone needs a chair in the first place.</p>

<p>Industrial design, at its best, isn't about creating attractive objects. It's about serving human needs, rituals, and emotions through physical form. The chair isn't just something to look at — it's something to collapse into after an exhausting day, to pull up when a friend visits unexpectedly, to grow old in.</p>

<p>Designers are learning to prompt for feelings rather than forms. Instead of describing visual characteristics, they describe scenarios, emotions, relationships. The results are imperfect — the AI still interprets these prompts through its visual training — but the reframing helps designers stay connected to the human purposes that objects serve.</p>

<p>This has reinforced a truth that predates AI: the best industrial design starts with deep empathy for how people actually live, not with formal invention for its own sake. AI can accelerate exploration, but it can't substitute for understanding.</p>

<hr />

<h2>The Studio Changes Shape</h2>

<p><strong>"We used to have a sketching pit where junior designers would work through ideas together. Now we have something more like a curation room — screens everywhere, people clustering around printouts, a lot more conversation about why something works than how to draw it."</strong></p>

<p>— Tomás Reyes, studio director, design consultancy</p>

<p>A modern design studio with large format displays showing AI-generated concepts, 3D printers running in the background, and designers gathered around a central table covered in physical models and material samples.</p>

<hr />

<p>The introduction of AI is reshaping the physical and social architecture of design studios. When generation becomes cheap and fast, the bottleneck moves to evaluation and refinement. Studios are adapting their spaces and rituals accordingly.</p>

<p>Some teams have created dedicated "generation stations" where designers can rapidly produce and print AI outputs without disrupting focused work. Others have established daily "hunt" sessions where the team reviews the most promising generations together, building shared vocabulary for what they're seeking.</p>

<p>The role of junior designers is evolving. Traditional apprenticeship involved learning to sketch, to translate ideas into drawings that could communicate intent. AI compresses that process, but it also raises the bar for what juniors must contribute. If the machine can generate countless options, the human value lies in knowing which options matter and why.</p>

<p>Senior designers report spending more time teaching judgment than technique — helping junior team members develop the critical eye that distinguishes promising directions from superficially attractive dead ends. The tacit knowledge that once transferred through years of sketching together now transfers through hours of evaluating together.</p>

<hr />

<h2>Material Truth</h2>

<p><strong>"You can prompt for 'warm wood grain' but the AI has no idea that wood is alive, that it has memory, that it responds to humidity. The gap between the image and the material is where craft lives."</strong></p>

<p>— Ana Kowalski, materials specialist, sustainable furniture</p>

<p>Close-up of hands working with actual wood samples alongside AI-generated furniture concepts, demonstrating the difference between digital representation and physical reality.</p>

<hr />

<p>Industrial design is ultimately about materials — their properties, their behaviors, their expressive possibilities, their limitations. Wood is not the same as plastic is not the same as aluminum is not the same as ceramic, and no amount of image generation changes that.</p>

<p>Designers with deep materials knowledge have found AI most useful when combined with their physical expertise. They can look at a generated form and immediately see where the material logic fails, where the depicted joins couldn't actually work, where the surface treatment contradicts the structural requirement. This allows them to extract what's valuable from generations while discarding what's physically impossible.</p>

<p>Studios are investing more heavily in physical prototyping even as they adopt AI for concept generation. The digital acceleration makes it more important, not less, to get ideas into physical form quickly. Only by holding, using, and testing objects can designers evaluate whether the formal ideas translate into functional reality.</p>

<p>This points toward a broader principle: AI amplifies human expertise rather than replacing it. Designers who deeply understand materials, manufacturing, and human factors get more value from AI tools because they can evaluate and refine outputs more effectively. The machine generates options; the human brings knowledge that the machine lacks.</p>

<hr />

<h2>What We're Reaching For</h2>

<p><strong>"The question I keep asking myself is: does this help me make things that matter? Not just more things, or faster things, but things that genuinely improve how people live. On good days, the answer is yes."</strong></p>

<p>— Jennifer Tao, VP of design, consumer products</p>

<p>A quiet image of a beautifully designed object in use in a real home — perhaps a lamp casting warm light over a family dinner, or a thoughtfully designed container on a kitchen counter — emphasizing the human context that gives design meaning.</p>

<hr />

<p>Generative AI is still finding its place in industrial design practice. The tools are evolving rapidly, the workflows are being invented in real-time, and the long-term implications remain unclear.</p>

<p>But through the experiments and adaptations of the past year, certain truths are emerging. AI is powerful for exploration, for breaking habitual thinking, for accelerating the journey from intention to tangible option. It is not powerful for understanding human needs, for making judgment calls about what matters, for navigating the irreducible complexity of physical materials and manufacturing constraints.</p>

<p>The designers who are finding success aren't those who use AI most intensively. They're those who have developed clear perspectives on where AI helps and where it doesn't, who maintain their connection to the human purposes that objects serve, and who treat the technology as one tool among many rather than a replacement for their expertise.</p>

<p>Industrial design has always been about shaping matter to serve human life. AI changes how that shaping happens. It doesn't change why it matters.</p>

<hr />

<p><em>Learn more about the evolving intersection of design and AI tools, including workflows and case studies from practicing designers.</em></p>

<hr />

<h2>Contributors</h2>

<p><strong>Marcus Webb</strong></p>

<p>Senior Industrial Designer, Consumer Electronics</p>

<p><strong>Priya Sharma</strong></p>

<p>Design Director, Furniture and Lighting</p>

<p>LinkedIn</p>

<p><strong>Daniel Ochoa</strong></p>

<p>Lead Designer, Kitchen Products</p>

<p>LinkedIn</p>

<p><strong>Kenji Murakami</strong></p>

<p>Materials Engineer, Consumer Devices</p>

<p><strong>Sofia Lindgren</strong></p>

<p>Design Lead, Residential Furniture</p>

<p>LinkedIn</p>

<p><strong>Tomás Reyes</strong></p>

<p>Studio Director, Design Consultancy</p>

<p>LinkedIn</p>

<p><strong>Ana Kowalski</strong></p>

<p>Materials Specialist, Sustainable Furniture</p>

<p><strong>Jennifer Tao</strong></p>

<p>VP of Design, Consumer Products</p>

<p>LinkedIn</p>`
  },
}

/**
 * Get article content by post ID
 * 
 * @param postId - The post ID to look up
 * @returns The article content if found, undefined otherwise
 */
export function getArticleContent(postId: string): ArticleContent | undefined {
  return articleContentRegistry[postId]
}

