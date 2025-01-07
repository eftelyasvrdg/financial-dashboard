export default function handler(req, res) {
    if (req.method === "POST") {
        const { name, feedback} = req.body;

        if (!name || !feedback) {
            return res.status(400).json({ message: "Name, feedback are required." });
        }

        console.log("Received Feedback:", { name, feedback });

        return res.status(200).json({ message: "Thank you for your feedback!" });
    }

    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
}
