import './About.css';

const sections = [
  {
    title: 'Overview',
    content:
      'Habit Tracker & Streak Dashboard is a React app for tracking daily routines, visualizing consistency, and building streaks without needing a backend.',
  },
  {
    title: 'Features',
    items: [
      'Add, edit, delete, and complete habits.',
      'Track current streak, longest streak, and daily progress.',
      'View a 30-day consistency heatmap with category filtering.',
      'Explore insights, best habit, completion rate, and habit momentum.',
      'Use Pomodoro focus tracking and a weekly freeze token.',
    ],
  },
  {
    title: 'Tech Stack',
    items: ['React', 'React Router DOM', 'JavaScript', 'CSS', 'localStorage', 'Vite', 'lucide-react'],
  },
  {
    title: 'Usage',
    items: [
      'Open the app and click Begin Tracking.',
      'Create a habit by filling in name, category, and frequency.',
      'Mark habits done each day to build streaks.',
      'Use Insights to review completion rate and habit momentum.',
    ],
  },
  {
    title: 'Project Structure',
    items: [
      'src/app: app routing and layout.',
      'src/features: pages and feature-specific components.',
      'src/shared: reusable components and localStorage helpers.',
      'src/assets: images and visual assets.',
    ],
  },
  {
    title: 'Challenges Faced',
    items: [
      'Keeping streak calculations accurate across refreshes.',
      'Making form validation helpful without showing errors too early.',
      'Sharing localStorage data cleanly between Home, Dashboard, and Insights.',
    ],
  },
  {
    title: 'Key Learnings',
    items: [
      'A consistent data shape makes state management much easier.',
      'Small CSS animations can make progress feel more rewarding.',
      'React Router helps a single-page app feel like a complete website.',
    ],
  },
  {
    title: 'Future Improvements',
    items: [
      'Add user profiles and cloud sync.',
      'Export habit reports as CSV or PDF.',
      'Add reminder notifications.',
      'Add more detailed charts for weekly and monthly trends.',
    ],
  },
  {
    title: 'Author',
    content: 'Made with ❤️ by Shyamsundar Gayen',
  },
];

const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <h2>Habit Tracker & Streak Dashboard</h2>
        <p>
          A focused productivity app for daily habits, streaks, consistency tracking, and personal insights.
        </p>
      </section>

      <section className="about-sections">
        {sections.map((section) => (
          <article className="about-section-card" key={section.title}>
            <h3>{section.title}</h3>
            {section.content && <p>{section.content}</p>}
            {section.items && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};

export default About;
