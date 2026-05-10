# 💜 Emotional Support & Stress Detection Feature

## Overview
CalmMind AI now provides **non-clinical emotional support** with intelligent stress detection and personalized resource suggestions. This feature helps users feel heard and supported while directing them to appropriate resources and professional help when needed.

---

## 🎯 Key Features

### 1. **Basic Conversational Support**
- Warm, empathetic responses that validate user feelings
- Active listening approach (asking clarifying questions)
- Supportive language that normalizes emotional experiences
- Non-judgmental and compassionate tone

**Example User Message:**
> "I've been feeling really overwhelmed with work lately. I can't focus and I'm snapping at everyone."

**AI Response:**
> "💙 I hear you. What you're feeling matters. Let's talk through this together.
>
> It sounds like you're carrying a lot right now—work stress combined with feeling out of sorts emotionally can be really draining. That's a lot to manage. When did this overwhelm start? Sometimes identifying triggers helps us understand what we need."

---

### 2. **Stress Detection Patterns**
The system automatically detects stress indicators based on keyword analysis:

#### Detected Stress Types:
| Type | Keywords | Severity | Action |
|------|----------|----------|--------|
| **Anxiety** | worried, anxious, panic, nervous, afraid | 2 | Breathing exercise, grounding techniques |
| **Depression** | depressed, hopeless, worthless, tired, empty | 3 | Counselor contact, crisis support |
| **Burnout** | exhausted, overwhelmed, stressed, at limit | 2 | Self-care suggestions, breaks |
| **Relationship Issues** | breakup, lonely, conflict, partner betrayal | 1 | Counselor contact, support resources |
| **Sleep Issues** | insomnia, can't sleep, nightmares, restless | 1 | Sleep tips, breathing exercises |
| **Crisis** | suicide, self-harm, harm myself, better off dead | 5 | **IMMEDIATE crisis line contact** |

#### Stress Levels:
- **0**: No stress detected
- **1**: Low stress (relationship/sleep issues)
- **2**: Moderate stress (anxiety/burnout)
- **3**: Higher stress (depression)
- **4**: Severe stress
- **5**: Critical/Crisis (immediate professional help needed)

---

### 3. **Smart Resource Suggestions**
When stress is detected, CalmMind suggests relevant resources:

#### Available Resources:
- 🫁 **Breathing Exercises** - 4-7-8 technique for calming
- 🌍 **Grounding (5-4-3-2-1)** - Present moment awareness
- 🧘 **Self-Care Suggestions** - Walking, hydration, rest
- 🛌 **Sleep Hygiene Tips** - Better sleep patterns
- 🎯 **Activity Suggestions** - Light movement, stretching
- ⏸️ **Break Suggestions** - Recovery from burnout
- 👩‍⚕️ **Counselor Contact** - Book sessions with therapists
- 🚨 **Crisis Support** - 24/7 helplines
- 📞 **Emergency Services** - Immediate professional help

#### Example Flow:
```
User: "I can't stop worrying about my interview tomorrow"
↓ (Anxiety detected: severity 2)
↓
AI Response:
"💙 I hear you. What you're feeling matters. Let's talk through this together.

Interview anxiety is completely normal—it shows you care about doing well. Let's work through this together.

🫁 Try a Breathing Exercise
Try the 4-7-8 breathing technique: Breathe in for 4 counts, hold for 7, exhale for 8. 
This can calm your nervous system immediately.

---

🌍 Grounding Technique (5-4-3-2-1)
Name: 5 things you see, 4 things you hear, 3 things you feel, 2 things you smell, 
1 thing you taste. This helps bring you back to the present moment."
```

---

### 4. **Counselor Contact & Professional Help**
The system intelligently suggests professional help when appropriate:

- **Moderate stress**: "Would you like to book a session with one of our licensed counselors?"
- **High stress**: Direct link to counselor booking section
- **Crisis**: Immediate crisis line information

#### Crisis Resources Embedded:
- **Pakistan**: Umang Helpline (0311-7786264), Befrienders (111-123-123)
- **Global**: International Association for Suicide Prevention
- **Emergency**: Direct to local emergency services

---

## 🛡️ Safety Guardrails

