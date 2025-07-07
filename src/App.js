import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainWebsite />} />
        <Route path="/cms-8xR2mP9kQ5nL7tW3vB6" element={<AdminPanel />} />
        <Route path="/cms-8xR2mP9kQ5nL7tW3vB6/*" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
function MainWebsite() {
  const API_URL =
    process.env.REACT_APP_API_URL || "http://shannahjongstra.be/api";

  const [currentPage, setCurrentPage] = useState("home");
  const [portfolioData, setPortfolioData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [settings, setSettings] = useState({});
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showBlogPost, setShowBlogPost] = useState(false);

  useEffect(() => {
    fetchPortfolio();
    fetchBlog();
    fetchSettings();
  }, []);

  const fetchSingleBlog = async (blogId) => {
    try {
      const response = await fetch(`${API_URL}/blog/${blogId}`);
      const data = await response.json();
      setSelectedBlog(data);
      setShowBlogPost(true);
    } catch (error) {
      console.error("Error fetching blog post:", error);
    }
  };

  const closeBlogPost = () => {
    setShowBlogPost(false);
    setSelectedBlog(null);
  };
  const fetchPortfolio = async (type = "all") => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/portfolio?type=${type}`);
      const data = await response.json();
      setPortfolioData(data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
    setLoading(false);
  };

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${API_URL}/blog`);
      const data = await response.json();
      setBlogData(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_URL}/settings`);
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleContactSubmit = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Message sent successfully!");
        return true;
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    return false;
  };

  const filterPortfolio = (type) => {
    setPortfolioFilter(type);
    fetchPortfolio(type);
  };
  // Enhanced Hero text with animated spans:
  const EnhancedHeroText = () => (
    <div className="hero-text">
      <h1>
        <span>Schrijver</span> & <span>Fotografe</span>
      </h1>
      <p>
        Hi, ik ben Shannah. Schrijver én fotografe. Wil jij, of jouw
        organisatie, van de wereld een betere plaats maken? En heb je daarvoor
        tekst en/of foto's nodig? <strong>Say no more. I'm your woman.</strong>
      </p>
      <p>
        Met een hart voor mensen en de wereld, communicatie-ervaring in de ngo-
        en sociale sector en een passie voor gelijkheid en mensenrechten creëer
        ik graag, samen met jou, een positieve en blijvende impact.
      </p>
      <button className="cta-button" onClick={() => setCurrentPage("contact")}>
        Contacteer me
      </button>
    </div>
  );

  // Add enhanced scroll effects:
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      const scrolled = window.scrollY > 50;

      if (scrolled) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add mobile menu toggle:
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Enhanced Header with mobile support:
  const Header = () => (
    <header className="header">
      <nav className="nav">
        <div className="logo" onClick={() => setCurrentPage("home")}>
          <img
            src="/logo.png"
            alt="Shannah Jongstra Logo"
            className="logo-image"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = "Shannah Jongstra";
            }}
          />
        </div>
        <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          {[
            "home",
            "tekst",
            "fotografie",
            "portfolio",
            "blog",
            "about",
            "contact",
          ].map((page) => (
            <li key={page}>
              <a
                href="#"
                onClick={() => {
                  setCurrentPage(page);
                  setMobileMenuOpen(false);
                }}
              >
                {page === "about" ? "Over Mij" : page.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
        <div
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
  const HomePage = () => (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <EnhancedHeroText />
          <div className="hero-image">
            <div className="image-container">
              <img
                src="/shannah-hero.jpg"
                alt="Professional placeholder"
                className="hero-photo loaded"
                onError={() => console.log("image loading failed!")}
              />
              <div className="image-frame"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="portfolio-preview">
        <div className="portfolio-grid">
          {portfolioData.slice(0, 4).map((item) => (
            <PortfolioItem key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
  const serviceIcons = {
    storytelling: "📝",
    copywriting: "✍️",
    translations: "🌍",
    proofreading: "🔍",
  };
  const TekstPage = () => (
    <div className="page">
      <section className="services">
        <h2 className="section-title">✨ Tekstdiensten</h2>
        <div className="services-grid">
          <div className="service-item">
            <div className="service-icon">📝</div>
            <h3>Storytelling</h3>
            <p>
              Of je nu een diepte-interview nodig hebt, een kort portret, een
              reportage of een ander soort artikel. Ik zet jouw wensen op
              papier. Of op je website.
            </p>
          </div>
          <div className="service-item">
            <div className="service-icon">✍️</div>
            <h3>Copywriting</h3>
            <p>
              Heb je een krachtige, pakkende tekst voor je website, nieuwsbrief
              of bijvoorbeeld social media?
            </p>
          </div>
          <div className="service-item">
            <div className="service-icon">🌍</div>
            <h3>Vertalingen</h3>
            <p>
              Ik vertaal naar het Nederlands en Engels, vanuit: Nederlands,
              Engels, Frans en Duits.
            </p>
          </div>
          <div className="service-item">
            <div className="service-icon">🔍</div>
            <h3>Proofreaden</h3>
            <p>
              Of heb je hulp nodig bij het nalezen van jouw teksten? Met mijn
              alziend, perfectionistisch en vooral streng oog help ik je met
              veel plezier verder.
            </p>
          </div>
        </div>
        <div className="cta-center">
          <button
            className="cta-button"
            onClick={() => setCurrentPage("portfolio")}
          >
            🎯 Bekijk Portfolio
          </button>
        </div>
      </section>
    </div>
  );

  const FotografiePage = () => (
    <div className="page">
      <section className="services">
        <h2 className="section-title">Fotografie</h2>
        <p className="intro-text">
          Met een focus op sociale rechtvaardigheid en maatschappelijke thema's
          leg ik verhalen vast die ertoe doen. Elke foto vertelt een verhaal dat
          raakt en inspireert tot actie.
        </p>
        <div className="portfolio-grid">
          {portfolioData
            .filter((item) => item.type === "photo")
            .map((item) => (
              <PortfolioItem key={item._id} item={item} />
            ))}
        </div>
        <div className="cta-center">
          <button
            className="cta-button"
            onClick={() => setCurrentPage("portfolio")}
          >
            Volledige Portfolio
          </button>
        </div>
      </section>
    </div>
  );

  const PortfolioPage = () => (
    <div className="page">
      <section className="portfolio-section">
        <h2 className="section-title">Portfolio</h2>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${
              portfolioFilter === "all" ? "active" : ""
            }`}
            onClick={() => filterPortfolio("all")}
          >
            Alles
          </button>
          <button
            className={`filter-btn ${
              portfolioFilter === "text" ? "active" : ""
            }`}
            onClick={() => filterPortfolio("text")}
          >
            Tekst
          </button>
          <button
            className={`filter-btn ${
              portfolioFilter === "photo" ? "active" : ""
            }`}
            onClick={() => filterPortfolio("photo")}
          >
            Fotografie
          </button>
        </div>
        <div className="portfolio-grid">
          {portfolioData.map((item) => (
            <PortfolioItem key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );

  const BlogPage = () => (
    <div className="page">
      <section className="blog-section">
        <h2 className="section-title">Blog</h2>
        <p className="intro-text">
          Hier deel ik mijn gedachten, ervaringen en inzichten over sociale
          rechtvaardigheid, mensenrechten en de kracht van verhalen.
        </p>
        <div className="blog-grid">
          {blogData.map((item) => (
            <BlogItem key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div className="page">
      <section className="about">
        <div className="about-content">
          <div className="hero-image">
            <div className="image-container">
              <img
                src="/shannah-hero.jpg"
                alt="Professional placeholder"
                className="hero-photo loaded"
                onError={() => console.log("image loading failed!")}
              />
              <div className="image-frame"></div>
            </div>
          </div>
          <div className="about-text">
            <h2>Over Mij</h2>
            <p>
              Hoi! Ik ben Shannah Jongstra, een gepassioneerde schrijver en
              fotograaf uit Nederland. Mijn hart klopt voor sociale
              rechtvaardigheid en het vertellen van verhalen die ertoe doen.
            </p>
            <p>
              Met jarenlange ervaring in de NGO-sector en een achtergrond in
              communicatie, help ik organisaties en individuen hun boodschap
              krachtig over te brengen.
            </p>
            <p>
              Mijn werk is verschenen in verschillende publicaties en ik heb
              samengewerkt met NGO's, magazines en media platforms die zich
              inzetten voor een betere wereld.
            </p>
            <button
              className="cta-button"
              onClick={() => setCurrentPage("contact")}
            >
              Laten we samenwerken
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const ContactPage = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      const success = await handleContactSubmit(formData);
      if (success) {
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    };

    return (
      <div className="page">
        <section className="contact">
          <h2 className="section-title">Contact</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Laten we in contact komen</h3>
              <p>
                <strong>Email:</strong> shannah@example.com
              </p>
              <p>
                <strong>Telefoon:</strong> +31 6 12345678
              </p>
              <p>
                <strong>Locatie:</strong> Nederland
              </p>
              <p>
                Ik werk graag samen met organisaties die zich inzetten voor
                sociale rechtvaardigheid, mensenrechten en maatschappelijke
                verandering.
              </p>
            </div>
            <div className="contact-form">
              <h3>Stuur een bericht</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Naam *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Onderwerp</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Bericht *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    placeholder="Vertel me over je project..."
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Verstuur bericht
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  };

  // Add intersection observer for animations:
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      ".portfolio-item, .service-item, .blog-item, .stat-card"
    );
    animateElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [portfolioData, blogData]);

  // Enhanced PortfolioItem with better hover effects:
  const PortfolioItem = ({ item }) => (
    <div
      className="portfolio-item"
      onClick={() => item.link && window.open(item.link, "_blank")}
    >
      <div className="portfolio-image">
        {item.image ? (
          <img
            src={`http://shannahjongstra.be${item.image}`}
            alt={item.title}
          />
        ) : (
          <div className="placeholder">
            {item.type === "text" ? "📝 TEKST" : "📷 FOTO"}
          </div>
        )}
      </div>
      <div className="portfolio-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.link && (
          <div style={{ marginTop: "15px" }}>
            <span
              style={{
                color: "var(--primary-pink)",
                fontSize: "14px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              🔗 Bekijk project
            </span>
          </div>
        )}
      </div>
    </div>
  );

  // Enhanced BlogItem:
  const BlogItem = ({ item }) => (
    <div
      className="blog-item"
      onClick={() => fetchSingleBlog(item._id)} // FIXED: Proper click handler
    >
      <div className="blog-image">
        {item.image ? (
          <img
            src={`http://shannahjongstra.be${item.image}`}
            alt={item.title}
          />
        ) : (
          <div className="placeholder">📰 BLOG</div>
        )}
      </div>
      <div className="blog-content">
        <div className="blog-date">
          📅 {new Date(item.createdAt).toLocaleDateString("nl-NL")}
        </div>
        <h3>{item.title}</h3>
        {/* FIXED: Render HTML content properly for excerpt */}
        <div
          className="blog-excerpt"
          dangerouslySetInnerHTML={{
            __html: item.excerpt || item.content?.substring(0, 150) + "...",
          }}
        />
        <div style={{ marginTop: "15px" }}>
          <span
            style={{
              color: "var(--primary-pink)",
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            📖 Lees meer
          </span>
        </div>
      </div>
    </div>
  );
  const BlogPostView = () => {
    if (!selectedBlog) return null;

    return (
      <div className="blog-post-overlay">
        <div className="blog-post-container">
          <div className="blog-post-header">
            <button className="close-blog-btn" onClick={closeBlogPost}>
              ✕ Sluiten
            </button>
          </div>

          <article className="blog-post-content">
            {/* Blog Header */}
            <header className="blog-post-header-content">
              {selectedBlog.image && (
                <div className="blog-post-image">
                  <img
                    src={`http://shannahjongstra.be${selectedBlog.image}`}
                    alt={selectedBlog.title}
                  />
                </div>
              )}

              <div className="blog-post-meta">
                <div className="blog-date">
                  📅{" "}
                  {new Date(selectedBlog.createdAt).toLocaleDateString(
                    "nl-NL",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </div>
                <h1>{selectedBlog.title}</h1>
              </div>
            </header>

            {/* Blog Content - FIXED: Render HTML properly */}
            <div
              className="blog-post-body"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />

            {/* Blog Footer */}
            <footer className="blog-post-footer">
              <div className="blog-tags">
                <span className="tag">Sociale Rechtvaardigheid</span>
                <span className="tag">Verhalen</span>
              </div>

              <div className="blog-share">
                <button className="share-btn">Delen</button>
              </div>
            </footer>
          </article>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    // Show blog post if one is selected
    if (showBlogPost) {
      return <BlogPostView />;
    }

    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "tekst":
        return <TekstPage />;
      case "fotografie":
        return <FotografiePage />;
      case "portfolio":
        return <PortfolioPage />;
      case "blog":
        return <BlogPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">{renderPage()}</main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Shannah Jongstra</h4>
            <p>Schrijver & Fotografe</p>
            <p>Gespecialiseerd in sociale rechtvaardigheid</p>
          </div>
          <div className="footer-section">
            <h4>🎯 Services</h4>
            <p>📝 Storytelling & Artikelen</p>
            <p>✍️ Copywriting</p>
            <p>📷 Fotografie</p>
            <p>🌍 Vertalingen</p>
          </div>
          <div className="footer-section">
            <h4>📞 Contact</h4>
            <p>📧 shannah@example.com</p>
            <p>📱 +31 6 12345678</p>
            <p>🇳🇱 Nederland</p>
          </div>
        </div>
        <p className="footer-bottom">
          © 2025 Shannah Jongstra. Alle rechten voorbehouden. ✨
        </p>
      </footer>
    </div>
  );
}

function AdminPanel() {
  const [currentAdminPage, setCurrentAdminPage] = useState("dashboard");
  const [portfolioData, setPortfolioData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const API_URL =
    process.env.REACT_APP_API_URL || "http://shannahjongstra.be/api";

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [portfolioRes, blogRes, contactRes] = await Promise.all([
        fetch(`${API_URL}/portfolio`),
        fetch(`${API_URL}/blog`),
        fetch(`${API_URL}/contact`),
      ]);

      setPortfolioData(await portfolioRes.json());
      setBlogData(await blogRes.json());
      setContactData(await contactRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleLogin = () => {
    if (password === "shannah2024!") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
    } else {
      alert("Incorrect password");
    }
  };

  useEffect(() => {
    // Check if already authenticated
    const isAuth = localStorage.getItem("admin_auth");
    if (isAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-form">
          <h2>Admin Access</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }
  const AdminHeader = () => (
    <header className="admin-header">
      <div className="admin-nav">
        <div className="admin-logo">
          <h2>Admin Panel - Shannah Jongstra</h2>
        </div>
        <nav className="admin-menu">
          <button
            className={currentAdminPage === "dashboard" ? "active" : ""}
            onClick={() => setCurrentAdminPage("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={currentAdminPage === "portfolio" ? "active" : ""}
            onClick={() => setCurrentAdminPage("portfolio")}
          >
            Portfolio
          </button>
          <button
            className={currentAdminPage === "blog" ? "active" : ""}
            onClick={() => setCurrentAdminPage("blog")}
          >
            Blog
          </button>
          <button
            className={currentAdminPage === "contacts" ? "active" : ""}
            onClick={() => setCurrentAdminPage("contacts")}
          >
            Messages
          </button>
          {/* UPDATED: Link back to main site */}
          <a href="/" className="back-to-site">
            ← Back to Site
          </a>
        </nav>
      </div>
    </header>
  );

  const AdminDashboard = () => (
    <div className="admin-page">
      <h1>Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{portfolioData.length}</h3>
          <p>Portfolio Items</p>
        </div>
        <div className="stat-card">
          <h3>{blogData.length}</h3>
          <p>Blog Posts</p>
        </div>
        <div className="stat-card">
          <h3>{contactData.length}</h3>
          <p>Messages</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <h3>Latest Blog Posts</h3>
          {blogData.slice(0, 3).map((blog) => (
            <div key={blog._id} className="activity-item">
              <strong>{blog.title}</strong>
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          ))}

          <h3>Recent Messages</h3>
          {contactData.slice(0, 3).map((contact) => (
            <div key={contact._id} className="activity-item">
              <strong>{contact.name}</strong> - {contact.subject}
              <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AdminPortfolio = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      type: "text",
      link: "",
      image: null,
    });
    const [editingId, setEditingId] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      try {
        const url = editingId
          ? `${API_URL}/portfolio/${editingId}`
          : `${API_URL}/portfolio`;
        const method = editingId ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          body: data,
        });

        if (response.ok) {
          setFormData({
            title: "",
            description: "",
            type: "text",
            link: "",
            image: null,
          });
          setEditingId(null);
          fetchAllData();
          alert(editingId ? "Portfolio updated!" : "Portfolio added!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleEdit = (item) => {
      setFormData({
        title: item.title,
        description: item.description,
        type: item.type,
        link: item.link || "",
        image: null,
      });
      setEditingId(item._id);
    };

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        try {
          await fetch(`${API_URL}/portfolio/${id}`, { method: "DELETE" });
          fetchAllData();
          alert("Portfolio item deleted!");
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    return (
      <div className="admin-page">
        <h1>Portfolio Management</h1>

        <div className="admin-form-section">
          <h2>{editingId ? "Edit" : "Add"} Portfolio Item</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="text">Text</option>
                  <option value="photo">Photo</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Link (optional)</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Update" : "Add"} Portfolio Item
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      title: "",
                      description: "",
                      type: "text",
                      link: "",
                      image: null,
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-list-section">
          <h2>Portfolio Items ({portfolioData.length})</h2>
          <div className="items-grid">
            {portfolioData.map((item) => (
              <div key={item._id} className="admin-item-card">
                <div className="item-image">
                  {item.image ? (
                    <img
                      src={`http://shannahjongstra.be${item.image}`}
                      alt={item.title}
                    />
                  ) : (
                    <div className="placeholder">
                      {item.type === "text" ? "📝" : "📷"}
                    </div>
                  )}
                </div>
                <div className="item-content">
                  <h4>{item.title}</h4>
                  <p>{item.description.substring(0, 100)}...</p>
                  <span className="item-type">{item.type}</span>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleEdit(item)} className="btn-edit">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AdminBlog = () => {
    const [formData, setFormData] = useState({
      title: "",
      content: "",
      image: null,
    });
    const [editingId, setEditingId] = useState(null);

    // Rich text editor configuration
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["blockquote", "code-block"],
        [{ script: "sub" }, { script: "super" }],
        ["clean"],
      ],
    };

    const formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "list",
      "bullet",
      "indent",
      "align",
      "link",
      "image",
      "video",
      "blockquote",
      "code-block",
      "script",
    ];

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);

      // FIXED: Create proper excerpt from HTML content
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = formData.content;
      const textContent = tempDiv.textContent || tempDiv.innerText || "";
      const excerpt =
        textContent.substring(0, 150) + (textContent.length > 150 ? "..." : "");
      data.append("excerpt", excerpt);

      if (formData.image) data.append("image", formData.image);

      try {
        const url = editingId
          ? `${API_URL}/blog/${editingId}`
          : `${API_URL}/blog`;
        const method = editingId ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          body: data,
        });

        if (response.ok) {
          setFormData({ title: "", content: "", image: null });
          setEditingId(null);
          fetchAllData();
          alert(editingId ? "Blog post updated!" : "Blog post added!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleEdit = (item) => {
      setFormData({
        title: item.title,
        content: item.content,
        image: null,
      });
      setEditingId(item._id);
    };

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this blog post?")) {
        try {
          await fetch(`${API_URL}/blog/${id}`, { method: "DELETE" });
          fetchAllData();
          alert("Blog post deleted!");
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    return (
      <div className="admin-page">
        <h1>Blog Management</h1>

        <div className="admin-form-section">
          <h2>{editingId ? "Edit" : "Create New"} Blog Post</h2>
          <form onSubmit={handleSubmit} className="admin-form blog-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Enter blog post title..."
              />
            </div>

            <div className="form-group">
              <label>Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </div>

            <div className="form-group">
              <label>Content *</label>
              <div className="rich-text-editor">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your blog post content here..."
                  style={{ height: "400px", marginBottom: "50px" }}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Update" : "Publish"} Blog Post
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ title: "", content: "", image: null });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-list-section">
          <h2>Blog Posts ({blogData.length})</h2>
          <div className="blog-list">
            {blogData.map((item) => (
              <div key={item._id} className="admin-blog-card">
                <div className="blog-info">
                  <h4>{item.title}</h4>
                  <p>{item.excerpt}</p>
                  <span className="blog-date">
                    {new Date(item.createdAt).toLocaleDateString("nl-NL")}
                  </span>
                </div>
                <div className="blog-actions">
                  <button onClick={() => handleEdit(item)} className="btn-edit">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AdminContacts = () => (
    <div className="admin-page">
      <h1>Contact Messages ({contactData.length})</h1>

      <div className="contacts-list">
        {contactData.map((contact) => (
          <div key={contact._id} className="contact-card">
            <div className="contact-header">
              <h3>{contact.name}</h3>
              <span className="contact-date">
                {new Date(contact.createdAt).toLocaleDateString("nl-NL")}
              </span>
            </div>
            <div className="contact-info">
              <p>
                <strong>Email:</strong> {contact.email}
              </p>
              {contact.subject && (
                <p>
                  <strong>Subject:</strong> {contact.subject}
                </p>
              )}
            </div>
            <div className="contact-message">
              <p>{contact.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdminPage = () => {
    switch (currentAdminPage) {
      case "dashboard":
        return <AdminDashboard />;
      case "portfolio":
        return <AdminPortfolio />;
      case "blog":
        return <AdminBlog />;
      case "contacts":
        return <AdminContacts />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="admin-container">
      <AdminHeader />
      <main className="admin-main">
        {loading ? (
          <div className="loading-container">
            <div className="loading"></div>
            <p>Loading...</p>
          </div>
        ) : (
          renderAdminPage()
        )}
      </main>
    </div>
  );
}

export default App;
