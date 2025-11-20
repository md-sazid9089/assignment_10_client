import { Fade, Slide, Zoom, Bounce } from 'react-awesome-reveal'
import { Typewriter } from 'react-simple-typewriter'
import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'

const ThemeAnimationDemo = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <Fade>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              Theme & Animation Demo
            </h1>
            <p className="text-xl text-base-content/70">
              Showcasing react-simple-typewriter and react-awesome-reveal
            </p>
          </div>
        </Fade>

        {/* Theme Toggle Demo */}
        <Zoom>
          <section className="card bg-base-200 shadow-xl mb-12">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-6">🎨 Theme System</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Features:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="badge badge-success">✓</span>
                      LocalStorage persistence
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="badge badge-success">✓</span>
                      Automatic theme loading on app start
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="badge badge-success">✓</span>
                      Smooth transitions between themes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="badge badge-success">✓</span>
                      Context API for global access
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className={`p-8 rounded-lg border-4 ${theme === 'light' ? 'border-yellow-400 bg-yellow-50' : 'border-blue-400 bg-blue-950'}`}>
                    <p className="text-2xl font-bold mb-2">Current Theme:</p>
                    <p className="text-4xl">{theme === 'light' ? '☀️ Light' : '🌙 Dark'}</p>
                  </div>
                  <button 
                    onClick={toggleTheme} 
                    className="btn btn-primary btn-lg"
                  >
                    Toggle Theme
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Zoom>

        {/* Typewriter Demo */}
        <Slide direction="left">
          <section className="card bg-gradient-to-br from-primary to-secondary text-white shadow-xl mb-12">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-6">⌨️ Typewriter Effect</h2>
              <div className="text-center py-8">
                <h3 className="text-4xl md:text-6xl font-bold mb-4">
                  Welcome to{' '}
                  <span className="text-accent">
                    <Typewriter
                      words={[
                        'ARTIFY!',
                        'Creativity!',
                        'Innovation!',
                        'Inspiration!',
                        'Art Community!'
                      ]}
                      loop={0}
                      cursor
                      cursorStyle='_'
                      typeSpeed={80}
                      deleteSpeed={60}
                      delaySpeed={1500}
                    />
                  </span>
                </h3>
                <p className="text-xl opacity-90">Watch the text type and delete automatically</p>
              </div>
              <div className="divider"></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="font-semibold mb-2">Configuration:</h4>
                  <code className="text-sm">
                    words: ['Word1', 'Word2', ...]<br/>
                    loop: 0 (infinite)<br/>
                    typeSpeed: 80ms<br/>
                    deleteSpeed: 60ms<br/>
                    delaySpeed: 1500ms
                  </code>
                </div>
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="font-semibold mb-2">Use Cases:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Hero headings</li>
                    <li>• Dynamic titles</li>
                    <li>• Feature highlights</li>
                    <li>• Call-to-action messages</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </Slide>

        {/* Fade Animation Demo */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Fade Animations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Fade delay={100}>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="text-4xl mb-2">📱</div>
                  <h3 className="card-title">Fade In</h3>
                  <p>Simple fade animation with delay</p>
                  <div className="badge badge-info">delay: 100ms</div>
                </div>
              </div>
            </Fade>
            <Fade delay={300}>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="text-4xl mb-2">💻</div>
                  <h3 className="card-title">Fade In</h3>
                  <p>Medium delay for staggered effect</p>
                  <div className="badge badge-info">delay: 300ms</div>
                </div>
              </div>
            </Fade>
            <Fade delay={500}>
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="text-4xl mb-2">🎨</div>
                  <h3 className="card-title">Fade In</h3>
                  <p>Longer delay for sequential reveal</p>
                  <div className="badge badge-info">delay: 500ms</div>
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* Slide Animation Demo */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Slide Animations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Slide direction="left">
              <div className="card bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl">
                <div className="card-body">
                  <div className="text-4xl mb-2">⬅️</div>
                  <h3 className="card-title">Slide from Left</h3>
                  <p>Element slides in from the left side</p>
                </div>
              </div>
            </Slide>
            <Slide direction="right">
              <div className="card bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl">
                <div className="card-body">
                  <div className="text-4xl mb-2">➡️</div>
                  <h3 className="card-title">Slide from Right</h3>
                  <p>Element slides in from the right side</p>
                </div>
              </div>
            </Slide>
            <Slide direction="up">
              <div className="card bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl">
                <div className="card-body">
                  <div className="text-4xl mb-2">⬆️</div>
                  <h3 className="card-title">Slide from Bottom</h3>
                  <p>Element slides up from the bottom</p>
                </div>
              </div>
            </Slide>
            <Slide direction="down">
              <div className="card bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl">
                <div className="card-body">
                  <div className="text-4xl mb-2">⬇️</div>
                  <h3 className="card-title">Slide from Top</h3>
                  <p>Element slides down from the top</p>
                </div>
              </div>
            </Slide>
          </div>
        </section>

        {/* Zoom Animation Demo */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Zoom Animations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Zoom delay={100}>
              <div className="stat bg-gradient-to-br from-primary to-primary/70 text-white rounded-lg shadow-xl">
                <div className="stat-figure text-4xl">🎯</div>
                <div className="stat-value">100%</div>
                <div className="stat-title text-white/90">Zoom Effect</div>
              </div>
            </Zoom>
            <Zoom delay={200}>
              <div className="stat bg-gradient-to-br from-secondary to-secondary/70 text-white rounded-lg shadow-xl">
                <div className="stat-figure text-4xl">⚡</div>
                <div className="stat-value">Fast</div>
                <div className="stat-title text-white/90">Performance</div>
              </div>
            </Zoom>
            <Zoom delay={300}>
              <div className="stat bg-gradient-to-br from-accent to-accent/70 text-white rounded-lg shadow-xl">
                <div className="stat-figure text-4xl">✨</div>
                <div className="stat-value">Pro</div>
                <div className="stat-title text-white/90">Quality</div>
              </div>
            </Zoom>
          </div>
        </section>

        {/* Cascade Demo */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Cascade Effect</h2>
          <Fade cascade damping={0.2}>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="alert alert-info">
                <span>First element appears</span>
              </div>
              <div className="alert alert-success">
                <span>Then second element</span>
              </div>
              <div className="alert alert-warning">
                <span>Then third element</span>
              </div>
              <div className="alert alert-error">
                <span>Sequential animation complete!</span>
              </div>
            </div>
          </Fade>
        </section>

        {/* Bounce Demo */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Bounce Animation</h2>
          <div className="flex justify-center gap-8">
            <Bounce delay={100}>
              <div className="text-6xl">🎨</div>
            </Bounce>
            <Bounce delay={300}>
              <div className="text-6xl">🖼️</div>
            </Bounce>
            <Bounce delay={500}>
              <div className="text-6xl">✨</div>
            </Bounce>
            <Bounce delay={700}>
              <div className="text-6xl">🎭</div>
            </Bounce>
          </div>
        </section>

        {/* Integration Examples */}
        <Slide direction="up">
          <section className="card bg-base-200 shadow-xl mb-12">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-6">📚 Where These Are Used in ARTIFY</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-xl mb-3">Typewriter:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="badge badge-primary badge-sm mt-1">Home</span>
                      <span>Hero banner - first slide heading</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="badge badge-primary badge-sm mt-1">Demo</span>
                      <span>This demo page showcase</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-3">Reveal Animations:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="badge badge-secondary badge-sm mt-1">Home</span>
                      <span>Featured artworks section (Fade cascade)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="badge badge-secondary badge-sm mt-1">Home</span>
                      <span>Top artists cards (Slide up cascade)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="badge badge-secondary badge-sm mt-1">Home</span>
                      <span>Community stats (Zoom with delays)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="badge badge-secondary badge-sm mt-1">All</span>
                      <span>Section headers throughout app</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </Slide>

        {/* Back to Home */}
        <Fade>
          <div className="text-center">
            <Link to="/" className="btn btn-primary btn-lg">
              ← Back to Home
            </Link>
          </div>
        </Fade>
      </div>
    </div>
  )
}

export default ThemeAnimationDemo