### What the AI Will NOT Do:
- ❌ Diagnose mental health conditions
- ❌ Recommend medications
- ❌ Claim to replace licensed therapists
- ❌ Minimize or dismiss user feelings
- ❌ Provide clinical treatment advice

### Crisis Protocol:
When the system detects crisis indicators (suicide, self-harm):
1. ✅ Immediate empathetic response
2. ✅ Crisis line contact information
3. ✅ Urgent professional help direction
4. ✅ Validation of user's need for real support

**Crisis Response Template:**
> "I'm very concerned about what you're sharing. Your safety and wellbeing are important.
>
> Please reach out to a mental health professional or crisis line immediately:
> - **Pakistan**: Umang Helpline - 0311-7786264
> - **Global**: https://www.iasp.info/resources/Crisis_Centres/
> 
> If you're in immediate danger, please call emergency services (911, 999, 112) 
> or go to the nearest emergency room."

---

## 💾 Data Structure

### Stress Detection Metadata (stored per message):
```json
{
  "model": "llama-3.3-70b-versatile",
  "timestamp": "2026-05-11T20:30:00Z",
  "stressDetected": "ANXIETY",
  "stressLevel": 2,
  "resourcesSuggested": ["breathing_exercise", "grounding", "counselor_contact"]
}
```

This data allows tracking:
- User's emotional patterns over time
- Which resources help most
- When to escalate to professional support
- Session effectiveness

---

## 🔄 How It Works (Technical Flow)

```
1. User sends message → /api/chat/message
           ↓
2. Backend receives & stores user message
           ↓
3. Stress detection analysis on message content
           ↓
4. Generate appropriate support message (if stress detected)
           ↓
5. Call Groq LLM with emotionally-aware system prompt
           ↓
6. Get AI response
           ↓
7. Add support message + resources to response
           ↓
8. Store full response + metadata in database
           ↓
9. Send to frontend for display
```

---

## 🎨 Frontend Integration

### Display Features:
- Clear visual indicators when stress is detected (emoji badges)
- Resource cards with actionable buttons
- Link to book counselor directly from chat
- Crisis helpline visible in urgent cases

### Example UI:
```
User Message:
"I feel like I can't cope anymore"

AI Response with Stress Detection:
💛 Your feelings are valid. I'm here to listen and support you.
[Long supportive response]

Resource Cards:
┌─────────────────────────────┐
│ 👩‍⚕️ Connect with a Counselor │
│ Ready to talk to a licensed  │
│ therapist?                  │
│ [Book Now →]                │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 🧘 Self-Care Suggestions    │
│ Take a walk, drink water,   │
│ get outside...              │
└─────────────────────────────┘
```

---

## 📊 Analytics & Monitoring

Track patterns from stress detection:
- Which types of stress users experience most
- Effectiveness of different resources
- When users need immediate professional intervention
- Trending emotional health metrics

---

## 🚀 Future Enhancements

1. **Mood-based Resource Matching** - Better personalization
2. **AI Therapy Modules** - Guided self-help programs
3. **Sentiment Analysis** - Deeper emotion recognition
4. **Integration with Therapist Notes** - Continuity of care
5. **Crisis Prediction** - Proactive interventions
6. **Multilingual Support** - Support for more languages
7. **Real-time Crisis Escalation** - Notify emergency contacts

---

## 📝 Usage Guidelines

### For Users:
- Be honest about how you're feeling
- Use the resources suggested
- Reach out to a counselor for ongoing support
- Contact crisis lines if in immediate danger

### For Developers:
- Keep system prompts supportive and non-clinical
- Update stress patterns based on user feedback
- Monitor crisis detections for safety
- Always include professional help links

---

## 🔒 Privacy & Confidentiality

- All conversations encrypted end-to-end
- Stress metadata used only for personalization
- No data shared without consent
- Crisis info shared only when necessary
- Compliant with HIPAA and data protection laws

---

## 📞 Support & Questions

For issues or improvements:
- Report bugs to support@calmmind.com
- Suggest resources via feature request
- Crisis support: Use embedded helpline numbers

---

**CalmMind: Supporting your mental wellness journey. 💜**
