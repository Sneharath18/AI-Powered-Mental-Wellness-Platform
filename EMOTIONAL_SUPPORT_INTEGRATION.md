# 🚀 Emotional Support Feature - Integration Guide

## What's New

Your CalmMind AI Chat system now includes **non-clinical emotional support** with intelligent stress detection and resource recommendations!

---

## 📦 Files Added/Modified

### New Files:
1. **`backend/src/utils/emotionalSupport.js`** - Core stress detection & support module
   - Stress detection patterns (Anxiety, Depression, Burnout, etc.)
   - Resource suggestions system
   - Support message generation
   - Crisis detection & response

2. **`backend/demo-emotional-support.js`** - Demo script showcasing all features
   - Run: `node demo-emotional-support.js` from backend folder
   - Shows 7 stress detection examples
   - Displays suggested resources for each

3. **`EMOTIONAL_SUPPORT_FEATURE.md`** - Comprehensive documentation
   - Feature overview & key capabilities
   - Stress patterns & detection rules
   - Resource list & crisis protocols
   - Technical architecture

### Modified Files:
1. **`backend/src/routes/chat.js`**
   - Integrated stress detection into `/api/chat/message` endpoint
   - Added support message generation
   - Integrated resource suggestions
   - Enhanced AI metadata with stress information

---

## 🎯 How It Works

### Flow:
```
User sends message to AI Chat
    ↓
Stress detection analyzes message
    ↓
Appropriate support message generated (if stress detected)
    ↓
Groq LLM provides empathetic response
    ↓
Resources suggested based on stress type
    ↓
Full response sent to frontend with metadata
```

### Stress Detection Levels:
- **0**: No stress → Normal conversation
- **1**: Low stress → Basic support + resources
- **2**: Moderate stress → Empathetic support + coping tools
- **3**: Higher stress → Professional help suggestion
- **4**: Severe stress → Urgent counselor contact
- **5**: CRISIS → 🚨 Immediate crisis line info

---

## 📋 Stress Types Detected

| Type | Severity | Example Keywords |
|------|----------|-------------------|
| **Anxiety** | 2 | anxious, worried, panic, afraid, racing thoughts |
| **Depression** | 3 | depressed, hopeless, worthless, empty, numb |
| **Burnout** | 2 | exhausted, overwhelmed, at limit, breaking down |
| **Relationship Issues** | 1 | breakup, lonely, betrayed, conflict |
| **Sleep Issues** | 1 | insomnia, can't sleep, nightmares, sleepless |
| **Crisis** | **5** | suicide, self-harm, want to die, end it |

---

## 🎁 Resources Provided

Automatically suggested based on stress detection:

- 🫁 **Breathing Exercises** - 4-7-8 technique
- 🌍 **Grounding (5-4-3-2-1)** - Present moment awareness
- 🧘 **Self-Care Suggestions** - Rest, movement, enjoyment
- 🛌 **Sleep Hygiene Tips** - Better sleep patterns
- 🎯 **Activity Suggestions** - Light movement, stretching
- ⏸️ **Break Suggestions** - Recovery from burnout
- 👩‍⚕️ **Counselor Contact** - Book therapy sessions
- 🚨 **Crisis Lines** - 24/7 emergency support
- 📞 **Emergency Services** - Immediate professional help

---

## 💾 Database Integration

### Metadata Stored:
```json
{
  "model": "llama-3.3-70b-versatile",
  "timestamp": "2026-05-11T20:30:00Z",
  "stressDetected": "ANXIETY",
  "stressLevel": 2,
  "resourcesSuggested": ["breathing_exercise", "grounding", "counselor_contact"]
}
```

This allows:
- Tracking emotional patterns over time
- Measuring resource effectiveness
- Identifying crisis escalations
- Analytics dashboard integration

---

## 🧪 Testing

### Run Demo:
```bash
cd backend
node demo-emotional-support.js
```

This shows:
- 7 stress detection scenarios
- Suggested resources for each
- Summary of stress levels

### Manual Testing:
Use the `/api/chat/message` endpoint with test messages:

```bash
# Anxiety test
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "sessionId": "session-id",
    "content": "I have been feeling so anxious lately..."
  }'
```

---

## 🔒 Safety Features

### ✅ Guardrails Active:
- Cannot diagnose conditions
- Cannot recommend medications
- Cannot replace therapists
- Crisis detection & immediate escalation
- Professional help encouraged

### Crisis Protocol:
When detected:
1. ✅ Immediate empathetic response
2. ✅ Crisis line numbers provided
3. ✅ Professional help directed
4. ✅ Stored for monitoring

**Pakistan Crisis Lines:**
- Umang Helpline: 0311-7786264
- Befrienders: 111-123-123

---

## 📊 Monitoring & Analytics

Track per user:
- Stress type distribution
- Most helpful resources
- Session frequency during stress
- Escalation to counselor bookings
- Crisis detection count

Use aiMetadata for dashboard insights:
```javascript
// Get stress stats for user
const stressyMessages = await prisma.chatMessage.findMany({
  where: {
    session: { userId: userId },
    aiMetadata: { contains: '"stressLevel":3' }
  }
})
```

---

## 🚀 Future Enhancements

Potential improvements:
- [ ] Sentiment analysis (ML-based)
- [ ] Predictive stress warning
- [ ] Personalized coping strategies
- [ ] Integration with therapist notes
- [ ] Real-time crisis escalation
- [ ] Multilingual support
- [ ] Mood-based resource matching
- [ ] Long-term wellness insights

---

## 🤝 Support & Questions

- Documentation: See `EMOTIONAL_SUPPORT_FEATURE.md`
- Demo: Run `node demo-emotional-support.js`
- Code: `backend/src/utils/emotionalSupport.js`
- Integration: `backend/src/routes/chat.js`

---

## ✨ Key Benefits

✅ **Compassionate** - Validating, empathetic responses  
✅ **Intelligent** - Detects stress patterns automatically  
✅ **Helpful** - Suggests relevant resources instantly  
✅ **Safe** - Crisis detection & escalation  
✅ **Tracked** - Metadata for analytics & monitoring  
✅ **Non-Clinical** - Never claims to diagnose or treat  
✅ **Professional** - Always encourages real help when needed  

---

**💜 CalmMind: Where Mental Wellness Meets Technology**
