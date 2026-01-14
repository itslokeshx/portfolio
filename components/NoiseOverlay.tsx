export default function NoiseOverlay() {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
            style={{
                backgroundImage: 'url(/noise.svg)',
                backgroundRepeat: 'repeat',
            }}
        />
    );
}
