const API_URL = import.meta.env.VITE_API_URL ?? "";

export async function postJson(path, body) {
    const url = `${API_URL}${path}`;

    let res;
    try {
        res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    } catch (err) {
        if (import.meta.env.DEV) {
            console.error(
                `[api] Could not reach ${url}. Is the server running (cd server && npm start)? ` +
                `Is the Vite proxy set up, or VITE_API_URL correct (and CORS allowing this origin)?`,
                err
            );
        }
        throw new Error("Cannot connect to the server. Please try again shortly.", { cause: err });
    }

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
        if (import.meta.env.DEV && !data) {
            console.error(
                `[api] ${url} answered ${res.status} without JSON. Usually the Vite proxy can't reach the server ` +
                `(server not running / wrong port) or the proxy isn't configured.`
            );
        }
        throw new Error(data?.error || "The server isn't responding. Please try again shortly.");
    }
    return data;
}