import React, { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  body: {
    margin: 0,
    fontFamily: "'Segoe UI', sans-serif",
    background: "#0f1117",
    minHeight: "100vh",
    color: "#fff",
  },
  navbar: {
    background: "#1a1d27",
    padding: "16px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #2a2d3a",
    boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
  },
  navTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#00a3ff",
    letterSpacing: "0.5px",
  },
  navUser: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  userInfo: {
    textAlign: "right",
  },
  userName: {
    fontSize: "13px",
    color: "#a0a8c0",
  },
  userOrg: {
    fontSize: "11px",
    color: "#606880",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #ff4d4d",
    color: "#ff4d4d",
    padding: "7px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  loginCard: {
    background: "#1a1d27",
    border: "1px solid #2a2d3a",
    borderRadius: "16px",
    padding: "60px 40px",
    textAlign: "center",
    marginTop: "80px",
  },
  loginTitle: {
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "8px",
    background: "linear-gradient(135deg, #00a3ff, #0066ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  loginSubtitle: {
    color: "#606880",
    fontSize: "15px",
    marginBottom: "36px",
  },
  loginBtn: {
    background: "linear-gradient(135deg, #00a3ff, #0066ff)",
    border: "none",
    color: "#fff",
    padding: "14px 40px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    boxShadow: "0 4px 20px rgba(0,163,255,0.3)",
    transition: "all 0.2s",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#e0e6f0",
  },
  actionBar: {
    display: "flex",
    gap: "12px",
    marginBottom: "28px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  getMetaBtn: {
    background: "linear-gradient(135deg, #00a3ff, #0066ff)",
    border: "none",
    color: "#fff",
    padding: "10px 22px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 2px 12px rgba(0,163,255,0.25)",
    transition: "all 0.2s",
  },
  enableAllBtn: {
    background: "transparent",
    border: "1px solid #00cc66",
    color: "#00cc66",
    padding: "10px 22px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  disableAllBtn: {
    background: "transparent",
    border: "1px solid #ff4d4d",
    color: "#ff4d4d",
    padding: "10px 22px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  ruleCard: {
    background: "#1a1d27",
    border: "1px solid #2a2d3a",
    borderRadius: "12px",
    padding: "18px 24px",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "border-color 0.2s",
  },
  ruleName: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#e0e6f0",
    marginBottom: "4px",
  },
  ruleStatus: {
    fontSize: "12px",
    fontWeight: "600",
    padding: "3px 10px",
    borderRadius: "20px",
  },
  toggleSwitch: {
    position: "relative",
    width: "52px",
    height: "28px",
    cursor: "pointer",
  },
  toggleInput: {
    opacity: 0,
    width: 0,
    height: 0,
    position: "absolute",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#606880",
  },
  loadingDot: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#00a3ff",
    margin: "0 3px",
    animation: "bounce 1.2s infinite",
  },
};

