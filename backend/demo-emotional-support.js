// ─────────────────────────────────────────────────────────────────────────────
// Demo: Emotional Support & Stress Detection Examples
// ─────────────────────────────────────────────────────────────────────────────

const {
    detectStress,
    generateSupportMessage,
    formatResources,
    RESOURCES,
} = require('./src/utils/emotionalSupport');

console.log('💜 CalmMind Emotional Support & Stress Detection Demo\n');
console.log('═'.repeat(70) + '\n');

// ─── Test Cases ───────────────────────────────────────────────────────────
const testMessages = [
    {
        label: '1. Anxiety Detection',
        message: 'I have been feeling so anxious lately. My heart is racing and I keep having racing thoughts. I cannot sleep at night because of my worry.',
    },
    {
        label: '2. Depression Detection',
        message: 'Everything feels hopeless and I cannot see any point to my life. I wake up feeling empty and worthless. I have no energy to do anything.',
    },
    {
        label: '3. Burnout Detection',
        message: 'I am so overwhelmed with work. I have too much on my plate and I cannot handle it anymore. I feel like I am at my absolute limit.',
    },
    {
        label: '4. Relationship Issues',
        message: 'My partner and I had a terrible fight yesterday. I feel so betrayed and I do not know if our relationship will survive this.',
    },
    {
        label: '5. Sleep Problems',
        message: 'I have been struggling with insomnia for months now. I cannot sleep and when I do, I get nightmares. I am exhausted.',
    },
    {
        label: '6. Crisis Detection',
        message: 'I cannot do this anymore. Everything is too much. I have been thinking about ending it. I do not want to live like this.',
    },
    {
        label: '7. General Support (No Stress)',
        message: 'Hi, I just wanted to check in. How do I track my mood effectively?',
    },
];

// ─── Run Tests ────────────────────────────────────────────────────────────
testMessages.forEach((test, index) => {
    console.log(`${test.label}`);
    console.log('─'.repeat(70));
    console.log(`\n📝 User Message:\n"${test.message}"\n`);

    // Detect stress
    const stress = detectStress(test.message);

    // Display detection results
    console.log('🔍 Stress Detection Results:');
    console.log(`   Type: ${stress.type || 'NONE'}`);
    console.log(`   Level: ${stress.level}/5`);
    console.log(`   Severity: ${stress.severity}`);

    if (stress.resources && stress.resources.length > 0) {
        console.log(`   Resources: ${stress.resources.join(', ')}`);
    }

    // Generate support message
    const supportMsg = generateSupportMessage(stress);
    if (supportMsg) {
        console.log(`\n💙 Support Message:\n"${supportMsg}"`);
    }

    // Display resources
    if (stress.resources && stress.resources.length > 0) {
        console.log('\n📚 Suggested Resources:\n');
        stress.resources.slice(0, 2).forEach(resourceKey => {
            const resource = RESOURCES[resourceKey];
            if (resource) {
                console.log(`   ${resource.title}`);
                console.log(`   ${resource.content.substring(0, 100)}...`);
                console.log();
            }
        });
    }

    console.log('═'.repeat(70) + '\n');
});

// ─── Summary ──────────────────────────────────────────────────────────────
console.log('📊 Summary of Stress Levels:\n');
testMessages.forEach((test, idx) => {
    const stress = detectStress(test.message);
    const levelIndicator = {
        0: '😊 No stress',
        1: '😐 Low stress',
        2: '😕 Moderate stress',
        3: '😟 Higher stress',
        4: '😢 Severe stress',
        5: '🚨 CRISIS',
    }[stress.level];

    console.log(`${idx + 1}. ${test.label.split('.')[1].trim()}: ${levelIndicator}`);
});

console.log('\n═'.repeat(70));
console.log('\n✅ Emotional Support System Demo Complete!');
console.log('💜 CalmMind AI is ready to provide compassionate support.\n');
