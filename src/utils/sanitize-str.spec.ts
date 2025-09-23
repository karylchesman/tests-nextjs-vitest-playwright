import { sanitizeStr } from "./sanitize-str";

describe("sanitizeStr (unit)", () => {
  test("return an empty string when it receives a falsy value", () => {
    // @ts-expect-error testing with no value provided
    expect(sanitizeStr()).toBe("");
    expect(sanitizeStr("")).toBe("");
    expect(sanitizeStr(null as unknown as string)).toBe("");
    expect(sanitizeStr(undefined as unknown as string)).toBe("");
    expect(sanitizeStr(0 as unknown as string)).toBe("");
    expect(sanitizeStr(false as unknown as string)).toBe("");
  });

  test("return an empty string when it receives a non-string value", () => {
    expect(sanitizeStr(123 as unknown as string)).toBe("");
    expect(sanitizeStr(true as unknown as string)).toBe("");
    expect(sanitizeStr({} as unknown as string)).toBe("");
    expect(sanitizeStr([] as unknown as string)).toBe("");
  });

  test("ensures the string is trimmed", () => {
    expect(sanitizeStr("   Hello World   ")).toBe("Hello World");
    expect(sanitizeStr("\nHello\nWorld\n")).toBe("Hello\nWorld");
    expect(sanitizeStr("   Hello   \n   World   ")).toBe("Hello   \n   World");
  });

  test("ensures the string is normalized", () => {
    expect(sanitizeStr("Caf\u00E9")).toBe("Café"); // "é" as single character
    expect(sanitizeStr("Caf\u0065\u0301")).toBe("Café"); // "e +  ́" as two characters
  });
});
