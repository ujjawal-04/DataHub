export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">About AlgoViz Pro</h1>
      <p className="text-muted-foreground mb-4">
        AlgoViz Pro is an interactive platform designed to help students, developers, and enthusiasts learn and visualize various algorithms and data structures. Our goal is to make complex computer science concepts more accessible and engaging through interactive visualizations.
      </p>
      <p className="text-muted-foreground mb-4">
        We offer visualizations for:
      </p>
      <ul className="list-disc list-inside mb-4 text-muted-foreground">
        <li>Data Structures</li>
        <li>Sorting Algorithms</li>
        <li>Searching Algorithms</li>
        <li>Graph Algorithms</li>
        <li>Dynamic Programming</li>
        <li>Greedy Algorithms</li>
      </ul>
      <p className="text-muted-foreground">
        Whether you're a student preparing for exams, a developer brushing up on your skills, or simply curious about how algorithms work, AlgoViz Pro provides an intuitive and interactive way to explore these fundamental computer science concepts.
      </p>
    </div>
  )
}

