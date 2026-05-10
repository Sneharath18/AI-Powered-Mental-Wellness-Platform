// ─────────────────────────────────────────────────────────────────────────────
// Emotional Support & Stress Detection Module
// Provides non-clinical emotional support with stress pattern detection
// ─────────────────────────────────────────────────────────────────────────────

// ─── Stress Detection Patterns ─────────────────────────────────────────────────
const STRESS_PATTERNS = {
    ANXIETY: {
        keywords: ['anxious', 'anxiety', 'worried', 'nervous', 'panic', 'afraid', 'scared', 'dread', 'overwhelm', 'racing thoughts', 'can\'t sleep', 'trembling'],
        severity: 2,
        resources: ['breathing_exercise', 'grounding', 'counselor_contact'],
    },
    DEPRESSION: {
        keywords: ['depressed', 'depression', 'sad', 'hopeless', 'worthless', 'tired all the time', 'no energy', 'empty', 'numb', 'disconnected', 'don\'t care'],
        severity: 3,
        resources: ['counselor_contact', 'crisis_line', 'activity_suggestion'],
    },
    BURNOUT: {
        keywords: ['burnout', 'exhausted', 'stressed', 'overwhelmed', 'too much', 'can\'t handle', 'breaking down', 'at my limit', 'worn out'],
        severity: 2,
        resources: ['self_care', 'counselor_contact', 'break_suggestion'],
    },
    CRISIS: {
        keywords: ['suicide', 'self-harm', 'self harm', 'end it', 'ending it', 'harm myself', 'kill myself', 'don\'t want to live', 'better off dead', 'give up', 'end my life', 'take my life', 'just die', 'want to die'],
        severity: 5,
        resources: ['crisis_line', 'emergency'],
    },
    RELATIONSHIP_ISSUES: {
        keywords: ['relationship', 'breakup', 'heartbreak', 'lonely', 'alone', 'conflict', 'fight', 'partner', 'spouse', 'betrayed'],
        severity: 1,
        resources: ['counselor_contact', 'support_resources'],
    },
    SLEEP_ISSUES: {
        keywords: ['insomnia', 'can\'t sleep', 'sleep problem', 'sleepless', 'no sleep', 'nightmares', 'restless'],
        severity: 1,
        resources: ['sleep_tips', 'breathing_exercise'],
    },
};

// ─── Resource Content ─────────────────────────────────────────────────────────
const RESOURCES = {
    breathing_exercise: {
        title: '🫁 Try a Breathing Exercise',
        content: 'Try the 4-7-8 breathing technique: Breathe in for 4 counts, hold for 7, exhale for 8. This can calm your nervous system immediately.',
    },
    grounding: {
        title: '🌍 Grounding Technique (5-4-3-2-1)',
        content: 'Name: 5 things you see, 4 things you hear, 3 things you feel, 2 things you smell, 1 thing you taste. This helps bring you back to the present moment.',
    },
    self_care: {
        title: '🧘 Self-Care Suggestions',
        content: 'Take a walk, drink water, get outside for fresh air, rest, or engage in an activity you enjoy. Sometimes the best medicine is taking care of yourself.',
    },
    sleep_tips: {
        title: '🛌 Sleep Hygiene Tips',
        content: 'Try: consistent sleep schedule, no screens 30 min before bed, cool dark room, journaling before sleep, limiting caffeine after 2pm.',
    },
    activity_suggestion: {
        title: '🎯 Get Moving',
        content: 'Even light movement helps: take a short walk, do some stretches, or play music. Physical activity can improve mood significantly.',
    },
    break_suggestion: {
        title: '⏸️ Take a Break',
        content: 'You deserve rest. Step away, take a walk, or do something that brings you joy. Burnout is real—listen to your body.',
    },
    crisis_line: {
        title: '🚨 Crisis Support (24/7)',
        content: '**Pakistan**: Umang Helpline: 0311-7786264 | Befrienders: 111-123-123 | **Global**: International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/',
    },
    emergency: {
        title: '🚨 URGENT: Get Help Now',
        content: 'If you are in immediate danger, please call emergency services (911 in US, 112 in EU, 999 in UK) or go to the nearest emergency room immediately.',
    },
    counselor_contact: {
        title: '👩‍⚕️ Connect with a Counselor',
        content: 'CalmMind has licensed psychologists available for appointments. Would you like to book a session? You can visit the Appointments section to find available counselors.',
    },
    support_resources: {
        title: '💜 Support Resources',
        content: 'CalmMind offers various support options: AI chat (24/7), mood tracking, private journaling, and sessions with licensed therapists. You\'re not alone.',
    },
};

const ETHICAL_GUARDRAILS = {
    boundaries: [
        'Do not diagnose, label, or pathologize the user.',
        'Do not recommend medication or dosage changes.',
        'Do not imply the assistant is a clinician, emergency service, or crisis line.',
        'Do not encourage emotional dependency or exclusivity.',
        'Do not give instructions for self-harm, violence, or concealing harm.',
    ],
    crisisDisclaimer:
        'If someone may be at immediate risk of harm, prioritize emergency services and local crisis supports over ongoing conversation.',
};