function ToggleSwitch({ isActive, onToggle, disabled }) {
  return (
    <div
      onClick={!disabled ? onToggle : undefined}
      style={{
        width: "52px",
        height: "28px",
        borderRadius: "14px",
        background: isActive ? "#00cc66" : "#2a2d3a",
        border: isActive ? "1px solid #00cc66" : "1px solid #3a3d4a",
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 0.25s, border 0.25s",
        opacity: disabled ? 0.5 : 1,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: "3px",
          left: isActive ? "27px" : "3px",
          transition: "left 0.25s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}

function App() {
  const [token, setToken] = useState("");
  const [instanceUrl, setInstanceUrl] = useState("");
  const [rules, setRules] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [togglingAll, setTogglingAll] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      const instance = params.get("instance_url");
      if (accessToken && instance) {
        setToken(accessToken);
        setInstanceUrl(instance);
        fetchUserInfo(accessToken, instance);
      }
    }
  }, []);

  const fetchUserInfo = async (accessToken, instance) => {
    try {
      const res = await axios.get(`${instance}/services/data/v59.0/chatter/users/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserInfo({
        name: res.data.name || "User",
        org: res.data.companyName || "Salesforce Org",
        email: res.data.email || "",
      });
    } catch (e) {
      setUserInfo({ name: "User", org: "Salesforce Org", email: "" });
    }
  };

  const loginToSalesforce = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = "http://localhost:3000/callback";
    const loginUrl =
      `https://login.salesforce.com/services/oauth2/authorize` +
      `?response_type=token` +
      `&client_id=${clientId}` +
      `&redirect_uri=${redirectUri}`;
    window.location.href = loginUrl;
  };

  const logout = () => {
    setToken("");
    setInstanceUrl("");
    setRules([]);
    setUserInfo(null);
    window.location.hash = "";
    window.location.href = "/";
  };

  const getValidationRules = async () => {
    setLoading(true);
    try {
      const query = "SELECT Id, ValidationName, Active FROM ValidationRule";
      const encodedQuery = encodeURIComponent(query);
      const url = `${instanceUrl}/services/data/v59.0/tooling/query/?q=${encodedQuery}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRules(response.data.records);
    } catch (error) {
      console.error(error);
      alert("Error fetching validation rules");
    }
    setLoading(false);
  };

  const toggleSingleRule = async (rule) => {
    setTogglingId(rule.Id);
    try {
      const getUrl = `${instanceUrl}/services/data/v59.0/tooling/sobjects/ValidationRule/${rule.Id}`;
      const getResponse = await axios.get(getUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const existingMetadata = getResponse.data.Metadata;
      const body = {
        Metadata: { ...existingMetadata, active: !rule.Active },
      };
      await axios.patch(getUrl, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      await getValidationRules();
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Error toggling rule: " + JSON.stringify(error.response?.data));
    }
    setTogglingId(null);
  };

  const toggleAllRules = async (activate) => {
    setTogglingAll(true);
    try {
      for (const rule of rules) {
        if (rule.Active !== activate) {
          const getUrl = `${instanceUrl}/services/data/v59.0/tooling/sobjects/ValidationRule/${rule.Id}`;
          const getResponse = await axios.get(getUrl, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const existingMetadata = getResponse.data.Metadata;
          const body = {
            Metadata: { ...existingMetadata, active: activate },
          };
          await axios.patch(getUrl, body, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }
      }
      await getValidationRules();
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Error updating all rules");
    }
    setTogglingAll(false);
  };

  // ---- LOGIN PAGE ----
  if (!token) {
    return (
      <div style={styles.body}>
        <div style={styles.container}>
          <div style={styles.loginCard}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚡</div>
            <div style={styles.loginTitle}>Salesforce Validation Rules</div>
            <div style={styles.loginSubtitle}>
              Login with your Salesforce account to manage validation rules
            </div>
            <button
              style={styles.loginBtn}
              onClick={loginToSalesforce}
              onMouseOver={(e) => (e.target.style.opacity = "0.85")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            >
              🔐 Login with Salesforce
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- MAIN APP ----
  return (
    <div style={styles.body}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.navTitle}>⚡ SF Validation Switch</div>
        <div style={styles.navUser}>
          {userInfo && (
            <div style={styles.userInfo}>
              <div style={styles.userName}>
                👤 {userInfo.name || userInfo.email}
              </div>
              <div style={styles.userOrg}>Org: {userInfo.org}</div>
            </div>
          )}
          <button
            style={styles.logoutBtn}
            onClick={logout}
            onMouseOver={(e) => {
              e.target.style.background = "#ff4d4d";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#ff4d4d";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div style={styles.container}>
        <div style={styles.sectionTitle}>Validation Rules</div>

        {/* ACTION BUTTONS */}
        <div style={styles.actionBar}>
          <button
            style={styles.getMetaBtn}
            onClick={getValidationRules}
            disabled={loading}
            onMouseOver={(e) => (e.target.style.opacity = "0.85")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            {loading ? "Fetching..." : "📋 Get Metadata"}
          </button>

          {rules.length > 0 && (
            <>
              <button
                style={styles.enableAllBtn}
                onClick={() => toggleAllRules(true)}
                disabled={togglingAll}
                onMouseOver={(e) => {
                  e.target.style.background = "#00cc66";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#00cc66";
                }}
              >
                ✅ Enable All
              </button>
              <button
                style={styles.disableAllBtn}
                onClick={() => toggleAllRules(false)}
                disabled={togglingAll}
                onMouseOver={(e) => {
                  e.target.style.background = "#ff4d4d";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#ff4d4d";
                }}
              >
                🚫 Disable All
              </button>
            </>
          )}
        </div>

        {/* LOADING */}
        {(loading || togglingAll) && (
          <div style={{ textAlign: "center", padding: "40px", color: "#606880" }}>
            {togglingAll ? "Updating all rules..." : "Fetching rules..."}
          </div>
        )}

        {/* RULES LIST */}
        {!loading && rules.length === 0 && (
          <div style={styles.emptyState}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
            <div>Click "Get Metadata" to fetch validation rules</div>
          </div>
        )}

        {!loading &&
          rules.map((rule) => (
            <div
              key={rule.Id}
              style={{
                ...styles.ruleCard,
                borderColor: rule.Active ? "#1a4a2a" : "#2a2d3a",
              }}
            >
              <div>
                <div style={styles.ruleName}>{rule.ValidationName}</div>
                <span
                  style={{
                    ...styles.ruleStatus,
                    background: rule.Active
                      ? "rgba(0,204,102,0.12)"
                      : "rgba(255,77,77,0.10)",
                    color: rule.Active ? "#00cc66" : "#ff4d4d",
                  }}
                >
                  {rule.Active ? "● Active" : "○ Inactive"}
                </span>
              </div>
              <ToggleSwitch
                isActive={rule.Active}
                onToggle={() => toggleSingleRule(rule)}
                disabled={togglingId === rule.Id || togglingAll}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;