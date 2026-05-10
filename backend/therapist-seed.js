// ─────────────────────────────────────────────────────────────────────────────
// Therapist Seed Data
// Add this to backend/therapist-seed.js
// Run: node therapist-seed.js
// ─────────────────────────────────────────────────────────────────────────────

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const therapists = [
    {
        user: {
            firstName: "Dr. Anya",
            lastName: "Sharma",
            email: "anya.sharma@calmmind.pk",
            phone: "03001234567",
            bio: "Clinical psychologist specializing in anxiety and depression. 10+ years experience.",
            avatarUrl: "https://via.placeholder.com/150?text=Dr+Anya",
        },
        psychologist: {
            specialization: "Anxiety, Depression, Trauma",
            languages: "English, Urdu, Hindi",
            sessionDurationMins: 50,
            hourlyRate: 2500,
            isApproved: true,
        },
        availability: [
            { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }, // Monday
            { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" }, // Tuesday
            { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" }, // Wednesday
            { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" }, // Thursday
            { dayOfWeek: 5, startTime: "09:00", endTime: "14:00" }, // Friday
        ],
    },
    {
        user: {
            firstName: "Dr. Hassan",
            lastName: "Khan",
            email: "hassan.khan@calmmind.pk",
            phone: "03045678901",
            bio: "Specializes in grief counseling, life transitions, and stress management. 8 years practice.",
            avatarUrl: "https://via.placeholder.com/150?text=Dr+Hassan",
        },
        psychologist: {
            specialization: "Grief, Life Transitions, Stress Management",
            languages: "English, Urdu, Punjabi",
            sessionDurationMins: 50,
            hourlyRate: 2000,
            isApproved: true,
        },
        availability: [
            { dayOfWeek: 0, startTime: "10:00", endTime: "18:00" }, // Sunday
            { dayOfWeek: 2, startTime: "14:00", endTime: "20:00" }, // Tuesday
            { dayOfWeek: 4, startTime: "14:00", endTime: "20:00" }, // Thursday
            { dayOfWeek: 6, startTime: "10:00", endTime: "16:00" }, // Saturday
        ],
    },
    {
        user: {
            firstName: "Dr. Saira",
            lastName: "Ali",
            email: "saira.ali@calmmind.pk",
            phone: "03119876543",
            bio: "Therapist focusing on relationship issues, family counseling, and couples therapy. 12 years experience.",
            avatarUrl: "https://via.placeholder.com/150?text=Dr+Saira",
        },
        psychologist: {
            specialization: "Relationships, Family Therapy, Couples Counseling",
            languages: "English, Urdu",
            sessionDurationMins: 60,
            hourlyRate: 3000,
            isApproved: true,
        },
        availability: [
            { dayOfWeek: 1, startTime: "16:00", endTime: "20:00" }, // Monday
            { dayOfWeek: 3, startTime: "16:00", endTime: "20:00" }, // Wednesday
            { dayOfWeek: 5, startTime: "10:00", endTime: "18:00" }, // Friday
            { dayOfWeek: 6, startTime: "10:00", endTime: "16:00" }, // Saturday
        ],
    },
    {
        user: {
            firstName: "Dr. Ahmed",
            lastName: "Malik",
            email: "ahmed.malik@calmmind.pk",
            phone: "03216549876",
            bio: "Clinical psychologist specializing in cognitive behavioral therapy (CBT) and mindfulness. 9 years experience.",
            avatarUrl: "https://via.placeholder.com/150?text=Dr+Ahmed",
        },
        psychologist: {
            specialization: "CBT, Mindfulness, Behavioral Therapy",
            languages: "English, Urdu",
            sessionDurationMins: 50,
            hourlyRate: 2200,
            isApproved: true,
        },
        availability: [
            { dayOfWeek: 0, startTime: "14:00", endTime: "20:00" }, // Sunday
            { dayOfWeek: 1, startTime: "09:00", endTime: "15:00" }, // Monday
            { dayOfWeek: 3, startTime: "09:00", endTime: "15:00" }, // Wednesday
            { dayOfWeek: 5, startTime: "14:00", endTime: "20:00" }, // Friday
        ],
    },
    {
        user: {
            firstName: "Dr. Fatima",
            lastName: "Hassan",
            email: "fatima.hassan@calmmind.pk",
            phone: "03337654321",
            bio: "Child and adolescent psychologist. Expert in school-related issues and developmental psychology. 7 years experience.",
            avatarUrl: "https://via.placeholder.com/150?text=Dr+Fatima",
        },
        psychologist: {
            specialization: "Child Psychology, Adolescent Issues, School Counseling",
            languages: "English, Urdu",
            sessionDurationMins: 45,
            hourlyRate: 2000,
            isApproved: true,
        },
        availability: [
            { dayOfWeek: 1, startTime: "15:00", endTime: "19:00" }, // Monday
            { dayOfWeek: 2, startTime: "15:00", endTime: "19:00" }, // Tuesday
            { dayOfWeek: 4, startTime: "15:00", endTime: "19:00" }, // Thursday
            { dayOfWeek: 5, startTime: "15:00", endTime: "19:00" }, // Friday
        ],
    },
];

async function seed() {
    console.log("🌱 Seeding therapists...");

    for (const therapistData of therapists) {
        try {
            // Create user
            const passwordHash = await bcrypt.hash("TempPassword123!", 10);

            const user = await prisma.user.create({
                data: {
                    firstName: therapistData.user.firstName,
                    lastName: therapistData.user.lastName,
                    email: therapistData.user.email,
                    phone: therapistData.user.phone,
                    bio: therapistData.user.bio,
                    avatarUrl: therapistData.user.avatarUrl,
                    passwordHash,
                    role: "PSYCHOLOGIST",
                    isVerified: true,
                    isActive: true,
                },
            });

            // Create psychologist profile
            const psychologist = await prisma.psychologist.create({
                data: {
                    userId: user.id,
                    specialization: therapistData.psychologist.specialization,
                    languages: therapistData.psychologist.languages,
                    sessionDurationMins: therapistData.psychologist.sessionDurationMins,
                    hourlyRate: therapistData.psychologist.hourlyRate,
                    isApproved: therapistData.psychologist.isApproved,
                    bio: therapistData.user.bio,
                },
            });

            // Create availability slots
            for (const slot of therapistData.availability) {
                await prisma.availabilitySlot.create({
                    data: {
                        psychologistId: psychologist.id,
                        dayOfWeek: slot.dayOfWeek,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        isRecurring: true,
                        isAvailable: true,
                    },
                });
            }

            console.log(`✅ Created: Dr. ${user.firstName} ${user.lastName}`);
            console.log(`   📞 Phone: ${user.phone}`);
            console.log(`   💼 Specialization: ${therapistData.psychologist.specialization}`);
            console.log(`   💰 Rate: PKR ${therapistData.psychologist.hourlyRate}/hour`);
            console.log(`   ⏱️  Duration: ${therapistData.psychologist.sessionDurationMins} minutes`);
            console.log(`   🗓️  Availability: ${therapistData.availability.length} slots/week`);
            console.log();
        } catch (error) {
            console.error(`❌ Error creating ${therapistData.user.firstName}:`, error.message);
        }
    }

    console.log("🎉 Therapist seeding complete!");
    await prisma.$disconnect();
}

seed().catch(console.error);