// ─── Stress Detection Function ─────────────────────────────────────────────────
function detectStress(content) {
    if (!content) return { level: 0, type: 'none', severity: 0, resources: [] };

    const lowerContent = content.toLowerCase();
    const detectedPatterns = [];

    // Check each pattern
    for (const [type, pattern] of Object.entries(STRESS_PATTERNS)) {
        const matched = pattern.keywords.some(keyword =>
            lowerContent.includes(keyword.toLowerCase())
        );

        if (matched) {
            detectedPatterns.push({
                type,
                severity: pattern.severity,
                resources: pattern.resources,
            });
        }
    }

    if (detectedPatterns.length === 0) {
        return { level: 0, type: 'none', severity: 0, resources: [] };
    }

    // Sort by severity (highest first) and return the most severe
    detectedPatterns.sort((a, b) => b.severity - a.severity);
    const mostSevere = detectedPatterns[0];

    return {
        level: mostSevere.severity,
        type: mostSevere.type,
        severity: mostSevere.severity,
        resources: mostSevere.resources,
    };
}

// ─── Generate Support Message Based on Stress Level ────────────────────────────
function generateSupportMessage(stressDetection) {
    if (stressDetection.level === 0) {
        return null; // No support message needed
    }

    const messages = {
        1: "💙 I hear you. What you're feeling matters. Let's talk through this together.",
        2: "💜 I sense you're going through a tough time. You're brave for reaching out.",
        3: "💛 Your feelings are valid. I'm here to listen and support you.",
        4: "🤍 You deserve support and care. Please know you're not alone in this.",
        5: "🚨 I'm very concerned about what you've shared. Please reach out for immediate professional help—you deserve real, qualified support.",
    };

    return messages[stressDetection.level] || messages[3];
}

// ─── Format Resources for Display ──────────────────────────────────────────────
function formatResources(resourceKeys) {
    if (!resourceKeys || resourceKeys.length === 0) return '';

    const formatted = resourceKeys
        .slice(0, 3) // Limit to 3 resources
        .map(key => {
            const resource = RESOURCES[key];
            if (!resource) return '';
            return `\n**${resource.title}**\n${resource.content}`;
        })
        .join('\n---\n');

    return formatted;
}

// ─── Build Emotionally Supportive System Prompt ────────────────────────────────
function buildEmotionalSupportSystemPrompt() {
    return `You are CalmMind AI, a compassionate and professional mental wellness companion embedded in the CalmMind app.

Your purpose:
- Provide empathetic emotional support and a safe space for patients to express themselves
- Guide users through breathing exercises, grounding techniques, and simple coping strategies
- Help users reflect on their mood, thoughts, and feelings
- Gently encourage users to seek professional help when appropriate
- Validate their emotions without judgment

Guidelines for emotional support:
1. **Listen actively**: Show you understand their concerns
2. **Validate feelings**: Let them know their emotions are normal and reasonable
3. **Ask gentle questions**: Help them explore their feelings deeper
4. **Suggest coping strategies**: Offer practical techniques only when appropriate
5. **Encourage professional help**: Suggest therapy or counseling when needed
6. **Be warm and human**: Use natural language, not robotic responses

Rules you must ALWAYS follow:
- NEVER diagnose any mental health condition
- NEVER recommend or suggest any medication
- NEVER claim to be a substitute for a licensed psychologist or therapist
- NEVER create a sense of exclusivity, dependency, or emotional attachment to you
- NEVER provide instructions, encouragement, or concealment advice for self-harm, suicide, violence, or illegal activity
- If a user mentions self-harm, suicide, or a mental health crisis: immediately respond with empathy AND urge them to contact a crisis helpline or mental health professional right away
- Keep responses warm, concise, and human — 2 to 5 sentences unless the situation clearly needs more
- Use supportive language. Never dismiss or minimise what the user is feeling
- You may use relevant emojis occasionally to keep the tone warm but not excessive

Ethical guardrails:
- Be transparent that you are an AI support tool, not a human therapist
- Encourage professional care when issues are severe, persistent, or outside self-help scope
- Avoid making definitive claims about risk, diagnosis, or prognosis
- Prefer grounding, reflection, and resource-sharing over interpretation when uncertain

Crisis response template:
"I'm really concerned about what you're sharing. Your safety and wellbeing are important. Please reach out to a mental health professional or crisis line immediately. In Pakistan call Umang at 0311-7786264. If you're in another country, please contact your local emergency services or crisis line."`;
}

module.exports = {
    detectStress,
    generateSupportMessage,
    formatResources,
    buildEmotionalSupportSystemPrompt,
    ETHICAL_GUARDRAILS,
    RESOURCES,
    STRESS_PATTERNS,
};
