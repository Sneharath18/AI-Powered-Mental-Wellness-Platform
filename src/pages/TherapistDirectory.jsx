import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colors, fonts, radius } from "../styles/theme";
import * as api from "../api";

const TherapistDirectory = () => {
    const navigate = useNavigate();
    const [therapists, setTherapists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTherapist, setSelectedTherapist] = useState(null);

    useEffect(() => {
        const fetchTherapists = async () => {
            try {
                const data = await api.getPsychologists();
                setTherapists(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching therapists:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTherapists();
    }, []);

    const handleBook = (therapist) => {
        navigate("/appointments", { state: { selectedTherapist: therapist } });
    };

    const handleCall = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    if (loading) {
        return (
            <div style={{ padding: "40px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🧘</div>
                <div style={{ fontSize: 16, fontFamily: fonts.body, color: colors.textMuted }}>
                    Loading therapist directory...
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: 40 }}>
                <h1 style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 700, color: colors.text, marginBottom: 8 }}>
                    Meet Our Therapists
                </h1>
                <p style={{ fontSize: 16, fontFamily: fonts.body, color: colors.textMid, maxWidth: 600 }}>
                    Connect with experienced mental health professionals who are here to support your journey.
                </p>
            </div>

            {/* Therapist Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
                {therapists.map((therapist) => (
                    <TherapistCard
                        key={therapist.id}
                        therapist={therapist}
                        onBook={() => handleBook(therapist)}
                        onCall={() => handleCall(therapist.phone || "03001234567")}
                        onSelect={() => setSelectedTherapist(selectedTherapist?.id === therapist.id ? null : therapist)}
                        isSelected={selectedTherapist?.id === therapist.id}
                    />
                ))}
            </div>

            {therapists.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 24px" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>💜</div>
                    <p style={{ fontSize: 18, fontFamily: fonts.body, color: colors.textMuted }}>
                        No therapists available at the moment.
                    </p>
                </div>
            )}
        </div>
    );
};

// ─── Therapist Card Component ─────────────────────────────────────────────────
const TherapistCard = ({ therapist, onBook, onCall, onSelect, isSelected }) => {
    const initials = `${therapist.user?.firstName?.[0]}${therapist.user?.lastName?.[0]}`.toUpperCase();
    const specializations = therapist.specialization?.split(",").map(s => s.trim()) || [];

    return (
        <div
            onClick={onSelect}
            style={{
                background: "#fff",
                borderRadius: radius.lg,
                border: isSelected ? `2px solid ${colors.purple}` : `1.5px solid ${colors.border}`,
                boxShadow: isSelected ? `0 8px 32px ${colors.purple}20` : "0 2px 8px rgba(0,0,0,0.06)",
                overflow: "hidden",
                transition: "all 0.3s",
                cursor: "pointer",
            }}
        >
            {/* Header with avatar */}
            <div
                style={{
                    background: `linear-gradient(135deg, ${colors.purple}, ${colors.purpleLight})`,
                    padding: "24px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    color: "#fff",
                }}
            >
                <div
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: 14,
                        background: "rgba(255,255,255,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        fontWeight: 700,
                        border: "2px solid rgba(255,255,255,0.5)",
                    }}
                >
                    {initials}
                </div>
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px 0", fontFamily: fonts.display }}>
                        Dr. {therapist.user?.firstName} {therapist.user?.lastName}
                    </h3>
                    <p style={{ margin: 0, fontSize: 13, opacity: 0.9, fontFamily: fonts.body }}>
                        {specializations[0] || "Mental Health Professional"}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Rating */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14 }}>⭐</span>
                    <span style={{ fontSize: 13, fontWeight: 700, fontFamily: fonts.body, color: colors.text }}>
                        4.8/5.0
                    </span>
                    <span style={{ fontSize: 12, fontFamily: fonts.body, color: colors.textMuted }}>
                        (12 reviews)
                    </span>
                </div>

                {/* Specializations */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {specializations.slice(0, 3).map((spec, idx) => (
                        <span
                            key={idx}
                            style={{
                                fontSize: 11,
                                fontFamily: fonts.body,
                                fontWeight: 600,
                                padding: "4px 10px",
                                borderRadius: "20px",
                                background: colors.purpleSoft,
                                color: colors.purple,
                                border: `1px solid ${colors.lavender}`,
                            }}
                        >
                            {spec}
                        </span>
                    ))}
                </div>

                {/* Bio */}
                <p
                    style={{
                        fontSize: 13,
                        fontFamily: fonts.body,
                        color: colors.textMid,
                        margin: 0,
                        lineHeight: 1.5,
                    }}
                >
                    {therapist.bio || "Experienced mental health professional dedicated to your wellbeing."}
                </p>

                {/* Session Details */}
                <div style={{ background: colors.bg, padding: "12px 16px", borderRadius: radius.md, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                        <div style={{ fontSize: 10, fontFamily: fonts.body, fontWeight: 700, color: colors.textMuted, textTransform: "uppercase" }}>
                            Duration
                        </div>
                        <div style={{ fontSize: 14, fontFamily: fonts.display, fontWeight: 700, color: colors.text, marginTop: 4 }}>
                            {therapist.sessionDurationMins || 50} min
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 10, fontFamily: fonts.body, fontWeight: 700, color: colors.textMuted, textTransform: "uppercase" }}>
                            Rate
                        </div>
                        <div style={{ fontSize: 14, fontFamily: fonts.display, fontWeight: 700, color: colors.purple, marginTop: 4 }}>
                            PKR {therapist.hourlyRate || 2500}
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div style={{ padding: "12px 16px", background: "#F3E8FF", borderRadius: radius.md, border: `1px solid ${colors.lavender}` }}>
                    <div style={{ fontSize: 10, fontFamily: fonts.body, fontWeight: 700, color: colors.purple, textTransform: "uppercase", marginBottom: 10 }}>
                        📞 Contact
                    </div>

                    {/* Phone */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <span style={{ fontSize: 16 }}>📱</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onCall();
                            }}
                            style={{
                                flex: 1,
                                padding: "8px 12px",
                                background: colors.purple,
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: 12,
                                fontWeight: 700,
                                fontFamily: fonts.body,
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                            onMouseLeave={(e) => (e.target.style.opacity = "1")}
                        >
                            {therapist.phone || "Call Therapist"}
                        </button>
                    </div>

                    {/* Email */}
                    {therapist.user?.email && (
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                            <span style={{ fontSize: 16 }}>📧</span>
                            <a
                                href={`mailto:${therapist.user.email}`}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    flex: 1,
                                    padding: "8px 12px",
                                    background: colors.border,
                                    color: colors.text,
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    fontFamily: fonts.body,
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    display: "block",
                                    textAlign: "center",
                                }}
                            >
                                Email
                            </a>
                        </div>
                    )}

                    {/* Languages */}
                    {therapist.languages && (
                        <div style={{ fontSize: 11, fontFamily: fonts.body, color: colors.text }}>
                            🗣️ <strong>{therapist.languages}</strong>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ padding: "16px 24px", borderTop: `1px solid ${colors.border}`, display: "flex", gap: 10 }}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onBook();
                    }}
                    style={{
                        flex: 1,
                        padding: "10px 16px",
                        background: `linear-gradient(135deg, ${colors.purple}, ${colors.purpleLight})`,
                        color: "#fff",
                        border: "none",
                        borderRadius: radius.md,
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: fonts.body,
                        cursor: "pointer",
                        boxShadow: `0 4px 14px ${colors.purple}40`,
                    }}
                >
                    📅 Book Now
                </button>
            </div>
        </div>
    );
};

export default TherapistDirectory;
