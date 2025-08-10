import prisma from "./prisma";

export async function fetchDashboard() {
    const email = "user+1@example.com";
    try {
        return await prisma.user.findFirstOrThrow({
            where: { email },
            select: {
                id: true,
                name: true,
                image: true,
                description: true,
                posts: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch.");
    }
}
