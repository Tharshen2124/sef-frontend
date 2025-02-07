export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16)); // Generate a random salt
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedKey = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000, // High number of iterations for security
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const hashedPassword = btoa(String.fromCharCode(...new Uint8Array(derivedKey))); // Convert to Base64
  const saltBase64 = btoa(String.fromCharCode(...salt));

  return `${saltBase64}:${hashedPassword}`; // Store as "salt:hash"
}

export async function checkPassword(inputPassword, storedHash) {
  const [saltBase64, storedKey] = storedHash.split(":"); // Extract salt and hash
  const salt = new Uint8Array(atob(saltBase64).split("").map((c) => c.charCodeAt(0)));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(inputPassword),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedKey = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const hashedInput = btoa(String.fromCharCode(...new Uint8Array(derivedKey)));
  return hashedInput === storedKey; // Compare hashes
}
