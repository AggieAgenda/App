export default function DashboardOverview() {
    return (
        <div className="flex flex-col justify-center items-center text-center p-6">
            <h2 className="text-2xl font-bold mb-4">🚧 Demo Version</h2>
            <p className="mb-2">
                This is just a demo version of the app — the backend is not deployed yet, 
                so features won’t function for now.
            </p>
            <p className="mb-4">
                If you’d like to get early access to Aggie Agenda, fill out this form:
            </p>
            <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdP_FFSPaQBSOKEcKfck4MV3cRNBoOQuUhnYCSfy9hUHTeZwQ/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-medium mb-6"
            >
                Early Access Form
            </a>

            <h3 className="text-lg ">Thanks so much for checking us out — the Beta will drop soon! 🎉</h3>
        </div>
    );
}
