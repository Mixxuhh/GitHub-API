import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const candidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    setSavedCandidates(candidates);
  }, []);

  const handleRemove = (candidateId: number) => {
    const updatedCandidates = savedCandidates.filter(
      (c) => c.id !== candidateId
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Saved Candidates</h1>
          <button onClick={() => navigate("/")} className="primary-button">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            Back to Search
          </button>
        </div>

        {savedCandidates.length === 0 ? (
          <div className="empty-state">
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <h2 className="empty-state-title">No Saved Candidates</h2>
            <p className="empty-state-text">
              Start searching for candidates to build your list
            </p>
            <button onClick={() => navigate("/")} className="primary-button">
              Start Searching
            </button>
          </div>
        ) : (
          <div className="card-grid">
            {savedCandidates.map((candidate) => (
              <div key={candidate.id} className="candidate-card">
                <div className="candidate-header">
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    className="candidate-avatar"
                  />
                  <div className="candidate-info">
                    <h2 className="candidate-name">
                      {candidate.name || candidate.login}
                    </h2>
                    <p className="candidate-username">@{candidate.login}</p>
                  </div>
                </div>

                <div className="candidate-details">
                  <div>
                    <p className="detail-label">Location</p>
                    <p className="detail-value">
                      {candidate.location || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="detail-label">Company</p>
                    <p className="detail-value">
                      {candidate.company || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="detail-label">Email</p>
                    <p className="detail-value">
                      {candidate.email || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="detail-label">GitHub Profile</p>
                    <a
                      href={candidate.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-link"
                    >
                      View Profile
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(candidate.id)}
                  className="remove-button"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCandidates;
