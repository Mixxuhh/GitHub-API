import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNextCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const candidates = await searchGithub();
      if (candidates.length === 0) {
        setError("No more candidates available");
        setCurrentCandidate(null);
        return;
      }
      const randomCandidate =
        candidates[Math.floor(Math.random() * candidates.length)];
      const detailedCandidate = await searchGithubUser(randomCandidate.login);
      setCurrentCandidate(detailedCandidate);
    } catch (err) {
      setError("Failed to load candidate");
      setCurrentCandidate(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(
        localStorage.getItem("savedCandidates") || "[]"
      );
      if (
        !savedCandidates.find((c: Candidate) => c.id === currentCandidate.id)
      ) {
        savedCandidates.push(currentCandidate);
        localStorage.setItem(
          "savedCandidates",
          JSON.stringify(savedCandidates)
        );
      }
      loadNextCandidate();
    }
  };

  const handleReject = () => {
    loadNextCandidate();
  };

  useEffect(() => {
    loadNextCandidate();
  }, []);

  if (loading) {
    return (
      <div className="homepage-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage-container">
        <div className="candidate-info-card">
          <svg
            className="empty-state-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="empty-state-title">Oops!</h2>
          <p className="empty-state-text">{error}</p>
          <button onClick={loadNextCandidate} className="primary-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage-container">
      <nav className="nav">
        <div className="nav-item">
          <a href="/" className="nav-link active">
            Home
          </a>
        </div>
        <div className="nav-item">
          <a href="/saved" className="nav-link">
            Potential Candidates
          </a>
        </div>
      </nav>

      <h1 className="homepage-title">Candidate Search</h1>

      {currentCandidate ? (
        <>
          <img
            src={currentCandidate.avatar_url}
            alt={currentCandidate.login}
            className="homepage-image"
          />
          <div className="candidate-info-card">
            <ul className="candidate-info-list">
              <li className="candidate-info-item">
                <span className="candidate-info-label">Name</span>
                <span className="candidate-info-value">
                  {currentCandidate.name || currentCandidate.login}
                </span>
              </li>
              <li className="candidate-info-item">
                <span className="candidate-info-label">Username</span>
                <span className="candidate-info-value">
                  @{currentCandidate.login}
                </span>
              </li>
              <li className="candidate-info-item">
                <span className="candidate-info-label">Location</span>
                <span className="candidate-info-value">
                  {currentCandidate.location || "Not specified"}
                </span>
              </li>
              <li className="candidate-info-item">
                <span className="candidate-info-label">Company</span>
                <span className="candidate-info-value">
                  {currentCandidate.company || "Not specified"}
                </span>
              </li>
              <li className="candidate-info-item">
                <span className="candidate-info-label">Email</span>
                <span className="candidate-info-value">
                  {currentCandidate.email || "Not specified"}
                </span>
              </li>
              <li className="candidate-info-item">
                <span className="candidate-info-label">Profile</span>
                <span className="candidate-info-value">
                  <a
                    href={currentCandidate.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="action-buttons-homepage">
            <button
              onClick={handleReject}
              className="action-button-homepage reject-button-homepage"
              aria-label="Reject candidate"
            >
              ×
            </button>
            <button
              onClick={handleAccept}
              className="action-button-homepage accept-button-homepage"
              aria-label="Accept candidate"
            >
              ✓
            </button>
          </div>
        </>
      ) : (
        <div className="candidate-info-card">
          <svg
            className="empty-state-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="empty-state-title">No candidates available</h2>
          <p className="empty-state-text">
            Try refreshing the page to load new candidates
          </p>
          <button onClick={loadNextCandidate} className="primary-button">
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
